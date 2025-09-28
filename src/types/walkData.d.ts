export interface WalkData {
  coordinates: { lat: number; lng: number }[];
  user_id: string;
  id: string;
  dog_id: string;
  name: string;
  distance: number;
  walk_time: number;
  created_at: string;
}
