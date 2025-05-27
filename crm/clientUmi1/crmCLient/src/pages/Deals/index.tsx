import React, { useEffect, useState } from 'react';
import { Button, Modal, Table } from 'antd';
import type { TableColumnsType, TableProps } from 'antd';
import { request, useModel } from '@umijs/max';
import { Deal } from 'typings';
import DealForm from '@/components/DealForm';
import { StatusToString, PriorityToString } from '@/dataForExport';
import DealEditForm from '@/components/DealEditForm';

const columns: TableColumnsType<Deal> = [
  {
    title: 'Создана в',
    dataIndex: 'createdAt',
    showSorterTooltip: { target: 'full-header' }
  },
  {
    title: 'Кто создал',
    dataIndex: ['createdBy', 'name'],
    sorter: (a, b) => a.createdBy.name.localeCompare(b.createdBy.name),
  },
  {
    title: 'Клиент',
    dataIndex: ['assignedTo', 'name'],
    sorter: (a, b) => a.createdBy.name.localeCompare(b.createdBy.name),
  },
  {
    title: 'Статус',
    render(val, rec, index) {
      return StatusToString[rec.status]
    }
  },
  {
    title: 'Бюджет',
    dataIndex: 'budget',
  },
  {
    title: 'Приоритет',
    render(val, rec, index) {
      return PriorityToString[rec.priority]
    }
  },
];


const onChange: TableProps<Deal>['onChange'] = (pagination, filters, sorter, extra) => {
  console.log('params', pagination, filters, sorter, extra);
};


const Deals: React.FC = () => {

  const [deals, setDeals] = useState();
  const [modalOpen, setmodalOpen] = useState(false);
  const [modalEditOpen, setModalEditOpen] = useState(false);
  const [editingDeal, setEditingDeal] = useState<Deal | null>(null);
  const [info, setInfo] = useState<string | null>(null);


  useEffect(() => {
    const onGetDeals = async () => {
      const res = await request('api/Deal/GetDeals', {
        method: "GET"
      });

      await setDeals(res);
    };

    onGetDeals();
  }, []);

  const openEditModal = async (deal?: Deal) => {
    var res = await request<Deal[]>(`/api/Deal/GetDealById?id=${deal?.id}`, {
      method: 'GET',
    });
    setEditingDeal(deal || null);
    setModalEditOpen(true);
  };



  return (
    <>
      <Table<Deal>
        columns={columns}
        dataSource={deals}
        onChange={onChange}
        showSorterTooltip={{ target: 'sorter-icon' }}
        onRow={record => ({
          onClick: () => openEditModal(record),
          // onClick: () => console.log(record),
        })}
      />
      <Button type="primary" htmlType="submit" onClick={() => setmodalOpen(true)}>Создать сделку</Button>
      <Modal
        title="Создать сделку"
        centered
        open={modalOpen}
        onOk={() => setmodalOpen(false)}
        onCancel={() => setmodalOpen(false)}
      >
        <DealForm />
      </Modal>
      <Modal
        title="Добавить инфу о клиенте"
        centered
        open={modalEditOpen}
        onCancel={() => setModalEditOpen(false)}>

        <DealEditForm deal={editingDeal} />
      </Modal>
    </>
  )
};

export default Deals;