<template>
  <!-- Main Content -->
  <section class="container mx-auto mt-6">
    <div class="md:grid md:grid-cols-3 md:gap-4">
      <!-- Upload File -->
      <div class="col-span-1">
        <AppUpload />
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
              :index="index"
            />
          </div>
        </div>
      </div>
    </div>
  </section>
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
      songs: []
    }
  },
  methods: {
    updateSong(index, values) {
      this.songs[index].modified_name = values.modified_name
      this.songs[index].genre = values.genre
    }
  },
  //getting songs created by user
  async created() {
    const snapShot = await songsCollection.where('uid', '==', auth.currentUser.uid).get()

    snapShot.forEach((document) => {
      const song = {
        ...document.data(),
        docId: document.id
      }
      this.songs.push(song)
    })
  }
}
</script>
