// src/user.test.js
const { createUser, changePassword, users } = require('../src/user')

describe('User Management', () => {
    afterEach(() => {
        users.length = 0
    })

    it('should create a new user with valid credentials', () => {
        const result = createUser('testUser', 'Password1')
        expect(result).toBe(true)
        expect(users.length).toBe(1)
        expect(users[0].username).toBe('testUser')
    })

    it('should not create a user with an existing username', () => {
        createUser('testUser', 'Password1')
        const result = createUser('testUser', 'Password2')
        expect(result).toBe("Error: Username already exits.")
        expect(users.length).toBe(1)
    })

    it('should not create a user with an invalid password', () => {
        const result = createUser('testUser', 'pass')
        expect(result).toBe("Error: Password does not meet requirements")
        expect(users.length).toBe(0)
    })

    it('should change password for an existing user', () => {
        createUser('testUser', 'Password1')
        const result = changePassword('testUser', 'Password1', 'NewPassword1')
        expect(result).toBe("Password changed successfully")
        expect(users[0].password).toBe('NewPassword1')
    })

    it('should not change password for a non-existing user', () => {
        const result = changePassword('nonExistingUser', 'Password1', 'NewPassword1')
        expect(result).toBe("Error: User does not exist")
    })

    it('should not change password with incorrect old password', () => {
        createUser('testUser', 'Password1')
        const result = changePassword('testUser', 'NewPassword1', 'WrongOldPassword')
        expect(result).toBe("Error: Incorrect old password")
    })

    it('should not change password if new password is the same as old password', () => {
        createUser('testUser', 'Password1')
        const result = changePassword('testUser', 'Password1', 'Password1')
        expect(result).toBe("Error: New password cannot be the same as the old password")
    })

    it('should not change password with invalid new password', () => {
        createUser('testUser', 'Password1')
        const result = changePassword('testUser', 'Password1', 'password')
        expect(result).toBe("Error: New password does not meet requirements")
    })
})
