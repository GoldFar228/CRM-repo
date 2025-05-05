import { useState } from 'react';
import './App.css';
import Header from './components/Header-component/Header';

function App() {
  let [inputValue, setInputValue] = useState("321")
  const changeInputValue = (event: any) => {
    if(inputValue === "321"){
      setInputValue("123")
    }
    else{
      setInputValue("321")
    }
  }

  return (
    <div>
      <Header></Header>
      <div>123123</div>
      <div>
        <div>datasss</div>
        <div>{inputValue}</div>
        <input type='button' value={"123"}  onClick={changeInputValue}/>
      </div>
    </div>
  );
}

export default App;
