/** Style: Market Ledger — every completion surface reads through a cached TanStack resource and swaps to live endpoints only at configuration time. */
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  accountApi,
  commerceApi,
  contentApi,
  governanceApi,
  growthApi,
  operationsApi,
  supportApi,
} from "../services/apiResources";
import { isPreviewMode } from "../../services/api";
import { useExperienceStore } from "../store/experienceStore";
import { useAdminStore } from "../store/adminStore";
const keys = {
  profile: ["account", "profile"],
  addresses: ["account", "addresses"],
  saved: ["account", "saved"],
  preferences: ["account", "preferences"],
  delivery: ["commerce", "delivery"],
  help: ["content", "help"],
  onboarding: ["content", "onboarding"],
  policies: slug => ["content", "policy", slug],
  tickets: ["support", "tickets"],
  growth: ["growth", "preferences"],
  merchantOps: ["merchant", "operations"],
  governance: ["admin", "governance"],
};
const policyCopy = {
  terms: {
    title: "Terms of use",
    updated: "Draft policy · review before launch",
    sections: [
      [
        "Using Guzolink",
        "Use the marketplace lawfully and provide accurate account, order, and storefront information.",
      ],
      [
        "Orders and merchant listings",
        "A merchant remains responsible for the information, availability, fulfilment, and lawful sale of its listed goods.",
      ],
      [
        "Account access",
        "Keep account access private and tell support promptly when you believe access has been compromised.",
      ],
    ],
  },
  privacy: {
    title: "Privacy notice",
    updated: "Draft policy · review before launch",
    sections: [
      [
        "Information used",
        "Guzolink uses account, order, delivery, support, and shop information to operate the marketplace.",
      ],
      [
        "Your controls",
        "Customers can manage preferences and request an export or deletion workflow through the account centre.",
      ],
      [
        "Service providers",
        "Production policy must identify the processors used for payments, storage, delivery, and communications.",
      ],
    ],
  },
  returns: {
    title: "Returns and refunds",
    updated: "Draft policy · review before launch",
    sections: [
      [
        "Starting a request",
        "A customer can start a cancellation or refund request from an eligible order record.",
      ],
      [
        "Merchant review",
        "Merchant fulfilment and return terms should be shown before purchase and recorded with the order.",
      ],
      [
        "Payment resolution",
        "Approved refunds must be processed through the production payment provider and reconciled against the order.",
      ],
    ],
  },
  merchant: {
    title: "Merchant agreement",
    updated: "Draft policy · review before launch",
    sections: [
      [
        "Storefront standards",
        "Merchants must provide accurate shop details, product descriptions, delivery expectations, and contact information.",
      ],
      [
        "Approval",
        "Storefront publication is subject to administrator review and may be returned with a reason for revision.",
      ],
      [
        "Prohibited goods",
        "Production policy must clearly define prohibited, regulated, and restricted goods before public launch.",
      ],
    ],
  },
};
function usePreviewMutation(key, action, apiAction) {
  const client = useQueryClient();
  return useMutation({
    mutationFn: data => (isPreviewMode() ? action(data) : apiAction(data)),
    onSuccess: () => client.invalidateQueries({ queryKey: key }),
  });
}
export function useAccountProfile() {
  return useQuery({
    queryKey: keys.profile,
    queryFn: () =>
      isPreviewMode()
        ? useExperienceStore.getState().profile
        : accountApi.profile(),
    staleTime: 60_000,
  });
}
export function useAddresses() {
  return useQuery({
    queryKey: keys.addresses,
    queryFn: () =>
      isPreviewMode()
        ? useExperienceStore.getState().addresses
        : accountApi.addresses(),
    staleTime: 60_000,
  });
}
export function useSavedProducts() {
  return useQuery({
    queryKey: keys.saved,
    queryFn: () =>
      isPreviewMode()
        ? useExperienceStore.getState().saved
        : accountApi.saved(),
    staleTime: 60_000,
  });
}
export function useAccountPreferences() {
  return useQuery({
    queryKey: keys.preferences,
    queryFn: () =>
      isPreviewMode()
        ? useExperienceStore.getState().preferences
        : accountApi.preferences(),
    staleTime: 60_000,
  });
}
export function useUpdateProfile() {
  return usePreviewMutation(
    keys.profile,
    data => useExperienceStore.getState().updateProfile(data),
    accountApi.updateProfile
  );
}
export function useSaveAddress() {
  return usePreviewMutation(
    keys.addresses,
    data => useExperienceStore.getState().saveAddress(data),
    accountApi.createAddress
  );
}
export function useRemoveAddress() {
  return usePreviewMutation(
    keys.addresses,
    id => useExperienceStore.getState().removeAddress(id),
    accountApi.removeAddress
  );
}
export function useUpdatePreferences() {
  return usePreviewMutation(
    keys.preferences,
    data => useExperienceStore.getState().updatePreferences(data),
    accountApi.updatePreferences
  );
}
export function useDeliveryOptions() {
  return useQuery({
    queryKey: keys.delivery,
    queryFn: () =>
      isPreviewMode()
        ? useExperienceStore.getState().deliveryOptions
        : commerceApi.deliveryOptions(),
    staleTime: 60_000,
  });
}
export function useHelpContent() {
  return useQuery({
    queryKey: keys.help,
    queryFn: () =>
      isPreviewMode()
        ? {
            items: [
              {
                q: "How do I track an order?",
                a: "Open My orders to view the latest order and fulfilment update.",
              },
              {
                q: "How do shops get approved?",
                a: "Merchants submit storefront details; administrators can approve or return the submission with clear feedback.",
              },
              {
                q: "How does the payment sandbox work?",
                a: "It lets a tester simulate success or decline outcomes without collecting payment details.",
              },
            ],
          }
        : contentApi.help(),
    staleTime: 60_000,
  });
}
export function useMerchantOnboarding() {
  return useQuery({
    queryKey: keys.onboarding,
    queryFn: () =>
      isPreviewMode()
        ? {
            items: [
              {
                id: "profile",
                title: "Complete your shop profile",
                description:
                  "Add a clear shop story, location, contact route, and delivery expectation.",
                state: "Complete",
              },
              {
                id: "catalogue",
                title: "Publish a considered first catalogue",
                description:
                  "Add imagery, accurate stock, product detail, and a clear price for each item.",
                state: "In progress",
              },
              {
                id: "approval",
                title: "Request storefront approval",
                description:
                  "Send the prepared shop to the marketplace review queue when its information is ready.",
                state: "Ready",
              },
            ],
            guides: [
              "Product photography checklist",
              "Merchant fulfilment guide",
              "Marketplace community standards",
            ],
          }
        : contentApi.onboarding(),
    staleTime: 60_000,
  });
}
export function usePolicy(slug) {
  return useQuery({
    queryKey: keys.policies(slug),
    queryFn: () => (isPreviewMode() ? policyCopy[slug] : contentApi.page(slug)),
    staleTime: Infinity,
  });
}
export function useSupportTickets() {
  return useQuery({
    queryKey: keys.tickets,
    queryFn: () =>
      isPreviewMode()
        ? useExperienceStore.getState().supportTickets
        : supportApi.tickets(),
    staleTime: 30_000,
  });
}
export function useCreateSupportTicket() {
  return usePreviewMutation(
    keys.tickets,
    data => useExperienceStore.getState().createTicket(data),
    supportApi.createTicket
  );
}
export function useGrowthPreferences() {
  return useQuery({
    queryKey: keys.growth,
    queryFn: () =>
      isPreviewMode()
        ? useExperienceStore.getState().growth
        : growthApi.preferences(),
    staleTime: 60_000,
  });
}
export function useUpdateGrowthPreferences() {
  return usePreviewMutation(
    keys.growth,
    data => useExperienceStore.getState().updateGrowth(data),
    growthApi.updatePreferences
  );
}
export function useMerchantOperations() {
  return useQuery({
    queryKey: keys.merchantOps,
    queryFn: () =>
      isPreviewMode()
        ? useExperienceStore.getState().merchantOperations
        : operationsApi.merchant(),
    staleTime: 30_000,
  });
}
export function useUpdateFulfilment() {
  return usePreviewMutation(
    keys.merchantOps,
    ({ id, status }) =>
      useExperienceStore.getState().updateFulfilment(id, status),
    ({ id, status }) => operationsApi.updateFulfilment(id, { status })
  );
}
export function useGovernanceDesk() {
  return useQuery({
    queryKey: keys.governance,
    queryFn: () =>
      isPreviewMode()
        ? {
            templates: [
              "Storefront image or banner needs attention.",
              "Delivery terms need a clearer customer-facing explanation.",
              "Product availability should be checked before review.",
            ],
            history: [
              {
                id: "rv-31",
                shop: "Oasis Loom",
                status: "Returned",
                reviewer: "Admin",
                at: "Aug 26",
                note: "Please clarify delivery locations.",
              },
              {
                id: "rv-30",
                shop: "Riverline Goods",
                status: "Approved",
                reviewer: "Admin",
                at: "Aug 25",
                note: "Ready for discovery.",
              },
            ],
            resubmissions: useAdminStore.getState().resubmissions,
          }
        : governanceApi.desk(),
    staleTime: 30_000,
  });
}
export function useGovernanceResubmission() {
  return usePreviewMutation(
    keys.governance,
    ({ id }) => useAdminStore.getState().sendResubmissionReminder(id),
    ({ id }) => governanceApi.resubmit(id, { action: "reminder" })
  );
}
