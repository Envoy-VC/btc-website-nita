/* eslint-disable @next/next/no-img-element */
import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export async function GET(request: Request) {
  try {
    const semibold = await fetch(
      new URL('./Geist-SemiBold.otf', import.meta.url)
    ).then((res) => res.arrayBuffer());

    const btcLogo = await fetch(
      new URL('./btc-logo.png', import.meta.url)
    ).then((res) => res.arrayBuffer());

    const { searchParams } = new URL(request.url);
    const hasTitle = searchParams.has('title');
    const title = hasTitle ? searchParams.get('title')!.slice(0, 100) : null;

    return new ImageResponse(
      (
        <div tw='h-full w-full flex flex-col bg-white'>
          {!title && (
            <div
              tw='flex flex-col w-full h-full justify-center items-center'
              style={{ gap: '2rem' }}
            >
              <img
                src={btcLogo as unknown as string}
                alt='logo'
                tw='w-36 h-36'
              />
              <div
                tw='text-5xl font-bold max-w-3xl text-center'
                style={{
                  fontFamily: 'Geist SemiBold',
                }}
              >
                Board of Technical Community, Gymkhana Technical
              </div>
            </div>
          )}
          {title && (
            <div
              tw='w-full h-full p-16 flex flex-col justify-between items-center'
              style={{ gap: '2rem' }}
            >
              <div tw='text-transparent'>a</div>
              <div
                tw='text-7xl font-bold max-w-3xl text-center'
                style={{
                  fontFamily: 'Geist SemiBold',
                  fontWeight: 800,
                }}
              >
                {title}
              </div>
              <div
                tw='w-full justify-start flex flex-row items-center'
                style={{
                  gap: '0.5rem',
                }}
              >
                <img
                  src={btcLogo as unknown as string}
                  alt='logo'
                  tw='w-14 h-14'
                />
                <div tw='flex flex-col'>
                  <div
                    tw='text-2xl font-bold text-neutral-900'
                    style={{
                      fontFamily: 'Geist SemiBold',
                    }}
                  >
                    Board of Technical Community,
                  </div>{' '}
                  <div
                    tw='text-xl font-bold text-neutral-600'
                    style={{
                      fontFamily: 'Geist SemiBold',
                    }}
                  >
                    Gymkhana Technical
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      ),
      {
        width: 1200,
        height: 630,
        fonts: [
          {
            name: 'Geist SemiBold',
            data: semibold,
          },
        ],
      }
    );
  } catch (error) {
    console.error(error);
    return new Response('Something went wrong!', { status: 500 });
  }
}
