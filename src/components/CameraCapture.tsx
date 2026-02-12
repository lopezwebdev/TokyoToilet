import React, { useRef, useState, useCallback, useEffect } from 'react';
import { Camera, X, Download, RotateCcw, MapPin } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { calculateDistance } from '../utils/geolocation';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db, storage } from '../firebase';

interface CameraCaptureProps {
  locationName: string;
  targetCoordinates: { lat: number; lng: number };
  onClose: () => void;
  onPhotoTaken: (photoUrl: string) => void;
}

export const CameraCapture: React.FC<CameraCaptureProps> = ({
  locationName,
  targetCoordinates,
  onClose,
  onPhotoTaken
}) => {
  const { t } = useLanguage();
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const initializingRef = useRef(false);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [capturedPhoto, setCapturedPhoto] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [locationError, setLocationError] = useState<string | null>(null);
  const [isVerifyingLocation, setIsVerifyingLocation] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [userName, setUserName] = useState('');

  const checkLocation = useCallback(() => {
    setIsVerifyingLocation(true);
    setLocationError(null);

    if (!navigator.geolocation) {
      setLocationError('Geolocation is not supported');
      setIsVerifyingLocation(false);
      return;
    }

    // Timeout for location request (10s)
    const options = {
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 0
    };

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setIsVerifyingLocation(false);
        const distance = calculateDistance(
          position.coords.latitude,
          position.coords.longitude,
          targetCoordinates.lat,
          targetCoordinates.lng
        );

        if (distance > 0.05) { // 50 meters
          setLocationError("You are too far from the location to take this picture.");
        } else {
          setLocationError(null);
        }
      },
      (error) => {
        setIsVerifyingLocation(false);
        console.error("Geolocation error:", error);

        let msg = t('camera.locationCheckFailed'); // "Unable to retrieve location"
        if (error.code === 1) msg = "Location permission denied. Please allow location access.";
        if (error.code === 3) msg = "Location request timed out. Please retry.";
        setLocationError(msg);
      },
      options
    );
  }, [targetCoordinates, t]);

  const startCamera = useCallback(async () => {
    if (initializingRef.current) return;
    initializingRef.current = true;

    setIsLoading(true);
    setError(null);
    checkLocation();

    const timeout = new Promise((_, reject) =>
      setTimeout(() => reject(new Error('TIMEOUT')), 10000)
    );

    try {
      // Basic constraints for maximum compatibility
      const constraints = {
        video: {
          facingMode: 'environment'
        }
      };

      const mediaStream = await Promise.race([
        navigator.mediaDevices.getUserMedia(constraints),
        timeout
      ]) as MediaStream;

      if (!initializingRef.current) {
        mediaStream.getTracks().forEach(track => track.stop());
        return;
      }

      setStream(mediaStream);
    } catch (err: any) {
      console.error('Camera access error:', err);
      let errorMessage = t('camera.error');

      if (err.message === 'TIMEOUT') {
        errorMessage = 'Camera is taking too long to start. Please check permissions.';
      } else if (err.name === 'NotAllowedError' || err.name === 'PermissionDeniedError') {
        errorMessage = 'Camera permission denied. Please reset permissions in Settings.';
      } else if (err.name === 'NotFoundError' || err.name === 'DevicesNotFoundError') {
        errorMessage = 'No camera found on this device.';
      } else if (err.name === 'NotReadableError' || err.name === 'TrackStartError') {
        errorMessage = 'Camera is in use by another app.';
      }

      setError(errorMessage);
    } finally {
      setIsLoading(false);
      initializingRef.current = false;
    }
  }, [checkLocation, t]);

  const stopCamera = useCallback(() => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
  }, [stream]);

  const capturePhoto = useCallback(() => {
    if (locationError) return;

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
  }, [stopCamera, locationError]);

  const submitToArchive = async () => {
    if (!capturedPhoto) return;
    setIsUploading(true);

    try {
      // 1. Convert Base64 (DataURL) to Blob
      const response = await fetch(capturedPhoto);
      const blob = await response.blob();

      // 2. Sanitize filename
      const sanitizedName = locationName.replace(/[^a-zA-Z0-9.-]/g, '_');
      const filename = `submissions/${sanitizedName}_${Date.now()}.jpg`;
      const storageRef = ref(storage, filename);

      console.log('Starting upload...');

      // 3. Upload Bytes (Simpler, no artificial race timeout)
      await uploadBytes(storageRef, blob, {
        contentType: 'image/jpeg',
        customMetadata: { author: userName || 'Anonymous' }
      });

      const downloadURL = await getDownloadURL(storageRef);
      console.log('Upload success:', downloadURL);

      // Save metadata to Firestore
      await addDoc(collection(db, 'submissions'), {
        toiletId: locationName,
        photoUrl: downloadURL,
        timestamp: serverTimestamp(),
        status: 'pending',
        userAgent: navigator.userAgent,
        authorName: userName || 'Anonymous'
      });

      setUploadSuccess(true);

      // Wait 1.5s then close
      setTimeout(() => {
        onPhotoTaken(capturedPhoto);
      }, 1500);

    } catch (err: any) {
      console.error("Upload failed details:", err);
      let msg = "Failed to upload photo.";

      if (err.code === 'storage/unauthorized') msg = "Permission denied. Check Storage Rules.";
      if (err.code === 'storage/retry-limit-exceeded') msg = "Upload failed due to network issues.";

      alert(msg + "\n\nError: " + (err.message || err.code));
    } finally {
      setIsUploading(false);
    }
  };

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

  useEffect(() => {
    if (videoRef.current && stream) {
      videoRef.current.srcObject = stream;
    }
  }, [stream]);

  useEffect(() => {
    return () => stopCamera();
  }, [stopCamera]);

  const handleStartCamera = () => {
    setHasStarted(true);
    startCamera();
  };

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
          {!hasStarted ? (
            <div className="p-12 text-center min-h-[300px] flex flex-col items-center justify-center">
              <Camera className="w-16 h-16 text-slate-600 mb-6" />
              <p className="text-slate-300 mb-6 font-light">
                Ready to capture at {locationName}?
              </p>
              <button
                onClick={handleStartCamera}
                className="px-6 py-3 bg-amber-500 text-slate-900 font-bold rounded-full hover:bg-amber-400 transition-transform active:scale-95 shadow-lg flex items-center gap-2"
              >
                <Camera className="w-5 h-5" />
                Start Camera
              </button>
            </div>
          ) : error ? (
            <div className="p-8 text-center">
              <p className="text-red-400 mb-4">{error}</p>
              <button
                onClick={startCamera}
                className="px-4 py-2 bg-amber-200 text-slate-900 rounded-lg hover:bg-amber-300 transition-colors"
              >
                {t('camera.tryAgain')}
              </button>
            </div>
          ) : isLoading || isVerifyingLocation ? (
            <div className="p-8 text-center flex flex-col items-center justify-center min-h-[300px]">
              <div className="w-8 h-8 border-4 border-amber-200 border-t-transparent rounded-full animate-spin mb-4"></div>
              <p className="text-slate-400">
                {isLoading ? t('camera.starting') : 'Verifying location...'}
              </p>
            </div>
          ) : capturedPhoto ? (
            <div className="relative flex flex-col items-center bg-slate-900 pb-4 rounded-b-xl overflow-hidden">
              <img
                src={capturedPhoto}
                alt="Captured photo"
                className="w-full h-auto max-h-[60vh] object-contain bg-black mb-4"
              />

              <div className="w-full max-w-sm px-6 space-y-4">
                {/* Name Input */}
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1 ml-1">
                    Your Name (Optional)
                  </label>
                  <input
                    type="text"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    placeholder="Enter your name for credit"
                    className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500/50 transition-all"
                  />
                </div>

                {/* Single Submit Button */}
                <button
                  onClick={submitToArchive}
                  disabled={isUploading || uploadSuccess}
                  className={`w-full py-4 text-base font-bold rounded-xl shadow-lg flex items-center justify-center gap-2 transition-all active:scale-95 ${uploadSuccess
                      ? 'bg-green-500 text-white'
                      : 'bg-amber-500 text-slate-900 hover:bg-amber-400'
                    } disabled:opacity-70 disabled:cursor-not-allowed`}
                >
                  {isUploading ? (
                    <div className="w-5 h-5 border-2 border-slate-900 border-t-transparent rounded-full animate-spin"></div>
                  ) : uploadSuccess ? (
                    <MapPin className="w-5 h-5" />
                  ) : (
                    <MapPin className="w-5 h-5" />
                  )}
                  {isUploading ? 'Uploading...' : uploadSuccess ? 'Archived!' : 'Submit to Archive'}
                </button>

                {/* Secondary Actions */}
                <div className="flex gap-3 justify-center pt-2 border-t border-slate-800">
                  <button
                    onClick={retakePhoto}
                    disabled={isUploading}
                    className="flex-1 py-3 bg-slate-800 text-slate-300 rounded-lg text-sm font-medium hover:bg-slate-700 transition-colors flex justify-center items-center gap-2"
                  >
                    <RotateCcw className="w-4 h-4" />
                    Retake
                  </button>
                  <button
                    onClick={savePhoto}
                    disabled={isUploading}
                    className="flex-1 py-3 bg-slate-800 text-slate-300 rounded-lg text-sm font-medium hover:bg-slate-700 transition-colors flex justify-center items-center gap-2"
                  >
                    <Download className="w-4 h-4" />
                    Save Only
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="relative h-full">
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className="w-full h-auto max-h-[80vh] object-cover" // object-cover for full screen feel
              />

              {locationError && (
                <div className="absolute inset-0 z-20 bg-black/80 flex flex-col items-center justify-center p-6 text-center backdrop-blur-sm">
                  <div className="bg-slate-900 p-6 rounded-xl border border-slate-700 shadow-2xl max-w-sm">
                    <MapPin className="w-10 h-10 text-red-400 mx-auto mb-3" />
                    <h4 className="text-white font-medium mb-1">Location Check</h4>
                    <p className="text-sm text-slate-300 mb-6 leading-relaxed">{locationError}</p>

                    <div className="space-y-3">
                      <button
                        onClick={checkLocation}
                        className="w-full px-4 py-2 bg-slate-700 text-white rounded-lg text-sm hover:bg-slate-600 transition-colors"
                      >
                        Retry GPS
                      </button>
                      {import.meta.env.DEV && (
                        <button
                          onClick={() => setLocationError(null)}
                          className="w-full px-4 py-2 bg-amber-500/10 text-amber-500 border border-amber-500/50 rounded-lg text-sm hover:bg-amber-500/20 transition-colors font-medium"
                        >
                          Bypass (Test Mode)
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              )}

              <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-10">
                <button
                  onClick={capturePhoto}
                  disabled={!!locationError}
                  className={`w-16 h-16 rounded-full flex items-center justify-center transition-all shadow-lg border-4 border-white/20 ${locationError ? 'bg-slate-500 cursor-not-allowed opacity-50' : 'bg-red-500 hover:bg-red-600 hover:scale-110'}`}
                >
                  <div className="w-14 h-14 rounded-full border-2 border-white"></div>
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