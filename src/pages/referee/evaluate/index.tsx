import React, { useState } from 'react';
import { Form, Input, Button, Table, InputNumber, Typography, Image } from 'antd';
import { evaluate } from '../../../services';
import { getUserFromLocalStorage } from '../../../utils';

const { Title } = Typography;

const EvaluateKoi = () => {
    const [form] = Form.useForm();
    const [averageScore, setAverageScore] = useState(0);
    const user = getUserFromLocalStorage();

    const koiData = {
        name: 'Beautiful Koi',
        imageUrl: 'https://example.com/koi-image.jpg',
        detail: 'A high-quality Koi fish with unique colors.',
        roundName: 'Round 1',
        fishId: '10305cf1-378b-491e-aaf4-9dfe59d764d2',
        refereeId: 'ee82b937-3942-49c1-bca1-45982d8c8fb3',
        roundId: '96d273c2-7384-4c81-9d0c-0e89f88011e7'
    };

    const handleFinish = async (values) => {
        const dataToSend = {
            ...values,
            averageScore: averageScore.toFixed(1),
            fishId: koiData.fishId,
            refereeId: user.id,
            roundId: koiData.roundId
        };
        console.log('Submit Data:', dataToSend);
        try {
            await evaluate(dataToSend);
        } catch (error) {
            console.log(error.message);
        }
    };

    const columns = [
        {
            title: 'Criteria',
            dataIndex: 'criteria',
            key: 'criteria'
        },
        {
            title: 'Score',
            dataIndex: 'score',
            key: 'score',
            render: (text, record) => (
                <Form.Item
                    name={record.key}
                    rules={[
                        { required: true, message: `Please enter score for ${record.criteria}` },
                        { type: 'number', min: 0, max: 100, message: 'Score must be between 0 and 100' }
                    ]}
                >
                    <InputNumber min={0} max={100} onChange={(value) => updateScore(record.key, value)} />
                </Form.Item>
            )
        }
    ];

    const criteriaData = [
        { key: 'color', criteria: 'Color' },
        { key: 'pattern', criteria: 'Pattern' },
        { key: 'bodyShape', criteria: 'Body Shape' }
    ];

    const updateScore = (key, value) => {
        form.setFieldsValue({ [key]: value });
        const scores = criteriaData.map((item) => form.getFieldValue(item.key) || 0);
        const total = scores.reduce((acc, curr) => acc + curr, 0);
        setAverageScore(total / criteriaData.length);
    };

    return (
        <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
            {/* Koi Information */}
            <div style={{ display: 'flex', gap: '20px', alignItems: 'center', marginBottom: '30px' }}>
                <Image src={koiData.imageUrl} alt={koiData.name} style={{ maxHeight: '200px', borderRadius: '8px' }} />
                <div>
                    <Title level={3}>{koiData.name}</Title>
                    <p>{koiData.detail}</p>
                    <p><strong>Round:</strong> {koiData.roundName}</p>
                </div>
            </div>

            {/* Evaluation Form */}
            <div>
                <Title level={4}>Evaluate Koi</Title>
                <Form form={form} layout="vertical" onFinish={handleFinish}>
                    <Table
                        columns={columns}
                        dataSource={criteriaData}
                        pagination={false}
                        rowKey="key"
                        style={{ marginBottom: '20px' }}
                    />
                    <Form.Item label="Average Score">
                        <InputNumber value={averageScore.toFixed(1)} disabled />
                    </Form.Item>
                    <Form.Item label="Comments" name="comment" rules={[{ required: true, message: 'Please enter your comments' }]}>
                        <Input.TextArea rows={4} />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">Submit</Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    );
};

export default EvaluateKoi;
