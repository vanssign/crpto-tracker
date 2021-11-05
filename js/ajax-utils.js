// get buttons from html/DOM
const getButton = document.getElementById('getButton');
const postButton = document.getElementById('postButton');

// define function to get data
const API_KEY = "d24bddfd51b16745150279d26cf2f1bd50d633f6";
const current_date = new Date();
const API_URL = `https://api.nomics.com/v1/exchange-rates/history?key=${API_KEY}&currency=BTC&start=2021-08-19T00%3A00%3A00Z&end=${current_date}`

function ajaxReq(Method, reqUrl, body, headers){
    if (Method === "GET") {
        var xhr = new XMLHttpRequest();
        // use fake rest api `https://reqres.in/`, below url get list of users
        xhr.open('GET', reqUrl);
        // convert XMLHttpRequest results to 'json' bydefault
        xhr.responseType = 'json';

        xhr.onload = () => {
            let results = xhr.response;
            console.log('results:', results);

            //convert string data to json/javascript object - ommit by using xhe.responseType = 'json'
            // const jsonData = JSON.parse(results);
            // console.log('jsonData:', jsonData);
        }
        xhr.send();
    }
    else if (Method === "POST") {
        const postData = body;

        var xhr = new XMLHttpRequest();
        // use fake rest api `https://reqres.in/`, below url get list of users
        xhr.open('POST', reqUrl);

        // convert XMLHttpRequest results to 'json' bydefault
        // xhr.responseType = 'json';
        xhr.setRequestHeader("Content-Type", "application/json; charset=UTF-8");

        xhr.onload = function () {
            var results = JSON.parse(xhr.responseText);
            console.log(results);
        };

        xhr.send((JSON.stringify(postData)));
    }
    else {
        alert("Error: Request Method not allowed");
    }
}

fn_getData = () => {
    console.log('getButton clicked - in fn_getData');
    ajaxReq("GET", API_URL, {}, {})
}

// define function to post/send data
fn_postData = () => {
    console.log('postButton clicked - in fn_postData');
    ajaxReq("POST", API_URL, {}, {})
}

// add event listener to button
getButton.addEventListener('click', fn_getData);
postButton.addEventListener('click', fn_postData);