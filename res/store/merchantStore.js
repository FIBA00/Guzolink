/** Style: Market Ledger — merchant edits live in a small, persistent workspace ledger and remain ready for REST synchronization. */
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { previewProducts, previewShops } from "../data/previewData";

const initialProducts = previewProducts.map(product => ({
  ...product,
  images: product.images || [product.image],
}));
const initialShop = {
  ...previewShops[0],
  logo: "",
  banner: previewShops[0].image,
};

export const useMerchantStore = create(
  persist(
    set => ({
      products: initialProducts,
      shop: initialShop,
      settings: {
        visibleInMarketplace: true,
        orderNotifications: true,
        paymentReady: false,
      },
      addProduct: product =>
        set(state => ({
          products: [
            {
              ...product,
              id: `merchant-product-${Date.now()}`,
              images: product.images?.length
                ? product.images
                : [product.image].filter(Boolean),
              image:
                product.images?.[0] ||
                product.image ||
                state.products[0]?.image,
              shop: state.shop.name,
              shopSlug: state.shop.slug,
              currency: "ETB",
              createdAt: new Date().toISOString(),
            },
            ...state.products,
          ],
        })),
      updateProduct: (id, values) =>
        set(state => ({
          products: state.products.map(product =>
            product.id === id
              ? {
                  ...product,
                  ...values,
                  image: values.images?.[0] || values.image || product.image,
                }
              : product
          ),
        })),
      removeProduct: id =>
        set(state => ({
          products: state.products.filter(product => product.id !== id),
        })),
      updateShop: values =>
        set(state => ({ shop: { ...state.shop, ...values } })),
      createShop: values =>
        set(() => ({
          shop: {
            ...initialShop,
            ...values,
            id: `merchant-shop-${Date.now()}`,
            logo: values.logo || "",
            banner: values.banner || initialShop.banner,
          },
        })),
      removeShop: () => set({ shop: null }),
      updateSettings: settings =>
        set(state => ({ settings: { ...state.settings, ...settings } })),
    }),
    { name: "guzolink-merchant-workspace-v1" }
  )
);
