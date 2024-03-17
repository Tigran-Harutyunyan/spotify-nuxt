<script setup lang="ts">
import { cn } from "@/lib/utils";

const model = defineModel();
const emit = defineEmits(["change"]);

interface InputProps {
  className?: string;
  type: "text" | "email" | "file";
  disabled?: boolean;
  inputProps?: Object;
}

const { className, type, disabled } = withDefaults(defineProps<InputProps>(), {
  type: "text",
  disabled: false,
  className: "",
});

const onChange = (e) => {
  if (type === "file") {
    emit("change", e);
  }
};
</script>

<template>
  <input
    v-model="model"
    :type="type"
    v-bind="inputProps"
    @change="onChange"
    :class="
      cn(
        `
        flex 
        w-full 
        rounded-md 
        bg-neutral-700
        border
        border-transparent
        px-3 
        py-3 
        text-sm 
        file:border-0 
        file:bg-transparent 
        file:text-sm 
        file:font-medium 
        placeholder:text-neutral-400 
        disabled:cursor-not-allowed 
        disabled:opacity-50
        focus:outline-none
      `,
        disabled && 'opacity-75',
        className
      )
    "
    :disabled="disabled"
    ref="ref"
  />
</template>
