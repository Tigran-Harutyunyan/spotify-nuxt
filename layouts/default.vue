<script setup lang="ts">
import Sidebar from "@/components/Sidebar.vue";
import Player from "@/components/Player.vue";

import { type Song } from "@/types";
import { useMainStore } from "@/stores/main";

useHead({
  title: "Spotify clone",
});

definePageMeta({
  title: "Spotify clone",
  description: "Listen to music",
});

useSeoMeta({
  title: "Spotify clone",
  description: "Listen to music",
});

const { addSongCount } = storeToRefs(useMainStore());

const { user } = useUser();

const { data: songs, refresh } = await useAsyncData<Song[]>(
  "sidebar-songs",
  () => $fetch(`/api/songs/user/${user?.value?.id}`)
);

watch(
  () => addSongCount.value,
  () => {
    refresh();
  }
);
</script>

<template>
  <div class="flex h-full">
    <Sidebar :songs="songs" />

    <main class="h-full flex-1 overflow-y-auto py-2 md:pr-2">
      <slot />
    </main>
    <Player />
  </div>
</template>
