"use client";

import { useSession } from "next-auth/react";
import { Button } from "../button";
import { useState } from "react";
import { db } from "@/lib/firebase";
import { addDoc, collection, doc, onSnapshot } from "firebase/firestore";
import useSubscriptionStore from "@/store/subscriptionStore";
import LoadingSpinner from "../LoadingSpinner";

export default function RegisterButton({
  priceCode,
  tier,
}: {
  priceCode: string | undefined;
  tier: string;
}) {
  const { data: session } = useSession();
  const [loading, setIsLoading] = useState(false);
  const { status, isLoading } = useSubscriptionStore();
  console.log(status);
  const createCheckoutSession = async () => {
    if (!session?.user?.id) return;

    setIsLoading(true);
    try {
      const docRef = await addDoc(
        collection(db, "customers", session.user.id, "checkout_sessions"),
        {
          price: priceCode,
          success_url: window.location.origin,
          cancel_url: window.location.origin + "/register",
          metadata: {
            role: "pro",
            tier: tier,
          },
        }
      );

      onSnapshot(
        doc(db, "customers", session.user.id, "checkout_sessions", docRef.id),
        (snap) => {
          const data = snap.data();
          if (data) {
            const { error, url } = data;
            if (error) {
              alert(`An error occurred: ${error.message}`);
              setIsLoading(false);
            } else if (url) {
              window.location.assign(url);
            }
          }
        }
      );
    } catch (error) {
      console.error("Error creating checkout session: ", error);
      setIsLoading(false);
    }
  };
  return (
    <Button
      variant="default"
      className="flex-1"
      onClick={createCheckoutSession}
      disabled={loading || isLoading} // Przycisk nieaktywny, gdy trwa operacja ładowania
    >
      {loading || isLoading ? ( // Wyświetlanie spinnera gdy trwa ładowanie lokalne lub globalne
        <LoadingSpinner />
      ) : status === "active" ? ( // Decyzja o treści przycisku na podstawie statusu subskrypcji
        "Manage your subscription"
      ) : (
        "Sign In"
      )}
    </Button>
  );
}
