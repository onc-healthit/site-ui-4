import { defineConfig } from 'cypress'

export default defineConfig({
  env: {
    auth_username: 'ADD_USERNAME',
    auth_password: 'ADD_PASSWORD',
    okta_domain: 'ADD_OKTA_URL',
  },
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    testIsolation: false,
    baseUrl: 'http://localhost:3000',
    viewportWidth: 1280,
    viewportHeight: 720,
  },
})
