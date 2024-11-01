import React from 'react';
import { Button, Result } from 'antd';

const Cancel: React.FC = () => (
    <Result
        status="warning"
        title="You are cancel to checkout."
        extra={
            <Button type="primary" key="console">
                Back to Home
            </Button>
        }
    />
);

export default Cancel;