<script setup lang="ts">
import { useModalsStore } from "@/stores/modals";

const { onOpen } = useModalsStore();

const router = useRouter();
const { isLoading, subscription, user } = useUser();
const loading = ref(false);

watchEffect(() => {
  if (!isLoading && !user) {
    router.replace("/");
  }
});

const redirectToCustomerPortal = async () => {
  isLoading.value = true;
  try {
    const url = await $fetch<string>("/api/create-portal-link", {
      method: "POST",
    });
    window.location.assign(url);
  } catch (error) {
    if (error) return alert((error as Error).message);
  }
  isLoading.value = false;
};
</script>

<template>
  <div class="mb-7 px-6">
    <div v-if="!subscription" class="flex flex-col gap-y-4">
      <p>No active plan.</p>
      <Button @click="onOpen('subscribe')" class="w-[300px]">
        Subscribe
      </Button>
    </div>

    <div v-if="subscription" class="flex flex-col gap-y-4">
      <p>
        You are currently on the
        <b> {{ subscription?.prices?.products?.name }} </b>
        plan.
      </p>
      <Button
        :disabled="loading || isLoading"
        @click="redirectToCustomerPortal"
      >
        Open customer portal
      </Button>
    </div>
  </div>
</template>

<style scoped>
button {
  width: 300px !important;
}
</style>
