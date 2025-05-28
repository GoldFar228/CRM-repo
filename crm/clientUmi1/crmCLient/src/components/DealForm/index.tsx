import { PriorityMap, StatusMap } from "@/dataForExport";
import { request } from "@umijs/max";
import type { FormProps } from 'antd';
import { Button, Form, Input, message, Select } from 'antd';
import { useEffect, useState } from "react";
import { Client } from "typings";


const { Option } = Select;

interface CreateDealForm {
  budget: number;
  status: 1 | 2 | 3;
  priority: 1 | 2 | 3;
  assignedToId: number;
}

const DealForm: React.FC = () => {
  const [form] = Form.useForm<CreateDealForm>();
  const [clients, setClients] = useState<Client[]>([]);

  useEffect(() => {
    request<Client[]>('/api/Client/GetMyClients', { method: 'GET' })
      .then(setClients)
      .catch(() => message.error("Не удалось загрузить клиентов"));
  }, []);

  const onFinish: FormProps<CreateDealForm>['onFinish'] = async (values) => {
    try {
      await request('/api/Deal/CreateDeal', {
        method: 'POST',
        data: values, // { assignedToId, status, budget, priority }
      });
      message.success("Сделка создана");
      form.resetFields();
    } catch (e) {
      message.error("Ошибка при создании сделки");
      console.error(e);
    }
  };

  return (
    <Form
      form={form}
      name="deal-form"
      labelCol={{ span: 5 }}
      wrapperCol={{ span: 16 }}
      style={{ maxWidth: 600 }}
      onFinish={onFinish}
      autoComplete="off"
    >
      <Form.Item
        label="Бюджет"
        name="budget"
        rules={[{ required: true, message: 'Введите бюджет!' }]}
      >
        <Input type="number" />
      </Form.Item>

      <Form.Item
        label="Приоритет"
        name="priority"
        rules={[{ required: true, message: 'Выберите приоритет!' }]}
      >
        <Select>
          {Object.entries(PriorityMap).map(([value, label]) => (
            <Option key={value} value={Number(value)}>
              {label}
            </Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item
        label="Статус"
        name="status"
        rules={[{ required: true, message: 'Выберите статус!' }]}
      >
        <Select>
          {Object.entries(StatusMap).map(([value, label]) => (
            <Option key={value} value={Number(value)}>
              {label}
            </Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item
        label="Клиент"
        name="assignedToId"
        rules={[{ required: true, message: 'Выберите клиента!' }]}
      >
        <Select placeholder="Выберите клиента" allowClear>
          {clients.map(c => (
            <Option key={c.id} value={c.id}>
              {`${c.id} ${c.name} (${c.email})`}
            </Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 4, span: 16 }}>
        <Button type="primary" htmlType="submit">
          Создать сделку
        </Button>
      </Form.Item>
    </Form>
  );
};

export default DealForm;
