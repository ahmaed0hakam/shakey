import { PlanetConfig } from '../interfaces/planet.interface';

export const PLANET_CONFIGS: Record<string, PlanetConfig> = {
  moon: {
    name: 'Moon',
    radius: 5,
    texturePath: 'assets/images/moon.jpg',
    atmosphere: false,
    gravity: 0.165,
    temperature: -233
  },
  mars: {
    name: 'Mars',
    radius: 5,
    texturePath: 'assets/images/mars.jpg',
    atmosphere: true,
    gravity: 0.38,
    temperature: -63
  }
};

export const THREE_JS_CONFIG = {
  CAMERA: {
    FOV: 70,
    NEAR: 1,
    FAR: 1000,
    INITIAL_Z: 10,
    MOBILE_Z: 30
  },
  CONTROLS: {
    MAX_DISTANCE: 20,
    MIN_DISTANCE: 7.01,
    ENABLE_PAN: false
  },
  MARKER: {
    SIZE: 0.1,
    SEGMENTS: 32,
    COLOR: 0xff0000
  },
  LIGHTING: {
    AMBIENT_INTENSITY: 4
  }
};

// API endpoints are now relative - interceptor handles the base URL
export const API_ENDPOINTS = {
  QUAKES: '/quakes',
  PLANET_INFO: '/info'
};

export const RESPONSIVE_BREAKPOINTS = {
  MOBILE: 768,
  TABLET: 1024,
  DESKTOP: 1200
}; 