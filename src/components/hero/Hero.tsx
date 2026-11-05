import React from 'react';
import { Profile } from '@/types/profile';
import { HeroScrollytelling } from './HeroScrollytelling';

interface HeroProps {
  profile: Profile;
}

export const Hero: React.FC<HeroProps> = ({ profile }) => {
  return <HeroScrollytelling profile={profile} />;
};

export default Hero;
