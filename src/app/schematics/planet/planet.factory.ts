import { Rule, SchematicContext, Tree, apply, mergeWith, template, url, move, Source } from '@angular-devkit/schematics';
import { strings } from '@angular-devkit/core';
import { PlanetSchematicOptions } from './schema';

export function planetSchematic(options: PlanetSchematicOptions): Rule {
  return (tree: Tree, context: SchematicContext) => {
    // Validate the planet name
    if (!options.name || !/^[a-z][a-z0-9]*$/.test(options.name)) {
      throw new Error('Planet name must be a valid lowercase identifier starting with a letter');
    }

    // Set default values
    const planetName = options.name.toLowerCase();
    const displayName = options.displayName || strings.capitalize(planetName);
    const radius = options.radius || 5;
    const atmosphere = options.atmosphere !== undefined ? options.atmosphere : false;
    const gravity = options.gravity || 1.0;
    const temperature = options.temperature || 15;
    const texturePath = options.texturePath || `assets/images/${planetName}.jpg`;
    const path = options.path || 'src/app/planet';

    // Create the template source
    const source: Source = apply(url('./files'), [
      template({
        planetName,
        displayName,
        radius,
        atmosphere,
        gravity,
        temperature,
        texturePath,
        ...strings
      }),
      move(`${path}/${planetName}`)
    ]);

    // Return the merged rules
    return mergeWith(source);
  };
} 