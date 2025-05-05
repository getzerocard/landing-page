import { VerticalFeatureRow } from '../components/feature/VerticalFeatureRow';
import { Section } from '../components/layout/Section';

const VerticalFeatures = () => (
  <Section
    title=""
    description=""
  >
    <VerticalFeatureRow
      title=""
      description=""
      image="/assets/images/feature.svg"
      imageAlt="Feature"
    />
    <VerticalFeatureRow
      title=""
      description=""
      image="/assets/images/feature2.svg"
      imageAlt="Feature"
      reverse
    />
    <VerticalFeatureRow
      title=""
      description=""
      image="/assets/images/feature3.svg"
      imageAlt="Feature"
    />
  </Section>
);

export { VerticalFeatures };
