const { createUser, changePassword, users } = require('./src/user')

const userMenu = () => {
    console.log("\n1. Create User\n2. Login\n3. Change Password\n4. Exit")
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
                console.log("Avslutar programmet.")
                process.exit(0)
                break;
            default:
                console.log("Ogiltigt alternativ. Försök igen.")
                userMenu()
                break
        }
    })
}


const createUserPrompt = () => {
    console.log("\n--- Skapa Användare ---")
    process.stdout.write("Användarnamn: ")
    process.stdin.once('data', (username) => {
        process.stdout.write("Lösenord: ")
        process.stdin.once('data', (password) => {
            const result = createUser(username.toString().trim(), password.toString().trim())
            console.log(result)
            userMenu()
        })
    })
}


const loginPrompt = () => {
    console.log("\n--- Logga In ---")
    process.stdout.write("Användarnamn: ")
    process.stdin.once('data', (username) => {
        process.stdout.write("Lösenord: ")
        process.stdin.once('data', (password) => {
            const userExists = users.some(u => u.username === username.toString().trim() && u.password === password.toString().trim())
            if (userExists) {
                console.log(`Inloggning lyckades för användare: ${username}!`)
            } else {
                console.log(`Ogiltigt användarnamn eller lösenord för ${username}.`)
            }
            userMenu()
        })
    })
}


const changePasswordPrompt = () => {
    console.log("\n--- Ändra Lösenord ---")
    process.stdout.write("Användarnamn: ")
    process.stdin.once('data', (username) => {
        process.stdout.write("Gammalt Lösenord: ")
        process.stdin.once('data', (oldPassword) => {
            process.stdout.write("Nytt Lösenord: ")
            process.stdin.once('data', (newPassword) => {
                const result = changePassword(username.toString().trim(), oldPassword.toString().trim(), newPassword.toString().trim())
                console.log(result)
                userMenu()
            })
        })
    })
}

userMenu()
