export enum Role {
  USER = 0,
  VOLUNTEER,
  CLUB_MEMBER,
  CLUB_OWNER,
  OWNER,
}

export interface SideNavItem {
  name: string;
  href: string;
  Icon: IconType;
  regexp?: RegExp;
}

import { type MergeDeep } from 'type-fest';
import { type Database as DatabaseGenerated } from './database';
import type { IconType } from 'react-icons/lib';

export type Database = MergeDeep<
  DatabaseGenerated,
  {
    public: {
      Views: {
        users_view: {
          Row: {
            id: number;
          };
        };
      };
    };
  }
>;

export type Tables<T extends keyof Database['public']['Tables']> =
  Database['public']['Tables'][T]['Row'];
export type Enum = Database['public']['Enums'];

export type User = Tables<'users'>;
export type Club = Tables<'clubs'>;
export type Event = Tables<'events'>;
export type Form = Tables<'forms'>;
export type FormResponse = Tables<'form_responses'>;

/**
 * The BeforeInstallPromptEvent is fired at the Window.onbeforeinstallprompt handler
 * before a user is prompted to "install" a web site to a home screen on mobile.
 *
 */
export interface BeforeInstallPromptEvent extends Event {
  /**
   * Returns an array of DOMString items containing the platforms on which the event was dispatched.
   * This is provided for user agents that want to present a choice of versions to the user such as,
   * for example, "web" or "play" which would allow the user to chose between a web version or
   * an Android version.
   */
  readonly platforms: Array<string>;

  /**
   * Returns a Promise that resolves to a DOMString containing either "accepted" or "dismissed".
   */
  readonly userChoice: Promise<{
    outcome: 'accepted' | 'dismissed';
    platform: string;
  }>;

  /**
   * Allows a developer to show the install prompt at a time of their own choosing.
   * This method returns a Promise.
   */
  prompt(): Promise<void>;
}
