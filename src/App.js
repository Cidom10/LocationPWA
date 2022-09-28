import './App.css';
import { useEffect } from 'react';

var target = document.getElementById('target');

function appendLocation(location, verb) {
  verb = verb || 'updated';
  var newLocation = document.createElement('p');
  newLocation.innerHTML = 'Location ' + verb + ': ' + location.coords.latitude + ', ' + location.coords.longitude + '';
  target.appendChild(newLocation);
}

export default function App() {

  useEffect(() => {
    var watchId;

    if ('geolocation' in navigator) {
      document.getElementById('askButton').addEventListener('click', function () {
        navigator.geolocation.getCurrentPosition(function (location) {
          appendLocation(location, 'fetched');
        });
        watchId = navigator.geolocation.watchPosition(appendLocation);
      });
    } else {
      target.innerText = 'Geolocation API not supported.';
    };
  },[])

  return (
    <div className="App">
      <header className="App-header">
        <button id="askButton">Ask for location</button>

        <div id="target"></div>
      </header>
    </div>
  );
};
