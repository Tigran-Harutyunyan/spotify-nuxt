import { defineStore } from "pinia";

export const usePlayer = defineStore("player", () => {
  const ids = ref<string[]>([]);

  const activeId = ref<string | undefined>(undefined);

  const setId = (id: string) => activeId.value = id;

  const setIds = (idds: string[]) => ids.value = idds;

  const reset = () => {
    activeId.value = undefined;
    ids.value = [];
  }

  return {
    ids,
    activeId,
    setId,
    setIds,
    reset
  };
});
