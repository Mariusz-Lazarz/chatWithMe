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
