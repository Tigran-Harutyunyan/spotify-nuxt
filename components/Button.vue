<script setup lang="ts">
import { cn } from "@/lib/utils";
const { className, disabled, type } = withDefaults(
  defineProps<{
    className?: string;
    disabled?: boolean;
    type?: "button" | "submit";
  }>(),
  {
    type: "button",
  }
);
</script>

<template>
  <button
    :type="type"
    :class="
      cn(
        `
        w-full 
        rounded-full 
        bg-green-500
        border
        border-transparent
        px-3 
        py-3 
        disabled:cursor-not-allowed 
        disabled:opacity-50
        text-black
        font-bold
        hover:opacity-75
        transition
      `,
        disabled && 'opacity-75 cursor-not-allowed',
        className
      )
    "
    :disabled="disabled"
  >
    <slot />
  </button>
</template>
