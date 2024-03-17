<script setup lang="ts">
import { type Song } from "@/types";
import { useMainStore } from "@/stores/main";

const { addSongCount } = storeToRefs(useMainStore());

const {
  data: songs,
  refresh,
  error,
  pending,
} = await useAsyncData<Song[]>("serverData", () => $fetch(`/api/songs`));

watch(
  () => addSongCount.value,
  () => {
    refresh();
  }
);
</script>

<template>
  <Box class="h-full flex items-center justify-center" v-if="error">
    <div class="text-neutral-400">Something went wrong.</div>
  </Box>
  <div
    v-if="!error"
    class="bg-neutral-900 md:rounded-lg h-full w-full overflow-hidden overflow-y-auto"
  >
    <Header>
      <div class="mb-2">
        <h1 class="text-white text-3xl font-semibold">Welcome back</h1>
        <div
          class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-3 mt-4"
        >
          <ListItem
            name="Liked Songs"
            image="/images/liked.png"
            href="/liked"
          />
        </div>
      </div>
    </Header>
    <div class="mt-2 mb-7 px-6">
      <div class="flex justify-between items-center">
        <h1 class="text-white text-2xl font-semibold">Newest songs</h1>
      </div>
      <PageContent :songs="songs" v-if="songs" />
    </div>
  </div>
</template>
