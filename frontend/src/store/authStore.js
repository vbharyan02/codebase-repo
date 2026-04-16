import { create } from 'zustand'
import supabase from '../lib/supabase'

const useAuthStore = create((set) => ({
  user: null,
  session: null,
  loading: true,

  init: async () => {
    const { data: { session } } = await supabase.auth.getSession()
    set({ session, user: session?.user ?? null, loading: false })
  },

  setSession: (session) => {
    set({ session, user: session?.user ?? null, loading: false })
  },

  logout: async () => {
    await supabase.auth.signOut()
    set({ session: null, user: null })
  },
}))

export default useAuthStore
