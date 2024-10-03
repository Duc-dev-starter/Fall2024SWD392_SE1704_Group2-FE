import { Badge, Card, Col, Image, Rate, Row, Skeleton } from 'antd'
import React, { useState } from 'react'
import { CustomBreadcrumb } from '../../../components';
import { Link } from 'react-router-dom';


const Dashboard = () => {

    const [loading, setLoading] = useState(false);
    const [numCourses, setNumCourses] = useState(0);
    const [numStaffs, setNumStaffs] = useState(0);
    const [numberReferee, setNumberReferee] = useState(0);
    const [numberBlogs, setNumberBlogs] = useState(0);

    const competitions = [
        {
            id: 1,
            name: "Koi Championship 2024",
            image_url: "https://example.com/koi1.jpg",
            instructor_name: "John Doe",
            category_name: "Koi Variety A",
            rank: 1,
            average_rating: 5,
        },
        {
            id: 2,
            name: "Regional Koi Contest",
            image_url: "https://example.com/koi2.jpg",
            instructor_name: "Jane Smith",
            category_name: "Koi Variety B",
            rank: 2,
            average_rating: 5,
        },
        {
            id: 3,
            name: "National Koi Show",
            image_url: "https://example.com/koi3.jpg",
            instructor_name: "Michael Johnson",
            category_name: "Koi Variety C",
            rank: 3,
            average_rating: 5,
        },
    ];


    return (
        <>
            <CustomBreadcrumb />
            {loading ? (
                <div className="flex flex-col items-center mt-10">
                    <Skeleton active paragraph={{ rows: 4 }} />
                    <Skeleton.Image style={{ width: '100%', height: 150, marginBottom: 20 }} />
                    <Skeleton active paragraph={{ rows: 1 }} />
                    <Skeleton.Image style={{ width: '100%', height: 100, marginBottom: 20 }} />
                </div>
            ) : (
                <>
                    <div className="flex justify-between drop-shadow-xl gap-4">
                        <Badge.Ribbon text="Koichamp" color="blue">
                            <Card title="Total competitions in the system" bordered={false} style={{ width: 300 }}>
                                <div className="flex justify-center gap-2">
                                    <h1>{numCourses}</h1>
                                    {/* <PlaySquareOutlined style={{ fontSize: "20px", color: "red" }} /> */}
                                </div>
                            </Card>
                        </Badge.Ribbon>

                        <Badge.Ribbon text="Koichamp" color="orange">
                            <Card title="Total Staffs in the system" bordered={false} style={{ width: 300 }}>
                                <div className="flex justify-center gap-2">
                                    <h1>{numStaffs}</h1>
                                    {/* <TeamOutlined style={{ fontSize: "20px", color: "gray" }} /> */}
                                </div>
                            </Card>
                        </Badge.Ribbon>

                        <Badge.Ribbon text="Koichamp" color="green">
                            <Card title="Total Referees in the system" bordered={false} style={{ width: 300 }}>
                                <div className="flex justify-center gap-2">
                                    <h1>{numberReferee}</h1>
                                    {/* <TeamOutlined style={{ fontSize: "20px", color: "gray" }} /> */}
                                </div>
                            </Card>
                        </Badge.Ribbon>

                        <Badge.Ribbon text="Koichamp" color="red">
                            <Card title="Total Blogs in the system" bordered={false} style={{ width: 300 }}>
                                <div className="flex justify-center gap-2">
                                    <h1>{numberBlogs}</h1>
                                    {/* <FileDoneOutlined style={{ fontSize: "20px", color: "blue" }} /> */}
                                </div>
                            </Card>
                        </Badge.Ribbon>
                    </div>
                    {/* <div className="mt-9 drop-shadow-xl">
                        <Row gutter={24}>
                            <Col span={12}>
                                <Card bordered={false}>
                                    <UserChart />
                                </Card>
                            </Col>
                            <Col span={12}>
                                <Card bordered={false}>
                                    <RevenueChart />
                                </Card>
                            </Col>
                        </Row>
                    </div> */}
                    <div className="mt-6 drop-shadow-xl">
                        <span className="font-bold text-lg text-rose-400">Top 3 newest competitions in the system</span>
                        <Row gutter={24} className="mt-2">
                            {competitions.map((competition) => (
                                <Col span={8} key={competition.id}>
                                    <Card bordered={false} className="hover:cursor-pointer h-64">
                                        <div style={{ display: "flex", alignItems: "center" }} className="justify-between">
                                            <span className="font-bold" style={{ marginLeft: 10 }}>
                                                {competition.name}
                                            </span>
                                        </div>
                                        <div className="flex gap-5 items-center">
                                            <Image src={competition.image_url} width={150} height={100} />
                                            <div className="gap-7">
                                                <p className="text-gray-700">
                                                    <span className="font-bold">Referee:</span> <Link to="">{competition.instructor_name}</Link>
                                                </p>
                                                <p className="text-gray-700">
                                                    <span className="font-bold">Category:</span> <Link to="">{competition.category_name}</Link>
                                                </p>
                                                <div className="flex gap-2">
                                                    <span className="font-bold">Rank:</span>
                                                    <p className="text-gray-700">
                                                        {competition.rank}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex flex-col mt-auto">
                                            <Rate allowHalf defaultValue={competition.average_rating} disabled className="mt-3 ml-3" />
                                            <div className="py-2 flex justify-end"></div>
                                        </div>
                                    </Card>
                                </Col>
                            ))}
                        </Row>
                    </div>
                </>
            )}
        </>
    )
}

export default Dashboard