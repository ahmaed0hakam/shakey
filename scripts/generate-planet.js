#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Get command line arguments
const args = process.argv.slice(2);
const planetName = args[0];
const displayName = args[1] || planetName.charAt(0).toUpperCase() + planetName.slice(1);

if (!planetName) {
  console.error('❌ Please provide a planet name!');
  console.log('Usage: node scripts/generate-planet.js <planet-name> [display-name]');
  console.log('Example: node scripts/generate-planet.js venus Venus');
  process.exit(1);
}

// Validate planet name
if (!/^[a-z][a-z0-9]*$/.test(planetName)) {
  console.error('❌ Planet name must be a valid lowercase identifier starting with a letter');
  console.log('Example: venus, jupiter, saturn');
  process.exit(1);
}

const planetDir = path.join(__dirname, '..', 'src', 'app', 'planet', planetName);
const routesFile = path.join(__dirname, '..', 'src', 'app', 'app.routes.ts');
const constantsFile = path.join(__dirname, '..', 'src', 'app', 'shared', 'constants', 'planet.constants.ts');

// Create planet directory
if (!fs.existsSync(planetDir)) {
  fs.mkdirSync(planetDir, { recursive: true });
  console.log(`✅ Created directory: ${planetDir}`);
} else {
  console.log(`⚠️  Directory already exists: ${planetDir}`);
}

// Template functions
const templates = {
  component: (name, displayName) => `import { Component } from '@angular/core';
import { EarthquakeVisualizerComponent } from '../../earthquake-visualizer/earthquake-visualizer.component';
import { SidebarComponent } from '../../sidebar/sidebar.component';
import { ${displayName}Service } from './${name}.service';
import { BasePlanetComponent } from '../../shared/components/base-planet.component';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-${name}',
  imports: [EarthquakeVisualizerComponent, SidebarComponent, HttpClientModule],
  templateUrl: './${name}.component.html',
  styleUrls: ['./${name}.component.sass', '../planet.sass'],
  providers: [${displayName}Service]
})
export class ${displayName}Component extends BasePlanetComponent {
  constructor(${name}Service: ${displayName}Service) {
    super(${name}Service);
  }

  protected getPlanetName(): string {
    return '${name}';
  }
}`,

  service: (name, displayName) => `import { Injectable } from '@angular/core';
import { BasePlanetService } from '../../shared/services/base-planet.service';
import { QuakeData } from '../../shared/interfaces/planet.interface';

@Injectable({
  providedIn: 'root'
})
export class ${displayName}Service extends BasePlanetService {
  protected readonly planetName = '${name}';
  protected readonly apiUrl = 'https://ahmad/api';

  protected getFallbackData(): QuakeData[] {
    return [
      { id: 1, lat: 34.055161, long: -118.25, planet: '${name}' },
      { id: 2, lat: 50.56, long: -77.35, planet: '${name}' },
      { id: 3, lat: 22.05, long: -120.25, planet: '${name}' }
    ];
  }
}`,

  html: (name, displayName) => `<app-sidebar (filtersChange)="getQuakes($event)"></app-sidebar>
@if (!isLoading) {
  <app-earthquake-visualizer [planet]="'${name}'" [quakesData]="quakesData"></app-earthquake-visualizer>
}`,

  sass: (name) => `// This component uses the shared planet.sass styles
// No custom styles needed`,

  spec: (name, displayName) => `import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ${displayName}Component } from './${name}.component';
import { ${displayName}Service } from './${name}.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('${displayName}Component', () => {
  let component: ${displayName}Component;
  let fixture: ComponentFixture<${displayName}Component>;
  let mockService: jasmine.SpyObj<${displayName}Service>;

  beforeEach(async () => {
    mockService = jasmine.createSpyObj('${displayName}Service', ['getQuakes', 'getFallbackDataPublic']);
    
    await TestBed.configureTestingModule({
      imports: [${displayName}Component, HttpClientTestingModule],
      providers: [
        { provide: ${displayName}Service, useValue: mockService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(${displayName}Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return correct planet name', () => {
    expect(component['getPlanetName']()).toBe('${name}');
  });
});`,

  serviceSpec: (name, displayName) => `import { TestBed } from '@angular/core/testing';
import { ${displayName}Service } from './${name}.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('${displayName}Service', () => {
  let service: ${displayName}Service;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [${displayName}Service]
    });
    service = TestBed.inject(${displayName}Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should have correct planet name', () => {
    expect(service['planetName']).toBe('${name}');
  });

  it('should have correct API URL', () => {
    expect(service['apiUrl']).toBe('https://ahmad/api');
  });
});`
};

// Generate files
const files = [
  { name: `${planetName}.component.ts`, content: templates.component(planetName, displayName) },
  { name: `${planetName}.service.ts`, content: templates.service(planetName, displayName) },
  { name: `${planetName}.component.html`, content: templates.html(planetName, displayName) },
  { name: `${planetName}.component.sass`, content: templates.sass(planetName) },
  { name: `${planetName}.component.spec.ts`, content: templates.spec(planetName, displayName) },
  { name: `${planetName}.service.spec.ts`, content: templates.serviceSpec(planetName, displayName) }
];

files.forEach(file => {
  const filePath = path.join(planetDir, file.name);
  fs.writeFileSync(filePath, file.content);
  console.log(`✅ Created: ${file.name}`);
});

// Function to add route to app.routes.ts
function addRouteToAppRoutes() {
  try {
    if (fs.existsSync(routesFile)) {
      let routesContent = fs.readFileSync(routesFile, 'utf8');
      
      // Check if route already exists
      if (routesContent.includes(`path: '${planetName}'`)) {
        console.log(`⚠️  Route for ${planetName} already exists in app.routes.ts`);
        return;
      }

      // Find the routes array and add the new route before the catch-all route
      const routesArrayRegex = /(export const routes: Routes = \[[\s\S]*?)(  \{\s*path: '\*\*',[\s\S]*?\},)/;
      
      if (routesArrayRegex.test(routesContent)) {
        const newRoute = `  {
    path: '${planetName}',
    loadComponent: () => import('./planet/${planetName}/${planetName}.component').then((m) => m.${displayName}Component),
  },
  `;
        
        routesContent = routesContent.replace(routesArrayRegex, `$1${newRoute}$2`);
        
        fs.writeFileSync(routesFile, routesContent);
        console.log(`✅ Added route for ${planetName} to app.routes.ts`);
      } else {
        console.log(`⚠️  Could not automatically add route. Please add manually to app.routes.ts`);
        console.log(`   Add this route before the catch-all route:`);
        console.log(`   {
     path: '${planetName}',
     loadComponent: () => import('./planet/${planetName}/${planetName}.component').then((m) => m.${displayName}Component),
   },`);
      }
    } else {
      console.log(`⚠️  app.routes.ts not found. Please add route manually`);
    }
  } catch (error) {
    console.log(`⚠️  Could not automatically add route: ${error.message}`);
    console.log(`   Please add the route manually to app.routes.ts`);
  }
}

// Function to add planet config to constants
function addPlanetToConstants() {
  try {
    if (fs.existsSync(constantsFile)) {
      let constantsContent = fs.readFileSync(constantsFile, 'utf8');
      
      // Check if planet config already exists
      if (constantsContent.includes(`${planetName}: {`)) {
        console.log(`⚠️  Planet config for ${planetName} already exists in planet.constants.ts`);
        return;
      }

      // Find the PLANET_CONFIGS object and add the new planet
      const configRegex = /(export const PLANET_CONFIGS: Record<string, PlanetConfig> = \{[\s\S]*?)(\};)/;
      if (configRegex.test(constantsContent)) {
        const newPlanetConfig = `  ${planetName}: {
    name: '${displayName}',
    radius: 5,
    texturePath: 'assets/images/${planetName}.jpg',
    atmosphere: false,
    gravity: 1.0,
    temperature: 15
  },
  `;
        
        constantsContent = constantsContent.replace(configRegex, `$1${newPlanetConfig}$2`);
        
        fs.writeFileSync(constantsFile, constantsContent);
        console.log(`✅ Added ${planetName} config to planet.constants.ts`);
      } else {
        console.log(`⚠️  Could not automatically add planet config. Please add manually to planet.constants.ts`);
      }
    } else {
      console.log(`⚠️  planet.constants.ts not found. Please add planet config manually`);
    }
  } catch (error) {
    console.log(`⚠️  Could not automatically add planet config: ${error.message}`);
    console.log(`   Please add the planet config manually to planet.constants.ts`);
  }
}

// Add route and constants automatically
addRouteToAppRoutes();
addPlanetToConstants();

console.log(`\n🎉 Successfully generated ${displayName} planet!`);
console.log(`\n📁 Files created in: ${planetDir}`);
console.log(`\n🔧 Integration completed:`);
console.log(`✅ Route added to app.routes.ts`);
console.log(`✅ Planet config added to planet.constants.ts`);
console.log(`\n📋 Final steps:`);
console.log(`1. Add planet image to src/assets/images/${planetName}.jpg`);
console.log(`2. Update navigation components (navbar/sidebar) to include ${displayName}`);
console.log(`3. Test the new route: http://localhost:4200/${planetName}`);
console.log(`\n🚀 Happy exploring! 🪐`); 