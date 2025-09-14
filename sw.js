<!DOCTYPE html>
<html lang="fr">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>🌍 Tableau Scientifique Complet</title>
<style>
body { font-family: Arial,sans-serif; background:#111; color:#eee; margin:0; padding:0; }
h1 { text-align:center; padding:10px; background:#222; }
.container { display:flex; flex-wrap:wrap; justify-content:space-around; padding:10px; }
.card { background:#1e1e1e; border-radius:12px; padding:15px; margin:10px; width:300px; box-shadow:0 4px 10px rgba(0,0,0,0.5); }
h2 { font-size:18px; border-bottom:1px solid #444; padding-bottom:5px; margin-bottom:10px; }
p { margin:4px 0; display:flex; align-items:center; }
p img { width:20px; height:20px; margin-right:8px; }
</style>
</head>
<body>
<h1>🌍 Tableau Scientifique Complet</h1>
<div class="container">

<!-- Localisation -->
<div class="card">
<h2>📍 Position</h2>
<p><img src="icons/compass.png"> Latitude: <span id="lat">-</span></p>
<p><img src="icons/compass.png"> Longitude: <span id="lon">-</span></p>
<p><img src="icons/compass.png"> Altitude: <span id="alt">-</span> m</p>
<p><img src="icons/compass.png"> Précision: <span id="accuracy">-</span> m</p>
</div>

<!-- Vitesse -->
<div class="card">
<h2>🚗 Vitesse</h2>
<p><img src="icons/thermometer.png"> m/s: <span id="speed">0.000</span></p>
<p><img src="icons/thermometer.png"> km/h: <span id="speedKmh">0.000</span></p>
<p><img src="icons/thermometer.png"> mm/s: <span id="speedMm">0.000</span></p>
<p><img src="icons/thermometer.png"> % Lumière: <span id="percentLight">0.000%</span></p>
<p><img src="icons/thermometer.png"> % Son: <span id="percentSound">0.000%</span></p>
</div>

<!-- Boussole -->
<div class="card">
<h2>🧭 Boussole</h2>
<p><img src="icons/compass.png"> Direction: <span id="heading">-</span>°</p>
</div>

<!-- Soleil -->
<div class="card">
<h2>☀️ Soleil</h2>
<p><img src="icons/sun.png"> Lever: <span id="sunrise">-</span></p>
<p><img src="icons/sun.png"> Coucher: <span id="sunset">-</span></p>
<p><img src="icons/sun.png"> Culmination: <span id="sunNoon">-</span></p>
<p><img src="icons/sun.png"> Éq. du temps: <span id="eqTime">-</span></p>
<p><img src="icons/sun.png"> Heure solaire: <span id="solarTime">-</span></p>
</div>

<!-- Lune -->
<div class="card">
<h2>🌙 Lune</h2>
<p><img src="icons/moon.png"> Phase: <span id="moonPhase">-</span>%</p>
<p><img src="icons/moon.png"> Culmination: <span id="moonTransit">-</span></p>
<p><img src="icons/moon.png"> Magnitude: <span id="moonMag">-</span></p>
</div>

<!-- Météo / Air -->
<div class="card">
<h2>🌡️ Météo / Air</h2>
<p><img src="icons/thermometer.png"> T°: <span id="temp">-</span> °C</p>
<p><img src="icons/air.png"> Humidité: <span id="humidity">-</span>%</p>
<p><img src="icons/air.png"> Vent: <span id="wind">-</span> km/h</p>
<p><img src="icons/cloud.png"> Nuages: <span id="clouds">-</span>%</p>
<p><img src="icons/cloud.png"> Plafond nuageux: <span id="cloudBase">-</span> m</p>
<p><img src="icons/cloud.png"> Pluie: <span id="rain">-</span> mm</p>
<p><img src="icons/cloud.png"> Neige: <span id="snow">-</span> mm</p>
<p><img src="icons/air.png"> Qualité air: <span id="airQuality">-</span></p>
<p><img src="icons/uv.png"> Indice UV: <span id="uv">-</span></p>
</div>

<!-- Niveau -->
<div class="card">
<h2>🎚️ Niveau</h2>
<p><img src="icons/compass.png"> Inclinaison X: <span id="tiltX">-</span>°</p>
<p><img src="icons/compass.png"> Inclinaison Y: <span id="tiltY">-</span>°</p>
</div>

</div>

<script>
// Constantes
const c = 299792458;
const vSound = 343;

// Vitesse
function updateSpeed(speedMs) {
  const speedKmh = speedMs*3.6;
  const speedMm = speedMs*1000;
  document.getElementById("speed").textContent = speedMs.toFixed(3);
  document.getElementById("speedKmh").textContent = speedKmh.toFixed(3);
  document.getElementById("speedMm").textContent = speedMm.toFixed(3);
  document.getElementById("percentLight").textContent = (speedMs/c*100).toFixed(9)+"%";
  document.getElementById("percentSound").textContent = (speedMs/vSound*100).toFixed(6)+"%";
}

// GPS
if (navigator.geolocation) {
  navigator.geolocation.watchPosition(pos => {
    document.getElementById("lat").textContent = pos.coords.latitude.toFixed(6);
    document.getElementById("lon").textContent = pos.coords.longitude.toFixed(6);
    document.getElementById("alt").textContent = pos.coords.altitude ? pos.coords.altitude.toFixed(1) : "-";
    document.getElementById("accuracy").textContent = pos.coords.accuracy.toFixed(1);
    updateSpeed(pos.coords.speed || 0);
  });
}

// Boussole
window.addEventListener("deviceorientationabsolute", e=>{
  if(e.alpha!==null) document.getElementById("heading").textContent=e.alpha.toFixed(1);
});

// Niveau
window.addEventListener("deviceorientation", e=>{
  document.getElementById("tiltX").textContent = e.beta?
  