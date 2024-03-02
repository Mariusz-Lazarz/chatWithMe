"use client";

import { useSession } from "next-auth/react";
import { Button } from "../button";
import { useState } from "react";
import { db } from "@/lib/firebase";
import { addDoc, collection, doc, onSnapshot } from "firebase/firestore";

export default function RegisterButton({
  priceCode,
}: {
  priceCode: string | undefined;
}) {
  const { data: session } = useSession();
  const [loading, setIsLoading] = useState(false);
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
      onClick={() => createCheckoutSession()}
    >
      {loading ? (
        <div className="flex justify-center items-center">
          <div className="animate-spin rounded-full h-6 w-6 border-2 border-gray-300 border-t-gray-900"></div>
        </div>
      ) : (
        "Sign In"
      )}
    </Button>
  );
}
