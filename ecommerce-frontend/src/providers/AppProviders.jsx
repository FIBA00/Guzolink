import { AuthProvider } from "../features/auth/auth.context";
import { ShopProvider } from "../features/shop/shop.context";
import { CartProvider } from "../features/cart/cart.context";
import { CategoryProvider } from "../features/categories/category.context";

function AppProviders({ children }) {
  return (
    <AuthProvider>
      <ShopProvider>
      <CategoryProvider>
        <CartProvider>
          {children}
        </CartProvider>
      </CategoryProvider>
      </ShopProvider>
    </AuthProvider>
  );
}

export default AppProviders;
