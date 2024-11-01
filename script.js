const { createUser, changePassword, users } = require('./src/user')

const userMenu = () => {
  console.log('\n1. Create User\n2. Login\n3. Change Password\n4. Exit')
  process.stdin.once('data', (data) => {
    const option = data.toString().trim()

    switch (option) {
      case '1':
        createUserPrompt()
        break
      case '2':
        loginPrompt()
        break
      case '3':
        changePasswordPrompt()
        break
      case '4':
        console.log('Exit Program.')
        process.exit(0)
        break
      default:
        console.log('Invalid command, please try again.')
        userMenu()
        break
    }
  })
}

const createUserPrompt = () => {
  console.log('\n--- Create User ---')
  process.stdout.write('Username: ')
  process.stdin.once('data', (username) => {
    process.stdout.write('Password: ')
    process.stdin.once('data', (password) => {
      const result = createUser(username.toString().trim(), password.toString().trim())
      console.log(result)
      userMenu()
    })
  })
}

const loginPrompt = () => {
  console.log('\n--- Login ---')
  process.stdout.write('Username: ')
  process.stdin.once('data', (username) => {
    process.stdout.write('Password: ')
    process.stdin.once('data', (password) => {
      const userExists = users.some(
        (u) => u.username === username.toString().trim() && u.password === password.toString().trim()
      )
      if (userExists) {
        console.log(`Login successful: ${username.toString().trim()}`)
      } else {
        console.log(`Invalid username or password for ${username.toString().trim()}.`)
      }
      userMenu()
    })
  })
}

const changePasswordPrompt = () => {
  console.log('\n--- Change Password ---')
  process.stdout.write('Username: ')
  process.stdin.once('data', (username) => {
    process.stdout.write('Old Password: ')
    process.stdin.once('data', (oldPassword) => {
      process.stdout.write('New Password: ')
      process.stdin.once('data', (newPassword) => {
        const result = changePassword(
          username.toString().trim(),
          oldPassword.toString().trim(),
          newPassword.toString().trim()
        )
        console.log(result)
        userMenu()
      })
    })
  })
}

userMenu()
