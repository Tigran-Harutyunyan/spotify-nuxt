<script setup lang="ts">
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { Auth } from "@nuxtbase/auth-ui-vue";
import { useModalsStore } from "@/stores/modals";

const supabaseClient = useSupabaseClient();

const { type, isOpen } = storeToRefs(useModalsStore());

const { onClose } = useModalsStore();

const isModalOpen = isOpen.value && type.value === "auth";

const { user } = useUser();

const runtimeConfig = useRuntimeConfig();

watch(
  () => user.value,
  (newValue) => {
    if (newValue) {
      onClose();
    }
  }
);
</script>

<template>
  <Modal
    title="Welcome back"
    description="Login to your account."
    :show="isModalOpen"
    @close="onClose()"
  >
    <Auth
      :supabaseClient="supabaseClient"
      :providers="['google']"
      theme="dark"
      :magicLink="true"
      :redirectTo="runtimeConfig.public.appUrl"
      :appearance="{
        theme: ThemeSupa,
        variables: {
          default: {
            colors: {
              brand: '#404040',
              brandAccent: '#22c55e',
            },
          },
        },
      }"
    />
  </Modal>
</template>
