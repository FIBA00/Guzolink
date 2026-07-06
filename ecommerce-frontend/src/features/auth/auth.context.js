import {
  createContext,
  createElement,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { request } from "../../shared/lib/apiClient";
import { storage } from "../../shared/lib/storage";

const AuthContext = createContext(null);

function AuthProvider({ children }) {
  const [user, setUser] = useState(() => storage.user.get());

  useEffect(() => {
    storage.user.set(user);
  }, [user]);

  const signup = async (username, email, password, phone, address) => {
    try {
      const data = await request("/api/user/register", {
        method: "POST",
        body: JSON.stringify({ username, email, password, phone, address }),
      });

      if (!data.success) {
        return {
          success: false,
          message: data.message || "Unable to create your account",
        };
      }

      const sessionUser = {
        id: data.user?.id,
        username: data.user?.username,
        email: data.user?.email,
        role: data.user?.role,
        token: data.bearerToken,
      };

      storage.token.set(data.bearerToken);
      setUser(sessionUser);

      return {
        success: true,
        user: sessionUser,
        message: data.message || "User registered successfully",
      };
    } catch (error) {
      return {
        success: false,
        message: error.message || "Unable to create your account",
      };
    }
  };

  const login = async (email, password) => {
    try {
      const data = await request("/api/user/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
      });

      if (!data.success) {
        return {
          success: false,
          message: data.message || "Invalid email or password",
        };
      }

      const sessionUser = {
        id: data.user?.id,
        username: data.user?.username,
        email: data.user?.email,
        role: data.user?.role,
        token: data.bearerToken,
      };

      storage.token.set(data.bearerToken);
      setUser(sessionUser);

      return {
        success: true,
        user: sessionUser,
        message: data.message || "Logged in successfully",
      };
    } catch (error) {
      return {
        success: false,
        message: error.message || "Invalid email or password",
      };
    }
  };

  const updateUser = async (username, phone, address, profileimage) => {
    try {
      // send the user info to the backend for updating the user profile
      let profile = profileimage ? profileimage : null;

      const updatedUserInfo = await request(`/api/user/update/${user.id}`, {
        method: "POST",
        body: JSON.stringify({ username, phone, address, profile }),
      });

      if (!updatedUserInfo.success) {
        return {
          success: false,
          message: updatedUserInfo.message || "Unable to update your account",
        };
      }
      // store the new updated user info into the session
      const updatedSessionUser = {
        id: updatedUserInfo.user?.id,
        username: updatedUserInfo.user?.username,
        email: updatedUserInfo.user?.email,
        role: updatedUserInfo.user?.role,
        token: updatedUserInfo.bearerToken,
      };

      storage.user.set(updatedSessionUser);
      setUser(updatedSessionUser);
      // relogin the user to get a new token and update the session user info
      // where do we get the password from? we don't have it in the updatedUserInfo, so we need to ask the user to enter their password again to relogin so no relogin needed, we can just update the session user info with the updatedUserInfo and keep the same token

      return {
        success: true,
        user: updatedSessionUser,
      };
    } catch (error) {
      return {
        success: false,
        message: error.message || "Invalid operation",
      };
    }
  };

  const logout = () => {
    storage.token.remove();
    setUser(null);
  };

  // const userprofile = async (userId) => {
  //   try {
  //     console.log("Fetching user profile for userId: ", userId);
  //     const data = await request(`/api/user/profile/${userId}`, {
  //       method: "GET",
  //     });

  //     if (!data.success) {
  //       return {
  //         success: false,
  //         message: data.message || "Unable to fetch user profile",
  //       };
  //     }

  //     return {
  //       success: true,
  //       user: data.user,
  //       message: data.message || "User profile fetched successfully",
  //     };
  //   } catch (error) {
  //     return {
  //       success: false,
  //       message: error.message || "Unable to fetch user profile",
  //     };
  //   }
  // };
  
  const value = useMemo(
    () => ({
      user,
      signup,
      login,
      logout,
      updateUser,
    }),
    [user],
  );

  return createElement(AuthContext.Provider, { value }, children);
}

function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

export { AuthProvider, useAuth };
