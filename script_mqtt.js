const broker = 'mqtt://10.0.3.201:1883';
        const options = {
            username: '', 
            password: '', 
        };
        const topicR = 'R'; 
        const topicG = 'G';
        const topicB = 'B';

        let dataR = [];
        let dataG = [];
        let dataB = [];

        function connectMQTT() {
            client = mqtt.connect(broker, options);
            client.on('connect', function () {
                console.log('Conexión establecida con el servidor MQTT');
                client.subscribe(topicR, function (err) {
                    if (!err) {
                        console.log('Suscripción exitosa al tema R');
                    }
                });
                client.subscribe(topicG, function (err) {
                    if (!err) {
                        console.log('Suscripción exitosa al tema G');
                    }
                });
                client.subscribe(topicB, function (err) {
                    if (!err) {
                        console.log('Suscripción exitosa al tema B');
                    }
                });
            });
        }

        function receiveData() {
            client.on('message', function (topic, message) {
                console.log('Mensaje recibido en el tema ' + topic + ': ' + message.toString());
                updateData(topic, message.toString());
            });
        }

        function updateChart() {
            const ctx = document.getElementById('myChart').getContext('2d');
            const myChart = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: ['R', 'G', 'B'],
                    datasets: [
                        {
                            label: 'Datos del Sensor R',
                            data: dataR,
                            borderColor: 'red',
                            fill: false
                        },
                        {
                            label: 'Datos del Sensor G',
                            data: dataG,
                            borderColor: 'green',
                            fill: false
                        },
                        {
                            label: 'Datos del Sensor B',
                            data: dataB,
                            borderColor: 'blue',
                            fill: false
                        }
                    ]
                },
                options: {
                    scales: {
                        y: {
                            beginAtZero: true
                        }
                    }
                }
            });
        }

        function updateData(topic, message) {
            if (topic === 'R') {
                dataR.push(message);
            } else if (topic === 'G') {
                dataG.push(message);
            } else if (topic === 'B') {
                dataB.push(message);
            }
            updateChart();
        }

/*grafico con numeros randoms*/

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

    // Create a horizontal colored gradient bar below the chart
    var colorGradientContainer = document.getElementById('colorGradientContainer');
    var colorWidth = canvas.width / maxDataPoints;
    var color = `rgb(${randomValue1}, ${randomValue2}, ${randomValue3})`;
    var gradientElement = `<div style="width: ${colorWidth}px; background: ${color}; flex-grow: 1;"></div>`;
    colorGradientContainer.innerHTML = gradientElement + colorGradientContainer.innerHTML;

    // Mantener solo los últimos 5 colores
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
});
