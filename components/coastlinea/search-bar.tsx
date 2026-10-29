"use client";

import { useMemo, useState, useSyncExternalStore, type FormEvent, type KeyboardEvent } from "react";
import { useRouter } from "next/navigation";
import { destinations } from "@/lib/destinations";
import { Icon } from "@/components/coastlinea/icon";

const storageKey = "coastlinea:last-search";
const changeEvent = "coastlinea:search-change";

function getSearchSnapshot() {
  try { return sessionStorage.getItem(storageKey); } catch { return null; }
}

function subscribeToSearch(callback: () => void) {
  if (typeof window === "undefined") return () => {};
  window.addEventListener(changeEvent, callback);
  window.addEventListener("storage", callback);
  return () => {
    window.removeEventListener(changeEvent, callback);
    window.removeEventListener("storage", callback);
  };
}

function parseSearch(snapshot: string | null) {
  try {
    const value: unknown = JSON.parse(snapshot ?? "null");
    if (!value || typeof value !== "object") return null;
    const data = value as { destination?: unknown; date?: unknown; guests?: unknown };
    return {
      destination: typeof data.destination === "string" ? data.destination : "",
      date: typeof data.date === "string" ? data.date : "",
      guests: typeof data.guests === "number" && Number.isFinite(data.guests) ? Math.min(12, Math.max(1, Math.floor(data.guests))) : 2,
    };
  } catch {
    return null;
  }
}

export function SearchBar() {
  const router = useRouter();
  const snapshot = useSyncExternalStore(subscribeToSearch, getSearchSnapshot, () => null);
  const stored = useMemo(() => parseSearch(snapshot), [snapshot]);
  const [destinationDraft, setDestinationDraft] = useState<string | null>(null);
  const [dateDraft, setDateDraft] = useState<string | null>(null);
  const [guestDraft, setGuestDraft] = useState<number | null>(null);
  const destination = destinationDraft ?? stored?.destination ?? "";
  const travelDate = dateDraft ?? stored?.date ?? "";
  const guests = guestDraft ?? stored?.guests ?? 2;
  const [dateActive, setDateActive] = useState(false);
  const [guestOpen, setGuestOpen] = useState(false);
  const [suggestionsOpen, setSuggestionsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const suggestions = useMemo(() => {
    const query = destination.trim().toLocaleLowerCase();
    if (!query) return destinations.slice(0, 5);
    return destinations.filter((item) => `${item.name} ${item.region}`.toLocaleLowerCase().includes(query)).slice(0, 5);
  }, [destination]);

  function chooseDestination(name: string) {
    setDestinationDraft(name);
    setSuggestionsOpen(false);
    setActiveIndex(0);
  }

  function handleDestinationKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setSuggestionsOpen(true);
      setActiveIndex((index) => Math.min(index < 0 ? 0 : index + 1, Math.max(suggestions.length - 1, 0)));
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setActiveIndex((index) => index < 0 ? Math.max(suggestions.length - 1, 0) : Math.max(index - 1, 0));
    } else if (event.key === "Escape") {
      setSuggestionsOpen(false);
    } else if (event.key === "Enter" && suggestionsOpen && suggestions[activeIndex]) {
      event.preventDefault();
      chooseDestination(suggestions[activeIndex].name);
    }
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setGuestOpen(false);
    setSuggestionsOpen(false);
    const params = new URLSearchParams();
    if (destination.trim()) params.set("destination", destination.trim());
    if (travelDate) params.set("date", travelDate);
    params.set("guests", String(guests));
    try {
      sessionStorage.setItem(storageKey, JSON.stringify({ destination: destination.trim(), date: travelDate, guests }));
      window.dispatchEvent(new Event(changeEvent));
    } catch {
      // Search still works when browser storage is disabled.
    }
    router.push(`/search?${params.toString()}`);
  }

  return (
    <form className="search-bar" id="search" onSubmit={handleSubmit}>
      <label className="search-field destination-field">
        <span className="field-icon"><Icon name="location" /></span>
        <span className="field-copy"><strong>Where to?</strong><input aria-label="Search destination" placeholder="Destination" value={destination} onChange={(event) => { setDestinationDraft(event.target.value); setSuggestionsOpen(true); setActiveIndex(-1); }} onFocus={() => setSuggestionsOpen(true)} onBlur={() => window.setTimeout(() => setSuggestionsOpen(false), 120)} onKeyDown={handleDestinationKeyDown} role="combobox" aria-autocomplete="list" aria-expanded={suggestionsOpen} aria-controls="destination-suggestions" aria-activedescendant={suggestionsOpen && activeIndex >= 0 && suggestions[activeIndex] ? `destination-option-${suggestions[activeIndex].slug}` : undefined} autoComplete="off" maxLength={80} /></span>
      </label>
      {suggestionsOpen && (
        <div className="destination-suggestions" id="destination-suggestions" role="listbox" aria-label="Destination suggestions">
          {suggestions.length ? suggestions.map((item, index) => (
            <button className={index === activeIndex ? "is-active" : ""} id={`destination-option-${item.slug}`} type="button" role="option" aria-selected={index === activeIndex} key={item.slug} onMouseDown={(event) => event.preventDefault()} onClick={() => chooseDestination(item.name)}>
              <Icon name="location" /><span><strong>{item.name}</strong><small>{item.region}</small></span>
            </button>
          )) : <p className="no-suggestions">No matching destination. Search to see available guides.</p>}
        </div>
      )}
      <label className="search-field date-field">
        <span className="field-icon"><Icon name="calendar" /></span>
        <span className="field-copy"><strong>When?</strong><input aria-label="Select travel date" type={dateActive || travelDate ? "date" : "text"} placeholder="Dates" value={travelDate} onChange={(event) => setDateDraft(event.target.value)} onFocus={() => setDateActive(true)} onBlur={() => setDateActive(false)} /></span>
      </label>
      <div className="search-field guests-field">
        <span className="field-icon"><Icon name="user" /></span>
        <span className="field-copy"><strong>Guests</strong><span className="guest-count">{guests} {guests === 1 ? "guest" : "guests"}</span></span>
        <button type="button" className="guest-step" aria-label="Choose number of travelers" aria-expanded={guestOpen} aria-controls="guest-menu" onClick={() => { setGuestOpen((open) => !open); setSuggestionsOpen(false); }}><Icon name="chevron" /></button>
        {guestOpen && <div className="guest-menu" id="guest-menu"><span>Travelers</span><div className="guest-adjust"><button type="button" aria-label="Remove one traveler" disabled={guests === 1} onClick={() => setGuestDraft((count) => Math.max(1, (count ?? guests) - 1))}>−</button><strong aria-live="polite">{guests}</strong><button type="button" aria-label="Add one traveler" disabled={guests === 12} onClick={() => setGuestDraft((count) => Math.min(12, (count ?? guests) + 1))}>+</button></div></div>}
      </div>
      <button className="search-submit" type="submit" aria-label="Search trips"><Icon name="search" /></button>
    </form>
  );
}
