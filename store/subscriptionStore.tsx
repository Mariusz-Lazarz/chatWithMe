import { create } from "zustand";
import { SubscriptionState } from "@/lib/definitions";

const useSubscriptionStore = create<SubscriptionState>((set) => ({
  status: undefined,
  role: undefined,
  tier: undefined,
  isLoading: true,
  setSubscription: (status, role, tier) => set({ status, role, tier }),
  clearSubscription: () => set({ status: "inactive", role: null, tier: null }),
}));

export default useSubscriptionStore;
