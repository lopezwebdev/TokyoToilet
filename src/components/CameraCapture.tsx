import React, { useRef, useState, useCallback } from 'react';
import { Camera, X, Download, RotateCcw } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface CameraCaptureProps {
  locationName: string;
  onClose: () => void;
  onPhotoTaken: (photoUrl: string) => void;
}

export const CameraCapture: React.FC<CameraCaptureProps> = ({ 
  locationName, 
  onClose, 
  onPhotoTaken 
}) => {
  const { t } = useLanguage();
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [capturedPhoto, setCapturedPhoto] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const startCamera = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { 
          facingMode: 'environment', // Use back camera on mobile
          width: { ideal: 1920 },
          height: { ideal: 1080 }
        }
      });
      
      setStream(mediaStream);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
    } catch (err) {
      setError(t('camera.error'));
      console.error('Camera access error:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const stopCamera = useCallback(() => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
  }, [stream]);

  const capturePhoto = useCallback(() => {
    if (!videoRef.current || !canvasRef.current) return;

    const video = videoRef.current;
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    if (!context) return;

    // Set canvas dimensions to match video
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    // Draw video frame to canvas
    context.drawImage(video, 0, 0);

    // Convert to data URL
    const photoUrl = canvas.toDataURL('image/jpeg', 0.9);
    setCapturedPhoto(photoUrl);
    stopCamera();
  }, [stopCamera]);

  const savePhoto = useCallback(() => {
    if (!capturedPhoto) return;

    // Create download link
    const link = document.createElement('a');
    link.download = `tokyo-toilet-explorer-${locationName.toLowerCase().replace(/\s+/g, '-')}-${Date.now()}.jpg`;
    link.href = capturedPhoto;
    link.click();

    onPhotoTaken(capturedPhoto);
  }, [capturedPhoto, locationName, onPhotoTaken]);

  const retakePhoto = useCallback(() => {
    setCapturedPhoto(null);
    startCamera();
  }, [startCamera]);

  React.useEffect(() => {
    startCamera();
    return () => stopCamera();
  }, [startCamera, stopCamera]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4">
      <div className="bg-slate-900 rounded-xl border border-slate-600 max-w-2xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-slate-600">
          <div className="flex items-center gap-3">
            <Camera className="w-5 h-5 text-amber-200" />
            <h3 className="text-lg font-light text-slate-200 tracking-wide">
              {t('camera.title')} {locationName}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-200 hover:bg-slate-700 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Camera/Photo Area */}
        <div className="relative bg-black">
          {error ? (
            <div className="p-8 text-center">
              <p className="text-red-400 mb-4">{error}</p>
              <button
                onClick={startCamera}
                className="px-4 py-2 bg-amber-200 text-slate-900 rounded-lg hover:bg-amber-300 transition-colors"
              >
                {t('camera.tryAgain')}
              </button>
            </div>
          ) : isLoading ? (
            <div className="p-8 text-center">
              <p className="text-slate-400">{t('camera.starting')}</p>
            </div>
          ) : capturedPhoto ? (
            <div className="relative">
              <img
                src={capturedPhoto}
                alt="Captured photo"
                className="w-full h-auto max-h-96 object-contain"
              />
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-3">
                <button
                  onClick={retakePhoto}
                  className="flex items-center gap-2 px-4 py-2 bg-slate-700 text-slate-200 rounded-lg hover:bg-slate-600 transition-colors"
                >
                  <RotateCcw className="w-4 h-4" />
                  {t('camera.retake')}
                </button>
                <button
                  onClick={savePhoto}
                  className="flex items-center gap-2 px-4 py-2 bg-amber-200 text-slate-900 rounded-lg hover:bg-amber-300 transition-colors"
                >
                  <Download className="w-4 h-4" />
                  {t('camera.savePhoto')}
                </button>
              </div>
            </div>
          ) : (
            <div className="relative">
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className="w-full h-auto max-h-96 object-contain"
              />
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
                <button
                  onClick={capturePhoto}
                  className="w-16 h-16 bg-amber-200 hover:bg-amber-300 rounded-full flex items-center justify-center transition-colors shadow-lg"
                >
                  <Camera className="w-8 h-8 text-slate-900" />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Instructions */}
        <div className="p-4 border-t border-slate-600">
          <p className="text-sm text-slate-400 text-center font-light">
            {capturedPhoto 
              ? t('camera.instructions.save')
              : t('camera.instructions.capture')
            }
          </p>
        </div>
      </div>

      {/* Hidden canvas for photo capture */}
      <canvas ref={canvasRef} className="hidden" />
    </div>
  );
};