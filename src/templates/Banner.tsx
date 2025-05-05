import Link from 'next/link';

import { Button } from '../components/buttons/Button';
import { CTABanner } from '../components/cta/CTABanner';
import { Section } from '../components/layout/Section';

const Banner = () => (
  <Section>
    <CTABanner
      title=""
      subtitle=""
      button={
        <Link href="/">
          <Button>Get Started</Button>
        </Link>
      }
    />
  </Section>
);

export { Banner };
