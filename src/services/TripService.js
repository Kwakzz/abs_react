import axios from 'axios';

// Function to handle common API errors
const handleErrors = (response) => {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response.json();
};

export function getTrips() {
  return axios.get('http://54.234.174.27/trip/get_all/')
    .then(response => response.data)
    .catch(error => {
      console.error('Error fetching trips', error);
      throw error;
    });
}


export const deleteTrip = async (tripId) => {
  try {
    const response = await fetch(`http://54.234.174.27/trip/delete/`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ trip: tripId }),
    });

    const data = await handleErrors(response);
    return data;
  } catch (error) {
    throw Error('Failed to delete trip');
  }
};

export function addTrip(trip) {
  return axios.post('http://54.234.174.27/trip/create/', trip)
    .then(response => response.data)
    .catch(error => {
      console.error('Error adding trip', error);
      throw error;
    });
}


export const updateTrip = async (tripId, tripData) => {
  try {
    const response = await fetch(`http://54.234.174.27/trip/update/`, {
      method: 'PATCH', // Use PATCH method for partial updates
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ trip_id: tripId, ...tripData }),
    });

    const data = await handleErrors(response);
    return data;
  } catch (error) {
    throw Error('Failed to update driver');
  }
};

