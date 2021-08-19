import React, { FC, useRef, useEffect } from 'react';
import {
  addEventListenerMessage,
  removeEventListenerMessage,
  postMessageToContentWindow,
} from 'lcdp-message';
import styles from './index.less';

interface HomePageProps {}

const HomePage: FC<HomePageProps> = () => {
  const ref = useRef();
  const onMessage = (data: any) => {
    console.log(data);
  };
  useEffect(() => {
    addEventListenerMessage(onMessage);
    return () => {
      removeEventListenerMessage(onMessage);
    };
  }, []);

  return (
    <div>
      <div
        style={{
          color: '#fff',
          backgroundColor: '#56f',
          textAlign: 'center',
          lineHeight: '40px',
          fontSize: '14px',
          marginBottom: '50px',
        }}
        onClick={() => {
          if (ref.current && ref.current?.contentWindow) {
            postMessageToContentWindow(ref.current?.contentWindow, 'Data', '*');
          }
        }}
      >
        发送消息
      </div>
      <iframe
        style={{ width: '100%', height: '100vh', border: 'none' }}
        ref={ref}
        src="http://localhost:8802/#/list"
        className={styles.center}
      ></iframe>
    </div>
  );
};

export default HomePage;
