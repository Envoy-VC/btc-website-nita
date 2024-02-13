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
