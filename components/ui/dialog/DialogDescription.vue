<script setup lang="ts">
import { DialogDescription, type DialogDescriptionProps } from "radix-vue";
import { cn } from "@/lib/utils";

const props = defineProps<DialogDescriptionProps & { class?: string }>();
</script>

<template>
  <DialogDescription
    v-bind="props"
    :class="cn('mb-5 text-sm leading-normal text-center', props.class)"
  >
    <slot />
  </DialogDescription>
</template>
