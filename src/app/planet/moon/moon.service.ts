import { Injectable } from '@angular/core';
import { BasePlanetService } from '../../shared/services/base-planet.service';
import { QuakeData } from '../../shared/interfaces/planet.interface';

@Injectable({
  providedIn: 'root'
})
export class MoonService extends BasePlanetService {
  protected readonly planetName = 'moon';
  protected readonly apiUrl = 'https://ahmad/api';

  protected getFallbackData(): QuakeData[] {
    return [
      { id: 1, lat: -34.055161, long: -118.25, planet: 'moon' },
      { id: 2, lat: 20.055161, long: -118.25, planet: 'moon' },
      { id: 3, lat: 19.05, long: -120.25, planet: 'moon' }
    ];
  }
}