// ─────────────────────────────────────────────────────────────────────────────
// useAuth.ts — Global auth store.
// ALL authentication goes through the Ballerina backend. No direct Supabase SDK.
// ─────────────────────────────────────────────────────────────────────────────
import { create } from "zustand";
import { persist } from "zustand/middleware";

const BASE_URL = import.meta.env.VITE_API_URL ?? "";

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  slug?: string;
  position?: string;
}

interface AuthState {
  user: AuthUser | null;
  role: "super_admin" | "researcher" | null;
  status: "DRAFT" | "PENDING_REVIEW" | "PUBLISHED" | null;
  token: string | null;
  loginWithEmail: (email: string, password: string) => Promise<{ error: string | null }>;
  setSession: (token: string, role: "super_admin" | "researcher" | null, user: AuthUser, status: any) => void;
  updateUser: (updates: Partial<AuthUser>) => void;
  logout: () => void;
  isAdmin: () => boolean;
  isResearcher: () => boolean;
}

export const useAuth = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      role: null,
      status: null,
      token: null,

      /**
       * Authenticate via the Ballerina /auth/login endpoint.
       * The backend calls Supabase Auth and returns a JWT + member profile.
       */
      loginWithEmail: async (email: string, password: string) => {
        try {
          const res = await fetch(`${BASE_URL}/auth/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
          });

          if (!res.ok) {
            const err = await res.json().catch(() => ({ message: "Login failed" }));
            return { error: err.message ?? "Invalid credentials" };
          }

          const data = await res.json() as {
            token: string;
            member: {
              id: string;
              name: string;
              contact_email?: string;
              image_url?: string;
              slug: string;
              role: string;
              status: string;
              position?: string;
            };
          };

          const role = data.member.role === "super_admin" ? "super_admin" : "researcher";

          set({
            token: data.token,
            role,
            status: data.member.status as any,
            user: {
              id: data.member.id,
              name: data.member.name,
              email: data.member.contact_email ?? email,
              avatar: data.member.image_url ?? "",
              slug: data.member.slug,
              position: data.member.position,
            },
          });

          return { error: null };
        } catch (err: any) {
          return { error: err.message ?? "Network error. Please try again." };
        }
      },

      setSession: (token, role, user, status) => {
        set({ token, role, user, status });
      },

      updateUser: (updates) => {
        set((state) => ({
          user: state.user ? { ...state.user, ...updates } : null,
        }));
      },

      logout: () => {
        set({ user: null, role: null, token: null, status: null });
      },

      isAdmin: () => get().role === "super_admin",
      isResearcher: () => get().role === "researcher",
    }),
    {
      name: "bl_admin_session",
      partialize: (state) => ({
        token: state.token,
        role: state.role,
        user: state.user,
        status: state.status,
      }),
    }
  )
);
