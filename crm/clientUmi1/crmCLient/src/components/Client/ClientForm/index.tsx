import { request } from "@umijs/max";
import type { FormProps } from 'antd';
import { Button, DatePicker, Form, Input, message } from 'antd';
import { Client } from "typings";

const ClientForm: React.FC = () => {
    const [form] = Form.useForm();

    const onCreateClient = async (data: Client) => {
        const res = request("api/Client/CreateClient", {
            method: "POST",
            data
        })
    };
    
    const onFinish: FormProps<Client>['onFinish'] = async (data) => {
        await onCreateClient(data);
        form.resetFields();
    };

    const onFinishFailed: FormProps<Client>['onFinishFailed'] = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <Form
            form={form}
            name="client-form"
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 16 }}
            style={{ maxWidth: 600 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
        >
            <Form.Item<Client>
                label="Email"
                name="email"
                rules={[{ required: true, message: 'Please input your email!' }]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="Имя"
                name="name"
                rules={[{ required: true, message: 'Please input your name!' }]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="Телефон"
                name="phone"
                rules={[{ required: true, message: 'Please input your phone!' }]}
            >
                <Input />
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Button type="primary" htmlType="submit">
                    Создать клиента
                </Button>
            </Form.Item>
        </Form>
    );
};

export default ClientForm;
