export const environment = {
  production: false,
  apiUrl: 'https://ahmad/api',
  threeJs: {
    enableShadows: true,
    enableAntialiasing: true,
    enableFog: false
  },
  features: {
    enableEarthquakeVisualization: true,
    enable3DRendering: true,
    enableAnimations: true
  },
  api: {
    timeout: 30000,
    retryAttempts: 3,
    enableLogging: true
  }
}; 