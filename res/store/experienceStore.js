/** Style: Market Ledger — preview-only operational state mirrors API entities so every new surface can use the same cached query boundary. */
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { previewProducts, previewUser } from "../data/previewData";


const initial = {
  profile: {
    ...previewUser,
    phone: "+251 911 000 000",
    preferredLanguage: "en",
  },
  addresses: [
    {
      id: "addr-1",
      label: "Home",
      recipient: "Mekdes Bekele",
      phone: "+251 911 000 000",
      address: "Bole, Addis Ababa",
      primary: true,
    },
  ],
  saved: previewProducts.slice(0, 3),
  preferences: {
    orderUpdates: true,
    merchantUpdates: false,
    marketing: false,
    analytics: false,
  },
  deliveryOptions: [
    {
      id: "standard",
      name: "Standard delivery",
      window: "2–4 business days",
      fee: 120,
    },
    {
      id: "express",
      name: "Express delivery",
      window: "Same day in Addis Ababa",
      fee: 260,
    },
  ],
  supportTickets: [],
  growth: {
    attribution: "Direct marketplace visit",
    experiment: "Merchant onboarding A",
    analytics: false,
  },
  merchantOperations: {
    inventory: [
      { id: "p-106", name: "Teff grain bowl", stock: 0, state: "Out of stock" },
      { id: "p-104", name: "Weave wall basket", stock: 4, state: "Low stock" },
    ],
    fulfilment: [
      { id: "GL-2048", customer: "Selam Tadesse", status: "Ready to pack" },
      { id: "GL-2039", customer: "Hana Getachew", status: "Awaiting payment" },
    ],
    team: [
      {
        id: "tm-1",
        name: "Mekdes Bekele",
        role: "Owner",
        email: "admin@guzolink.local",
      },
    ],
    payout: { nextDate: "Friday, 29 Aug", amount: 6240, status: "Projected" },
  },
};
export const useExperienceStore = create(
  persist(
    set => ({
      ...initial,
      updateProfile: data =>
        set(state => ({ profile: { ...state.profile, ...data } })),
      saveAddress: data =>
        set(state => ({
          addresses: data.id
            ? state.addresses.map(address =>
                address.id === data.id ? { ...address, ...data } : address
              )
            : [...state.addresses, { ...data, id: `addr-${Date.now()}` }],
        })),
      removeAddress: id =>
        set(state => ({
          addresses: state.addresses.filter(address => address.id !== id),
        })),
      updatePreferences: data =>
        set(state => ({ preferences: { ...state.preferences, ...data } })),
      createTicket: data =>
        set(state => ({
          supportTickets: [
            {
              ...data,
              id: `help-${Date.now()}`,
              status: "Open",
              createdAt: new Date().toISOString(),
            },
            ...state.supportTickets,
          ],
        })),
      updateGrowth: data =>
        set(state => ({ growth: { ...state.growth, ...data } })),
      updateFulfilment: (id, status) =>
        set(state => ({
          merchantOperations: {
            ...state.merchantOperations,
            fulfilment: state.merchantOperations.fulfilment.map(order =>
              order.id === id ? { ...order, status } : order
            ),
          },
        })),
    }),
    { name: "guzolink-experience-preview-v1" }
  )
);
