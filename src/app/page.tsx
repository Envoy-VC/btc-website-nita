import { SignOutButton } from '@clerk/nextjs';
import { currentUser } from '@clerk/nextjs';

export default async function HomePage() {
  const user = await currentUser();
  return (
    <div>
      {JSON.stringify(user, null, 2)}
      <SignOutButton>SignOut</SignOutButton>
    </div>
  );
}
