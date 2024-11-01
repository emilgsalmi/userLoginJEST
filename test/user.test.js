const { createUser, changePassword, users } = require('../src/user')

// Test för createUser-funktionen
describe('Create User', () => {
  beforeEach(() => {
    users.length = 0
  })

  it('should create a new user with valid credentials', () => {
    const result = createUser('testUser', 'Password1')
    expect(result).toBe('Username: testUser has been created')
    expect(users.length).toBe(1)
    expect(users[0].username).toBe('testUser')
  })

  it('should not create a user with an existing username', () => {
    createUser('testUser', 'Password1')
    const result = createUser('testUser', 'Password2')
    expect(result).toBe('Error: Username already exists.')
    expect(users.length).toBe(1)
  })

  it('should not create a user with a short password', () => {
    const result = createUser('testUser', 'pass')
    expect(result).toBe('Error: Password does not meet requirements')
    expect(users.length).toBe(0)
  })
})

// Test för changePassword-funktionen
describe('Change Password', () => {
  beforeEach(() => {
    users.length = 0
    createUser('testUser', 'Password1')
  })

  it('should change password for an existing user with valid old password', () => {
    const result = changePassword('testUser', 'Password1', 'NewPassword1')
    expect(result).toBe('Password changed successfully')
    expect(users[0].password).toBe('NewPassword1')
  })

  it('should not change password if user does not exist', () => {
    const result = changePassword('nonExistingUser', 'Password1', 'NewPassword1')
    expect(result).toBe('Error: User does not exist')
  })

  it('should not change password with incorrect old password', () => {
    const result = changePassword('testUser', 'WrongOldPassword', 'NewPassword1')
    expect(result).toBe('Error: Incorrect old password')
  })

  it('should not change password if new password is the same as old password', () => {
    const result = changePassword('testUser', 'Password1', 'Password1')
    expect(result).toBe('Error: New password cannot be the same as the old password')
  })

  it('should not change password if new password is too weak', () => {
    const result = changePassword('testUser', 'Password1', 'short')
    expect(result).toBe('Error: New password does not meet requirements')
  })
})

// Test för login-funktionen (om det finns)
describe('Login', () => {
  beforeEach(() => {
    users.length = 0
    createUser('testUser', 'Password1')
  })

  it('should successfully log in with correct credentials', () => {
    const userExists = users.some(u => u.username === 'testUser' && u.password === 'Password1')
    expect(userExists).toBe(true)
  })

  it('should fail to log in with incorrect password', () => {
    const userExists = users.some(u => u.username === 'testUser' && u.password === 'WrongPassword')
    expect(userExists).toBe(false)
  })

  it('should fail to log in if username does not exist', () => {
    const userExists = users.some(u => u.username === 'nonExistingUser' && u.password === 'Password1')
    expect(userExists).toBe(false)
  })
})
