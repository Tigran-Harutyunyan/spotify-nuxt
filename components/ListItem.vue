<script setup lang="ts">
import FaPlay from "@/components/ui/icons/FaPlay.vue";
import { useModalsStore } from "@/stores/modals";

const { onOpen } = useModalsStore();

interface ListItemProps {
  image: string;
  name: string;
  href: string;
}

const { name, image, href } = defineProps<ListItemProps>();
const router = useRouter();
const user = useUser();

const onClick = () => {
  if (!user) {
    return onOpen("auth");
  }
  router.push(href);
};
</script>

<template>
  <button
    @click="onClick"
    class="relative group flex items-center rounded-md overflow-hidden gap-x-4 bg-neutral-100/10 cursor-pointer hover:bg-neutral-100/20 transition pr-4"
  >
    <div class="relative h-[64px] w-[64px]">
      <img class="object-cover" :src="image" fill alt="Image" />
    </div>
    <p class="font-medium truncate py-5">
      {{ name }}
    </p>
    <div
      class="absolute transition opacity-0 rounded-full flex items-center justify-center bg-green-500 p-4 drop-shadow-md right-5 group-hover:opacity-100 hover:scale-110"
    >
      <FaPlay class="text-black" />
    </div>
  </button>
</template>
