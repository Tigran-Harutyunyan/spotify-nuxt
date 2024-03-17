import { serverSupabaseClient } from "#supabase/server";

export default defineEventHandler(async (event) => {
    const client = await serverSupabaseClient(event);

    const params = await event.context.params;

    if (!params) {
        return [];
    }

    const { data, error } = await client
        .from('songs')
        .select('*')
        .eq('user_id', params?.userId as string)
        .order('created_at', { ascending: false })

    if (error) {
        console.log(error.message);
    }

    return (data as any) || [];

});