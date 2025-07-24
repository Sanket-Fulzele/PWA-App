import React, { useEffect, useRef, useState } from 'react';
import { BrowserMultiFormatReader } from '@zxing/browser';
import { Modal, Button, Form } from 'react-bootstrap';
import './Barcode.css';

const Barcode: React.FC = () => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const imgRef = useRef<HTMLImageElement>(null);
    const [result, setResult] = useState<string>('');
    const [inputValue, setInputValue] = useState<string>('');
    const [error, setError] = useState<string>('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isAutoScanning, setIsAutoScanning] = useState(false);
    const scanIntervalRef = useRef<NodeJS.Timeout | null>(null);

    const startCamera = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true });
            if (videoRef.current) {
                videoRef.current.srcObject = stream;
                videoRef.current.play();
                setError('');
            }
        } catch (err) {
            setError('Failed to access camera. Please make sure you have granted camera permissions.');
            console.error(err);
        }
    };

    const stopCamera = () => {
        const stream = videoRef.current?.srcObject as MediaStream;
        stream?.getTracks().forEach(track => track.stop());
    };

    const handleProcessBarcode = (value: string) => {
        if (value.trim()) {  // Only process if there's actual content
            setResult(value);
            setInputValue('');  // Clear the input
            setIsModalOpen(false);  // Close the modal
        }
    };

    const captureAndScan = async () => {
        if (!videoRef.current || !canvasRef.current || !imgRef.current) return;

        const canvas = canvasRef.current;
        const video = videoRef.current;

        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        imgRef.current.src = canvas.toDataURL();

        const codeReader = new BrowserMultiFormatReader();

        try {
            const result = await codeReader.decodeFromImageElement(imgRef.current);
            const scannedValue = result.getText();
            handleProcessBarcode(scannedValue);
            setError('');
        } catch (err) {
            if (!isAutoScanning) {
                setResult('');
                setError('No barcode/QR code detected. Please try again.');
                console.log(err);
            }
        }
    };

    const handleOpenScannerModal = () => {
        setIsModalOpen(true)
        setInputValue('')
    }

    const startAutoScan = () => {
        setIsAutoScanning(true);
        // Scan every 1 second
        scanIntervalRef.current = setInterval(captureAndScan, 1000);
    };

    const stopAutoScan = () => {
        setIsAutoScanning(false);
        if (scanIntervalRef.current) {
            clearInterval(scanIntervalRef.current);
            scanIntervalRef.current = null;
        }
    };

    useEffect(() => {
        if (isModalOpen) {
            startCamera();
            startAutoScan();
        } else {
            stopCamera();
            stopAutoScan();
        }
        return () => {
            stopCamera();
            stopAutoScan();
        };
    }, [isModalOpen]);

    

    return (
        <div className="barcode-page">
            <div className="d-flex flex-column align-items-center gap-3">
                <Button
                    variant="primary"
                    onClick={handleOpenScannerModal}
                    className="open-scanner-button"
                >
                    Open Scanner
                </Button>

                {result && (
                    <div className="result-card">
                        <h5>Scanned Result:</h5>
                        <p className="mb-0">{result}</p>
                    </div>
                )}
            </div>

            <Modal
                show={isModalOpen}
                onHide={() => setIsModalOpen(false)}
                backdrop="static"
                keyboard={false}
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title>Bar code Scanner</Modal.Title>
                </Modal.Header>
                <Modal.Body className='px-4'>
                    <Form.Group className="mb-3 d-flex gap-2">
                        <Form.Control
                            type="text"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            placeholder="Enter or scan barcode"
                        />
                        <Button
                            variant="success"
                            onClick={() => handleProcessBarcode(inputValue)}
                        >
                            Go
                        </Button>
                    </Form.Group>

                    <div className="scanner-container">
                        <div className="camera-container">
                            <div className="camera-wrapper">
                                <video ref={videoRef} className="camera-view" />
                                <div className="scan-overlay">
                                    <div className="scan-region"></div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {error && (
                        <div className="alert alert-danger mt-3">
                            {error}
                        </div>
                    )}

                </Modal.Body>
            </Modal>

            <canvas ref={canvasRef} style={{ display: 'none' }} />
            <img ref={imgRef} style={{ display: 'none' }} alt="Captured frame" />
        </div >
    );
};

export default Barcode;
