import React from 'react';
import { Button, Result } from 'antd';
import { Link } from 'react-router-dom';
import { PATHS } from '../../consts';

const Success: React.FC = () => (
    <Result
        status="success"
        title="Successfully Purchased Cloud Server ECS!"
        subTitle="Order number: 2017182818828182881 Cloud server configuration takes 1-5 minutes, please wait."
        extra={[
            <Link to={PATHS.USER_HISTORY}>
                <Button type="primary" key="console">
                    View History
                </Button>
            </Link>,
            <Link to={PATHS.HOME}>
                <Button key="home">Back to Home</Button>
            </Link>,
        ]}
    />
);

export default Success;



