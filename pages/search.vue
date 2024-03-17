<script setup lang="ts">
import { type Song } from "@/types";

definePageMeta({
  middleware: ["auth"],
});

const params = useRoute();

const { data: songs, refresh } = await useAsyncData<Song[]>("serverData", () =>
  $fetch(`/api/songs/title?title=${params.query?.title || ""}`)
);

watch(
  () => params.query,
  () => {
    refresh();
  }
);
</script>

<template>
  <div
    class="bg-neutral-900 rounded-lg h-full w-full overflow-hidden overflow-y-auto"
  >
    <Header class="from-bg-neutral-900">
      <div class="mb-2 flex flex-col gap-y-6">
        <h1 class="text-white text-3xl font-semibold">Search</h1>
        <SearchInput />
      </div>
    </Header>
    <SearchContent :songs="songs || []" />
  </div>
</template>
