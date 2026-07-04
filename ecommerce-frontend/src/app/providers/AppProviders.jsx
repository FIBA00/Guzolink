import { AuthProvider } from "../../features/auth/auth.context";
import { CartProvider } from "../../features/cart/cart.context";
import { CatalogProvider } from "../../features/catalog/catalog.context";

function AppProviders({ children }) {
  return (
    <AuthProvider>
      <CartProvider>
        <CatalogProvider>{children}</CatalogProvider>
      </CartProvider>
    </AuthProvider>
  );
}

export default AppProviders;
