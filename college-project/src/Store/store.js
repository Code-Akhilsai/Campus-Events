import { create } from "zustand";

const useStore = create((set) => ({
  username: "",
  setUsername: (Username) => set(() => ({ username: Username })),
  email: "",
  setEmail: (Email) => set(() => ({ email: Email })),

  password: "",
  setPassword: (Password) => set(() => ({ password: Password })),

  role: "",
  setRole: (Role) => set(() => ({ role: Role })),

  showPassword: false,
  setShowPassword: () =>
    set((state) => ({ showPassword: !state.showPassword })),

  error: "",
  setError: (Error) => set(() => ({ error: Error })),
}));

export default useStore;
