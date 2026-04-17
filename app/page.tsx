'use client';

import { Nav } from '@/components/Nav';
import { Hero } from '@/components/Hero';
import { PassengerBenefits } from '@/components/PassengerBenefits';
import { ValueProps } from '@/components/ValueProps';
import { HowItWorks } from '@/components/HowItWorks';
import { FAQ } from '@/components/FAQ';
import { SignupForm } from '@/components/SignupForm';
import { SlideDeck, Slide } from '@/components/SlideDeck';

const SLIDE_IDS = [
  'top',
  'passagers',
  'avantages',
  'comment',
  'faq',
  'inscription',
] as const;

export default function HomePage() {
  return (
    <>
      <Nav />
      <SlideDeck slideIds={[...SLIDE_IDS]}>
        <Slide id="top">
          <Hero />
        </Slide>
        <Slide id="passagers">
          <PassengerBenefits />
        </Slide>
        <Slide id="avantages">
          <ValueProps />
        </Slide>
        <Slide id="comment">
          <HowItWorks />
        </Slide>
        <Slide id="faq">
          <FAQ />
        </Slide>
        <Slide id="inscription">
          <SignupForm />
        </Slide>
      </SlideDeck>
    </>
  );
}
