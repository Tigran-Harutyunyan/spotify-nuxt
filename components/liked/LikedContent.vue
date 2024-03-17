<script setup lang="ts">
import { type Song } from "@/types";
import LikeButton from "@/components/LikeButton.vue";

interface SearchContentProps {
  songs: Song[];
}

const { songs } = defineProps<SearchContentProps>();

const onPlay = useOnPlay(songs);
</script>

<template>
  <div v-if="!songs" class="flex flex-col gap-y-2 w-full px-6 text-neutral-400">
    No liked songs.
  </div>

  <div v-if="songs" class="flex flex-col gap-y-2 w-full px-6">
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
