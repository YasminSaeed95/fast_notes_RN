import { Session } from '@supabase/supabase-js'
import { createContext, useContext } from 'react'

export type AuthData = {
  session?: Session | null  //info fra Supabase om login-token
  profile?: any | null   //info om brukeren (navn, e-post osv.)
  isLoading: boolean
  isLoggedIn: boolean

  signUp?: (email: string, password: string) => Promise<any>
  login?: (email: string, password: string) => Promise<any>
  logout?: () => Promise<{ error: any | null }>
}

export const AuthContext = createContext<AuthData>({
  session: undefined,
  profile: undefined,
  isLoading: true,
  isLoggedIn: false,
})

export const useAuthContext = () => useContext(AuthContext)