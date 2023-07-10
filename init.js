const baseURL = "http://192.168.1.30/"

const cameras = [{
  label: "camera1",
  description: "Camera 1 description",
  source: "http://192.168.1.210:8088/video_feed",
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

const buttons = document.querySelector('.control-buttons');

buttons.addEventListener('mousedown', function(event) {
  // El cursor del ratón en el momento del evento de ratón
  let shiftX = event.clientX - buttons.getBoundingClientRect().left;
  let shiftY = event.clientY - buttons.getBoundingClientRect().top;

  // Centra el buttons bajo el cursor
  function moveAt(pageX, pageY) {
    buttons.style.left = pageX - shiftX + 'px';
    buttons.style.top = pageY - shiftY + 'px';
  }

  // Mueve el buttons al momento del click del ratón
  moveAt(event.pageX, event.pageY);

  function onMouseMove(event) {
    moveAt(event.pageX, event.pageY);
  }

  // Mueve el buttons al mover el ratón
  document.addEventListener('mousemove', onMouseMove);

  // Suelta el buttons al soltar el botón del ratón
  buttons.onmouseup = function() {
    document.removeEventListener('mousemove', onMouseMove);
    buttons.onmouseup = null;
  };

});

// Previene el comportamiento por defecto del navegador
buttons.ondragstart = function() {
  return false;
};
