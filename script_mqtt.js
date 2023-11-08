
/*grafico con numeros randoms para probar la grafica

var canvas = document.getElementById('randomNumberChart');
var ctx = canvas.getContext('2d');
var chart;
var maxDataPoints = 5;
var chartData = {
    labels: [],
    datasets: [
        {
            label: 'Números Aleatorios (Rojo)',
            data: [],
            borderColor: 'rgb(255, 0, 0)',
            borderWidth: 2,
            fill: false
        },
        {
            label: 'Números Aleatorios (Azul)',
            data: [],
            borderColor: 'rgb(0, 0, 255)',
            borderWidth: 2,
            fill: false
        },
        {
            label: 'Números Aleatorios (Verde)',
            data: [],
            borderColor: 'rgb(0, 255, 0)',
            borderWidth: 2,
            fill: false
        }
    ]
};

var currentX = 0;

function initializeChart() {
    chart = new Chart(ctx, {
        type: 'line',
        data: chartData,
        options: {
            scales: {
                x: {
                    beginAtZero: true,
                },
                y: {
                    beginAtZero: true,
                    min: 0,
                    max: 255,
                },
            },
        },
    });
}

initializeChart();

function generateRandomNumber() {
    return Math.random() * 255;
}

function updateChart() {
    var randomValue1 = generateRandomNumber();
    var randomValue2 = generateRandomNumber();
    var randomValue3 = generateRandomNumber();

    if (chartData.labels.length >= maxDataPoints) {
        chartData.labels.shift();
        chartData.datasets[0].data.shift();
        chartData.datasets[1].data.shift();
        chartData.datasets[2].data.shift();
    }

    chartData.labels.push(currentX);
    chartData.datasets[0].data.push(randomValue1);
    chartData.datasets[1].data.push(randomValue2);
    chartData.datasets[2].data.push(randomValue3);

    chart.update();
    currentX++;
 
    var colorGradientContainer = document.getElementById('colorGradientContainer');
    var colorWidth = canvas.width / maxDataPoints;
    var color = `rgb(${randomValue1}, ${randomValue2}, ${randomValue3})`;
    var gradientElement = `<div style="width: ${colorWidth}px; background: ${color}; flex-grow: 1;"></div>`;
    colorGradientContainer.innerHTML = gradientElement + colorGradientContainer.innerHTML;
 
    if (colorGradientContainer.children.length > maxDataPoints) {
        colorGradientContainer.removeChild(colorGradientContainer.lastChild);
    }
}

setInterval(updateChart, 1000);

var scrollBar = document.getElementById('scrollBar');
scrollBar.addEventListener('change', function () {
    chart.options.scales.x.min = parseInt(scrollBar.value, 10);
    chart.options.scales.x.max = parseInt(scrollBar.value, 10) + maxDataPoints;
    chart.update();
});
 
*/