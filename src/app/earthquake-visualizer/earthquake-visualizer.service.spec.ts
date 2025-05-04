import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { EarthquakeVisualizerService, Earthquake } from './earthquake-visualizer.service';
import { of } from 'rxjs';

describe('EarthquakeVisualizerService', () => {
  let service: EarthquakeVisualizerService;
  let httpMock: HttpTestingController;

  const mockEarthquakes: Earthquake[] = [
    { id: 1, lat: 34.05, long: -118.25, date: '2023-10-01T00:00:00Z' },
    { id: 2, lat: 48.85, long: 2.35, date: '2023-09-28T00:00:00Z' },
    { id: 3, lat: -15.78, long: -47.93, date: '2023-09-30T00:00:00Z' }
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [EarthquakeVisualizerService]
    });

    service = TestBed.inject(EarthquakeVisualizerService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('fetchEarthquakes', () => {
    it('should return an Observable of earthquakes', (done) => {
      service.fetchEarthquakes().subscribe(earthquakes => {
        expect(earthquakes).toEqual(mockEarthquakes);
        done();
      });

      const req = httpMock.expectOne('https://api.example.com/earthquakes');
      expect(req.request.method).toBe('GET');
      req.flush(mockEarthquakes);
    });

    it('should handle HTTP errors', (done) => {
      service.fetchEarthquakes().subscribe(earthquakes => {
        expect(earthquakes).toEqual(mockEarthquakes);
        done();
      });

      const req = httpMock.expectOne('https://api.example.com/earthquakes');
      req.error(new ErrorEvent('Network error'));
    });
  });

  describe('getEarthquakesByDate', () => {
    it('should filter earthquakes by date range', (done) => {
      const startDate = new Date('2023-09-28T00:00:00Z');
      const endDate = new Date('2023-09-30T00:00:00Z');

      service.getEarthquakesByDate(startDate, endDate).subscribe(filteredEarthquakes => {
        expect(filteredEarthquakes.length).toBe(2);
        expect(filteredEarthquakes).toEqual([
          { id: 2, lat: 48.85, long: 2.35, date: '2023-09-28T00:00:00Z' },
          { id: 3, lat: -15.78, long: -47.93, date: '2023-09-30T00:00:00Z' }
        ]);
        done();
      });

      const req = httpMock.expectOne('https://api.example.com/earthquakes');
      req.flush(mockEarthquakes);
    });

    it('should return empty array when no earthquakes match date range', (done) => {
      const startDate = new Date('2023-10-02T00:00:00Z');
      const endDate = new Date('2023-10-03T00:00:00Z');

      service.getEarthquakesByDate(startDate, endDate).subscribe(filteredEarthquakes => {
        expect(filteredEarthquakes).toEqual([]);
        done();
      });

      const req = httpMock.expectOne('https://api.example.com/earthquakes');
      req.flush(mockEarthquakes);
    });

    it('should handle HTTP errors and return empty array', (done) => {
      const startDate = new Date('2023-09-28T00:00:00Z');
      const endDate = new Date('2023-09-30T00:00:00Z');

      service.getEarthquakesByDate(startDate, endDate).subscribe(filteredEarthquakes => {
        expect(filteredEarthquakes).toEqual([]);
        done();
      });

      const req = httpMock.expectOne('https://api.example.com/earthquakes');
      req.error(new ErrorEvent('Network error'));
    });
  });

  it('should handle invalid date inputs', (done) => {
    const startDate = new Date('invalid-date');
    const endDate = new Date('2023-09-30T00:00:00Z');

    service.getEarthquakesByDate(startDate, endDate).subscribe(filteredEarthquakes => {
      expect(filteredEarthquakes).toEqual([]);
      done();
    });

    const req = httpMock.expectOne('https://api.example.com/earthquakes');
    req.flush(mockEarthquakes);
  });

  it('should handle empty earthquake data', (done) => {
    const startDate = new Date('2023-09-28T00:00:00Z');
    const endDate = new Date('2023-09-30T00:00:00Z');

    service.getEarthquakesByDate(startDate, endDate).subscribe(filteredEarthquakes => {
      expect(filteredEarthquakes).toEqual([]);
      done();
    });

    const req = httpMock.expectOne('https://api.example.com/earthquakes');
    req.flush([]);
  });
}); 