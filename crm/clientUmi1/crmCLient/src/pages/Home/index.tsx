import Guide from '@/components/Guide';
import { trim } from '@/utils/format';
import { PageContainer } from '@ant-design/pro-components';
import { Access, request, useAccess, useModel } from '@umijs/max';
import styles from './index.less';
import { useEffect, useState } from 'react';
import { Deal, Role } from 'typings';
import { StatusToString, PriorityToString } from '@/dataForExport';
import { Button, Modal, Table, TableColumnsType, TableProps } from 'antd';


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

const HomePage: React.FC = () => {
  const { name } = useModel('global');

  const [data, setData] = useState<Array<Deal>>();
  const { isUser } = useAccess();

  useEffect(() => {
    const onGetDeals = async () => {
      const res = await request('api/Deal/GetUserDeals', {
        method: "GET"
      });

      await setData(res.filter((r: Deal) => r.status === 2));
    };

    onGetDeals();
  }, [])

  return (
    <Access accessible={isUser}>
      <h1>Сделки в работе</h1>
      <Table<Deal>
        columns={columns}
        dataSource={data}
        onChange={onChange}
        showSorterTooltip={{ target: 'sorter-icon' }}
      />

    </Access>

  );
};

export default HomePage;
