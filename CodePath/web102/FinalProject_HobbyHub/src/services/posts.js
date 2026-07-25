import { supabase } from "@/supabase/client";

export async function getPosts() {
  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data;
}

export async function getPostById(id) {
  const { data, error } = await supabase
    .from("posts")
    .select("*, comments(*)")
    .eq("id", id)
    .single();

  if (error) throw error;
  return data;
}

export async function createPost(post) {
  const { data, error } = await supabase
    .from("posts")
    .insert({
      title: post.title,
      content: post.content,
      image_url: post.imageUrl,
    })
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function updatePost(id, updates) {
  const { data, error } = await supabase
    .from("posts")
    .update({
      title: updates.title,
      content: updates.content,
      image_url: updates.imageUrl,
    })
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function deletePost(id) {
  const { error } = await supabase.from("posts").delete().eq("id", id);

  if (error) throw error;
}
