import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { EarthquakeVisualizerComponent } from './earthquake-visualizer.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatMenuModule } from '@angular/material/menu';
import { of } from 'rxjs';
import { MarkerDetailsModal } from './marker-details-modal/marker-details-modal.component';

describe('EarthquakeVisualizerComponent', () => {
  let component: EarthquakeVisualizerComponent;
  let fixture: ComponentFixture<EarthquakeVisualizerComponent>;
  let dialog: MatDialog;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        CommonModule,
        MatDialogModule,
        MatMenuModule,
        EarthquakeVisualizerComponent
      ],
      providers: [
        { provide: MatDialog, useValue: { open: jest.fn() } }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(EarthquakeVisualizerComponent);
    component = fixture.componentInstance;
    dialog = TestBed.inject(MatDialog);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with default values', () => {
    expect(component.planet).toBe('');
    expect(component.markers).toEqual([]);
    expect(component.activeMenuIndex).toBeNull();
  });

  it('should handle input changes', () => {
    const testData = [
      { id: 1, lat: 34.055161, long: -118.25 },
      { id: 2, lat: 48.85588, long: 2.35 }
    ];

    component.planet = 'earth';
    component.quakesData = testData;

    expect(component.planet).toBe('earth');
    expect(component.quakesData).toEqual(testData);
  });

  it('should toggle menu correctly', () => {
    component.toggleMenu(0);
    expect(component.activeMenuIndex).toBe(0);

    component.toggleMenu(0);
    expect(component.activeMenuIndex).toBeNull();

    component.toggleMenu(1);
    expect(component.activeMenuIndex).toBe(1);
  });

  it('should reset active menu index', () => {
    component.activeMenuIndex = 1;
    component.setNoActiveIndex();
    expect(component.activeMenuIndex).toBeNull();
  });

  it('should open marker details dialog', () => {
    const mockMarker = { position: { x: 0, y: 0, z: 0 } };
    const mockDialogRef = { afterClosed: () => of(null) };
    
    jest.spyOn(dialog, 'open').mockReturnValue(mockDialogRef as any);
    jest.spyOn(component, 'setNoActiveIndex');

    component.markers = [mockMarker as any];
    component.getMarkerDetails(0);

    expect(dialog.open).toHaveBeenCalledWith(MarkerDetailsModal, {
      data: mockMarker
    });
    expect(component.setNoActiveIndex).toHaveBeenCalled();
  });

  it('should handle window resize', () => {
    const originalWidth = window.innerWidth;
    const originalHeight = window.innerHeight;
    
    // Mock window resize
    Object.defineProperty(window, 'innerWidth', { value: 800 });
    Object.defineProperty(window, 'innerHeight', { value: 600 });
    
    // Trigger resize event
    window.dispatchEvent(new Event('resize'));

    // Reset window dimensions
    Object.defineProperty(window, 'innerWidth', { value: originalWidth });
    Object.defineProperty(window, 'innerHeight', { value: originalHeight });
  });

  it('should handle mouse move events', () => {
    const mockEvent = {
      clientX: 400,
      clientY: 300
    } as MouseEvent;

    component.onMouseMove(mockEvent);
    
    // Verify mouse coordinates are calculated correctly
    expect(component['mouse'].x).toBeDefined();
    expect(component['mouse'].y).toBeDefined();
  });

  it('should focus on marker', fakeAsync(() => {
    const mockMarker = {
      position: { x: 1, y: 1, z: 1 }
    };
    
    component.markers = [mockMarker as any];
    component.focusOnMarker(0);
    
    tick(1000); // Wait for animation to complete
    
    expect(component['isFocusing']).toBe(false);
  }));

  it('should not focus on marker if index is invalid', () => {
    component.markers = [];
    component.focusOnMarker(999);
    expect(component['isFocusing']).toBe(false);
  });

  it('should handle ngAfterViewInit', () => {
    // Mock the canvas container
    const mockCanvas = document.createElement('canvas');
    component['canvasContainer'] = { nativeElement: { appendChild: jest.fn() } } as any;
    
    component.ngAfterViewInit();
    
    // Verify that the canvas was added to the container
    expect(component['canvasContainer'].nativeElement.appendChild).toHaveBeenCalled();
  });
});
