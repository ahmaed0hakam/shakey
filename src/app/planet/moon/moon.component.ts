import { Component } from '@angular/core';
import { EarthquakeVisualizerComponent } from '../../earthquake-visualizer/earthquake-visualizer.component';
import { SidebarComponent } from '../../sidebar/sidebar.component';
import { MoonService } from './moon.service';
import { BasePlanetComponent } from '../../shared/components/base-planet.component';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-moon',
  imports: [EarthquakeVisualizerComponent, SidebarComponent, HttpClientModule],
  templateUrl: './moon.component.html',
  styleUrls: ['./moon.component.sass', '../planet.sass'],
  providers: [MoonService],
})
export class MoonComponent extends BasePlanetComponent {
  constructor(moonService: MoonService) {
    super(moonService);
  }

  protected getPlanetName(): string {
    return 'moon';
  }
}
