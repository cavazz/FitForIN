import { Link } from 'react-router-dom'
import Footer from '../components/Footer'

const CONTENT = {

  contatti: {
    title: 'Contatti',
    intro: 'Per qualsiasi richiesta, collaborazione o informazione, puoi contattarci tramite i canali sottostanti.',
    sections: [
      {
        heading: 'Autore & Founder',
        text: 'Fabio Forin — preparatore atletico, laureato in Scienze Motorie e specializzato in sport di squadra con focus sul basket. Fondatore di FitforIN nel 2006.',
      },
      {
        heading: 'Instagram',
        text: '@fitforin — Seguici per contenuti quotidiani su training, nutrizione e performance sportiva.',
        link: { href: 'https://www.instagram.com/fitforin/', label: 'Apri Instagram ↗' },
      },
      {
        heading: 'Sito ufficiale',
        text: 'www.fitforin.it — Blog di riferimento per atleti, allenatori e appassionati di sport che vogliono applicare la scienza all\'allenamento.',
      },
      {
        heading: 'Collaborazioni & Press',
        text: 'Per proposte di collaborazione, guest post, sponsorizzazioni o richieste media, utilizza i canali social o il form di contatto disponibile su Instagram.',
      },
      {
        heading: 'Copyright',
        text: 'I contenuti pubblicati su FitforIN — articoli, immagini, grafiche e metodologie — sono protetti da copyright © 2006–2025. Qualsiasi riproduzione richiede autorizzazione scritta e citazione della fonte originale.',
      },
    ],
  },

  privacy: {
    title: 'Privacy Policy',
    intro: 'Informativa sul trattamento dei dati personali ai sensi del Regolamento UE 2016/679 (GDPR) e del D.Lgs. 196/2003 come modificato dal D.Lgs. 101/2018.',
    sections: [
      {
        heading: '1. Titolare del trattamento',
        text: 'FitforIN — Fabio Forin\nSito web: www.fitforin.it\nInstagram: @fitforin\n\nPer esercitare i tuoi diritti o per qualsiasi domanda relativa al trattamento dei tuoi dati, puoi contattarci tramite i canali social indicati sopra.',
      },
      {
        heading: '2. Tipologia di dati raccolti',
        text: 'Il sito raccoglie esclusivamente dati di navigazione anonimi tramite Google Analytics (ID: GT-MQJR2CWT). Non vengono raccolti dati personali identificabili (nome, email, indirizzo) senza esplicito consenso dell\'utente.\n\nDati di navigazione: indirizzo IP anonimizzato, tipo di browser, sistema operativo, pagine visitate, durata della sessione.',
      },
      {
        heading: '3. Finalità e base giuridica del trattamento',
        text: 'I dati vengono trattati per le seguenti finalità:\n\n• Funzionamento tecnico del sito (base giuridica: interesse legittimo)\n• Analisi statistica delle visite per migliorare i contenuti (base giuridica: consenso dell\'utente)\n• Adempimento di obblighi legali (base giuridica: obbligo legale)',
      },
      {
        heading: '4. Cookie e tecnologie di tracciamento',
        text: 'Il sito utilizza cookie tecnici (necessari) e cookie analitici (opzionali). Per informazioni dettagliate sulla tipologia di cookie utilizzati e su come gestirli, consulta la nostra Cookie Policy.',
      },
      {
        heading: '5. Conservazione dei dati',
        text: 'I dati di navigazione anonimizzati raccolti tramite Google Analytics vengono conservati per un periodo massimo di 14 mesi, come da impostazioni predefinite di Google Analytics 4, dopodiché vengono eliminati automaticamente.',
      },
      {
        heading: '6. Condivisione con terze parti',
        text: 'I dati anonimi di navigazione vengono elaborati da Google LLC (Google Analytics), con sede negli Stati Uniti, nell\'ambito del programma EU-US Data Privacy Framework. Google agisce come responsabile del trattamento.\n\nNon vendiamo né condividiamo dati personali con terze parti per finalità di marketing.',
      },
      {
        heading: '7. Diritti dell\'interessato',
        text: 'In qualità di interessato, hai il diritto di:\n\n• Accedere ai tuoi dati personali\n• Rettificare dati inesatti\n• Richiedere la cancellazione dei dati\n• Opporti al trattamento\n• Richiedere la limitazione del trattamento\n• Portabilità dei dati\n• Proporre reclamo all\'Autorità Garante (www.garanteprivacy.it)\n\nPer esercitare questi diritti, contattaci tramite i canali social.',
      },
      {
        heading: '8. Modifiche alla Privacy Policy',
        text: 'Questa informativa può essere aggiornata periodicamente. La data dell\'ultima modifica è indicata in fondo alla pagina. Continuando a utilizzare il sito dopo eventuali modifiche, accetti la nuova versione dell\'informativa.',
      },
      {
        heading: 'Ultimo aggiornamento',
        text: 'Aprile 2025',
      },
    ],
  },

  cookie: {
    title: 'Cookie Policy',
    intro: 'Informativa sull\'uso dei cookie ai sensi del Provvedimento del Garante per la protezione dei dati personali dell\'8 maggio 2014 e delle successive Linee Guida cookies del 10 giugno 2021.',
    sections: [
      {
        heading: '1. Cosa sono i cookie',
        text: 'I cookie sono piccoli file di testo che i siti web visitati inviano al terminale dell\'utente (computer, tablet, smartphone), dove vengono memorizzati per essere poi ritrasmessi agli stessi siti alla visita successiva.\n\nGrazie ai cookie il sito ricorda le azioni e preferenze dell\'utente (login, lingua, dimensioni dei caratteri, ecc.) per non doverle reinserire ad ogni nuova visita.',
      },
      {
        heading: '2. Cookie tecnici — Sempre attivi',
        text: 'Sono necessari per il corretto funzionamento del sito. Non richiedono consenso preventivo.\n\n• Cookie di sessione: gestiscono la navigazione e scadono alla chiusura del browser\n• Cookie di preferenza: memorizzano le scelte dell\'utente (es. consenso cookie) per 12 mesi\n• Cookie di sicurezza: proteggono l\'integrità delle comunicazioni',
      },
      {
        heading: '3. Cookie analitici — Richiedono consenso',
        text: 'Utilizziamo Google Analytics 4 (ID: GT-MQJR2CWT) con anonimizzazione dell\'indirizzo IP per raccogliere statistiche aggregate sulle visite al sito.\n\nQuesti cookie ci aiutano a capire come gli utenti interagiscono con il sito, quali pagine vengono visitate più frequentemente e come migliorare l\'esperienza di navigazione.\n\nDurata: fino a 13 mesi\nFornitore: Google LLC, 1600 Amphitheatre Pkwy, Mountain View, CA, USA',
      },
      {
        heading: '4. Cookie di terze parti',
        text: 'Il sito può includere contenuti da piattaforme esterne (es. video YouTube, post Instagram). Queste piattaforme possono installare cookie propri per le quali si rimanda alle rispettive informative:\n\n• Google/YouTube: policies.google.com/privacy\n• Instagram/Meta: privacycenter.instagram.com',
      },
      {
        heading: '5. Come gestire i cookie',
        text: 'Puoi gestire, modificare o revocare il consenso ai cookie in qualsiasi momento:\n\n• Banner cookie: al primo accesso al sito e tramite il link in fondo alla pagina\n• Impostazioni browser: ogni browser permette di bloccare o eliminare i cookie nelle impostazioni\n  – Chrome: Impostazioni → Privacy e sicurezza → Cookie\n  – Firefox: Preferenze → Privacy e sicurezza\n  – Safari: Preferenze → Privacy\n  – Edge: Impostazioni → Cookie e autorizzazioni sito\n\nAttenzione: disabilitare tutti i cookie potrebbe compromettere il funzionamento di alcune parti del sito.',
      },
      {
        heading: '6. Consenso e revoca',
        text: 'Al primo accesso al sito viene mostrato un banner che ti permette di:\n\n• Accettare tutti i cookie (tecnici + analitici)\n• Accettare solo i cookie necessari\n\nLe tue preferenze vengono salvate localmente per 12 mesi. Puoi cambiare idea in qualsiasi momento cancellando i dati del browser o contattandoci.',
      },
      {
        heading: '7. Contatti e reclami',
        text: 'Per qualsiasi domanda relativa ai cookie o per esercitare i tuoi diritti, contattaci tramite i canali social (@fitforin).\n\nHai inoltre il diritto di proporre reclamo all\'Autorità Garante per la protezione dei dati personali: www.garanteprivacy.it',
      },
      {
        heading: 'Ultimo aggiornamento',
        text: 'Aprile 2025',
      },
    ],
  },
}

// ── render helpers ────────────────────────────────────────
function renderText(text) {
  return text.split('\n').map((line, i) => (
    line.trim() === ''
      ? <br key={i} />
      : <span key={i} style={{ display: 'block' }}>{line}</span>
  ))
}

export default function SimpleInfoPage({ type }) {
  const page = CONTENT[type]

  return (
    <>
      <div
        className="min-h-screen"
        style={{ background: 'linear-gradient(180deg, #0E0C09 0%, #131108 100%)' }}
      >
        <div className="pt-[148px] pb-24 px-6 md:px-10 max-w-[720px] mx-auto">

          {/* back */}
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-[9px] tracking-[0.3em] uppercase mb-12 transition-colors"
            style={{ color: 'rgba(201,160,82,0.35)' }}
            onMouseEnter={e => e.currentTarget.style.color = '#C9A052'}
            onMouseLeave={e => e.currentTarget.style.color = 'rgba(201,160,82,0.35)'}
          >
            ← Home
          </Link>

          {/* title */}
          <h1
            className="font-black mb-4"
            style={{
              fontSize: 'clamp(38px,7vw,72px)',
              letterSpacing: '-0.04em',
              lineHeight: 0.92,
              background: 'linear-gradient(135deg,#E8DCBA 0%,#C9A052 60%,#8B6420 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            {page.title}
          </h1>

          {/* intro */}
          {page.intro && (
            <p
              className="text-[13px] leading-[1.75] mb-12 pl-4"
              style={{
                color: 'rgba(201,160,82,0.5)',
                borderLeft: '2px solid rgba(201,160,82,0.2)',
              }}
            >
              {page.intro}
            </p>
          )}

          {/* sections */}
          <div className="space-y-10">
            {page.sections.map(({ heading, text, link }) => (
              <div
                key={heading}
                className="rounded-2xl p-6"
                style={{
                  background: 'rgba(201,160,82,0.03)',
                  border: '1px solid rgba(201,160,82,0.08)',
                }}
              >
                <h2
                  className="text-[10px] font-bold tracking-[0.25em] uppercase mb-3"
                  style={{ color: '#C9A052' }}
                >
                  {heading}
                </h2>
                <div
                  className="text-[13px] leading-[1.85]"
                  style={{ color: 'rgba(201,160,82,0.55)' }}
                >
                  {renderText(text)}
                </div>
                {link && (
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 mt-4 text-[11px] font-semibold transition-colors"
                    style={{ color: '#C9A052' }}
                  >
                    {link.label}
                  </a>
                )}
              </div>
            ))}
          </div>

        </div>
      </div>
      <Footer />
    </>
  )
}
