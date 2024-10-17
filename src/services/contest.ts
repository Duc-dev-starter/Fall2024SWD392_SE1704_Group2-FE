import { API_PATHS } from "../consts"
import { BaseService } from "./BaseService"

// export const getContest = async () => {
// 	const response = await BaseService.post({ url: API_PATHS.GET_ALL_CONTEST, payload: '' });
// 	return response.data;
// }


export const getContest = async (
	status: "UpComing" | "Completed" | "Ongoing ",
	pageNum: number = 1,
	pageSize: number = 10
) => {
	try {

		const response = await BaseService.post({
			url: API_PATHS.GET_CONTEST, payload: {
				searchCondition: {
					status: status,
					isDeleted: false
				},
				pageInfo: {
					pageNum: pageNum || 1,
					pageSize: pageSize || 10,
				},
			}
		});

		return response;
	} catch (error) {
		console.log('====================================');
		console.log(error);
		console.log('====================================');
		return {
			data: {
				pageInfo: {
					totalItems: 0,
					totalPages: 0,
					pageNum,
					pageSize
				},
				pageData: []
			}
		}
	}
}