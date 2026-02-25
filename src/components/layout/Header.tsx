import { useState } from "react";
import { motion } from "framer-motion";
import { Shield, Menu, X, LogIn, LayoutDashboard, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useAuth } from "@/contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "Technology", href: "#technology" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "Demo", href: "#demo" },
  { label: "Verify", href: "#verify" },
  { label: "Features", href: "#features" },
];

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout, isAdmin } = useAuth();
  const navigate = useNavigate();

  const handleNavClick = (href: string) => {
    setIsOpen(false);
    const element = document.querySelector(href);
    element?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-xl"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="container mx-auto px-4">
        <nav className="flex h-16 items-center justify-between">
          {/* Logo */}
          <a href="#home" className="flex items-center gap-2 group" onClick={() => handleNavClick("#home")}>
            <div className="relative">
              <Shield className="h-8 w-8 text-primary transition-transform duration-300 group-hover:scale-110" />
              <div className="absolute inset-0 bg-primary/20 blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
            <span className="text-lg font-bold">
              <span className="text-gradient">Sig</span>
              <span className="text-foreground">Auth</span>
            </span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => handleNavClick(link.href)}
                className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-200 rounded-lg hover:bg-secondary"
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center gap-2">
            {user ? (
              <>
                {isAdmin && (
                  <Button variant="glow" size="sm" onClick={() => navigate("/admin")}>
                    <LayoutDashboard className="h-4 w-4" />
                    Admin
                  </Button>
                )}
                <span className="text-sm text-muted-foreground">{user.username}</span>
                <Button variant="ghost" size="sm" onClick={() => { logout(); }}>
                  <LogOut className="h-4 w-4" />
                </Button>
              </>
            ) : (
              <>
                <Button variant="ghost" size="sm" onClick={() => navigate("/login")}>
                  <LogIn className="h-4 w-4" />
                  Sign In
                </Button>
                <Button variant="hero" size="sm" onClick={() => handleNavClick("#verify")}>
                  Get Started
                </Button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-muted-foreground hover:text-foreground transition-colors"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </nav>

        {/* Mobile Menu */}
        <motion.div
          className={cn("md:hidden overflow-hidden")}
          initial={false}
          animate={{ height: isOpen ? "auto" : 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex flex-col gap-2 pb-4">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => handleNavClick(link.href)}
                className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-200 rounded-lg hover:bg-secondary text-left"
              >
                {link.label}
              </button>
            ))}
            {user ? (
              <>
                {isAdmin && (
                  <Button variant="glow" size="sm" onClick={() => { setIsOpen(false); navigate("/admin"); }}>
                    <LayoutDashboard className="h-4 w-4" />
                    Admin Dashboard
                  </Button>
                )}
                <Button variant="ghost" size="sm" onClick={() => { logout(); setIsOpen(false); }}>
                  <LogOut className="h-4 w-4" />
                  Sign Out
                </Button>
              </>
            ) : (
              <Button variant="hero" size="sm" className="mt-2" onClick={() => { setIsOpen(false); navigate("/login"); }}>
                <LogIn className="h-4 w-4" />
                Sign In
              </Button>
            )}
          </div>
        </motion.div>
      </div>
    </motion.header>
  );
}
