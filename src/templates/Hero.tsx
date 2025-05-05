import Link from 'next/link';

import { Background } from '../components/background/Background';
import { Button } from '../components/buttons/Button';
import { HeroOneButton } from '../components/hero/HeroOneButton';
import { Section } from '../components/layout/Section';
import { NavbarTwoColumns } from '../components/navigation/NavbarTwoColumns';
import { Logo } from './Logo';

const Hero = () => (
  <Background color="bg-gray-100">
    <Section yPadding="py-6">
      <NavbarTwoColumns logo={<Logo xl />}>
        <li>
          <Link href="/">GitHub</Link>
        </li>
        <li>
          <Link href="/">Sign in</Link>
        </li>
      </NavbarTwoColumns>
    </Section>

    <Section yPadding="pt-20 pb-32">
      <HeroOneButton
        title={
          <>
            {''}
            <span className="text-primary-500"></span>
          </>
        }
        description=""
        button={
          <Link href="/">
            <Button className="text-base px-6 py-4">Get Started</Button>
          </Link>
        }
      />
    </Section>
  </Background>
);

export { Hero };
