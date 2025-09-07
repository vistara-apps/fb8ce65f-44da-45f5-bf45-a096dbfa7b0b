import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Helper functions for common operations
export async function getUserByFid(fid: string) {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('fid', fid)
    .single();
  
  if (error && error.code !== 'PGRST116') {
    console.error('Error fetching user:', error);
    return null;
  }
  
  return data;
}

export async function createUser(fid: string, walletAddress?: string) {
  const { data, error } = await supabase
    .from('users')
    .insert({ fid, wallet_address: walletAddress })
    .select()
    .single();
  
  if (error) {
    console.error('Error creating user:', error);
    return null;
  }
  
  return data;
}

export async function saveUserItem(userId: string, itemType: 'module' | 'template', itemId: string) {
  const { data, error } = await supabase
    .from('user_saves')
    .insert({ user_id: userId, item_type: itemType, item_id: itemId })
    .select()
    .single();
  
  if (error) {
    console.error('Error saving item:', error);
    return null;
  }
  
  return data;
}

export async function getUserSaves(userId: string) {
  const { data, error } = await supabase
    .from('user_saves')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });
  
  if (error) {
    console.error('Error fetching user saves:', error);
    return [];
  }
  
  return data;
}
