import Request from '../lib/Request'

// const http = new Request('http://localhost:4000', 10000)
const http = new Request('http://42.193.160.135:4000', 10000)


export const getImageList = (data: any) => {
  return http.get('/image/imagelList', data)
}

export const register = (data: any) => {
  return http.post('/login/register', data)
}

export const login = (data: any) => {
  return http.post('/login/login', data)
}

export const saveJson = (data: any) => {
  return http.post('/jsoninfo/saveJson', data)
}
export const addTemplate = (data: any) => {
  return http.post('/template/addTemplate', data)
}
export const queryTemplateById = (data: any) => {
  return http.get('/template/queryTemplateById', data)
}
export const queryJsonById = (data: any) => {
  return http.get('/jsoninfo/queryJsonById', data)
}

export const updateJsonById = (data: any) => {
  return http.post('/jsoninfo/updateJsonById', data)
}
export const queryTemplate = (data: any) => {
  return http.get('/template/queryTemplate', data)
}


