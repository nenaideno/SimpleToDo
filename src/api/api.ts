import axios from "axios";

let instance = axios.create({
    withCredentials: true,
    baseURL: 'https://jsonplaceholder.typicode.com'
})

export const listAPI = {

    getTodos: () => {
        return instance.get('/todos')
    }

}