import { request } from "@umijs/max";
import type { FormProps } from 'antd';
import { Button, Form, message, Select } from 'antd';
import { useEffect, useState } from "react";
import { Deal } from "typings";
import { StatusMap } from "../DealForm";

const { Option } = Select

interface Props {
    deal: Deal | null;
    initialContent?: string | null;
}

interface CreateDealForm {
    status: number
}

const DealEditForm: React.FC<Props> = ({ deal, initialContent }) => {
    const [form] = Form.useForm<CreateDealForm>();
    const [info, setInfo] = useState("");

    useEffect(() => {
        if (initialContent) {
            form.setFieldsValue({ status: Number(initialContent) });
        } else {
            form.resetFields();
        }
    }, [initialContent, deal]); // обновляется при смене клиента или текста

    const onUpdateDeal = async (status: number) => {
        if (!deal) return;

        // Получаем все заметки для клиента


        await request(`/api/Notes/UpdateNote/${deal.id}`, {
            method: 'PUT',
            requestType: 'json',
            headers: {
                'Content-Type': 'application/json',
            },
            data: {
                status: deal.status
            }
        });
        message.success('Запись обновлена');


    };

    const onFinish: FormProps<CreateDealForm>['onFinish'] = async (data) => {
        await onUpdateDeal(data.status);
    };



    return (
        <Form
            form={form}
            name="deal-form"
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 16 }}
            style={{ maxWidth: 600 }}
            onFinish={onFinish}
            autoComplete="off"
        >

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

            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Button type="primary" htmlType="submit">
                    изменить статус
                </Button>
            </Form.Item>
        </Form>
    );
};


export default DealEditForm;
