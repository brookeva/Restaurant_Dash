import {initializeeatsMap, showEatsOnMap} from './eats-map.js';
import {initializeEatsList} from './eats-list.js';
import {initializeeatsDisplay} from './eats-count.js';
import {setupFilterEvents, initializeFilters} from './eats-filters.js';

async function downloadRestaurants(onSuccess, onFailure) {
  // try {
    const resp = await fetch('data/Restaurants.geojson');
    if (resp.status === 200) {
      const data = await resp.json();
      onSuccess(data);
    }
  // } catch (err) {
  //   console.log(err);
  //   if (onFailure) {
  //     onFailure(err);
  //   }
  // }
}

const eventBus = new EventTarget();
const eatsMap = initializeeatsMap(eventBus);
function onRestaurantsLoad(data){
  showEatsOnMap(data.features, eatsMap);

 // const eatsList = initializeEatsList(data, eventBus);
 // const eatsCountDisplay = initializeeatsDisplay(data, eventBus);
 initializeFilters(data,eventBus);
 setupFilterEvents(data, eventBus);

// Make these variables globally available.

window.Restaurants = data;
window.eatsMap = eatsMap;
//window.eatsList = eatsList;
// window.eatsCountDisplay = eatsCountDisplay;

  // eatsMap.dataLayer.addData(data);
}



function mapRestaurants(){
  downloadRestaurants(onRestaurantsLoad);
}



mapRestaurants();