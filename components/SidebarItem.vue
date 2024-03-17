<script setup lang="ts">
import { cn } from "@/lib/utils";

interface SidebarItemProps {
  icon: any;
  label: string;
  active?: boolean;
  href: string;
}

const { icon, label, active, href } = defineProps<SidebarItemProps>();
</script>

<template>
  <NuxtLink
    :to="href"
    :class="
      cn(
        `
        flex 
        flex-row 
        h-auto 
        items-center 
        w-full 
        gap-x-4 
        text-md 
        font-medium
        cursor-pointer
        hover:text-white
        transition
        text-neutral-400
        py-1`,
        active && 'text-white'
      )
    "
  >
    <component :is="icon" class="h-[26px] w-[26px]" />
    <p class="truncate w-100">{{ label }}</p>
  </NuxtLink>
</template>
