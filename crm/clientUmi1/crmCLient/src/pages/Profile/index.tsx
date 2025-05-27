import React, { useEffect, useState } from 'react';
import { Badge, Descriptions } from 'antd';
import type { DescriptionsProps } from 'antd';
import { jwtDecode } from 'jwt-decode';
import { request } from '@umijs/max';
import { Client, Deal } from 'typings';


const Profile: React.FC = () => {
    const [userInfo, setUserInfo] = useState<{
        name: string;
        id: string;
        role: string;
    } | null>(null);
    const [deals, setDeals] = useState<Array<Deal>>([]);
    const [clients, setClients] = useState<Array<Deal>>([]);

    useEffect(() => {
        const token = localStorage.getItem('token')?.replace('Bearer ', '');
        const onGetDeals = async () => {
            const res = await request('api/Deal/GetDeals', {
                method: "GET"
            });

            await setDeals(res.filter((r: Deal) => r.status === 3));
        };
        
        onGetDeals();

        const onGetClients = async () => {
            const res = await request('api/Client/GetMyClients', {
                method: "GET"
            });

            await setClients(res);
        };

        onGetClients();
        
        if (token) {
            const decoded = jwtDecode<any>(token);

            const name = decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"];
            const id = decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"];
            const role = decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];

            setUserInfo({ name, id, role });
        }
    }, []);
    const items: DescriptionsProps['items'] = [
        {
            key: '1',
            label: 'Пользователь',
            children: userInfo?.name,
        },
        {
            key: '2',
            label: 'Роль',
            children: userInfo?.role,
            span: 2
        },
        {
            key: '3',
            label: 'Выполнено сделок',
            children: deals?.length,
        },
        {
            key: '4',
            label: 'Привлечено клиентов',
            children: clients.length,
            span: 2
        },

        {
            key: '5',
            label: 'Заработано средств',
            children: deals.reduce((accumulator, currentValue) => accumulator + currentValue.budget, 0),
        },
    ];
    return (
        <>
            <Descriptions title="Информация о пользователе" bordered items={items} />
        </>

    )
};

export default Profile;