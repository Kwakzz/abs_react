import React from 'react';
import { Modal, Col, Row, Form, Button } from 'react-bootstrap';
import { updateDriver } from '../services/DriverService';

const UpdateDriverModal = (props) => {
  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedDriver = {
      phone_number: e.target.phone_number.value,
    };

    try {
      const result = await updateDriver(props.driver.driver_id, updatedDriver);
      alert(result.message);
      props.setUpdated(true);
      props.onHide();
    } catch (error) {
      alert('Failed to Update Driver');
    }
  };

  return (
    <div className="container">
      <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">Update Driver Information</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col sm={6}>
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="phone_number">
                  <Form.Label>Phone Number</Form.Label>
                  <Form.Control
                    type="text"
                    name="phone_number"
                    required
                    defaultValue={props.driver.phone_number}
                    placeholder=""
                  />
                </Form.Group>
                <Form.Group>
                  <p></p>
                  <Button variant="primary" type="submit">
                    Submit
                  </Button>
                </Form.Group>
              </Form>
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" type="submit" onClick={props.onHide}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default UpdateDriverModal;
