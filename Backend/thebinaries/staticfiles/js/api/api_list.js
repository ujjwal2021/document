let loc = window.location;

const protocol = loc.protocol
const host = loc.hostname
const port = loc.port

const apiUrl = (path)=>{
    return `${protocol}//${host}:${port}/api${path}`
}
const apis = {
    // services
    'serviceList': apiUrl('/services'),
    // team members
    'memberList': apiUrl('/members'),
    // blogs
    'blogList': apiUrl('/blogs'),
    // info
    'infos':apiUrl('/info'),
}

export const dynamicApis = {
    'blogs': (blogId) => apiUrl(`/blogs/${blogId}/`),
}
export default apis;