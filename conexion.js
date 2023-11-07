const mqtt = require('mqtt'); // Asegúrate de tener el paquete MQTT instalado.

const clientId = "emqx_node_" + Math.random().toString(16).substring(2, 8);
const username = "emqx_test"; // ""
const password = "emqx_test"; // ""

const mqttClient = mqtt.connect("ws://broker.emqx.io:8083/mqtt", {
  clientId,
  username,
  password,
});

mqttClient.on("connect", () => {
  console.log("Client connected: " + clientId);
  
  // Suscribirse a los temas deseados.
  mqttClient.subscribe("color/R");
  mqttClient.subscribe("color/G");
  mqttClient.subscribe("color/B");
});

mqttClient.on("error", (err) => {
  console.log("Error: ", err);
  mqttClient.end();
});

mqttClient.on("reconnect", () => {
  console.log("Reconnecting...");
});

mqttClient.on("message", (topic, message) => {
  console.log(`received message: ${message.toString()} from topic: ${topic}`);
});

// Puedes usar el cliente MQTT para publicar mensajes si es necesario.
// mqttClient.publish("tu_tema", "tu_mensaje");

// Mantén la aplicación en funcionamiento.
process.on('SIGINT', () => {
  mqttClient.end();
  process.exit();
});
