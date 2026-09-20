# Handleiding voor de leraar — Tekstverwerking 1 en 2 (NovaDepot)

**Vak:** Toegepaste Informatica  
**Doelgroep:** 2de graad Organisatie en logistiek, arbeidsmarktgerichte finaliteit  
**Lesduur:** 2 × 50 minuten (formatief)  
**Modelbedrijf:** NovaDepot (fictief logistiek bedrijf en groothandel)  
**Toestellen:** Windows 10-pc met AZERTY-klavier op school; thuis eventueel een Chromebook

---

## 1. Inhoud van het pakket

```text
Tekstverwerking-NovaDepot/
├── index.html                  # startpagina van de reeks (kies les 1 of 2)
├── les1.html                   # leerlingentool les 1: tekst invoeren en verbeteren
├── les2.html                   # leerlingentool les 2: tekst opmaken
├── presentatie.html            # klassikale dia's: ?les=1 of ?les=2
├── css/
│   ├── style.css               # leerlingentool (Dalton-kleuren, voor een half scherm)
│   └── slides.css              # dia's (16:9, beamer)
├── js/
│   ├── script.js               # stappen, vinkjes, theoriekaart, woordenlijst, zelftest, screenshots
│   └── slides.js               # dia's: onthullen, notities (N), volledig scherm (F)
├── assets/
│   ├── novadepot-logo.svg/.png # logo NovaDepot (zelf gemaakt)
│   ├── novadepot-icon.svg      # favicon
│   ├── dalton-gent-logo.png    # logo GO! Dalton Gent (uit jouw bestand)
│   ├── fonts/                  # Atkinson Hyperlegible + Montserrat (OFL-licentie, zelf gehost)
│   └── screenshots/            # hier plaats jij screenshots (zie §5)
├── werkdocument/
│   ├── TV1_Tekst-invoeren.docx # werkdocument les 1
│   ├── TV2_Tekst-opmaken.docx  # werkdocument les 2
│   ├── nota-magazijn.png       # afbeelding voor opdracht C (zit al in TV1)
│   └── maak_werkdocumenten.js  # script om beide .docx opnieuw te maken (node + npm-pakket docx)
├── lesvoorbereiding.md         # volledige lesvoorbereiding volgens §46 van de AI-lesplanner
├── dalton-lesfiche.md          # lesfiches in het Dalton-formaat
└── README.md                   # deze handleiding
```

De website heeft geen server, database, login of tracking nodig. Er worden geen externe bestanden geladen. `localStorage` bewaart alleen de vinkjes en de huidige stap (voorvoegsel `novadepot_tv1_` / `novadepot_tv2_`), met een wisknop.

---

## 2. Klaarzetten in 4 stappen

### Stap 1 — Publiceer via GitHub Pages
1. Plaats de volledige map in een GitHub-repository (bv. `Tekstverwerking-NovaDepot`).
2. **Settings → Pages** → Source: branch `main`, map `/ (root)` → **Save**.
3. Na 1 à 2 minuten staat de site op `https://jonasdaltongent.github.io/Tekstverwerking-NovaDepot/`.
4. Deel met leerlingen het **Pages-adres** van de les (`…/les1.html` of `…/les2.html`), niet de repository-link.

### Stap 2 — Werkdocumenten in Google Drive
1. Upload `TV1_Tekst-invoeren.docx` en `TV2_Tekst-opmaken.docx` naar Drive.
2. Rechtsklik → **Openen met → Google Documenten**. Je krijgt een Google-document.
3. Controleer in elk Google-document:
   - **Bestand → Taal → Nederlands** (anders staat alles rood onderlijnd);
   - dat de **8 fouten** in opdracht A er nog staan (zie §4);
   - dat de afbeelding van de nota zichtbaar is (TV1, opdracht C).
4. Verwijder het originele .docx-bestand uit Drive, zodat je niet per ongeluk het verkeerde bestand toevoegt.

### Stap 3 — Twee opdrachten in Google Classroom
Maak onder het onderwerp **Tekstverwerking – de basis** twee opdrachten:

| | Les 1 | Les 2 |
|---|---|---|
| **Titel** | Tekstverwerking 1 — Tekst invoeren en verbeteren | Tekstverwerking 2 — Tekst opmaken |
| **Link** | `…/les1.html` | `…/les2.html` |
| **Bestand** | TV1_Tekst-invoeren → **Een kopie maken voor elke leerling** | TV2_Tekst-opmaken → **Een kopie maken voor elke leerling** |
| **Punten** | Zonder cijfer | Zonder cijfer |

Instructietekst (kopieer):
```text
1. Open de lespagina (link). Zet ze links op je scherm.
2. Open je werkdocument. Zet het rechts op je scherm.
3. Volg de stappen op de lespagina. Werk in je werkdocument.
4. Klaar? Klik op Inleveren. Niet klaar? Lever toch in en schrijf een privéopmerking.
```

> **Belangrijk:** Classroom maakt de kopieën op het moment dat je de opdracht toewijst. Pas je daarna het origineel aan, dan komt die wijziging niet meer in de kopieën van de leerlingen. Werk de documenten dus eerst volledig af.

### Stap 4 — Dia's op het bord
Open `presentatie.html?les=1` of `presentatie.html?les=2`.
`→`/spatie: volgende (onthult eerst antwoorden) · `←`: vorige · `F`: volledig scherm · `N`: sprekersnotities.

---

## 3. Test vóór de les (10 minuten, bij voorkeur met een leerlingaccount)

- [ ] De Pages-link opent de lespagina, en de lettertypes en logo's laden.
- [ ] Vinkjes blijven staan na herladen. De knop "Vinkjes wissen" werkt.
- [ ] De knop **Theoriekaart** opent en sluit (in een breed venster staat ze vast rechts).
- [ ] Een onderstreept woord toont een uitleg.
- [ ] In het Google-document: **Bekijken → Opmaakmarkeringen tonen** zet de verborgen tekens aan. Heet het menu bij jou anders, pas dan stap 1 in `les1.html` aan (en de theoriekaart onderaan datzelfde bestand).
- [ ] Verdana staat in de lettertypelijst van Google Documenten.
- [ ] Zijn er AI-schrijfknoppen zichtbaar in Documenten? Spreek dan vooraf af dat ze niet gebruikt worden.

---

## 4. Verbetersleutel (formatief)

### Les 1 — Opdracht A: de 8 fouten
| # | Soort | In de tekst | Verbeterd |
|---|---|---|---|
| 1 | dubbele spatie | `is␣␣het` | is het |
| 2 | spatie vóór leesteken | `17.00 uur␣.` | 17.00 uur. |
| 3 | kleine letter | `op vrijdag` | Op vrijdag |
| 4 | tikfout | `Chaufeurs` | Chauffeurs |
| 5 | spatie vóór leesteken | `aankomen␣,` | aankomen, |
| 6 | dubbele spatie | `Bezoekers␣␣melden` | Bezoekers melden |
| 7 | tikfout | `altyd` | altijd |
| 8 | Enter midden in een zin | `een¶badge` | een badge |

### Les 1 — Opdracht B: juiste volgorde
1. Eerst meldt de chauffeur zich aan bij het onthaal.
2. Daarna geeft de chauffeur jou de leveringsbon.
3. Vervolgens tel je de dozen en vergelijk je het aantal met de leveringsbon.
4. Als alles klopt, teken je de leveringsbon af.
5. Dan zet je de dozen in de ontvangstzone.
6. Tot slot scan je de dozen in het computersysteem.

Contact: *Problemen met een levering? Bel het onthaal via toestel 200.* (gekopieerd, dus ook nog bovenaan)
Moet weg: *De koffieautomaat in de kantine is weer stuk.*

### Les 1 — Opdracht C
Titel + 3 alinea's + "Tom Peeters, magazijn". Controleer: ¶ alleen aan het einde van een alinea (4 of 5 keer), geen ·· en geen spatie vóór een leesteken, cijfers juist (12, 3, 4, 1, 2, 30, 214).

### Les 1 — Extra (d/t)
word → **wordt** · vind → **vindt** · beschadigt → **beschadigd** · wordt → **word**

### Les 2 — Deel A en B
Huisstijlkaart: Verdana overal · titel 20 pt vet gecentreerd · tussentitel 14 pt vet · tekst 12 pt links · lijst met opsommingstekens · max. 2 woordgroepen vet (A: *maandag 12 oktober*, *poort 3 en poort 4*; B: *veiligheidsschoenen*, *fluohesje*) · laatste regel rechts.

### Essentiële fouten (bespreek bij feedback)
- **Les 1:** Enter aan elk regeleinde · spaties om tekst te verschuiven · niet het eigen werkdocument ingeleverd.
- **Les 2:** centreren met spaties · zelf getypte streepjes in plaats van een opsomming · deel B zonder opmaak.

**Feedback:** één top en één tip als privéopmerking in Classroom. Verbeteren mag: leerling klikt op *Inlevering ongedaan maken*, verbetert en levert opnieuw in.

---

## 5. Screenshots toevoegen (optioneel)

De lespagina's hebben 12 vaste plaatsen voor screenshots. Bewaar een PNG met **exact deze naam** in `assets/screenshots/`. Het beeld verschijnt dan vanzelf op de juiste plaats, zonder dat je code moet aanpassen. Zolang het bestand er niet is, zien leerlingen niets.

**Tip:** open een lespagina met `?leraar` achter het adres (bv. `les1.html?leraar`). Dan zie je roze kaders met de bestandsnaam op elke plaats.

| Bestandsnaam | Wat moet erop? |
|---|---|
| `les1-twee-vensters.png` | Lespagina links en werkdocument rechts, naast elkaar |
| `les1-menu-bekijken.png` | Menu Bekijken open, de regel Opmaakmarkeringen tonen aangeduid |
| `les1-foutenjacht-tekens.png` | Opdracht A met verborgen tekens aan: spatie vóór een punt en Enter midden in een zin zichtbaar |
| `les1-spelling-rechtsklik.png` | Rechtsklik op een rood woord: juiste schrijfwijze bovenaan |
| `les1-opdracht-b-tabel.png` | Opdracht B: een zin wordt geplakt in het vak naast 1 |
| `les1-nota-kader.png` | Opdracht C: de nota en het kader waarin je typt |
| `les1-classroom-inleveren.png` | Classroom: de knop Inleveren in het vak Jouw werk |
| `th-venster-onderdelen.png` | Venster van Google Documenten met nummers 1–5 (documentnaam, menubalk, werkbalk, pagina, cursor) |
| `les2-werkbalk-lettertype.png` | Werkbalk: vak lettertype (Arial) en vak lettergrootte (11) aangeduid |
| `les2-knop-centreren.png` | Werkbalk: knop vet en knoppen om uit te lijnen aangeduid |
| `les2-knop-opsomming.png` | Werkbalk: knop Lijst met opsommingstekens aangeduid |
| `les2-knop-uitlijnen.png` | **Staat er al.** Knop Uitlijnen opengeklapt (links – centreren – rechts – uitvullen). Wordt getoond in stap 2, stap 4 en op de theoriekaart. |
| `th-werkbalk.png` | Echte werkbalk met de knoppen 1–8 genummerd, zoals in de schets op de theoriekaart |

Maak de screenshots op een **half scherm**: zo zien ze er hetzelfde uit als bij de leerlingen, en in een smal venster zitten sommige knoppen achter ⋮.

---

## 6. Werkdocumenten aanpassen

```bash
cd werkdocument
node maak_werkdocumenten.js   # vereist: npm install docx
```
De teksten staan in `maak_werkdocumenten.js`. De fouten in opdracht A en de d/t-fouten zijn met commentaar aangeduid. Wijzig je ze, pas dan ook de lespagina (stap 2) en §4 hierboven aan.

---

## 7. Lettertypes en licenties
- **Atkinson Hyperlegible** (Braille Institute) en **Montserrat** — SIL Open Font License, zie `assets/fonts/OFL-*.txt`. De cijfers worden getoond in het systeemlettertype (Segoe UI/Arial), omdat de nul van Atkinson een schuine streep heeft.
- Het NovaDepot-logo en de nota-afbeelding zijn eigen werk. NovaDepot en alle namen zijn fictief.
