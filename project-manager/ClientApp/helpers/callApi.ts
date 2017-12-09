export default (url: string, params?: any): Promise<Response> => {
    params = params || {};
    if (localStorage.getItem('jwt'))
        params.headers = params.headers || {};
        params.headers['Authorization'] = 'Bearer ' + localStorage.getItem('jwt');
    let fetchTask = fetch(url, params)
    return fetchTask;
}