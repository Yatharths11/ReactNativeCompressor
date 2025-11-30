/**
 * Compression utility functions
 * Handles compression logic for images and videos
 */

import {Image, Video} from 'react-native-compressor';
import {MediaFile, CompressionResult} from '../types';

/**
 * Converts compression level (1-10) to quality percentage
 * 1 = lowest compression (highest quality) = 100%
 * 10 = highest compression (lowest quality) = 10%
 * Higher number = Higher compression = Lower quality
 * @param level - Compression level from 1 to 10
 * @returns Quality percentage (10-100)
 */
export const compressionLevelToQuality = (level: number): number => {
  // Clamp level between 1 and 10
  const clampedLevel = Math.max(1, Math.min(10, level));
  // Convert to percentage: level 1 = 100% quality (low compression), level 10 = 10% quality (high compression)
  // Formula: 110 - (level * 10)
  return 110 - clampedLevel * 10;
};

/**
 * Compresses an image file
 * @param uri - Image file URI
 * @param compressionLevel - Compression level (1-10)
 * @returns Promise resolving to compressed image URI
 */
export const compressImage = async (
  uri: string,
  compressionLevel: number,
): Promise<string> => {
  try {
    const quality = compressionLevelToQuality(compressionLevel);

    // react-native-compressor uses quality from 0-1, so divide by 100
    const compressedUri = await Image.compress(uri, {
      compressionMethod: 'auto',
      quality: quality / 100,
      maxWidth: 1920,
      maxHeight: 1920,
    });

    return compressedUri;
  } catch (error) {
    console.error('Image compression error:', error);
    throw new Error('Failed to compress image');
  }
};

/**
 * Compresses a video file
 * @param uri - Video file URI
 * @param compressionLevel - Compression level (1-10)
 * @returns Promise resolving to compressed video URI
 */
export const compressVideo = async (
  uri: string,
  compressionLevel: number,
): Promise<string> => {
  try {
    // For video, compression level affects bitrate
    // Level 1 = very low bitrate, Level 10 = high bitrate
    const quality = compressionLevelToQuality(compressionLevel);

    // react-native-compressor video compression
    // For video, we use bitrate instead of quality
    // Convert quality (10-100) to a reasonable bitrate range
    // Higher quality = higher bitrate
    const baseBitrate = 1000000; // 1 Mbps base
    const bitrate = Math.round(baseBitrate * (quality / 100));

    const compressedUri = await Video.compress(
      uri,
      {
        compressionMethod: 'auto',
        bitrate: bitrate,
        minimumFileSizeForCompress: 0,
      },
      progress => {
        // Progress callback - can be used for UI updates
        console.log('Compression progress:', progress);
      },
    );

    return compressedUri;
  } catch (error) {
    console.error('Video compression error:', error);
    throw new Error('Failed to compress video');
  }
};

/**
 * Main compression function that handles both images and videos
 * @param mediaFile - Media file to compress
 * @param compressionLevel - Compression level (1-10)
 * @returns Promise resolving to compression result with file sizes
 */
export const compressMedia = async (
  mediaFile: MediaFile,
  compressionLevel: number,
): Promise<CompressionResult> => {
  const {uri, type, fileSize: originalSize} = mediaFile;

  if (!type) {
    throw new Error('Unknown media type');
  }

  let compressedUri: string;

  if (type === 'image') {
    compressedUri = await compressImage(uri, compressionLevel);
  } else if (type === 'video') {
    compressedUri = await compressVideo(uri, compressionLevel);
  } else {
    throw new Error('Unsupported media type');
  }

  // File size calculation is handled in App.tsx using react-native-fs
  // This function returns the compressed URI, and file size is calculated separately
  return {
    uri: compressedUri,
    fileSize: 0, // Will be calculated in App.tsx using react-native-fs
    originalSize: originalSize || 0,
    compressionRatio: 0, // Will be calculated after file size is determined
  };
};
