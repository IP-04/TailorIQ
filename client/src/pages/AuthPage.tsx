import React from 'react';
import GuestAuth from '@/components/GuestAuth';

interface AuthPageProps {
  darkMode: boolean;
}

export default function AuthPage({ darkMode }: AuthPageProps) {
  return <GuestAuth darkMode={darkMode} />;
}