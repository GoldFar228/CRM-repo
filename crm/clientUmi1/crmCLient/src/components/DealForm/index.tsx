import { history, request, useModel } from "@umijs/max";
import type { FormProps } from 'antd';
import { Button, DatePicker, Form, Input, message, Select } from 'antd';
import { useEffect, useState } from "react";
import { Client, Deal } from "typings";

const { Option } = Select;

export const StatusMap = {
    1: "Новая",
    2: "В работе",
    3: "Закрыта",
} as const;

export const PriorityMap = {
    1: "Низкий",
    2: "Средний",
    3: "Высокий",
} as const;

const DealForm: React.FC = () => {
    const [form] = Form.useForm();
    const [clients, setClients] = useState<Client[]>([]);
    const [status, setStatus] = useState<Deal[]>([]);

    const onCreateDeal = async (data: Deal) => {
        const res = request("api/Deal/CreateDeal", {
            method: "POST",
            data
        })
    };

    const onFinish: FormProps<Deal>['onFinish'] = async (data) => {
        await onCreateDeal(data);
        form.resetFields();
    };

    const onFinishFailed: FormProps<Deal>['onFinishFailed'] = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    useEffect(() => {
        const fetchClients = async () => {
            try {
                const res = await request('/api/Client/GetMyClients/my', {
                    method: 'GET'
                });
                setClients(res); // предполагается, что res — массив клиентов
            } catch (err) {
                message.error("Не удалось загрузить клиентов");
            }
        };

        fetchClients();
    }, []);
    
    return (
        <Form

            form={form}
            name="deal-form"
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 16 }}
            style={{ maxWidth: 600 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
        >
            <Form.Item<Deal>
                label="Бюджет"
                name="budget"
                rules={[{ required: true, message: 'Please input your email!' }]}
            >
                <Input />
            </Form.Item>

            <Form.Item<Deal>
                label="Приоритет"
                name="priority"
                rules={[{ required: true, message: 'Please input your name!' }]}
            >
                <Select>
                    {Object.entries(PriorityMap).map(([value, label]) => (
                        <Option key={value} value={Number(value)}>
                            {label}
                        </Option>
                    ))}
                </Select>
            </Form.Item>

            <Form.Item<Deal>
                label="Статус"
                name="status"
                rules={[{ required: true, message: 'Please input your phone!' }]}
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
                label="Относится к"
                name="assignedTo"
                rules={[{ required: true }]}>
                <Select placeholder="Выберите клиента" allowClear>
                    {clients.map(client => (
                        <Option key={client.id} value={client.id}>
                            {`${client.id} ${client.name} ${client.email}`}
                        </Option>
                    ))}
                </Select>
            </Form.Item>
            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Button type="primary" htmlType="submit">
                    Создать сделку
                </Button>
            </Form.Item>
        </Form>
    );
};

export default DealForm;
