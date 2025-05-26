import { history, request, useModel } from "@umijs/max";
import styles from "./index.module.less";
import type { FormProps } from 'antd';
import { Button, DatePicker, Form, Input, message } from 'antd';
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { LoginRequest, RegisterRequest } from "typings";

const AuthForm: React.FC = () => {
    const [form] = Form.useForm();
    const [isReg, setIsReg] = useState(false);
    const { setInitialState } = useModel('@@initialState');

    const onLogin = async (data: LoginRequest) => {
        try {
            const response = await request('/api/Auth/Login/login', {
                method: 'POST',
                data
            });

            if (response?.token) {
                localStorage.setItem("token", response.token); // сохранение токена в localStorage
                const res = await request('api/User/GetRole', {
                    method: "GET",
                    // credentials: 'include',
                    // headers: {
                    //     authorization: `Bearer ${response.token}`
                    // }
                })
                setInitialState((s) => ({ ...s, role: res.role}))
                message.success("Вы успешно вошли");
                history.push('/home') //history.push хранит историю
            } else {
                message.error("Неверные данные");
            }
        } catch (error) {
            console.error(error);
            message.error("Ошибка при входе");
        }
    }

    const onRegister = async (data: RegisterRequest) => {
        try {
            const response = await request('/api/Auth/Register/register', {
                method: 'POST',
                data
            });

            if (response?.token) {
                localStorage.setItem("token", response.token); // сохранение токена в localStorage
                message.success("Вы успешно зарегестрировались");
                const res = await request('api/User/GetRole', {
                    method: "GET"
                });
                setInitialState((s) => ({ ...s, role: res.role}));
                history.push('/home'); //history.push хранит историю
            } else {
                message.error(response.errorMessage ?? "Неверные данные");
            }
        } catch (error) {
            console.error(error);
            message.error("Ошибка при регистрации");
        }
    }

    const onFinish: FormProps<RegisterRequest>['onFinish'] = async (data) => {
        await isReg ? onRegister(data as RegisterRequest) : onLogin(data as LoginRequest);
    };

    const onFinishFailed: FormProps<RegisterRequest>['onFinishFailed'] = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    const onRegisterClicked = () => {
        setIsReg(prev => !prev);
    };

    return (
        <Form
            form={form}
            name="login-form"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            style={{ maxWidth: 600 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
        >
            <Form.Item<RegisterRequest>
                label="Email"
                name="email"
                rules={[{ required: true, message: 'Please input your email!' }]}
            >
                <Input />
            </Form.Item>

            <Form.Item<RegisterRequest>
                label="Password"
                name="password"
                rules={[{ required: true, message: 'Please input your password!' }]}
            >
                <Input.Password />
            </Form.Item>

            {isReg && (
                <>
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
                </>
            )}

            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Button type="primary" htmlType="submit">
                    {isReg ? "Зарегестрироваться" : "Войти"}
                </Button>
                <Button type="link" onClick={onRegisterClicked}>
                    {isReg ? "Вход" : "Регистрация"}
                </Button>
            </Form.Item>
        </Form>
    );
};

export default AuthForm;
