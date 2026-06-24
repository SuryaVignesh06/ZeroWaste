"use client";

import { useAppStore } from "@/lib/store";
import { SplashScreen } from "./SplashScreen";
import { Onboarding } from "./Onboarding";
import { Login } from "./Login";
import { Otp } from "./Otp";
import { RoleSelect } from "./RoleSelect";
import { UserSetup } from "./UserSetup";
import { NgoSetup } from "./NgoSetup";
import { VolunteerSetup } from "./VolunteerSetup";
import { VolunteerHome } from "./VolunteerHome";
import { VolunteerMap } from "./VolunteerMap";
import { VolunteerAuthChoice } from "./VolunteerAuthChoice";
import { VolunteerLogin } from "./VolunteerLogin";
import { VolunteerProfile } from "./VolunteerProfile";
import { RecipientSetup } from "./RecipientSetup";
import { NgoRecipientChoice } from "./NgoRecipientChoice";
import { NgoAuthChoice } from "./NgoAuthChoice";
import { NgoLogin } from "./NgoLogin";
import { HomeUser } from "./HomeUser";
import { NgoFeed } from "./NgoFeed";
import { NgoDeliveryTracking } from "./NgoDeliveryTracking";
import { NgoDistributionProofUploader } from "./NgoDistributionProofUploader";
import { DonorImpactStoryView } from "./DonorImpactStoryView";
import { Profile } from "./Profile";
import { BottomNav } from "./BottomNav";
import { AiAssistant } from "./AiAssistant";
import { RecipientHome } from "./RecipientHome";
import { FoodRequest } from "./FoodRequest";
import { RecipientAuthChoice } from "./RecipientAuthChoice";
import { RecipientLogin } from "./RecipientLogin";
import { ShopkeeperSetup } from "./ShopkeeperSetup";
import { ShopkeeperDashboard } from "./ShopkeeperDashboard";
import { LocalSavingsMarket } from "./LocalSavingsMarket";
import { ReservationConfirmation } from "./ReservationConfirmation";
import { AddProductWizard } from "./AddProductWizard";
import { ProductDetailReserve } from "./ProductDetailReserve";
import { MyReservations } from "./MyReservations";

const Dummy = ({ title }: { title: string }) => (
  <div className="flex flex-1 items-center justify-center bg-[#F7F5F0]">
    <h1 className="text-2xl font-bold text-[#0A0A0A]" style={{ fontFamily: "var(--font-outfit)" }}>{title}</h1>
  </div>
);

export function AppShell() {
  const { screen, role, setScreen } = useAppStore();

  // Full-screen flows (no bottom nav)
  if (screen === "splash") {
    return <div style={{ flex: 1, minHeight: 0, display: "flex", flexDirection: "column" }}><SplashScreen /></div>;
  }
  if (screen === "onboarding") {
    return <div style={{ flex: 1, minHeight: 0, display: "flex", flexDirection: "column" }}><Onboarding /></div>;
  }
  if (screen === "login") {
    return <div style={{ flex: 1, minHeight: 0, display: "flex", flexDirection: "column" }}><Login /></div>;
  }
  if (screen === "otp") {
    return <div style={{ flex: 1, minHeight: 0, display: "flex", flexDirection: "column" }}><Otp /></div>;
  }
  if (screen === "role-select" || screen === "roleSelect") {
    return <div style={{ flex: 1, minHeight: 0, display: "flex", flexDirection: "column" }}><RoleSelect /></div>;
  }
  if (screen === "user-setup") {
    return <div style={{ flex: 1, minHeight: 0, display: "flex", flexDirection: "column" }}><UserSetup /></div>;
  }
  if (screen === "ngo-recipient-choice") {
    return <div style={{ flex: 1, minHeight: 0, display: "flex", flexDirection: "column" }}><NgoRecipientChoice /></div>;
  }
  if (screen === "ngo-auth-choice") {
    return <div style={{ flex: 1, minHeight: 0, display: "flex", flexDirection: "column" }}><NgoAuthChoice /></div>;
  }
  if (screen === "ngo-login") {
    return <div style={{ flex: 1, minHeight: 0, display: "flex", flexDirection: "column" }}><NgoLogin /></div>;
  }
  if (screen === "ngo-setup") {
    return <div style={{ flex: 1, minHeight: 0, display: "flex", flexDirection: "column" }}><NgoSetup /></div>;
  }
  if (screen === "volunteer-auth-choice") {
    return <div style={{ flex: 1, minHeight: 0, display: "flex", flexDirection: "column" }}><VolunteerAuthChoice /></div>;
  }
  if (screen === "volunteer-login") {
    return <div style={{ flex: 1, minHeight: 0, display: "flex", flexDirection: "column" }}><VolunteerLogin /></div>;
  }
  if (screen === "volunteer-setup") {
    return <div style={{ flex: 1, minHeight: 0, display: "flex", flexDirection: "column" }}><VolunteerSetup /></div>;
  }
  if (screen === "volunteerMap") {
    return <div style={{ flex: 1, minHeight: 0, display: "flex", flexDirection: "column", background: "#F7F5F0" }}><VolunteerMap /></div>;
  }
  if (screen === "recipient-setup") {
    return <div style={{ flex: 1, minHeight: 0, display: "flex", flexDirection: "column" }}><RecipientSetup /></div>;
  }
  if (screen === "recipient-auth-choice") {
    return <div style={{ flex: 1, minHeight: 0, display: "flex", flexDirection: "column" }}><RecipientAuthChoice /></div>;
  }
  if (screen === "recipient-login") {
    return <div style={{ flex: 1, minHeight: 0, display: "flex", flexDirection: "column" }}><RecipientLogin /></div>;
  }
  if (screen === "shopkeeperSetup") {
    return <div style={{ flex: 1, minHeight: 0, display: "flex", flexDirection: "column" }}><ShopkeeperSetup /></div>;
  }

  const renderScreen = () => {
    switch (screen) {
      case "home":
      case "userHome": return role === "shopkeeper" ? <ShopkeeperDashboard /> : role === "ngo" ? <NgoFeed /> : role === "volunteer" ? <VolunteerMap /> : <HomeUser />;
      case "donate":
      case "donateFood": return <DonateFood />;
      case "donation-tracking":
      case "donationTracking": return <DonationTracking />;
      case "delivery-tracking":
      case "ngoDeliveryTracking": return <NgoDeliveryTracking />;
      case "ngoDistributionProofUploader": return <NgoDistributionProofUploader />;
      case "donorImpactStoryView": return <DonorImpactStoryView />;
      case "ngo-feed":
      case "ngoFeed": return <NgoFeed />;
      case "volunteer-map":
      case "rescueMap": return <VolunteerMap />;
      case "shop-dashboard": return <ShopkeeperDashboard />;
      case "shopkeeperDashboard": return <ShopkeeperDashboard />;
      case "impact":
      case "impactDashboard": return <ImpactDashboard />;
      case "profile":
      case "userProfile": return <Profile />;
      
      // New screens
      case "productDetailReserve": return <ProductDetailReserve />;
      case "localSavingsMarket": return <LocalSavingsMarket />;
      case "reservationConfirmation": return <ReservationConfirmation />;
      case "myReservations": return <MyReservations />;
      case "addProductWizard": return <AddProductWizard />;
      case "ngoMap": return <Dummy title="NGO Map" />;
      case "ngoVolunteers": return <Dummy title="NGO Volunteers" />;
      case "ngoProfile": return <Profile />;
      case "ngoReports": return <Dummy title="NGO Reports" />;
      case "volunteerMap": return <VolunteerMap />;
      case "volunteerHome": return <div className="flex-1 bg-[#F7F5F0] overflow-y-auto"><VolunteerHome /></div>;
      case "volunteerPickup": return <Dummy title="Volunteer Pickup" />;
      case "volunteerHistory": return <Dummy title="Volunteer History" />;
      case "volunteerProfile": return <VolunteerProfile />;
      case "recipientHome": return <RecipientHome />;
      case "recipientMap": return <Dummy title="Recipient Map" />;
      case "foodRequest": return <FoodRequest />;
      case "requestStatus": return <Dummy title="Request Status" />;
      case "recipientProfile": return <Profile />;

      default: return <HomeUser />;
    }
  };

  return (
    <div style={{ flex: 1, minHeight: 0, display: "flex", flexDirection: "column", position: "relative" }}>
      <div style={{ flex: 1, minHeight: 0, display: "flex", flexDirection: "column" }}>
        {renderScreen()}
      </div>
      <AiAssistant />
      <BottomNav />
    </div>
  );
}
