const users = []

function createUser(username, password) {
  const userExists = users.some((u) => u.username === username)
  if (userExists) {
    return 'User already exists.'
  }
  
  users.push({ username, password })
  return 'User created successfully.'
}

function changePassword(username, oldPassword, newPassword) {
  const user = users.find((u) => u.username === username && u.password === oldPassword)
  
  if (!user) {
    return 'Invalid username or password.'
  }
  
  user.password = newPassword
  return 'Password changed successfully.'
}

module.exports = {
  createUser,
  changePassword,
  users
}
