<script setup lang="ts">
import { cn } from "@/lib/utils";

interface BoxProps {
  className?: string;
}

const { className } = defineProps<BoxProps>();
</script>

<template>
  <div
    :class="
      cn(
        `
        bg-neutral-900 
        rounded-lg 
        h-fit 
        w-full
        `,
        className
      )
    "
  >
    <slot />
  </div>
</template>
