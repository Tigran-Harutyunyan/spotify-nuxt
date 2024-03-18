<script setup lang="ts">
import { useLoadSongUrl } from "@/composables/useLoadSongUrl";
import { usePlayer } from "@/stores/player";
import { useMainStore } from "@/stores/main";

const { onSongUrlChange } = useMainStore();

const { activeId } = storeToRefs(usePlayer());

const currentSong = ref();
const currentSongUrl = ref();

watch(
  () => activeId.value,
  async (newVal) => {
    if (!newVal) return;

    const song = await useGetSongById(newVal);
    currentSong.value = song.value;

    const songUrl = await useLoadSongUrl(currentSong.value!);
    currentSongUrl.value = songUrl;
    onSongUrlChange(songUrl);
  }
);
</script>

<template>
  <div
    v-if="currentSong && currentSongUrl && activeId"
    class="fixed bottom-0 bg-black w-full py-2 h-[80px] px-4"
  >
    <PlayerContent :song="currentSong" :songUrl="currentSongUrl">
      <div class="flex items-center gap-x-4" :key="currentSong.id">
        <MediaItem :data="currentSong" />
        <LikeButton :songId="String(currentSong.id)" />
      </div>
    </PlayerContent>
  </div>
</template>
