import React from 'react';
import { useFeature } from '../hooks';
import { FeatureFlagsContext } from '../providers';
import { FeatureFlags } from '../types';

interface FeatureProps {
  flag: string;
  children?: React.ReactNode;
  renderOn?: React.ReactNode;
  renderOff?: React.ReactNode;
}

const Feature: React.FC<FeatureProps> = ({
  flag,
  children,
  renderOn = children,
  renderOff,
}) => (
  <FeatureFlagsContext.Consumer>
    {features => (
      <RenderFeature
        features={features}
        flag={flag}
        children={children}
        renderOn={renderOn}
        renderOff={renderOff}
      />
    )}
  </FeatureFlagsContext.Consumer>
);

interface RenderFeatureProps extends FeatureProps {
  features: FeatureFlags;
}

const RenderFeature: React.FC<RenderFeatureProps> = ({
  features,
  flag,
  renderOn,
  renderOff,
}) => {
  const hasFeature = useFeature(features, flag);
  if (!hasFeature) {
    if (!renderOff) return null;
    return <React.Fragment>{renderOff}</React.Fragment>;
  }
  return <React.Fragment>{renderOn}</React.Fragment>;
};

export default Feature;
