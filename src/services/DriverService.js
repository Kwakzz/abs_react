import axios from 'axios';

const apiUrl = 'http://54.234.174.27/driver/';  // Replace with your API endpoint

// Function to handle common API errors
const handleErrors = (response) => {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response.json();
};

export const addDriver = async (driverData) => {
  try {
    const response = await fetch(`http://54.234.174.27/driver/add/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(driverData),
    });

    const data = await handleErrors(response);
    return data;
  } catch (error) {
    throw Error('Failed to add driver');
  }
};

export const deleteDriver = async (driverId) => {
  try {
    const response = await fetch(`http://54.234.174.27/driver/delete/`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ driver_id: driverId }),
    });

    const data = await handleErrors(response);
    return data;
  } catch (error) {
    throw Error('Failed to delete driver');
  }
};


export const updateDriver = async (driverId, driverData) => {
  try {
    const response = await fetch(`http://54.234.174.27/driver/update/`, {
      method: 'PATCH', // Use PATCH method for partial updates
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ driver_id: driverId, ...driverData }),
    });

    const data = await handleErrors(response);
    return data;
  } catch (error) {
    throw Error('Failed to update driver');
  }
};


export const getDrivers = async () => {
  try {
    const response = await fetch(`http://54.234.174.27/driver/get_all/`);
    const data = await handleErrors(response);
    return data;
  } catch (error) {
    throw Error('Failed to fetch drivers');
  }
};


