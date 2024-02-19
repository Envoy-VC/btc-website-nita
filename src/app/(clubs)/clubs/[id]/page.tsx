import React from 'react';
import { notFound } from 'next/navigation';

import { headers } from 'next/headers';

import { ClubDetails } from '../../components';

import { getActiveClubById } from '~/lib/supabase/clubs';

import type { Metadata, ResolvingMetadata } from 'next';
import { getImageLink } from '~/lib/utils';

type Props = {
  params: { id: string };
  searchParams: Record<string, string | string[] | undefined>;
};

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const club = await getActiveClubById(params.id);

  if (!club) {
    const parentMetadata = await parent;
    return parentMetadata as Metadata;
  }

  const metadata: Metadata = {
    title: club.club_name,
    description:
      club.description.length > 160
        ? club.description.slice(0, 160) + '...'
        : club.description,
    icons: [
      {
        rel: 'icon',
        url: getImageLink(club.logo_url) ?? '/icon.png',
      },
    ],
    twitter: {
      card: 'summary_large_image',
      title: club.club_name,
      description:
        club.description.length > 160
          ? club.description.slice(0, 160) + '...'
          : club.description,
      creator: '@Envoy_1084',

      images: [
        {
          url:
            getImageLink(club.cover_photo_url) ??
            `/api/og?title=${club.club_name}`,
          width: 1200,
          height: 630,
        },
      ],
    },
    openGraph: {
      title: club.club_name,
      description:
        club.description.length > 160
          ? club.description.slice(0, 160) + '...'
          : club.description,
      type: 'website',
      locale: 'en_US',
      url: `https://btc.gymkhananita.com/clubs/${club.club_id}`,
      images: [
        {
          url:
            getImageLink(club.cover_photo_url) ??
            `/api/og?title=${club.club_name}`,
          width: 1200,
          height: 630,
        },
      ],
    },
  };

  return metadata;
}

const ClubPage = async () => {
  const headersList = headers();
  const path = headersList.get('x-pathname');
  const clubId = (path ?? '').split('/').pop() ?? '';
  const club = await getActiveClubById(clubId);
  if (club) {
    return (
      <div>
        <ClubDetails club={club} />
      </div>
    );
  } else {
    return notFound();
  }
};

export default ClubPage;
