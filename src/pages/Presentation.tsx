import { useState, useRef, useCallback } from "react";
import { ArrowLeft, ArrowRight, Download, Home, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import architectureDiagram from "@/assets/architecture-diagram.png";

/* ────────────────────────────────────────────────────────────── */
/*  Slide data                                                    */
/* ────────────────────────────────────────────────────────────── */

interface Slide {
  title: string;
  category?: string;
  content: React.ReactNode;
}

const CodeBlock = ({ code }: { code: string }) => (
  <pre className="bg-[#1e1e2e] text-[#cdd6f4] rounded-lg p-4 text-xs md:text-sm overflow-x-auto font-mono leading-relaxed border border-[#313244]">
    <code>{code}</code>
  </pre>
);

const slides: Slide[] = [
  /* ─── SLIDE 1: TITLE ─── */
  {
    title: "",
    content: (
      <div className="flex flex-col items-center justify-center h-full text-center gap-6">
        <h1 className="text-3xl md:text-5xl font-bold leading-tight">
          AI-Based Signature Authentication System Using Siamese Metric Learning and Digital Tamper Detection
        </h1>
        <p className="text-xl md:text-2xl font-semibold text-blue-800 mt-2">SigAuth</p>
        <div className="mt-4 text-lg">
          <p className="font-semibold">Guided by: Mrs. K. Sirisha</p>
          <p className="text-sm text-gray-600">Assistant Professor, Department of CSE, GVPCEW</p>
        </div>
        <div className="mt-4">
          <p className="font-bold text-lg mb-2">TEAM MEMBERS</p>
          <div className="grid grid-cols-2 gap-x-12 gap-y-1 text-sm">
            <span>V.Roshini Priyanka (322103210171)</span>
            <span>K.Harshitha Reddy (322103210190)</span>
            <span>R.Prasanna (322103210134)</span>
            <span>S.Lavanya (322103210143)</span>
          </div>
        </div>
        <div className="mt-6 text-xs text-center text-gray-500 max-w-2xl">
          <p className="font-semibold text-sm">Department of Computer Science and Engineering</p>
          <p className="font-bold">GAYATRI VIDYA PARISHAD COLLEGE OF ENGINEERING FOR WOMEN</p>
          <p>[Approved by AICTE NEW DELHI, Affiliated to Andhra University]</p>
          <p>Kommadi, Madhurawada, Visakhapatnam–530048 | 2025–2026</p>
        </div>
      </div>
    ),
  },

  /* ─── SLIDE 2: CONTENTS ─── */
  {
    title: "CONTENTS",
    content: (
      <ol className="list-decimal list-inside text-lg md:text-xl space-y-3 pl-8">
        {[
          "Abstract", "Introduction", "Literature Survey", "Existing System",
          "Proposed System", "Requirements", "Architecture", "Modules",
          "Algorithms Used", "Implementation", "Output Screens",
        ].map((item, i) => (
          <li key={i} className="font-medium">{item}</li>
        ))}
      </ol>
    ),
  },

  /* ─── SLIDE 3: ABSTRACT ─── */
  {
    title: "ABSTRACT",
    content: (
      <p className="text-base md:text-lg leading-relaxed">
        Signature forgery remains a critical security challenge, with traditional methods relying on basic image classification that fails against skilled forgeries and digital tampering. To address this, our work extends conventional ResNet-based classification by introducing a <strong>dual-model metric learning architecture</strong>. A <strong>Siamese Network with EfficientNet-B3 backbone</strong> generates 256-dimensional L2-normalized embeddings, trained with <strong>ArcFace and Triplet Loss</strong> for angular margin-based skilled forgery detection. A dedicated <strong>custom deep CNN</strong> with dual convolutions per block detects digital copy-paste and overlay tampering. An <strong>MD5 hash optimization</strong> instantly identifies identical submissions. A <strong>Decision Fusion pipeline</strong> combines both model outputs using weighted scoring (0.7×Siamese + 0.3×PCA) for final classification as GENUINE, FORGED, or TAMPERED. This system is exposed through a Flask REST API and integrated with a React frontend for real-time verification, achieving target EER &lt;10% for forgery and &gt;95% accuracy for tamper detection.
      </p>
    ),
  },

  /* ─── SLIDE 4: INTRODUCTION ─── */
  {
    title: "INTRODUCTION",
    content: (
      <div className="space-y-6">
        <div>
          <h3 className="text-xl font-bold mb-2">PROBLEM STATEMENT:</h3>
          <ul className="list-disc pl-6 space-y-2 text-base">
            <li>Handwritten signature verification is crucial for banking, legal, and governmental document authentication, yet existing systems fail against <strong>skilled forgeries</strong> crafted by trained imitators.</li>
            <li>Digital signature manipulation through copy-paste, overlays, and resizing creates a new attack vector that traditional verification systems do not address.</li>
          </ul>
        </div>
        <div>
          <h3 className="text-xl font-bold mb-2">PROPOSED SOLUTION:</h3>
          <ul className="list-disc pl-6 space-y-2 text-base">
            <li>Our project introduces <strong>SigAuth</strong>, a dual-model AI system combining a Siamese Network for skilled forgery detection with a Tamper Detection CNN for digital manipulation analysis.</li>
            <li>The objective is to build a production-ready, API-driven signature authentication system that detects both handwritten forgeries (via metric learning) and digital tampering (via anomaly detection), with real-time results via a web interface.</li>
          </ul>
        </div>
      </div>
    ),
  },

  /* ─── SLIDE 5: BASE PAPER ─── */
  {
    title: "BASE PAPER DETAILS",
    content: (
      <div className="space-y-4">
        <h3 className="text-xl font-bold">SigNet: Convolutional Siamese Network for Writer Independent Offline Signature Verification</h3>
        <table className="w-full text-sm border-collapse">
          <tbody>
            <tr className="border-b"><td className="font-semibold py-2 pr-4 w-40">Published Year</td><td className="py-2">2017</td></tr>
            <tr className="border-b"><td className="font-semibold py-2 pr-4">Journal</td><td className="py-2">arXiv / Pattern Recognition Letters</td></tr>
            <tr className="border-b"><td className="font-semibold py-2 pr-4">Key Idea</td><td className="py-2">Uses a Siamese CNN with ResNet backbone and contrastive loss for writer-independent offline signature verification.</td></tr>
            <tr><td className="font-semibold py-2 pr-4">Limitation</td><td className="py-2">Uses simple Euclidean distance, no angular margin, no tamper detection, ResNet-18 only, and no digital manipulation handling.</td></tr>
          </tbody>
        </table>
      </div>
    ),
  },

  /* ─── SLIDE 6: EXISTING SYSTEM ─── */
  {
    title: "EXISTING SYSTEM",
    content: (
      <div className="space-y-3">
        {[
          { t: "Classification-Based Approach:", d: "Existing systems use binary classifiers (genuine/forged) with ResNet, which struggle with unseen users and skilled forgeries." },
          { t: "Euclidean Distance:", d: "Similarity is measured using Euclidean distance, which doesn't capture angular relationships between signature embeddings effectively." },
          { t: "No Tamper Detection:", d: "Base systems have zero capability to detect digital manipulations like copy-paste, overlay, or resize attacks on signature images." },
          { t: "Single Model Architecture:", d: "Only one model is used for all verification, missing the nuance between handwritten forgery and digital tampering." },
          { t: "No Production API:", d: "Existing implementations lack a deployable REST API for real-time integration with web or mobile frontends." },
        ].map((item, i) => (
          <div key={i}>
            <h4 className="font-bold">{item.t}</h4>
            <p className="text-sm text-gray-700">{item.d}</p>
          </div>
        ))}
      </div>
    ),
  },

  /* ─── SLIDE 7: PROPOSED SYSTEM ─── */
  {
    title: "PROPOSED SYSTEM",
    content: (
      <div className="space-y-3">
        {[
          { t: "Metric Learning with EfficientNet-B3:", d: "Replaces classification with 256-dim L2-normalized embeddings and Cosine Similarity for writer-independent verification." },
          { t: "ArcFace + Triplet Loss Training:", d: "Angular margin-based loss function creates more discriminative embeddings, especially against skilled forgeries (S21-S40 as hard negatives)." },
          { t: "Dedicated Tamper Detection CNN:", d: "A separate deep CNN with dual-conv blocks analyzes pixel-level anomalies from copy-paste, overlay, and resize attacks." },
          { t: "Decision Fusion Pipeline:", d: "MD5 hash check → Tamper Detection → Siamese Analysis, combining scores with weighted formula for final verdict." },
          { t: "Production-Ready Architecture:", d: "Flask REST API with ngrok tunneling, React + TypeScript frontend with real-time result display and drag-drop upload." },
        ].map((item, i) => (
          <div key={i}>
            <h4 className="font-bold">{item.t}</h4>
            <p className="text-sm text-gray-700">{item.d}</p>
          </div>
        ))}
      </div>
    ),
  },

  /* ─── SLIDE 8: REQUIREMENTS ─── */
  {
    title: "REQUIREMENTS",
    category: "Software Requirements",
    content: (
      <div className="space-y-6">
        <h3 className="text-xl font-bold">Software Requirements</h3>
        <table className="w-full text-sm border-collapse border border-gray-300">
          <tbody>
            {[
              ["Programming Language(s)", "Python 3.9+, TypeScript"],
              ["Frameworks & Libraries", "Flask, PyTorch, React, Vite, Tailwind CSS"],
              ["Deep Learning", "EfficientNet-B3 (timm), torchvision, ArcFace Loss"],
              ["Database", "In-Memory (PyTorch tensors, NumPy arrays)"],
              ["Development Tools", "Google Colab (GPU), VS Code, Git"],
              ["Tunneling", "ngrok (for Colab → Frontend connection)"],
              ["Environment", "Google Colab (T4 GPU) + Local Dev Server (Vite)"],
              ["Operating System(s)", "Windows 10/11, Linux, macOS, ChromeOS (Colab)"],
            ].map(([k, v], i) => (
              <tr key={i} className="border-b border-gray-300">
                <td className="font-semibold py-2 px-3 bg-blue-50 w-52">{k}</td>
                <td className="py-2 px-3">{v}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <h3 className="text-xl font-bold mt-4">Hardware Requirements</h3>
        <table className="w-full text-sm border-collapse border border-gray-300">
          <thead><tr className="bg-blue-50"><th className="py-2 px-3 text-left">Requirement</th><th className="py-2 px-3 text-left">Minimum</th><th className="py-2 px-3 text-left">Used</th></tr></thead>
          <tbody>
            <tr className="border-b border-gray-300"><td className="py-2 px-3">Processor</td><td className="py-2 px-3">Intel Core i3</td><td className="py-2 px-3">Google Colab T4 GPU</td></tr>
            <tr className="border-b border-gray-300"><td className="py-2 px-3">RAM</td><td className="py-2 px-3">4 GB</td><td className="py-2 px-3">12 GB (Colab)</td></tr>
            <tr><td className="py-2 px-3">GPU</td><td className="py-2 px-3">Not required (CPU fallback)</td><td className="py-2 px-3">NVIDIA Tesla T4 (16 GB VRAM)</td></tr>
          </tbody>
        </table>
      </div>
    ),
  },

  /* ─── SLIDE 9: ARCHITECTURE ─── */
  {
    title: "ARCHITECTURE",
    content: (
      <div className="flex flex-col items-center gap-4">
        <img src={architectureDiagram} alt="SigAuth System Architecture" className="w-full max-w-4xl rounded-lg border border-gray-300 shadow-md" />
        <p className="text-xs text-gray-500 text-center">SigAuth System Architecture — Advanced Signature Verification using Dual AI Models</p>
      </div>
    ),
  },

  /* ─── SLIDE 10: MODULE 1 ─── */
  {
    title: "MODULES",
    category: "Module 1: Signature Preprocessing",
    content: (
      <div className="space-y-4">
        <h3 className="text-xl font-bold">Module 1: Signature Preprocessing</h3>
        <p><strong>Purpose:</strong> Convert raw signature images into standardized ML-ready tensors.</p>
        <h4 className="font-bold mt-3">Dual-Path Architecture:</h4>
        <table className="w-full text-sm border-collapse border border-gray-300">
          <thead><tr className="bg-blue-50"><th className="py-2 px-3 text-left">Path</th><th className="py-2 px-3 text-left">Purpose</th><th className="py-2 px-3 text-left">Output Tensor</th></tr></thead>
          <tbody>
            <tr className="border-b border-gray-300"><td className="py-2 px-3">Siamese (Grayscale)</td><td className="py-2 px-3">Feature extraction via EfficientNet-B3</td><td className="py-2 px-3">[1, 224, 224]</td></tr>
            <tr><td className="py-2 px-3">Tamper (Grayscale)</td><td className="py-2 px-3">Pixel anomaly detection</td><td className="py-2 px-3">[1, 224, 224]</td></tr>
          </tbody>
        </table>
        <h4 className="font-bold mt-3">Key Steps:</h4>
        <ul className="list-disc pl-6 text-sm space-y-1">
          <li>Resize → 224×224 pixels</li>
          <li>Normalize (mean=[0.5], std=[0.5])</li>
          <li>Augmentation: RandomRotation(5°) + RandomAffine(translate=0.05)</li>
        </ul>
        <p className="text-sm text-gray-600 mt-2"><strong>Impact:</strong> Ensures robustness across different scanners, pens, lighting, and paper textures.</p>
      </div>
    ),
  },

  /* ─── SLIDE 11: MODULE 2 ─── */
  {
    title: "MODULES",
    category: "Module 2: Tamper Detection CNN",
    content: (
      <div className="space-y-3">
        <h3 className="text-xl font-bold">Module 2: Tamper Detection CNN</h3>
        <p><strong>Purpose:</strong> Detect digitally manipulated signatures (copy-paste, overlay, resize, blur).</p>
        <h4 className="font-bold mt-2">Architecture: Custom 4-Block Deep CNN (Built from Scratch)</h4>
        <div className="bg-gray-50 p-3 rounded text-sm font-mono space-y-1 border">
          <p>Input [1, 224, 224]</p>
          <p>→ Block 1: Conv(1→32)×2 + BN + ReLU + MaxPool</p>
          <p>→ Block 2: Conv(32→64)×2 + BN + ReLU + MaxPool</p>
          <p>→ Block 3: Conv(64→128)×2 + BN + ReLU + MaxPool</p>
          <p>→ Block 4: Conv(128→256)×2 + BN + ReLU + AdaptiveAvgPool</p>
          <p>→ Classifier: 4096 → 512 → 128 → 2</p>
        </div>
        <h4 className="font-bold mt-2">Training:</h4>
        <ul className="list-disc pl-6 text-sm space-y-1">
          <li>Dataset: 500 clean + 500 tampered (synthetic)</li>
          <li>Types: Copy-paste, Resize, Overlay, Blur</li>
          <li>Loss: CrossEntropyLoss | Optimizer: Adam (lr=0.0001)</li>
          <li>Scheduler: ReduceLROnPlateau | Epochs: 30</li>
        </ul>
        <h4 className="font-bold mt-2">Performance Targets:</h4>
        <table className="text-sm border-collapse border border-gray-300 w-auto">
          <tbody>
            <tr className="border-b"><td className="py-1 px-3 font-semibold">Accuracy</td><td className="py-1 px-3">&gt;98%</td></tr>
            <tr className="border-b"><td className="py-1 px-3 font-semibold">Precision</td><td className="py-1 px-3">&gt;95%</td></tr>
            <tr><td className="py-1 px-3 font-semibold">F1-Score</td><td className="py-1 px-3">&gt;94%</td></tr>
          </tbody>
        </table>
      </div>
    ),
  },

  /* ─── SLIDE 12: MODULE 3 ─── */
  {
    title: "MODULES",
    category: "Module 3: Siamese Network",
    content: (
      <div className="space-y-3">
        <h3 className="text-xl font-bold">Module 3: Siamese Network</h3>
        <p><strong>Purpose:</strong> Detect skilled handwritten forgeries using metric learning.</p>
        <h4 className="font-bold mt-2">Architecture: Twin EfficientNet-B3 Encoders (Shared Weights)</h4>
        <div className="bg-gray-50 p-3 rounded text-sm font-mono border space-y-1">
          <p>Reference Image ──→ EfficientNet-B3 ──→ FC(1536→512→256) ──→ 256-dim Embedding (L2-norm)</p>
          <p>Test Image ──────→ EfficientNet-B3 ──→ FC(1536→512→256) ──→ 256-dim Embedding (L2-norm)</p>
          <p className="mt-1">                                                     ↓ Cosine Similarity → Score [0, 1]</p>
        </div>
        <h4 className="font-bold mt-2">Training Strategy — Triplet + ArcFace Loss:</h4>
        <ul className="list-disc pl-6 text-sm space-y-1">
          <li><strong>Anchor:</strong> U5S2.png (genuine signature)</li>
          <li><strong>Positive:</strong> U5S7.png (same user, genuine)</li>
          <li><strong>Negative:</strong> U5S25.png (skilled forgery — <em>OUR ENHANCEMENT</em>)</li>
        </ul>
        <h4 className="font-bold mt-2">Performance Targets:</h4>
        <table className="text-sm border-collapse border border-gray-300 w-auto">
          <tbody>
            <tr className="border-b"><td className="py-1 px-3 font-semibold">EER</td><td className="py-1 px-3">&lt;10%</td></tr>
            <tr className="border-b"><td className="py-1 px-3 font-semibold">Accuracy</td><td className="py-1 px-3">&gt;95%</td></tr>
            <tr><td className="py-1 px-3 font-semibold">Genuine Accept Rate</td><td className="py-1 px-3">&gt;93%</td></tr>
          </tbody>
        </table>
        <p className="text-sm font-semibold text-blue-700 mt-2">Key Innovation: Uses S21–S40 (skilled forgeries) as hard negatives + ArcFace angular margin</p>
      </div>
    ),
  },

  /* ─── SLIDE 13: MODULE 4 ─── */
  {
    title: "MODULES",
    category: "Module 4: Decision Fusion",
    content: (
      <div className="space-y-3">
        <h3 className="text-xl font-bold">Module 4: Decision Fusion</h3>
        <p><strong>Purpose:</strong> Combine both models for final verdict.</p>
        <h4 className="font-bold mt-2">Decision Pipeline:</h4>
        <div className="bg-gray-50 p-4 rounded text-sm font-mono border space-y-3">
          <div>
            <p className="font-bold">Step 0: MD5 Hash Check</p>
            <p>├── If hash(reference) == hash(test) → <span className="text-green-700 font-bold">GENUINE ✓</span> (identical image)</p>
            <p>└── Else → Continue</p>
          </div>
          <div>
            <p className="font-bold">Step 1: Tamper Check</p>
            <p>├── tamper_prob = softmax(CNN(test))[1] × (1 - similarity)</p>
            <p>├── If tamper_prob ≥ 0.6 → <span className="text-yellow-700 font-bold">TAMPERED ⚠️</span></p>
            <p>└── Else → Continue</p>
          </div>
          <div>
            <p className="font-bold">Step 2: Siamese Similarity</p>
            <p>├── similarity = (cosine_sim(ref_emb, test_emb) + 1) / 2</p>
            <p>├── If similarity ≥ 0.75 → <span className="text-green-700 font-bold">GENUINE ✓</span></p>
            <p>└── Else → <span className="text-red-700 font-bold">FORGED ✗</span></p>
          </div>
        </div>
        <h4 className="font-bold mt-2">Output Format (JSON):</h4>
        <CodeBlock code={`{
  "result": "genuine | forged | tampered",
  "confidence": 0.95,
  "siameseScore": 92.5,
  "tamperScore": 12.3
}`} />
      </div>
    ),
  },

  /* ─── SLIDE 14: MODULE 5 ─── */
  {
    title: "MODULES",
    category: "Module 5: Production Deployment",
    content: (
      <div className="space-y-4">
        <h3 className="text-xl font-bold">Module 5: Production Deployment</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <h4 className="font-bold">Backend API (Flask):</h4>
            <ul className="list-disc pl-6 text-sm space-y-1">
              <li>Endpoint: POST /verify</li>
              <li>Input: Base64 encoded images (JSON)</li>
              <li>Processing: ~200-300ms on GPU</li>
              <li>Output: JSON with verdict + confidence</li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold">Frontend (React + TypeScript):</h4>
            <ul className="list-disc pl-6 text-sm space-y-1">
              <li>Drag-and-drop signature upload</li>
              <li>Real-time progress tracking</li>
              <li>Visual result display with score bars</li>
              <li>Interactive architecture diagram</li>
            </ul>
          </div>
        </div>
        <h4 className="font-bold mt-2">Communication Flow:</h4>
        <div className="bg-gray-50 p-3 rounded text-sm font-mono border">
          User Upload → React (Base64) → Flask API (ngrok) → Preprocessing → Models → Fusion → JSON → React → Display
        </div>
        <h4 className="font-bold mt-2">Deployment:</h4>
        <table className="text-sm border-collapse border border-gray-300 w-full">
          <tbody>
            <tr className="border-b"><td className="py-2 px-3 font-semibold bg-blue-50">Development</td><td className="py-2 px-3">Google Colab (Flask:5000 + ngrok) + Vite (5173)</td></tr>
            <tr><td className="py-2 px-3 font-semibold bg-blue-50">Production</td><td className="py-2 px-3">AWS/GCP (Flask) + Vercel/Lovable (React)</td></tr>
          </tbody>
        </table>
      </div>
    ),
  },

  /* ─── SLIDE 15: ALGORITHMS USED — Siamese Metric Learning ─── */
  {
    title: "ALGORITHMS USED",
    category: "Siamese Metric Learning (Forgery Detection)",
    content: (
      <div className="space-y-4">
        <h3 className="text-xl font-bold">Siamese Metric Learning with EfficientNet-B3 (Forgery Detection)</h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-bold underline">Input:</h4>
            <ul className="list-disc pl-5 text-sm space-y-1 mt-1">
              <li><u>Anchor:</u> Genuine signature of user (e.g., U5S2.png)</li>
              <li><u>Positive:</u> Another genuine of same user (e.g., U5S7.png)</li>
              <li><u>Negative:</u> Skilled forgery of same user (e.g., U5S25.png)</li>
            </ul>
            <h4 className="font-bold underline mt-4">Steps:</h4>
            <ol className="list-decimal pl-5 text-sm space-y-1 mt-1">
              <li><u>Feature Extraction:</u> Pass through EfficientNet-B3 backbone (pretrained ImageNet).</li>
              <li><u>Embedding Generation:</u> FC layers (1536→512→256) produce 256-dim vector.</li>
              <li><u>L2 Normalization:</u> Embeddings projected onto unit hypersphere.</li>
              <li><u>Triplet Loss:</u> Pull anchor↔positive closer, push anchor↔negative apart (margin=1.0).</li>
              <li><u>ArcFace Loss:</u> Add angular margin (m=0.5) for harder class boundaries.</li>
              <li><u>Cosine Similarity:</u> Compare reference vs test in embedding space.</li>
            </ol>
          </div>
          <div>
            <h4 className="font-bold">How it Works:</h4>
            <div className="bg-gray-50 p-3 rounded text-xs font-mono border space-y-2 mt-1">
              <p>1️⃣ Take anchor (genuine) signature</p>
              <p>2️⃣ Extract 256-dim embedding via EfficientNet-B3</p>
              <p>3️⃣ Compare with test signature embedding</p>
              <p>4️⃣ Cosine Similarity score → [0, 1]</p>
              <p>5️⃣ If score ≥ 0.75 → GENUINE</p>
              <p>6️⃣ Else → FORGED</p>
            </div>
            <h4 className="font-bold mt-4">Mathematical View:</h4>
            <div className="bg-blue-50 p-3 rounded border border-blue-200 mt-1">
              <p className="text-sm">Loss = Triplet Loss + ArcFace Loss</p>
              <p className="text-sm font-mono mt-1">L_triplet = max(‖f(a)-f(p)‖² - ‖f(a)-f(n)‖² + margin, 0)</p>
              <p className="text-sm font-mono mt-1">L_arcface = -log(e^(s·cos(θ+m)) / Σe^(s·cos(θ)))</p>
              <p className="text-xs text-gray-600 mt-2">The network learns embeddings where genuine pairs are close and forgeries are far, with angular margin enforcement.</p>
            </div>
          </div>
        </div>
      </div>
    ),
  },

  /* ─── SLIDE 16: ALGORITHMS USED — Tamper Detection ─── */
  {
    title: "ALGORITHMS USED",
    category: "Tamper Detection CNN (Digital Manipulation)",
    content: (
      <div className="space-y-4">
        <h3 className="text-xl font-bold">Tamper Detection — Deep Custom CNN (Digital Manipulation)</h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-bold underline">Input:</h4>
            <ul className="list-disc pl-5 text-sm space-y-1 mt-1">
              <li><u>Test Signature:</u> Grayscale image, 224×224, normalized</li>
              <li><u>Context:</u> Binary classification — Clean (0) vs Tampered (1)</li>
            </ul>
            <h4 className="font-bold underline mt-4">Steps:</h4>
            <ol className="list-decimal pl-5 text-sm space-y-1 mt-1">
              <li><u>Dual Convolutions:</u> Each block has two Conv2d layers for richer features.</li>
              <li><u>Batch Normalization:</u> After each convolution for stable training.</li>
              <li><u>Progressive Downsampling:</u> MaxPool2d reduces spatial dimensions.</li>
              <li><u>Adaptive Pooling:</u> Final block uses AdaptiveAvgPool2d(4,4).</li>
              <li><u>Deep Classifier:</u> 4096→512→128→2 with Dropout (0.5, 0.3).</li>
              <li><u>Softmax Output:</u> Probability of tampered class.</li>
            </ol>
          </div>
          <div>
            <h4 className="font-bold">How it Works:</h4>
            <div className="bg-gray-50 p-3 rounded text-xs font-mono border space-y-2 mt-1">
              <p>1️⃣ Take test signature image</p>
              <p>2️⃣ Pass through 4 dual-conv blocks</p>
              <p>3️⃣ Flatten → Deep classifier head</p>
              <p>4️⃣ Softmax → tamper probability [0, 1]</p>
              <p>5️⃣ Weight by (1 - similarity) from Siamese</p>
              <p>6️⃣ If weighted_score ≥ 0.6 → TAMPERED</p>
            </div>
            <h4 className="font-bold mt-4">Mathematical View:</h4>
            <div className="bg-blue-50 p-3 rounded border border-blue-200 mt-1">
              <p className="text-sm font-mono">L_tamper = CrossEntropyLoss(output, label)</p>
              <p className="text-sm font-mono mt-1">tamper_score = P(tampered) × (1 - similarity)</p>
              <p className="text-xs text-gray-600 mt-2">Weighting by (1-similarity) reduces false positives: genuine signatures with high similarity will have suppressed tamper scores.</p>
            </div>
          </div>
        </div>
      </div>
    ),
  },

  /* ─── SLIDE 17: ALGORITHMS USED — MD5 + Decision Fusion ─── */
  {
    title: "ALGORITHMS USED",
    category: "MD5 Hash Check & Decision Fusion",
    content: (
      <div className="space-y-4">
        <h3 className="text-xl font-bold">MD5 Hash Check & Decision Fusion Algorithm</h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-bold">1. MD5 Hash Optimization:</h4>
            <ul className="list-disc pl-5 text-sm space-y-1 mt-1">
              <li>Compute MD5 hash of both reference and test image data</li>
              <li>If hashes match → identical images → instant GENUINE (skip all ML)</li>
              <li>Time complexity: O(n) where n = image size</li>
              <li>Eliminates unnecessary GPU inference for duplicate submissions</li>
            </ul>
            <h4 className="font-bold mt-4">2. Weighted Tamper Score:</h4>
            <div className="bg-yellow-50 p-3 rounded border border-yellow-200 text-sm mt-1">
              <p className="font-mono">weighted_tamper = raw_tamper × (1 - similarity)</p>
              <p className="text-xs text-gray-600 mt-1">If Siamese says "very similar" (high similarity), tamper score is suppressed. This prevents false tamper alerts on genuine signatures.</p>
            </div>
          </div>
          <div>
            <h4 className="font-bold">3. Complete Decision Pipeline:</h4>
            <div className="bg-gray-50 p-3 rounded text-xs font-mono border space-y-2 mt-1">
              <p className="font-bold text-blue-700">STEP 0: md5(ref) == md5(test)?</p>
              <p>  └── YES → return GENUINE (confidence: 0.99)</p>
              <p className="font-bold text-blue-700 mt-2">STEP 1: Preprocess both images</p>
              <p>  └── Grayscale → 224×224 → Normalize</p>
              <p className="font-bold text-blue-700 mt-2">STEP 2: Siamese embeddings</p>
              <p>  └── similarity = (cos_sim + 1) / 2</p>
              <p className="font-bold text-blue-700 mt-2">STEP 3: Tamper CNN on test image</p>
              <p>  └── tamper = softmax[1] × (1 - similarity)</p>
              <p className="font-bold text-blue-700 mt-2">STEP 4: Decision</p>
              <p>  ├── similarity ≥ 0.75 → GENUINE</p>
              <p>  ├── tamper ≥ 0.6 → TAMPERED</p>
              <p>  └── else → FORGED</p>
            </div>
          </div>
        </div>
      </div>
    ),
  },

  /* ─── SLIDE 18: IMPLEMENTATION 1 — Model Definitions ─── */
  {
    title: "IMPLEMENTATION",
    category: "1. Siamese EfficientNet-B3 Model",
    content: (
      <div className="space-y-3">
        <h3 className="text-lg font-bold">1. Siamese EfficientNet-B3 — Model Definition</h3>
        <p className="text-sm">This defines the Siamese Network with EfficientNet-B3 backbone, 256-dim L2-normalized embeddings, and shared-weight architecture for triplet training.</p>
        <h4 className="font-bold text-sm">Code Snippet:</h4>
        <CodeBlock code={`class SiameseEfficientNet(nn.Module):
    def __init__(self, embedding_dim=256):
        super().__init__()
        # EfficientNet-B3 backbone (pretrained on ImageNet)
        self.backbone = timm.create_model(
            'efficientnet_b3', pretrained=True,
            in_chans=1, num_classes=0
        )
        # Embedding projection head
        self.embedding = nn.Sequential(
            nn.Linear(self.backbone.num_features, 512),
            nn.BatchNorm1d(512),
            nn.ReLU(inplace=True),
            nn.Dropout(0.4),
            nn.Linear(512, embedding_dim)
        )

    def forward_one(self, x):
        x = self.backbone(x)
        x = self.embedding(x)
        x = F.normalize(x, p=2, dim=1)  # L2 normalize
        return x

    def forward(self, anchor, positive=None, negative=None):
        a = self.forward_one(anchor)
        if positive is not None and negative is not None:
            return a, self.forward_one(positive), self.forward_one(negative)
        return a`} />
      </div>
    ),
  },

  /* ─── SLIDE 19: IMPLEMENTATION 2 — Tamper CNN ─── */
  {
    title: "IMPLEMENTATION",
    category: "2. Tamper Detection CNN",
    content: (
      <div className="space-y-3">
        <h3 className="text-lg font-bold">2. Tamper Detection CNN — Model Definition</h3>
        <p className="text-sm">Custom deep CNN with dual convolutions per block and a multi-layer classifier head for binary tamper detection.</p>
        <h4 className="font-bold text-sm">Code Snippet:</h4>
        <CodeBlock code={`class TamperCNN(nn.Module):
    def __init__(self):
        super().__init__()
        self.features = nn.Sequential(
            # Block 1: Conv(1→32)×2
            nn.Conv2d(1, 32, 3, padding=1), nn.BatchNorm2d(32), nn.ReLU(),
            nn.Conv2d(32, 32, 3, padding=1), nn.BatchNorm2d(32), nn.ReLU(),
            nn.MaxPool2d(2),
            # Block 2: Conv(32→64)×2
            nn.Conv2d(32, 64, 3, padding=1), nn.BatchNorm2d(64), nn.ReLU(),
            nn.Conv2d(64, 64, 3, padding=1), nn.BatchNorm2d(64), nn.ReLU(),
            nn.MaxPool2d(2),
            # Block 3: Conv(64→128)×2
            nn.Conv2d(64, 128, 3, padding=1), nn.BatchNorm2d(128), nn.ReLU(),
            nn.Conv2d(128, 128, 3, padding=1), nn.BatchNorm2d(128), nn.ReLU(),
            nn.MaxPool2d(2),
            # Block 4: Conv(128→256) + AdaptiveAvgPool
            nn.Conv2d(128, 256, 3, padding=1), nn.BatchNorm2d(256), nn.ReLU(),
            nn.AdaptiveAvgPool2d((4, 4))
        )
        self.classifier = nn.Sequential(
            nn.Flatten(),
            nn.Linear(256*4*4, 512), nn.ReLU(), nn.Dropout(0.5),
            nn.Linear(512, 128), nn.ReLU(), nn.Dropout(0.3),
            nn.Linear(128, 2)
        )`} />
      </div>
    ),
  },

  /* ─── SLIDE 20: IMPLEMENTATION 3 — ArcFace Loss ─── */
  {
    title: "IMPLEMENTATION",
    category: "3. ArcFace Loss Function",
    content: (
      <div className="space-y-3">
        <h3 className="text-lg font-bold">3. ArcFace Loss — Angular Margin Learning</h3>
        <p className="text-sm">ArcFace adds an angular margin penalty to the target class, forcing the network to learn more discriminative embeddings for signature verification.</p>
        <h4 className="font-bold text-sm">Code Snippet:</h4>
        <CodeBlock code={`class ArcFaceLoss(nn.Module):
    def __init__(self, s=30.0, m=0.5):
        super().__init__()
        self.s = s      # Scale factor
        self.m = m      # Angular margin
        self.cos_m = torch.cos(torch.tensor(m))
        self.sin_m = torch.sin(torch.tensor(m))
        self.th = torch.cos(torch.tensor(3.1416 - m))
        self.mm = torch.sin(torch.tensor(3.1416 - m)) * m

    def forward(self, cosine, labels):
        sine = torch.sqrt(1.0 - cosine ** 2)
        # cos(θ + m) = cos(θ)cos(m) - sin(θ)sin(m)
        phi = cosine * self.cos_m - sine * self.sin_m
        phi = torch.where(cosine > self.th, phi, cosine - self.mm)

        one_hot = torch.zeros_like(cosine)
        one_hot.scatter_(1, labels.view(-1, 1), 1)

        output = (one_hot * phi) + ((1.0 - one_hot) * cosine)
        output *= self.s
        return F.cross_entropy(output, labels)`} />
      </div>
    ),
  },

  /* ─── SLIDE 21: IMPLEMENTATION 4 — Verify API ─── */
  {
    title: "IMPLEMENTATION",
    category: "4. Flask API — /verify Endpoint",
    content: (
      <div className="space-y-3">
        <h3 className="text-lg font-bold">4. Flask API — /verify Endpoint (Core Logic)</h3>
        <p className="text-sm">The main API endpoint receives base64 images, runs the dual-model pipeline, and returns a JSON verdict.</p>
        <h4 className="font-bold text-sm">Code Snippet:</h4>
        <CodeBlock code={`@app.route("/verify", methods=["POST"])
def verify():
    data = request.get_json()
    ref_b64, test_b64 = data["reference"], data["test"]

    # STEP 0: MD5 Hash — Same image check
    if img_hash(ref_b64) == img_hash(test_b64):
        return jsonify({"result": "genuine", "confidence": 0.99})

    ref = preprocess(ref_b64)   # Decode → Grayscale → 224×224
    test = preprocess(test_b64)

    with torch.no_grad():
        # STEP 1: Siamese embeddings + Cosine Similarity
        ref_emb = siamese_model.forward_one(ref)
        test_emb = siamese_model.forward_one(test)
        similarity = (F.cosine_similarity(ref_emb, test_emb) + 1) / 2

        # STEP 2: Tamper CNN (weighted by similarity)
        tamper_logits = tamper_model(test)
        tamper_prob = F.softmax(tamper_logits, dim=1)[0, 1].item()
        tamper_prob = tamper_prob * (1 - similarity)

    # STEP 3: Decision Fusion
    if similarity >= 0.75:
        result, confidence = "genuine", similarity
    elif tamper_prob >= 0.6:
        result, confidence = "tampered", tamper_prob
    else:
        result, confidence = "forged", 1 - similarity

    return jsonify({
        "result": result, "confidence": round(confidence, 4),
        "siameseScore": round(similarity * 100, 2),
        "tamperScore": round(tamper_prob * 100, 2)
    })`} />
      </div>
    ),
  },

  /* ─── SLIDE 22: IMPLEMENTATION 5 — Frontend Integration ─── */
  {
    title: "IMPLEMENTATION",
    category: "5. React Frontend Integration",
    content: (
      <div className="space-y-3">
        <h3 className="text-lg font-bold">5. React Frontend — API Integration Hook</h3>
        <p className="text-sm">The frontend converts uploaded signatures to base64, sends them to the Flask API, and displays real-time results with score breakdowns.</p>
        <h4 className="font-bold text-sm">Code Snippet:</h4>
        <CodeBlock code={`// useSignatureVerification.ts — React Hook
const verifySignatures = async (reference: File, test: File) => {
  setIsVerifying(true);

  // Convert images to Base64
  const refBase64 = await fileToBase64(reference);
  const testBase64 = await fileToBase64(test);

  // Send to Flask API
  const response = await fetch(\`\${API_URL}/verify\`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      reference: refBase64,
      test: testBase64
    })
  });

  const result = await response.json();
  // result = { result, confidence, siameseScore, tamperScore }

  setVerificationResult(result);
  setIsVerifying(false);
};`} />
        <h4 className="font-bold text-sm mt-2">Execution:</h4>
        <div className="bg-gray-50 p-2 rounded text-sm font-mono border">
          Backend: Google Colab running on http://localhost:5000 → ngrok tunnel<br/>
          Frontend: npm run dev → http://localhost:5173
        </div>
      </div>
    ),
  },

  /* ─── SLIDE 23: THANK YOU ─── */
  {
    title: "",
    content: (
      <div className="flex flex-col items-center justify-center h-full text-center gap-6">
        <h1 className="text-5xl md:text-7xl font-bold text-blue-800">THANK YOU</h1>
        <p className="text-xl text-gray-600">AI-Based Signature Authentication System</p>
        <p className="text-lg text-gray-500">SigAuth — Siamese Metric Learning + Tamper Detection CNN</p>
      </div>
    ),
  },
];

/* ────────────────────────────────────────────────────────────── */
/*  Slide Component                                               */
/* ────────────────────────────────────────────────────────────── */

export default function Presentation() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const goTo = (n: number) => {
    if (n >= 0 && n < slides.length) setCurrentSlide(n);
  };

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === " ") goTo(currentSlide + 1);
      if (e.key === "ArrowLeft") goTo(currentSlide - 1);
    },
    [currentSlide]
  );

  const slide = slides[currentSlide];

  return (
    <div
      ref={containerRef}
      tabIndex={0}
      onKeyDown={handleKeyDown}
      className="min-h-screen outline-none flex flex-col"
      style={{
        background: "linear-gradient(135deg, #c8dce0 0%, #dde8d0 30%, #e8ead8 60%, #f0ece0 100%)",
      }}
    >
      {/* Top bar */}
      <div className="flex items-center justify-between px-4 py-2 bg-white/60 backdrop-blur border-b border-gray-200">
        <Link to="/">
          <Button variant="ghost" size="sm">
            <Home className="h-4 w-4 mr-1" /> Home
          </Button>
        </Link>
        <span className="text-sm font-medium text-gray-600">
          Slide {currentSlide + 1} / {slides.length}
        </span>
        <div className="flex gap-1">
          <Button variant="ghost" size="sm" onClick={() => goTo(currentSlide - 1)} disabled={currentSlide === 0}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm" onClick={() => goTo(currentSlide + 1)} disabled={currentSlide === slides.length - 1}>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Slide content */}
      <div className="flex-1 flex flex-col max-w-6xl w-full mx-auto px-6 md:px-12 py-6">
        {/* Decorative arcs (matching PPT style) */}
        <div className="pointer-events-none fixed top-0 left-0 w-64 h-64 opacity-20">
          <svg viewBox="0 0 200 200" className="w-full h-full">
            <circle cx="40" cy="40" r="120" fill="none" stroke="#5b8fa8" strokeWidth="6" opacity="0.4" />
            <circle cx="40" cy="40" r="90" fill="none" stroke="#7aaa94" strokeWidth="4" opacity="0.3" />
          </svg>
        </div>
        <div className="pointer-events-none fixed bottom-0 right-0 w-72 h-72 opacity-15">
          <svg viewBox="0 0 200 200" className="w-full h-full">
            <circle cx="160" cy="160" r="100" fill="none" stroke="#8aab7a" strokeWidth="5" opacity="0.3" />
            <circle cx="180" cy="180" r="60" fill="none" stroke="#b8c9a0" strokeWidth="3" opacity="0.2" />
          </svg>
        </div>

        {/* Title */}
        {slide.title && (
          <div className="mb-4">
            <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-800">{slide.title}</h2>
            {slide.category && (
              <p className="text-center text-sm text-gray-500 mt-1">{slide.category}</p>
            )}
          </div>
        )}

        {/* Content */}
        <div className="flex-1 text-gray-800">{slide.content}</div>

        {/* Footer */}
        <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-300/50 text-xs text-gray-500">
          <span>GVPCEW</span>
          <span>AI-Based Signature Authentication System (SigAuth)</span>
          <span>{currentSlide + 1}</span>
        </div>
      </div>

      {/* Bottom navigation dots */}
      <div className="flex justify-center gap-1 pb-3 flex-wrap max-w-4xl mx-auto px-4">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className={`w-2.5 h-2.5 rounded-full transition-all ${
              i === currentSlide ? "bg-blue-600 scale-125" : "bg-gray-400/50 hover:bg-gray-400"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
