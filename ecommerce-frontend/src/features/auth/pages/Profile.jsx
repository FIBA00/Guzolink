import { useAuth } from "../auth.context";
import { Link, NavLink } from "react-router-dom";

function ProfileCard() {
  const { user } = useAuth();
    //   fetch real placeholder image
    let profileimage = user.profilePicture || "https://picsum.photos/200/300";
  return (
    // horizonal card with user info, profile picture and button to goto my profile page
    <div className="flex items-center justify-between mb-8 rounded-3xl border border-white/10 bg-slate-800 text-white p-8 shadow-sm">
      <div className="flex items-center gap-4">
        <div>
          <div className="w-32 h-32 rounded-full overflow-hidden mb-4">
            {/* profile picture */}
            
            <img src={profileimage} alt="Profile Picture" />
          </div>
          <div className="text-center">
            {/* user information */}
            <p className="text-lg  mb-2">
              <strong>Email:</strong> {user.email}
            </p>
            <p className="text-lg  mb-2">
              <strong>Name:</strong> {user.username}
            </p>
            <p className="text-lg  mb-2">
              <strong>Phone:</strong> {user.phone}
            </p>
             <div>
            <Link
              to={`/update/${user.id || user._id}`}
              className="inline-flex items-center rounded-lg bg-amber-500 px-4 py-2 text-sm font-medium text-slate-900 hover:bg-amber-400 transition mb-4"
            >
              Update Profile
            </Link>
          </div>
          </div>
          
          <div>
            {/* TODO: implement financial info */}
            {/* financial info */}
          </div>
         
        </div>
      </div>
    </div>
  );
}

export default ProfileCard;
