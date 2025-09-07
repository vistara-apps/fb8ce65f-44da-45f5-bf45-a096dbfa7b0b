import { createClient } from '@supabase/supabase-js';
import { RightsModule, Template, User } from '@/types';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Rights modules operations
export async function getRightsModules(): Promise<RightsModule[]> {
  const { data, error } = await supabase
    .from('rights_modules')
    .select('*')
    .order('title');

  if (error) {
    console.error('Error fetching rights modules:', error);
    return [];
  }

  return data || [];
}

export async function getRightsModuleById(id: string): Promise<RightsModule | null> {
  const { data, error } = await supabase
    .from('rights_modules')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    console.error('Error fetching rights module:', error);
    return null;
  }

  return data;
}

export async function searchRightsModules(query: string): Promise<RightsModule[]> {
  const { data, error } = await supabase
    .from('rights_modules')
    .select('*')
    .or(`title.ilike.%${query}%,summary.ilike.%${query}%,tags.cs.{${query}}`)
    .order('title');

  if (error) {
    console.error('Error searching rights modules:', error);
    return [];
  }

  return data || [];
}

// Templates operations
export async function getTemplates(): Promise<Template[]> {
  const { data, error } = await supabase
    .from('templates')
    .select('*')
    .order('title');

  if (error) {
    console.error('Error fetching templates:', error);
    return [];
  }

  return data || [];
}

export async function getTemplateById(id: string): Promise<Template | null> {
  const { data, error } = await supabase
    .from('templates')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    console.error('Error fetching template:', error);
    return null;
  }

  return data;
}

export async function searchTemplates(query: string): Promise<Template[]> {
  const { data, error } = await supabase
    .from('templates')
    .select('*')
    .or(`title.ilike.%${query}%,category.ilike.%${query}%`)
    .order('title');

  if (error) {
    console.error('Error searching templates:', error);
    return [];
  }

  return data || [];
}

// User operations
export async function getUserByFID(fID: string): Promise<User | null> {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('fID', fID)
    .single();

  if (error) {
    if (error.code === 'PGRST116') {
      // User not found, return null
      return null;
    }
    console.error('Error fetching user:', error);
    return null;
  }

  return data;
}

export async function createUser(user: User): Promise<User | null> {
  const { data, error } = await supabase
    .from('users')
    .insert([user])
    .select()
    .single();

  if (error) {
    console.error('Error creating user:', error);
    return null;
  }

  return data;
}

export async function updateUser(fID: string, updates: Partial<User>): Promise<User | null> {
  const { data, error } = await supabase
    .from('users')
    .update(updates)
    .eq('fID', fID)
    .select()
    .single();

  if (error) {
    console.error('Error updating user:', error);
    return null;
  }

  return data;
}

export async function saveRightsModule(fID: string, moduleId: string): Promise<boolean> {
  const user = await getUserByFID(fID);
  if (!user) return false;

  const updatedSavedRights = [...user.savedRights, moduleId];
  const updatedUser = await updateUser(fID, { savedRights: updatedSavedRights });
  
  return updatedUser !== null;
}

export async function unsaveRightsModule(fID: string, moduleId: string): Promise<boolean> {
  const user = await getUserByFID(fID);
  if (!user) return false;

  const updatedSavedRights = user.savedRights.filter(id => id !== moduleId);
  const updatedUser = await updateUser(fID, { savedRights: updatedSavedRights });
  
  return updatedUser !== null;
}
