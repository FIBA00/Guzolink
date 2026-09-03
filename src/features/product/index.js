// The pattern to remember:

// If the source file uses export default, the barrel line needs export { default as Name } from './path'.
// If the source file uses export const Name = ... ( named ), the barrel line is just export { Name } from './path'.

// ! features/auth/index.js
export { default as useAuth } from "./hooks/useAuth.js";
export { default as LoginForm } from "./components/LoginForm.jsx";
export { loginRequest } from "./api/auth.api.js";
