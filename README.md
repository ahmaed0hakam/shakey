# Shakey - Space Exploration Application

A modern Angular-based space exploration application that allows users to explore celestial bodies and visualize earthquake data. Built with Angular 20+ and modern web technologies.

## 🚀 Features

- **Moon Exploration**: Interactive moon surface exploration with 3D visualization
- **Mars Exploration**: Detailed Mars surface exploration experience
- **Earthquake Visualization**: Real-time earthquake data visualization and mapping
- **Modern UI/UX**: Responsive design with Angular Material components
- **3D Graphics**: Powered by Three.js for immersive space experiences
- **Animations**: Smooth animations using GSAP (GreenSock Animation Platform)

## 🛠️ Technology Stack

- **Frontend Framework**: Angular 20.1.7
- **UI Components**: Angular Material & Angular CDK
- **3D Graphics**: Three.js
- **Animations**: GSAP
- **Styling**: SASS with custom theming
- **Testing**: Jasmine & Karma
- **Build Tool**: Angular CLI

## 🏗️ Architecture Highlights

- **Modern Angular**: Uses Angular 20+ with standalone components
- **Signal-based State**: Leverages Angular signals for reactive state management
- **Lazy Loading**: Route-based code splitting for optimal performance
- **Component-based**: Modular architecture with reusable components
- **Shared Architecture**: Comprehensive shared components, services, and utilities
- **Base Classes**: Abstract base classes for common functionality
- **Type Safety**: Strongly typed interfaces throughout the application
- **HTTP Interceptors**: Centralized API management and error handling
- **Custom Schematics**: Automated planet generation with CLI commands

## 📁 Project Structure

```
src/
├── app/
│   ├── earthquake-visualizer/     # Earthquake data visualization
│   ├── footer/                    # Application footer
│   ├── navbar/                    # Navigation bar
│   ├── planet/                    # Celestial body components
│   │   ├── mars/                 # Mars exploration
│   │   └── moon/                 # Moon exploration
│   ├── sidebar/                   # Side navigation
│   ├── services/                  # Application services
│   ├── schematics/                # Custom CLI schematics
│   └── shared/                    # Shared components & utilities
│       ├── components/            # Reusable UI components
│       ├── services/              # Base services & utilities
│       ├── interfaces/            # TypeScript interfaces
│       ├── constants/             # Application constants
│       ├── interceptors/          # HTTP interceptors
│       └── styles/                # Shared styles
├── assets/
│   ├── images/                    # Application images
│   └── sass/                      # Global styles and variables
└── environments/                   # Environment configurations
```

## 🔧 Shared Architecture

The application uses a robust shared architecture for maximum code reusability:

### Base Classes
- **BasePlanetService**: Abstract service for planet-specific operations
- **BasePlanetComponent**: Abstract component for planet exploration pages

### Shared Components
- **LoadingSpinner**: Reusable loading indicator
- **ErrorDisplay**: Consistent error handling component

### Utility Services
- **PlanetUtilityService**: Mathematical calculations and coordinate transformations
- **Shared Constants**: Centralized configuration and constants

### HTTP Interceptors
- **API Interceptor**: Automatic base URL management and common headers
- **Centralized Error Handling**: Consistent error processing across all API calls

### Type Safety
- **Planet Interfaces**: Strongly typed data structures
- **API Response Types**: Consistent API response handling

## 🌐 API Management

The application uses HTTP interceptors for centralized API management:

### Benefits
- **No Hardcoded URLs**: Services use relative endpoints (e.g., `/quakes`)
- **Environment-Specific**: Different API URLs for dev/staging/production
- **Automatic Headers**: Common headers added to all requests
- **Error Handling**: Centralized error processing and logging

### Usage Example
```typescript
// Service method - interceptor automatically handles the full URL
getQuakes(): Observable<QuakeData[]> {
  return this.http.get<QuakeData[]>('/quakes');
}

// Interceptor converts to: https://ahmad/api/quakes (dev) or production URL
```

## 🪐 Planet Generation

The application includes a custom CLI command to generate new planets automatically:

### Quick Planet Generation
```bash
# Generate a new planet with default settings
npm run generate:planet venus

# Generate with custom display name
npm run generate:planet jupiter Jupiter

# Or use the script directly
node scripts/generate-planet.js saturn Saturn
```

### What Gets Generated
- **Component**: Extends BasePlanetComponent with proper configuration
- **Service**: Extends BasePlanetService with planet-specific data
- **Template**: HTML with earthquake visualizer and sidebar integration
- **Styles**: Responsive SASS styling following design patterns
- **Tests**: Component and service test files with proper setup

### Generated Structure
```
src/app/planet/{planet-name}/
├── {planet-name}.component.ts          # Main component
├── {planet-name}.component.html        # Component template
├── {planet-name}.component.sass        # Component styles
├── {planet-name}.component.spec.ts     # Component tests
├── {planet-name}.service.ts            # Planet service
└── {planet-name}.service.spec.ts       # Service tests
```

### Integration Steps
After generating a planet:
1. **Add route** in `src/app/app.routes.ts`
2. **Add planet config** in `src/app/shared/constants/planet.constants.ts`
3. **Add planet image** to `src/assets/images/{planet}.jpg`
4. **Update navigation** components

## 🚀 Getting Started

### Prerequisites

- Node.js (version 18 or higher)
- npm or yarn package manager

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd shakey
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   # or
   ng serve
   ```

4. Open your browser and navigate to `http://localhost:4200/`

## 🧪 Testing

- **Unit Tests**: Run `npm test` or `ng test` to execute unit tests via Karma
- **Test Coverage**: Tests include component, service, and utility testing

## 🏗️ Build

- **Development Build**: `npm run build` or `ng build`
- **Production Build**: `ng build --configuration production`
- **Watch Mode**: `npm run watch` for development builds with file watching

## 🎨 Development

### Code Generation

```bash
# Generate a new component
ng generate component component-name

# Generate a new service
ng generate service service-name

# Generate a new directive
ng generate directive directive-name

# Generate a new planet (custom command)
npm run generate:planet planet-name
```

### Extending Base Classes

```typescript
// Create a new planet service
export class VenusService extends BasePlanetService {
  protected readonly planetName = 'venus';
  protected readonly apiUrl = 'https://api.example.com/venus';
  
  protected getFallbackData(): QuakeData[] {
    return [/* fallback data */];
  }
}

// Create a new planet component
export class VenusComponent extends BasePlanetComponent {
  constructor(venusService: VenusService) {
    super(venusService);
  }
  
  protected getPlanetName(): string {
    return 'venus';
  }
}
```

### Adding New API Endpoints

```typescript
// In your service - just use relative URLs
export class NewService {
  constructor(private http: HttpClient) {}
  
  getData(): Observable<any> {
    // Interceptor automatically handles the full URL
    return this.http.get('/new-endpoint');
  }
}
```

## 🌟 Key Components

- **Moon Component**: Interactive lunar surface exploration
- **Mars Component**: Mars terrain visualization and exploration
- **Earthquake Visualizer**: Real-time seismic data mapping
- **Navigation**: Responsive navbar and sidebar navigation
- **Footer**: Consistent application footer across all pages

## 📱 Responsive Design

The application is built with mobile-first responsive design principles, ensuring optimal user experience across all device sizes.

## 🔧 Configuration

- **Angular Configuration**: `angular.json`
- **TypeScript Configuration**: `tsconfig.json`
- **Package Management**: `package.json`
- **Environment Configuration**: `src/environments/`
- **API Configuration**: Centralized in environment files

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines

- Follow the existing shared architecture patterns
- Use base classes when creating similar functionality
- Add new shared components to the shared folder
- Update the shared index.ts file for new exports
- Maintain type safety with proper interfaces
- Use relative URLs in services - the interceptor handles the rest
- Configure API endpoints in environment files
- Use the planet generation command for new celestial bodies

## 📄 License

This project is private and proprietary.

## 🆘 Support

For support and questions:
- Check the Angular documentation: [angular.dev](https://angular.dev)
- Review Angular CLI commands: `ng help`
- Consult the project documentation and code comments
- See the shared architecture documentation in `src/app/shared/README.md`
- Review the interceptor documentation in `src/app/shared/interceptors/README.md`
- Check the schematics documentation in `src/app/schematics/README.md`

---

**Built with ❤️ using Angular and modern web technologies**
