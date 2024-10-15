import { API_PATHS } from "../consts";
import { KoiEntry } from "../models/KoiEntry";
import { BaseService } from "./BaseService";

export const registerKoiFish = async (values) => {
	await BaseService.post({ url: API_PATHS.REGISTER_KOI, payload: values });
}
