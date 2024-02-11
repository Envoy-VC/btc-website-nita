import { type NextRequest, NextResponse } from 'next/server';

import { clerkClient } from '@clerk/nextjs';
import { createUser } from '~/lib/supabase/user';

import type { Role, User } from '~/types';

export async function POST(req: NextRequest) {
  console.log(req);
  const body = (await req.json()) as unknown;

  const { role, data } = body as {
    role: Role;
    data: User;
  };

  try {
    const user_id = await createUser(data);
    await clerkClient.users.updateUserMetadata(user_id, {
      publicMetadata: {
        role,
      },
    });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ success: false });
  }
}
