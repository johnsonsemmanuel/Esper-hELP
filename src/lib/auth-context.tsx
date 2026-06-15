"use client"

import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from "react"

interface AuthUser {
  id: string
  email: string
  name: string | null
  image: string | null
}

interface AuthContextType {
  user: AuthUser | null
  status: "loading" | "authenticated" | "unauthenticated"
  signIn: (email: string, password: string) => Promise<{ error?: string }>
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  status: "loading",
  signIn: async () => ({}),
  signOut: async () => {},
})

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null)
  const [status, setStatus] = useState<"loading" | "authenticated" | "unauthenticated">("loading")

  useEffect(() => {
    fetch("/api/auth/session")
      .then((res) => res.json())
      .then((data) => {
        if (data.user) {
          setUser(data.user)
          setStatus("authenticated")
        } else {
          setStatus("unauthenticated")
        }
      })
      .catch(() => {
        setStatus("unauthenticated")
      })
  }, [])

  const signIn = useCallback(async (email: string, password: string) => {
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    })
    const data = await res.json()
    if (res.ok) {
      setUser(data.user)
      setStatus("authenticated")
      return {}
    }
    return { error: data.error || "Login failed" }
  }, [])

  const signOut = useCallback(async () => {
    await fetch("/api/auth/logout", { method: "POST" })
    setUser(null)
    setStatus("unauthenticated")
  }, [])

  return (
    <AuthContext.Provider value={{ user, status, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
