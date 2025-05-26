import React, { useEffect, useState } from 'react';
import { Button, Table } from 'antd';
import type { TableColumnsType, TableProps } from 'antd';
import { request, useModel } from '@umijs/max';
import { Client } from 'typings';
import ClientForm from '@/components/ClientForm';


const columns: TableColumnsType<Client> = [
  {
    title: 'Имя клиента',
    dataIndex: 'name',
    showSorterTooltip: { target: 'full-header' },
    filters: [
      {
        text: 'Клим',
        value: 'Клим',
      },
      {
        text: 'Лиза',
        value: 'Лиза',
      }
    ],
    // specify the condition of filtering result
    // here is that finding the name started with `value`
    onFilter: (value, record) => record.name.indexOf(value as string) === 0,
    sorter: (a, b) => a.name.localeCompare(b.name),
    defaultSortOrder: 'ascend'
  },
  {
    title: 'Email',
    dataIndex: 'email',
    sorter: (a, b) => a.email.localeCompare(b.email),
  },
  {
    title: 'Зарегестрирован в',
    dataIndex: 'createdAt',
  },
  {
    title: 'Кто зарегестрировал',
    dataIndex: ['createdBy', 'name'],
    sorter: (a, b) => a.createdBy.name.localeCompare(b.createdBy.name),
  },
  {
    title: 'Телефон',
    dataIndex: 'phone',
    render: (phone: string) => {
      if (!phone) return '-';
      
      const match = phone.match(/^(\d{1})(\d{3})(\d{3})(\d{2})(\d{2})$/);

      if (match)
        return `+${match[1]} (${match[2]}) ${match[3]}-${match[4]}-${match[5]}`;
    }
  },
];


const onChange: TableProps<Client>['onChange'] = (pagination, filters, sorter, extra) => {
  console.log('params', pagination, filters, sorter, extra);
};

const onCreateClick = () => {
  return(<ClientForm/>)
};

const Clients: React.FC = () => {

  const [clients, setClients] = useState();

  useEffect(() => {
    const onGetClients = async () => {
      const res = await request('api/Client/GetClients', {
        method: "GET"
      });
      await setClients(res);
    };

    onGetClients();
  }, []);

  return (
    <>
      <Table<Client>
        columns={columns}
        dataSource={clients}
        onChange={onChange}
        showSorterTooltip={{ target: 'sorter-icon' }}
      />
      <ClientForm/>
      <Button type="primary" htmlType="submit" onClick={onCreateClick}>Зарегестрировать клиента</Button>
    </>
  )
};

export default Clients;