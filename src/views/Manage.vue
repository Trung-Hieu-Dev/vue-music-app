<template>
  <main>
    <!-- Main Content -->
    <section class="container mx-auto mt-6">
      <div class="md:grid md:grid-cols-3 md:gap-4">
        <!-- Upload File -->
        <div class="col-span-1">
          <AppUpload :addSong="addSong" />
        </div>
        <div class="col-span-2">
          <div class="bg-white rounded border border-gray-200 relative flex flex-col">
            <div class="px-6 pt-6 pb-5 font-bold border-b border-gray-200">
              <span class="card-title">My Songs</span>
              <i class="fa fa-compact-disc float-right text-green-400 text-2xl"></i>
            </div>
            <div class="p-6">
              <!-- Composition Items -->
              <CompositionItem
                v-for="(song, index) in songs"
                :key="song.docId"
                :song="song"
                :updateSong="updateSong"
                :removeSong="removeSong"
                :updateUnsavedFlag="updateUnsavedFlag"
                :index="index"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<script>
import { auth, songsCollection } from '@/includes/firebase'

import AppUpload from '@/components/Upload.vue'
import CompositionItem from '@/components/CompositionItem.vue'

export default {
  name: 'Manage',
  components: {
    AppUpload,
    CompositionItem
  },
  data() {
    return {
      songs: [],
      unsavedFlag: false
    }
  },
  methods: {
    addSong(document) {
      const song = {
        ...document.data(),
        docId: document.id
      }
      this.songs.push(song)
    },
    updateSong(index, values) {
      this.songs[index].modified_name = values.modified_name
      this.songs[index].genre = values.genre
    },
    removeSong(id) {
      this.songs.splice(id, 1)
    },
    updateUnsavedFlag(value) {
      this.unsavedFlag = value
    }
  },
  //getting songs list created by user from database
  async created() {
    const snapShot = await songsCollection.where('uid', '==', auth.currentUser.uid).get()

    snapShot.forEach(this.addSong)
  },
  // preventing to leave edit song without saving data
  beforeRouteLeave(to, from, next) {
    if (!this.unsavedFlag) {
      next()
    } else {
      let leave = confirm('Your changed is not complete. Are you sure to leave without saving?')
      next(leave)
    }
  }
}
</script>
