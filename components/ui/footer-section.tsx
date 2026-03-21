"use client";

import * as React from "react";
import Link from "next/link";
import { Facebook, Instagram, Linkedin, Moon, Sun, Twitter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";

const links = [
  { label: "Features", href: "#features" },
  { label: "Analytics", href: "#analytics" },
  { label: "Pricing", href: "#checkout" },
  { label: "FAQ", href: "#faq" },
  { label: "Checkout", href: "#checkout" },
];
const policies = ["Privacy Policy", "Terms of Service", "Cookie Settings"];

function Footerdemo() {
  const [isDarkMode, setIsDarkMode] = React.useState(false);

  React.useEffect(() => {
    const savedTheme = window.localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const shouldUseDark = savedTheme ? savedTheme === "dark" : prefersDark;

    setIsDarkMode(shouldUseDark);
    document.documentElement.classList.toggle("dark", shouldUseDark);
  }, []);

  const handleThemeChange = (checked: boolean) => {
    setIsDarkMode(checked);
    document.documentElement.classList.toggle("dark", checked);
    window.localStorage.setItem("theme", checked ? "dark" : "light");
  };

  return (
    <footer className="border-t bg-white dark:bg-background">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid gap-12 lg:grid-cols-[1.3fr_1fr_1fr]">
          <div>
            <h2 className="text-3xl font-semibold tracking-tight">Build with Perfum</h2>
            <p className="mt-4 max-w-md text-base text-muted-foreground">
              Get release notes for AI consultation updates, checkout improvements, and new store-management modules.
            </p>
            <form className="mt-6 flex w-full max-w-md gap-2">
              <Input type="email" placeholder="Enter your work email" aria-label="Email address" />
              <Button type="submit">Get Updates</Button>
            </form>
          </div>

          <div>
            <h3 className="text-lg font-semibold tracking-tight">Quick Links</h3>
            <nav className="mt-4 space-y-2 text-sm text-muted-foreground">
              {links.map((item) => (
                <Link key={item.label} href={item.href} className="block transition-colors hover:text-foreground">
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>

          <div>
            <h3 className="text-lg font-semibold tracking-tight">Contact</h3>
            <address className="mt-4 space-y-2 text-sm not-italic text-muted-foreground">
              <p>Perfum Platform Team</p>
              <p>Algiers, Algeria</p>
              <p>support@perfum.app</p>
              <p>+213 (0) 0000 0000</p>
            </address>
            <div className="mt-6 flex gap-2">
              <Button size="icon" variant="outline" aria-label="Facebook">
                <Facebook className="h-4 w-4" />
              </Button>
              <Button size="icon" variant="outline" aria-label="Twitter">
                <Twitter className="h-4 w-4" />
              </Button>
              <Button size="icon" variant="outline" aria-label="Instagram">
                <Instagram className="h-4 w-4" />
              </Button>
              <Button size="icon" variant="outline" aria-label="LinkedIn">
                <Linkedin className="h-4 w-4" />
              </Button>
            </div>
            <div className="mt-6 flex items-center gap-3 text-muted-foreground">
              <Sun className="h-4 w-4" />
              <Switch
                aria-label="Toggle dark mode"
                checked={isDarkMode}
                onCheckedChange={handleThemeChange}
              />
              <Moon className="h-4 w-4" />
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-4 border-t pt-6 text-sm text-muted-foreground md:flex-row md:items-center">
          <p>&copy; {new Date().getFullYear()} Perfum. All rights reserved.</p>
          <nav className="flex flex-wrap items-center gap-4">
            {policies.map((item) => (
              <Link key={item} href="#" className="transition-colors hover:text-foreground">
                {item}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
}

export { Footerdemo };
