"use client";

import { useState, useSyncExternalStore } from "react";
import { Icon } from "@/components/coastlinea/icon";

const storageKey = "coastlinea:saved-destinations";
const changeEvent = "coastlinea:favorites-change";

function getSnapshot() {
  try { return localStorage.getItem(storageKey); } catch { return null; }
}

function subscribe(callback: () => void) {
  if (typeof window === "undefined") return () => {};
  window.addEventListener(changeEvent, callback);
  window.addEventListener("storage", callback);
  return () => {
    window.removeEventListener(changeEvent, callback);
    window.removeEventListener("storage", callback);
  };
}

function parseFavorites(snapshot: string | null) {
  try {
    const value: unknown = JSON.parse(snapshot ?? "[]");
    return Array.isArray(value) ? value.filter((item): item is string => typeof item === "string") : [];
  } catch {
    return [];
  }
}

export function FavoriteButton({ name }: { name: string }) {
  const [fallbackSaved, setFallbackSaved] = useState(false);
  const snapshot = useSyncExternalStore(subscribe, getSnapshot, () => null);
  const saved = parseFavorites(snapshot).includes(name) || fallbackSaved;

  function toggleFavorite() {
    try {
      const current = parseFavorites(getSnapshot());
      const next = current.includes(name) ? current.filter((item) => item !== name) : [...current, name];
      localStorage.setItem(storageKey, JSON.stringify(next));
      window.dispatchEvent(new Event(changeEvent));
      setFallbackSaved(false);
    } catch {
      setFallbackSaved((value) => !value);
    }
  }

  return (
    <button
      type="button"
      className={`favorite-button ${saved ? "is-favorite" : ""}`}
      onClick={toggleFavorite}
      aria-label={`${saved ? "Remove" : "Save"} ${name} ${saved ? "from" : "to"} saved destinations`}
      aria-pressed={saved}
      title={saved ? "Remove from saved destinations" : "Save destination"}
    >
      <Icon name="heart" />
    </button>
  );
}
