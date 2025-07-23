import React, { useEffect, useRef, useState } from 'react';
import { BrowserMultiFormatReader, BarcodeFormat } from '@zxing/browser';

const About: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const [result, setResult] = useState<string>('');
  const [streaming, setStreaming] = useState(false);

  const startCamera = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
    if (videoRef.current) {
      videoRef.current.srcObject = stream;
      videoRef.current.play();
      setStreaming(true);
    }
  };

  const stopCamera = () => {
    const stream = videoRef.current?.srcObject as MediaStream;
    stream?.getTracks().forEach(track => track.stop());
    setStreaming(false);
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

    // convert canvas to image element
    imgRef.current.src = canvas.toDataURL();

    // include all supported formats explicitly (optional)
    const codeReader = new BrowserMultiFormatReader();

    try {
      const result = await codeReader.decodeFromImageElement(imgRef.current);
      setResult(result.getText());
    } catch (err) {
      setResult('No barcode/QR code detected.');
      console.log(err);
    }
  };

  useEffect(() => {
    startCamera();

    return () => {
      stopCamera();
    };
  }, []);

  return (
    <div>
      <h2>About - Scan Barcode & QR Code</h2>
      <div style={{ display: 'flex', gap: '20px' }}>
        <div>
          <h4>📷 Live Camera</h4>
          <video ref={videoRef} style={{ width: '300px', border: '1px solid black' }} />
        </div>
        <div>
          <h4>🖼 Captured Image</h4>
          <img
            ref={imgRef}
            alt="Captured frame"
            style={{ width: '300px', border: '1px solid black' }}
          />
        </div>
      </div>
      <br />
      <button onClick={captureAndScan} disabled={!streaming}>
        Capture & Scan
      </button>
      <p>
        <strong>Scanned Result:</strong> {result || 'No barcode/QR code scanned yet.'}
      </p>
      <canvas ref={canvasRef} style={{ display: 'none' }} />
    </div>
  );
};

export default About;

// https://app.qr-code-generator.com/manage/?aftercreate=1
// https://barcode.tec-it.com/en/