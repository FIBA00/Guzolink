import { Link } from "react-router-dom";
import ShopCard from "../components/ShopCard";
import { useShops } from "../shop.context.js";

function MyShops() {
  const { shops, error, deleteShop } = useShops();

  return (
    <div className="mx-auto p-6 sm:px-6 lg:px-8 rounded 3xl border border-white/10 bg-slate-800 shadow-sm transform transition-all duration-300 hover:scale-[1.01]">
      <div className="p-3 space-x-12 sm:space-x-3 sm:flex sm:flex-wrap ">
        {error && (
          <p className="text-red-600 rounded-2xl text-center font-bold mb-4 border border-red-500 p-5">
            {error}
          </p>
        )}
        <Link
          to={"/"}
          className="inline-flex items-center gap-1 text-sm text-slate-400 hover:text-white transition mb-2 mt-4"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Back to home
        </Link>
      </div>
      <div>
        <Link
          to="/shop/create"
          className="inline-flex items-center rounded-lg bg-amber-500 px-4 py-2 text-sm font-medium text-slate-900 hover:bg-amber-400 transition mb-4 mt-6"
        >
          + Add New Shop
        </Link>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {!shops || shops.length === 0 ? (
            <p className="text-red-600 rounded-2xl text-center font-bold mb-4 border border-red-500 p-5">
              You have no shops yet .
            </p>
          ) : (
            shops.map((shop) => (
              <ShopCard key={shop._id} shop={shop} onDelete={deleteShop} />
            ))
          )}
        </div>

        {/* Merchant details section */}
        {/* <div className="mt-8">
        <h3 className="text-lg font-semibold text-white mb-2">All Shops Summary </h3>
        <p className="text-slate-300 rounded-2xl text-center border border-amber-300 p-5">Shop information will be displayed here.</p>
      </div> */}
      </div>
    </div>
  );
}

export default MyShops;
