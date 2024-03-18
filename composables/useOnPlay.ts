import { type Song } from "@/types";
import { usePlayer } from "@/stores/player";
import { useModalsStore } from "@/stores/modals";

export const useOnPlay = (songs: Song[]) => {

    const { setId, setIds } = usePlayer();

    const { onOpen } = useModalsStore();

    const { subscription, user } = useUser();

    const onPlay = (id: string) => {

        if (!user.value) {
            return onOpen('auth');
        }

        // if (!subscription.value) {
        //     return onOpen('subscribe');
        // }

        setId(id);
        setIds(songs.map((song) => song.id));
    }

    return onPlay;
};