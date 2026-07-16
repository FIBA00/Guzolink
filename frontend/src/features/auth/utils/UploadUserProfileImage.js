/**
 * Uploads a user's profile image to the backend server.
 * Works seamlessly during both sign up (no token) and updates (with token).
 *
 * @param {File} file - The image file selected by the user
 * @returns {Promise<string>} - The public path of the uploaded image
 */
export default async function uploadUserProfileImage(file) {
  const body = new FormData();

  // 1. Must match your backend's multer setup: userUpload.single("profileImage")
  body.append("profileImage", file);

  // 2. Set up headers dynamically
  const headers = {};
  const token = localStorage.getItem("bearerToken");

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  // 3. Send request to the user upload endpoint
  const res = await fetch("/api/users/upload-image", {
    method: "POST",
    headers,
    body,
  });

  const data = await res.json();

  if (!res.ok || !data.success) {
    throw new Error(data.message || "Profile image upload failed");
  }

  // 4. Return the public URL or relative path saved in the database
  return data.imageUrl;
}
