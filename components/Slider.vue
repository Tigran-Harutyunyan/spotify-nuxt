<script setup lang="ts">
import { Slider } from "@/components/ui/slider";
import { useMainStore } from "@/stores/main";

const { playerVolume } = storeToRefs(useMainStore());

const emit = defineEmits<{
  (e: "onChange", value: number): void;
}>();

interface SlideProps {
  value: number;
}

const { value } = withDefaults(defineProps<SlideProps>(), {
  value: 1,
});

const localValue = ref([value]);

const onUpdate = (volume) => {
  emit("onChange", volume[0]);
};

watch(
  () => playerVolume.value,
  (newVal) => {
    localValue.value = [playerVolume.value];
  }
);
</script>

<template>
  <Slider
    v-model="localValue"
    :default-value="[1]"
    :max="1"
    :step="0.1"
    label="Volume"
    @update:modelValue="onUpdate"
  />
</template>
