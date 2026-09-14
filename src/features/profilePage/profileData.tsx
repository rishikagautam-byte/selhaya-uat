// profileData.tsx

import { type Order } from "./orderData";

export interface Address {
  id: number;
  fullName: string;
  phone: string;
  email: string;
  postalCode: string;
  city: string;
  state: string;
  nearbyLandmark: string;
  isDefault: boolean;
}

export interface PersonalData {
  name: string;
  phoneNumber: string;
  email: string;
  addresses: Address[];
  orders?: Order[];
}

export type SidebarTab = "personal" | "orders" | "history" | "favorites";

export const PROFILE_STRINGS = {
  pageTitle: "Your Maison Profile",
  breadcrumbHome: "Home",
  breadcrumbProfile: "Profile",

  sidebarPersonal: "Personal Information",
  sidebarOrders: "Order History",
  sidebarHistory: "View History",
  sidebarFavorites: "View Favorites",

  sectionTitle: "Personal Data",
  editInfo: "Edit Info",
  labelName: "Name",
  labelPhone: "Phone Number",
  labelEmail: "Email",
  labelAddress: "Address",
  addAddress: "+ Add Address",
  setDefault: "Set as default",
  deleteAddress: "Delete",
  editAddress: "Edit",
  btnLogout: "LogOut",
  btnChangePassword: "Change Password",

  phFullName: "Full Name",
  phNumber: "Number",
  phEmail: "Email",
  phPostalCode: "Postal Code",
  phCity: "City",
  phState: "State",
  phLandmark: "Near by Landmark",

  orderHistoryTitle: "Order History",
  noOrders: "You have no past orders.",

  viewHistoryTitle: "Recently Viewed",
  noHistory: "You haven't viewed any products recently.",

  favoritesTitle: "Your Favourites",
  noFavorites: "You haven't saved any favourites yet.",
} as const;

export const MOCK_PERSONAL_DATA: PersonalData = {
  name: "Suchi Mishra",
  phoneNumber: "91 9999999999",
  email: "msuchi730@gmail.com",
  addresses: [
    {
      id: 1,
      fullName: "Suchi Mishra",
      phone: "+91 9826726262",
      email: "",
      postalCode: "484661",
      city: "Indore",
      state: "Madhyapradesh",
      nearbyLandmark: "road 23 vijaynagar",
      isDefault: true,
    },
    {
      id: 2,
      fullName: "Suchi Mishra",
      phone: "+91 9826726262",
      email: "",
      postalCode: "484661",
      city: "Umaria",
      state: "Madhya Pradesh",
      nearbyLandmark: "Bandhavgarh, rto road",
      isDefault: false,
    },
  ],
};