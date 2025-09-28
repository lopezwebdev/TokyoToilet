import React, { useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Expo icons
import { Camera } from 'expo-camera';

export const CameraCapture: React.FC = () => {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [isCameraReady, setIsCameraReady] = useState(false);
  const [type, setType] = useState(Camera.Constants.Type.back);

  React.useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  if (hasPermission === null) {
    return <View><Text>Requesting camera permission...</Text></View>;
  }
  if (hasPermission === false) {
    return <View><Text>No access to camera</Text></View>;
  }

  const toggleCameraType = () => {
    setType(
      type === Camera.Constants.Type.back
        ? Camera.Constants.Type.front
        : Camera.Constants.Type.back
    );
  };

  return (
    <View style={styles.container}>
      <Camera
        style={styles.camera}
        type={type}
        onCameraReady={() => setIsCameraReady(true)}
      >
        <View style={styles.controls}>
          <TouchableOpacity style={styles.button} onPress={toggleCameraType}>
            <Ionicons name="camera-reverse-outline" size={28} color="white" />
            <Text style={styles.buttonText}>Flip</Text>
          </TouchableOpacity>
          {/* Add capture button here if needed */}
        </View>
      </Camera>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  button: {
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    marginTop: 4,
    fontSize: 14,
  },
});
