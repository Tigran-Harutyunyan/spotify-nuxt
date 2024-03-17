<script setup lang="ts">
import { DialogClose } from "radix-vue";
import CloseDialogIcon from "./ui/icons/CloseDialogIcon.vue";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

const emit = defineEmits(["close"]);
interface ModalProps {
  show: boolean;
  title: string;
  description: string;
}
const { show, title, description } = withDefaults(defineProps<ModalProps>(), {
  show: false,
});
</script>

<template>
  <Dialog v-model:open="show">
    <DialogContent>
      <DialogClose as-child>
        <CloseDialogIcon @click="emit('close')"></CloseDialogIcon>
      </DialogClose>

      <DialogHeader class="pt-2 px-6">
        <DialogTitle>
          {{ title }}
        </DialogTitle>
        <DialogDescription>
          {{ description }}
        </DialogDescription>
      </DialogHeader>

      <slot />
    </DialogContent>
  </Dialog>
</template>
