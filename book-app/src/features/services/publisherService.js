import AxiosConfig from '../../core/services/axiosConfig.js';

const RESOURCE = '/Publishers';

export async function getAllPublishers() {
    const response = await AxiosConfig.get(RESOURCE);
    return response.data;
}

export const fetchSortedPublishers = async (sortType) => {
    var response = null;
    if (sortType !== undefined && sortType !== null) {
        response = await AxiosConfig.get('/Publishers/sort?sortType=' + sortType);
    } else {
        response = await AxiosConfig.get('/Publishers/sort');
    }
    return response.data;
};

export const fetchSortTypes = async () => {
    try {
        const response = await AxiosConfig.get('/Publishers/sortTypes');
        return response.data;
    } catch (error) {
        throw new Error('Failed to fetch sort types');
    }
};