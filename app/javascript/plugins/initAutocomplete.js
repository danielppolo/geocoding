import places from 'places.js'

const initAutocomplete = () => {
  console.log('Hello from autocomplete ')
  const addressInput = document.getElementById('flat_address')
  if (addressInput) {
    places({
      container: addressInput
    })
  }
}

export { initAutocomplete }