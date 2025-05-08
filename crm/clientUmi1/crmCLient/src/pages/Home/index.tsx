import Guide from '@/components/Guide';
import { trim } from '@/utils/format';
import { PageContainer } from '@ant-design/pro-components';
import { request, useModel } from '@umijs/max';
import styles from './index.less';
import { useState } from 'react';

const HomePage: React.FC = () => {
  const { name } = useModel('global');

  const [data, setData] = useState<Array<{ id: number, name: string, phone: string, email: string, createdAt: Date, createdById: number }>>();

  const clickButton = () => {
    request("/api/Client/GetClients",
      { method: 'GET' }
    )
      .then((response) => {
        console.log(response);
        setData(response)
      })
  }


  return (
    <PageContainer ghost>
      <div>
        <input type="button" onClick={clickButton} />
      </div>
      <div className='container'>
        {data?.map((d) => d.name + "\n" + d.phone)+ "\n"}
      </div>
    </PageContainer>
  );
};

export default HomePage;
