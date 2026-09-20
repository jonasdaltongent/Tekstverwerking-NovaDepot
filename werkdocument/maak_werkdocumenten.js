/**
 * maak_werkdocumenten.js
 * Genereert de twee werkdocumenten voor de reeks Tekstverwerking (NovaDepot):
 *   - TV1_Tekst-invoeren.docx   (les 1: tekst invoeren en verbeteren)
 *   - TV2_Tekst-opmaken.docx    (les 2: tekst opmaken volgens de huisstijl)
 * Upload ze naar Google Drive en open ze met Google Documenten.
 *
 * Gebruik:  node maak_werkdocumenten.js      (vereist het npm-pakket "docx")
 *
 * LET OP bij aanpassen:
 *  - De fouten in Opdracht A (les 1) zijn opzettelijk. Het zijn er precies 8.
 *  - De tekst van deel A en B (les 2) is opzettelijk onopgemaakt (Arial 11, links).
 */
const fs = require('fs');
const path = require('path');
const {
  Document, Packer, Paragraph, TextRun, ImageRun, Table, TableRow, TableCell,
  AlignmentType, WidthType, BorderStyle, ShadingType, Header, Footer, PageBreak,
  HeightRule, VerticalAlign, PageNumber
} = require('docx');

const DIR = __dirname;
const ASSETS = path.join(DIR, '..', 'assets');
const NAVY = '3C51A0', NAVY_DEEP = '2A3973', PERI_SOFT = 'E4E8F6', BLUSH_SOFT = 'FEF0EC', SAND = 'EDECE4', GREY = '6B7089';
const CONTENT_W = 9638; // A4 (11906) - 2 x 1134 marge

// ---------- hulpfuncties ----------
const t = (text, o = {}) => new TextRun({ text, font: 'Arial', ...o });
const p = (children, o = {}) => new Paragraph({ children: Array.isArray(children) ? children : [children], ...o });
const plain = (text) => p(t(text), { spacing: { after: 120 } }); // gewone, onopgemaakte alinea

const none = { style: BorderStyle.NONE, size: 0, color: 'FFFFFF' };
const noBorders = { top: none, bottom: none, left: none, right: none };
const thin = (c = 'C9C8BE') => ({ style: BorderStyle.SINGLE, size: 6, color: c });
const box = (c) => ({ top: thin(c), bottom: thin(c), left: thin(c), right: thin(c) });

function boxTable(children, { fill = PERI_SOFT, border = 'A7B1DE', minHeight } = {}) {
  return new Table({
    width: { size: CONTENT_W, type: WidthType.DXA },
    columnWidths: [CONTENT_W],
    rows: [new TableRow({
      height: minHeight ? { value: minHeight, rule: HeightRule.ATLEAST } : undefined,
      children: [new TableCell({
        width: { size: CONTENT_W, type: WidthType.DXA },
        shading: { fill, type: ShadingType.CLEAR, color: 'auto' },
        borders: box(border),
        margins: { top: 120, bottom: 120, left: 180, right: 180 },
        children
      })]
    })]
  });
}

function heading(text) {
  return p(t(text, { bold: true, size: 28, color: NAVY_DEEP }), { spacing: { before: 360, after: 80 }, keepNext: true });
}
function sub(text) {
  return p(t(text, { italics: true, size: 20, color: GREY }), { spacing: { after: 160 }, keepNext: true });
}
function spacer(after = 120) { return p(t(''), { spacing: { after } }); }

function logo(width = 190) {
  const img = fs.readFileSync(path.join(ASSETS, 'novadepot-logo.png'));
  // logo is 1527 x 360 px
  return new ImageRun({ type: 'png', data: img, transformation: { width, height: Math.round(width * 360 / 1527) } });
}

function kop(lesnr, titel, bestand) {
  return [
    new Table({
      width: { size: CONTENT_W, type: WidthType.DXA },
      columnWidths: [4819, 4819],
      rows: [new TableRow({ children: [
        new TableCell({ width: { size: 4819, type: WidthType.DXA }, borders: noBorders, verticalAlign: VerticalAlign.CENTER, children: [p(logo())] }),
        new TableCell({ width: { size: 4819, type: WidthType.DXA }, borders: noBorders, verticalAlign: VerticalAlign.CENTER, children: [
          p(t('Toegepaste Informatica', { size: 18, color: GREY }), { alignment: AlignmentType.RIGHT }),
          p(t('2de graad Organisatie en logistiek', { size: 18, color: GREY }), { alignment: AlignmentType.RIGHT })
        ] })
      ] })]
    }),
    p(t(`Tekstverwerking ${lesnr}`, { bold: true, size: 20, color: NAVY }), { spacing: { before: 240, after: 0 } }),
    p(t(titel, { bold: true, size: 36, color: NAVY_DEEP }), { spacing: { after: 200 } }),
    new Table({
      width: { size: CONTENT_W, type: WidthType.DXA },
      columnWidths: [2400, 7238],
      rows: ['Naam en voornaam:', 'Klas:'].map(lbl => new TableRow({ children: [
        new TableCell({ width: { size: 2400, type: WidthType.DXA }, borders: { top: none, left: none, right: none, bottom: thin('A7B1DE') }, margins: { top: 80, bottom: 60, left: 0, right: 80 }, children: [p(t(lbl, { bold: true, size: 21 }))] }),
        new TableCell({ width: { size: 7238, type: WidthType.DXA }, borders: { top: none, left: none, right: none, bottom: thin('A7B1DE') }, margins: { top: 80, bottom: 60, left: 80, right: 80 }, children: [p(t(''))] })
      ] }))
    }),
    spacer(200),
    boxTable([
      p(t('Zo werk je', { bold: true, color: NAVY_DEEP, size: 22 }), { spacing: { after: 60 } }),
      p([t('1. Lees wat je moet doen op de '), t('lespagina', { bold: true }), t(' (links op je scherm).')], { spacing: { after: 40 } }),
      p([t('2. Werk in '), t('dit werkdocument', { bold: true }), t(` (rechts op je scherm): ${bestand}.`)], { spacing: { after: 40 } }),
      p([t('3. Klaar? Lever '), t('dit werkdocument', { bold: true }), t(' in via Google Classroom.')], { spacing: { after: 0 } })
    ])
  ];
}

function exitvragen(vragen) {
  const out = [heading('Exitvragen'), sub('Beantwoord deze 2 vragen voor je inlevert.')];
  vragen.forEach((v, i) => {
    out.push(p(t(`${i + 1}. ${v}`, { bold: true }), { spacing: { before: 120, after: 80 }, keepNext: true }));
    out.push(boxTable([p(t(''))], { fill: 'FFFFFF', border: 'A7B1DE', minHeight: 900 }));
  });
  return out;
}

function doc(children, footerText) {
  return new Document({
    creator: 'Toegepaste Informatica',
    title: footerText,
    styles: { default: { document: { run: { font: 'Arial', size: 22 } } } },
    sections: [{
      properties: { page: { size: { width: 11906, height: 16838 }, margin: { top: 1000, bottom: 1000, left: 1134, right: 1134 } } },
      headers: { default: new Header({ children: [p(t('NovaDepot · Toegepaste Informatica', { size: 16, color: GREY }), { alignment: AlignmentType.RIGHT })] }) },
      footers: { default: new Footer({ children: [p([t(`${footerText} · GO! Dalton Gent · pagina `, { size: 16, color: GREY }), new TextRun({ children: [PageNumber.CURRENT], font: 'Arial', size: 16, color: GREY })], { alignment: AlignmentType.CENTER })] }) },
      children
    }]
  });
}

// =====================================================================
// LES 1 — TV1_Tekst-invoeren
// =====================================================================
function les1() {
  const nota = fs.readFileSync(path.join(DIR, 'nota-magazijn.png')); // 2200 x 1180 px
  const volgorde = [
    ['1', ''], ['2', ''], ['3', ''], ['4', ''], ['5', ''], ['6', ''], ['Contact', '']
  ];
  const children = [
    ...kop(1, 'Tekst invoeren en verbeteren', 'TV1_Tekst-invoeren'),

    // ---------- Opdracht A ----------
    heading('Opdracht A — Foutenjacht'),
    sub('Lespagina: stap 2. In deze mededeling staan 8 fouten. Verbeter ze.'),
    // OPZETTELIJKE FOUTEN (8): 2x spatie vóór leesteken, 2x dubbele spatie,
    // 1x kleine letter aan het begin van een zin, 1x Enter midden in een zin, 2x tikfout.
    plain('Nieuwe openingsuren van het onthaal'),
    p([t('Vanaf maandag 5 oktober is  het onthaal van NovaDepot open van 7.30 uur tot 17.00 uur . op vrijdag sluiten we al om 15.00 uur. Chaufeurs die later aankomen , bellen naar Tom in het magazijn via toestel 214.')], { spacing: { after: 120 } }),
    p([t('Bezoekers  melden zich altyd eerst aan bij het onthaal. Daar krijgen ze een')], { spacing: { after: 0 } }),
    p([t('badge. Vragen? Stel ze gerust aan de medewerker van het onthaal.')], { spacing: { after: 120 } }),

    // ---------- Opdracht B ----------
    p(new PageBreak()),
    heading('Opdracht B — Zinnen in de juiste volgorde'),
    sub('Lespagina: stap 3. Knip elke zin en plak hem in het juiste vak van de tabel.'),
    plain('Problemen met een levering? Bel het onthaal via toestel 200.'),
    p(t('Zo ontvang je een levering (de zinnen staan door elkaar):', { bold: true }), { spacing: { before: 120, after: 80 } }),
    plain('Dan zet je de dozen in de ontvangstzone.'),
    plain('Eerst meldt de chauffeur zich aan bij het onthaal.'),
    plain('Tot slot scan je de dozen in het computersysteem.'),
    plain('Vervolgens tel je de dozen en vergelijk je het aantal met de leveringsbon.'),
    plain('De koffieautomaat in de kantine is weer stuk.'),
    plain('Als alles klopt, teken je de leveringsbon af.'),
    plain('Daarna geeft de chauffeur jou de leveringsbon.'),
    spacer(80),
    new Table({
      width: { size: CONTENT_W, type: WidthType.DXA },
      columnWidths: [1300, 8338],
      rows: [
        new TableRow({ tableHeader: true, children: [
          new TableCell({ width: { size: 1300, type: WidthType.DXA }, shading: { fill: NAVY, type: ShadingType.CLEAR, color: 'auto' }, borders: box(NAVY), margins: { top: 80, bottom: 80, left: 120, right: 120 }, children: [p(t('Stap', { bold: true, color: 'FFFFFF' }))] }),
          new TableCell({ width: { size: 8338, type: WidthType.DXA }, shading: { fill: NAVY, type: ShadingType.CLEAR, color: 'auto' }, borders: box(NAVY), margins: { top: 80, bottom: 80, left: 120, right: 120 }, children: [p(t('Zin (plak hier)', { bold: true, color: 'FFFFFF' }))] })
        ] }),
        ...volgorde.map(([nr]) => new TableRow({
          height: { value: 520, rule: HeightRule.ATLEAST },
          children: [
            new TableCell({ width: { size: 1300, type: WidthType.DXA }, shading: { fill: PERI_SOFT, type: ShadingType.CLEAR, color: 'auto' }, borders: box('A7B1DE'), verticalAlign: VerticalAlign.CENTER, margins: { top: 60, bottom: 60, left: 120, right: 120 }, children: [p(t(nr, { bold: true, color: NAVY_DEEP }))] }),
            new TableCell({ width: { size: 8338, type: WidthType.DXA }, borders: box('A7B1DE'), verticalAlign: VerticalAlign.CENTER, margins: { top: 60, bottom: 60, left: 120, right: 120 }, children: [p(t(''))] })
          ]
        }))
      ]
    }),

    // ---------- Opdracht C ----------
    p(new PageBreak()),
    heading('Opdracht C — Een nota overtypen'),
    sub('Lespagina: stap 4. Typ de nota van Tom over in het kader. Gebruik de 4 typregels.'),
    p(new ImageRun({ type: 'png', data: nota, transformation: { width: 600, height: Math.round(600 * 1180 / 2200) }, altText: { title: 'Nota van Tom', description: 'Interne nota: Mededeling voor alle chauffeurs', name: 'nota' } }), { alignment: AlignmentType.CENTER, spacing: { after: 160 } }),
    p(t('Typ hier de nota over:', { bold: true, color: NAVY_DEEP }), { spacing: { after: 80 }, keepNext: true }),
    boxTable([p(t(''))], { fill: 'FFFFFF', border: NAVY, minHeight: 4200 }),

    // ---------- Exitvragen ----------
    p(new PageBreak()),
    ...exitvragen([
      'Waarom druk je niet op Enter aan het einde van elke regel?',
      'Welke stap vond je vandaag het moeilijkst? Waarom?'
    ]),

    // ---------- Extra ----------
    heading('Extra (niet verplicht) — Foutenjacht+'),
    sub('Lespagina: Extra. Geen enkele rode golflijn, toch staat er in elke zin een fout. Verbeter het werkwoord.'),
    // OPZETTELIJKE d/t-FOUTEN: word → wordt, vind → vindt, beschadigt → beschadigd, wordt → word
    plain('De levering word morgen om 8 uur geleverd.'),
    plain('De chauffeur vind de ontvangstzone niet meteen.'),
    plain('Eén doos is beschadigt.'),
    plain('Ik wordt verantwoordelijk voor de controle.')
  ];
  return doc(children, 'Tekstverwerking 1 · Tekst invoeren en verbeteren');
}

// =====================================================================
// LES 2 — TV2_Tekst-opmaken
// =====================================================================
function label(text, detail) {
  return boxTable([
    p([t(text, { bold: true, color: NAVY_DEEP, size: 22 }), t(`   ${detail}`, { size: 19, color: GREY })], { spacing: { after: 0 } })
  ], { fill: BLUSH_SOFT, border: 'F2A99C' });
}

function les2() {
  const children = [
    ...kop(2, 'Tekst opmaken', 'TV2_Tekst-opmaken'),
    spacer(160),
    label('▼ DEEL A', 'Maak deze tekst op met stap 1 tot 4 op de lespagina.'),
    spacer(160),
    // ONOPGEMAAKTE TEKST — deel A (van titel tot en met de datum)
    plain('Nieuwe regeling voor laden en lossen'),
    plain('Vanaf maandag 12 oktober laden en lossen we alleen nog aan poort 3 en poort 4. Poort 1 en poort 2 zijn in herstelling tot vrijdag 30 oktober.'),
    plain('Wat moet je doen?'),
    plain('Meld je bij aankomst eerst aan bij het onthaal.'),
    plain('Wacht tot je hoort aan welke poort je mag lossen.'),
    plain('Zet je vrachtwagen pas daarna aan de poort.'),
    plain('Vragen? Bel Tom in het magazijn via toestel 214.'),
    plain('Tom Peeters, magazijn – 5 oktober 2026'),

    p(new PageBreak()),
    label('▼ DEEL B', 'Maak deze tekst zelf op met de huisstijlkaart (stap 5 op de lespagina).'),
    spacer(160),
    // ONOPGEMAAKTE TEKST — deel B
    plain('Veilig werken in het magazijn'),
    plain('In het magazijn van NovaDepot rijden elke dag heftrucks en palletwagens. Daarom gelden er vaste afspraken voor iedereen.'),
    plain('Onze vijf afspraken'),
    plain('Draag altijd veiligheidsschoenen.'),
    plain('Draag altijd een fluohesje.'),
    plain('Loop alleen op de groene wandelpaden.'),
    plain('Blijf uit de buurt van een rijdende heftruck.'),
    plain('Meld een gevaarlijke situatie meteen aan je verantwoordelijke.'),
    plain('Heb je een vraag over veiligheid? Spreek dan Sara van de preventiedienst aan.'),
    plain('Sara Claes, preventiedienst – 5 oktober 2026'),

    p(new PageBreak()),
    ...exitvragen([
      'Wat doe je altijd eerst, voor je tekst opmaakt?',
      'Welke opmaakfunctie wil je nog eens oefenen? Waarom?'
    ])
  ];
  return doc(children, 'Tekstverwerking 2 · Tekst opmaken');
}

// Documenttaal op Nederlands (België) zetten, zodat de spellingcontrole Nederlands gebruikt.
// (Controleer in Google Documenten toch via Bestand › Taal › Nederlands.)
async function setLanguage(buf) {
  const JSZip = require(require.resolve('jszip', { paths: [require.resolve('docx')] }));
  const zip = await JSZip.loadAsync(buf);
  let styles = await zip.file('word/styles.xml').async('string');
  styles = styles.replace('<w:rPrDefault><w:rPr>', '<w:rPrDefault><w:rPr><w:lang w:val="nl-BE" w:eastAsia="nl-BE" w:bidi="ar-SA"/>');
  // w:lang moet na rFonts/sz komen volgens het schema: verplaats het naar het einde van rPr
  styles = styles.replace(/<w:rPrDefault><w:rPr>(<w:lang [^>]+\/>)(.*?)<\/w:rPr>/, '<w:rPrDefault><w:rPr>$2$1</w:rPr>');
  zip.file('word/styles.xml', styles);
  return zip.generateAsync({ type: 'nodebuffer', compression: 'DEFLATE' });
}

(async () => {
  for (const [name, d] of [['TV1_Tekst-invoeren.docx', les1()], ['TV2_Tekst-opmaken.docx', les2()]]) {
    const buf = await setLanguage(await Packer.toBuffer(d));
    fs.writeFileSync(path.join(DIR, name), buf);
    console.log('Gemaakt:', name);
  }
})();
