export interface QuakeData {
  id: number;
  lat: number;
  long: number;
  magnitude?: number;
  depth?: number;
  date?: string;
  planet: string;
}

export interface PlanetConfig {
  name: string;
  radius: number;
  texturePath: string;
  atmosphere?: boolean;
  gravity?: number;
  temperature?: number;
}

export interface PlanetFilters {
  planet: string;
  startDate?: Date;
  endDate?: Date;
  minMagnitude?: number;
  maxMagnitude?: number;
  minDepth?: number;
  maxDepth?: number;
}

export interface ApiResponse<T> {
  data: T[];
  success: boolean;
  message?: string;
  total?: number;
  page?: number;
  limit?: number;
} 