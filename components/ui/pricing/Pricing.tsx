import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { CheckIcon } from "@heroicons/react/24/solid";
import { Plan } from "@/lib/definitions";
export default function Pricing() {
  const PLANS: Plan[] = [
    {
      tier: "Free",
      description: "Basic AI chatting for newcomers.",
      price: "Free",
      period: null,
      features: [
        "5 Message Chat Limit in Chats",
        "2 Participant limit in Chat",
        "3 Chat Rooms limit",
        "Support 10 languages",
        "24-hours support response time",
        "Basic multimedia sharing in chats.",
        "Access to community-driven support",
        "Weekly feature updates and improvements.",
      ],
    },
    {
      tier: "Gold",
      description: "Enhanced features for serious users.",
      price: "$9.99",
      period: "month",
      features: [
        "Unlimited messages in chats.",
        "Unlimited participants in chats.",
        "Unlimited chat rooms.",
        "Supports up to 5 languages.",
        "12-hour support response time.",
        "Advanced multimedia support in chats.",
        "Monthly feature updates",
        "Early access to new features.",
      ],
    },
    {
      tier: "Diamond",
      description: "Premium access for experts.",
      price: "$29.99",
      period: "month",
      features: [
        "All Gold Plan features plus:",
        "Priority support with 1-hour response time.",
        "Supports up to 10 languages.",
        "Exclusive multimedia features.",
        "Personalized AI chat customization.",
        "Access to beta features.",
        "Dedicated account manager.",
        "Weekly personalized feature updates.",
      ],
    },
  ];
  return (
    <>
      <h1 className="text-3xl text-center md:text-5xl font-extrabold py-10">
        The perfect price, no matter who you are.
      </h1>
      <p className="opacity-70 text-md md:text-xl text-center">
        We`re almost certain we have a plan that perfectly meets all of your
        requirements.
      </p>
      <div className="flex justify-center flex-col md:flex-row gap-4 my-20">
        {PLANS.map((plan, i) => (
          <Card key={i} className={`flex-1 ${i === 1 ? "md:scale-110" : ""}`}>
            <CardHeader className="text-center">
              <CardTitle>{plan.tier}</CardTitle>
              <CardDescription>{plan.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-8 text-center">
                <span className="text-4xl font-bold">{plan.price}</span>
                <span className="opacity-70">
                  {plan.period ? `/${plan.period}` : ""}
                </span>
              </div>
              {plan.features.map((feature, i) => (
                <div key={i} className="flex items-center gap-4 mb-4">
                  <CheckIcon className="h-6 w-6 text-destructive" />
                  <p>{feature}</p>
                </div>
              ))}
            </CardContent>
            <CardFooter className="flex">
              <Button variant="default" className="flex-1">
                <Link href="#">Get started</Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </>
  );
}
