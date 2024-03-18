<script setup lang="ts">
import {
  DialogClose,
  DialogContent,
  type DialogContentEmits,
  type DialogContentProps,
  DialogOverlay,
  DialogPortal,
  useEmitAsProps,
} from "radix-vue";
import { X } from "lucide-vue-next";
import { cn } from "@/lib/utils";

const props = defineProps<DialogContentProps & { class?: string }>();
const emits = defineEmits<DialogContentEmits>();

const emitsAsProps = useEmitAsProps(emits);
</script>

<template>
  <DialogPortal>
    <DialogOverlay class="bg-neutral-900/90 backdrop-blur-sm fixed inset-0" />
    <DialogContent
      :class="
        cn(
          `fixed 
            drop-shadow-md 
            border 
            border-neutral-700 
            top-[50%] 
            left-[50%] 
            max-h-full 
            h-full 
            md:h-auto 
            md:max-h-[85vh] 
            w-full 
            md:w-[90vw] 
            md:max-w-[450px] 
            translate-x-[-50%] 
            translate-y-[-50%] 
            rounded-md 
            bg-neutral-800 
            p-[25px] 
            focus:outline-none
            `,
          props.class
        )
      "
      v-bind="{ ...props, ...emitsAsProps }"
    >
      <slot />

      <DialogClose
        class="absolute top-3 right-3 p-0.5 transition-colors rounded-md hover:bg-secondary"
      >
        <X class="w-4 h-4" />
        <span class="sr-only">Close</span>
      </DialogClose>
    </DialogContent>
  </DialogPortal>
</template>
