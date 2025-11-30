/**
 * CompressionSlider Component
 * Provides a slider to select compression level (1-10)
 * 1 = lowest compression (highest quality)
 * 10 = highest compression (lowest quality)
 * Higher number = Higher compression = Smaller file = Lower quality
 */

import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Slider from '@react-native-community/slider';
import {colors, spacing, borderRadius, typography} from '../styles/theme';

interface CompressionSliderProps {
  value: number;
  onValueChange: (value: number) => void;
  disabled?: boolean;
}

const CompressionSlider: React.FC<CompressionSliderProps> = ({
  value,
  onValueChange,
  disabled = false,
}) => {
  /**
   * Gets compression level label based on value
   * Provides user-friendly description of compression level
   * Higher number = Higher compression
   */
  const getCompressionLabel = (level: number): string => {
    if (level <= 3) return 'Low Compression';
    if (level <= 6) return 'Medium Compression';
    return 'High Compression';
  };

  /**
   * Gets quality percentage based on compression level
   * Level 1 = 100% quality (low compression), Level 10 = 10% quality (high compression)
   */
  const getQualityPercentage = (level: number): number => {
    return 110 - level * 10;
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.label}>Compression Level</Text>
        <Text style={styles.value}>{value}/10</Text>
      </View>

      <View style={styles.sliderContainer}>
        <View style={styles.labelContainer}>
          <Text style={styles.minLabel}>1</Text>
          <Text style={styles.labelHint}>Low</Text>
        </View>
        <Slider
          style={styles.slider}
          minimumValue={1}
          maximumValue={10}
          step={1}
          value={value}
          onValueChange={onValueChange}
          disabled={disabled}
          minimumTrackTintColor={colors.primary}
          maximumTrackTintColor={colors.border}
          thumbTintColor={colors.primary}
        />
        <View style={styles.labelContainer}>
          <Text style={styles.maxLabel}>10</Text>
          <Text style={styles.labelHint}>High</Text>
        </View>
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.infoText}>
          {getCompressionLabel(value)} • {getQualityPercentage(value)}% Quality
        </Text>
        <Text style={styles.hintText}>
          Lower = larger file, Higher quality | Higher = smaller file, Lower
          quality
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.surface,
    padding: spacing.md,
    borderRadius: borderRadius.lg,
    marginVertical: spacing.sm,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  label: {
    ...typography.h3,
    color: colors.text,
  },
  value: {
    ...typography.h3,
    color: colors.primary,
    fontWeight: '700',
  },
  sliderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: spacing.sm,
  },
  slider: {
    flex: 1,
    height: 40,
    marginHorizontal: spacing.sm,
  },
  labelContainer: {
    alignItems: 'center',
    minWidth: 40,
  },
  minLabel: {
    ...typography.bodySmall,
    color: colors.textSecondary,
    fontWeight: '600',
  },
  maxLabel: {
    ...typography.bodySmall,
    color: colors.textSecondary,
    fontWeight: '600',
  },
  labelHint: {
    ...typography.caption,
    color: colors.textLight,
    fontSize: 10,
    marginTop: 2,
  },
  infoContainer: {
    marginTop: spacing.sm,
  },
  infoText: {
    ...typography.bodySmall,
    color: colors.text,
    fontWeight: '600',
    marginBottom: spacing.xs,
  },
  hintText: {
    ...typography.caption,
    color: colors.textSecondary,
    lineHeight: 16,
  },
});

export default CompressionSlider;
