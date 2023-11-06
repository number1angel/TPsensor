function onMessageArrived(message) {
    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");
    const img = new Image();
    img.onload = function () {
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    };
 
    const mqttImageURL = message.payloadString;
 
    img.src = mqttImageURL;
}
        
const imagenInput = document.getElementById("imagenInput");
const canvas = document.getElementById("canvas");
const colorRGB = document.getElementById("colorRGB");
const rLinea = document.getElementById("rLinea");
const gLinea = document.getElementById("gLinea");
const bLinea = document.getElementById("bLinea");

canvas.addEventListener("click", obtenerColorEnCoordenadas);

function obtenerColorEnCoordenadas(event) {
    const ctx = canvas.getContext("2d");
    const x = event.offsetX;
    const y = event.offsetY;

    const imageData = ctx.getImageData(x, y, 1, 1);
    const pixelData = imageData.data;

    const r = pixelData[0];
    const g = pixelData[1];
    const b = pixelData[2];

    colorRGB.innerHTML = `RGB: (${r}, ${g}, ${b})`;

    rLinea.style.height = `${r}px`;
    gLinea.style.height = `${g}px`;
    bLinea.style.height = `${b}px`;
}

imagenInput.addEventListener("change", cargarImagen);

function cargarImagen() {
    const file = imagenInput.files[0];
    const img = new Image();

    img.onload = function () {
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    };

    img.src = URL.createObjectURL(file);
}