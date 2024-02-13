/* eslint-disable @typescript-eslint/no-redundant-type-constituents */
export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  public: {
    Tables: {
      clubs: {
        Row: {
          banner_image_url: string;
          category: string;
          club_id: string;
          club_name: string;
          cover_photo_url: string;
          description: string;
          email: string;
          founding_year: number;
          is_public: boolean;
          logo_url: string;
          members: string[];
          owner_id: string;
          social_media_links: Json;
          website: string;
        };
        Insert: {
          banner_image_url?: string;
          category?: string;
          club_id: string;
          club_name?: string;
          cover_photo_url?: string;
          description?: string;
          email?: string;
          founding_year?: number;
          is_public?: boolean;
          logo_url?: string;
          members?: string[];
          owner_id?: string;
          social_media_links?: Json;
          website?: string;
        };
        Update: {
          banner_image_url?: string;
          category?: string;
          club_id?: string;
          club_name?: string;
          cover_photo_url?: string;
          description?: string;
          email?: string;
          founding_year?: number;
          is_public?: boolean;
          logo_url?: string;
          members?: string[];
          owner_id?: string;
          social_media_links?: Json;
          website?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'clubs_owner_id_fkey';
            columns: ['owner_id'];
            isOneToOne: true;
            referencedRelation: 'users';
            referencedColumns: ['id'];
          },
        ];
      };
      users: {
        Row: {
          branch: string;
          college_name: string;
          communication_emails: boolean;
          created_at: string;
          dietary_preferences: string;
          email_id: string;
          event_emails: boolean;
          expected_graduation: string;
          gender: string;
          id: string;
          marketing_emails: boolean;
          name: string;
          phone_number: string;
          social_emails: boolean;
          tshirt_size: string;
          updated_at: string;
        };
        Insert: {
          branch: string;
          college_name: string;
          communication_emails?: boolean;
          created_at?: string;
          dietary_preferences: string;
          email_id: string;
          event_emails?: boolean;
          expected_graduation: string;
          gender: string;
          id: string;
          marketing_emails?: boolean;
          name: string;
          phone_number: string;
          social_emails?: boolean;
          tshirt_size: string;
          updated_at?: string;
        };
        Update: {
          branch?: string;
          college_name?: string;
          communication_emails?: boolean;
          created_at?: string;
          dietary_preferences?: string;
          email_id?: string;
          event_emails?: boolean;
          expected_graduation?: string;
          gender?: string;
          id?: string;
          marketing_emails?: boolean;
          name?: string;
          phone_number?: string;
          social_emails?: boolean;
          tshirt_size?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      requesting_user_id: {
        Args: Record<PropertyKey, never>;
        Returns: string;
      };
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (Database['public']['Tables'] & Database['public']['Views'])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions['schema']]['Tables'] &
        Database[PublicTableNameOrOptions['schema']]['Views'])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions['schema']]['Tables'] &
      Database[PublicTableNameOrOptions['schema']]['Views'])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (Database['public']['Tables'] &
        Database['public']['Views'])
    ? (Database['public']['Tables'] &
        Database['public']['Views'])[PublicTableNameOrOptions] extends {
        Row: infer R;
      }
      ? R
      : never
    : never;

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof Database['public']['Tables']
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof Database['public']['Tables']
    ? Database['public']['Tables'][PublicTableNameOrOptions] extends {
        Insert: infer I;
      }
      ? I
      : never
    : never;

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof Database['public']['Tables']
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof Database['public']['Tables']
    ? Database['public']['Tables'][PublicTableNameOrOptions] extends {
        Update: infer U;
      }
      ? U
      : never
    : never;

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof Database['public']['Enums']
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions['schema']]['Enums']
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions['schema']]['Enums'][EnumName]
  : PublicEnumNameOrOptions extends keyof Database['public']['Enums']
    ? Database['public']['Enums'][PublicEnumNameOrOptions]
    : never;
