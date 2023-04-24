import { defineStore } from 'pinia'
import { auth, usersCollection } from '@/includes/firebase'

export default defineStore('user', {
  state: () => ({
    userLoggedIn: false
  }),
  actions: {
    async register(values) {
      const userCred = await auth.createUserWithEmailAndPassword(values.email, values.password)

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
    }
  }
})
