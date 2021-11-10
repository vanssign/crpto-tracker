// get buttons from html/DOM
const getButton = document.getElementById('getButton');
const postButton = document.getElementById('postButton');

// API configs
const API_KEY = "d24bddfd51b16745150279d26cf2f1bd50d633f6";


const current_date = new Date();

//promise based ajax (similar to fetch api)
ajaxReq = (method, url, data) => {
    return new Promise(function (resolve, reject) {
        let request = new XMLHttpRequest();
        request.responseType = 'json';
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

//APIURL+endpoint based on query
function setUrl(currency, startDate, endDate) {
    startDate = startDate.toISOString();
    endDate = endDate.toISOString();
    return `https://api.nomics.com/v1/exchange-rates/history?key=${API_KEY}&currency=${currency}&start=${startDate}&end=${endDate}`
}

//get data
fn_getData = (currency, duration, endDate) => {
    console.log('getButton clicked - in fn_getData');
    const startDate = new Date(endDate);

    //duration based endDate generation
    if (duration == 1) {
        startDate.setDate(startDate.getDate() - 1);
    }
    else if (duration == 30) {
        startDate.setMonth(startDate.getMonth() - 1);
    }
    else if (duration == 365) {
        startDate.setFullYear(startDate.getFullYear() - 1);
    }
    else if (duration == 5 * 365) {
        startDate.setFullYear(startDate.getFullYear() - 5);
    }

    apiUrl = setUrl(currency, startDate, endDate);

    ajaxReq("GET", apiUrl, {}).then((res) => {
        let yLabels = [];
        let xLabels = [];
        for (let i = 0; i < res.length; i++) {
            yLabels[i] = parseInt(res[i].rate);
            xLabels[i] = res[i].timestamp;
        }
        chartUpdate(xLabels,yLabels,currency);
    })
}


// define function to post/send data
fn_postData = () => {
    console.log('postButton clicked - in fn_postData');
    ajaxReq("POST", API_URL, {}).then((res) => {
        console.log(res);
    })
}

// add event listener to button
getButton.addEventListener('click', fn_getData("BTC", 30, new Date()));
postButton.addEventListener('click', fn_postData);