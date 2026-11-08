"use client";

import React, { useState, useEffect } from "react";
import { sound } from "@/lib/audio";
import { ArrowUpRight, Menu, X, Download } from "lucide-react";
import AudioToggle from "../ui/AudioToggle";

const NAV_ITEMS = [
  { label: "About", href: "#manifesto" },
  { label: "Arsenal", href: "#arsenal" },
  { label: "Work", href: "#projects" },
  { label: "Academic", href: "#academic" },
  { label: "Terminal", href: "#terminal" },
];

export default function Navigation() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isHidden, setIsHidden] = useState(false);

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = Math.max(0, window.scrollY);
      const diff = currentScrollY - lastScrollY;

      // Always show navbar near the top of the page
      if (currentScrollY < 50) {
        setIsHidden(false);
      } else if (diff > 8) {
        // Scrolling down: hide header bar
        setIsHidden(true);
        setMobileOpen(false);
      } else if (diff < -8) {
        // Scrolling up: show header bar
        setIsHidden(false);
      }

      lastScrollY = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleScrollTo = (e: React.MouseEvent, href: string) => {
    e.preventDefault();
    sound.playClick();
    setMobileOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleLogoClick = (e: React.MouseEvent) => {
    e.preventDefault();
    sound.playClick();
    setMobileOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <header
        className="navigation refined-navigation glass-navigation select-none"
        role="banner"
        data-hidden={isHidden ? "true" : "false"}
      >
        {/* Wordmark (Left Brand in Instrument Serif) */}
        <a
          className="wordmark"
          href="#hero"
          onClick={handleLogoClick}
          aria-label="Sudip Patra"
        >
          <span className="nav-identity">
            <span>Sudip Patra</span>
          </span>
        </a>

        {/* Desktop Navigation Links */}
        <nav
          className="nav-links hidden md:flex items-center"
          aria-label="Main navigation"
          id="main-nav"
        >
          {NAV_ITEMS.map((item) => (
            <a
              key={item.label}
              className="nav-destination"
              href={item.href}
              onClick={(e) => handleScrollTo(e, item.href)}
            >
              <span>{item.label}</span>
            </a>
          ))}

          {/* "Let's talk ↗" Capsule Action Button */}
          <a
            className="nav-contact group"
            href="#contact"
            onClick={(e) => handleScrollTo(e, "#contact")}
          >
            <span>Let&apos;s talk</span>
            <ArrowUpRight className="w-4 h-4 text-[#d5c5b7] transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </nav>

        {/* Mobile Menu Toggle Button */}
        <div className="flex md:hidden items-center gap-2">
          <a
            className="nav-contact !ml-0 !px-3.5 !min-h-[36px] !gap-1.5 text-xs"
            href="#contact"
            onClick={(e) => handleScrollTo(e, "#contact")}
          >
            <span>Talk</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-[#d5c5b7]" />
          </a>

          <button
            onClick={() => {
              sound.playClick();
              setMobileOpen(!mobileOpen);
            }}
            aria-label="Toggle menu"
            className="p-2 rounded-xl bg-white/[0.06] border border-white/[0.12] text-[#d5d0c8] hover:text-white transition-colors"
          >
            {mobileOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </header>

      {/* Mobile Drawer (Matching Refined Glass Aesthetic) */}
      {mobileOpen && !isHidden && (
        <div className="fixed inset-x-4 top-22 z-40 md:hidden rounded-2xl bg-[#11100f]/95 border border-[#e7e1d52b] backdrop-blur-2xl p-5 shadow-2xl animate-in fade-in slide-in-from-top-4 duration-300">
          <nav className="flex flex-col gap-2">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => handleScrollTo(e, item.href)}
                className="flex items-center justify-between py-2.5 px-3 rounded-xl text-sm font-dm-sans text-[#d5d0c8] hover:text-white hover:bg-white/[0.06] transition-colors"
              >
                <span>{item.label}</span>
                <ArrowUpRight className="w-4 h-4 text-[#baa995]" />
              </a>
            ))}

            <div className="pt-3 border-t border-[#e7e1d52b] flex items-center justify-between gap-3">
              <a
                href="/Sudip_Patra_CV.pdf"
                download="Sudip_Patra_CV.pdf"
                onClick={() => sound.playClick()}
                className="flex-1 flex items-center justify-center gap-2 py-2 rounded-xl bg-white/[0.08] hover:bg-white/[0.14] text-white font-dm-sans text-xs font-medium border border-white/[0.12] transition-colors"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download CV</span>
              </a>

              <div className="flex items-center">
                <AudioToggle />
              </div>
            </div>
          </nav>
        </div>
      )}
    </>
  );
}
