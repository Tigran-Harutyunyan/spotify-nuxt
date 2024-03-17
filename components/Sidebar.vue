<script setup lang="ts">
import { cn } from "@/lib/utils";

import HiHome from "@/components/ui/icons/HomeIcon.vue";
import BiSearch from "@/components/ui/icons/BiSearch.vue";

import { usePlayer } from "@/stores/player";
import { type Song } from "@/types";

interface SidebarProps {
  songs: Song[];
}

const { songs } = defineProps<SidebarProps>();

const pathname = useRoute().path;

const { activeId } = storeToRefs(usePlayer());

const routes = computed(() => [
  {
    icon: HiHome,
    label: "Home",
    active: pathname !== "/search",
    href: "/",
  },
  {
    icon: BiSearch,
    label: "Search",
    href: "/search",
    active: pathname === "/search",
  },
]);
</script>

<template>
  <div :class="cn('flex h-full', activeId && 'h-[calc(100%-80px)]')">
    <div class="hidden md:flex flex-col gap-y-2 bg-black h-full w-[300px] p-2">
      <Box>
        <div class="flex flex-col gap-y-4 px-5 py-4">
          <SidebarItem
            v-for="{ label, href, icon } in routes"
            :key="label"
            :icon="icon"
            :label="label"
            :href="href"
          />
        </div>
      </Box>
      <Box class="overflow-y-auto h-full">
        <Library :songs="songs" />
      </Box>
    </div>
    <main class="h-full flex-1 overflow-y-auto py-2"><slot /></main>
  </div>
</template>
