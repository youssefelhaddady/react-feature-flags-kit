import { FeatureFlags, FeatureFlagsGroup } from '../types';

export const useFeature = (features: FeatureFlags, name: string): boolean => {
  if (!features) return false;

  const isFeatureActive = (feature: FeatureFlagsGroup): boolean => {
    return feature.isActive && feature.name === name;
  };

  const isActive = (
    featureFlags: FeatureFlags | FeatureFlagsGroup
  ): boolean => {
    if (Array.isArray(featureFlags)) {
      return featureFlags.some(ff => isActive(ff));
    } else {
      if (!featureFlags.isActive) return false;
      if (featureFlags.subFeatureFlags)
        return isActive(featureFlags.subFeatureFlags);
    }

    return isFeatureActive(featureFlags);
  };

  return isActive(features);
};
