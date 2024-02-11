export enum Role {
  OWNER = 0,
  CLUB_OWNER,
  USER,
}

import { type MergeDeep } from 'type-fest';
import { type Database as DatabaseGenerated } from './database';

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
