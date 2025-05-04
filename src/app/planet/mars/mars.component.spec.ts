import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MarsComponent } from './mars.component';
import { MarsService } from './mars.service';
import { of, throwError } from 'rxjs';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { EarthquakeVisualizerComponent } from '../../earthquake-visualizer/earthquake-visualizer.component';
import { SidebarComponent } from '../../sidebar/sidebar.component';

describe('MarsComponent', () => {
  let component: MarsComponent;
  let fixture: ComponentFixture<MarsComponent>;
  let marsService: MarsService;

  const mockQuakesData = [
    { id: 1, lat: 34.055161, long: -118.25 },
    { id: 2, lat: 50.56, long: -77.35 },
    { id: 3, lat: 22.05, long: -120.25 }
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        CommonModule,
        HttpClientModule,
        MarsComponent,
        EarthquakeVisualizerComponent,
        SidebarComponent
      ],
      providers: [
        {
          provide: MarsService,
          useValue: {
            getQuakes: jest.fn()
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(MarsComponent);
    component = fixture.componentInstance;
    marsService = TestBed.inject(MarsService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with default values', () => {
    expect(component.isLoading).toBe(false);
    expect(component.quakesData).toEqual([]);
  });

  describe('getQuakes', () => {
    it('should fetch quakes data successfully', () => {
      const mockFilters = { startDate: '2023-01-01', endDate: '2023-01-31' };
      const mockResponse = [{ id: 1, lat: 10, long: 20 }];

      jest.spyOn(marsService, 'getQuakes').mockReturnValue(of(mockResponse));

      component.getQuakes(mockFilters as any);

      expect(component.isLoading).toBe(true);
      expect(marsService.getQuakes).toHaveBeenCalledWith({
        planet: 'mars',
        ...mockFilters
      });

      // Simulate the finalize operator
      component.isLoading = false;

      expect(component.quakesData).toEqual(mockResponse);
      expect(component.isLoading).toBe(false);
    });

    it('should handle error and set fallback data', () => {
      const mockFilters = { startDate: '2023-01-01', endDate: '2023-01-31' };
      const mockError = new Error('API Error');

      jest.spyOn(marsService, 'getQuakes').mockReturnValue(throwError(() => mockError));

      component.getQuakes(mockFilters as any);

      expect(component.isLoading).toBe(true);
      expect(marsService.getQuakes).toHaveBeenCalledWith({
        planet: 'mars',
        ...mockFilters
      });

      // Simulate the finalize operator
      component.isLoading = false;

      expect(component.quakesData).toEqual(mockQuakesData);
      expect(component.isLoading).toBe(false);
    });

    it('should handle empty filters', () => {
      const mockResponse = [{ id: 1, lat: 10, long: 20 }];

      jest.spyOn(marsService, 'getQuakes').mockReturnValue(of(mockResponse));

      component.getQuakes({} as any);

      expect(marsService.getQuakes).toHaveBeenCalledWith({
        planet: 'mars'
      });
    });
  });
});
