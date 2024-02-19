import React from 'react';
import { headers } from 'next/headers';
import { notFound } from 'next/navigation';

import { getApprovedEventDetails } from '~/lib/supabase/events';

import { EventDetails } from '../components';

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
  const event = await getApprovedEventDetails(params.id);

  if (!event) {
    const parentMetadata = await parent;
    return parentMetadata as Metadata;
  }

  const metadata: Metadata = {
    title: event.event_name,
    description:
      event.description.length > 160
        ? event.description.slice(0, 160) + '...'
        : event.description,

    twitter: {
      card: 'summary_large_image',
      title: event.event_name,
      description:
        event.description.length > 160
          ? event.description.slice(0, 160) + '...'
          : event.description,
      creator: '@Envoy_1084',
      images: [
        {
          url:
            getImageLink(event.event_image) ??
            `/api/og?title=${event.event_name}`,
          width: 1200,
          height: 630,
        },
      ],
    },
    openGraph: {
      title: event.event_name,
      description:
        event.description.length > 160
          ? event.description.slice(0, 160) + '...'
          : event.description,
      type: 'website',
      locale: 'en_US',
      url: `https://btc.gymkhananita.com/events/${event.event_id}`,
      images: [
        {
          url:
            getImageLink(event.event_image) ??
            `/api/og?title=${event.event_name}`,
          width: 1200,
          height: 630,
        },
      ],
    },
  };

  return metadata;
}

const EventPage = async () => {
  const headersList = headers();
  const path = headersList.get('x-pathname');
  const event_id = (path ?? '').split('/').pop() ?? '';

  const event = await getApprovedEventDetails(event_id);

  if (event) {
    return (
      <div>
        <EventDetails event={event} />
      </div>
    );
  } else {
    return notFound();
  }
};

export default EventPage;
