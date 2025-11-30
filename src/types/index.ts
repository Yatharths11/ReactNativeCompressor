/**
 * Type definitions for the media compression app
 */

export type MediaType = 'image' | 'video' | null;

export interface MediaFile {
  uri: string;
  type: MediaType;
  fileName?: string;
  fileSize?: number;
}

export interface CompressionResult {
  uri: string;
  fileSize: number;
  originalSize: number;
  compressionRatio: number;
}

export interface CompressionLevel {
  value: number; // 1-10, where 1 = highest compression, 10 = lowest compression
}
