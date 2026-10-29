"use client";

import Link from "next/link";
import { useMemo, useState, type FormEvent } from "react";
import { destinations } from "@/lib/destinations";
import { Icon } from "@/components/coastlinea/icon";

const steps = ["Destination", "Dates & guests", "Itinerary", "Traveler", "Review", "Status"];

function dateValue(date: Date) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}

export function BookingWizard({ initialDestination = "" }: { initialDestination?: string }) {
  const [step, setStep] = useState(0);
  const [destination, setDestination] = useState(initialDestination);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [today, setToday] = useState("");
  const [guests, setGuests] = useState(2);
  const [itinerary, setItinerary] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const selectedDestination = useMemo(() => destinations.find((item) => item.slug === destination), [destination]);
  const tripOptions = selectedDestination?.highlights ?? [];

  function nextStep(event?: FormEvent<HTMLFormElement>) {
    event?.preventDefault();
    setError("");
    if (step === 0 && !selectedDestination) return setError("Choose a destination to continue.");
    if (step === 1) {
      if (!startDate || !endDate) return setError("Choose both a start and end date.");
      if ((today && startDate < today) || endDate < startDate) return setError("Choose valid travel dates. The end date must be on or after the start date.");
    }
    if (step === 2 && !itinerary) return setError("Choose one planning idea to continue.");
    if (step === 3 && (!name.trim() || !email.trim())) return setError("Enter a name and email for this local review preview.");
    setStep((current) => Math.min(current + 1, steps.length - 1));
  }

  function previousStep() {
    setError("");
    setStep((current) => Math.max(current - 1, 0));
  }

  return (
    <div className="booking-layout">
      <ol className="booking-progress" aria-label="Trip planning steps">
        {steps.map((label, index) => <li className={index === step ? "is-current" : index < step ? "is-complete" : ""} key={label}><span>{index < step ? "✓" : index + 1}</span><small>{label}</small></li>)}
      </ol>
      <form className="booking-panel" onSubmit={nextStep}>
        {step === 0 && <section><p className="eyebrow">Step 1 of 6</p><h2>Choose your destination</h2><p className="wizard-help">Select one of the available destination guides.</p><div className="choice-grid">{destinations.map((item) => <label className={`choice-card ${destination === item.slug ? "is-selected" : ""}`} key={item.slug}><input type="radio" name="destination" value={item.slug} checked={destination === item.slug} onChange={() => setDestination(item.slug)} /><strong>{item.name}</strong><small>{item.region}</small></label>)}</div></section>}
        {step === 1 && <section><p className="eyebrow">Step 2 of 6</p><h2>Choose dates and guests</h2><p className="wizard-help">Dates are planning inputs only. No live availability is connected.</p><div className="form-row"><label>Start date<input type="date" required min={today || undefined} value={startDate} onFocus={() => setToday((value) => value || dateValue(new Date()))} onChange={(event) => setStartDate(event.target.value)} /></label><label>End date<input type="date" required min={startDate || today || undefined} value={endDate} onFocus={() => setToday((value) => value || dateValue(new Date()))} onChange={(event) => setEndDate(event.target.value)} /></label></div><div className="guest-count-control"><strong>Travelers</strong><div><button type="button" aria-label="Remove traveler" disabled={guests <= 1} onClick={() => setGuests((value) => Math.max(1, value - 1))}>−</button><span aria-live="polite">{guests}</span><button type="button" aria-label="Add traveler" disabled={guests >= 12} onClick={() => setGuests((value) => Math.min(12, value + 1))}>+</button></div></div></section>}
        {step === 2 && <section><p className="eyebrow">Step 3 of 6</p><h2>Choose a planning idea</h2><p className="wizard-help">These are sample highlights, not bookable packages.</p><div className="choice-grid">{tripOptions.map((option) => <label className={`choice-card ${itinerary === option ? "is-selected" : ""}`} key={option}><input type="radio" name="itinerary" value={option} checked={itinerary === option} onChange={() => setItinerary(option)} /><strong>{option}</strong><small>Planning idea · availability not connected</small></label>)}</div></section>}
        {step === 3 && <section><p className="eyebrow">Step 4 of 6</p><h2>Traveler details</h2><p className="wizard-help">For this demo, details stay on this page and are not sent or stored.</p><div className="form-row"><label>Full name<input autoComplete="name" required maxLength={100} value={name} onChange={(event) => setName(event.target.value)} /></label><label>Email address<input type="email" autoComplete="email" required maxLength={254} value={email} onChange={(event) => setEmail(event.target.value)} /></label></div></section>}
        {step === 4 && <section><p className="eyebrow">Step 5 of 6</p><h2>Review your trip plan</h2><dl className="booking-summary"><div><dt>Destination</dt><dd>{selectedDestination?.name}</dd></div><div><dt>Dates</dt><dd>{startDate} – {endDate}</dd></div><div><dt>Travelers</dt><dd>{guests}</dd></div><div><dt>Planning idea</dt><dd>{itinerary}</dd></div><div><dt>Traveler</dt><dd>{name} · {email}</dd></div><div><dt>Price and availability</dt><dd>Not available in this demo</dd></div></dl><p className="demo-note">Reviewing this plan will not create a reservation. No payment is collected.</p></section>}
        {step === 5 && <section className="booking-status"><span className="status-icon"><Icon name="check" /></span><p className="eyebrow">Step 6 of 6 · Demo status</p><h2>Your trip plan is ready to review</h2><p>This frontend demo has not sent a booking request. No reservation, payment, or confirmation number was created.</p><p>Connect a trusted booking backend before accepting real traveler details or confirming trips.</p><Link className="text-link" href={`/destinations/${selectedDestination?.slug}`}>Return to {selectedDestination?.name} guide <Icon name="arrow" /></Link></section>}
        {error && <p className="form-error" role="alert">{error}</p>}
        {step < 5 && <div className="wizard-actions">{step > 0 && <button className="secondary-button" type="button" onClick={previousStep}>Back</button>}<button className="plan-button" type="submit">{step === 4 ? "Finish demo review" : "Continue"}<Icon name="arrow" /></button></div>}
      </form>
    </div>
  );
}
