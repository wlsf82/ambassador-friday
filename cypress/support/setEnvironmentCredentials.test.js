const test = require('node:test')
const assert = require('node:assert')

// Mock Cypress object and its methods before importing commands
let mockCypressEnv = {}
let mockCyLogs = []

global.Cypress = {
  env: (key, value) => {
    if (value === undefined) {
      // Get operation
      return mockCypressEnv[key]
    } else {
      // Set operation
      mockCypressEnv[key] = value
      return value
    }
  },
  config: (key) => {
    return 'http://localhost:3000'
  },
  Commands: {
    add: () => {
      // Mock Cypress.Commands.add to prevent errors during import
    }
  }
}

global.cy = {
  log: (message) => {
    mockCyLogs.push(message)
  }
}

const setEnvironmentCredentials = require('./commands')

test('setEnvironmentCredentials function', (t) => {
  t.test('sets credentials for local environment', () => {
    // Reset and arrange
    mockCypressEnv = {}
    mockCyLogs = []
    const localCredentials = { admin: { USER_EMAIL: 'local@admin.com' } }
    mockCypressEnv.LOCAL_CREDENTIALS = localCredentials

    // Act
    setEnvironmentCredentials('local')

    // Assert
    assert.deepEqual(mockCypressEnv.credentials, localCredentials)
  })

  t.test('sets credentials for test environment', () => {
    // Reset and arrange
    mockCypressEnv = {}
    mockCyLogs = []
    const testCredentials = { admin: { USER_EMAIL: 'test@admin.com' } }
    mockCypressEnv.TEST_CREDENTIALS = testCredentials

    // Act
    setEnvironmentCredentials('test')

    // Assert
    assert.deepEqual(mockCypressEnv.credentials, testCredentials)
  })

  t.test('sets credentials for staging environment', () => {
    // Reset and arrange
    mockCypressEnv = {}
    mockCyLogs = []
    const stagingCredentials = { admin: { USER_EMAIL: 'staging@admin.com' } }
    mockCypressEnv.STAGING_CREDENTIALS = stagingCredentials

    // Act
    setEnvironmentCredentials('staging')

    // Assert
    assert.deepEqual(mockCypressEnv.credentials, stagingCredentials)
  })

  t.test('sets credentials for prod environment', () => {
    // Reset and arrange
    mockCypressEnv = {}
    mockCyLogs = []
    const prodCredentials = { admin: { USER_EMAIL: 'prod@admin.com' } }
    mockCypressEnv.PROD_CREDENTIALS = prodCredentials

    // Act
    setEnvironmentCredentials('prod')

    // Assert
    assert.deepEqual(mockCypressEnv.credentials, prodCredentials)
  })

  t.test('logs an error message for invalid environment', () => {
    // Reset
    mockCypressEnv = {}
    mockCyLogs = []

    // Act
    setEnvironmentCredentials('invalid')

    // Assert
    assert.equal(mockCyLogs.length, 1)
    assert.equal(mockCyLogs[0], 'Invalid environment: invalid')
  })

  t.test('handles undefined environment', () => {
    // Reset
    mockCypressEnv = {}
    mockCyLogs = []

    // Act
    setEnvironmentCredentials(undefined)

    // Assert
    assert.equal(mockCyLogs.length, 1)
    assert.equal(mockCyLogs[0], 'Invalid environment: undefined')
  })

  t.test('handles null environment', () => {
    // Reset
    mockCypressEnv = {}
    mockCyLogs = []

    // Act
    setEnvironmentCredentials(null)

    // Assert
    assert.equal(mockCyLogs.length, 1)
    assert.equal(mockCyLogs[0], 'Invalid environment: null')
  })

  t.test('handles empty string environment', () => {
    // Reset
    mockCypressEnv = {}
    mockCyLogs = []

    // Act
    setEnvironmentCredentials('')

    // Assert
    assert.equal(mockCyLogs.length, 1)
    assert.equal(mockCyLogs[0], 'Invalid environment: ')
  })

  t.test('does not modify existing credentials for invalid environment', () => {
    // Reset and arrange
    mockCypressEnv = {}
    mockCyLogs = []
    const existingCredentials = { existing: 'data' }
    mockCypressEnv.credentials = existingCredentials

    // Act
    setEnvironmentCredentials('unknown')

    // Assert
    assert.deepEqual(mockCypressEnv.credentials, existingCredentials)
  })
})
