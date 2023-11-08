let client;

const clientId = "emqx_node_" + Math.random().toString(16).substring(2, 8);
const username = "";
const password = "";
const mqttClient = mqtt.connect("10.0.3.201:1883", {
    clientId,
    username,
    password,
});

const canvas = document.getElementById("mqttChart");
const ctx = canvas.getContext("2d");
const maxDataPoints = 5;
const chartData = {
    labels: [],
    datasets: [
        {
            label: 'Datos MQTT R',
            data: [],
            borderColor: 'red',
            fill: false
        },
        {
            label: 'Datos MQTT G',
            data: [],
            borderColor: 'green',
            fill: false
        },
        {
            label: 'Datos MQTT B',
            data: [],
            borderColor: 'blue',
            fill: false
        }
    ]
};

const chart = new Chart(ctx, {
    type: 'line',
    data: chartData,
    options: {
        scales: {
            x: {
                beginAtZero: true
            },
            y: {
                beginAtZero: true,
                min: 0,
                max: 255
            }
        }
    }
});

function updateChart(topic, message) {
    chartData.labels.push(new Date().toLocaleTimeString());
    if (topic === "color/R") {
        chartData.datasets[0].data.push(parseFloat(message));
        chartData.datasets[1].data.push(null);
        chartData.datasets[2].data.push(null);
    } else if (topic === "color/G") {
        chartData.datasets[0].data.push(null);
        chartData.datasets[1].data.push(parseFloat(message));
        chartData.datasets[2].data.push(null);
    } else if (topic === "color/B") {
        chartData.datasets[0].data.push(null);
        chartData.datasets[1].data.push(null);
        chartData.datasets[2].data.push(parseFloat(message));
    }

    if (chartData.labels.length > maxDataPoints) {
        chartData.labels.shift();
        chartData.datasets[0].data.shift();
        chartData.datasets[1].data.shift();
        chartData.datasets[2].data.shift();
    }

    chart.update();
}

mqttClient.on("connect", () => {
    console.log("Conexión establecida con el servidor MQTT");
    mqttClient.subscribe("color/R");
    mqttClient.subscribe("color/G");
    mqttClient.subscribe("color/B");
});

mqttClient.on("message", (topic, message) => {
    console.log(`Mensaje recibido en el tema ${topic}: ${message.toString()}`);
    updateChart(topic, message.toString());
});
 
/*

const broker = 'mqtt://10.0.3.201:1883';
const options = {
  username: '', 
  password: '', 
};
const topicR = 'color/R';  
const topicG = 'color/G';  
const topicB = 'color/B';  

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

OTRA FORMA DE CONEXION QUE INTENTAMOS PORQUE NO ANDABA 
*/

