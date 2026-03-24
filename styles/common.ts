import { StyleSheet } from 'react-native';
import { AppTheme } from '@/constants/theme';

export const commonStyles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: AppTheme.colors.page,
    paddingTop: AppTheme.spacing.pageTop,
    paddingHorizontal: AppTheme.spacing.pageHorizontal,
    paddingBottom: AppTheme.spacing.tabBottom,
  },
  scrollPage: {
    flex: 1,
    backgroundColor: AppTheme.colors.page,
  },
  scrollContent: {
    flexGrow: 1,
    paddingTop: AppTheme.spacing.pageTop,
    paddingHorizontal: AppTheme.spacing.pageHorizontal,
    paddingBottom: AppTheme.spacing.tabBottom,
  },
  card: {
    backgroundColor: AppTheme.colors.surface,
    borderRadius: AppTheme.radii.card,
    padding: AppTheme.spacing.card,
    borderWidth: 1,
    borderColor: AppTheme.colors.border,
  },
  cardCompact: {
    backgroundColor: AppTheme.colors.surface,
    borderRadius: AppTheme.radii.cardMd,
    padding: AppTheme.spacing.cardCompact,
    borderWidth: 1,
    borderColor: AppTheme.colors.border,
  },
  rowBetween: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  rowCenter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sectionStack: {
    gap: AppTheme.spacing.section,
  },
  eyebrow: {
    fontSize: AppTheme.typography.eyebrow,
    color: AppTheme.colors.textMuted,
    fontFamily: AppTheme.fonts.medium,
  },
  sectionTitle: {
    fontSize: AppTheme.typography.titleMd,
    fontFamily: AppTheme.fonts.bold,
    color: AppTheme.colors.text,
  },
  titleXl: {
    fontSize: AppTheme.typography.titleXl,
    fontFamily: AppTheme.fonts.bold,
    color: AppTheme.colors.text,
  },
  titleLg: {
    fontSize: AppTheme.typography.titleLg,
    fontFamily: AppTheme.fonts.bold,
    color: AppTheme.colors.text,
  },
  primaryButton: {
    backgroundColor: AppTheme.colors.primary,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 12,
  },
  primaryButtonText: {
    color: AppTheme.colors.white,
    fontFamily: AppTheme.fonts.bold,
  },
  secondaryButton: {
    backgroundColor: AppTheme.colors.primarySoftAlt,
    borderWidth: 1,
    borderColor: AppTheme.colors.primarySoftAlt,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 12,
  },
});
