import { useState, useEffect, useRef, useCallback } from "react";
import { createPortal } from "react-dom";
import { Button } from "./ui/button";
import { cn } from "../lib/utils";
import { Menu, X, Sun, Moon } from "lucide-react";

interface NavItem {
  label: string;
  href: string;
}

interface HeaderProps {
  navItems: NavItem[];
  currentPath: string;
}

export default function Header({ navItems, currentPath }: HeaderProps) {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [themeReady, setThemeReady] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const hamburgerRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const drawerRef = useRef<HTMLDivElement>(null);

  // Read actual theme from DOM after mount (avoids SSR hydration mismatch)
  useEffect(() => {
    const isDark = document.documentElement.classList.contains("dark");
    setTheme(isDark ? "dark" : "light");
    setThemeReady(true);
  }, []);

  // Handle mount/unmount transitions
  useEffect(() => {
    if (isMobileMenuOpen) {
      setMounted(true);
    } else {
      const timer = setTimeout(() => setMounted(false), 300);
      return () => clearTimeout(timer);
    }
  }, [isMobileMenuOpen]);

  // Focus management: move focus into drawer on open, back to hamburger on close
  useEffect(() => {
    if (isMobileMenuOpen) {
      // Small delay to let the drawer animate in
      const timer = setTimeout(() => closeRef.current?.focus(), 50);
      return () => clearTimeout(timer);
    } else {
      hamburgerRef.current?.focus();
    }
  }, [isMobileMenuOpen]);

  // Close drawer when resizing to desktop
  useEffect(() => {
    const mql = window.matchMedia("(min-width: 768px)");
    const handler = (e: MediaQueryListEvent) => {
      if (e.matches) setIsMobileMenuOpen(false);
    };
    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }, []);

  // Focus trap inside drawer
  useEffect(() => {
    if (!isMobileMenuOpen) return;

    const drawer = drawerRef.current;
    if (!drawer) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return;

      const focusable = drawer.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
      );
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isMobileMenuOpen]);

  // Body scroll lock
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  // Escape key listener
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };
    if (isMobileMenuOpen) {
      document.addEventListener("keydown", handleEscape);
    }
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isMobileMenuOpen]);

  useEffect(() => {
    // Listen for storage changes (cross-tab sync)
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "theme") {
        const newTheme = e.newValue as "light" | "dark";
        setTheme(newTheme);
        if (newTheme === "dark") {
          document.documentElement.classList.add("dark");
        } else {
          document.documentElement.classList.remove("dark");
        }
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);

    if (newTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  return (
    <header className="sticky top-0 z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-colors duration-300">
      <nav className="max-w-3xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <a
            href="/"
            className="text-lg font-semibold text-accent-600 dark:text-accent-400 hover:text-accent-500 dark:hover:text-accent-300 transition-colors"
          >
            mw.
          </a>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-4">
            <ul className="flex items-center gap-6">
              {navItems.map((item) => {
                const isActive =
                  currentPath === item.href ||
                  currentPath.startsWith(item.href + "/");
                return (
                  <li key={item.href}>
                    <a
                      href={item.href}
                      className={cn(
                        "text-sm font-medium transition-colors relative",
                        isActive
                          ? "text-slate-900 dark:text-slate-100"
                          : "text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100",
                      )}
                    >
                      {item.label}
                      {isActive && (
                        <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-accent-500 rounded-full" />
                      )}
                    </a>
                  </li>
                );
              })}
            </ul>

            {/* Theme Toggle */}
            <div className="border-l border-slate-200 dark:border-slate-700 pl-4 ml-2 cursor-pointer">
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleTheme}
                aria-label="Toggle theme"
              >
                {themeReady ? (
                  theme === "dark" ? (
                    <Sun className="w-5 h-5" />
                  ) : (
                    <Moon className="w-5 h-5" />
                  )
                ) : (
                  <span className="w-5 h-5" />
                )}
              </Button>
            </div>
          </div>

          {/* Mobile hamburger */}
          <button
            ref={hamburgerRef}
            type="button"
            className="md:hidden p-2 -mr-2 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 transition-colors"
            onClick={() => setIsMobileMenuOpen(true)}
            aria-label="Open menu"
            aria-expanded={isMobileMenuOpen}
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </nav>

      {/* Mobile menu overlay + drawer — portaled to body to escape header stacking context */}
      {mounted &&
        createPortal(
          <>
            {/* Backdrop / Scrim — covers full viewport */}
            <div
              className={cn(
                "fixed inset-0 z-40 bg-black/50 transition-opacity duration-300",
                isMobileMenuOpen
                  ? "opacity-100"
                  : "opacity-0 pointer-events-none",
              )}
              onClick={closeMobileMenu}
              aria-hidden="true"
            />

            {/* Drawer */}
            <div
              ref={drawerRef}
              className={cn(
                "fixed inset-y-0 right-0 z-[60] w-72 bg-white dark:bg-slate-950 border-l border-slate-200 dark:border-slate-800 shadow-2xl flex flex-col transition-transform duration-300 ease-out",
                isMobileMenuOpen ? "translate-x-0" : "translate-x-full",
              )}
            >
            {/* Drawer header */}
            <div className="flex items-center justify-between px-4 py-4 border-b border-slate-200 dark:border-slate-800">
              <a
                href="/"
                className="text-lg font-semibold text-accent-600 dark:text-accent-400"
                onClick={closeMobileMenu}
              >
                mw.
              </a>
              <button
                ref={closeRef}
                type="button"
                className="p-2 -mr-2 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-50 transition-colors"
                onClick={closeMobileMenu}
                aria-label="Close menu"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Nav items */}
            <div className="flex-1 px-4 py-4 bg-white dark:bg-slate-950">
              <ul className="flex flex-col gap-1">
                {navItems.map((item) => {
                  const isActive =
                    currentPath === item.href ||
                    currentPath.startsWith(item.href + "/");
                  return (
                    <li key={item.href}>
                      <a
                        href={item.href}
                        onClick={closeMobileMenu}
                        className={cn(
                          "block px-4 py-3 rounded-lg text-base font-medium transition-colors",
                          isActive
                            ? "bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-50"
                            : "text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-slate-50 hover:bg-slate-50 dark:hover:bg-slate-800",
                        )}
                      >
                        {item.label}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* Theme toggle at bottom */}
            <div className="px-4 py-4 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950">
              <button
                type="button"
                onClick={toggleTheme}
                className="flex items-center gap-3 w-full px-4 py-3 rounded-lg text-base font-medium text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-slate-50 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                aria-label="Toggle theme"
              >
                {themeReady ? (
                  theme === "dark" ? (
                    <Sun className="w-5 h-5" />
                  ) : (
                    <Moon className="w-5 h-5" />
                  )
                ) : (
                  <span className="w-5 h-5" />
                )}
                <span>
                  {themeReady
                    ? theme === "dark"
                      ? "Light mode"
                      : "Dark mode"
                    : "Theme"}
                </span>
              </button>
            </div>
          </div>
          </>,
          document.body,
        )}
    </header>
  );
}
