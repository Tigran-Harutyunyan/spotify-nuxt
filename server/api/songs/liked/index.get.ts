import { serverSupabaseClient } from "#supabase/server";

export default defineEventHandler(async (event) => {
    const client = await serverSupabaseClient(event);

    const { data: sessionData, error: sessionError } = await client.auth.getSession();

    const { data, error } = await client

        .from('liked_songs')
        .select('*, songs(*)')
        .eq('user_id', sessionData?.session?.user.id as string)
        .order('created_at', { ascending: false })

    if (error) {
        console.log(error.message);
    }

    return (data as any) || [];

});