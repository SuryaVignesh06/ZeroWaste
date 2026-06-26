"use client";

import { useAppStore } from "@/lib/store";
import { CelebrationScreen } from "./CelebrationScreen";

export function DonationSuccess() {
  const { setActiveScreen, subRole } = useAppStore();

  const isDonor = subRole === "donor";

  return (
    <CelebrationScreen
      mode={isDonor ? "donor" : "shopkeeper"}
      title={isDonor ? "Life Saved!" : "Listing Published!"}
      subtitle={
        isDonor
          ? "Nearby NGOs & volunteers have been notified. You're making a real difference!"
          : "Your item is now visible to nearby buyers and recipients. Great work!"
      }
      points={isDonor ? 10 : 5}
      ctaLabel="Back to Home"
      onDone={() => setActiveScreen("home")}
      secondaryCtaLabel={isDonor ? "Donate Another Item" : "Add Another Item"}
      onSecondaryAction={() => setActiveScreen(isDonor ? "createListing" : "add-inventory-item")}
    />
  );
}
