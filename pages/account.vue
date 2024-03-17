<script setup lang="ts">
import AccountContent from "@/components/account/AccountContent.vue";
definePageMeta({
  middleware: ["auth"],
});
</script>

<template>
  <div
    class="bg-neutral-900 rounded-lg h-full w-full overflow-hidden overflow-y-auto"
  >
    <Header class="from-bg-neutral-900">
      <div class="mb-2 flex flex-col gap-y-6">
        <h1 class="text-white text-3xl font-semibold">Account Settings</h1>
      </div>
    </Header>
    <AccountContent />
  </div>
</template>
