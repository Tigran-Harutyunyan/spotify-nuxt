<script setup lang="ts">
import Sidebar from "@/components/Sidebar.vue";
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

const songs = ref<Song[]>([]);

const { addSongCount } = storeToRefs(useMainStore());

const { user } = useUser();

const { data: serverData, refresh } = await useAsyncData<Song[]>(
  "serverData",
  () => $fetch(`/api/songs/user/${user?.value?.id}`)
);

if (serverData.value && Array.isArray(serverData.value)) {
  songs.value = serverData.value;
}

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
  </div>
</template>
