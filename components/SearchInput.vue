<script setup lang="ts">
import qs from "query-string";
import { useDebounceFn } from "@vueuse/core";

const router = useRouter();
const query = useRoute().query;
const search = ref<string>((query.title as string) || "");

const debouncedFn = useDebounceFn(() => {
  const query = {
    title: search.value,
  };

  const url = qs.stringifyUrl({
    url: "/search",
    query,
  });

  router.push(url);
}, 500);
</script>

<template>
  <Input
    placeholder="What do you want to listen to?"
    v-model="search"
    @input="debouncedFn"
  />
</template>
