import React, { useState } from "react";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import SignatureComponent from "./SignatureComponent";
import "./PickupProcessComponent.css";
import { Box } from "react-bootstrap-icons";


interface InventoryItem {
  pickupItemId: number;
  pickupId: number;
  inventoryItemId: number;
  itemName: string;
  itemDescription: string;
  quantity: number;
  weightKg: number;
  lengthCm: number;
  widthCm: number;
  heightCm: number;
  volumeCm3: number;
  itemType: string;
  natureOfGoods: string;
  declaredValue: number;
  specialInstructions?: string;
  createdAt: string;
  updatedAt: string;
  itemStatus?: number;
  comments?: string;
}

interface Props {
  items: InventoryItem[];
  PickId: number;
  onGoToItems: () => void;
  onUpdateItemStatus: (itemId: number, status: number) => void;
  PickType: string; // Pickup or Deliver
}

export enum ItemStatus {
  None = 0,
  Picked = 1,
  NotPicked = 2,
  Delivered = 3,
  NotDelivered = 4,
}

const CustomLabel = ({
  label,
  value,
  controlId,
}: {
  label: string;
  value: string | number;
  controlId?: string;
}) => (
  <Form.Group as={Row} className="px-0 align-items-center" controlId={controlId}>
    <Col xs={5}>
      <label htmlFor={controlId} className="fw-semibold text-nowrap mb-0 small-label">
        {label}
      </label>
    </Col>
    <Col xs={7}>
      <label className="d-block px-2 mb-0 small-value">{value}</label>
    </Col>
  </Form.Group>
);




const PickupProcessComponent: React.FC<Props> = ({
  items,
  PickId,
  onGoToItems,
  onUpdateItemStatus,
  PickType,
}) => {
  const [current, setCurrent] = useState(0);
  const [comments, setComments] = useState<string[]>(Array(items.length).fill(""));
  const [updatedItems, setUpdatedItems] = useState<InventoryItem[]>([...items]);

  const [itemStatusData, setItemStatusData] = useState<
    {
      pickId: string;
      itemId: number;
      status: number;
      comment: string;
      pickType: string;
    }[]
  >([]);

  const item = updatedItems[current];
  const isLast = current === items.length - 1;

  //   based on PickType
  const successStatus = PickType === "Pickup" ? ItemStatus.Picked : ItemStatus.Delivered;
  const cancelStatus = PickType === "Pickup" ? ItemStatus.NotPicked : ItemStatus.NotDelivered;

  const successLabel = PickType === "Pickup" ? "Picked" : "Delivered";
  const cancelLabel = PickType === "Pickup" ? "Not Picked" : "Not Delivered";

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const updated = [...comments];
    updated[current] = e.target.value;
    setComments(updated);
  };

  const handleStatusUpdate = (statusValue: ItemStatus) => {
    const newItems = [...updatedItems];
    newItems[current].itemStatus = statusValue;
    setUpdatedItems(newItems);

    onUpdateItemStatus(item.pickupItemId, statusValue);

    const payload = {
      pickId: PickId,
      itemId: item.pickupItemId,
      pickType: PickType,
      status: statusValue,
      comment: comments[current] || "",
    };

    console.log("Payload:", payload);

    // setItemStatusData((prev) => {
    //   const existingIndex = prev.findIndex((entry) => entry.itemId === item.id);
    //   const updated = [...prev];
    //   if (existingIndex !== -1) {
    //     updated[existingIndex] = payload;
    //   } else {
    //     updated.push(payload);
    //   }
    //   console.log("Current Item Update:", payload);
    //   return updated;
    // });
  };

  const handleNext = () => {
    if (isLast) {
      console.log("Final Payload:", itemStatusData);
      console.log("Updated Items:", updatedItems);
      setCurrent(current + 1);
    } else {
      setCurrent((prev) => Math.min(prev + 1, items.length));
    }
  };

  if (current === items.length) {
    return (
      <Container className="mt-4">
        <SignatureComponent pickId={PickId} pickType={PickType} />
      </Container>
    );
  }

  return (
    <Container fluid className="pickup-mobile-container px-3">
      <div className="pickup-content">
        <h6 className="text-center mb-3">
          Item {current + 1} of {items.length}
        </h6>

        <Form>
          {/* <div className="border rounded px-2 py-2 mb-3 bg-light">
            <CustomLabel label="Name :" value={item.name} controlId="itemName" />
            <CustomLabel label="Description :" value={item.description} controlId="itemDescription" />
            <CustomLabel label="Weight :" value={item.weight} controlId="itemWeight" />
          </div> */}


          <div>
            <Card className="mb-3">
              <Card.Header className="p-3 card-header-details-accordion bg-white">
                <div className="d-flex align-items-center w-100">
                  <div className="d-flex align-items-center">
                    <Box size={20} className="me-3 text-primary" />
                    <span className="fw-semibold text-dark">{item.itemName}</span>
                  </div>
                </div>
              </Card.Header>
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
                    <span className="detail-label fw-medium">Special Instructions:</span>
                    <span className="text-dark">{item.specialInstructions || 'No special instructions'}</span>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </div>

          <Form.Group className="mb-4" controlId={`comment-${item.pickupItemId}`}>
            <Form.Label className="fw-semibold small-label">Comments</Form.Label>
            <Form.Control
              type="text"
              size="sm"
              placeholder="Enter comment"
              value={comments[current]}
              onChange={handleChange}
            />
          </Form.Group>
        </Form>

        <div className="action-buttons">
          <div className="d-flex justify-content-end gap-2">
            <button
              className="custom-button btn-cancel"
              onClick={() => handleStatusUpdate(cancelStatus)}
            >
              {cancelLabel}
            </button>
            <button
              className="custom-button btn-success"
              onClick={() => handleStatusUpdate(successStatus)}
            >
              {successLabel}
            </button>
          </div>
        </div>
      </div>

      <div className="pickup-footer-sticky d-flex justify-content-between align-items-center p-3 bg-white border-top shadow-sm">
        <Button
          size="sm"
          variant="primary"
          onClick={() => setCurrent((prev) => Math.max(prev - 1, 0))}
          disabled={current === 0}
        >
          Back
        </Button>

        <Button variant="outline-primary" size="sm" onClick={onGoToItems}>
          Go to Items
        </Button>

        <Button
          size="sm"
          onClick={handleNext}
          disabled={updatedItems[current].itemStatus === 0}
        >
          {isLast ? "Finish" : "Next"}
        </Button>
      </div>
    </Container>
  );
};

export default PickupProcessComponent;
