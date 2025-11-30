/**
 * Download/Save utility functions
 * Handles saving compressed media to device storage
 */

import {Platform, Alert} from 'react-native';
import {getFileExtension} from './fileUtils';
import {MediaType} from '../types';

// Optional import for react-native-fs
let RNFS: any = null;
try {
  RNFS = require('react-native-fs');
} catch (e) {
  console.warn('react-native-fs not available');
}

// Optional import for CameraRoll (iOS photo library)
let CameraRoll: any = null;
try {
  if (Platform.OS === 'ios') {
    CameraRoll = require('@react-native-camera-roll/camera-roll');
  }
} catch (e) {
  console.warn(
    'CameraRoll not available, will use file system only. Install @react-native-camera-roll/camera-roll for photo library access.',
  );
}

/**
 * Generates a unique filename with timestamp
 * @param uri - Original file URI
 * @param prefix - Optional prefix (e.g., "compressed")
 * @returns Generated filename
 */
const generateFileName = (uri: string, prefix: string = 'compressed'): string => {
  const extension = getFileExtension(uri);
  const timestamp = Date.now();
  return `${prefix}_${timestamp}.${extension}`;
};

/**
 * Saves media file to device storage
 * For iOS: Saves to photo library (images/videos)
 * For Android: Saves to Downloads folder
 * @param uri - File URI to save
 * @param mediaType - Type of media ('image' | 'video')
 * @returns Promise resolving to saved file path
 */
export const saveMediaToDevice = async (
  uri: string,
  mediaType: MediaType,
): Promise<string> => {
  try {
    if (Platform.OS === 'ios') {
      // iOS: Save to photo library using CameraRoll
      if (CameraRoll) {
        await CameraRoll.save(uri, {
          type: mediaType === 'image' ? 'photo' : 'video',
          album: 'ReactNativeCompressor',
        });
        return 'Photo Library';
      } else if (RNFS) {
        // Fallback: Save to Documents directory
        const fileName = generateFileName(uri);
        const destPath = `${RNFS.DocumentDirectoryPath}/${fileName}`;
        await RNFS.copyFile(uri, destPath);
        return destPath;
      } else {
        throw new Error('File system access not available');
      }
    } else {
      // Android: Save to Downloads folder
      if (!RNFS) {
        throw new Error('react-native-fs is required for Android downloads');
      }
      const fileName = generateFileName(uri);
      const downloadsPath = `${RNFS.DownloadDirectoryPath}/${fileName}`;
      await RNFS.copyFile(uri, downloadsPath);
      return downloadsPath;
    }
  } catch (error) {
    console.error('Save media error:', error);
    throw new Error('Failed to save media to device');
  }
};

/**
 * Downloads/saves compressed media with user feedback
 * @param uri - Compressed file URI
 * @param mediaType - Type of media
 * @param onSuccess - Success callback
 * @param onError - Error callback
 */
export const downloadCompressedMedia = async (
  uri: string,
  mediaType: MediaType,
  onSuccess?: (path: string) => void,
  onError?: (error: Error) => void,
): Promise<void> => {
  try {
    const savedPath = await saveMediaToDevice(uri, mediaType);

    const message =
      Platform.OS === 'ios'
        ? 'Media saved to Photo Library!'
        : `Media saved to Downloads!\n${savedPath}`;

    Alert.alert('Success', message, [{text: 'OK'}]);
    onSuccess?.(savedPath);
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : 'Failed to save media';
    Alert.alert('Error', errorMessage, [{text: 'OK'}]);
    onError?.(error instanceof Error ? error : new Error(errorMessage));
  }
};

