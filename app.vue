<script setup lang="ts">
import { UserContextProvider } from "@nuxtbase/auth-ui-vue";
import { Toaster } from "@/components/ui/sonner";

const supabaseClient = useSupabaseClient();
</script>
<template>
  <UserContextProvider :supabaseClient="supabaseClient">
    <NuxtLayout>
      <NuxtPage />
      <ClientOnly>
        <ModalsContainer />
        <Toaster position="top-center" />
      </ClientOnly>
    </NuxtLayout>
  </UserContextProvider>
</template>
