import { defineStore } from 'pinia'
import { auth, usersCollection } from '@/includes/firebase'

export default defineStore('user', {
  state: () => ({
    userLoggedIn: false
  }),
  actions: {
    async register(values) {
      //signup
      const userCred = await auth.createUserWithEmailAndPassword(values.email, values.password)

      // pass data to user info keeping auth id
      await usersCollection.doc(userCred.user.uid).set({
        name: values.name,
        age: values.age,
        email: values.email,
        country: values.country
      })

      await userCred.user.updateProfile({
        displayName: values.name
      })

      this.userLoggedIn = true
    },
    // login
    async authenticate(values) {
      await auth.signInWithEmailAndPassword(values.email, values.password)
      this.userLoggedIn = true
    },
    //logout
    async signOut() {
      await auth.signOut()
      this.userLoggedIn = false
      window.location.reload()
    }
  }
})
