#!/usr/bin/env python3
"""
generate-assets.py — TracePoint SPB brand-consistent asset generator.

Uses Google Gemini's nano-banana model (gemini-2.5-flash-image) to generate
a curated set of supporting visuals that match the "Delivery Manifest"
editorial aesthetic of the landing page. Every prompt is biased toward
print-heritage / documentary photography — NOT cyber, neon, or gradient mesh
slop. The goal is to fill specific gaps in the existing real-photo dossier,
not to manufacture chrome.

──────────────────────────────────────────────────────────────────────────
SETUP
──────────────────────────────────────────────────────────────────────────

  1. Install the SDK:
       pip install google-genai

  2. Ensure GEMINI_API_KEY is set. In PowerShell:
       $env:GEMINI_API_KEY = "your-key-here"
     Or persistently:
       [System.Environment]::SetEnvironmentVariable(
         "GEMINI_API_KEY", "your-key-here", "User")

  3. From the project root:
       python scripts/generate-assets.py

──────────────────────────────────────────────────────────────────────────
OUTPUT
──────────────────────────────────────────────────────────────────────────

  Images are saved to  public/images/generated/
  Re-running skips files that already exist (idempotent).
  Delete a file in that folder to regenerate it on the next run.

  Cost estimate: ~$0.039 per image with nano-banana. The full list of
  10 assets is ~$0.40. Comment out any entry in ASSETS to skip it.

──────────────────────────────────────────────────────────────────────────
INTEGRATION PLAN (where each generated image goes in the site)
──────────────────────────────────────────────────────────────────────────

  map-spb-engraved.png         → Stats section background atmosphere
  hands-sorting-flyers.png     → Field Dossier Act III secondary photo
  dossier-spread-mockup.png    → Field Dossier closing CTA preview
  envelope-with-wax-seal.png   → CTA section decoration
  stack-of-flyers-doorstep.png → Hero section background OR section divider
  ledger-page-detail.png       → Stats section header strip
  paper-texture-fibrous.png    → Tileable body background, replaces SVG noise
  dashboard-printed-mock.png   → Plans section "Web Development" decoration
  city-from-above-night.png    → Process section background atmosphere
  decorative-postal-mark.png   → Footer ornament / section divider mark

  After you run this script, tell me which images you kept and I will wire
  them into the components.
"""

from __future__ import annotations

import os
import sys
import time
from pathlib import Path

try:
    from google import genai
    from google.genai import types
except ImportError:
    sys.exit(
        "Missing dependency.  Install with:\n"
        "    pip install google-genai"
    )

# ──────────────────────────────────────────────────────────────────────────
# CONFIG
# ──────────────────────────────────────────────────────────────────────────

API_KEY = os.environ.get("GEMINI_API_KEY")
if not API_KEY:
    sys.exit(
        "ERROR: GEMINI_API_KEY environment variable not set.\n"
        "PowerShell:  $env:GEMINI_API_KEY = \"your-key\""
    )

MODEL = "gemini-2.5-flash-image"
PROJECT_ROOT = Path(__file__).resolve().parents[1]
OUT_DIR = PROJECT_ROOT / "public" / "images" / "generated"
OUT_DIR.mkdir(parents=True, exist_ok=True)

# ──────────────────────────────────────────────────────────────────────────
# BRAND GUARDRAILS — appended to every prompt
# ──────────────────────────────────────────────────────────────────────────
# These constraints fight the model's defaults toward AI-cyber-neon and pull
# it back toward editorial print-heritage. Critical for visual cohesion.
# ──────────────────────────────────────────────────────────────────────────

BRAND = (
    "PALETTE STRICT: warm cream paper (#ECE4D2), near-black ink (#1A1714), "
    "postal-red accents (#C2241A), occasional washed cobalt-blue (#2A3F6E). "
    "STYLE: editorial / print-heritage / documentary. Restrained, analog, "
    "intentional. NEVER: neon, glow, gradient mesh, cyberpunk, sci-fi, "
    "purple-to-pink gradients, glassmorphism, blurry bokeh chrome, generic "
    "stock photography aesthetic. Think: a printed zine made by a small "
    "Saint Petersburg studio in 2026, not a SaaS landing page."
)

# (filename, prompt, aspect_ratio_hint)
# aspect_ratio_hint is currently embedded in the prompt; nano-banana defaults
# to a near-square output. Crop or composite after if needed.
ASSETS: list[tuple[str, str, str]] = [
    (
        "map-spb-engraved.png",
        "An aged-engraving style cartographic map of Saint Petersburg, "
        "Russia, showing the 18 administrative districts as cream-colored "
        "regions outlined by thin ink-black boundaries. Tiny district names "
        "in light monospace type. A faint compass rose top-right. Thin "
        "hand-drawn route lines in postal-red ink connect a series of dots "
        "marked across residential districts. The Neva river is drawn in "
        "delicate parallel hatching, washed cobalt-blue. The whole image "
        "has the feeling of a vintage Russian Imperial cartography plate, "
        "printed on warm cream paper with very subtle fiber grain. No "
        "modern UI, no glow, no neon, no satellite render — strictly an "
        f"illustrated atlas plate aesthetic. {BRAND}",
        "1:1",
    ),
    (
        "hands-sorting-flyers.png",
        "Overhead editorial photograph of two adult hands sorting a tall "
        "neat stack of printed paper flyers on a worn wooden desk. The "
        "flyers are folded, slightly rough-cut, showing fragments of "
        "black-ink Cyrillic typography and one small red TRC stamp. Soft "
        "directional window light from the upper-left casting long warm "
        "shadows. Low contrast, color-graded warm sepia (subtly "
        "desaturated, slightly raised midtones). The hands look real and "
        "workworn — no gloves. A vintage brass ruler and a fountain pen "
        "lie diagonally across one corner of the frame. Methodical, "
        "quiet, Saturday-morning mood. Strictly photographic — NOT "
        f"illustrated. Composition: roughly 4:3 landscape. {BRAND}",
        "4:3",
    ),
    (
        "dossier-spread-mockup.png",
        "Top-down editorial photograph of an open printed dossier "
        "brochure resting on a cream paper-textured desk. The dossier's "
        "front page reads 'DELIVERY MANIFEST — TRC-SPB / FILE №007' in "
        "heavy black serif type, with a small postal-red postmark stamp "
        "in the upper-right corner. Two facing pages are visible: the "
        "LEFT page contains a typed list of district codes and "
        "timestamps in monospace (e.g. 'Tsentralny · 08:42', "
        "'Petrogradskiy · 09:14'), each line with a small hand-stamped "
        "red verification mark. The RIGHT page is a small grid of "
        "polaroid-style mailbox photographs taped down with neutral "
        "paper masking tape. A small registration crosshair printed in "
        "each corner of the spread. A pencil rests diagonally across the "
        "spine. Soft directional daylight from the right. Documentary, "
        f"restrained, analog. No screens. Composition: 4:3. {BRAND}",
        "4:3",
    ),
    (
        "envelope-with-wax-seal.png",
        "Macro top-down photograph of an aged cream-paper envelope with "
        "a crimson red wax seal embossed with the serif initials 'TRC' "
        "in the center. The envelope is hand-addressed in slightly "
        "smudged black fountain-pen ink — a partial Cyrillic address "
        "visible in the upper portion. A weathered round postmark stamp "
        "is pressed in red ink onto the corner, with circular text "
        "reading 'SAINT PETERSBURG · 191000' and a date line. The "
        "envelope shows a slight paper deckle on one edge. Background "
        "is dark cream paper texture. Single soft daylight source from "
        "a low angle, casting subtle shadow. Strictly photographic, "
        f"editorial, NOT illustrated. Composition: roughly 4:3. {BRAND}",
        "4:3",
    ),
    (
        "stack-of-flyers-doorstep.png",
        "Documentary photograph at blue-hour dawn of a small neat stack "
        "of freshly-printed cream-paper flyers placed on the worn stone "
        "doorstep of a Soviet-era residential apartment building in "
        "Saint Petersburg. Light dusting of snow on the ground. The "
        "flyers are cream with black ink typography; the topmost flyer "
        "shows a single postal-red TRC stamp. The building's metal "
        "entry door is dark brown, with a glass panel. A discreet "
        "intercom keypad on the wall to the right. Cold cinematic "
        "blue-grey tones overall, with the warm cream of the flyers as "
        "the focal point of color. High atmospheric realism, slight "
        "filmic grain. No people, no logos, no signage. Strictly "
        f"photographic. Composition: portrait 3:4. {BRAND}",
        "3:4",
    ),
    (
        "ledger-page-detail.png",
        "Extreme close-up photograph of a hand writing serial numbers "
        "and timestamps in fountain-pen ink across the ruled lines of "
        "an open paper ledger book. The page is warm cream with "
        "faded blue-grey rule lines; slight yellowing at the edges. "
        "Handwritten entries in deliberate copperplate-influenced "
        "cursive — visible entries include 'TRC-040842 · Tsentralny · "
        "08:42' and 'TRC-040914 · Petrogradskiy · 09:14'. A small "
        "red 'VER' stamp pressed beside one entry. The fountain pen "
        "is dark steel with a worn nib. Soft daylight at a shallow "
        "angle picks out the texture of the paper. Heavily "
        "photographic, analog. No digital UI elements whatsoever. "
        f"Composition: landscape 16:9. {BRAND}",
        "16:9",
    ),
    (
        "paper-texture-fibrous.png",
        "Seamless tileable photograph of warm cream paper texture with "
        "visible organic fibers and delicate irregular grain, designed "
        "as a subtle background tile for a website. Base color exactly "
        "#ECE4D2. The texture is very flat and very even — no shadows, "
        "no marks, no creases, no central composition. The fiber "
        "pattern is delicate and organic, comparable to mould-made "
        "handmade paper. The image is strictly tileable: the left edge "
        "matches the right edge, the top edge matches the bottom edge. "
        "No watermark, no signature, no text. Square format. The "
        "result must look like genuine paper stock photographed under "
        f"flat diffused light. {BRAND}",
        "1:1",
    ),
    (
        "dashboard-printed-mock.png",
        "A printed paper proof-sheet on warm cream stock, photographed "
        "from directly above, showing a printed campaign-analytics "
        "dashboard rendered ENTIRELY in black ink line work — NOT a "
        "digital screen, NOT glowing, NOT a UI render. The 'dashboard' "
        "elements: a horizontal bar chart with monospace labels for "
        "districts; a stylised line-art map of Saint Petersburg with "
        "dots marking delivery points; a large hand-stamped verified-"
        "delivery count number set in heavy serif type; a small line "
        "graph plotting deliveries over time. Postal-red ink is used "
        "sparingly for emphasis only — one circled district, one red "
        "'VER' stamp, one highlighted peak on the line graph. "
        "Registration crosshairs printed in each corner. The proof-"
        "sheet is pinned to a wooden surface with two small brass "
        "thumbtacks. Subtle paper grain visible. Editorial typography "
        "only. Looks like the printout from a vintage typesetter, NOT "
        f"a Figma export. Composition: 16:10 landscape. {BRAND}",
        "16:10",
    ),
    (
        "city-from-above-night.png",
        "An illustrated atlas-plate view of Saint Petersburg city "
        "center at night, drawn as a top-down map. The city's grid of "
        "streets and the bends of the Neva river are picked out in "
        "faint warm cream against an ink-black background. A small "
        "constellation of postal-red dots is scattered across the "
        "residential districts, each one marking a delivery point — "
        "connected by extremely thin red dashed lines forming a "
        "route. The Neva river is rendered in deep washed cobalt-blue. "
        "Overall feeling: an analog illustrated atlas plate from the "
        "1950s, NOT a satellite render and NOT a sci-fi visualization. "
        "Subtle paper grain over the whole image. No modern UI "
        f"elements, no glow effects, no neon. Composition: 16:9. {BRAND}",
        "16:9",
    ),
    (
        "decorative-postal-mark.png",
        "A black-and-white printed postal ornament centered on a "
        "transparent or cream background: an intricately drawn "
        "compass-rose-meets-postmark medallion, with concentric "
        "circles containing the words 'TRACEPOINT SPB · DELIVERY "
        "MANIFEST · VERIFIED · 2026' in serif typography around the "
        "rim. At the center: a small graphic of an open envelope. "
        "Engraving style, very fine line work, in the tradition of a "
        "Russian Imperial postal crest. Two colors only: deep ink "
        "black and a single accent of postal-red. Strictly vector-"
        "clean, decorative — would print as a heading ornament in a "
        "printed publication. No 3D, no glow, no gradient. "
        f"Composition: 1:1 square. {BRAND}",
        "1:1",
    ),
]


# ──────────────────────────────────────────────────────────────────────────
# GENERATION
# ──────────────────────────────────────────────────────────────────────────


def already_exists(filename: str) -> bool:
    return (OUT_DIR / filename).exists() and (OUT_DIR / filename).stat().st_size > 0


def generate_one(
    client: genai.Client,
    filename: str,
    prompt: str,
    aspect: str,
    retries: int = 2,
) -> bool:
    """Generate one image; returns True on success."""
    out_path = OUT_DIR / filename

    # The image_config field shape varies by SDK version — try it first, fall
    # back to a plain config if the model rejects it.
    config_attempts: list[types.GenerateContentConfig] = []
    try:
        config_attempts.append(
            types.GenerateContentConfig(
                response_modalities=["IMAGE"],
                image_config=types.ImageConfig(aspect_ratio=aspect),  # type: ignore[attr-defined]
            )
        )
    except (AttributeError, TypeError):
        pass
    config_attempts.append(
        types.GenerateContentConfig(response_modalities=["IMAGE"])
    )

    last_err: Exception | None = None
    for attempt in range(retries + 1):
        for cfg in config_attempts:
            try:
                response = client.models.generate_content(
                    model=MODEL,
                    contents=prompt,
                    config=cfg,
                )
            except Exception as exc:  # config-shape mismatch — try next config
                last_err = exc
                continue

            for cand in response.candidates or []:
                parts = getattr(getattr(cand, "content", None), "parts", []) or []
                for part in parts:
                    inline = getattr(part, "inline_data", None)
                    data = getattr(inline, "data", None) if inline else None
                    if data:
                        out_path.write_bytes(data)
                        print(f"    ✓ saved  ({len(data) // 1024} KB)")
                        return True

            # Got a response but no inline image data; try alternate config.
            last_err = RuntimeError("response contained no image part")

        # Retry the whole attempt after a brief pause
        if attempt < retries:
            wait = 2 ** attempt
            print(f"    … retry in {wait}s")
            time.sleep(wait)

    print(f"    ✗ failed: {last_err}")
    return False


def main() -> None:
    print("─" * 72)
    print(" TracePoint SPB · asset generator")
    print("─" * 72)
    print(f" Model:  {MODEL}")
    print(f" Output: {OUT_DIR}")
    print(f" Assets: {len(ASSETS)} configured")
    print("─" * 72, "\n")

    client = genai.Client(api_key=API_KEY)

    successes = 0
    skipped = 0
    failures = 0

    for i, (filename, prompt, aspect) in enumerate(ASSETS, 1):
        prefix = f"[{i:>2}/{len(ASSETS)}]"
        if already_exists(filename):
            print(f"{prefix} {filename:<32} (exists, skipped)")
            skipped += 1
            continue

        print(f"{prefix} {filename:<32} → generating ({aspect})…")
        if generate_one(client, filename, prompt, aspect):
            successes += 1
        else:
            failures += 1

    print("\n" + "─" * 72)
    print(f" Done.  generated: {successes}   skipped: {skipped}   failed: {failures}")
    print("─" * 72)
    if failures:
        sys.exit(1)


if __name__ == "__main__":
    main()
