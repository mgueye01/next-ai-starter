"use client";
import React, { useState } from "react";
import { HoveredLink, Menu, MenuItem, ProductItem } from "@/components/ui/navbar-menu";
import { cn } from "@/lib/utils";

export function NavbarDemo() {
  return (
    <div className="relative w-full flex items-center justify-center">
      <Navbar className="top-2" />
      <p className="text-black dark:text-white">
        The Navbar will show on top of the page
      </p>
    </div>
  );
}

function Navbar({ className }: { className?: string }) {
  const [active, setActive] = useState<string | null>(null);
  return (
    <div
      className={cn("fixed top-10 inset-x-0 max-w-2xl mx-auto z-50", className)}
    >
      <Menu setActive={setActive}>
        <MenuItem setActive={setActive} active={active} item="Services">
          <div className="flex flex-col space-y-4 text-sm">
            <HoveredLink href="/web-dev">Web Development</HoveredLink>
            <HoveredLink href="/interface-design">Interface Design</HoveredLink>
            <HoveredLink href="/seo">Search Engine Optimization</HoveredLink>
            <HoveredLink href="/branding">Branding</HoveredLink>
          </div>
        </MenuItem>
        <MenuItem setActive={setActive} active={active} item="Products">
          <div className="text-sm grid grid-cols-2 gap-10 p-4">
            <ProductItem
              title="AI Platform"
              href="https://example.com"
              src="https://images.unsplash.com/photo-1677442136019-21780ecad995?w=140&h=70&fit=crop&crop=center"
              description="Advanced AI solutions for modern businesses."
            />
            <ProductItem
              title="Design System"
              href="https://example.com"
              src="https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=140&h=70&fit=crop&crop=center"
              description="Beautiful, consistent design components for your projects."
            />
            <ProductItem
              title="Analytics Dashboard"
              href="https://example.com"
              src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=140&h=70&fit=crop&crop=center"
              description="Real-time insights and data visualization tools."
            />
            <ProductItem
              title="Mobile App"
              href="https://example.com"
              src="https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=140&h=70&fit=crop&crop=center"
              description="Cross-platform mobile solutions that scale."
            />
          </div>
        </MenuItem>
        <MenuItem setActive={setActive} active={active} item="Pricing">
          <div className="flex flex-col space-y-4 text-sm">
            <HoveredLink href="/hobby">Hobby</HoveredLink>
            <HoveredLink href="/individual">Individual</HoveredLink>
            <HoveredLink href="/team">Team</HoveredLink>
            <HoveredLink href="/enterprise">Enterprise</HoveredLink>
          </div>
        </MenuItem>
      </Menu>
    </div>
  );
}