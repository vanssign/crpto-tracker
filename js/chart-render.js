const ctx = document.getElementById('myChart').getContext('2d');


const data = {
    labels: [],
    datasets: [{
        label: 'BTC',
        data: [],
        fill: false,
        backgroundColor: 'rgb(255, 0, 0)',
        borderColor: 'rgb(75, 192, 192)',
        color:'rgb(0,0,0)',
        tension: 0.1
    }]
};
const myChart = new Chart(ctx, {
    type: 'line',
    data: data
});


function chartUpdate(xLabels,yLabels,currency){
    myChart.data.datasets[0].data=yLabels;
    myChart.data.labels=xLabels;
    myChart.data.datasets[0].label=currency;

    myChart.update();
}

console.log(myChart)