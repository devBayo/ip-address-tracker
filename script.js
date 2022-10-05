'use strict';

const addressEl = document.querySelector('.summary__value--address');
const locationEl = document.querySelector('.summary__value--location');
const timezoneEl = document.querySelector('.summary__value--timezone');
const ispEL = document.querySelector('.summary__value--isp');

//
/*

Unstructured code
NB-
Apply architecture later

*/
const getIP = async function () {
  try {
    // Get user IP address
    const responseIp = await fetch('https://api.ipify.org?format=json');
    console.log(responseIp);
    const { ip } = await responseIp.json();
    console.log(ip);

    // Get user information from IP address
    const response = await fetch(
      `https://geo.ipify.org/api/v2/country?apiKey=at_ygz3SA8zlN0HQDrVkvHlmXhmlh1Np&ipAddress=${ip}`
    );
    const userData = await response.json();
    const {
      isp,
      location: { timezone },
    } = userData;

    console.log(userData);

    //  Get additional information from IP address
    const geoResponse = await fetch(
      `http://api.ipstack.com/${ip}?access_key=d594d71a857fee7f1c6a6270f6d3ae17&format=1`
    );

    const data = await geoResponse.json();
    console.log(data);
    const { latitude, longitude, country_name: country, city } = data;
    const coords = [latitude, longitude];

    // Load map with coordinates
    const map = L.map('map').setView(coords, 13);
    L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);

    L.marker(coords)
      .addTo(map)
      .bindPopup('A pretty CSS3 popup.<br> Easily customizable.')
      .openPopup();

    console.log(ip, timezone, isp, city, country);
    addressEl.textContent = ip;
    locationEl.textContent = `${city}, ${country}`;
    timezoneEl.textContent = timezone;
    ispEL.textContent = isp;
  } catch (error) {
    console.warn(error.message);
  }
};

getIP();
