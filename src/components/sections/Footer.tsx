import { FileSignature, Github, Linkedin, Mail, ExternalLink } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-card/50">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <a href="#home" className="flex items-center gap-2 mb-4">
              <FileSignature className="h-6 w-6 text-primary" />
              <span className="text-lg font-serif font-semibold">
                <span className="text-primary">Sig</span>
                <span className="text-foreground">Auth</span>
              </span>
            </a>
            <p className="text-muted-foreground text-sm max-w-md mb-4">
              Advanced forgery-resilient signature authentication using Siamese Metric Learning 
              and Digital Tamper Detection. Built for enterprise security.
            </p>
            <div className="flex gap-3">
              <a href="#" className="p-2 rounded-md bg-secondary hover:bg-secondary/80 transition-colors">
                <Github className="h-4 w-4 text-muted-foreground hover:text-foreground transition-colors" />
              </a>
              <a href="#" className="p-2 rounded-md bg-secondary hover:bg-secondary/80 transition-colors">
                <Linkedin className="h-4 w-4 text-muted-foreground hover:text-foreground transition-colors" />
              </a>
              <a href="#" className="p-2 rounded-md bg-secondary hover:bg-secondary/80 transition-colors">
                <Mail className="h-4 w-4 text-muted-foreground hover:text-foreground transition-colors" />
              </a>
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Technology</h4>
            <ul className="space-y-2">
              <li><a href="#technology" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Architecture</a></li>
              <li><a href="#how-it-works" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Process</a></li>
              <li><a href="#demo" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Demo</a></li>
              <li>
                <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-1">
                  Documentation <ExternalLink className="h-3 w-3" />
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-foreground mb-4">Datasets</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-1">
                  SVC2004 <ExternalLink className="h-3 w-3" />
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-1">
                  SCUT-MMSIG <ExternalLink className="h-3 w-3" />
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-1">
                  Research Paper <ExternalLink className="h-3 w-3" />
                </a>
              </li>
              <li><a href="#features" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Features</a></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © {currentYear} SigAuth. Advanced Signature Authentication System.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Privacy</a>
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
