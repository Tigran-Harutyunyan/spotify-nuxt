<script setup lang="ts">
import { type Song } from "@/types";
import SongItem from "./SongItem.vue";

const emit = defineEmits<{
  (e: "onClick", id: string): void;
}>();

interface MediaItemProps {
  data: Song;
}
const { data } = defineProps<MediaItemProps>();

const player = usePlayer();
const imageUrl = useLoadImage(data);

const handleClick = () => {
  player.setId(data.id);
};
</script>

<template>
  <div
    @click="handleClick"
    class="flex items-center gap-x-3 cursor-pointer hover:bg-neutral-800/50 w-full p-2 rounded-md"
  >
    <div class="relative rounded-md h-[48px] w-[48px] overflow-hidden">
      <NuxtImg
        fill
        :src="imageUrl || '/images/music-placeholder.png'"
        alt="MediaItem"
        class="object-cover"
      />
    </div>
    <div class="flex flex-col gap-y-1 overflow-hidden">
      <p class="text-white truncate">{{ data.title }}</p>
      <p class="text-neutral-400 text-sm truncate">By {{ data.author }}</p>
    </div>
  </div>
</template>
