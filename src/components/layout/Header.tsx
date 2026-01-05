import { useState } from "react";
import { motion } from "framer-motion";
import { FileSignature, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "Technology", href: "#technology" },
  { label: "Process", href: "#how-it-works" },
  { label: "Demo", href: "#demo" },
  { label: "Verify", href: "#verify" },
];

export function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const handleNavClick = (href: string) => {
    setIsOpen(false);
    const element = document.querySelector(href);
    element?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <motion.header 
      className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-background/95 backdrop-blur-sm"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="container mx-auto px-4">
        <nav className="flex h-16 items-center justify-between">
          {/* Logo */}
          <a 
            href="#home" 
            className="flex items-center gap-2.5 group" 
            onClick={() => handleNavClick("#home")}
          >
            <FileSignature className="h-7 w-7 text-primary transition-transform duration-200 group-hover:scale-105" />
            <span className="text-xl font-serif font-semibold tracking-tight">
              <span className="text-primary">Sig</span>
              <span className="text-foreground">Auth</span>
            </span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => handleNavClick(link.href)}
                className="px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-150"
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden md:block">
            <Button size="sm" onClick={() => handleNavClick("#verify")}>
              Try Verification
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-muted-foreground hover:text-foreground transition-colors"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </nav>

        {/* Mobile Menu */}
        <motion.div
          className={cn("md:hidden overflow-hidden")}
          initial={false}
          animate={{ height: isOpen ? "auto" : 0 }}
          transition={{ duration: 0.2 }}
        >
          <div className="flex flex-col gap-1 pb-4">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => handleNavClick(link.href)}
                className="px-3 py-2.5 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-secondary rounded-md transition-colors duration-150 text-left"
              >
                {link.label}
              </button>
            ))}
            <Button size="sm" className="mt-2" onClick={() => handleNavClick("#verify")}>
              Try Verification
            </Button>
          </div>
        </motion.div>
      </div>
    </motion.header>
  );
}
