<script setup lang="ts">
import { DialogTitle, type DialogTitleProps } from "radix-vue";
import { cn } from "@/lib/utils";

const props = defineProps<DialogTitleProps & { class?: string }>();
</script>

<template>
  <DialogTitle
    v-bind="props"
    :class="cn('text-xl text-center font-bold mb-4', props.class)"
  >
    <slot />
  </DialogTitle>
</template>
