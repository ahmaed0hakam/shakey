import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject, takeUntil, finalize } from 'rxjs';
import { BasePlanetService } from '../services/base-planet.service';
import { QuakeData, PlanetFilters } from '../interfaces/planet.interface';

@Component({
  template: ''
})
export abstract class BasePlanetComponent implements OnInit, OnDestroy {
  isLoading = false;
  quakesData: QuakeData[] = [];
  protected destroy$ = new Subject<void>();

  constructor(protected planetService: BasePlanetService) {}

  ngOnInit(): void {
    this.loadInitialData();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  protected loadInitialData(): void {
    const filters: PlanetFilters = {
      planet: this.getPlanetName()
    };
    this.getQuakes(filters);
  }

  getQuakes(filters: PlanetFilters): void {
    this.isLoading = true;

    this.planetService.getQuakes(filters)
      .pipe(
        finalize(() => this.isLoading = false),
        takeUntil(this.destroy$)
      )
      .subscribe({
        next: (data: QuakeData[]) => {
          this.quakesData = data;
        },
        error: (error: any) => {
          console.error('Error loading quakes:', error);
          this.quakesData = this.planetService.getFallbackDataPublic();
        }
      });
  }

  protected abstract getPlanetName(): string;

  protected getPlanetDisplayName(): string {
    return this.getPlanetName().charAt(0).toUpperCase() + this.getPlanetName().slice(1);
  }
} 