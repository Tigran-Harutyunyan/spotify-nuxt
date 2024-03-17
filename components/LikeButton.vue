<script setup lang="ts">
import { useModalsStore } from "@/stores/modals";
import AiOutlineHeart from "@/components/ui/icons/AiOutlineHeart.vue";
import AiFillHeart from "@/components/ui/icons/AiFillHeart.vue";
import { toast } from "vue-sonner";

interface LikeButtonProps {
  songId: string;
}

const { songId } = defineProps<LikeButtonProps>();

const supabaseClient = useSupabaseClient();

const { onOpen } = useModalsStore();

const isLiked = ref(false);

const { user } = await useUser();

const Icon = computed(() => {
  return isLiked.value ? AiFillHeart : AiOutlineHeart;
});

const fetchData = async () => {
  const { data, error } = await supabaseClient
    .from("liked_songs")
    .select("*")
    .eq("user_id", user.value?.id)
    .eq("song_id", songId)
    .single();

  if (!error && data) {
    isLiked.value = true;
  }
};

const handleLike = async () => {
  if (!user) {
    return onOpen("auth");
  }

  if (isLiked.value) {
    const { error } = await supabaseClient
      .from("liked_songs")
      .delete()
      .eq("user_id", user?.value?.id)
      .eq("song_id", songId);

    if (error) {
      toast.error(error?.message);
    } else {
      isLiked.value = false;
    }
  } else {
    const { error } = await supabaseClient.from("liked_songs").insert({
      song_id: songId,
      user_id: user?.value?.id,
    });

    if (error) {
      toast.error(error?.message);
    } else {
      isLiked.value = true;
      toast.success("Success");
    }
  }
};

onMounted(() => {
  fetchData();
});
</script>

<template>
  <button
    class="cursor-pointer hover:opacity-75 transition"
    @click="handleLike"
  >
    <component
      :is="Icon"
      :color="isLiked ? '#22c55e' : 'white'"
      class="w-[25px] h-[25px]"
    />
  </button>
</template>
