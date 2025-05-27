import { request } from "@umijs/max";
import type { FormProps } from 'antd';
import { Button, DatePicker, Form, Input, message } from 'antd';
import { Note } from "../../../typings";

const { TextArea } = Input;

const ClientEditForm: React.FC = (props) => {
    const [form] = Form.useForm();

    const onCreateClient = async (data: Note) => {
        const res = request("api/Client/CreateClient", {
            method: "POST",
            data
        })
    };

    const onFinish: FormProps<Note>['onFinish'] = async (data) => {
        await onCreateClient(data);
        form.resetFields();
    };

    const onFinishFailed: FormProps<Note>['onFinishFailed'] = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <Form
            form={form}
            name="note-form"
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 16 }}
            style={{ maxWidth: 600 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
        >
            <Form.Item<Note>
                label="Подсказка"
                name="content"
                rules={[{ required: false, message: 'Please input your note!' }]}
            >
                <TextArea rows={6} />
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Button type="primary" htmlType="submit">
                    Добавить запись о клиенте
                </Button>
            </Form.Item>
        </Form>
    );
};

export default ClientEditForm;
