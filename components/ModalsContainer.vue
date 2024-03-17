<script setup lang="ts">
import { useModalsStore } from "@/stores/modals";

const { type } = storeToRefs(useModalsStore());

import AuthModal from "@/components/modals/AuthModal.vue";
import UploadModal from "@/components/modals/UploadModal.vue";

const computedComponent = computed(() => {
  if (type.value !== null) {
    switch (type.value) {
      case "auth":
        return AuthModal;
      case "upload":
        return UploadModal;
    }
  }

  return null;
});
</script>

<template>
  <component :is="computedComponent" />
</template>
