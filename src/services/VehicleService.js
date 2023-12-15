import axios from 'axios';


const apiUrl = 'http://54.234.174.27/vehicle/';  // Replace with your API endpoint

// Function to handle common API errors
const handleErrors = (response) => {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response.json();
};

export const addVehicle = async (vehicleData) => {
  try {
    const response = await fetch(`http://54.234.174.27/vehicle/add/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(vehicleData),
    });

    const data = await handleErrors(response);
    return data;
  } catch (error) {
    throw Error('Failed to add vehicle');
  }
};

export const deleteVehicle = async (vehicleId) => {
  try {
    const response = await fetch(`http://54.234.174.27/vehicle/delete/`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ vehicle_id: vehicleId }),
    });

    const data = await handleErrors(response);
    return data;
  } catch (error) {
    throw Error('Failed to delete vehicle');
  }
};

export const updateVehicle = async (vehicleId, vehicleData) => {
  try {
    const response = await fetch(`http://54.234.174.27/vehicle/update/`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ vehicle_id: vehicleId, ...vehicleData }),
    });

    const data = await handleErrors(response);
    return data;
  } catch (error) {
    throw Error('Failed to update vehicle');
  }
};


export const getVehicles = async () => {
  try {
    const response = await fetch(`http://54.234.174.27/vehicle/get_all/`);
    const data = await handleErrors(response);
    return data;
  } catch (error) {
    throw Error('Failed to fetch drivers');
  }
};
