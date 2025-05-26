import { history, request, useModel } from "@umijs/max";
import type { FormProps } from 'antd';
import { Button, DatePicker, Form, Input, message } from 'antd';
import { useState } from "react";
import { Client } from "typings";

const ClientForm: React.FC = () => {
    const [form] = Form.useForm();

    const onCreateClient = () => {
        console.log(11)
    };

    const onFinish: FormProps<Client>['onFinish'] = async (data) => {
        await onCreateClient();
    };

    const onFinishFailed: FormProps<Client>['onFinishFailed'] = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    // const onRegisterClicked = () => {
    //     setIsReg(prev => !prev);
    // };

    return (
        <Form
            form={form}
            name="client-form"
            labelCol={{ span: 8 }}
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
                label="Name"
                name="name"
                rules={[{ required: true, message: 'Please input your name!' }]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="Phone"
                name="phone"
                rules={[{ required: true, message: 'Please input your phone!' }]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="DatePicker"
                name="DatePicker"
                rules={[{ required: true, message: 'Please input!' }]}
            >
                <DatePicker />
            </Form.Item>


            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Button type="link" htmlType="submit">
                    Создать клиента
                </Button>
            </Form.Item>
        </Form>
    );
};

export default ClientForm;
