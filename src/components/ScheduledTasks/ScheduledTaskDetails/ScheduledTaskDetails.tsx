import React, { useState, ReactNode, useEffect } from 'react';
import {
  Badge, Card, Accordion, useAccordionButton, Modal, Form, Button
} from 'react-bootstrap';
import {
  Truck, Clock, CheckCircle, ArrowRepeat, GeoAlt, Person, Telephone, ExclamationTriangle,
  Box, ChevronDown, ChevronUp, Search
} from 'react-bootstrap-icons';
import './scheduledTaskDetails.css';
import PickupProcessComponent from './PickupProcessComponent';

const PickupData = {
  "pickupId": 4,
  "pickupNumber": "TEST-001",
  "supplierId": 1,
  "requestedPickupDate": "2025-07-28T00:00:00",
  "requestedTimeSlot": "Morning",
  "pickupAddressId": 1,
  "deliveryAddressId": 2,
  "deliveryRecipientName": "John Doe",
  "deliveryRecipientContactNumber": "9876543210",
  "overallInstructionsForDriver": "Please call before delivery.",
  "pickupStatusId": 1,
  "estimatedTotalWeightKg": 25.5,
  "estimatedTotalVolumeCm3": 125000,
  "totalPickupAmount": 1200,
  "assignedDriverId": 1,
  "assignedVehicleId": 601,
  "actualPickupTimestamp": null,
  "actualDeliveryTimestamp": null,
  "createdAt": "2025-07-28T15:38:01.19",
  "createdBy": 99,
  "updatedAt": "2025-07-28T16:40:17.42",
  "supplier": {
    "supplierId": 1,
    "userId": 0,
    "supplierName": "Acme Corp",
    "contactName": null,
    "email": "john@acme.com",
    "phone": "9876543210",
    "gstin": null,
    "isActive": false,
    "createdAt": "0001-01-01T00:00:00",
    "updatedAt": "0001-01-01T00:00:00",
    "supplierAddressId": 0,
    "pickUpAddressId": 0,
    "deliverAddressId": 0
  },
  "pickupAddress": {
    "addressId": 1,
    "addressTypeId": 1,
    "addressLine1": "123 MG Road",
    "addressLine2": "Near Central Mall",
    "city": "Bengaluru",
    "state": "Karnataka",
    "pincode": "560001",
    "country": "India",
    "latitude": 12.971599,
    "longitude": 77.594566,
    "landmark": "Opposite Central Mall",
    "createdAt": "2025-07-24T14:54:59.933",
    "updatedAt": "2025-07-24T14:54:59.933"
  },
  "deliveryAddress": {
    "addressId": 2,
    "addressTypeId": 2,
    "addressLine1": "45 Residency Road",
    "addressLine2": null,
    "city": "Bengaluru",
    "state": "Karnataka",
    "pincode": "560025",
    "country": "India",
    "latitude": 12.972442,
    "longitude": 77.580643,
    "landmark": "Beside SBI Bank",
    "createdAt": "2025-07-24T14:54:59.933",
    "updatedAt": "2025-07-28T12:28:20.003"
  },
  "assigneVehicle": null,
  "assigneDriver": {
    "driverId": 1,
    "driverName": "Raj Kumar",
    "phone": "2222222222",
    "licenseNumber": "DL123456",
    "vehicleNumber": "KA01AB1234"
  },
  "pickupItems": null,
  "pickupItemsDetail": [
    {
      "pickupItemId": 1,
      "pickupId": 4,
      "inventoryItemId": 1,
      "itemName": "Laptop",
      "itemDescription": "Dell Latitude 5400",
      "quantity": 2,
      "weightKg": 2.5,
      "lengthCm": 35,
      "widthCm": 24,
      "heightCm": 2,
      "volumeCm3": 1680,
      "itemType": "Electronics",
      "natureOfGoods": "Fragile",
      "declaredValue": 150000,
      "specialInstructions": "Handle with care",
      "createdAt": "2025-07-24T17:18:44.597",
      "updatedAt": "2025-07-24T17:18:44.597"
    },
    {
      "pickupItemId": 3,
      "pickupId": 4,
      "inventoryItemId": 2,
      "itemName": "Steel Rods",
      "itemDescription": "Mild steel rods for construction",
      "quantity": 20,
      "weightKg": 12,
      "lengthCm": 150,
      "widthCm": 5,
      "heightCm": 5,
      "volumeCm3": 3750,
      "itemType": "Construction",
      "natureOfGoods": "Non-fragile",
      "declaredValue": 12000,
      "specialInstructions": null,
      "createdAt": "2025-07-24T17:18:44.597",
      "updatedAt": "2025-07-24T17:18:44.597"
    },
    {
      "pickupItemId": 4,
      "pickupId": 4,
      "inventoryItemId": 4,
      "itemName": "Refrigerator",
      "itemDescription": "Single-door fridge 190L",
      "quantity": 1,
      "weightKg": 35,
      "lengthCm": 55,
      "widthCm": 60,
      "heightCm": 140,
      "volumeCm3": 462000,
      "itemType": "Appliances",
      "natureOfGoods": "Fragile",
      "declaredValue": 18000,
      "specialInstructions": "Keep upright",
      "createdAt": "2025-07-24T17:18:44.597",
      "updatedAt": "2025-07-24T17:18:44.597"
    }
  ]
}

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








const ScheduledTaskDetails = () => {

  const [status, setStatus] = useState<Status>('in-progress');
  const [showProcess, setShowProcess] = useState(false);
  const [pickupDetailsData, setPickupDetailsData] = useState(PickupData);
  const [pickupItemArray, setPickupItemArray] = useState<any>([]);

  useEffect(() => {
    if (pickupDetailsData?.pickupItemsDetail?.length > 0) {
      setPickupItemArray(pickupDetailsData?.pickupItemsDetail || []);
    }
  }, [pickupDetailsData]);


  const handleUpdateItemStatus = (itemId: number, status: number) => {
  setPickupItemArray((prev:any) =>
    prev.map((item:any) =>
      item.pickupItemId === itemId ? { ...item, itemStatus: status } : item
    )
  );
};


  if (showProcess) {
    return (
      <PickupProcessComponent
        items={pickupItemArray}
        PickId={pickupDetailsData?.pickupId}
        PickType={pickupDetailsData?.pickupStatusId < 6 ? "Pickup" : "Delivery"}
        onGoToItems={() => setShowProcess(false)}
        onUpdateItemStatus={handleUpdateItemStatus}
      />
    );
  }


  return (
    <div className='mt-2'>
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
          <h3 className="pickup-id mb-2 fw-bold"> {pickupDetailsData?.pickupNumber} </h3>
          <Badge pill className="pickup-badge d-flex align-items-center px-2 py-1 bg-light text-dark">
            <Truck size={14} className="me-2" />
            <span> {pickupDetailsData?.pickupStatusId < 6 ? "Pickup" : "Delivery"} </span>
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
                  <div>{pickupDetailsData?.pickupAddress?.addressLine1},</div>
                  {pickupDetailsData?.pickupAddress?.addressLine2 && <div>{pickupDetailsData?.pickupAddress?.addressLine2},</div>}
                  <div>
                    {pickupDetailsData?.pickupAddress?.city},&nbsp;
                    {pickupDetailsData?.pickupAddress?.state},&nbsp;
                    {pickupDetailsData?.pickupAddress?.country}
                  </div>
                  <div>{pickupDetailsData?.pickupAddress?.pincode}</div>
                  <div className="text-muted small">Landmark: {pickupDetailsData?.pickupAddress?.landmark}</div>
                </div>
              </div>
              <div className="d-flex mb-2">
                <Person size={16} className="me-2 mt-1 icon" />
                <div>
                  <div className="fw-semibold">Contact Person</div>
                  <div>{pickupDetailsData?.supplier.supplierName}</div>
                </div>
              </div>
              <div className="d-flex">
                <Telephone size={16} className="me-2 mt-1 icon" />
                <div>
                  <div className="fw-semibold">Contact Number</div>
                  <div>{pickupDetailsData?.supplier.phone}</div>
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
                  <div>{pickupDetailsData?.deliveryAddress?.addressLine1},</div>
                  {pickupDetailsData?.deliveryAddress?.addressLine2 && <div>{pickupDetailsData?.deliveryAddress?.addressLine2},</div>}
                  <div>
                    {pickupDetailsData?.deliveryAddress?.city},&nbsp;
                    {pickupDetailsData?.deliveryAddress?.state},&nbsp;
                    {pickupDetailsData?.deliveryAddress?.country}
                  </div>
                  <div>{pickupDetailsData?.deliveryAddress?.pincode}</div>
                  <div className="text-muted small">Landmark: {pickupDetailsData?.deliveryAddress?.landmark}</div>
                </div>
              </div>
              <div className="d-flex mb-2">
                <Person size={16} className="me-2 mt-1 icon" />
                <div>
                  <div className="fw-semibold">Contact Person</div>
                  <div>{pickupDetailsData.deliveryRecipientName}</div>
                </div>
              </div>
              <div className="d-flex">
                <Telephone size={16} className="me-2 mt-1 icon" />
                <div>
                  <div className="fw-semibold">Contact Number</div>
                  <div>{pickupDetailsData.deliveryRecipientContactNumber}</div>
                </div>
              </div>
            </div>
          </Card.Body>
        </Card>
      </div>

      {pickupDetailsData?.overallInstructionsForDriver && (
        <div className="instructions-section mt-3">
          <Card className="border-rounded-card">
            <Card.Body>
              <div className="d-flex align-items-center mb-2">
                <ExclamationTriangle size={18} className="me-2 text-warning" />
                <h4 className="mb-0 instructions-section-heading">Special Instructions</h4>
              </div>
              <div className="instructions-text">
                {pickupDetailsData?.overallInstructionsForDriver}
              </div>
            </Card.Body>
          </Card>
        </div>
      )}

      <div className="items-section mt-4">
        <h4 className="items-heading mb-3 text-dark">Item/Package List</h4>

        <Accordion className="custom-accordion">
          {pickupItemArray.map((item:any, index:any) => (
            <Card key={item.pickupItemId} className="mb-3">
              <Card.Header className="p-3 card-header-details-accordion bg-white">
                <CustomToggle eventKey={index.toString()}>
                  {(isOpen) => (
                    <div className="d-flex align-items-center justify-content-between w-100">
                      <div className="d-flex align-items-center">
                        <Box size={20} className="me-3 text-primary" />
                        <span className="fw-semibold text-dark">{item.itemName}</span>
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
                      <span className="text-dark">{item.itemDescription}</span>
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
                      <span className="text-dark">{item.itemType}</span>
                    </div>
                    <div className="detail-row mb-2">
                      <span className="detail-label fw-medium">Nature of Goods:</span>
                      <span className="text-dark">{item.natureOfGoods}</span>
                    </div>
                    <div className="detail-row">
                      <span className="detail-label fw-medium">Special Instruction:</span>
                      <span className="text-dark">{item.specialInstructions}</span>
                    </div>
                  </div>
                </Card.Body>
              </Accordion.Collapse>
            </Card>
          ))}
        </Accordion>
      </div>

      <div className='mt-2 d-flex justify-content-end'>
        <Button onClick={() => setShowProcess(true)} > {pickupDetailsData?.pickupStatusId < 6 ? "Start Picking" : "Delivery"} </Button>
      </div>


    </div>
  );
};

export default ScheduledTaskDetails;