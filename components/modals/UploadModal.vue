<script setup lang="ts">
import { useModalsStore } from "@/stores/modals";

const { type, isOpen } = storeToRefs(useModalsStore());

const { onClose } = useModalsStore();

const isModalOpen = isOpen.value && type.value === "upload";
</script>

<template>
  <Modal
    title="Add a song"
    description="Upload an mp3 file"
    :show="isModalOpen"
    @close="onClose()"
  >
    <UploadMediaForm />
  </Modal>
</template>
