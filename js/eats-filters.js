function initializeFilters (eats, eventBus){

  const nhoodCheckboxes = document.querySelectorAll('[name="eats-filter-nhood"]');
  const CuisineCheckboxes = document.querySelectorAll('[name="eats-filter-cuisine"]');
  // const priceSlider = document.querySelectorAll('[name="eats-filter-price"]');
  const happyHourCheckboxes = document.querySelectorAll('[name="eats-filter-hh"]');
  const nameSubstringInput = document.querySelector('[name="eats-filter-name"]');

  window.eatsNameFilter = nameSubstringInput;
  window.eatsCuisineFilters = CuisineCheckboxes;

  // Neighborhood Checkbox Filter

  for (const nhoodID of nhoodCheckboxes){
    nhoodID.addEventListener (
      "change", () => {
        filterRestaurants();
      }
    )
  }

  function filterRestaurants(){
    const filteredData = []
    for (const Checkbox of nhoodCheckboxes){
      if (Checkbox.checked){
        for (const eatsPlace of eats.features){
          if (eatsPlace.properties.Neighborhood === Checkbox.value){
            filteredData.push(eatsPlace)
          }
        }
      }
    }
    const newEvent3 = new CustomEvent("filtered",
    {
      detail: filteredData
    })
    eventBus.dispatchEvent(newEvent3)
  }
  
  // Cuisine Checkbox Filter

  for (const cuisineID of CuisineCheckboxes){
    cuisineID.addEventListener (
      "change", () => {
        filterCuisine();
      }
    )
  }

  function filterCuisine(){
    const filteredData = []
    for (const Checkbox of CuisineCheckboxes){
      if (Checkbox.checked){
        for (const eatsPlace of eats.features){
          if (eatsPlace.properties.Cuisine === Checkbox.value){
            filteredData.push(eatsPlace)
          }
        }
      }
    }
    const newEvent4 = new CustomEvent("filtered",
    {
      detail: filteredData
    })
    eventBus.dispatchEvent(newEvent4)
  }
}


// function areaCheckboxes(Name) {
//   const filterPlace = Array.from(nhoodCheckboxes)
//     .filter((c) => c.checked)
//     .map((c) => `Neighborhood ${c.value}`);
//     if (filterPlace.length > 0 && !filterPlace.includes(Name['Neighborhood'])) {
//       return false;
//     }}



// Something else
function shouldShowEats(Name) {
  const filterCuisine = Array.from(CuisineCheckboxes)
    .filter((c) => c.checked)
    .map((c) => `Cuisine ${c.value}`);
    if (filterCuisine.length > 0 && !filterCuisine.includes(Name['Cuisine'])) {
      return false;
    }

  const filterPrice = Array.from(priceCheckboxesCheckboxes)
    .filter((c) => c.checked)
    .map((c) => c.value);
  if (filterPrice.length > 0 && !filterPrice.includes(Name['Price'])) {
    return false;
  }

  const filterHappyHr = Array.from(happyHourCheckboxes)
  .filter((c) => c.checked)
  .map((c) => c.value);
if (filterHappyHr.length != "No" && !filterHappyHr.includes(Name['Happy Hour'])) {
  return false;
}

// START HERE !!!

  const lSchoolName = school.name.toLowerCase();
  const lFilterNameSubstring = nameSubstringInput.value.toLowerCase();
  if (!lSchoolName.includes(lFilterNameSubstring)) {
    return false;
  }

  return true;
}

function updateShownSchools(allSchools, eventBus) {
  const schoolsToShow = allSchools.filter(shouldShowSchool);
  const detail = { 'include': schoolsToShow };
  const evt = new CustomEvent('filterschanged', { detail });
  eventBus.dispatchEvent(evt);
}

function setupFilterEvents(allSchools, eventBus) {
  for (const filter of document.querySelectorAll('#school-filters input')) {
    filter.addEventListener('change', () => {
      updateShownSchools(allSchools, eventBus);
    });
    filter.addEventListener('input', () => {
      updateShownSchools(allSchools, eventBus);
    });
  }
}

export {
  shouldShowEats,
  setupFilterEvents,
  updateShownSchools,
  initializeFilters
};
