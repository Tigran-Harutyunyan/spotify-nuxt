<script setup lang="ts">
import { UserContextProvider } from "@nuxtbase/auth-ui-vue";
const supabaseClient = useSupabaseClient();
</script>
<template>
  <UserContextProvider :supabaseClient="supabaseClient">
    <NuxtLayout>
      <NuxtPage />
      <ClientOnly>
        <ModalsContainer />
        <Toaster />
      </ClientOnly>
    </NuxtLayout>
  </UserContextProvider>
</template>
