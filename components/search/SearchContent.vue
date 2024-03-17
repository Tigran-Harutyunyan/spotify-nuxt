<script setup lang="ts">
import { type Song } from "@/types";

interface SearchContentProps {
  songs: Song[];
}

const { songs } = defineProps<SearchContentProps>();

const onPlay = useOnPlay(songs);
</script>

<template>
  <div
    v-if="songs.length === 0"
    class="flex flex-col gap-y-2 w-full px-6 text-neutral-400"
  >
    No songs found.
  </div>

  <div v-else class="flex flex-col gap-y-2 w-full px-6">
    <div
      v-for="song in songs"
      :key="song.id"
      class="flex items-center gap-x-4 w-full"
    >
      <div class="flex-1">
        <MediaItem @onClick="(id: string) => onPlay(id)" :data="song" />
      </div>
      <LikeButton :songId="song.id" />
    </div>
  </div>
</template>
