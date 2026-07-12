// pages/Dashboard.jsx
//
// This page does ZERO fetching of its own. It only reads from the
// contexts that own the data (useAuth, useShops) and renders based on
// their state. This is the payoff of the "one owner per piece of data"
// rule — this component can't cause a race condition because it never
// starts a request in the first place.

import { useAuth } from "../features/auth/AuthContext";
import { useShops } from "../features/shop/ShopContext";

function Dashboard() {
  const { user, isAuthLoading } = useAuth();
  const { shops, isLoading, error } = useShops();

  // Auth hasn't resolved yet (e.g. we're still checking a stored token
  // on first page load) — show a neutral loading state, don't assume
  // logged-out or logged-in yet.
  if (isAuthLoading) {
    return <p>Checking your session...</p>;
  }

  // Auth resolved and there's no user — this is a real "logged out"
  // state, not a loading state. In a real app you'd likely redirect
  // to /login here instead of rendering this message.
  if (!user) {
    return <p>Please log in to view your dashboard.</p>;
  }

  // From here on, we know we're logged in — now it's just the normal
  // three-state pattern for the shops data itself.
  if (isLoading) {
    return <p>Loading your shops...</p>;
  }

  if (error) {
    return <p>Couldn't load shops: {error}</p>;
  }

  return (
    <div>
      <h1>Welcome, {user.username}</h1>
      <ul>
        {shops.map((shop) => (
          <li key={shop.id}>
            {shop.name} — {shop.products.length} products
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Dashboard;