"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { BrandMark } from "@/components/coastlinea/brand-mark";
import { Icon } from "@/components/coastlinea/icon";

const links = [
  { label: "Destinations", href: "/destinations" },
  { label: "Experiences", href: "/#experiences" },
  { label: "Travel Guide", href: "/#travel-guide" },
  { label: "About", href: "/#about" },
  { label: "Contact", href: "/#contact" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);
  const destinationRoute = pathname.startsWith("/destinations");

  useEffect(() => {
    if (!menuOpen) return;
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setMenuOpen(false);
        menuButton.current?.focus();
      }
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [menuOpen]);

  return (
    <header className="site-header">
      <Link className="brand" href="/" aria-label="Coastlinea home" onClick={() => setMenuOpen(false)}>
        <BrandMark />
      </Link>
      <nav className={`main-nav ${menuOpen ? "is-open" : ""}`} id="primary-navigation" aria-label="Main navigation">
        {links.map(({ label, href }) => {
          const active = label === "Destinations" && (destinationRoute || pathname === "/");
          return <Link className={active ? "active" : ""} href={href} key={label} aria-current={active ? "page" : undefined} onClick={() => setMenuOpen(false)}>{label}</Link>;
        })}
      </nav>
      <div className="header-actions">
        <Link className="plan-button" href="/plan">Plan Your Trip <Icon name="arrow" /></Link>
        <button className="nav-toggle" ref={menuButton} type="button" aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"} aria-expanded={menuOpen} aria-controls="primary-navigation" onClick={() => setMenuOpen((open) => !open)}>
          <Icon name={menuOpen ? "close" : "menu"} />
        </button>
      </div>
    </header>
  );
}
