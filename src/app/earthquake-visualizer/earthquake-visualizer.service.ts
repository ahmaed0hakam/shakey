import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { QuakeData } from '../shared/interfaces/planet.interface';

@Injectable({
  providedIn: 'root'
})
export class EarthquakeVisualizerService {
  // Use relative URL - interceptor will prepend the base API URL
  private apiUrl = '/earthquakes';

  constructor(private http: HttpClient) {}

  // Simulated data fetching method (replace this with an actual API call)
  fetchEarthquakes(): Observable<QuakeData[]> {
    const dummyData: QuakeData[] = [
      { id: 1, lat: 34.05, long: -118.25, date: '2023-10-01T00:00:00Z', planet: 'earth' },
      { id: 2, lat: 48.85, long: 2.35, date: '2023-09-28T00:00:00Z', planet: 'earth' },
      { id: 3, lat: -15.78, long: -47.93, date: '2023-09-30T00:00:00Z', planet: 'earth' },
      // More dummy data...
    ];
    return of(dummyData); // Use of to simulate the observable response
  }

  // Method to get earthquakes within a date range
  getEarthquakesByDate(startDate: Date, endDate: Date): Observable<QuakeData[]> {
    return this.fetchEarthquakes().pipe(
      map(earthquakes =>
        earthquakes.filter(earthquake => {
          if (!earthquake.date) return false;
          const date = new Date(earthquake.date);
          return date >= startDate && date <= endDate;
        })
      ),
      catchError(error => {
        console.error('Error fetching earthquakes:', error);
        return of([]);
      })
    );
  }

  // Method to fetch earthquakes from API (when ready to use real API)
  fetchEarthquakesFromApi(): Observable<QuakeData[]> {
    return this.http.get<QuakeData[]>(this.apiUrl).pipe(
      catchError(error => {
        console.error('Error fetching earthquakes from API:', error);
        return this.fetchEarthquakes(); // Fallback to dummy data
      })
    );
  }
}
