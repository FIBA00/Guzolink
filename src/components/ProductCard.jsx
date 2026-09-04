/** Style: Market Ledger — product cards resemble catalogued goods with registration corners, shop provenance, and decisive purchase actions. */
import { ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "sonner";

// ! internal imports
import { formatCurrency } from "../lib/utils.js";

// ? missing internal import 
// import { useCartStore } from "../../store/cartStore";

export default function ProductCard({ product, priority = false }) {
  // const addItem = useCartStore(state => state.addItem);
  const soldOut = Number(product.stock) === 0;
  // function addToCart() {
  //   addItem(product);
  //   toast.success(`${product.name} is in your cart.`);
  // }
  return (
    <article className="card-hover registration-mark group border border-line bg-[#fffdf7]">
      <Link to={`/products/${product.id}`} className="block overflow-hidden">
        <div className="relative aspect-[1.04] overflow-hidden bg-[#e9e3d5]">
          <img
            src={product.image}
            alt={product.name}
            loading={priority ? "eager" : "lazy"}
            className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.035]"
          />
          {product.stock < 5 && product.stock > 0 && (
            <span className="absolute left-3 top-3 bg-[#fffdf7] px-2 py-1 text-[10px] font-extrabold uppercase tracking-[.12em] text-clay">
              Only {product.stock} left
            </span>
          )}
          {soldOut && (
            <span className="absolute left-3 top-3 bg-ink px-2 py-1 text-[10px] font-extrabold uppercase tracking-[.12em] text-white">
              Sold out
            </span>
          )}
        </div>
        <div className="px-4 pt-4">
          <p className="ledger-label !text-[.61rem]">{product.shop}</p>
          <h3 className="mt-2 min-h-12 text-sm font-extrabold leading-5 text-ink">
            {product.name}
          </h3>
        </div>
      </Link>
      <div className="flex items-end justify-between gap-3 px-4 pb-4 pt-3">
        <p className="text-[.94rem] font-extrabold text-ochre-dark">
          {formatCurrency(product.price, product.currency)}
        </p>
        <button
          className="icon-button h-9 w-9 shrink-0"
          onClick={addToCart}
          disabled={soldOut}
          aria-label={`Add ${product.name} to cart`}
          title={soldOut ? "Out of stock" : "Add to cart"}
        >
          <ShoppingBag size={16} />
        </button>
      </div>
    </article>
  );
}
