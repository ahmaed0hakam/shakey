# Custom Angular Schematics

This folder contains custom Angular CLI schematics for the Shakey space exploration application.

## 🚀 Planet Schematic

The `planet` schematic generates a complete planet folder structure with all necessary files for a new celestial body exploration page.

### Usage

```bash
# Basic usage - will prompt for planet name and display name
ng generate @shakey/schematics:planet

# With options
ng generate @shakey/schematics:planet --name=venus --displayName=Venus

# Using alias
ng g @shakey/schematics:p --name=jupiter --displayName=Jupiter

# With all options
ng g @shakey/schematics:planet \
  --name=saturn \
  --displayName=Saturn \
  --radius=6 \
  --atmosphere=true \
  --gravity=0.93 \
  --temperature=-140
```

### Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `name` | string | - | **Required** Planet name (e.g., venus, jupiter) |
| `displayName` | string | - | **Required** Display name (e.g., Venus, Jupiter) |
| `radius` | number | 5 | Planet radius for 3D visualization |
| `atmosphere` | boolean | false | Whether the planet has an atmosphere |
| `gravity` | number | 1.0 | Gravity relative to Earth |
| `temperature` | number | 15 | Average temperature in Celsius |
| `texturePath` | string | assets/images/{name}.jpg | Path to planet texture image |
| `path` | string | src/app/planet | Output directory path |

### Generated Files

When you run the planet schematic, it creates the following structure:

```
src/app/planet/{planet-name}/
├── {planet-name}.component.ts          # Main component
├── {planet-name}.component.html        # Component template
├── {planet-name}.component.sass        # Component styles
├── {planet-name}.component.spec.ts     # Component tests
├── {planet-name}.service.ts            # Planet service
└── {planet-name}.service.spec.ts       # Service tests
```

### Example Output

#### Component (venus.component.ts)
```typescript
export class VenusComponent extends BasePlanetComponent {
  constructor(venusService: VenusService) {
    super(venusService);
  }

  protected getPlanetName(): string {
    return 'venus';
  }
}
```

#### Service (venus.service.ts)
```typescript
export class VenusService extends BasePlanetService {
  protected readonly planetName = 'venus';
  protected readonly apiUrl = 'https://ahmad/api';

  protected getFallbackData(): QuakeData[] {
    return [
      { id: 1, lat: 34.055161, long: -118.25, planet: 'venus' },
      // ... more data
    ];
  }
}
```

### Integration Steps

After generating a new planet, you need to:

1. **Add the route** in `src/app/app.routes.ts`:
```typescript
{
  path: 'venus',
  loadComponent: () => import('./planet/venus/venus.component').then((m) => m.VenusComponent),
}
```

2. **Add planet configuration** in `src/app/shared/constants/planet.constants.ts`:
```typescript
export const PLANET_CONFIGS: Record<string, PlanetConfig> = {
  // ... existing planets
  venus: {
    name: 'Venus',
    radius: 5,
    texturePath: 'assets/images/venus.jpg',
    atmosphere: true,
    gravity: 0.91,
    temperature: 462
  }
};
```

3. **Add planet image** to `src/assets/images/venus.jpg`

4. **Update navigation** in your navbar/sidebar components

### Benefits

- **Consistency**: All planets follow the same structure and patterns
- **Speed**: Generate a complete planet in seconds instead of hours
- **Best Practices**: Automatically follows the established architecture
- **Testing**: Includes test files with proper setup
- **Extensibility**: Easy to modify the schematic for new requirements

### Customization

You can customize the schematic by:

1. **Modifying templates**: Edit the files in `src/app/schematics/planet/files/`
2. **Adding new options**: Update `schema.json` and `planet.factory.ts`
3. **Changing file structure**: Modify the template paths and file generation logic

### Troubleshooting

#### Common Issues

1. **Schematic not found**: Ensure the schematic is properly built and linked
2. **Template errors**: Check that all template files exist and have correct syntax
3. **Path issues**: Verify the output path is correct and writable

#### Debug Mode

Run with verbose logging:
```bash
ng generate @shakey/schematics:planet --name=test --verbose
```

### Contributing

To add new schematics or modify existing ones:

1. Create a new folder in `src/app/schematics/`
2. Add the schematic to `collection.json`
3. Update this README with usage instructions
4. Test thoroughly before committing

---

**Happy planet exploring! 🪐** 