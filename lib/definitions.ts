export type MainSection = {
  title: string;
  description: string;
  image: string;
};

export type Plan = {
  tier: string;
  description: string;
  price: string;
  priceCode?: string;
  period: string | null;
  features: string[];
};

export type SubscriptionState = {
  status: "active" | undefined | "inactive";
  role: string | undefined | null;
  tier: string | undefined | null;
  setSubscription: (
    status: SubscriptionState["status"],
    role: string,
    tier: string
  ) => void;
  clearSubscription: () => void;
};
