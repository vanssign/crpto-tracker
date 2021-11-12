function homePageFunctionality() {
    //select options from dom
    const currencyCodeSelect = document.getElementById('currencyCode');
    const durationSelect = document.getElementById('duration');

    //APIURL+endpoint based on query
    function setUrl(currency, startDate, endDate) {
        startDate = startDate.toISOString();
        endDate = endDate.toISOString();
        return `${BASE_API_URL}/exchange-rates/history?key=${API_KEY}&currency=${currency}&start=${startDate}&end=${endDate}`
    }

    //get data
    fn_getData = (currency, duration, endDate) => {
        console.log('getButton clicked - in fn_getData');
        const startDate = new Date(endDate);

        //duration based endDate generation
        if (duration == "1D") {
            startDate.setDate(startDate.getDate() - 1);
        }
        else if (duration == "1W") {
            startDate.setDate(startDate.getDate() - 7);
        }
        else if (duration == "1M") {
            startDate.setMonth(startDate.getMonth() - 1);
        }
        else if (duration == "1Y") {
            startDate.setFullYear(startDate.getFullYear() - 1);
        }
        else if (duration == "5Y") {
            startDate.setFullYear(startDate.getFullYear() - 5);
        }

        apiUrl = setUrl(currency, startDate, endDate);

        ajaxReq("GET", apiUrl, {}, 'json').then((res) => {
            let yLabels = [];
            let xLabels = [];
            for (let i = 0; i < res.length; i++) {
                yLabels[i] = res[i].rate;
                xLabels[i] = res[i].timestamp.substring(0, 10);
            }
            chartUpdate(xLabels, yLabels, currency);
        })
    }


    // define function to post/send data
    fn_postData = () => {
        console.log('postButton clicked - in fn_postData');
        ajaxReq("POST", API_URL, {}, 'json').then((res) => {
            console.log(res);
        })
    }

    //event listeners
    function getData() {
        if (document.getElementById('currencyCode').value !== "NA") {
            fn_getData(document.getElementById('currencyCode').value,
                document.getElementById('duration').value, new Date())
        }
    }

    // add event listener to select options
    currencyCodeSelect.addEventListener('change', getData);
    durationSelect.addEventListener('change', getData);

    //chart functions and methods
    const ctx = document.getElementById('myChart').getContext('2d');

    const data = {
        labels: [],
        datasets: [{
            label: 'BTC',
            data: [],
            fill: true,
            backgroundColor: 'rgba(0, 224, 192,0.2)',
            borderColor: 'rgba(0, 224, 192,1)',
            tension: 0.1
        }]
    };
    const myChart = new Chart(ctx, {
        type: 'line',
        data: data
    });
    function chartUpdate(xLabels, yLabels, currency) {
        myChart.data.datasets[0].data = yLabels;
        myChart.data.labels = xLabels;
        myChart.data.datasets[0].label = currency;
        myChart.update();
    }
}