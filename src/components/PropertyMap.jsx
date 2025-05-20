import React, { useEffect, useRef } from "react";
import { Modal, Button } from "react-bootstrap";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

const PropertyMap = ({ property, show, onHide }) => {
  if (!property) return null;

  // Mendefinisikan style untuk container peta
  const mapContainerStyle = {
    width: "100%",
    height: "400px",
  };

  // Default center jika property tidak memiliki koordinat
  const defaultCenter = [-6.2088, 106.8456]; // Default untuk Jakarta

  // Menggunakan koordinat dari property jika tersedia
  const center = property.coordinates
    ? [property.coordinates.lat, property.coordinates.lng]
    : defaultCenter;

  // Fix for default Leaflet marker icons
  const mapRef = useRef();
  useEffect(() => {
    // Set custom icon for Leaflet marker
    delete L.Icon.Default.prototype._getIconUrl;
    L.Icon.Default.mergeOptions({
      iconRetinaUrl:
        "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
      iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
      shadowUrl:
        "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
    });
  }, []);

  return (
    <Modal show={show} onHide={onHide} size="xl" centered>
      <Modal.Header closeButton>
        <Modal.Title>Lokasi Properti</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="mb-3">
          <h5>{property.address}</h5>
          <p className="text-muted">{property.mapDescription}</p>
        </div>
        <MapContainer
          center={center}
          zoom={15}
          style={mapContainerStyle}
          ref={mapRef}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          <Marker position={center}>
            <Popup>{property.address}</Popup>
          </Marker>
        </MapContainer>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Tutup
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default PropertyMap;
