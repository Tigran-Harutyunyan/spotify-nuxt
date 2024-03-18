import { defineStore } from "pinia";

export const useMainStore = defineStore("main", () => {
    const addSongCount = ref(); // for triggering
    const newUrl = ref('');

    const onAddSong = async () => {
        addSongCount.value++;
    }

    const onSongUrlChange = async (url: string) => {
        newUrl.value = url;
    }

    return {
        addSongCount,
        newUrl,
        onAddSong,
        onSongUrlChange
    };
});