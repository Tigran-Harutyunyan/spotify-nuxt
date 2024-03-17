import { serverSupabaseClient } from "#supabase/server";

export default defineEventHandler(async (event) => {
    const client = await serverSupabaseClient(event);

    const { data: sessionData, error: sessionError } = await client.auth.getSession();

    if (sessionError) {
        console.log(sessionError.message);
        return [];
    }


    const { data, error } = await client
        .from('songs')
        .select('*')
        .eq('user_id', sessionData?.session?.user.id as string)
        .order('created_at', { ascending: false })

    if (error) {
        console.log(error.message);
    }

    return (data as any) || [];

});