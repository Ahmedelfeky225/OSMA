"use client";

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCurrentUser } from "@/store/users/users";

/**
 * Custom hook for managing user authentication state using Redux
 * @returns {object} Auth state and user data
 */
export function useAuth() {
  const dispatch = useDispatch();
  const { currentUser, isLoading, error } = useSelector((state) => state.users);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Fetch current user data on mount
    dispatch(fetchCurrentUser());
  }, [dispatch]);

  useEffect(() => {
    // Refresh user data every 5 minutes to ensure data is up to date
    const interval = setInterval(() => {
      dispatch(fetchCurrentUser());
    }, 5 * 60 * 1000);

    return () => clearInterval(interval);
  }, [dispatch]);

  // Helper function to get display name
  const getDisplayName = (user) => {
    if (!user) return "";
    return (
      user.name ||
      user.firstName ||
      user.username ||
      user.email?.split("@")[0] ||
      "User"
    );
  };

  // Helper function to get user initials
  const getUserInitials = (user) => {
    if (!user) return "U";
    const name = getDisplayName(user);
    return name
      .split(" ")
      .map((word) => word.charAt(0))
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const refreshUser = () => {
    dispatch(fetchCurrentUser());
  };

  // Enhanced user object with display helpers
  const enhancedUser = currentUser
    ? {
        ...currentUser,
        displayName: getDisplayName(currentUser),
        initials: getUserInitials(currentUser),
      }
    : null;

  return {
    user: enhancedUser,
    loading: !mounted || isLoading,
    isAuthenticated: !!currentUser && !error,
    error,
    refreshUser,
  };
}
