import Guide from '@/components/Guide';
import { trim } from '@/utils/format';
import { PageContainer } from '@ant-design/pro-components';
import { Access, request, useAccess, useModel } from '@umijs/max';
import styles from './index.less';
import { useState } from 'react';
import { Role } from 'typings';

const HomePage: React.FC = () => {
  const { name } = useModel('global');

  const [data, setData] = useState<Array<{ id: number, name: string, phone: string, email: string, createdAt: Date, createdById: number }>>();
  const { isUser } = useAccess();
  const clickButton = () => {
    request("/api/User/GetUsers",
      { method: 'GET' }
    )
      .then((response) => {
        console.log(response);
        setData(response)
      })
  }


  return (
    <Access accessible={isUser}>
      <PageContainer ghost>
        <div className={styles.container}>
          <input type="button" onClick={clickButton} />
        </div>
        <div className='container'>
          {data?.map((d) => d.name + "\n" + d.phone) + "\n"}
        </div>
      </PageContainer>
    </Access>

  );
};

export default HomePage;
