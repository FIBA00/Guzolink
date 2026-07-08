import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { request } from "../../../shared/lib/apiClient";

function MyShopProducts() {
  const [shops, setShops] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const data = await request("/api/shop");
        if (data.success) setShops(data.shops);
        else setError(data.message);
      } catch (e) {
        setError(e.message);
      }
    })();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">My Shops</h2>

      {error && <p className="text-red-600 mb-4">{error}</p>}

      <div className="grid gap-4 md:grid-cols-2">
        {shops.map(shop => (
          <div key={shop._id} className="p-4 border rounded shadow">
            <h3 className="font-bold">{shop.name}</h3>
            <p>{shop.description}</p>
            <Link
              to={`/shop/${shop._id}`}
              className="text-amber-600 underline mt-2 inline-block"
            >
              Manage shop
            </Link>
          </div>
        ))}
        {/* <div className="mt-8">
        <h3 className="text-2xl font-bold text-white mb-4">Manage Products</h3>

        {productsLoading ? (
          <p className="text-slate-300">Loading products...</p>
        ) : productsError ? (
          <p className="text-red-400">{productsError}</p>
        ) : products.length === 0 ? (
          <p className="text-slate-400">
            No products found. Create your first product above!
          </p>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {products.map((product) => (
              <div
                key={product._id}
                className="rounded-2xl border border-white/10 bg-white/5 p-4 flex flex-col justify-between"
              >
                <div>
                  <h4 className="text-lg font-semibold text-white">
                    {product.name}
                  </h4>
                  <p className="text-sm text-slate-400 mb-2">
                    {product.category?.name || product.category} • $
                    {product.price}
                  </p>
                  <p className="text-sm text-slate-300 line-clamp-2 mb-4">
                    {product.description}
                  </p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => deleteProduct(product._id)}
                    className="rounded-lg bg-red-500/20 px-3 py-1.5 text-sm font-medium text-red-300 hover:bg-red-500/40 transition"
                  >
                    Delete
                  </button>
                  
                </div>
              </div>
            ))}
          </div>
        )}
      </div> */}
      </div>
    </div>
  );
}

export default MyShopProducts;
