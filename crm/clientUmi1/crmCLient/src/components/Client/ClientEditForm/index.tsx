import { request } from "@umijs/max";
import type { FormProps } from 'antd';
import { Button, DatePicker, Form, Input, message } from 'antd';
import { Client, Note } from "../../../../typings";
import { useEffect, useState } from "react";

const { TextArea } = Input;

interface Props {
    client: Client | null;
    initialContent?: string | null;
}
interface CreateNoteForm {
    content: string;
}

const ClientEditForm: React.FC<Props> = ({ client, initialContent }) => {
    const [form] = Form.useForm<CreateNoteForm>();
    const [info, setInfo] = useState("");

    useEffect(() => {
        if (initialContent) {
            form.setFieldsValue({ content: initialContent });
        } else {
            form.resetFields();
        }
    }, [initialContent, client]); // обновляется при смене клиента или текста
    
    const onCreateOrUpdateNote = async (data: CreateNoteForm) => {
        if (!client) return;

        // Получаем все заметки для клиента
        const existingNotes = await request<Note[]>(`/api/Notes/GetNotesForClient?id=${client.id}`, {
            method: 'GET',
        });
        if (existingNotes.length > 0) {
            // Обновляем первую найденную запись
            const existingNote = existingNotes[0];
            await request(`/api/Notes/UpdateNote/${existingNote.id}`, {
                method: 'PUT',
                requestType: 'json',
                headers: {
                    'Content-Type': 'application/json',
                },
                data: {
                    content: data.content,
                    assignedToId: client.id,
                }
            });
            message.success('Запись обновлена');
        } else {
            // Создаём новую
            await request('/api/Notes/CreateNote', {
                method: 'POST',
                requestType: 'json',
                headers: {
                    'Content-Type': 'application/json',
                },
                data: {
                    content: data.content,
                    assignedToId: client.id,
                }
            });
            message.success('Запись добавлена');
        }

    };

    const onFinish: FormProps<CreateNoteForm>['onFinish'] = async (data) => {
        await onCreateOrUpdateNote(data);
    };

    

    return (
        <Form
            form={form}
            name="note-form"
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 16 }}
            style={{ maxWidth: 600 }}
            onFinish={onFinish}
            autoComplete="off"
        >
            <Form.Item<CreateNoteForm>
                label="Подсказка"
                name="content"
                rules={[{ required: true, message: 'Введите текст заметки' }]}
            >
                <TextArea rows={6} />
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Button type="primary" htmlType="submit" disabled={!client}>
                    {client ? 'Добавить/Обновить запись' : 'Выберите клиента'}
                </Button>
            </Form.Item>
        </Form>
    );
};


export default ClientEditForm;
