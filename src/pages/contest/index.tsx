import React, { useEffect, useState } from 'react'
import { getContests } from '../../services';
import { Card, Col, Row, List, Tag } from "antd";
import { useNavigate } from 'react-router-dom';

interface Contest {
	id: string;
	name: string;
	description: string;
	startDate: string;
	endDate: string;
	location: string;
	categories: Category[];
	criterias: Criteria[];
}

interface Category {
	id: string;
	name: string;
	description: string;
}

interface Criteria {
	weight: number;
	criteriaName: string;
	criteriaDescription: string;
}

function ContestPage() {

	const [contests, setContests] = useState<Contest[]>([]);
	const [pageNum, setPageNum] = useState(1);
	const [pageSize, setPageSize] = useState(100);
	const [status, setStatus] = useState<'UpComing' | 'Completed' | 'Ongoing'>('UpComing');
	const [keyword, setKeyword] = useState('');
	const navigate = useNavigate();

	const handleGetContest = async () => {
		try {
			const response = await getContests(status, pageNum, pageSize);
			console.log('Fetched contests:', response);
			setContests(response.data.pageData);
		} catch (error) {
			console.error('Error fetching contests:', error);
		}
	};

	useEffect(() => {
		handleGetContest();
	}, [])

	const handleCardClick = (contestId: string) => {
		// Navigate to contest registration page with contest ID
		navigate(`/contest-registration/${contestId}`);
	};


	return (
		<div>
			<Row gutter={[16, 16]}>
				{contests.map((contest) => (
					<Col key={contest.id} span={8}>
						<Card
							title={contest.name}
							extra={<Tag color="blue">{contest.location}</Tag>}
							bordered={true}
							style={{
								minHeight: 300,
								cursor: "pointer",
								transition: "transform 0.2s",
							}}
							onClick={() => handleCardClick(contest.id)}
							onMouseEnter={(e) => {
								e.currentTarget.style.transform = "scale(1.05)";
							}}
							onMouseLeave={(e) => {
								e.currentTarget.style.transform = "scale(1)";
							}}
						>
							<p>
								<strong>Start Date:</strong>{" "}
								{new Date(contest.startDate).toLocaleDateString()}
							</p>
							<p>
								<strong>End Date:</strong>{" "}
								{new Date(contest.endDate).toLocaleDateString()}
							</p>
							<List
								header={<strong>Categories</strong>}
								dataSource={contest.categories}
								renderItem={(category) => (
									<List.Item>
										<strong>{category.name}</strong>
									</List.Item>
								)}
							/>
							<List
								header={<strong>Criterias</strong>}
								dataSource={contest.criterias}
								renderItem={(criteria) => (
									<List.Item>
										<strong>{criteria.criteriaName}:</strong>(
										{criteria.weight * 100}%)
									</List.Item>
								)}
							/>
						</Card>
					</Col>
				))}
			</Row>
		</div>
	)
}

export default ContestPage
