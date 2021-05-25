const hotelBookingForm = document.querySelector('#hotel-booking-form');
const now = new Date();

hotelBookingForm.arrival.min = now.toISOString().substring(0, 10);
hotelBookingForm.departure.min = now.toISOString().substring(0, 10);

checkDepartureValidity();
hotelBookingForm.departure.addEventListener('blur', () => {
  checkDepartureValidity();
});

hotelBookingForm.addEventListener('submit', (event) => {
  event.preventDefault();
});

function checkDepartureValidity() {
  if (!hotelBookingForm.departure.value || !hotelBookingForm.arrival.value) {
    return;
  }

  const departureDate = new Date(hotelBookingForm.departure.value);
  const arrivalDate = new Date(hotelBookingForm.arrival.value);

  if (arrivalDate >= departureDate) {
    hotelBookingForm.departure.setCustomValidity('The departure date must be later than the arrival date.');
  } else {
    hotelBookingForm.departure.setCustomValidity('');
  }
}
