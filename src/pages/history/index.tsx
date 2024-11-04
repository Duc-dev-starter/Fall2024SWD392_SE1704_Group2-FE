import React, { useState } from 'react';
import { Tabs } from 'antd';
import RegisterContest from './RegisterContest';
import RegisterKoi from './RegisterKoi';

const History: React.FC = () => {
    const [activeTab, setActiveTab] = useState<string>('1'); // Track the active tab

    const handleTabChange = (key: string) => {
        setActiveTab(key);
    };

    return (
        <Tabs
            activeKey={activeTab}
            onChange={handleTabChange}
            centered
        >
            <Tabs.TabPane tab="Registered Contest" key="1">
                <RegisterContest activeTab={activeTab} /> {/* Pass activeTab prop */}
            </Tabs.TabPane>
            <Tabs.TabPane tab="Registered Koi" key="2">
                <RegisterKoi activeTab={activeTab} /> {/* Pass activeTab prop */}
            </Tabs.TabPane>
        </Tabs>
    );
};

export default History;
