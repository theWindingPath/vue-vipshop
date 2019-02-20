import axios from 'axios'

export function getFlagshipStore() {
    const url = '/api/getFlagshipStore'

    return axios.get(url).then((res) => {
        return Promise.resolve(res.data)
    })
}