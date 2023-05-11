import { defineStore } from 'pinia'
import { Howl } from 'howler'

import helper from '@/includes/helper'

export default defineStore('player', {
  state: () => ({
    current_song: {},
    sound: {},
    seek: '00:00',
    duration: '00:00'
  }),
  actions: {
    async newSong(song) {
      this.current_song = song

      this.sound = new Howl({
        src: [song.url],
        html5: true
      })

      this.sound.play()

      // listen event playing
      this.sound.on('play', () => {
        // requestAnimationFrame() working like interval function
        // execute the function passed into it
        // get call before the next frame paint on the screen
        requestAnimationFrame(this.progress)
      })
    },
    progress() {
      this.seek = helper.formatTime(this.sound.seek())
      this.duration = helper.formatTime(this.sound.duration())

      // recursive to continuously dispatch playing time
      if (this.sound.playing()) {
        requestAnimationFrame(this.progress)
      }
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
