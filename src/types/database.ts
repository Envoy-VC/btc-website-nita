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
      events: {
        Row: {
          club_id: string;
          created_at: string;
          description: string;
          end_datetime: string;
          event_id: string;
          event_image: string;
          event_name: string;
          feedback_form: string;
          is_approved: boolean;
          is_featured: boolean;
          is_public: boolean;
          owner_id: string | null;
          registration_end_at: string;
          registration_form: string;
          registration_start_at: string;
          rules: string;
          start_datetime: string;
          updated_at: string;
          venue: string;
        };
        Insert: {
          club_id: string;
          created_at?: string;
          description?: string;
          end_datetime?: string;
          event_id?: string;
          event_image?: string;
          event_name?: string;
          feedback_form?: string;
          is_approved?: boolean;
          is_featured?: boolean;
          is_public?: boolean;
          owner_id?: string | null;
          registration_end_at?: string;
          registration_form?: string;
          registration_start_at?: string;
          rules?: string;
          start_datetime?: string;
          updated_at?: string;
          venue?: string;
        };
        Update: {
          club_id?: string;
          created_at?: string;
          description?: string;
          end_datetime?: string;
          event_id?: string;
          event_image?: string;
          event_name?: string;
          feedback_form?: string;
          is_approved?: boolean;
          is_featured?: boolean;
          is_public?: boolean;
          owner_id?: string | null;
          registration_end_at?: string;
          registration_form?: string;
          registration_start_at?: string;
          rules?: string;
          start_datetime?: string;
          updated_at?: string;
          venue?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'public_events_club_id_fkey';
            columns: ['club_id'];
            isOneToOne: false;
            referencedRelation: 'clubs';
            referencedColumns: ['club_id'];
          },
          {
            foreignKeyName: 'public_events_owner_id_fkey';
            columns: ['owner_id'];
            isOneToOne: false;
            referencedRelation: 'users';
            referencedColumns: ['id'];
          },
        ];
      };
      form_responses: {
        Row: {
          created_at: string;
          form_data: Json;
          form_id: string;
          response_id: string;
          updated_at: string;
          user_details: Json;
          user_id: string;
        };
        Insert: {
          created_at?: string;
          form_data: Json;
          form_id?: string;
          response_id?: string;
          updated_at?: string;
          user_details: Json;
          user_id: string;
        };
        Update: {
          created_at?: string;
          form_data?: Json;
          form_id?: string;
          response_id?: string;
          updated_at?: string;
          user_details?: Json;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'public_form_responses_form_id_fkey';
            columns: ['form_id'];
            isOneToOne: false;
            referencedRelation: 'forms';
            referencedColumns: ['form_id'];
          },
          {
            foreignKeyName: 'public_form_responses_user_id_fkey';
            columns: ['user_id'];
            isOneToOne: false;
            referencedRelation: 'users';
            referencedColumns: ['id'];
          },
        ];
      };
      forms: {
        Row: {
          club_id: string;
          created_at: string | null;
          description: string;
          end_datetime: string;
          form_id: string;
          is_public: boolean;
          owner_id: string;
          questions: Json;
          start_datetime: string;
          title: string;
          type: string;
          updated_at: string | null;
        };
        Insert: {
          club_id: string;
          created_at?: string | null;
          description?: string;
          end_datetime?: string;
          form_id?: string;
          is_public?: boolean;
          owner_id: string;
          questions?: Json;
          start_datetime?: string;
          title?: string;
          type?: string;
          updated_at?: string | null;
        };
        Update: {
          club_id?: string;
          created_at?: string | null;
          description?: string;
          end_datetime?: string;
          form_id?: string;
          is_public?: boolean;
          owner_id?: string;
          questions?: Json;
          start_datetime?: string;
          title?: string;
          type?: string;
          updated_at?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'public_forms_club_id_fkey';
            columns: ['club_id'];
            isOneToOne: false;
            referencedRelation: 'clubs';
            referencedColumns: ['club_id'];
          },
          {
            foreignKeyName: 'public_forms_owner_id_fkey';
            columns: ['owner_id'];
            isOneToOne: false;
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
