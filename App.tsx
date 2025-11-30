/**
 * Main App Component
 * Media Compression Application
 *
 * Features:
 * - Upload images or videos from device
 * - Adjustable compression level (1-10)
 * - Real-time preview of original and compressed media
 * - File size comparison
 */

import React, {useState} from 'react';
import {SafeAreaView, View, StyleSheet, StatusBar, Alert} from 'react-native';
import MediaPicker from './src/components/MediaPicker';
import CompressionSlider from './src/components/CompressionSlider';
import CompressButton from './src/components/CompressButton';
import MediaPreview from './src/components/MediaPreview';
import {colors, spacing} from './src/styles/theme';
import {MediaFile, CompressionResult} from './src/types';
import {compressMedia} from './src/utils/compressionUtils';

// Optional import for file size - app will work without it
let RNFS: any = null;
try {
  RNFS = require('react-native-fs');
} catch (e) {
  console.warn('react-native-fs not available, file sizes may not be accurate');
}

const App: React.FC = () => {
  // State management
  const [originalMedia, setOriginalMedia] = useState<MediaFile | null>(null);
  const [compressedResult, setCompressedResult] =
    useState<CompressionResult | null>(null);
  const [compressionLevel, setCompressionLevel] = useState<number>(5);
  const [isCompressing, setIsCompressing] = useState<boolean>(false);
  const [isLoadingMedia, setIsLoadingMedia] = useState<boolean>(false);

  /**
   * Handles media selection from picker
   * Updates state with selected media file
   */
  const handleMediaSelected = (media: MediaFile) => {
    setOriginalMedia(media);
    setCompressedResult(null); // Reset previous compression result
    setIsLoadingMedia(false);
  };

  /**
   * Handles compression button press
   * Compresses the selected media using the current compression level
   */
  const handleCompress = async () => {
    if (!originalMedia) {
      Alert.alert('No Media', 'Please select an image or video first.');
      return;
    }

    setIsCompressing(true);
    setCompressedResult(null);

    try {
      // Get file size if not already available
      let fileSize = originalMedia.fileSize;
      if (!fileSize && originalMedia.uri && RNFS) {
        try {
          const fileInfo = await RNFS.stat(originalMedia.uri);
          fileSize = fileInfo.size;
        } catch (error) {
          console.warn('Could not get file size:', error);
        }
      }

      const mediaWithSize: MediaFile = {
        ...originalMedia,
        fileSize: fileSize || 0,
      };

      // Compress the media
      const result = await compressMedia(mediaWithSize, compressionLevel);

      // Get compressed file size
      if (RNFS) {
        try {
          const compressedFileInfo = await RNFS.stat(result.uri);
          result.fileSize = compressedFileInfo.size;
          result.compressionRatio = mediaWithSize.fileSize
            ? Math.round(
                ((mediaWithSize.fileSize - compressedFileInfo.size) /
                  mediaWithSize.fileSize) *
                  100,
              )
            : 0;
        } catch (error) {
          console.warn('Could not get compressed file size:', error);
        }
      }

      setCompressedResult(result);
    } catch (error) {
      console.error('Compression error:', error);
      Alert.alert(
        'Compression Failed',
        error instanceof Error
          ? error.message
          : 'An error occurred while compressing the media.',
      );
    } finally {
      setIsCompressing(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.background} />

      {/* Top Section: Upload and Controls (50% height) */}
      <View style={styles.topSection}>
        <View style={styles.uploadContainer}>
          <MediaPicker
            onMediaSelected={handleMediaSelected}
            isLoading={isLoadingMedia}
          />

          <CompressionSlider
            value={compressionLevel}
            onValueChange={setCompressionLevel}
            disabled={!originalMedia || isCompressing}
          />

          <CompressButton
            onPress={handleCompress}
            disabled={!originalMedia}
            isLoading={isCompressing}
          />
        </View>
      </View>

      {/* Bottom Section: Preview (50% height) */}
      <View style={styles.bottomSection}>
        <MediaPreview
          originalMedia={originalMedia}
          compressedResult={compressedResult}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  topSection: {
    flex: 1, // Takes 50% of available space
    backgroundColor: colors.background,
    paddingHorizontal: spacing.md,
    paddingTop: spacing.md,
    paddingBottom: spacing.sm,
  },
  uploadContainer: {
    flex: 1,
    justifyContent: 'flex-start',
  },
  bottomSection: {
    flex: 1, // Takes 50% of available space
    backgroundColor: colors.background,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
});

export default App;
