import { API_PATHS } from "../consts";
import { BaseService } from "./BaseService";

export const registerKoiFish = async (values) => {
	await BaseService.post({ url: API_PATHS.REGISTER_KOI, payload: values });
}


export const getVariety = async () => {
	const response = await BaseService.get({ url: API_PATHS.KOI_VARIETY });
	return response
}

export const getKois = async (searchText: string, page: number, pageSize: number) => {
	const payload = {
		searchCondition: {
			isDeleted: false,
			keyword: searchText,
		},
		pageInfo: {
			pageNum: page,
			pageSize,
		},
	};

	const response = await BaseService.post({ url: API_PATHS.GET_USER_KOI, payload });
	return response.data;
};
