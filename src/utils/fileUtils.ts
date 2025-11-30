/**
 * Utility functions for file operations and formatting
 */

import {MediaFile} from '../types';

/**
 * Formats file size in bytes to human-readable format
 * @param bytes - File size in bytes
 * @returns Formatted string (e.g., "1.5 MB")
 */
export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) {
    return '0 Bytes';
  }

  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
};

/**
 * Calculates compression ratio as a percentage
 * @param originalSize - Original file size in bytes
 * @param compressedSize - Compressed file size in bytes
 * @returns Compression ratio percentage
 */
export const calculateCompressionRatio = (
  originalSize: number,
  compressedSize: number,
): number => {
  if (originalSize === 0) {
    return 0;
  }
  return Math.round(((originalSize - compressedSize) / originalSize) * 100);
};

/**
 * Gets file extension from URI
 * @param uri - File URI
 * @returns File extension (e.g., "jpg", "mp4")
 */
export const getFileExtension = (uri: string): string => {
  const parts = uri.split('.');
  return parts[parts.length - 1].toLowerCase();
};

/**
 * Determines media type from file extension or MIME type
 * @param uri - File URI
 * @param mimeType - Optional MIME type
 * @returns Media type ('image' | 'video' | null)
 */
export const getMediaType = (
  uri: string,
  mimeType?: string,
): 'image' | 'video' | null => {
  if (mimeType) {
    if (mimeType.startsWith('image/')) {
      return 'image';
    }
    if (mimeType.startsWith('video/')) {
      return 'video';
    }
  }

  const extension = getFileExtension(uri);
  const imageExtensions = ['jpg', 'jpeg', 'png', 'gif', 'webp', 'heic'];
  const videoExtensions = ['mp4', 'mov', 'avi', 'mkv', 'webm', 'm4v'];

  if (imageExtensions.includes(extension)) {
    return 'image';
  }
  if (videoExtensions.includes(extension)) {
    return 'video';
  }

  return null;
};
