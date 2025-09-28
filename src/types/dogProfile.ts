export interface DogProfile {
  id: string;
  created_at: string;
  user_id: string;
  name: string;
  size: string;
  weight: number;
  breed: string;
  disease: string;
  gender: string;
  age: number;
}

export type DogProfileCreate = Omit<DogProfile, 'id' | 'created_at'>;
