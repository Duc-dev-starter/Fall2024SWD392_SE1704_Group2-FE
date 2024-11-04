import React, { useState } from 'react';
import { Tabs } from 'antd';
import RegisterContest from './RegisterContest';
import RegisterKoi from './RegisterKoi';

const History: React.FC = () => {
    const [activeTab, setActiveTab] = useState<string>('1'); // Track the active tab

    const handleTabChange = (key: string) => {
        setActiveTab(key);
    };

    const items = [
        {
            key: '1',
            label: 'Registered Contest',
            children: <RegisterContest activeTab={activeTab} />, // Render the content for this tab
        },
        {
            key: '2',
            label: 'Registered Koi',
            children: <RegisterKoi activeTab={activeTab} />, // Render the content for this tab
        },
    ];


    return (
        <Tabs
            activeKey={activeTab}
            onChange={handleTabChange}
            centered
            items={items}
        />
    );
};

export default History;
