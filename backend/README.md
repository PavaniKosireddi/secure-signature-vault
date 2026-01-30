# SigAuth Backend - Complete Setup Guide

## 🎯 Overview

This backend provides:
1. **Siamese Network** - Skilled forgery detection using metric learning
2. **Tamper Detection CNN** - Digital copy-paste/manipulation detection
3. **Flask API** - REST endpoint for frontend integration

## 📁 Required Datasets

### 1. SVC2004 Signature Dataset
- **task1.zip** - Task 1 signature images (U1-U40 users)
- **task2.zip** - Task 2 signature images (U1-U40 users)

**Labeling Convention:**
- `S1-S20` = Genuine signatures
- `S21-S40` = Skilled forgeries (by other people imitating)

### 2. Synthetic Tamper Dataset
- **synthetic_tamper.zip** containing:
  - `clean/` - Original untampered signatures
  - `tampered/` - Copy-paste manipulated signatures

## 🚀 Quick Start (Google Colab)

### Step 1: Open Colab Notebook
1. Go to [Google Colab](https://colab.research.google.com)
2. Upload `SigAuth_Complete_Backend.ipynb`
3. Enable GPU: Runtime → Change runtime type → GPU

### Step 2: Upload Datasets
1. Click the folder icon 📁 in Colab's left panel
2. Click upload ⬆️
3. Upload: `task1.zip`, `task2.zip`, `synthetic_tamper.zip`
4. Wait for uploads to complete

### Step 3: Run Training
Run cells in order:
- **Cell 1**: Install dependencies
- **Cell 2**: Extract datasets
- **Cell 3**: Define models
- **Cell 4**: Create data loaders
- **Cell 5**: Train Siamese Network (~30 mins)
- **Cell 6**: Train Tamper CNN (~20 mins)
- **Cell 7**: Evaluate & show metrics
- **Cell 8**: Save models

### Step 4: Start API Server
- **Cell 9**: Enter your ngrok token
- **Cell 10**: Start server (keep running!)

### Step 5: Connect Frontend
1. Copy the ngrok URL from Cell 10
2. Create `.env.local` in your frontend project:
   ```
   VITE_API_URL=https://xxxx-xx-xx-xxx-xxx.ngrok.io
   ```
3. Restart frontend: `npm run dev`

## 📊 Expected Metrics

| Model | Metric | Target | Meaning |
|-------|--------|--------|---------|
| Siamese | EER | < 10% | Equal Error Rate |
| Siamese | FAR | < 5% | False Acceptance Rate |
| Siamese | FRR | < 5% | False Rejection Rate |
| Tamper | Accuracy | > 95% | Overall correctness |
| Tamper | Precision | > 90% | True positive rate |
| Tamper | Recall | > 90% | Detection rate |
| Tamper | F1 Score | > 90% | Harmonic mean |

## 🔌 API Endpoints

### Health Check
```
GET /health
Response: {"status": "healthy", "models": {...}}
```

### Verify Signature
```
POST /verify
Body: {
  "reference": "base64_encoded_reference_signature",
  "test": "base64_encoded_test_signature"
}
Response: {
  "result": "genuine" | "forged" | "tampered",
  "siameseScore": 0.95,
  "tamperScore": 0.02,
  "confidence": 0.95,
  "details": {
    "strokeConsistency": 0.96,
    "pressurePattern": 0.93,
    "spatialAlignment": 0.95,
    "pixelAnomalies": 0.02
  }
}
```

## 🔧 Troubleshooting

### "CUDA out of memory"
- Reduce batch size in Cell 4 (change 32 to 16)

### "ngrok authentication failed"
1. Go to https://ngrok.com/signup
2. Get token from dashboard
3. Paste in Cell 9

### "Frontend can't connect"
1. Verify ngrok URL is correct
2. Check `.env.local` has `VITE_API_URL=...`
3. Restart frontend after changing `.env.local`
4. Check browser console for CORS errors

### "No images found"
- Check ZIP file structure matches expected format
- Images should be: `task1/U{user}S{sample}.png`

## 📱 Testing the Complete System

1. **Start Colab backend** (Cell 10 running)
2. **Start frontend**: `npm run dev`
3. **Open browser**: http://localhost:8080
4. **Upload signatures** in the demo section
5. **Check results** - should show real AI predictions

## 🎓 For Academic Submission

The notebook generates these files in `/results`:
- `training_metrics.png` - All graphs and charts
- FAR/FRR curves for Siamese
- Accuracy/F1 plots for Tamper CNN

Download these for your project report!
