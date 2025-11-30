/**
 * MediaPreview Component
 * Displays original and compressed media side by side
 * Shows file sizes and compression statistics
 */

import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import Video from 'react-native-video';
import {
  colors,
  spacing,
  borderRadius,
  typography,
  shadows,
} from '../styles/theme';
import {MediaFile, CompressionResult} from '../types';
import {formatFileSize} from '../utils/fileUtils';
import {downloadCompressedMedia} from '../utils/downloadUtils';

interface MediaPreviewProps {
  originalMedia: MediaFile | null;
  compressedResult: CompressionResult | null;
}

const {width: SCREEN_WIDTH} = Dimensions.get('window');
const PREVIEW_WIDTH = SCREEN_WIDTH - spacing.lg * 2;

const MediaPreview: React.FC<MediaPreviewProps> = ({
  originalMedia,
  compressedResult,
}) => {
  const [isDownloading, setIsDownloading] = useState(false);

  /**
   * Handles download/save action for compressed media
   */
  const handleDownload = async () => {
    if (!compressedResult || !originalMedia) {
      return;
    }

    setIsDownloading(true);
    try {
      await downloadCompressedMedia(
        compressedResult.uri,
        originalMedia.type,
        () => {
          setIsDownloading(false);
        },
        () => {
          setIsDownloading(false);
        },
      );
    } catch (error) {
      setIsDownloading(false);
    }
  };
  /**
   * Renders image preview
   */
  const renderImage = (uri: string, label: string, fileSize?: number) => (
    <View style={styles.mediaContainer}>
      <View style={styles.mediaHeader}>
        <Text style={styles.mediaLabel}>{label}</Text>
        {fileSize !== undefined && (
          <Text style={styles.fileSize}>{formatFileSize(fileSize)}</Text>
        )}
      </View>
      <Image source={{uri}} style={styles.image} resizeMode="contain" />
    </View>
  );

  /**
   * Renders video preview
   */
  const renderVideo = (uri: string, label: string, fileSize?: number) => (
    <View style={styles.mediaContainer}>
      <View style={styles.mediaHeader}>
        <Text style={styles.mediaLabel}>{label}</Text>
        {fileSize !== undefined && (
          <Text style={styles.fileSize}>{formatFileSize(fileSize)}</Text>
        )}
      </View>
      <Video
        source={{uri}}
        style={styles.video}
        resizeMode="contain"
        controls
        paused
      />
    </View>
  );

  /**
   * Renders compression statistics
   */
  const renderStats = () => {
    if (!compressedResult || !originalMedia) {
      return null;
    }

    const {originalSize, fileSize, compressionRatio} = compressedResult;
    const sizeReduction = originalSize - fileSize;

    return (
      <View style={styles.statsContainer}>
        <View style={styles.statRow}>
          <Text style={styles.statLabel}>Original Size:</Text>
          <Text style={styles.statValue}>{formatFileSize(originalSize)}</Text>
        </View>
        <View style={styles.statRow}>
          <Text style={styles.statLabel}>Compressed Size:</Text>
          <Text style={styles.statValue}>{formatFileSize(fileSize)}</Text>
        </View>
        <View style={styles.statRow}>
          <Text style={styles.statLabel}>Size Reduction:</Text>
          <Text style={[styles.statValue, styles.successText]}>
            {formatFileSize(sizeReduction)} ({compressionRatio}%)
          </Text>
        </View>
      </View>
    );
  };

  if (!originalMedia && !compressedResult) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>No media selected</Text>
        <Text style={styles.emptySubtext}>
          Select an image or video to see preview
        </Text>
      </View>
    );
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}>
      {originalMedia && (
        <>
          {originalMedia.type === 'image'
            ? renderImage(originalMedia.uri, 'Original', originalMedia.fileSize)
            : renderVideo(
                originalMedia.uri,
                'Original',
                originalMedia.fileSize,
              )}
        </>
      )}

      {compressedResult && originalMedia && (
        <>
          {originalMedia.type === 'image'
            ? renderImage(
                compressedResult.uri,
                'Compressed',
                compressedResult.fileSize,
              )
            : renderVideo(
                compressedResult.uri,
                'Compressed',
                compressedResult.fileSize,
              )}
        </>
      )}

      {renderStats()}

      {compressedResult && originalMedia && (
        <TouchableOpacity
          style={styles.downloadButton}
          onPress={handleDownload}
          disabled={isDownloading}
          activeOpacity={0.8}>
          {isDownloading ? (
            <ActivityIndicator color={colors.textOnPrimary} />
          ) : (
            <>
              <Text style={styles.downloadIcon}>💾</Text>
              <Text style={styles.downloadText}>Download Compressed Media</Text>
            </>
          )}
        </TouchableOpacity>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  contentContainer: {
    padding: spacing.md,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.xl,
  },
  emptyText: {
    ...typography.h3,
    color: colors.textSecondary,
    marginBottom: spacing.sm,
  },
  emptySubtext: {
    ...typography.bodySmall,
    color: colors.textLight,
    textAlign: 'center',
  },
  mediaContainer: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    marginBottom: spacing.md,
    padding: spacing.md,
    ...shadows.sm,
  },
  mediaHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  mediaLabel: {
    ...typography.h3,
    color: colors.text,
  },
  fileSize: {
    ...typography.bodySmall,
    color: colors.textSecondary,
    fontWeight: '600',
  },
  image: {
    width: PREVIEW_WIDTH - spacing.md * 2,
    height: 300,
    borderRadius: borderRadius.md,
    backgroundColor: colors.border,
  },
  video: {
    width: PREVIEW_WIDTH - spacing.md * 2,
    height: 300,
    borderRadius: borderRadius.md,
    backgroundColor: colors.border,
  },
  statsContainer: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    ...shadows.sm,
  },
  statRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  statLabel: {
    ...typography.body,
    color: colors.textSecondary,
  },
  statValue: {
    ...typography.body,
    color: colors.text,
    fontWeight: '600',
  },
  successText: {
    color: colors.success,
  },
  downloadButton: {
    backgroundColor: colors.primary,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    borderRadius: borderRadius.lg,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: spacing.md,
    ...shadows.md,
  },
  downloadIcon: {
    fontSize: 20,
    marginRight: spacing.sm,
  },
  downloadText: {
    ...typography.button,
    color: colors.textOnPrimary,
  },
});

export default MediaPreview;
