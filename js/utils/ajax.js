//promise based ajax (similar to fetch api)
ajaxReq = (method, url, data, responseType) => {
    return new Promise(function (resolve, reject) {
        let request = new XMLHttpRequest();
        request.responseType = responseType;
        request.onreadystatechange = function () {
            if (request.readyState === XMLHttpRequest.DONE) {
                if (request.status === 200) {
                    resolve(request.response);
                } else {
                    reject(Error(request.status));
                }
            }
        };
        request.onerror = function () {
            reject(Error("Network Error"));
        };
        request.open(method, url, true);
        request.send(data);
    });
}
console.log('1');