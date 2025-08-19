import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, catchError, of } from 'rxjs';
import { QuakeData, PlanetFilters, ApiResponse } from '../interfaces/planet.interface';
import { map } from 'rxjs/operators';

@Injectable()
export abstract class BasePlanetService {
  protected abstract readonly planetName: string;
  protected abstract readonly apiUrl: string;

  constructor(protected http: HttpClient) {}

  getQuakes(filters: PlanetFilters): Observable<QuakeData[]> {
    const params = this.buildQueryParams(filters);
    
    // Use relative URL - interceptor will prepend the base API URL
    return this.http.get<ApiResponse<QuakeData>>(`/quakes`, { params })
      .pipe(
        map(response => response.data || []),
        catchError(error => {
          console.error(`Error fetching ${this.planetName} quakes:`, error);
          return of(this.getFallbackData());
        })
      );
  }

  protected buildQueryParams(filters: PlanetFilters): HttpParams {
    let params = new HttpParams();
    
    if (filters.startDate) {
      params = params.set('startDate', filters.startDate.toISOString());
    }
    if (filters.endDate) {
      params = params.set('endDate', filters.endDate.toISOString());
    }
    if (filters.minMagnitude !== undefined) {
      params = params.set('minMagnitude', filters.minMagnitude.toString());
    }
    if (filters.maxMagnitude !== undefined) {
      params = params.set('maxMagnitude', filters.maxMagnitude.toString());
    }
    if (filters.minDepth !== undefined) {
      params = params.set('minDepth', filters.minDepth.toString());
    }
    if (filters.maxDepth !== undefined) {
      params = params.set('maxDepth', filters.maxDepth.toString());
    }
    
    return params.set('planet', this.planetName);
  }

  protected abstract getFallbackData(): QuakeData[];

  // Public method to get fallback data for components
  getFallbackDataPublic(): QuakeData[] {
    return this.getFallbackData();
  }

  getPlanetInfo(): Observable<any> {
    // Use relative URL - interceptor will prepend the base API URL
    return this.http.get(`/info`).pipe(
      catchError(error => {
        console.error(`Error fetching ${this.planetName} info:`, error);
        return of(null);
      })
    );
  }
} 