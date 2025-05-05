import Link from 'next/link';

import { Background } from '../components/background/Background';
import { CenteredFooter } from '../components/footer/CenteredFooter';
import { Section } from '../components/layout/Section';
import { Logo } from './Logo';

const Footer = () => (
  <Background color="bg-gray-100">
    <Section>
      <CenteredFooter
        logo={<Logo />}
        iconList={
          <>
            {/* Social icons can be added here if needed */}
          </>
        }
      >
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href="/">About</Link>
        </li>
        <li>
          <Link href="/">Docs</Link>
        </li>
      </CenteredFooter>
    </Section>
  </Background>
);

export { Footer };
