import React, { useEffect, useState } from 'react';
import { Table, Button, ButtonToolbar } from 'react-bootstrap';
import { FaEdit } from 'react-icons/fa';
import { RiDeleteBin5Line } from 'react-icons/ri';
import AddTripModal from './AddTripModal';
import UpdateTripModal from './UpdateTripModal';
import { getTrips, deleteTrip } from '../services/TripService';

const Tripsmanage = () => {
  const [trips, setTrips] = useState([]);
  const [addModalShow, setAddModalShow] = useState(false);
  const [editModalShow, setEditModalShow] = useState(false);
  const [editTrip, setEditTrip] = useState([]);
  const [isUpdated, setIsUpdated] = useState(false);

  useEffect(() => {
    let mounted = true;
    if (trips.length && !isUpdated) {
      return;
    }
    getTrips()
      .then((response) => {
        if (mounted) {
          setTrips(response.data || []);
        }
      })
      .catch((error) => {
        console.error('Failed to fetch trips', error);
      })
      .finally(() => {
        setIsUpdated(false);
      });

    return () => {
      mounted = false;
    };
  }, [isUpdated, trips]);

  const handleUpdate = (e, tri) => {
    e.preventDefault();
    if (tri) {
      setEditModalShow(true);
      setEditTrip(tri);
    }
  };

  const handleAdd = (e) => {
    e.preventDefault();
    setAddModalShow(true);
  };

  const handleDelete = async (trip_id) => {
    if (window.confirm('Are you sure?')) {
      try {
        const result = await deleteTrip(trip_id);
        alert(result.message);
        setIsUpdated(true);
      } catch (error) {
        alert('Failed to Delete Trip');
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
              <th>Trip_ID</th>
              <th>Trip Name</th>
              <th>Trip Start Time</th>
              <th>Trip End Time</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {trips.map((tri) => (
              <tr key={tri.trip_id}>
                <td>{tri.trip_id}</td>
                <td>{tri.trip_name}</td>
                <td>{tri.trip_start_time}</td>
                <td>{tri.trip_end_time}</td>
                <td>

                  <Button className="mr-2" variant="danger" onClick={(event) => handleDelete(event, tri.trip_id)}>
                    <RiDeleteBin5Line />
                  </Button>


                  <span>&nbsp;&nbsp;&nbsp;</span>
                  <Button className="mr-2" onClick={(event) => handleUpdate(event, tri)}>
                    <FaEdit />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        <ButtonToolbar>
          <Button variant="primary" onClick={handleAdd}>
            Add Trip
          </Button>
          <AddTripModal show={addModalShow} setUpdated={setIsUpdated} onHide={AddModelClose}></AddTripModal>
          <UpdateTripModal show={editModalShow} trip={editTrip} setUpdated={setIsUpdated} onHide={EditModelClose}></UpdateTripModal>
        </ButtonToolbar>
      </div>
    </div>
  );
};

export default Tripsmanage;
