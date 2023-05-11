import { defineStore } from 'pinia'
import { Howl } from 'howler'

import helper from '@/includes/helper'

export default defineStore('player', {
  state: () => ({
    current_song: {},
    sound: {},
    seek: '00:00',
    duration: '00:00',
    playerProgress: '0%'
  }),
  actions: {
    async newSong(song) {
      // pause and destroy song to prevent multiple click
      if (this.sound instanceof Howl) {
        this.sound.unload()
      }

      // add song to play
      this.current_song = song

      this.sound = new Howl({
        src: [song.url],
        html5: true
      })

      // play song
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

      this.playerProgress = (this.sound.seek() / this.sound.duration()) * 100 + '%'

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
    },
    updateSeek(event) {
      if (!this.sound.playing) {
        return
      }

      // define distance progress bar to the Viewport and get progress bar width
      const { x, width } = event.currentTarget.getBoundingClientRect()

      // define and correct the right position of mouse click
      const clickX = event.clientX - x

      // define time to start playing song
      const percentage = clickX / width
      const seconds = this.sound.duration() * percentage
      this.sound.seek(seconds)

      // Listen for the seek event to dynamically update the progress bar
      this.sound.once('seek', this.progress)
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
