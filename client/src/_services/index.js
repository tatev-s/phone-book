export const getRequest = ({endpoint, queryParams = null}) => {
    const requestOptions = {
        method: 'GET'
    };
    const queryString = queryParams? Object.keys(queryParams).map(key => key + '=' + queryParams[key]).join('&'): '';
    return fetch(`${process.env.REACT_APP_API_URL}/${endpoint}?${queryString}`, requestOptions)
        .then(response => response.json());
}

export const  postRequest = ({endpoint, data}) => {
    const requestOptions = {
        method: 'POST',
        headers: new Headers({'content-type': 'application/json'}),
        body: JSON.stringify(data)
    };
    return fetch(`${process.env.REACT_APP_API_URL}/${endpoint}`, requestOptions)
        .then(response => response.json());
}

export const  patchRequest = ({endpoint, data}) => {
    const requestOptions = {
        method: 'PATCH',
        headers: new Headers({'content-type': 'application/json'}),
        body: JSON.stringify(data)
    };
    return fetch(`${process.env.REACT_APP_API_URL}/${endpoint}`, requestOptions)
        .then(response => response.json());
}

export const  deleteRequest = ({endpoint, data}) => {
    const requestOptions = {
        method: 'DELETE'
    };
    const requests = data.map(id=>fetch(`${process.env.REACT_APP_API_URL}/${endpoint}/${id}`, requestOptions));

    return Promise.allSettled(requests);
}

export const  uploadFile = ({endpoint, data}) => {
    const requestOptions = {
        method: 'POST',
        body: data
    };

    return fetch(`${process.env.REACT_APP_API_URL}/${endpoint}`, requestOptions)
        .then(response => response.json());
}

