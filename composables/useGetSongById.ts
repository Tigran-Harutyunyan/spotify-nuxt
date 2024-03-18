import { type Song } from "@/types";
import { toast } from "vue-sonner";

export const useGetSongById = async (id: string) => {

    const client = useSupabaseClient()
    const isLoading = ref(false);
    const song = ref<Song | undefined>(undefined);

    isLoading.value = true;

    const { data, error } = await client
        .from('songs')
        .select('*')
        .eq('id', id)
        .single();

    if (error) {
        isLoading.value = false;
        return toast.error(error.message);
    }

    song.value = data as Song;
    isLoading.value = false;

    return song;
};
