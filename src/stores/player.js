import { defineStore } from 'pinia'
import { Howl } from 'howler'

export default defineStore('player', {
  state: () => ({
    current_song: {},
    sound: {}
  }),
  actions: {
    async newSong(song) {
      this.current_song = song

      this.sound = new Howl({
        src: [song.url],
        html5: true
      })

      this.sound.play()
    },
    async toggleAudio() {
      // check if Howl Object created or not
      if (!this.sound.playing) {
        return
      }

      // check if song is playing. Result return is boolean
      if (this.sound.playing()) {
        // pause audio
        this.sound.pause()
      } else {
        // play audio
        this.sound.play()
      }
    }
  },
  getters: {
    playing: (state) => {
      if (state.sound.playing) {
        return state.sound.playing()
      }
      return false
    }
  }
})
