import React, { useEffect, useState } from 'react'
import { API_PATHS } from '../../../consts'
import axios from 'axios'
import { Table } from 'antd';
import { BaseService } from '../../../services';

function EditCompetition() {

	const [checkInList, setCheckInList] = useState([]);

	useEffect(() => {
		handleGetCheckInList();
	}, [])

	const handleGetCheckInList = async () => {
		try {
			const response = await BaseService.get({ url: '/api/round/assigned-round' });
			const { data } = response;
			// {
			//     "success": true,
			//     "data": [
			//         {
			//             "participantNumber": 0,
			//             "description": "",
			//             "startDate": "2024-11-05T00:00:00",
			//             "endDate": "2024-11-20T00:00:00",
			//             "contestId": "76507342-d602-4a20-9d5f-571a3da9eae0",
			//             "id": "856e7fb7-f04c-451a-98d4-11e5b6f52458", //round ID
			//             "createdAt": "2024-11-04T22:33:36.5199237",
			//             "updatedAt": "2024-11-04T22:33:36.5199256",
			//             "isDeleted": false
			//         }
			//     ]
			// }
			console.log(data)
			setCheckInList(data);
		} catch (error) {
			console.error(error)
		}
	}

	const handleViewListCheckInforRound = async (id) => {
		try {
			const response = await BaseService.get({ url: `/api/round/check-in-list/${id}` });
			const { data } = response;
			console.log(data)
			setCheckInList(data);
		} catch (error) {
			console.error(error)
		}
	}

	const columns = [
		{
			title: 'Contest ID',
			dataIndex: 'contestId',
			key: 'contestId',
		},
		{
			title: 'Participant Number',
			dataIndex: 'participantNumber',
			key: 'participantNumber',
		},
		{
			title: 'Description',
			dataIndex: 'description',
			key: 'description',
		},
		{
			title: 'Start Date',
			dataIndex: 'startDate',
			key: 'startDate',
			render: (text: string) => new Date(text).toLocaleString(),
		},
		{
			title: 'End Date',
			dataIndex: 'endDate',
			key: 'endDate',
			render: (text: string) => new Date(text).toLocaleString(),
		},
		{
			title: 'Created At',
			dataIndex: 'createdAt',
			key: 'createdAt',
			render: (text: string) => new Date(text).toLocaleString(),
		},
		{
			title: 'Updated At',
			dataIndex: 'updatedAt',
			key: 'updatedAt',
			render: (text: string) => new Date(text).toLocaleString(),
		},
		{
			title: 'Deleted',
			dataIndex: 'isDeleted',
			key: 'isDeleted',
			render: (isDeleted: boolean) => (isDeleted ? 'Yes' : 'No'),
		},
	];

	return (
		<Table dataSource={checkInList} columns={columns} />
	)
}

export default EditCompetition
