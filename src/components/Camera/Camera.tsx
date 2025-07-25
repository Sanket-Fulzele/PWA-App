import React, { useRef, useState, useEffect } from 'react';
import { Button, Modal } from 'react-bootstrap';
import './Camera.css';

const Camera: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [error, setError] = useState<string>('');
  const [showModal, setShowModal] = useState(false);
  const [photos, setPhotos] = useState<string[]>([]);
  const [isCameraLoading, setIsCameraLoading] = useState(false);

  const startCamera = async () => {
    setIsCameraLoading(true);
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment' },
        audio: false
      });
      setStream(mediaStream);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
      setError('');
    } catch (err) {
      setError('Camera access denied. Please enable camera permissions.');
    } finally {
      setIsCameraLoading(false);
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
      if (videoRef.current) {
        videoRef.current.srcObject = null;
      }
    }
  };

  const takePhoto = () => {
    if (videoRef.current) {
      const canvas = document.createElement('canvas');
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(videoRef.current, 0, 0);
        const photoData = canvas.toDataURL('image/jpeg');
        setPhotos(prev => [...prev, photoData]);
        stopCamera();
        setShowModal(false);
      }
    }
  };

  const removePhoto = (index: number) => {
    setPhotos(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = () => {
    console.log('Submitting photos:', photos);
    // Here you would typically send the photos to your backend
  };

  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, []);

  return (
    <div className="mobile-camera-container">
      <div className="mobile-header-camera">
        <h2 className="mobile-title">Pickup Orders</h2>
        {photos.length < 3 && (
          <Button 
            variant="primary" 
            onClick={() => {
              setShowModal(true);
              startCamera();
            }}
            className="mobile-add-btn"
            disabled={isCameraLoading}
          >
            {isCameraLoading ? '...' : '+'}
          </Button>
        )}
      </div>

      <div className="mobile-photos-row">
        {photos.map((photo, index) => (
          <div key={index} className="mobile-photo-thumbnail">
            <img src={photo} alt={`Order ${index + 1}`} />
            <button 
              className="mobile-remove-btn"
              onClick={() => removePhoto(index)}
            >
              ×
            </button>
          </div>
        ))}
        {photos.length === 0 && (
          <div className="mobile-empty-state">
            Tap + to add photos (max 3)
          </div>
        )}
      </div>

      {photos.length > 0 && (
        <button 
          className="mobile-submit-btn"
          onClick={handleSubmit}
        >
          Submit {photos.length} Photo{photos.length !== 1 ? 's' : ''}
        </button>
      )}

      {/* Camera Modal */}
      <Modal 
        show={showModal} 
        onHide={() => {
          stopCamera();
          setShowModal(false);
        }} 
        centered
        backdrop="static"
        className="mobile-camera-modal"
      >
        <Modal.Header closeButton className="mobile-modal-header">
          <Modal.Title className="mobile-modal-title">Take Photo</Modal.Title>
        </Modal.Header>
        <Modal.Body className="mobile-modal-body">
          {error ? (
            <div className="mobile-error-message">
              <p>{error}</p>
              <button 
                className="mobile-close-btn"
                onClick={() => setShowModal(false)}
              >
                Close
              </button>
            </div>
          ) : (
            <>
              <div className="mobile-camera-frame">
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  className="mobile-camera-preview"
                />
                {isCameraLoading && (
                  <div className="mobile-camera-loading">
                    <div className="mobile-spinner"></div>
                  </div>
                )}
              </div>
              <div className="mobile-camera-controls">
                <button 
                  className="mobile-capture-btn"
                  onClick={takePhoto}
                  disabled={!stream || isCameraLoading}
                >
                  <span className="mobile-capture-icon"></span>
                </button>
              </div>
            </>
          )}
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Camera;