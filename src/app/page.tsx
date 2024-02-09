import { SignOutButton } from '@clerk/nextjs';
import Link from 'next/link';

export default function HomePage() {
  return (
    <div>
      <SignOutButton>SignOut</SignOutButton>
    </div>
  );
}
