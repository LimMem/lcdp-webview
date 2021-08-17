
import React, { FC, useRef, useEffect, useState } from 'react';
import { addEventListenerMessage, removeEventListenerMessage, postParentMessage } from 'lcdp-message';
import styles from './index.less';


interface HomePageProps { }

const HomePage: FC<HomePageProps> = () => {
  const sendMsgRef = useRef(null);
  const [receiveMsg, setReceiveMsg] = useState('');
  const msgFunc = (d) => {
    console.log(d);
    setReceiveMsg(d);
  };
  useEffect(() => {
    addEventListenerMessage(msgFunc);
    return () => {
      removeEventListenerMessage(msgFunc);
    };
  }, []);

  const sendMsgHandle = () => {
    const { value = '' } = sendMsgRef.current || { value: '' };
    if (value) {
      console.log(value);
      postParentMessage({
        value
      }, '*');
    } else {
      console.error('请输入内容');
    }
  };

  return <div className={styles.center}>
    <div className={styles.title}>灵犀平台Web组件Demo交互</div>
    <textarea placeholder="请输入内容" ref={sendMsgRef} />
    <div className={styles.sendMessage} onClick={sendMsgHandle}>发送消息</div>
    <div className={styles.receiveMsgtitle}>以下为收到的消息</div>
    <div className={styles.receiveMsg}>{receiveMsg}</div>
  </div>;
};

export default HomePage;
