import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';

const fitMarkersInMap = (map, markers) => {
  const mapboxBounds = new mapboxgl.LngLatBounds()
  markers.forEach(marker => mapboxBounds.extend([marker.lng, marker.lat]))
  map.fitBounds(mapboxBounds, {
    padding: 70,
    maxZoom: 15,
    duration: 0
  })
}

const initMap = () => {
  const mapElement = document.getElementById('map')

  if (mapElement) {
    const markers = JSON.parse(mapElement.dataset.markers)
    const apiKey = mapElement.dataset.mapboxKey

    mapboxgl.accessToken = apiKey
    const mapboxMap = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/odpolo/cjjdkpbem828u2so5wfwu86gi'
    })

    markers.forEach(marker => {
      const infoWindowHTML = marker.infoWindow
      const mapboxPopup = new mapboxgl.Popup()
      mapboxPopup.setHTML(infoWindowHTML)

      const htmlElement = document.createElement('div')
      htmlElement.className = 'customer-marker'
      htmlElement.style.backgroundImage = `url('${marker.image_url}')`
      htmlElement.style.backgroundSize = 'contain'
      htmlElement.style.width = '25px'
      htmlElement.style.height = '25px'


      const mapboxMarker = new mapboxgl.Marker(htmlElement)
        .setLngLat([marker.lng, marker.lat])
        .setPopup(mapboxPopup)
        .addTo(mapboxMap);
    })


    fitMarkersInMap(mapboxMap, markers)
    const searchControl = new MapboxGeocoder({
      accessToken: mapboxgl.accessToken,
      mapboxgl: mapboxgl
    })
    mapboxMap.addControl(searchControl)
  }
}

export { initMap }