export interface Database {
  public: {
    Tables: {
      projects: {
        Row: {
          id: string;
          title: string;
          description: string;
          status: 'ongoing' | 'completed';
          location: string;
          client: string;
          year: number | null;
          area: string;
          hero_image: string;
          hero_video: string;
          featured: boolean;
          display_order: number;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database['public']['Tables']['projects']['Row'], 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Database['public']['Tables']['projects']['Insert']>;
      };
      project_media: {
        Row: {
          id: string;
          project_id: string;
          media_type: 'image' | 'video';
          url: string;
          caption: string;
          display_order: number;
          created_at: string;
        };
        Insert: Omit<Database['public']['Tables']['project_media']['Row'], 'id' | 'created_at'>;
        Update: Partial<Database['public']['Tables']['project_media']['Insert']>;
      };
      team_members: {
        Row: {
          id: string;
          name: string;
          position: string;
          bio: string;
          image_url: string;
          display_order: number;
          created_at: string;
        };
        Insert: Omit<Database['public']['Tables']['team_members']['Row'], 'id' | 'created_at'>;
        Update: Partial<Database['public']['Tables']['team_members']['Insert']>;
      };
      company_info: {
        Row: {
          id: string;
          section: 'vision' | 'mission' | 'values' | 'story';
          content: string;
          updated_at: string;
        };
        Insert: Omit<Database['public']['Tables']['company_info']['Row'], 'id' | 'updated_at'>;
        Update: Partial<Database['public']['Tables']['company_info']['Insert']>;
      };
    };
  };
}

export type Project = Database['public']['Tables']['projects']['Row'];
export type ProjectMedia = Database['public']['Tables']['project_media']['Row'];
export type TeamMember = Database['public']['Tables']['team_members']['Row'];
export type CompanyInfo = Database['public']['Tables']['company_info']['Row'];
