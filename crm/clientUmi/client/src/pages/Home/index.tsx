import Guide from '@/components/Guide';
import { trim } from '@/utils/format';
import { PageContainer } from '@ant-design/pro-components';
import { request, useModel } from '@umijs/max';
import styles from './index.less';
import { useState } from 'react';

const HomePage: React.FC = () => {
  const [input, setInput] = useState<string>("");

  const onChangeFunc = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
    console.log(input);
    
  }
  const clickButton = () =>{
    request("/api/Client/GetClients", {
      method: 'GET'
    }).then((response: any) => {
      console.log(response);
    })
  }
  return (
    <PageContainer ghost>
      <div>
        <div>{input}</div>
        <input type="text" value={input} onChange={onChangeFunc}/>
        <input type='button' value='button' onClick={clickButton}/>
      </div>
    </PageContainer>
  );
};

export default HomePage;
