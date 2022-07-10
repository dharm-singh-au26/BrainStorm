import axios from 'axios';
import fetch from "node-fetch";

const baseURL = process.env.JSON_PLACEHOLDER_BASE_URL || 'https://jsonplaceholder.typicode.com'

const instance = axios.create({
    baseURL: baseURL,
    timeout: 100000,
    headers: {
        'X-Custom-Header': 'application/json; charset=UTF-8'
    }
});

export const getJPHPost = async () => {
    try {
        const result = await instance.get('/posts')
        return JSON.stringify(result.data)
    } catch (error) {
        console.log(error)
        return {
            message: 'something went wrong'
        }
    }
}