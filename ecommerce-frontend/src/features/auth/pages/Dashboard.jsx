import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { request } from "../../../shared/lib/apiClient";
import DashboardUI from "../components/DashboardUI";

function Dashboard() {
  const [user, setUser] = useState(null);
  const [userError, setUserError] = useState(null);
  
  // This extracts the variable from your route path definition (e.g., /dashboard/:userId)
  const { userId } = useParams();

  useEffect(() => {
    const controller = new AbortController();
    
    const fetchUserProfile = async () => {
      try {
        console.log("Fetching user profile for userId: ", userId);
        const userdata = await request(`/api/user/profile/${userId}`, { signal: controller.signal });
        console.log("userdata: ", userdata);
        
        if (userdata && userdata.success) {
          setUser(userdata.user);
        } else {
          setUserError(userdata?.message || "Failed to load user profile data structure.");
        }
      } catch (e) {
        if (e.name !== 'AbortError') {
          setUserError(e.message);
        }
      }
    };

    fetchUserProfile();

    return () => {
      controller.abort();
    };
  }, [userId]); // Re-runs instantly if the userId changes or becomes available

  if (userError) return <p className="p-6 text-red-600">Error: {userError}</p>;
  if (!user) return <p className="p-6 text-white">Loading profile configuration…</p>;

  return <DashboardUI user={user} />;
}

export default Dashboard;