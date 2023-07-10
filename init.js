const baseURL = "http://192.168.1.30/"

const cameras = [{
  label: "camera1",
  description: "Camera 1 description",
  source: "http://192.168.157:8086/video_feed",
  azimuth: { inMin: 0.001, inMax: 1, outMin: 45, outMax: 180 },
  elevation: { inMin: 0.001, inMax: 1, outMin: 45, outMax:-25 }
},
{
  label: "camera2",
  description: "Camera 2 description",
  source: "http://192.168.1.210:8088/video_feed",
  azimuth: { inMin: 0.001, inMax: 1, outMin: 45, outMax: 190 },
  elevation: { inMin: 0.001, inMax: 1, outMin: 45, outMax: -25 }
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
      <img class="video" id="${camera.label}" src="${camera.source}">
      <svg class="azimuth" width="100%" height="100%" id="azimuth_${camera.label}"></svg>
      <svg class="elevation" width="100%" height="100%" id="elevation_${camera.label}"></svg>
      <div class="mouseCoordinates" id="mouseCoordinates_${camera.label}"></div>`;
    target?.appendChild(topElement);

    const videoPlayer = document.getElementById(camera.label);
    addListener(videoPlayer);



  }
}

initCameras();