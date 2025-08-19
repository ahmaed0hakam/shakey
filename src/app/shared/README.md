# Shared Components and Services

This folder contains reusable components, services, interfaces, and utilities that are shared across the Shakey application.

## 📁 Structure

```
shared/
├── components/           # Reusable UI components
│   ├── base-planet.component.ts
│   ├── loading-spinner/
│   └── error-display/
├── services/            # Shared services
│   ├── base-planet.service.ts
│   └── planet-utility.service.ts
├── interfaces/          # TypeScript interfaces
│   └── planet.interface.ts
├── constants/           # Application constants
│   └── planet.constants.ts
├── styles/              # Shared styles
│   └── common.sass
└── index.ts             # Barrel export file
```

## 🚀 Usage

### Importing Shared Components

```typescript
// Import specific components
import { LoadingSpinnerComponent } from '../shared/components/loading-spinner/loading-spinner.component';

// Or use the barrel export
import { LoadingSpinnerComponent } from '../shared';
```

### Using Base Classes

```typescript
// Extend base planet component
export class MarsComponent extends BasePlanetComponent {
  constructor(marsService: MarsService) {
    super(marsService);
  }

  protected getPlanetName(): string {
    return 'mars';
  }
}
```

### Using Shared Services

```typescript
// Inject utility service
constructor(private planetUtility: PlanetUtilityService) {}

// Use utility methods
const coords = this.planetUtility.latLongToSpherical(lat, long, radius);
```

## 🔧 Key Features

- **Base Classes**: Abstract base classes for common functionality
- **Reusable Components**: Standalone components that can be used anywhere
- **Utility Services**: Helper methods for common operations
- **Type Safety**: Strongly typed interfaces for better development experience
- **Consistent Styling**: Shared CSS classes and design patterns

## 📝 Adding New Shared Items

1. Create your component/service/interface in the appropriate folder
2. Export it from the `index.ts` file
3. Update this README with usage examples
4. Follow the existing naming conventions and patterns

## 🎨 Styling

Use the shared styles in `common.sass` for consistent UI patterns:

```sass
// Use utility classes
.flex-center
.text-center
.mt-4

// Use component styles
.card
.btn-primary
.form-group
``` 