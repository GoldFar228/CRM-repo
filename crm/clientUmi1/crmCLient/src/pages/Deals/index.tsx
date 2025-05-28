import React, { useEffect, useState } from 'react';
import { Button, Modal, Table } from 'antd';
import type { TableColumnsType, TableProps } from 'antd';
import { request, useModel } from '@umijs/max';
import { Deal } from 'typings';
import DealForm from '@/components/DealForm';
import { StatusToString, PriorityToString } from '@/dataForExport';
import DealEditForm from '@/components/DealEditForm';
import { jwtDecode } from 'jwt-decode';
import dayjs from 'dayjs';

const columns: TableColumnsType<Deal> = [

  {
    title: 'Клиент',
    dataIndex: ['assignedTo', 'name'],
    sorter: (a, b) => a.createdBy.name.localeCompare(b.createdBy.name),
  },
  {
    title: 'Кто создал',
    dataIndex: ['createdBy', 'name'],
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
  {
    title: 'Создана в',
    dataIndex: 'createdAt',
    render: (value: string) => dayjs(value).format('DD.MM.YYYY HH:mm'),
    showSorterTooltip: { target: 'full-header' }
  },
];


const onChange: TableProps<Deal>['onChange'] = (pagination, filters, sorter, extra) => {
  console.log('params', pagination, filters, sorter, extra);
};


const Deals: React.FC = () => {

  const [deals, setDeals] = useState<Deal[]>();
  const [modalOpen, setmodalOpen] = useState(false);
  const [modalEditOpen, setModalEditOpen] = useState(false);
  const [editingDeal, setEditingDeal] = useState<Deal | null>(null);


  useEffect(() => {
    const token = localStorage.getItem('token')?.replace('Bearer ', '');

    const onGetDeals = async () => {
      const res = await request('api/Deal/GetDeals', {
        method: "GET"
      });
      if (token) {
        const decoded = jwtDecode<any>(token);
        const id = decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"];
        const myDeals = res?.filter((r: Deal) => r.createdBy.id == id)
        await setDeals(myDeals);
      }
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
        title="Изменить статус сделки"
        centered
        open={modalEditOpen}
        onCancel={() => setModalEditOpen(false)}>

        <DealEditForm deal={editingDeal} />
      </Modal>
    </>
  )
};

export default Deals;