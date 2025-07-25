import React, { useState, ReactNode } from 'react';
import {
  Badge, Card, Accordion,
  useAccordionButton, Modal, Form, Button
} from 'react-bootstrap';
import {
  Truck, Clock, CheckCircle, ArrowRepeat,
  GeoAlt, Person, Telephone, ExclamationTriangle,
  Box, ChevronDown, ChevronUp, Search
} from 'react-bootstrap-icons';
import './scheduledTaskDetails.css';

interface CustomToggleProps {
  children: (isOpen: boolean) => ReactNode;
  eventKey: string;
}

const CustomToggle: React.FC<CustomToggleProps> = ({ children, eventKey }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const decoratedOnClick = useAccordionButton(eventKey, () => {
    setIsOpen(prev => !prev);
  });

  return (
    <button
      type="button"
      className="accordion-toggle d-flex w-100 justify-content-between align-items-center p-0 bg-transparent border-0"
      onClick={decoratedOnClick}
    >
      {children(isOpen)}
    </button>
  );
};

// Define status types
type Status = 'pending' | 'in-progress' | 'arrived' | 'completed' | 'cancelled';

interface StatusUpdateModalProps {
  currentStatus: Status;
  onStatusUpdate: (newStatus: Status) => void;
}

// Status configuration
const statusConfig = {
  pending: {
    text: 'Pending',
    color: '#FFC107',
    icon: <Clock color="#FFC107" className="me-2" />
  },
  'in-progress': {
    text: 'In Progress',
    color: '#0D6EFD',
    icon: <ArrowRepeat color="#0D6EFD" className="me-2" />
  },
  arrived: {
    text: 'Arrived',
    color: '#198754',
    icon: <Truck color="#198754" className="me-2" />
  },
  completed: {
    text: 'Completed',
    color: '#198754',
    icon: <CheckCircle color="#198754" className="me-2" />
  },
  cancelled: {
    text: 'Cancelled',
    color: '#DC3545',
    icon: <ExclamationTriangle color="#DC3545" className="me-2" />
  }
};

const StatusUpdateModal: React.FC<StatusUpdateModalProps> = ({ currentStatus, onStatusUpdate }) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState<Status>(currentStatus);

  const handleSubmit = () => {
    onStatusUpdate(selectedStatus);
    setShowModal(false);
  };

  return (
    <>
      <div 
        className="status-indicator" 
        onClick={() => setShowModal(true)}
        style={{ 
          backgroundColor: `${statusConfig[currentStatus].color}20`, 
          border: `1px solid ${statusConfig[currentStatus].color}`,
          borderRadius: '20px',
          padding: '0.375rem 0.75rem',
          cursor: 'pointer'
        }}
      >
        <div className="d-flex align-items-center">
          {statusConfig[currentStatus].icon}
          <span style={{ color: statusConfig[currentStatus].color }}>
            {statusConfig[currentStatus].text}
          </span>
        </div>
      </div>

      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Update Pickup Status</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Current Status</Form.Label>
              <div 
                className="p-2 rounded" 
                style={{ 
                  backgroundColor: `${statusConfig[currentStatus].color}20`,
                  borderLeft: `4px solid ${statusConfig[currentStatus].color}`
                }}
              >
                {statusConfig[currentStatus].text}
              </div>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Update Status To</Form.Label>
              <Form.Select 
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value as Status)}
              >
                <option value="pending">Pending</option>
                <option value="in-progress">In Progress</option>
                <option value="arrived">Arrived</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
              </Form.Select>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Update Status
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

interface Item {
  id: number;
  name: string;
  description: string;
  quantity: number;
  weightKg: number;
  type: string;
  nature: string;
}

interface AddressDetails {
  address: string;
  landmark: string;
  contactName: string;
  contactNumber: string;
}

const ScheduledTaskDetails = () => {
  const [status, setStatus] = useState<Status>('in-progress');

  const items: Item[] = [
    {
      id: 1,
      name: "Electronics Package",
      description: "Laptop and accessories",
      quantity: 1,
      weightKg: 3.5,
      type: "Fragile",
      nature: "Electronics"
    },
    {
      id: 2,
      name: "Documents",
      description: "Legal contracts",
      quantity: 1,
      weightKg: 0.5,
      type: "Non-fragile",
      nature: "Paper"
    },
    {
      id: 3,
      name: "Medical Supplies",
      description: "Vaccine vials",
      quantity: 5,
      weightKg: 2.0,
      type: "Temperature Sensitive",
      nature: "Medical"
    }
  ];

  const pickupDetails: AddressDetails = {
    address: "123 Business Park, Tower B, 5th Floor, Near Central Mall",
    landmark: "Opposite City Hospital",
    contactName: "John Smith",
    contactNumber: "+1 (555) 123-4567"
  };

  const deliveryDetails: AddressDetails = {
    address: "456 Customer Street, Apartment 22B, Building C",
    landmark: "Next to Community Park",
    contactName: "Sarah Johnson",
    contactNumber: "+1 (555) 987-6543"
  };

  const specialInstructions = "Handle with care - fragile items inside. Deliver to reception desk only. Call recipient 15 mins before arrival.";

  return (
    <div className='page-container'>
      {/* Compact Search Section */}
      <div className="compact-search">
        <label htmlFor="mobileSearch" className="compact-search__label">Pickup</label>
        <div className="compact-search__group">
          <input
            type="text"
            id="mobileSearch"
            className="compact-search__input"
            placeholder="Search by Pickup ID"
          />
          <button type="button" className="compact-search__button">
            <Search size={16} />
          </button>
        </div>
      </div>

      {/* Header Section */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div>
          <h3 className="pickup-id mb-2 fw-bold">PU-001</h3>
          <Badge pill className="pickup-badge d-flex align-items-center px-2 py-1 bg-light text-dark">
            <Truck size={14} className="me-2" />
            <span>Pickup</span>
          </Badge>
        </div>

        <StatusUpdateModal
          currentStatus={status}
          onStatusUpdate={setStatus}
        />
      </div>

      {/* Location Details Section */}
      <div className="location-section">
        <h4 className="location-heading mb-3">Location Details:</h4>

        {/* Pickup Address Card */}
        <Card className="mb-3 address-card">
          <Card.Body>
            <h5 className="address-type mb-3">Pickup Address</h5>
            <div className="address-detail">
              <div className="d-flex mb-2">
                <GeoAlt size={16} className="me-2 mt-1 icon" />
                <div>
                  <div className="fw-semibold">Full Address</div>
                  <div>{pickupDetails.address}</div>
                  <div className="text-muted small">Landmark: {pickupDetails.landmark}</div>
                </div>
              </div>
              <div className="d-flex mb-2">
                <Person size={16} className="me-2 mt-1 icon" />
                <div>
                  <div className="fw-semibold">Contact Person</div>
                  <div>{pickupDetails.contactName}</div>
                </div>
              </div>
              <div className="d-flex">
                <Telephone size={16} className="me-2 mt-1 icon" />
                <div>
                  <div className="fw-semibold">Contact Number</div>
                  <div>{pickupDetails.contactNumber}</div>
                </div>
              </div>
            </div>
          </Card.Body>
        </Card>

        {/* Delivery Address Card */}
        <Card className="address-card">
          <Card.Body>
            <h5 className="address-type mb-3">Delivery Address</h5>
            <div className="address-detail">
              <div className="d-flex mb-2">
                <GeoAlt size={16} className="me-2 mt-1 icon" />
                <div>
                  <div className="fw-semibold">Full Address</div>
                  <div>{deliveryDetails.address}</div>
                  <div className="text-muted small">Landmark: {deliveryDetails.landmark}</div>
                </div>
              </div>
              <div className="d-flex mb-2">
                <Person size={16} className="me-2 mt-1 icon" />
                <div>
                  <div className="fw-semibold">Contact Person</div>
                  <div>{deliveryDetails.contactName}</div>
                </div>
              </div>
              <div className="d-flex">
                <Telephone size={16} className="me-2 mt-1 icon" />
                <div>
                  <div className="fw-semibold">Contact Number</div>
                  <div>{deliveryDetails.contactNumber}</div>
                </div>
              </div>
            </div>
          </Card.Body>
        </Card>
      </div>

      {specialInstructions && (
        <div className="instructions-section mt-3">
          <Card className="border-rounded-card">
            <Card.Body>
              <div className="d-flex align-items-center mb-2">
                <ExclamationTriangle size={18} className="me-2 text-warning" />
                <h4 className="mb-0 instructions-section-heading">Special Instructions</h4>
              </div>
              <div className="instructions-text">
                {specialInstructions}
              </div>
            </Card.Body>
          </Card>
        </div>
      )}

      <div className="items-section mt-4">
        <h4 className="items-heading mb-3 text-dark">Item/Package List</h4>

        <Accordion className="custom-accordion">
          {items.map((item, index) => (
            <Card key={item.id} className="mb-3">
              <Card.Header className="p-3 card-header-details-accordion bg-white">
                <CustomToggle eventKey={index.toString()}>
                  {(isOpen) => (
                    <div className="d-flex align-items-center justify-content-between w-100">
                      <div className="d-flex align-items-center">
                        <Box size={20} className="me-3 text-primary" />
                        <span className="fw-semibold text-dark">{item.name}</span>
                      </div>
                      <div className="accordion-arrow">
                        {isOpen ? (
                          <ChevronUp size={18} className="text-muted" />
                        ) : (
                          <ChevronDown size={18} className="text-muted" />
                        )}
                      </div>
                    </div>
                  )}
                </CustomToggle>
              </Card.Header>

              <Accordion.Collapse eventKey={index.toString()}>
                <Card.Body className="p-3 bg-light">
                  <div className="item-details">
                    <div className="detail-row mb-2">
                      <span className="detail-label fw-medium">Description:</span>
                      <span className="text-dark">{item.description}</span>
                    </div>
                    <div className="detail-row mb-2">
                      <span className="detail-label fw-medium">Quantity:</span>
                      <span className="text-dark">{item.quantity}</span>
                    </div>
                    <div className="detail-row mb-2">
                      <span className="detail-label fw-medium">Weight:</span>
                      <span className="text-dark">{item.weightKg} kg</span>
                    </div>
                    <div className="detail-row mb-2">
                      <span className="detail-label fw-medium">Item Type:</span>
                      <span className="text-dark">{item.type}</span>
                    </div>
                    <div className="detail-row">
                      <span className="detail-label fw-medium">Nature of Goods:</span>
                      <span className="text-dark">{item.nature}</span>
                    </div>
                  </div>
                </Card.Body>
              </Accordion.Collapse>
            </Card>
          ))}
        </Accordion>
      </div>
    </div>
  );
};

export default ScheduledTaskDetails;