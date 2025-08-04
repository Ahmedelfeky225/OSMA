"use client";

import { useReducer, useCallback, useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { INITIAL_FILTER_STATE } from "../constants/filterConstants";

const FILTER_ACTIONS = {
  SET_SEARCH: "SET_SEARCH",
  SET_PRICE_RANGE: "SET_PRICE_RANGE",
  SET_RATING: "SET_RATING",
  SET_IN_STOCK: "SET_IN_STOCK",
  SET_MIN_REVIEWS: "SET_MIN_REVIEWS",
  SET_MIN_DISCOUNT: "SET_MIN_DISCOUNT",
  SET_DATE_RANGE: "SET_DATE_RANGE",
  SET_IS_FEATURED: "SET_IS_FEATURED",
  SET_SORT: "SET_SORT",
  RESET_FILTERS: "RESET_FILTERS",
  SYNC_FROM_URL: "SYNC_FROM_URL",
};

const filterReducer = (state, action) => {
  switch (action.type) {
    case FILTER_ACTIONS.SET_SEARCH:
      return { ...state, search: action.payload };
    case FILTER_ACTIONS.SET_PRICE_RANGE:
      return {
        ...state,
        minPrice: action.payload.min,
        maxPrice: action.payload.max,
      };
    case FILTER_ACTIONS.SET_RATING:
      return { ...state, rating: action.payload };
    case FILTER_ACTIONS.SET_IN_STOCK:
      return { ...state, inStock: action.payload };
    case FILTER_ACTIONS.SET_MIN_REVIEWS:
      return { ...state, minReviews: action.payload };
    case FILTER_ACTIONS.SET_MIN_DISCOUNT:
      return { ...state, minDiscount: action.payload };
    case FILTER_ACTIONS.SET_DATE_RANGE:
      return {
        ...state,
        startDate: action.payload.start,
        endDate: action.payload.end,
      };
    case FILTER_ACTIONS.SET_IS_FEATURED:
      return { ...state, isFeatured: action.payload };
    case FILTER_ACTIONS.SET_SORT:
      return { ...state, sort: action.payload };
    case FILTER_ACTIONS.RESET_FILTERS:
      return {
        ...INITIAL_FILTER_STATE,
        minPrice: action.payload.minPrice,
        maxPrice: action.payload.maxPrice,
      };
    case FILTER_ACTIONS.SYNC_FROM_URL:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

export const useFilters = (
  minPriceRange = 0,
  maxPriceRange = 1000,
  preservePage = false
) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const initialState = {
    ...INITIAL_FILTER_STATE,
    minPrice: minPriceRange,
    maxPrice: maxPriceRange,
  };

  const [filters, dispatch] = useReducer(filterReducer, initialState);

  // Sync filters from URL
  const syncFromURL = useCallback(() => {
    try {
      const urlFilters = {
        search: searchParams.get("search") || "",
        minPrice: Number(searchParams.get("minPrice")) || minPriceRange,
        maxPrice: Number(searchParams.get("maxPrice")) || maxPriceRange,
        rating: Math.max(
          0,
          Math.min(5, Number(searchParams.get("rating")) || 0)
        ),
        inStock: searchParams.get("inStock") === "true",
        minReviews: Math.max(
          0,
          Math.min(100, Number(searchParams.get("minReviews")) || 0)
        ),
        minDiscount: Math.max(
          0,
          Math.min(100, Number(searchParams.get("minDiscount")) || 0)
        ),
        startDate: searchParams.get("startDate") || "",
        endDate: searchParams.get("endDate") || "",
        isFeatured: searchParams.get("isFeatured") === "true",
        sort: searchParams.get("sort") || "newest",
      };

      // Validate date range
      if (urlFilters.startDate && urlFilters.endDate) {
        const start = new Date(urlFilters.startDate);
        const end = new Date(urlFilters.endDate);
        if (start > end) {
          urlFilters.endDate = urlFilters.startDate;
        }
      }

      dispatch({ type: FILTER_ACTIONS.SYNC_FROM_URL, payload: urlFilters });
    } catch (error) {
      console.error("Error syncing filters from URL:", error);
      // Reset to default state on error
      dispatch({
        type: FILTER_ACTIONS.RESET_FILTERS,
        payload: { minPrice: minPriceRange, maxPrice: maxPriceRange },
      });
    }
  }, [searchParams, minPriceRange, maxPriceRange]);

  // Apply filters to URL
  const applyFilters = useCallback(
    (resetPage = true) => {
      try {
        const current = new URLSearchParams(Array.from(searchParams.entries()));

        if (resetPage && !preservePage) {
          current.set("page", "1");
        }

        // Apply filters to URL
        Object.entries(filters).forEach(([key, value]) => {
          if (key === "minPrice" && value !== minPriceRange) {
            current.set(key, value.toString());
          } else if (key === "maxPrice" && value !== maxPriceRange) {
            current.set(key, value.toString());
          } else if (value && value !== "" && value !== 0 && value !== false) {
            current.set(key, value.toString());
          } else {
            current.delete(key);
          }
        });

        const query = current.toString();
        router.push(`?${query}`);
      } catch (error) {
        console.error("Error applying filters:", error);
      }
    },
    [filters, searchParams, router, minPriceRange, maxPriceRange, preservePage]
  );

  // Reset filters
  const resetFilters = useCallback(() => {
    try {
      dispatch({
        type: FILTER_ACTIONS.RESET_FILTERS,
        payload: { minPrice: minPriceRange, maxPrice: maxPriceRange },
      });

      const current = new URLSearchParams();
      current.set("page", "1");
      router.push(`?${current.toString()}`);
    } catch (error) {
      console.error("Error resetting filters:", error);
    }
  }, [router, minPriceRange, maxPriceRange]);

  // Check if filters have changes
  const hasFilterChanges = useMemo(() => {
    try {
      const currentSearch = searchParams.get("search") || "";
      const currentMinPrice =
        Number(searchParams.get("minPrice")) || minPriceRange;
      const currentMaxPrice =
        Number(searchParams.get("maxPrice")) || maxPriceRange;
      const currentRating = Number(searchParams.get("rating")) || 0;
      const currentInStock = searchParams.get("inStock") === "true";
      const currentMinReviews = Number(searchParams.get("minReviews")) || 0;
      const currentMinDiscount = Number(searchParams.get("minDiscount")) || 0;
      const currentStartDate = searchParams.get("startDate") || "";
      const currentEndDate = searchParams.get("endDate") || "";
      const currentIsFeatured = searchParams.get("isFeatured") === "true";
      const currentSort = searchParams.get("sort") || "newest";

      return (
        filters.search !== currentSearch ||
        filters.minPrice !== currentMinPrice ||
        filters.maxPrice !== currentMaxPrice ||
        filters.rating !== currentRating ||
        filters.inStock !== currentInStock ||
        filters.minReviews !== currentMinReviews ||
        filters.minDiscount !== currentMinDiscount ||
        filters.startDate !== currentStartDate ||
        filters.endDate !== currentEndDate ||
        filters.isFeatured !== currentIsFeatured ||
        filters.sort !== currentSort
      );
    } catch (error) {
      console.error("Error checking filter changes:", error);
      return false;
    }
  }, [filters, searchParams, minPriceRange, maxPriceRange]);

  // Action creators
  const actions = useMemo(
    () => ({
      setSearch: (value) =>
        dispatch({ type: FILTER_ACTIONS.SET_SEARCH, payload: value }),
      setPriceRange: (min, max) =>
        dispatch({
          type: FILTER_ACTIONS.SET_PRICE_RANGE,
          payload: { min, max },
        }),
      setRating: (value) =>
        dispatch({
          type: FILTER_ACTIONS.SET_RATING,
          payload: Math.max(0, Math.min(5, value)),
        }),
      setInStock: (value) =>
        dispatch({ type: FILTER_ACTIONS.SET_IN_STOCK, payload: value }),
      setMinReviews: (value) =>
        dispatch({
          type: FILTER_ACTIONS.SET_MIN_REVIEWS,
          payload: Math.max(0, Math.min(100, value)),
        }),
      setMinDiscount: (value) =>
        dispatch({
          type: FILTER_ACTIONS.SET_MIN_DISCOUNT,
          payload: Math.max(0, Math.min(100, value)),
        }),
      setDateRange: (start, end) => {
        // Validate date range
        if (start && end && new Date(start) > new Date(end)) {
          end = start;
        }
        dispatch({
          type: FILTER_ACTIONS.SET_DATE_RANGE,
          payload: { start, end },
        });
      },
      setIsFeatured: (value) =>
        dispatch({ type: FILTER_ACTIONS.SET_IS_FEATURED, payload: value }),
      setSort: (value) =>
        dispatch({ type: FILTER_ACTIONS.SET_SORT, payload: value }),
    }),
    []
  );

  return {
    filters,
    actions,
    syncFromURL,
    applyFilters,
    resetFilters,
    hasFilterChanges,
  };
};
