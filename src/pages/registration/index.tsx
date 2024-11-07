import { loadStripe } from '@stripe/stripe-js';
import React, { useEffect, useState } from 'react';
import config from '../../secret';
import { BaseService, getKois } from '../../services';
import { useParams } from 'react-router-dom';
import { getContestDetail } from '../../services/contest';
import { Card, Col, Row, List, Tag, Typography, Divider, Form, Button, InputNumber, Input, Select } from 'antd';
import { useForm } from "antd/es/form/Form";
import { KoiEntry } from '../../models/KoiEntry';
import { getUserFromLocalStorage } from '../../utils';
const { Title, Text } = Typography;
const { Option } = Select;

const RegistrationContest = () => {
    const { id } = useParams();
    const [contest, setContest] = useState(null);
    const [form] = useForm();
    const [fishOptions, setFishOptions] = useState([]);
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10); // Default page size
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [searchText, setSearchText] = useState('');
    const user = getUserFromLocalStorage();


    useEffect(() => {
        // Fetch fish data for the logged-in member
        const fetchFishData = async () => {
            if (user) {
                try {
                    const response = await getKois(searchText, page, pageSize);
                    console.log('====================================');
                    console.log("Koi", response);
                    console.log('====================================');
                    const data = response.pageData || [];
                    console.log('====================================');
                    console.log(data);
                    console.log('====================================');
                    setFishOptions(data);
                    console.log('====================================');
                    console.log(fishOptions);
                    console.log('====================================');
                } catch (error) {
                    console.error('Error fetching fish data:', error);
                    // message.error('Failed to load fish data');
                }
            }
        };

        fetchFishData();
    }, []);

    useEffect(() => {
        handleGetContest();
    }, []);

    const handleGetContest = async () => {
        try {
            const contestData = await getContestDetail(id);
            setContest(contestData.data);
        } catch (error) {
            console.error('Error fetching contest details:', error);
        }
    };


    const handleRegistration = async (values) => {
        const stripePromise = await loadStripe(config.STRIPE_PUBLIC_KEY);
        console.log('====================================');
        console.log(values);
        console.log('====================================');
        try {
            const fakeData = {
                "contestId": id,
                "note": values.note,
                "displayName": values.displayName,
                "fishId": values.fishId,
                "amount": 5
            }

            const response = await BaseService.post({ url: '/api/member/contest-registration', payload: fakeData })

            const { sessionId } = response.data;

            const stripe = stripePromise;
            form.resetFields();
            await stripe?.redirectToCheckout({ sessionId });
        } catch (error) {
            console.error("Error during registration:", error);
        }
    };

    if (!contest) {
        return <div>Loading contest details...</div>;
    }

    return (
        <div style={{ padding: '20px' }}>
            <Row gutter={[16, 16]}>
                <Col span={24}>
                    <div className="contest-header">
                        <Title level={2} className="contest-title">{contest.name}</Title>
                        <Tag color="blue" className="contest-location">{contest.location}</Tag>
                    </div>

                    <Divider />

                    <p className="contest-date">
                        <strong>Start Date:</strong> {new Date(contest.startDate).toLocaleDateString()}
                    </p>
                    <p className="contest-date">
                        <strong>End Date:</strong> {new Date(contest.endDate).toLocaleDateString()}
                    </p>

                    <Divider />

                    <List
                        header={<strong>Categories</strong>}
                        dataSource={contest.categories}
                        renderItem={(category: any) => (
                            <List.Item className="contest-category" style={{ padding: '10px 0' }}>
                                <Text strong>{category.name}</Text>
                                <Text type="secondary" style={{ marginLeft: '10px' }}>
                                    {category.description}
                                </Text>
                            </List.Item>
                        )}
                    />

                    <Divider />

                    <List
                        header={<strong>Criterias</strong>}
                        dataSource={contest.criterias}
                        renderItem={(criteria: any) => (
                            <List.Item className="contest-criteria" style={{ padding: '10px 0' }}>
                                <Text>
                                    <strong>{criteria.criteriaName}:</strong> ({criteria.weight * 100}%)
                                    <Text type="secondary" style={{ marginLeft: '10px' }}>
                                        {criteria.criteriaDescription}
                                    </Text>
                                </Text>
                            </List.Item>
                        )}
                    />
                </Col>
            </Row>

            {/* <div style={{ marginTop: '20px' }}>
                <button onClick={handleRegistration} className='py-6 px-9 bg-red-800 text-gray-50 rounded-md' style={{ padding: '10px 20px', fontSize: '16px' }}>
                    Register for Contest
                </button>
            </div> */}

            <h1 className='text-3xl text-center mt-36'>Registration your koi to this contest</h1>
            {
                user ? <Form
                    name="registration"
                    onFinish={handleRegistration}
                    layout="vertical"
                    style={{ maxWidth: 600, margin: 'auto' }}
                    form={form}
                >
                    <Form.Item
                        label="Display Name"
                        name="displayName"
                        rules={[{ required: true, message: 'Please enter your display name!' }]}
                    >
                        <Input placeholder="Your display name" />
                    </Form.Item>

                    <Form.Item
                        label="Note"
                        name="note"
                        rules={[{ required: true, message: 'Please enter a note!' }]}
                    >
                        <Input placeholder="I want to join this contest" />
                    </Form.Item>

                    <Form.Item
                        label="Fish ID"
                        name="fishId"
                        rules={[{ required: true, message: 'Please select your fish!' }]}
                    >
                        <Select placeholder="Select your fish" loading={loading} notFoundContent={error ? error : "No fish found"}>
                            {fishOptions.length > 0 ? (
                                fishOptions.map(koi => (
                                    <Option key={koi.id} value={koi.id}>
                                        {koi.name}
                                    </Option>
                                ))
                            ) : (
                                <Option disabled>No fish available</Option>
                            )}
                        </Select>
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            Register
                        </Button>
                    </Form.Item>
                </Form> : (<>
                    <p>You must login before registration</p>
                </>)
            }
        </div>
    );
};

export default RegistrationContest;
