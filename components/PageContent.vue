<script setup lang="ts">
import { type Song } from "@/types";
import SongItem from "@/components/SongItem.vue";

interface PageContentProps {
  songs: Song[];
}

const { songs } = defineProps<PageContentProps>();

const onPlay = useOnPlay(songs);
</script>

<template>
  <div v-if="songs.length === 0" class="mt-4 text-neutral-400">
    No songs available.
  </div>

  <div
    class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-8 gap-4 mt-4"
  >
    <SongItem
      v-for="item in songs"
      @onClick="(id: string) => onPlay(id)"
      :key="item.id"
      :data="item"
    />
  </div>
</template>
