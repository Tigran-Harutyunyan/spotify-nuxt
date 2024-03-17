<template>
  <TransitionRoot appear :show="isOpen" as="template">
    <Dialog as="div" class="relative z-10" @close="closeModal">
      <TransitionChild
        as="template"
        enter="duration-300 ease-out"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="duration-200 ease-in"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div class="fixed inset-0 bg-neutral-900/90 backdrop-blur-sm" />
      </TransitionChild>

      <div class="fixed inset-0 overflow-y-auto">
        <div
          class="flex min-h-full items-center justify-center p-0 sm:p-4 text-center"
        >
          <TransitionChild
            as="template"
            enter="duration-300 ease-out"
            enter-from="opacity-0 scale-95"
            enter-to="opacity-100 scale-100"
            leave="duration-200 ease-in"
            leave-from="opacity-100 scale-100"
            leave-to="opacity-0 scale-95"
          >
            <DialogPanel
              class="w-full max-w-full h-screen sm:h-full sm:max-w-md transform sm:overflow-hidden sm:rounded-2xl rounded-md bg-neutral-800 text-left align-middle shadow-xl transition-all overflow-auto drop-shadow-md border border-neutral-700"
              :class="styles"
            >
              <DialogTitle
                as="h3"
                class="flex items-center rounded-t px-2 py-2 mt-4 justify-center relative w-full"
              >
                <span
                  class="p-1 border-0 hover:opacity-70 transition absolute right-5"
                  @click="closeModal"
                >
                  <ModalCloseIcon
                    class="w-[18px] h-[18px] hover:opacity-80 cursor-pointer"
                  />
                </span>
                <span class="text-lg text-center font-semibold">{{
                  title
                }}</span>
              </DialogTitle>
              <DialogDescription>
                <p class="text-center text-sm">{{ description }}</p>
              </DialogDescription>
              <div class="p-6"><slot /></div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script setup lang="ts">
import {
  TransitionRoot,
  TransitionChild,
  Dialog,
  DialogPanel,
  DialogTitle,
  DialogDescription,
} from "@headlessui/vue";
import ModalCloseIcon from "~/components/ui/icons/ModalCloseIcon.vue";

const emit = defineEmits<{
  close: [];
}>();

const { isOpen, title, styles } = defineProps<{
  isOpen?: boolean;
  title?: string;
  styles?: string;
  description?: string;
}>();

function closeModal() {
  emit("close");
}
</script>
