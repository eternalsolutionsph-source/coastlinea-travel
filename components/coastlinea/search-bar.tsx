"use client";

import { useState } from "react";
import { Icon } from "@/components/coastlinea/icon";

export function SearchBar() {
  const [destination, setDestination] = useState("");
  const [travelDate, setTravelDate] = useState("");
  const [dateActive, setDateActive] = useState(false);
  const [guests, setGuests] = useState(2);
  const [guestOpen, setGuestOpen] = useState(false);
  const [message, setMessage] = useState("");

  return (
    <form className="search-bar" id="search" onSubmit={(event) => {
      event.preventDefault();
      setGuestOpen(false);
      const place = destination.trim() || "all destinations";
      const date = travelDate ? ` on ${travelDate}` : "";
      setMessage(`Trip search: ${place}${date}, ${guests} ${guests === 1 ? "traveler" : "travelers"}. Availability is coming soon.`);
    }}>
      <label className="search-field destination-field">
        <span className="field-icon"><Icon name="location" /></span>
        <span className="field-copy"><strong>Where to?</strong><input aria-label="Search destination" placeholder="Search destination" value={destination} onChange={(event) => setDestination(event.target.value)} list="destination-options" /></span>
      </label>
      <datalist id="destination-options"><option value="El Nido" /><option value="Siargao" /><option value="Bohol" /><option value="Boracay" /><option value="Coron" /></datalist>
      <label className="search-field date-field">
        <span className="field-icon"><Icon name="calendar" /></span>
        <span className="field-copy"><strong>When?</strong><input aria-label="Select dates" type={dateActive || travelDate ? "date" : "text"} placeholder="Select dates" value={travelDate} onChange={(event) => setTravelDate(event.target.value)} onFocus={() => setDateActive(true)} onBlur={() => setDateActive(false)} /></span>
      </label>
      <div className="search-field guests-field">
        <span className="field-icon"><Icon name="user" /></span>
        <span className="field-copy"><strong>Guests</strong><span className="guest-count">{guests} {guests === 1 ? "traveler" : "travelers"}</span></span>
        <button type="button" className="guest-step" aria-label="Choose number of travelers" aria-expanded={guestOpen} aria-controls="guest-menu" onClick={() => setGuestOpen((open) => !open)}><Icon name="chevron" /></button>
        {guestOpen && <div className="guest-menu" id="guest-menu"><span>Travelers</span><div className="guest-adjust"><button type="button" aria-label="Remove one traveler" disabled={guests === 1} onClick={() => setGuests((count) => Math.max(1, count - 1))}>−</button><strong>{guests}</strong><button type="button" aria-label="Add one traveler" disabled={guests === 12} onClick={() => setGuests((count) => Math.min(12, count + 1))}>+</button></div></div>}
      </div>
      <button className="search-submit" type="submit" aria-label="Search trips"><Icon name="search" /></button>
      {message && <span className="search-message" role="status">{message}</span>}
    </form>
  );
}
