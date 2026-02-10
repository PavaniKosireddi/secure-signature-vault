import { useRef, useCallback } from "react";
import { motion } from "framer-motion";
import { Download, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function Architecture() {
  const diagramRef = useRef<HTMLDivElement>(null);

  const handleDownload = useCallback(() => {
    const svg = diagramRef.current?.querySelector("svg");
    if (!svg) return;
    const clone = svg.cloneNode(true) as SVGSVGElement;
    clone.setAttribute("xmlns", "http://www.w3.org/2000/svg");
    const blob = new Blob([clone.outerHTML], { type: "image/svg+xml" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "SigAuth_Architecture.svg";
    a.click();
    URL.revokeObjectURL(url);
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <Link to="/">
            <Button variant="outline" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
          </Link>
          <Button variant="hero" onClick={handleDownload}>
            <Download className="h-4 w-4 mr-2" />
            Download SVG
          </Button>
        </div>

        <motion.h1
          className="text-3xl md:text-4xl font-bold text-center mb-2"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <span className="text-gradient">SigAuth</span>{" "}
          <span className="text-foreground">System Architecture</span>
        </motion.h1>
        <p className="text-center text-muted-foreground mb-8">
          Complete end-to-end verification pipeline
        </p>

        <motion.div
          ref={diagramRef}
          className="glass-card p-4 md:p-8 overflow-x-auto"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
        >
          <svg
            viewBox="0 0 1200 820"
            className="w-full min-w-[900px]"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            {/* Background */}
            <rect width="1200" height="820" rx="16" fill="#0b1121" />

            {/* Title */}
            <text x="600" y="40" textAnchor="middle" fill="#38bdf8" fontSize="22" fontWeight="700">
              SigAuth — AI Signature Authentication Architecture
            </text>

            {/* ─── FRONTEND SECTION ─── */}
            <rect x="40" y="65" width="340" height="230" rx="12" fill="#0f1a2e" stroke="#1e3a5f" strokeWidth="1.5" />
            <text x="210" y="92" textAnchor="middle" fill="#38bdf8" fontSize="14" fontWeight="700">
              FRONTEND (React + Vite)
            </text>

            {/* Reference Upload */}
            <rect x="60" y="108" width="140" height="56" rx="8" fill="#162236" stroke="#2563eb" strokeWidth="1" />
            <text x="130" y="133" textAnchor="middle" fill="#93c5fd" fontSize="11" fontWeight="600">Reference</text>
            <text x="130" y="150" textAnchor="middle" fill="#64748b" fontSize="9">Known Genuine</text>

            {/* Test Upload */}
            <rect x="220" y="108" width="140" height="56" rx="8" fill="#162236" stroke="#2563eb" strokeWidth="1" />
            <text x="290" y="133" textAnchor="middle" fill="#93c5fd" fontSize="11" fontWeight="600">Test Signature</text>
            <text x="290" y="150" textAnchor="middle" fill="#64748b" fontSize="9">To Verify</text>

            {/* Base64 conversion */}
            <rect x="100" y="180" width="220" height="36" rx="6" fill="#1e293b" stroke="#334155" strokeWidth="1" />
            <text x="210" y="203" textAnchor="middle" fill="#94a3b8" fontSize="10">Convert to Base64</text>

            {/* POST request */}
            <rect x="100" y="232" width="220" height="36" rx="6" fill="#0c4a6e" stroke="#0ea5e9" strokeWidth="1" />
            <text x="210" y="255" textAnchor="middle" fill="#7dd3fc" fontSize="10" fontWeight="600">POST /verify (JSON)</text>

            {/* Arrow from frontend to backend */}
            <defs>
              <marker id="arrowCyan" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
                <path d="M0,0 L8,3 L0,6" fill="#22d3ee" />
              </marker>
              <marker id="arrowGreen" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
                <path d="M0,0 L8,3 L0,6" fill="#4ade80" />
              </marker>
              <marker id="arrowRed" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
                <path d="M0,0 L8,3 L0,6" fill="#f87171" />
              </marker>
              <marker id="arrowAmber" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
                <path d="M0,0 L8,3 L0,6" fill="#fbbf24" />
              </marker>
            </defs>

            <line x1="380" y1="250" x2="430" y2="250" stroke="#22d3ee" strokeWidth="2" markerEnd="url(#arrowCyan)" />
            <text x="405" y="243" textAnchor="middle" fill="#22d3ee" fontSize="8">ngrok</text>

            {/* ─── BACKEND SECTION ─── */}
            <rect x="440" y="65" width="720" height="700" rx="12" fill="#0f1a2e" stroke="#1e3a5f" strokeWidth="1.5" />
            <text x="800" y="92" textAnchor="middle" fill="#38bdf8" fontSize="14" fontWeight="700">
              BACKEND (Flask + PyTorch — Google Colab GPU)
            </text>

            {/* Preprocessing */}
            <rect x="470" y="110" width="280" height="70" rx="8" fill="#162236" stroke="#6366f1" strokeWidth="1" />
            <text x="610" y="135" textAnchor="middle" fill="#a5b4fc" fontSize="12" fontWeight="600">Preprocessing</text>
            <text x="610" y="155" textAnchor="middle" fill="#64748b" fontSize="10">Decode Base64 → Grayscale → 224×224</text>
            <text x="610" y="170" textAnchor="middle" fill="#64748b" fontSize="10">Normalize (mean=0.5, std=0.5)</text>

            <line x1="610" y1="180" x2="610" y2="205" stroke="#22d3ee" strokeWidth="1.5" markerEnd="url(#arrowCyan)" />

            {/* MD5 Hash Check */}
            <rect x="470" y="205" width="280" height="45" rx="8" fill="#1c1917" stroke="#a16207" strokeWidth="1" />
            <text x="610" y="225" textAnchor="middle" fill="#fbbf24" fontSize="11" fontWeight="600">MD5 Hash Check</text>
            <text x="610" y="240" textAnchor="middle" fill="#64748b" fontSize="9">Same image? → Instant GENUINE</text>

            <line x1="610" y1="250" x2="610" y2="275" stroke="#22d3ee" strokeWidth="1.5" markerEnd="url(#arrowCyan)" />

            {/* ─── STAGE 1: TAMPER DETECTION ─── */}
            <rect x="470" y="275" width="330" height="185" rx="10" fill="#1a0f0f" stroke="#dc2626" strokeWidth="1.2" />
            <text x="635" y="298" textAnchor="middle" fill="#fca5a5" fontSize="12" fontWeight="700">STAGE 1: Tamper Detection CNN</text>
            <text x="635" y="314" textAnchor="middle" fill="#ef4444" fontSize="9">(Test Signature Only)</text>

            {/* CNN blocks */}
            {[
              { y: 325, label: "Block 1: Conv(1→32)×2 + BN + ReLU + MaxPool" },
              { y: 345, label: "Block 2: Conv(32→64)×2 + BN + ReLU + MaxPool" },
              { y: 365, label: "Block 3: Conv(64→128)×2 + BN + ReLU + MaxPool" },
              { y: 385, label: "Block 4: Conv(128→256)×2 + BN + ReLU + AdaptiveAvgPool" },
            ].map((item, i) => (
              <g key={i}>
                <rect x="485" y={item.y} width="300" height="17" rx="3" fill="#2a1515" />
                <text x="635" y={item.y + 12} textAnchor="middle" fill="#fca5a5" fontSize="8">
                  {item.label}
                </text>
              </g>
            ))}

            <rect x="485" y="410" width="300" height="17" rx="3" fill="#2a1515" />
            <text x="635" y="422" textAnchor="middle" fill="#fca5a5" fontSize="8">
              Classifier: 4096 → 512 → 128 → 2 (Clean/Tampered)
            </text>

            <rect x="530" y="435" width="210" height="16" rx="3" fill="#7f1d1d" />
            <text x="635" y="447" textAnchor="middle" fill="#fef2f2" fontSize="8" fontWeight="600">
              Loss: CrossEntropy | Metrics: Acc, P, R, F1
            </text>

            {/* Tamper decision */}
            {/* Diamond shape for decision */}
            <polygon points="635,475 685,505 635,535 585,505" fill="#451a03" stroke="#f59e0b" strokeWidth="1" />
            <text x="635" y="503" textAnchor="middle" fill="#fbbf24" fontSize="9" fontWeight="600">Tamper</text>
            <text x="635" y="514" textAnchor="middle" fill="#fbbf24" fontSize="9" fontWeight="600">≥ 0.6?</text>

            {/* Yes: Tampered */}
            <line x1="685" y1="505" x2="750" y2="505" stroke="#f87171" strokeWidth="1.5" markerEnd="url(#arrowRed)" />
            <text x="717" y="498" textAnchor="middle" fill="#f87171" fontSize="9">Yes</text>

            <rect x="755" y="490" width="100" height="30" rx="6" fill="#7f1d1d" stroke="#ef4444" strokeWidth="1" />
            <text x="805" y="510" textAnchor="middle" fill="#fca5a5" fontSize="11" fontWeight="700">⚠ TAMPERED</text>

            {/* No: Continue */}
            <line x1="635" y1="535" x2="635" y2="560" stroke="#4ade80" strokeWidth="1.5" markerEnd="url(#arrowGreen)" />
            <text x="650" y="550" fill="#4ade80" fontSize="9">No</text>

            {/* ─── STAGE 2: SIAMESE NETWORK ─── */}
            <rect x="470" y="565" width="330" height="185" rx="10" fill="#0f1a0f" stroke="#22c55e" strokeWidth="1.2" />
            <text x="635" y="588" textAnchor="middle" fill="#86efac" fontSize="12" fontWeight="700">STAGE 2: Siamese Network</text>
            <text x="635" y="604" textAnchor="middle" fill="#4ade80" fontSize="9">(Both Signatures)</text>

            {/* ResNet/EfficientNet */}
            <rect x="485" y="615" width="140" height="50" rx="6" fill="#14532d" stroke="#22c55e" strokeWidth="0.8" />
            <text x="555" y="636" textAnchor="middle" fill="#bbf7d0" fontSize="9" fontWeight="600">EfficientNet-B3</text>
            <text x="555" y="650" textAnchor="middle" fill="#64748b" fontSize="8">(Training)</text>

            <rect x="645" y="615" width="140" height="50" rx="6" fill="#14532d" stroke="#22c55e" strokeWidth="0.8" />
            <text x="715" y="636" textAnchor="middle" fill="#bbf7d0" fontSize="9" fontWeight="600">ResNet-18</text>
            <text x="715" y="650" textAnchor="middle" fill="#64748b" fontSize="8">(API Inference)</text>

            <rect x="485" y="675" width="300" height="20" rx="3" fill="#052e16" />
            <text x="635" y="689" textAnchor="middle" fill="#86efac" fontSize="9">
              Embedding: 256-dim (L2 Normalized) → Cosine Similarity
            </text>

            <rect x="485" y="700" width="300" height="20" rx="3" fill="#052e16" />
            <text x="635" y="714" textAnchor="middle" fill="#86efac" fontSize="9">
              Loss: ArcFace + Triplet | Metrics: FAR, FRR, EER
            </text>

            <rect x="530" y="728" width="210" height="16" rx="3" fill="#14532d" />
            <text x="635" y="740" textAnchor="middle" fill="#dcfce7" fontSize="8" fontWeight="600">
              Similarity ≥ 0.75 → GENUINE | else → FORGED
            </text>

            {/* ─── DECISION OUTPUT ─── */}
            <rect x="850" y="565" width="290" height="185" rx="10" fill="#0f172a" stroke="#38bdf8" strokeWidth="1.2" />
            <text x="995" y="590" textAnchor="middle" fill="#7dd3fc" fontSize="12" fontWeight="700">FINAL OUTPUT (JSON)</text>

            <g>
              <rect x="870" y="605" width="250" height="30" rx="6" fill="#052e16" stroke="#22c55e" strokeWidth="0.8" />
              <text x="995" y="624" textAnchor="middle" fill="#4ade80" fontSize="11" fontWeight="600">✓ GENUINE</text>
            </g>
            <g>
              <rect x="870" y="645" width="250" height="30" rx="6" fill="#7f1d1d" stroke="#ef4444" strokeWidth="0.8" />
              <text x="995" y="664" textAnchor="middle" fill="#f87171" fontSize="11" fontWeight="600">✗ FORGED</text>
            </g>
            <g>
              <rect x="870" y="685" width="250" height="30" rx="6" fill="#451a03" stroke="#f59e0b" strokeWidth="0.8" />
              <text x="995" y="704" textAnchor="middle" fill="#fbbf24" fontSize="11" fontWeight="600">⚠ TAMPERED</text>
            </g>

            <text x="995" y="735" textAnchor="middle" fill="#64748b" fontSize="9">
              + confidence, siameseScore, tamperScore
            </text>

            {/* Arrows from Siamese to output */}
            <line x1="800" y1="660" x2="850" y2="660" stroke="#38bdf8" strokeWidth="1.5" markerEnd="url(#arrowCyan)" />

            {/* ─── RESPONSE ARROW BACK ─── */}
            <rect x="850" y="275" width="290" height="180" rx="10" fill="#0f172a" stroke="#6366f1" strokeWidth="1.2" />
            <text x="995" y="300" textAnchor="middle" fill="#a5b4fc" fontSize="12" fontWeight="700">DATASETS</text>

            <rect x="870" y="315" width="250" height="35" rx="6" fill="#1e1b4b" stroke="#6366f1" strokeWidth="0.8" />
            <text x="995" y="330" textAnchor="middle" fill="#c4b5fd" fontSize="10" fontWeight="600">SVC2004 (Task 1 + Task 2)</text>
            <text x="995" y="342" textAnchor="middle" fill="#64748b" fontSize="8">U1-U40 × S1-S20 (Genuine) + S21-S40 (Forged)</text>

            <rect x="870" y="360" width="250" height="35" rx="6" fill="#1e1b4b" stroke="#6366f1" strokeWidth="0.8" />
            <text x="995" y="375" textAnchor="middle" fill="#c4b5fd" fontSize="10" fontWeight="600">Synthetic Tamper Dataset</text>
            <text x="995" y="387" textAnchor="middle" fill="#64748b" fontSize="8">clean/ + tampered/ (copy-paste manipulation)</text>

            <rect x="870" y="405" width="250" height="35" rx="6" fill="#1e1b4b" stroke="#6366f1" strokeWidth="0.8" />
            <text x="995" y="420" textAnchor="middle" fill="#c4b5fd" fontSize="10" fontWeight="600">Preprocessing Pipeline</text>
            <text x="995" y="432" textAnchor="middle" fill="#64748b" fontSize="8">RandomRotation(5°) + RandomAffine + Normalize</text>

            {/* ─── RESPONSE back to frontend ─── */}
            <rect x="40" y="330" width="340" height="180" rx="12" fill="#0f1a2e" stroke="#1e3a5f" strokeWidth="1.5" />
            <text x="210" y="358" textAnchor="middle" fill="#38bdf8" fontSize="14" fontWeight="700">
              FRONTEND DISPLAY
            </text>

            <rect x="60" y="375" width="140" height="50" rx="6" fill="#052e16" stroke="#22c55e" strokeWidth="0.8" />
            <text x="130" y="396" textAnchor="middle" fill="#4ade80" fontSize="10" fontWeight="600">Verdict Card</text>
            <text x="130" y="412" textAnchor="middle" fill="#64748b" fontSize="8">GENUINE/FORGED/TAMPERED</text>

            <rect x="220" y="375" width="140" height="50" rx="6" fill="#0c4a6e" stroke="#0ea5e9" strokeWidth="0.8" />
            <text x="290" y="396" textAnchor="middle" fill="#7dd3fc" fontSize="10" fontWeight="600">Score Bars</text>
            <text x="290" y="412" textAnchor="middle" fill="#64748b" fontSize="8">Siamese + Tamper %</text>

            <rect x="60" y="440" width="300" height="50" rx="6" fill="#162236" stroke="#334155" strokeWidth="0.8" />
            <text x="210" y="462" textAnchor="middle" fill="#94a3b8" fontSize="10" fontWeight="600">Detailed Analysis</text>
            <text x="210" y="478" textAnchor="middle" fill="#64748b" fontSize="8">Stroke Consistency • Pressure • Spatial • Pixel Anomalies</text>

            {/* Response arrow */}
            <line x1="440" y1="400" x2="395" y2="400" stroke="#4ade80" strokeWidth="2" markerEnd="url(#arrowGreen)" strokeDasharray="6 3" />
            <text x="418" y="393" textAnchor="middle" fill="#4ade80" fontSize="8">JSON</text>

            {/* ─── ENHANCEMENTS BOX ─── */}
            <rect x="40" y="545" width="340" height="220" rx="12" fill="#1a0f2e" stroke="#7c3aed" strokeWidth="1.5" />
            <text x="210" y="572" textAnchor="middle" fill="#c4b5fd" fontSize="13" fontWeight="700">
              ✨ ENHANCEMENTS vs Base Paper
            </text>

            {[
              "1. EfficientNet-B3 backbone (was ResNet-18)",
              "2. ArcFace Loss for angular margin learning",
              "3. 256-dim L2-normalized embeddings",
              "4. Cosine similarity (was Euclidean dist.)",
              "5. Dual-conv Tamper CNN (deeper blocks)",
              "6. Deeper classifier (4096→512→128→2)",
              "7. MD5 same-image hash optimization",
              "8. Tamper score weighted by (1-similarity)",
              "9. ReduceLROnPlateau scheduler",
            ].map((text, i) => (
              <text key={i} x="60" y={598 + i * 18} fill="#e9d5ff" fontSize="9">
                {text}
              </text>
            ))}

            {/* Legend */}
            <rect x="40" y="780" width="1120" height="30" rx="8" fill="#0f172a" stroke="#1e293b" strokeWidth="1" />
            <circle cx="80" cy="795" r="5" fill="#22c55e" />
            <text x="92" y="799" fill="#64748b" fontSize="9">Genuine Path</text>
            <circle cx="200" cy="795" r="5" fill="#ef4444" />
            <text x="212" y="799" fill="#64748b" fontSize="9">Tampered Path</text>
            <circle cx="320" cy="795" r="5" fill="#f59e0b" />
            <text x="332" y="799" fill="#64748b" fontSize="9">Decision Node</text>
            <circle cx="440" cy="795" r="5" fill="#6366f1" />
            <text x="452" y="799" fill="#64748b" fontSize="9">Data/Preprocessing</text>
            <circle cx="580" cy="795" r="5" fill="#22d3ee" />
            <text x="592" y="799" fill="#64748b" fontSize="9">API/Network Flow</text>
          </svg>
        </motion.div>
      </div>
    </div>
  );
}
