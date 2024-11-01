import React from 'react';
import { Tabs } from 'antd';
import RegisterContest from './RegisterContest';
import RegisterKoi from './RegisterKoi';

const History: React.FC = () => (
    <Tabs
        defaultActiveKey="1"
        centered
        items={[
            {
                label: 'Tab 1',
                key: '1',
                children: <RegisterContest />, // Sử dụng ComponentA trong Tab 1
            },
            {
                label: 'Registed Koi',
                key: '2',
                children: <RegisterKoi />, // Sử dụng ComponentB trong Tab 2
            },
        ]}
    />
);

export default History;
