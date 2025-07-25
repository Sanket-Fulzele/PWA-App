import React, { useState, ReactNode } from 'react';
import {
  Badge, Card, Accordion,
  useAccordionButton
} from 'react-bootstrap';
import {
  Truck, Clock, CheckCircle, ArrowRepeat,
  GeoAlt, Person, Telephone, ExclamationTriangle,
  Box, ChevronDown, ChevronUp
} from 'react-bootstrap-icons';
import './scheduledTaskDetails.css';

interface CustomToggleProps {
  children: (isOpen: boolean) => ReactNode;  // Change to function child
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
      {children(isOpen)}  {/* Pass isOpen to children */}
    </button>
  );
};

const ScheduledTaskDetails = () => {
  // Status can be: 'pending', 'in-progress', or 'delivered'
  const status = 'in-progress';

  const statusConfig = {
    'pending': {
      color: '#FFB020',
      icon: <Clock size={14} className="me-1" />,
      text: 'Pending'
    },
    'in-progress': {
      color: '#3366FF',
      icon: <ArrowRepeat size={14} className="me-1" />,
      text: 'In Progress'
    },
    'delivered': {
      color: '#12B76A',
      icon: <CheckCircle size={14} className="me-1" />,
      text: 'Delivered'
    }
  };

  const items = [
    {
      id: 1,
      item_name: "Electronics Package",
      item_description: "Laptop and accessories",
      quantity: 1,
      weight_kg: 3.5,
      item_type: "Fragile",
      nature_of_goods: "Electronics"
    },
    {
      id: 2,
      item_name: "Documents",
      item_description: "Legal contracts",
      quantity: 1,
      weight_kg: 0.5,
      item_type: "Non-fragile",
      nature_of_goods: "Paper"
    },
    {
      id: 3,
      item_name: "Medical Supplies",
      item_description: "Vaccine vials",
      quantity: 5,
      weight_kg: 2.0,
      item_type: "Temperature Sensitive",
      nature_of_goods: "Medical"
    }
  ];

  // Sample data - in a real app, this would come from props or API
  const pickupData = {
    overall_instructions_for_driver: "Handle with care - fragile items inside. Deliver to reception desk only. Call recipient 15 mins before arrival.",
    // ... other existing pickup data
  };


  // Sample address data
  const pickupDetails = {
    address: "123 Business Park, Tower B, 5th Floor, Near Central Mall",
    landmark: "Opposite City Hospital",
    contactName: "John Smith",
    contactNumber: "+1 (555) 123-4567"
  };

  const deliverDetails = {
    address: "456 Customer Street, Apartment 22B, Building C",
    landmark: "Next to Community Park",
    contactName: "Sarah Johnson",
    contactNumber: "+1 (555) 987-6543"
  };

  return (
    <div className='page-container'>
      {/* Header Section */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div>
          <h3 className="pickup-id mb-2 fw-bold">PU-001</h3>
          <Badge pill className="pickup-badge d-flex align-items-center px-2 py-1">
            <Truck size={14} className="me-2" />
            <span>Pickup</span>
          </Badge>
        </div>

        <div className="status-indicator" style={{ backgroundColor: `${statusConfig[status].color}20`, borderColor: statusConfig[status].color }}>
          <div className="d-flex align-items-center">
            {statusConfig[status].icon}
            <span style={{ color: statusConfig[status].color }}>{statusConfig[status].text}</span>
          </div>
        </div>
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

        {/* Deliver Address Card */}
        <Card className="address-card">
          <Card.Body>
            <h5 className="address-type mb-3">Deliver Address</h5>
            <div className="address-detail">
              <div className="d-flex mb-2">
                <GeoAlt size={16} className="me-2 mt-1 icon" />
                <div>
                  <div className="fw-semibold">Full Address</div>
                  <div>{deliverDetails.address}</div>
                  <div className="text-muted small">Landmark: {deliverDetails.landmark}</div>
                </div>
              </div>
              <div className="d-flex mb-2">
                <Person size={16} className="me-2 mt-1 icon" />
                <div>
                  <div className="fw-semibold">Contact Person</div>
                  <div>{deliverDetails.contactName}</div>
                </div>
              </div>
              <div className="d-flex">
                <Telephone size={16} className="me-2 mt-1 icon" />
                <div>
                  <div className="fw-semibold">Contact Number</div>
                  <div>{deliverDetails.contactNumber}</div>
                </div>
              </div>
            </div>
          </Card.Body>
        </Card>
      </div>

      {pickupData.overall_instructions_for_driver && (
        <div className="instructions-section mt-3">
          <Card className="border-rounded-card">
            <Card.Body>
              <div className="d-flex align-items-center mb-2">
                <ExclamationTriangle size={18} className="me-2 text-warning" />
                <h4 className="mb-0 instructions-section-heading">Special Instructions</h4>
              </div>
              <div className="instructions-text">
                {pickupData.overall_instructions_for_driver}
              </div>
            </Card.Body>
          </Card>
        </div>
      )}


     <div className="items-section mt-4">
  <h4 className="items-heading mb-3 text-dark fw-bold">Item/Package List</h4>

  <Accordion className="custom-accordion">
    {items.map((item, index) => (
      <Card key={item.id} className="mb-3">
        <Card.Header className="p-3 card-header-details-accordion bg-white">
          <CustomToggle eventKey={index.toString()}>
            {(isOpen) => (
              <div className="d-flex align-items-center justify-content-between w-100">
                <div className="d-flex align-items-center">
                  <Box size={20} className="me-3 text-primary" />
                  <span className="fw-semibold text-dark">{item.item_name}</span>
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
                <span className="text-dark">{item.item_description}</span>
              </div>
              <div className="detail-row mb-2">
                <span className="detail-label fw-medium">Quantity:</span>
                <span className="text-dark">{item.quantity}</span>
              </div>
              <div className="detail-row mb-2">
                <span className="detail-label fw-medium">Weight:</span>
                <span className="text-dark">{item.weight_kg} kg</span>
              </div>
              <div className="detail-row mb-2">
                <span className="detail-label fw-medium">Item Type:</span>
                <span className="text-dark">{item.item_type}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label fw-medium">Nature of Goods:</span>
                <span className="text-dark">{item.nature_of_goods}</span>
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