class User{
    constructor(username, password){
        this.username = username
        this.password = password
    }
}

const users = []

const createUser = (username, password) => {
    if(users.some(u => u.username === username)){
        return "Error: Username already exits."
    }

    const passwordReg = /^(?=.*[0-9])(?=.*[A-Z]).{8,}$/

    if(!passwordReg.test(password)){
        return "Error: Password does not meet requirements"
    }

    users.push(new User(username, password))
    return true
}

const changePassword = (username, oldPassword, newPassword) => {
    const existingUser = users.find(u => u.username === username)

    if(!existingUser) return "Error: User does not exist"

    console.log(`Existing password: "${existingUser.password}"`);
    console.log(`Old password entered: "${oldPassword}"`);

    if(existingUser.password.trim() !== oldPassword.trim()) return "Error: Incorrect old password"

    if(oldPassword.trim() === newPassword.trim()) return "Error: New password cannot be the same as the old password"

    const passwordReg = /^(?=.*[0-9])(?=.*[A-Z]).{8,}$/
    if(!passwordReg.test(newPassword.trim())){
        return "Error: New password does not meet requirements"
    }

    existingUser.password = newPassword.trim()
    return "Password changed successfully"
}

module.exports = {User, createUser, changePassword, users}