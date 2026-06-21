import { createContext, useContext, useMemo, useCallback } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getMe, login as loginApi, register as registerApi, logout as logoutApi } from '../api/auth.api';
import toast from 'react-hot-toast';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const queryClient = useQueryClient();

  const {
    data: user,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['auth', 'me'],
    queryFn: getMe,
    retry: false,
    staleTime: 1000 * 60 * 5,
  });

  const isAuthenticated = !!user && !isError;

  const login = useCallback(
    async (credentials) => {
      const data = await loginApi(credentials);
      queryClient.setQueryData(['auth', 'me'], data.user || data);
      await queryClient.invalidateQueries({ queryKey: ['auth', 'me'] });
      toast.success('Welcome back!');
      return data;
    },
    [queryClient]
  );

  const register = useCallback(
    async (userData) => {
      const data = await registerApi(userData);
      queryClient.setQueryData(['auth', 'me'], data.user || data);
      await queryClient.invalidateQueries({ queryKey: ['auth', 'me'] });
      toast.success('Account created successfully!');
      return data;
    },
    [queryClient]
  );

  const logout = useCallback(async () => {
    await logoutApi();
    queryClient.setQueryData(['auth', 'me'], null);
    queryClient.removeQueries({ queryKey: ['auth'] });
    queryClient.removeQueries({ queryKey: ['bookings'] });
    toast.success('Logged out successfully');
  }, [queryClient]);

  const value = useMemo(
    () => ({
      user: user?.user || user,
      isAuthenticated,
      isLoading,
      login,
      register,
      logout,
    }),
    [user, isAuthenticated, isLoading, login, register, logout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export default AuthContext;
