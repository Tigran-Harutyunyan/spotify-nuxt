<script setup lang="ts">
import TbPlaylist from "@/components/ui/icons/TbPlaylist.vue";
import AiOutlinePlus from "@/components/ui/icons/AiOutlinePlus.vue";
import { type Song } from "@/types";

import { useModalsStore } from "@/stores/modals";
const { onOpen } = useModalsStore();

interface LibraryProps {
  songs: Song[];
}

const { songs } = defineProps<LibraryProps>();

const onPlay = useOnPlay(songs);

const { user, subscription } = useUser();

const onClick = () => {
  if (!user) {
    return onOpen("auth");
  }
  // if (!subscription) {
  //   return onOpen("subscribe");
  // }
  return onOpen("upload");
};
</script>

<template>
  <div class="flex flex-col">
    <div class="flex items-center justify-between px-5 pt-4">
      <div class="inline-flex items-center gap-x-2">
        <TbPlaylist class="text-neutral-400 h-[26px] w-[26px]" />
        <p class="text-neutral-400 font-medium text-md">Your Library</p>
      </div>
      <AiOutlinePlus
        @click="onClick"
        class="text-neutral-400 cursor-pointer hover:text-white transition h-[20px] w-[20px]"
      />
    </div>
    <div class="flex flex-col gap-y-2 mt-4 px-3">
      <MediaItem
        v-for="item in songs"
        @click="(id: string) => onPlay(id)"
        :key="item.id"
        :data="item"
      />
    </div>
  </div>
</template>
