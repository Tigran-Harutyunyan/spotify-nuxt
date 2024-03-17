<script setup lang="ts">
import AiFillStepBackward from "@/components/ui/icons/AiFillStepBackward.vue";
import AiFillStepForward from "@/components/ui/icons/AiFillStepForward.vue";
import BsPauseFill from "@/components/ui/icons/BsPauseFill.vue";
import BsPlayFill from "@/components/ui/icons/BsPlayFill.vue";
import HiSpeakerXMark from "@/components/ui/icons/HiSpeakerXMark.vue";
import HiSpeakerWave from "@/components/ui/icons/HiSpeakerWave.vue";

import { useSound } from "@vueuse/sound";

import { type Song } from "@/types";

interface PlayerContentProps {
  song: Song;
  songUrl: string;
}

const { song, songUrl } = defineProps<PlayerContentProps>();

const player = usePlayer();
const volume = ref(1);
const isPlaying = ref(false);

const Icon = computed(() => {
  return isPlaying.value ? BsPauseFill : BsPlayFill;
});

const onPlayNext = () => {
  if (player.ids.length === 0) {
    return;
  }

  const currentIndex = computed(() => {
    return player.ids.findIndex((id) => id === player.activeId);
  });

  const nextSong = computed(() => {
    return player.ids[currentIndex.value + 1];
  });

  if (!nextSong.value) {
    return player.setId(player.ids[0]);
  }

  player.setId(nextSong.value);
};

const onPlayPrevious = () => {
  if (player.ids.length === 0) {
    return;
  }

  const currentIndex = player.ids.findIndex((id) => id === player.activeId);
  const previousSong = player.ids[currentIndex - 1];

  if (!previousSong) {
    return player.setId(player.ids[player.ids.length - 1]);
  }

  player.setId(previousSong);
};

const { play, pause, sound } = useSound(songUrl, {
  volume: volume.value,
  onplay: () => (isPlaying.value = true),
  onend: () => {
    isPlaying.value = false;
    onPlayNext();
  },
  onpause: () => (isPlaying.value = false),
  format: ["mp3"],
});

const handlePlay = () => {
  if (!isPlaying.value) {
    play();
  } else {
    pause();
  }
};

const toggleMute = () => {
  if (volume.value === 0) {
    volume.value = 1;
  } else {
    volume.value = 0;
  }
};

watch(
  () => sound.value,
  () => {
    sound.value?.play();
  }
);
</script>

<template>
  <div class="grid grid-cols-2 md:grid-cols-3 h-full">
    <div class="flex w-full justify-start">
      <div class="flex items-center gap-x-4">
        <MediaItem :data="song" />
        <LikeButton :songId="song.id" />
      </div>
    </div>

    <div class="flex md:hidden col-auto w-full justify-end items-center">
      <div
        @click="handlePlay"
        class="h-10 w-10 flex items-center justify-center rounded-full bg-white p-1 cursor-pointer"
      >
        <component :is="Icon" class="text-black h-[30px] w-[30px]" />
      </div>
    </div>

    <div
      class="hidden h-full md:flex justify-center items-center w-full max-w-[722px] gap-x-6"
    >
      <AiFillStepBackward
        @click="onPlayPrevious"
        class="text-neutral-400 cursor-pointer hover:text-white transition h-[30px] w-[30px]"
      />
      <div
        @click="handlePlay"
        class="flex items-center justify-center h-10 w-10 rounded-full bg-white p-1 cursor-pointer"
      >
        <component :is="Icon" class="text-black h-[30px] w-[30px]" />
      </div>
      <AiFillStepForward
        @click="onPlayNext"
        class="text-neutral-400 cursor-pointer hover:text-white transition h-[30px] w-[30px]"
      />
    </div>

    <div class="hidden md:flex w-full justify-end pr-2">
      <div class="flex items-center gap-x-2 w-[120px]">
        <component
          :is="volume === 0 ? HiSpeakerXMark : HiSpeakerWave"
          @click="toggleMute"
          class="cursor-pointer h-[34px] w-[34px]"
        />
        <Slider :value="volume" @onChange="(value) => (volume = value)" />
      </div>
    </div>
  </div>
</template>
