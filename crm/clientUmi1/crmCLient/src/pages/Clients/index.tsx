import React, { useEffect, useState } from 'react';
import { Button, Modal, Modal as AntModal, Table, message } from 'antd';
import type { TableColumnsType, TableProps } from 'antd';
import { request, useModel } from '@umijs/max';
import { Client, Note } from 'typings';
import ClientForm from '@/components/Client/ClientForm';
import ClientEditForm from '@/components/Client/ClientEditForm';
import dayjs from 'dayjs';
import { ExclamationCircleOutlined } from '@ant-design/icons';


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
    render: (value: string) => dayjs(value).format('DD.MM.YYYY HH:mm'),
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


const Clients: React.FC = () => {
  const [clients, setClients] = useState<Client[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalEditOpen, setModalEditOpen] = useState(false);
  const [editingClient, setEditingClient] = useState<Client | null>(null);
  const [info, setInfo] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      const res = await request<Client[]>('/api/Client/GetClients', { method: 'GET' });
      setClients(res);
    })();
  }, []);

  // Открыть модалку: если передали клиента — редактируем, иначе создаём
  const openEditModal = async (client?: Client) => {
    const res = await request<Note[]>(`/api/Notes/GetNotesForClient?id=${client?.id}`, {
      method: 'GET',
    });
    setEditingClient(client || null);
    setModalEditOpen(true);

    const note = res.length > 0 ? res[0].content : "";
    setInfo(note);
  };

  const onDeleteClick = async (client?: Client) => {
    if (!client) return;
    AntModal.confirm({
      title: 'Удалить клиента?',
      icon: <ExclamationCircleOutlined />,
      content: `Вы уверены, что хотите удалить клиента ${client.name}?`,
      okText: 'Удалить',
      okType: 'danger',
      cancelText: 'Отмена',
      onOk: async () => {
        try {
          await request(`/api/Client/DeleteClient/${client.id}`, {
            method: 'DELETE',
          });

          message.success('Клиент удалён');

          // Обновляем список клиентов
          const res = await request<Client[]>('/api/Client/GetClients', { method: 'GET' });
          setClients(res);

          // Закрыть модалку
          setModalEditOpen(false);
        } catch (error) {
          message.error('Ошибка при удалении клиента');
          console.error(error);
        }
      },
    });
  }

  return (
    <>
      <Table<Client>
        columns={columns}
        dataSource={clients}
        rowKey="id"
        onChange={onChange}
        showSorterTooltip={{ target: 'sorter-icon' }}
        onRow={record => ({
          onClick: () => openEditModal(record),
        })}
      />
      <Button type="primary" htmlType="submit" onClick={() => setModalOpen(true)}>Зарегестрировать клиента</Button>
      <Modal
        title="Зарегестрируйте клиента"
        centered
        open={modalOpen}
        onCancel={() => setModalOpen(false)}
        footer={null}
      >
        <ClientForm />
      </Modal>
      <Modal
        title="Добавить инфу о клиенте"
        centered
        open={modalEditOpen}
        onCancel={() => setModalEditOpen(false)}
        footer={[
          <Button key="remove" color='danger' variant='dashed' onClick={() => onDeleteClick(editingClient!)}>
            Удалить клиента
          </Button>
        ]}>

        <ClientEditForm client={editingClient} initialContent={info} />
      </Modal>
    </>
  )
};

export default Clients;