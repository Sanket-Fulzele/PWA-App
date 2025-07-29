import React, { useRef, useState } from "react";
import { Button, Container, Row, Col, Form } from "react-bootstrap";
import SignatureCanvas from "react-signature-canvas";

const SignatureComponent: React.FC<{ pickId: number, pickType: string }> = ({ pickId, pickType }) => {
  const sigPadRef = useRef<SignatureCanvas>(null);

  const [signatureUrl, setSignatureUrl] = useState<string | null>(null);
  const [comment, setComment] = useState<string>("");
  const [success, setSuccess] = useState(false);

  const isPickup = pickType === "Pickup";
  const heading = isPickup ? "Pickup Confirmation Signature" : "Delivery Confirmation Signature";
  const buttonLabel = isPickup ? "Save and Picked" : "Delivered & Generate Invoice";


  const handleSave = async () => {
    const pad = sigPadRef.current;
    if (pad && !pad.isEmpty()) {
      // S get canvas without trimming
      const canvas = pad.getCanvas();
      const dataUrl = canvas.toDataURL("image/png");

      const payload = {
        pickId,
        PickType: pickType,
        comment,
        signature: dataUrl,
      };

      console.log("Signature Payload:", payload);

      // API call
      // await fetch("/api/pickup/signature", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify(payload),
      // });

      setSignatureUrl(dataUrl);
      setSuccess(true);
    } else {
      alert("Please provide a signature before saving.");
    }
  };

  const handleClear = () => {
    sigPadRef.current?.clear();
    setSignatureUrl(null);
    setSuccess(false);
  };

  return (
    <Container className="mt-4">
      <h5 className="text-center">{heading}</h5>

      <Form.Group controlId="commentInput" className="my-3">
        <Form.Label>Comment</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter any comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          autoComplete="off"
        />
      </Form.Group>

      <div
        className="mx-auto my-3 border"
        style={{ width: "100%", maxWidth: 500, height: 200, overflow: "hidden", borderRadius: 4 }}
      >
        <SignatureCanvas
          ref={sigPadRef}
          penColor="black"
          canvasProps={{
            width: 500,
            height: 200,
            className: "sigCanvas",
            style: { borderRadius: 4 },
          }}
        />
      </div>

      <Row className="justify-content-center mb-3">
        <Col xs="auto">
          <Button size="sm" variant="secondary" onClick={handleClear}>
            Clear
          </Button>
        </Col>
        <Col xs="auto">
          <Button size="sm" variant="primary" onClick={handleSave}>
            {buttonLabel}
          </Button>
        </Col>
      </Row>

      {/* Signature Preview */}
      {success && signatureUrl && (
        <div className="text-center">
          <p className="text-start">
            Pick ID: <strong>{pickId}</strong>
            {comment && (
              <p className="text-start">
                Comment: <strong>{comment}</strong>
              </p>
            )}
          </p>

          <div className="mt-3">
            <img
              src={signatureUrl}
              alt="Signature Preview"
              style={{ maxWidth: "100%", border: "1px solid #ccc", borderRadius: 8 }}
            />
          </div>
        </div>
      )}
    </Container>
  );
};

export default SignatureComponent;
