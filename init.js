
const cameras = [{
  label: "camera1",
  description: "Camera 1 description",
  source: "http://10.10.3.134:8086/video_feed",
  azimuth: { inMin: 0.001, inMax: 1, outMin: 45, outMax: 90 },
  elevation: { inMin: 0.001, inMax: 1, outMin: 45, outMax: 90 }
},
{
  label: "camera2",
  description: "Camera 2 description",
  source: "http://10.10.3.134:8086/video_feed",
  azimuth: { inMin: 0.001, inMax: 1, outMin: 45, outMax: 90 },
  elevation: { inMin: 0.001, inMax: 1, outMin: 45, outMax: 90 }
}];

function initCameras() {

  const target = document.getElementById("cameras");

  for (const camera of cameras) {
    const topElement = document.createElement("div");
    topElement.className = "top";
    topElement.innerHTML = `
    <h2>${camera.label}</h2>
    <p>${camera.description}</p>
    `
    const cameraElement = document.createElement("div");
    topElement.appendChild(cameraElement);
    cameraElement.className = "video-container";
    cameraElement.innerHTML = `
      <img id="video" src="${camera.source}">
      <svg width="100%" height="100%" id="azimuth"></svg>
      <svg width="100%" height="100%" id="elevation"></svg>
      <div id="mouseCoordinates"></div>`;
    target?.appendChild(topElement);
  }
}

initCameras();