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