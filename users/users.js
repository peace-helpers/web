// $peace.users.API -> String -> The API to call
// $peace.users.sendSignInEmail() -> Function -> Get email from form and send that email a sign in email
// $peace.users.signIn() -> Function -> Get token from url query params & call API to verify token
// $peace.users.signOut() -> Function -> Get token from url query params & call API to verify token
// $peace.urlQueryParams.get() -> Dependency -> Provides url query params
$extendPeace({
  users: {
    API: '/',
    async sendSignInEmail (event) {
      try {
        const EMAIL = event.target.querySelector('[name="email"]').value; // get sign in from form

        const response = await fetch(`${ $peace.users.API }send-sign-in-email`, {
          method: 'POST',
          credentials: 'include',
          withCredentials: true,
          body: JSON.stringify({ email: EMAIL }),
          headers: {
            'Content-Type': 'application/json'
          }
        })

        if (response.ok) return await response.json()
        else throw new Error('Network response was not OK')
      } catch (error) {
        console.error(error)
      }
    },
    async signIn () {
      try {
        const TOKEN = $peace.urlQueryParams.get().token // get token from url query params

        const response = await fetch(`${ $peace.users.API }sign-in`, { // verify sign in token
          method: 'POST',
          credentials: 'include',
          withCredentials: true,
          body: JSON.stringify({ token: TOKEN }),
          headers: {
            'Content-Type': 'application/json'
          }
        })

        if (response.ok) return await response.json()
        else throw new Error('Network response was not OK')
      } catch (error) {
        console.error(error)
      }
    },
    async signOut () {
      try {
        const response = await fetch(`${ $peace.users.API }sign-out`, {
          method: 'POST',
          credentials: 'include',
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json'
          }
        })

        if (response.ok) return await response.json()
        else throw new Error('Network response was not OK')
      } catch (error) {
        console.error(error)
      }
    },
    async getSessions () {
      try {
        const response = await fetch(`${ $peace.users.API }sessions`, {
          method: 'POST',
          credentials: 'include',
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json'
          }
        })

        if (response.ok) return await response.json()
        else throw new Error('Network response was not OK')
      } catch (error) {
        console.error(error)
      }
    }
  }
})
