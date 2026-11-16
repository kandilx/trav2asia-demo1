"use client";

import { createContext, useCallback, useContext, useMemo, useReducer, type ReactNode } from "react";
import type { CategoryId, SearchState, SortOrder } from "@/types/trip";

export interface BookingConfirmation {
  experienceId: string;
  reference: string;
  date: string;
  startTime: string;
  travelers: number;
  totalCad: number;
}

export interface TripState {
  search: SearchState;
  category: CategoryId | null;
  query: string;
  sort: SortOrder;
  selectedId: string | null;
  confirmation: BookingConfirmation | null;
}

export const initialTripState: TripState = {
  search: { destination: "anywhere", startDate: null, endDate: null, travelers: 2 },
  category: null,
  query: "",
  sort: "recommended",
  selectedId: null,
  confirmation: null,
};

export type TripAction =
  | { type: "search/update"; payload: Partial<SearchState> }
  | { type: "filters/setCategory"; payload: CategoryId | null }
  | { type: "filters/setQuery"; payload: string }
  | { type: "filters/setSort"; payload: SortOrder }
  | { type: "filters/reset" }
  | { type: "modal/open"; payload: string }
  | { type: "modal/close" }
  | { type: "booking/confirm"; payload: BookingConfirmation }
  | { type: "booking/clear" };

export function tripReducer(state: TripState, action: TripAction): TripState {
  switch (action.type) {
    case "search/update":
      return { ...state, search: { ...state.search, ...action.payload } };
    case "filters/setCategory":
      return { ...state, category: action.payload };
    case "filters/setQuery":
      return { ...state, query: action.payload };
    case "filters/setSort":
      return { ...state, sort: action.payload };
    case "filters/reset":
      return { ...state, category: null, query: "", sort: "recommended", search: { ...state.search, destination: "anywhere" } };
    case "modal/open":
      return { ...state, selectedId: action.payload, confirmation: null };
    case "modal/close":
      return { ...state, selectedId: null, confirmation: null };
    case "booking/confirm":
      return { ...state, confirmation: action.payload };
    case "booking/clear":
      return { ...state, confirmation: null };
    default:
      return state;
  }
}

interface TripContextValue {
  state: TripState;
  updateSearch: (payload: Partial<SearchState>) => void;
  setCategory: (category: CategoryId | null) => void;
  setQuery: (query: string) => void;
  setSort: (sort: SortOrder) => void;
  resetFilters: () => void;
  openExperience: (id: string) => void;
  closeExperience: () => void;
  confirmBooking: (confirmation: BookingConfirmation) => void;
  clearBooking: () => void;
}

const TripContext = createContext<TripContextValue | null>(null);

export function TripProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(tripReducer, initialTripState);

  const updateSearch = useCallback((payload: Partial<SearchState>) => dispatch({ type: "search/update", payload }), []);
  const setCategory = useCallback((payload: CategoryId | null) => dispatch({ type: "filters/setCategory", payload }), []);
  const setQuery = useCallback((payload: string) => dispatch({ type: "filters/setQuery", payload }), []);
  const setSort = useCallback((payload: SortOrder) => dispatch({ type: "filters/setSort", payload }), []);
  const resetFilters = useCallback(() => dispatch({ type: "filters/reset" }), []);
  const openExperience = useCallback((id: string) => dispatch({ type: "modal/open", payload: id }), []);
  const closeExperience = useCallback(() => dispatch({ type: "modal/close" }), []);
  const confirmBooking = useCallback((payload: BookingConfirmation) => dispatch({ type: "booking/confirm", payload }), []);
  const clearBooking = useCallback(() => dispatch({ type: "booking/clear" }), []);

  const value = useMemo<TripContextValue>(
    () => ({
      state,
      updateSearch,
      setCategory,
      setQuery,
      setSort,
      resetFilters,
      openExperience,
      closeExperience,
      confirmBooking,
      clearBooking,
    }),
    [state, updateSearch, setCategory, setQuery, setSort, resetFilters, openExperience, closeExperience, confirmBooking, clearBooking],
  );

  return <TripContext.Provider value={value}>{children}</TripContext.Provider>;
}

export function useTrip(): TripContextValue {
  const context = useContext(TripContext);
  if (!context) {
    throw new Error("useTrip must be used inside TripProvider");
  }
  return context;
}
