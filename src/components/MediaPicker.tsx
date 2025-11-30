/**
 * MediaPicker Component
 * Handles image and video selection from device gallery or camera
 */

import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from 'react-native';
import {
  launchImageLibrary,
  launchCamera,
  MediaType,
} from 'react-native-image-picker';
import {
  colors,
  spacing,
  borderRadius,
  typography,
  shadows,
} from '../styles/theme';
import {MediaFile} from '../types';
import {getMediaType} from '../utils/fileUtils';

interface MediaPickerProps {
  onMediaSelected: (media: MediaFile) => void;
  isLoading?: boolean;
}

const MediaPicker: React.FC<MediaPickerProps> = ({
  onMediaSelected,
  isLoading = false,
}) => {
  /**
   * Opens image picker with options for gallery or camera
   * Handles both image and video selection
   */
  const handlePickMedia = () => {
    Alert.alert(
      'Select Media',
      'Choose an option',
      [
        {
          text: 'Camera',
          onPress: () => openCamera(),
        },
        {
          text: 'Gallery',
          onPress: () => openGallery(),
        },
        {
          text: 'Cancel',
          style: 'cancel',
        },
      ],
      {cancelable: true},
    );
  };

  /**
   * Opens camera to capture new media
   */
  const openCamera = () => {
    const options = {
      mediaType: 'mixed' as MediaType, // Allows both image and video
      includeBase64: false,
      maxHeight: 2000,
      maxWidth: 2000,
      quality: 1,
      videoQuality: 'high' as const,
    };

    launchCamera(options, response => {
      handleMediaResponse(response);
    });
  };

  /**
   * Opens gallery to select existing media
   */
  const openGallery = () => {
    const options = {
      mediaType: 'mixed' as MediaType, // Allows both image and video
      includeBase64: false,
      quality: 1,
      videoQuality: 'high' as const,
      selectionLimit: 1,
    };

    launchImageLibrary(options, response => {
      handleMediaResponse(response);
    });
  };

  /**
   * Processes the response from image picker
   * Extracts media information and calls the callback
   */
  const handleMediaResponse = (response: any) => {
    if (response.didCancel) {
      return;
    }

    if (response.errorCode) {
      Alert.alert('Error', `Failed to pick media: ${response.errorMessage}`);
      return;
    }

    const asset = response.assets?.[0];
    if (!asset) {
      return;
    }

    const mediaType = getMediaType(asset.uri || '', asset.type);

    if (!mediaType) {
      Alert.alert(
        'Error',
        'Unsupported file type. Please select an image or video.',
      );
      return;
    }

    const mediaFile: MediaFile = {
      uri: asset.uri || '',
      type: mediaType,
      fileName: asset.fileName,
      fileSize: asset.fileSize,
    };

    onMediaSelected(mediaFile);
  };

  return (
    <TouchableOpacity
      style={[styles.button, isLoading && styles.buttonDisabled]}
      onPress={handlePickMedia}
      disabled={isLoading}
      activeOpacity={0.8}>
      {isLoading ? (
        <ActivityIndicator color={colors.textOnPrimary} />
      ) : (
        <>
          <Text style={styles.buttonIcon}>📷</Text>
          <Text style={styles.buttonText}>Select Media</Text>
        </>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.primary,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    borderRadius: borderRadius.lg,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    ...shadows.md,
    minHeight: 56,
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  buttonIcon: {
    fontSize: 24,
    marginRight: spacing.sm,
  },
  buttonText: {
    ...typography.button,
    color: colors.textOnPrimary,
  },
});

export default MediaPicker;
