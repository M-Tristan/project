import Request from '../lib/Request'

// const http = new Request('http://localhost:4000',10000)
const http = new Request('http://42.193.160.135:4000',10000)


export const getImageList = (data: any) => {
    return http.get('/image/imagelList', data)
}
