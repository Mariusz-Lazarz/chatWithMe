import { create } from "zustand";
import { SubscriptionState } from "@/lib/definitions";

const useSubscriptionStore = create<SubscriptionState>((set) => ({
  status: undefined,
  role: null,
  tier: null,
  isLoading: true,
  setSubscription: (status, role, tier) =>
    set({ status, role, tier, isLoading: false }),
  clearSubscription: () =>
    set({ status: "inactive", role: null, tier: null, isLoading: false }),
  setIsLoading: (loading) => set({ isLoading: loading }),
}));

export default useSubscriptionStore;
