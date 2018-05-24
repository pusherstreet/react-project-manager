export default (url: string, params?: any): Promise<Response> => {
    params = params || {};
    params.headers = params.headers || {};
    if (localStorage.getItem('jwt'))
        params.headers['Authorization'] = 'Bearer ' + localStorage.getItem('jwt');
    let fetchTask = fetch(url, params)
    return fetchTask;
}