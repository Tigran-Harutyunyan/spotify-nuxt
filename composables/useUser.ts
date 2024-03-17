import type { UserDetails, Subscription } from '@/types';

export const useUser = () => {
    const supabaseClient = useSupabaseClient();
    const user = useSupabaseUser();

    const userDetails = ref<UserDetails | null>(null);
    const subscription = ref<Subscription | null>(null);
    const isLoadingData = ref(false);

    const getUserDetails = () => supabaseClient.from('users').select('*').single();
    const getSubscription = () =>
        supabaseClient
            .from('subscriptions')
            .select('*, prices(*, products(*))')
            .in('status', ['trialing', 'active'])
            .single();

    watch(() => user.value, () => {
        if (user.value && !isLoadingData.value && !userDetails.value && !subscription.value) {
            isLoadingData.value = true;

            Promise.allSettled([getUserDetails(), getSubscription()]).then(
                (results) => {
                    const userDetailsPromise = results[0];
                    const subscriptionPromise = results[1];

                    if (userDetailsPromise.status === 'fulfilled' && userDetailsPromise.value.data) {
                        userDetails.value = userDetailsPromise.value.data as UserDetails;
                    }


                    if (subscriptionPromise.status === 'fulfilled' && subscriptionPromise.value.data) {
                        subscription.value = subscriptionPromise.value.data as Subscription;
                    }

                    isLoadingData.value = false

                }
            );
        } else if (!user && !isLoadingData) {
            userDetails.value = null;
            subscription.value = null;
        }
    });

    return {
        user,
        userDetails,
        isLoading: isLoadingData,
        subscription
    }
}