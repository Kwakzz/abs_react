import React, { useEffect, useState } from 'react';
import { Table, Button, ButtonToolbar } from 'react-bootstrap';
import { FaEdit } from 'react-icons/fa';
import { RiDeleteBin5Line } from 'react-icons/ri';
import AddVehicleModal from './AddVehicleModal';
import UpdateVehicleModal from './UpdateVehicleModal';
import { getVehicles, deleteVehicle } from '../services/VehicleService';

const Vehiclesmanage = () => {
  const [vehicles, setVehicles] = useState([]);
  const [addModalShow, setAddModalShow] = useState(false);
  const [editModalShow, setEditModalShow] = useState(false);
  const [editVehicle, setEditVehicle] = useState([]);
  const [isUpdated, setIsUpdated] = useState(false);

  useEffect(() => {
    let mounted = true;
    if (vehicles.length && !isUpdated) {
      return;
    }
    getVehicles()
      .then(response => {
        if (mounted) {
          setVehicles(response.data || []);
        }
      })
      .catch(error => console.error(error))
      .finally(() => setIsUpdated(false));

    return () => {
      mounted = false;
      setIsUpdated(false);
    };
  }, [isUpdated, vehicles]);

  const handleUpdate = (e, veh) => {
    e.preventDefault();
    setEditModalShow(true);
    setEditVehicle(veh);
  };

  const handleAdd = (e) => {
    e.preventDefault();
    setAddModalShow(true);
  };

  const handleDelete = async (e, vehicle_id) => {
    e.preventDefault();
    if (window.confirm('Are you sure?')) {
      try {
        const result = await deleteVehicle(vehicle_id);
        alert(result.message);
        setIsUpdated(true);
      } catch (error) {
        alert('Failed to Delete Vehicle');
      }
    }
  };

  let AddModelClose = () => setAddModalShow(false);
  let EditModelClose = () => setEditModalShow(false);

  return (
    <div className="container-fluid side-container">
      <div className="row side-row">
        <p id="manage"></p>
        <Table striped bordered hover className="react-bootstrap-table" id="dataTable">
          <thead>
            <tr>
              <th>Vehicle_ID</th>
              <th>Vehicle Name</th>
              <th>License Number</th>
              <th>Model</th>
              <th>Is Available</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {vehicles.map((veh) => (
              <tr key={veh.vehicle_id}>
                <td>{veh.vehicle_id}</td>
                <td>{veh.vehicle_name}</td>
                <td>{veh.license_no}</td>
                <td>{veh.model}</td>
                <td>{veh.is_available ? 'Yes' : 'No'}</td>
                <td>
                  <Button className="mr-2" variant="danger" onClick={(event) => handleDelete(event, veh.vehicle_id)}>
                    <RiDeleteBin5Line />
                  </Button>
                  <span>&nbsp;&nbsp;&nbsp;</span>
                  <Button className="mr-2" onClick={(event) => handleUpdate(event, veh)}>
                    <FaEdit />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        <ButtonToolbar>
          <Button variant="primary" onClick={handleAdd}>
            Add Vehicle
          </Button>
          <AddVehicleModal show={addModalShow} setUpdated={setIsUpdated} onHide={AddModelClose}></AddVehicleModal>
          <UpdateVehicleModal show={editModalShow} vehicle={editVehicle} setUpdated={setIsUpdated} onHide={EditModelClose}></UpdateVehicleModal>
        </ButtonToolbar>
      </div>
    </div>
  );
};

export default Vehiclesmanage;
