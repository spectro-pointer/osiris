

const videoPlayer = document.getElementById("video");
const mouseCoordinates = document.getElementById("mouseCoordinates");
const azimuth = document.getElementById("azimuth");
const elevation = document.getElementById("elevation");

videoPlayer.addEventListener("click", async (event) => {
  const { azimuthDegrees, elevationDegrees } = getMousePosition(event, 'camera1');

  const url = "http://10.10.3.134:8080/coordinates?" +
    "azimuth=" + azimuthDegrees +
    "&elevation=" + elevationDegrees

  const response = await fetch(url)
  console.log(response)
})

videoPlayer.addEventListener("mousemove", (event) => {
  const { mouseX, mouseY, azimuthDegrees, elevationDegrees } = getMousePosition(event, 'camera1');
  mouseCoordinates.textContent = "Azimuth: " + azimuthDegrees.toFixed(2) + ", Elevation: " + elevationDegrees.toFixed(2);
  drawCross(mouseX, mouseY);
});

function getMousePosition(event, cameraLabel) {
  const camera = cameras.find((camera) => camera.label === cameraLabel);
  const rect = videoPlayer.getBoundingClientRect();
  const mouseX = event.clientX - rect.left;
  const mouseY = event.clientY - rect.top;
  const azimuthDegrees = mapRange(mouseX / rect.width, camera?.azimuth);
  const elevationDegrees = mapRange(mouseY / rect.height, camera?.elevation);

  return { mouseX, mouseY, azimuthDegrees, elevationDegrees };
}



function mapRange(value, options) {
  const { inMin, inMax, outMin, outMax } = options;
  return ((value - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;
}

function drawCross(x, y) {
  azimuth.innerHTML = '<line x1="0" y1="' + y + '" x2="' + videoPlayer.clientWidth + '" y2="' + y + '" class="mouse-line"/>';
  elevation.innerHTML = '<line x1="' + x + '" y1="0" x2="' + x + '" y2="' + videoPlayer.clientHeight + '" class="mouse-line"/>';
}

