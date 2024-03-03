"use client";

import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { db } from "@/lib/firebase";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import useSubscriptionStore from "@/store/subscriptionStore";

export default function SubscriptionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session } = useSession();
  const setSubscription = useSubscriptionStore(
    (state) => state.setSubscription
  );
  const clearSubscription = useSubscriptionStore(
    (state) => state.clearSubscription
  );
  useEffect(() => {
    if (!session || !session.user.id) {
      clearSubscription();
      return;
    }

    const subscriptionsRef = collection(
      db,
      "customers",
      session.user.id,
      "subscriptions"
    );
    const q = query(subscriptionsRef, where("status", "in", ["active"]));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      if (!snapshot.empty) {
        const doc = snapshot.docs[0];
        const role = doc.data().metadata.role;
        const tier = doc.data().metadata.tier;
        const status = doc.data().status;
        setSubscription(status, role, tier);
      } else {
        clearSubscription();
      }
    });

    return () => unsubscribe();
  }, [session, setSubscription, clearSubscription]);

  return <>{children}</>;
}
