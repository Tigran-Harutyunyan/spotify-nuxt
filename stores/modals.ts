import { defineStore } from "pinia";

export type ModalType = "auth" | "subscribe" | "upload";

export const useModalsStore = defineStore("modals", () => {
    const type = ref<ModalType | null>(null);
    const isOpen = ref(false);

    function onOpen(t: ModalType | null, d = {}) {
        isOpen.value = true;
        type.value = t;
    }

    function onClose() {
        type.value = null;
        isOpen.value = false;
    }
    return {
        isOpen,
        type,
        onClose,
        onOpen,
    };
});
