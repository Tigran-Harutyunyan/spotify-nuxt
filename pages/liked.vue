<script setup lang="ts">
import { type Song } from "@/types";
import LikedContent from "@/components/liked/LikedContent.vue";

const data = await $fetch("/api/songs/liked");

const songs = computed(() => {
  if (!data) return [];

  if (
    Array.isArray(data) &&
    data?.[0]?.songs &&
    typeof data[0]?.songs === "object"
  ) {
    return [data[0]?.songs];
  }

  return data[0]?.songs;
});
</script>

<template>
  <Box class="h-full flex items-center justify-center" v-if="error">
    <div class="text-neutral-400">Something went wrong.</div>
  </Box>
  <template v-else>
    <div
      class="bg-neutral-900 rounded-lg h-full w-full overflow-hidden overflow-y-auto"
    >
      <Header>
        <div class="mt-20">
          <div class="flex flex-col md:flex-row items-center gap-x-5">
            <div class="relative h-32 w-32 lg:h-44 lg:w-44">
              <img
                class="object-cover"
                fill
                src="/images/liked.png"
                alt="Playlist"
              />
            </div>
            <div class="flex flex-col gap-y-2 mt-4 md:mt-0">
              <p class="hidden md:block font-semibold text-sm">Playlist</p>
              <h1 class="text-white text-4xl sm:text-5xl lg:text-7xl font-bold">
                Liked Songs
              </h1>
            </div>
          </div>
        </div>
      </Header>
      <ClientOnly>
        <LikedContent :songs="songs" />
      </ClientOnly>
    </div>
  </template>
</template>
