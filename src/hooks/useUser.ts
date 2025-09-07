import { useState, useEffect, useCallback } from 'react';
import { User } from '@/types';
import { getUserByFID, createUser, updateUser, saveRightsModule, unsaveRightsModule } from '@/lib/supabase';

export function useUser(fID?: string) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Load user data
  const loadUser = useCallback(async (userFID: string) => {
    setIsLoading(true);
    setError(null);

    try {
      let userData = await getUserByFID(userFID);
      
      // If user doesn't exist, create a new one
      if (!userData) {
        const newUser: User = {
          fID: userFID,
          savedRights: [],
        };
        userData = await createUser(newUser);
      }

      setUser(userData);
    } catch (err) {
      console.error('Error loading user:', err);
      setError('Failed to load user data');
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Update user data
  const updateUserData = useCallback(async (updates: Partial<User>) => {
    if (!user) return false;

    setIsLoading(true);
    setError(null);

    try {
      const updatedUser = await updateUser(user.fID, updates);
      if (updatedUser) {
        setUser(updatedUser);
        return true;
      }
      return false;
    } catch (err) {
      console.error('Error updating user:', err);
      setError('Failed to update user data');
      return false;
    } finally {
      setIsLoading(false);
    }
  }, [user]);

  // Save a rights module
  const saveModule = useCallback(async (moduleId: string) => {
    if (!user) return false;

    // Optimistic update
    setUser(prev => prev ? {
      ...prev,
      savedRights: [...prev.savedRights, moduleId]
    } : null);

    try {
      const success = await saveRightsModule(user.fID, moduleId);
      if (!success) {
        // Revert optimistic update
        setUser(prev => prev ? {
          ...prev,
          savedRights: prev.savedRights.filter(id => id !== moduleId)
        } : null);
        setError('Failed to save module');
        return false;
      }
      return true;
    } catch (err) {
      console.error('Error saving module:', err);
      // Revert optimistic update
      setUser(prev => prev ? {
        ...prev,
        savedRights: prev.savedRights.filter(id => id !== moduleId)
      } : null);
      setError('Failed to save module');
      return false;
    }
  }, [user]);

  // Unsave a rights module
  const unsaveModule = useCallback(async (moduleId: string) => {
    if (!user) return false;

    // Optimistic update
    const originalSavedRights = user.savedRights;
    setUser(prev => prev ? {
      ...prev,
      savedRights: prev.savedRights.filter(id => id !== moduleId)
    } : null);

    try {
      const success = await unsaveRightsModule(user.fID, moduleId);
      if (!success) {
        // Revert optimistic update
        setUser(prev => prev ? {
          ...prev,
          savedRights: originalSavedRights
        } : null);
        setError('Failed to unsave module');
        return false;
      }
      return true;
    } catch (err) {
      console.error('Error unsaving module:', err);
      // Revert optimistic update
      setUser(prev => prev ? {
        ...prev,
        savedRights: originalSavedRights
      } : null);
      setError('Failed to unsave module');
      return false;
    }
  }, [user]);

  // Check if a module is saved
  const isModuleSaved = useCallback((moduleId: string) => {
    return user?.savedRights.includes(moduleId) || false;
  }, [user]);

  // Connect wallet
  const connectWallet = useCallback(async (walletAddress: string) => {
    return await updateUserData({ walletAddress });
  }, [updateUserData]);

  // Disconnect wallet
  const disconnectWallet = useCallback(async () => {
    return await updateUserData({ walletAddress: undefined });
  }, [updateUserData]);

  // Load user on fID change
  useEffect(() => {
    if (fID) {
      loadUser(fID);
    }
  }, [fID, loadUser]);

  return {
    user,
    isLoading,
    error,
    loadUser,
    updateUserData,
    saveModule,
    unsaveModule,
    isModuleSaved,
    connectWallet,
    disconnectWallet,
  };
}
