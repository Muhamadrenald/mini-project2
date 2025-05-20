import React, { useState } from "react";
import { Modal, Button, Row, Col } from "react-bootstrap";
import PropertyMap from "./PropertyMap";

const PropertyDetailsModal = ({ property, show, onHide }) => {
  const [showMap, setShowMap] = useState(false);

  if (!property) return null;

  const handleShowMap = () => {
    setShowMap(true);
  };

  const handleHideMap = () => {
    setShowMap(false);
  };

  return (
    <>
      <Modal show={show} onHide={onHide} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title>{property.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col md={6}>
              <img
                src={property.image}
                alt={property.title}
                className="img-fluid rounded"
              />
            </Col>
            <Col md={6}>
              <h5>{property.address}</h5>
              <p>{property.fullDescription}</p>
              <div className="d-flex flex-wrap gap-3 mb-3">
                <span className="badge bg-light text-dark">
                  <i className="bi bi-door-open"></i> {property.bedrooms} Kamar
                  Tidur
                </span>
                <span className="badge bg-light text-dark">
                  <i className="bi bi-bucket"></i> {property.bathrooms} Kamar
                  Mandi
                </span>
                <span className="badge bg-light text-dark">
                  <i className="bi bi-arrows-angle-expand"></i> {property.area}{" "}
                  m²
                </span>
              </div>
              <Button
                variant="outline-primary"
                onClick={handleShowMap}
                className="mt-2"
              >
                <i className="bi bi-map"></i> Lihat Peta
              </Button>
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onHide}>
            Close
          </Button>
          <Button variant="primary">Contact Agent</Button>
        </Modal.Footer>
      </Modal>

      <PropertyMap property={property} show={showMap} onHide={handleHideMap} />
    </>
  );
};

export default PropertyDetailsModal;
