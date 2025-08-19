import { Component } from '@angular/core';
import { EarthquakeVisualizerComponent } from '../../earthquake-visualizer/earthquake-visualizer.component';
import { SidebarComponent } from '../../sidebar/sidebar.component';
import { MarsService } from './mars.service';
import { BasePlanetComponent } from '../../shared/components/base-planet.component';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-mars',
  imports: [EarthquakeVisualizerComponent, SidebarComponent, HttpClientModule],
  templateUrl: './mars.component.html',
  styleUrls: ['./mars.component.sass', '../planet.sass'],
  providers: [MarsService]
})
export class MarsComponent extends BasePlanetComponent {
  constructor(marsService: MarsService) {
    super(marsService);
  }

  protected getPlanetName(): string {
    return 'mars';
  }
}
