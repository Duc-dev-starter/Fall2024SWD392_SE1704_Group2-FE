import { url } from "inspector";
import { API_PATHS } from "../consts"
import { BaseService } from "./BaseService"

export const getCategories = async (
	pageNum: number = 1,
	keyword: string = "",
	pageSize: number = 10

) => {
	try {

		const response = await BaseService.post({
			url: API_PATHS.GET_CATEGORIES, payload: {
				searchCondition: {
					keyword: keyword || "",
				},
				pageInfo: {
					pageNum: pageNum,
					pageSize: pageSize,
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

export const createCategory = async (categoryName: string) => {

	console.log(categoryName);

	const response = await BaseService.post({ url: API_PATHS.CREATE_CATEGORY, payload: categoryName })

	console.log('====================================');
	console.log(response.success);
	console.log('====================================');

	return response;

}

export const deleteCategory = async (id) => {
	try {

		const response = await BaseService.delete({ url: `${API_PATHS.DELETE_CATEGORY}/${id}`, payload: id });
		if (response.success) {
			return response.success
		}
	} catch (error) {
		console.log(error);
	}
}
