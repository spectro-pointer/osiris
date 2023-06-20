const videoPlayer = document.getElementById("myVideo");
const mouseCoordinates = document.getElementById("mouseCoordinates");
const azimuth = document.getElementById("azimuth");
const elevation = document.getElementById("elevation");

videoPlayer.addEventListener("click", async (event) => {
  const { mouseX, mouseY, azimuthDegrees, elevationDegrees } = getMousePosition(event);
  const url = "http://10.10.3.134:8080/coordinates?" +
    "azimuth=" + azimuthDegrees +
    "&elevation=" + elevationDegrees

  const response = await fetch(url)
  console.log(response)


})

function getMousePosition(event) {
  const rect = videoPlayer.getBoundingClientRect();
  const mouseX = event.clientX - rect.left;
  const mouseY = event.clientY - rect.top;

  const azimuthDegrees = pixelToAzimuthDegrees(mouseX, rect.width);
  const elevationDegrees = pixelToElevationDegrees(mouseY, rect.height);

  return { mouseX, mouseY, azimuthDegrees, elevationDegrees };
}

videoPlayer.addEventListener("mousemove", (event) => {
  const { mouseX, mouseY, azimuthDegrees, elevationDegrees } = getMousePosition(event);

  mouseCoordinates.textContent = "Azimuth: " + azimuthDegrees.toFixed(2) + ", Elevation: " + elevationDegrees.toFixed(2);
  drawCross(mouseX, mouseY);
});
function mapRange(value, inMin, inMax, outMin, outMax) {
  return ((value - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;
}
function pixelToAzimuthDegrees(x, width) {
  // Implementa tu propia lógica para convertir las coordenadas de píxeles en grados de azimut
  var inputValue = x / width
  var outputValue = mapRange(inputValue, 0.001, 1.00, 45, 90);       // Por ejemplo, si tu cámara cubre un arco de 180 grados horizontalmente:
  return (outputValue);
}

function pixelToElevationDegrees(y, height) {
  // Implementa tu propia lógica para convertir las coordenadas de píxeles en grados de elevación
  // Por ejemplo, si tu cámara cubre un arco de 90 grados verticalmente:
  var inputValue = y / height
  var outputValue = mapRange(inputValue, 0.001, 1.00, 25, -10);
  return (outputValue);
}

function drawCross(x, y) {
  x = Math.floor(x);
  y = Math.floor(y);
  azimuth.innerHTML = '<line x1="0" y1="' + y + '" x2="' + videoPlayer.clientWidth + '" y2="' + y + '" class="mouse-line"/>';
  elevation.innerHTML = '<line x1="' + x + '" y1="0" x2="' + x + '" y2="' + videoPlayer.clientHeight + '" class="mouse-line"/>';
}

