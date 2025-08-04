import axios from './config'

export const getBooks = async (page = 1) => {
    return axios.get(`/books?page=${page}`);
} 