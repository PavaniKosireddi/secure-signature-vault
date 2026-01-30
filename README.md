# 🔐 SigAuth - Advanced Signature Authentication System

**Advanced Forgery-Resilient Signature Authentication Using Siamese Metric Learning and Digital Tamper Detection**

A complete end-to-end signature verification system featuring:
- 🧠 **Siamese Network** with ResNet-18 backbone for skilled forgery detection
- 🔍 **Tamper Detection CNN** for digital copy-paste manipulation detection
- ⚛️ **React Frontend** with real-time verification UI
- 🌐 **Flask Backend** with ngrok for Colab deployment

---

## 📁 Project Structure

```
SigAuth/
├── 📂 public/
│   ├── favicon.ico
│   ├── placeholder.svg
│   └── robots.txt
│
├── 📂 src/
│   ├── 📂 assets/signatures/       # Demo signature images
│   ├── 📂 components/
│   │   ├── 📂 layout/Header.tsx
│   │   ├── 📂 sections/            # Page sections
│   │   └── 📂 ui/                  # shadcn/ui components
│   ├── 📂 config/api.ts            # Backend API configuration
│   ├── 📂 hooks/
│   │   └── useSignatureVerification.ts
│   ├── 📂 pages/
│   │   ├── Index.tsx
│   │   └── NotFound.tsx
│   └── ...
│
├── 📂 backend/                      # Python/PyTorch backend
│   ├── SigAuth_Complete_Backend.ipynb  # Colab notebook
│   └── README.md
│
├── .env.example                     # Environment template
└── README.md
```

---

## 🚀 Complete Setup Guide (Step-by-Step)

### Prerequisites
- Node.js 18+
- Google account (for Colab with GPU)
- ngrok account (free tier)

---

## Part 1: Backend Setup (Google Colab)

### Step 1: Prepare Your Datasets

**SVC2004 Dataset:**
- Each user has 40 signatures: S1-S20 (genuine), S21-S40 (skilled forgery)
- Create ZIP: `task1.zip`, `task2.zip`

**Tamper Dataset:**
```
synthetic_tamper/
├── clean/     # Original signatures
└── tampered/  # Digitally manipulated
```
- Create ZIP: `synthetic_tamper.zip`

### Step 2: Open Colab Notebook

1. Go to [Google Colab](https://colab.research.google.com)
2. Upload `backend/SigAuth_Complete_Backend.ipynb`
3. **Enable GPU**: Runtime → Change runtime type → GPU

### Step 3: Upload Datasets

1. Click folder icon 📁 in Colab left sidebar
2. Upload: `task1.zip`, `task2.zip`, `synthetic_tamper.zip`

### Step 4: Run Training Cells

| Cell | Purpose | Time |
|------|---------|------|
| 1-4 | Setup & data loading | 5 min |
| 5 | Train Siamese Network | 20-30 min |
| 6 | Train Tamper CNN | 15-20 min |
| 7 | Evaluate & metrics | 5 min |
| 8 | Save models | 1 min |

### Step 5: Start API Server

1. Get ngrok token from [ngrok dashboard](https://dashboard.ngrok.com/get-started/your-authtoken)
2. Paste in Cell 9
3. Run Cell 10 - copy the ngrok URL

---

## Part 2: Frontend Setup (VS Code)

### Step 1: Install Dependencies

```bash
npm install
```

### Step 2: Configure Backend

Create `.env.local`:
```env
VITE_API_URL=https://xxxx-xx-xx-xxx-xxx.ngrok.io
```

### Step 3: Start Frontend

```bash
npm run dev
```

Open http://localhost:8080

---

## 🧪 Testing the System

### Quick Test
```javascript
// In browser console
fetch('YOUR_NGROK_URL/health').then(r => r.json()).then(console.log)
// Should show: { status: "healthy", models: { siamese: true, tamper: true } }
```

### Full Test
1. Open Demo section → click test signatures
2. Upload custom signatures in Verification section
3. Check results: genuine (high similarity), forged (low similarity), tampered (high tamper score)

---

## 📊 Expected Metrics

| Model | Metric | Target |
|-------|--------|--------|
| Siamese | EER | < 10% |
| Siamese | Accuracy | > 90% |
| Tamper | Accuracy | > 95% |
| Tamper | F1 Score | > 90% |

---

## 🛠️ Troubleshooting

| Issue | Solution |
|-------|----------|
| CUDA out of memory | Reduce batch_size to 16 |
| No images found | Check ZIP structure: `U{user}S{sample}.png` |
| Frontend can't connect | Re-run Cell 10, update `.env.local`, restart frontend |
| ngrok error | Get token from ngrok.com |

---

## 📚 Technology Stack

| Layer | Technologies |
|-------|--------------|
| Frontend | React, Vite, TypeScript, Tailwind, shadcn/ui, Framer Motion |
| Backend | Python, PyTorch, Flask, ngrok |
| Models | Siamese (ResNet-18), Tamper CNN |

---

## 👥 Team - GVP College of Engineering for Women

**Batch 2 - B.Tech CSE (AI & ML) 2022-2026**

| Reg No. | Name |
|---------|------|
| 322103282051 | Kosireddi Pavani |
| 322103282034 | Duvvuri Sri Gayatri Sameera |
| 322103282065 | Molagajje Jessy Priya |

**Guide:** Dr. Dwiti Krishna Bebarta

---

## 📝 License

Educational use - GVP College of Engineering for Women
