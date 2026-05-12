# scripts/

Helper scripts for the TracePoint SPB landing page.

## `generate-assets.py`

Generates brand-consistent supporting images using Google Gemini's
nano-banana model (`gemini-2.5-flash-image`).

### Quick start

```powershell
# 1. Install the SDK
pip install google-genai

# 2. Set the key (PowerShell)
$env:GEMINI_API_KEY = "your-key-here"

# 3. Run from the project root
python scripts/generate-assets.py
```

Output goes to `public/images/generated/`. Re-running skips files that
already exist — delete a file in that folder to regenerate it.

### What it generates

Ten editorial / print-heritage style supporting visuals:

| File | Use |
|------|-----|
| `map-spb-engraved.png` | Stats section background atmosphere |
| `hands-sorting-flyers.png` | Field Dossier Act III, secondary photo |
| `dossier-spread-mockup.png` | Field Dossier closing CTA preview |
| `envelope-with-wax-seal.png` | CTA section decoration |
| `stack-of-flyers-doorstep.png` | Hero or section divider |
| `ledger-page-detail.png` | Stats section header strip |
| `paper-texture-fibrous.png` | Tileable body background (replaces SVG noise) |
| `dashboard-printed-mock.png` | Plans section, Web Development service |
| `city-from-above-night.png` | Process section atmospheric background |
| `decorative-postal-mark.png` | Footer ornament / section divider |

Estimated cost: ~$0.39 total (~$0.039 per image with nano-banana).

### Editing the prompt list

Comment out entries in `ASSETS` to skip generation. Edit a prompt to
adjust its direction — re-running will regenerate any deleted files.

### After running

Once the images are in `public/images/generated/`, tell Claude which ones
look usable and they will be wired into the landing-page components.
