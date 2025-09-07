// Utility functions for handling authentication tokens and user data

/**
 * Get cookie value by name
 * @param {string} name - Cookie name
 * @returns {string|null} Cookie value or null if not found
 */
export function getCookie(name) {
  if (typeof document === "undefined") return null;

  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) {
    return parts.pop().split(";").shift();
  }
  return null;
}

/**
 * Decode JWT token without verification (client-side only)
 * @param {string} token - JWT token
 * @returns {object|null} Decoded payload or null if invalid
 */
export function decodeJWT(token) {
  if (!token) return null;

  try {
    const parts = token.split(".");
    if (parts.length !== 3) return null;

    const payload = parts[1];
    const decoded = atob(payload.replace(/-/g, "+").replace(/_/g, "/"));
    return JSON.parse(decoded);
  } catch (error) {
    // console.error("Error decoding JWT:", error);
    return null;
  }
}

/**
 * Check if token is expired
 * @param {object} decodedToken - Decoded JWT payload
 * @returns {boolean} True if expired
 */
export function isTokenExpired(decodedToken) {
  if (!decodedToken || !decodedToken.exp) return true;

  const currentTime = Math.floor(Date.now() / 1000);
  return decodedToken.exp < currentTime;
}

/**
 * Get user data from token stored in cookies
 * @returns {object|null} User data or null if not found/invalid
 */
export function getUserFromToken() {
  const token =
    getCookie("auth_token") || getCookie("token") || getCookie("access_token");

  if (!token) return null;

  const decoded = decodeJWT(token);
  if (!decoded || isTokenExpired(decoded)) {
    return null;
  }

  return {
    id: decoded.id || decoded.user_id || decoded.sub,
    name: decoded.name || decoded.full_name || decoded.username,
    email: decoded.email,
    avatar: decoded.avatar || decoded.picture || decoded.profile_picture,
    role: decoded.role || decoded.user_role || "user",
    ...decoded,
  };
}

/**
 * Format user display name
 * @param {object} user - User object
 * @returns {string} Formatted display name
 */
export function getDisplayName(user) {
  if (!user) return "User";

  if (user.name) return user.name;
  if (user.email) return user.email.split("@")[0];
  return "User";
}

/**
 * Get user initials for avatar
 * @param {object} user - User object
 * @returns {string} User initials
 */
export function getUserInitials(user) {
  if (!user) return "U";

  const name = getDisplayName(user);
  const parts = name.split(" ");

  if (parts.length >= 2) {
    return (parts[0][0] + parts[1][0]).toUpperCase();
  }

  return name.substring(0, 2).toUpperCase();
}
