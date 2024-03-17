<script setup lang="ts">
import { type Song } from "@/types";

const emit = defineEmits(["onClick"]);
interface SongItemProps {
  data: Song;
}
const { data } = defineProps<SongItemProps>();

const imagePath = useLoadImage(data);
</script>

<template>
  <div
    @click="emit('onClick', data.id)"
    class="relative group flex flex-col items-center justify-center rounded-md overflow-hidden gap-x-4 bg-neutral-400/5 cursor-pointer hover:bg-neutral-400/10 transition p-3"
  >
    <div
      class="relative aspect-square w-full h-full rounded-md overflow-hidden"
    >
      <NuxtImg
        class="object-cover"
        :src="imagePath || '/images/music-placeholder.png'"
        fill
        alt="Image"
      />
    </div>
    <div class="flex flex-col items-start w-full pt-4 gap-y-1">
      <p class="font-semibold truncate w-full">
        {{ data.title }}
      </p>
      <p class="text-neutral-400 text-sm pb-4 w-full truncate">
        By {{ data.author }}
      </p>
    </div>
    <div class="absolute bottom-24 right-5">
      <PlayButton />
    </div>
  </div>
</template>
