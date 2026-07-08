// good dashboard that can contain , the user info, the shops and the summary of analysis, current finances.

import { Link, NavLink } from "react-router-dom";
import ProfileCard from "../pages/Profile";
import MyShops from "../../shop/pages/MyShops";

function DashboardUI({
  user,
  // shop,
  // shopId,
  // products,
  // productsLoading,
  // productsError,
  // deleteProduct,s
}) {
  return (
    // the top section of the dashboard contains, user name, profile picture and button to goto my profile page
    <div className="mx-auto p-6 sm:px-6 lg:px-8">
      {/* User Info Section */}
      <div className="flex items-center justify-between mb-8 rounded-3xl border border-white/10 bg-slate-800 p-8 shadow-sm">
        <h2 className="text-3xl font-bold text-white mb-2">
          Welcome, {user.username}!
        </h2>
        <ProfileCard user={user} />
      </div>

      <div className="mb-8 rounded-3xl border border-white/10 bg-slate-800 p-8 shadow-sm">
      <h2 className="text-2xl font-bold text-center border border-slate-500 rounded-2xl text-white mb-4">My Shops</h2>
        <MyShops />
      </div>
    </div>
  );
}

export default DashboardUI;
