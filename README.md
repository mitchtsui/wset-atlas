# WSET Level 3 Interactive Wine Atlas

A free, interactive study tool built to help you pass the WSET Level 3 Award in Wines exam. Maps every region, drills every exam trap, and tests you on the material that actually comes up.

**[Launch the app →](https://wset-atlas.vercel.app)**

---

## What's inside

### 🗺 Cartographic Maps — 15 Countries, 70+ Regions, 150+ Appellations

Every WSET L3 wine region has its own zoomable SVG map with rivers, mountains, ocean currents, winds, and town markers. Tap a region to zoom in. 24 detailed appellation-level sub-maps show individual villages and AOC/DOC/DOCG boundaries — Bordeaux's left and right bank appellations, Burgundy's Côte d'Or communes, Barolo vs Barbaresco in Piedmont, Napa sub-AVAs, and more.

Tap any appellation shape on a sub-map for a card showing its key grapes, classification, style, and soil type.

### 📖 27 Study Chapters

Each of the 27 exam chapters includes:

- **Climate & Conditions** with key influences and hazards, bold-highlighted terms
- **Key Grapes** shown as red/white tags
- **Winemaking** techniques with paragraph structure and bold key terms
- **Soil Types** with exam-relevant terms highlighted
- **Key Wines & Styles** table — a quick-reference grid of each region's important wines, their grapes, and distinguishing features
- **Key Fact** callout — the single most important thing to remember
- **Exam Traps** — red-bordered cards flagging the mistakes students actually make (Pouilly-Fuissé vs Pouilly-Fumé, Amarone is DRY, VT can be dry, etc.)
- **Key Exam Takeaways** — bulleted summary of must-know points

Chapters cover all 26 original WSET L3 regions plus a dedicated **Champagne** chapter with full coverage of the traditional method, sub-regions, cru system, NV vs Vintage, Blanc de Blancs/Noirs, dosage, and rosé blending.

### 📊 Reference Charts

Visual charts that make classification systems stick:

- **German Prädikat Sweetness Levels** — Kabinett through TBA with must weights, sweetness rules, and the exam trap about ripeness vs sweetness
- **Alsace Quality Pyramid** — Grand Cru / VT / SGN with the critical distinction that VT can be dry while SGN is always sweet
- **Wachau Classification** — Steinfeder / Federspiel / Smaragd with ABV ranges and the trap that Wachau is NOT part of the DAC system
- **Sparkling Methods Compared** — Traditional / Tank / Transfer side-by-side process flow
- **Port Production & Styles** — Ruby pathway (reductive) vs Tawny pathway (oxidative)
- **Sherry Production & Styles** — Biological (flor) vs Oxidative ageing with the Amontillado bridge

### 📝 250+ Practice Questions

Three question formats that match what you'll face on exam day:

**Multiple Choice (91 questions across all 27 chapters + sparkling + fortified)**
Tap an option, get instant green/red feedback plus a written explanation. Every question targets a specific exam-relevant distinction.

**Short Answer (148 questions)**
Reveal-to-answer format. 37 of these include **key answer points** — after revealing the model answer, you'll see tagged chips showing exactly which points the examiner is looking for, so you can self-assess whether your mental answer would have scored.

**Quick-Fire Quiz (28 questions on sparkling & fortified)**
Rapid recall questions on the thematic topics.

### 🎯 Practice Exam Mode

Simulates real exam conditions:

- Choose 10, 20, or 30 questions
- Timed mode (with countdown) or untimed
- Questions randomly drawn from all 27 chapters
- Progress dots show which you've answered and whether you got them right
- Full review screen after completion with chapter-by-chapter breakdown
- 55% pass threshold matches the real exam

### ⚖️ Compare Regions

Side-by-side comparison tool — pick any two regions and see their climate, grapes, soil, winemaking, and key wines laid out in a grid. Includes an auto-generated comparison practice prompt, because the exam loves asking you to contrast regions (Barolo vs Brunello, Marlborough vs Central Otago, Oregon vs Washington, etc.).

### 📈 Progress Tracking

The app tracks your study activity in your browser:

- **MC score** — how many you've answered correctly out of total attempted
- **SQ revealed** — how many short answer questions you've studied
- **Exam history** — number of practice exams taken and your best score
- **Areas to Review** — automatically identifies your 3 weakest chapters by MC accuracy, so you know exactly where to focus next

Progress persists across sessions via localStorage. Reset any time from the home screen.

### 🍾 Sparkling Wines Thematic Page

Dedicated deep-dive covering:
- Method comparison chart (Traditional vs Tank vs Transfer)
- Key differences table (fermentation vessel, lees ageing, riddling, complexity, cost)
- Dosage levels from Brut Nature to Doux
- 8 wines with method badges: Champagne, Crémant, Cava, Franciacorta, Prosecco, Asti, Sekt, English Sparkling
- 4 interactive MC questions + 10 quick-fire quiz questions

### 🍷 Fortified Wines Thematic Page

Dedicated deep-dive covering:
- 4 key concepts (Mutage, Flor, Oxidative ageing, Solera)
- Port production flow chart with Ruby vs Tawny pathways
- Sherry production flow chart with Biological vs Oxidative ageing
- 4 tabbed sections: Port, Sherry, Madeira, VDN — each with styles, traps, and quizzes
- 4 interactive MC questions + 8 quick-fire quiz questions

---

## How to use this for exam prep

**Phase 1 — Learn the regions.** Open each country, explore the map, tap every region. Read the climate, grapes, and winemaking sections. Pay attention to the bold terms — those are the vocabulary the exam expects.

**Phase 2 — Drill the traps.** Read every red "Exam Trap" card. These are sourced from the most common mistakes real students make. If you can avoid these, you're ahead of most candidates.

**Phase 3 — Test yourself.** Work through the MC questions region by region. Don't just pick the answer — read the explanation even when you get it right. For short answer questions, formulate your answer mentally before revealing, then check the key points.

**Phase 4 — Compare and contrast.** Use the Compare tool to study pairs the exam loves: N. Rhône vs S. Rhône, Barolo vs Barbaresco, Chablis vs Côte de Beaune Chardonnay, California vs Oregon Pinot Noir, Chile vs Argentina.

**Phase 5 — Simulate the exam.** Take timed practice exams. The 55% pass threshold is real. Review your weak areas and go back to those chapters.

**Phase 6 — Revisit weak areas.** Check the "Areas to Review" section on the home screen. It shows your 3 weakest chapters by accuracy. Go back, re-read, re-test.

---

## Mobile & Desktop

The app is fully responsive. On desktop you get the map and detail panel side by side. On mobile (under 700px) it switches to a tabbed interface — Map, List, and Detail tabs — so everything works on your phone during your commute.

Maps support pinch-to-zoom on mobile and scroll-to-zoom on desktop, with drag-to-pan.

---

## Running locally

```bash
git clone https://github.com/YOUR_USERNAME/wset-atlas.git
cd wset-atlas
npm install
npm run dev
```

Requires Node.js 18+. Built with Vite + React. No external UI libraries — just React hooks and inline SVG.

---

## Coverage at a glance

| | Count |
|---|---|
| Countries | 15 |
| Regions | 70+ |
| Appellation sub-maps | 24 |
| Villages/communes mapped | 150+ |
| Study chapters | 27 |
| Multiple choice questions | 91 (chapters) + 8 (thematic) |
| Short answer questions | 148 |
| Quick-fire quiz | 28 |
| **Total practice questions** | **275+** |
| Key wines reference entries | 57 |
| SQ with key answer points | 37 |
| Production flow charts | 3 (Sparkling, Port, Sherry) |
| Classification charts | 3 (Prädikat, Alsace VT/SGN, Wachau) |

---

*Built for students, by a student. Good luck on exam day.* 🍷
