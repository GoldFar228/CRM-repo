import React, { useEffect, useState } from 'react';
import { Button, Modal, Table } from 'antd';
import type { TableColumnsType, TableProps } from 'antd';
import { request, useModel } from '@umijs/max';
import { Deal } from 'typings';
import DealForm from '@/components/DealForm';


const StatusToString = {
    1: "Новый",
    2: "В работе",
    3: "Закончен"
}

const PriorityToString = {
    1: "Низкий",
    2: "Важный",
    3: "Максимальный"
}
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
    title: 'Статус',
    render(val, rec, index){
        return StatusToString[rec.status]
    } 
  },
  {
    title: 'Бюджет',
    dataIndex: 'budget',
  },
  {
    title: 'Приоритет',
    render(val, rec, index){
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


  useEffect(() => {
    const onGetDeals = async () => {
      const res = await request('api/Deal/GetDeals', {
        method: "GET"
      });
      
      await setDeals(res);
    };

    onGetDeals();
  }, []);

  return (
    <>
      <Table<Deal>
        columns={columns}
        dataSource={deals}
        onChange={onChange}
        showSorterTooltip={{ target: 'sorter-icon' }}
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
    </>
  )
};

export default Deals;