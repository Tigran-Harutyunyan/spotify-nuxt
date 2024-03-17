import { serverSupabaseClient } from "#supabase/server";

export default defineEventHandler(async (event) => {
    const client = await serverSupabaseClient(event);

    const params = await getQuery(event);

    const { data, error } = await client
        .from('songs')
        .select('*')
        .ilike('title', `%${params.title}%`)
        .order('created_at', { ascending: false })

    if (error) {
        console.log(error.message);
    }

    return (data as any) || [];

});