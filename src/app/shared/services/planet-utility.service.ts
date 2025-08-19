import { Injectable } from '@angular/core';
import { QuakeData } from '../interfaces/planet.interface';
import { PLANET_CONFIGS } from '../constants/planet.constants';

@Injectable({
  providedIn: 'root'
})
export class PlanetUtilityService {

  /**
   * Convert latitude and longitude to 3D spherical coordinates
   */
  latLongToSpherical(lat: number, long: number, radius: number): { x: number, y: number, z: number } {
    const phi = (90 - lat) * (Math.PI / 180);
    const theta = (long + 180) * (Math.PI / 180);

    const x = radius * Math.sin(phi) * Math.cos(theta);
    const y = radius * Math.cos(phi);
    const z = radius * Math.sin(phi) * Math.sin(theta);

    return { x, y, z };
  }

  /**
   * Calculate distance between two points on a sphere
   */
  calculateDistance(lat1: number, long1: number, lat2: number, long2: number, radius: number): number {
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLong = (long2 - long1) * (Math.PI / 180);
    
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
               Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
               Math.sin(dLong / 2) * Math.sin(dLong / 2);
    
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    
    return radius * c;
  }

  /**
   * Get planet configuration by name
   */
  getPlanetConfig(planetName: string) {
    return PLANET_CONFIGS[planetName] || null;
  }

  /**
   * Format coordinates for display
   */
  formatCoordinates(lat: number, long: number): string {
    const latDir = lat >= 0 ? 'N' : 'S';
    const longDir = long >= 0 ? 'E' : 'W';
    
    return `${Math.abs(lat).toFixed(4)}°${latDir}, ${Math.abs(long).toFixed(4)}°${longDir}`;
  }

  /**
   * Check if a point is within a bounding box
   */
  isWithinBounds(lat: number, long: number, bounds: {
    north: number;
    south: number;
    east: number;
    west: number;
  }): boolean {
    return lat <= bounds.north && 
           lat >= bounds.south && 
           long <= bounds.east && 
           long >= bounds.west;
  }

  /**
   * Generate unique marker ID
   */
  generateMarkerId(lat: number, long: number, planet: string): string {
    return `marker-${planet}-${lat.toFixed(6)}-${long.toFixed(6)}`;
  }

  /**
   * Validate quake data
   */
  validateQuakeData(quake: QuakeData): boolean {
    return quake.id > 0 && 
           quake.lat >= -90 && quake.lat <= 90 &&
           quake.long >= -180 && quake.long <= 180 &&
           !!quake.planet;
  }
} 