<script setup lang="ts">
import { cn } from "@/lib/utils";

import HiHome from "@/components/ui/icons/HomeIcon.vue";
import BiSearch from "@/components/ui/icons/BiSearch.vue";
import RxCaretLeft from "@/components/ui/icons/RxCaretLeft.vue";
import RxCaretRight from "@/components/ui/icons/RxCaretRight.vue";
import FaUserAlt from "@/components/ui/icons/FaUserAlt.vue";

import { useModalsStore } from "@/stores/modals";
import { toast } from "vue-sonner";

interface HeaderProps {
  className?: string;
}
const { className } = defineProps<HeaderProps>();

const { onOpen } = useModalsStore();

const router = useRouter();

const player = usePlayer();

const supabaseClient = useSupabaseClient();

const { user } = useUser();

const handleLogout = async () => {
  const { error } = await supabaseClient.auth.signOut();

  player.reset();

  if (error) {
    toast.error(error?.message);
  }
};
</script>

<template>
  <div :class="cn('h-fit bg-gradient-to-b from-emerald-800 p-6', className)">
    <div class="w-full mb-4 flex items-center justify-between">
      <div class="hidden md:flex gap-x-2 items-center">
        <button
          @click="router.back()"
          class="rounded-full bg-black flex items-center justify-center cursor-pointer hover:opacity-75 transition"
        >
          <RxCaretLeft class="text-white h-[35px] w-[35px]" />
        </button>
        <button
          @click="router.forward()"
          class="rounded-full bg-black flex items-center justify-center cursor-pointer hover:opacity-75 transition"
        >
          <RxCaretRight class="text-white h-[35px] w-[35px]" />
        </button>
      </div>
      <div class="flex md:hidden gap-x-2 items-center">
        <button
          @click="router.push('/')"
          class="rounded-full p-2 bg-white flex items-center justify-center cursor-pointer hover:opacity-75 transition"
        >
          <HiHome class="text-black h-[20px] w-[20px]" />
        </button>
        <button
          @click="router.push('/search')"
          class="rounded-full p-2 bg-white flex items-center justify-center cursor-pointer hover:opacity-75 transition"
        >
          <BiSearch class="text-black h-[20px] w-[20px]" />
        </button>
      </div>
      <div class="flex justify-between items-center gap-x-4">
        <div v-if="user" class="flex gap-x-4 items-center">
          <Button @click="handleLogout" className="bg-white px-6 py-2 ">
            Logout
          </Button>
          <Button @click="router.push('/account')" className="bg-white">
            <FaUserAlt />
          </Button>
        </div>
        <template v-else>
          <div>
            <Button
              @click="onOpen('auth')"
              className="bg-transparent text-neutral-300 font-medium"
            >
              Sign up
            </Button>
          </div>
          <div>
            <Button @click="onOpen('auth')" className="bg-white px-6 py-2">
              Log in
            </Button>
          </div>
        </template>
      </div>
    </div>
    <slot />
  </div>
</template>
