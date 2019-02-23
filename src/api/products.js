import axios from 'axios'

export function getProducts() {
    const url = '/api/getProducts'

    return axios.get(url).then((res) => {
        return Promise.resolve(res.data)
    })
}