import { AuthContext } from '@/hooks/use-auth-context';
import { supabase } from '@/lib/supabase';
import type { Session } from '@supabase/supabase-js';
import { PropsWithChildren, useEffect, useState } from 'react';

export default function AuthProvider({ children }: PropsWithChildren) {
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Lytte etter session
  useEffect(() => {
    const fetchSession = async () => {
      setIsLoading(true);
      const { data: { session } } = await supabase.auth.getSession();
      setSession(session);
      setIsLoading(false);
    };
    fetchSession();

    //Ingen ny login nødvendig
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  // Funksjoner for signUp, login og logout
  const login = (email: string, password: string) => supabase.auth.signInWithPassword({ email, password });
  const logout = () => supabase.auth.signOut();
  const signUp = (email: string, password: string) => supabase.auth.signUp({ email, password });



  return (
    <AuthContext.Provider value={{
      session,
      profile,
      isLoading,
      isLoggedIn: !!session,
      signUp,
      login,
      logout,
    }}>
      {children}
    </AuthContext.Provider>
  );
}
