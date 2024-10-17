import { toast } from "react-toastify";
import { API_PATHS } from "../consts";
import { BaseService } from "./BaseService";
import { Criteria } from "../models";

export const createCriteria = async (criteriaData: Criteria) => {
    const response = await BaseService.post({ url: API_PATHS.CREATE_CRITERIA, payload: criteriaData });
    toast.success("Created new criteria successfully");
    return response;
}

export const getCriterias = async () => {
    try {
        const response = await BaseService.get({ url: API_PATHS.GET_CRITERIAS });
        return response;
    } catch (error) {
        console.log(error);
        return {
            data: []
        }
    };
}

export const getCriteriaDetail = async (id: string) => {
    const response = await BaseService.get({ url: `${API_PATHS.GET_UPDATE_DELETE_CRITERIA}/${id}` });
    return response;
};

export const updateCriteria = async (id: string, updateData: Criteria) => {
    await BaseService.put({ url: `${API_PATHS.GET_UPDATE_DELETE_CRITERIA}/${id}`, payload: updateData });
    toast.success("Criteria updated successfully");
}

export const deleteCriteria = async (id: string, name: string, fetchCriterias: () => Promise<void>) => {
    await BaseService.delete({ url: `${API_PATHS.GET_UPDATE_DELETE_CRITERIA}/${id}` });
    toast.success(`Deleted criteria ${name} successfully`);
    await fetchCriterias();
};