import React from "react";
import { Card, Button } from "react-bootstrap";

const PropertyCard = ({ property, onViewDetails }) => {
  return (
    <Card className="mb-4 shadow-sm" style={{ width: "18rem" }}>
      <Card.Img variant="top" src={property.image} />
      <Card.Body>
        <Card.Title>{property.title}</Card.Title>
        <Card.Text className="text-muted">
          {property.shortDescription}
        </Card.Text>
        <div className="d-flex justify-content-between">
          <Button variant="outline-primary" size="sm">
            <i className="bi bi-heart"></i>
          </Button>
          <Button
            variant="primary"
            size="sm"
            onClick={() => onViewDetails(property)}
          >
            View Details
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default PropertyCard;
