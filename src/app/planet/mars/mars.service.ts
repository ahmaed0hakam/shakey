import { Injectable } from '@angular/core';
import { BasePlanetService } from '../../shared/services/base-planet.service';
import { QuakeData } from '../../shared/interfaces/planet.interface';

@Injectable({
  providedIn: 'root'
})
export class MarsService extends BasePlanetService {
  protected readonly planetName = 'mars';
  protected readonly apiUrl = 'https://ahmad/api';

  protected getFallbackData(): QuakeData[] {
    return [
      { id: 1, lat: 34.055161, long: -118.25, planet: 'mars' },
      { id: 2, lat: 50.56, long: -77.35, planet: 'mars' },
      { id: 3, lat: 22.05, long: -120.25, planet: 'mars' }
    ];
  }
}