export const environment = {
  production: true,
  apiUrl: 'https://ahmad/api',
  threeJs: {
    enableShadows: false,
    enableAntialiasing: false,
    enableFog: false
  },
  features: {
    enableEarthquakeVisualization: true,
    enable3DRendering: true,
    enableAnimations: false
  },
  api: {
    timeout: 60000,
    retryAttempts: 1,
    enableLogging: false
  }
}; 