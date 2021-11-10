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


function chartUpdate(xLabels,yLabels,currency){
    myChart.data.datasets[0].data=yLabels;
    myChart.data.labels=xLabels;
    myChart.data.datasets[0].label=currency;
    myChart.update();
}

console.log(myChart)