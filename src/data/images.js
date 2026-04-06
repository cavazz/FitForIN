// ── Helpers ────────────────────────────────────────────────────────────────
const UNS  = (id, w = 800, h = 520) =>
  `https://images.unsplash.com/photo-${id}?w=${w}&h=${h}&fit=crop&auto=format&q=80`

// Pexels CDN — used for Basketball Lab (8 verified IDs, all confirmed working)
const PEX  = (id, w = 800, h = 520) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=${w}&h=${h}&fit=crop`

// ── Article images — one unique photo per article ──────────────────────────
export const articleImages = {

  // ── BASKET LAB — Pexels (8 verified) ──────────────────────────────────
  // cervello-playmaker: decision making, cognitive load in game
  'cervello-playmaker':                           PEX(2874717),   // basketball game indoor, players in action
  // quiet-eye: visual focus on the target/hoop
  'quiet-eye-basket':                             PEX(1752757),   // basketball hoop close-up
  // decelerazione: footwork, braking mechanics
  'decelerazione-basket':                         PEX(8084765),   // dribbling close-up, ball & feet
  // repeated sprint ability: conditioning / speed
  'repeated-sprint-ability':                      PEX(1080884),   // player dunking outdoor — athleticism
  // tagliafuori: rebounding position, body position
  'tagliafuori-basket':                           PEX(6777189),   // dark low-angle court, defensive stance
  // physical & technical assessments
  'physical-technical-assessments-basketball':    PEX(2834917),   // player mid-dunk — athletic performance
  // injury patterns NBA: drama, professional level
  'injury-patterns-nba':                          PEX(5756239),   // sunset silhouette shooting — cinematic
  // recovery methods: atmosphere of rest/recovery
  'recovery-methods-basketball':                  PEX(2277981),   // moody wet court reflection

  // ── TRAINING — Unsplash (verified old-format IDs) ─────────────────────
  'allenare-gesto-atleta':
    UNS('1571019613454-1cb2f99b2d8b'),    // athletic training movement
  'professionisti-dilettanti-falso-mito':
    UNS('1461896836934-ffe607ba8211'),    // athlete running on road
  'epigenetica-sport':
    UNS('1532187863486-abf9dbad1b69'),    // science lab / genetics research

  // ── SCIENZA DELL'ESERCIZIO — Unsplash ─────────────────────────────────
  'post-activation-potentiation':
    UNS('1534438327276-14e5300c3a48'),    // barbell / power lifting
  'acsm-linee-guida-forza':
    UNS('1549060279-7e168fcee0c2'),       // gym equipment / strength testing
  'warm-up-durata-ottimale':
    UNS('1526676037777-05a232554f77'),    // athlete stretching / warm-up
  'oltre-vo2max-soglia-neuromeccanica':
    UNS('1571019613454-1cb2f99b2d8b'),    // athletic conditioning
  'approccio-integrato-performance-metabolomica':
    UNS('1559757175-0eb30cd8c063'),       // science/anatomy — metabolomics

  // ── ALIMENTAZIONE — Unsplash ───────────────────────────────────────────
  'distribuzione-proteica':
    UNS('1490645935967-10de6ba17061'),    // healthy protein meal
  'microbiota-sport-squadra':
    UNS('1536856136534-bb679c52a9aa'),    // fermented food / gut health
  'vitamina-d-performance':
    UNS('1505576399279-565b52d4ac71'),    // vitamins / supplements
  'basketball-off-season':
    UNS('1461896836934-ffe607ba8211'),    // off-season conditioning / running

  // ── MEDICINA SPORTIVA — Unsplash ──────────────────────────────────────
  'sarcopenia-problema-cerebrale':
    UNS('1534438327276-14e5300c3a48'),    // strength training — muscle mass
  'muscolo-organo-endocrino':
    UNS('1549060279-7e168fcee0c2'),       // gym / muscle work
  'crampi-muscolari-esercizio':
    UNS('1608245449230-4ac19066d2d0'),    // basketball — cramps from exertion
  'emergenze-sportive-primo-soccorso':
    UNS('1546866655-5aa049cde2c2'),       // sport context — first aid readiness
  'cross-education-effect':
    UNS('1546519638405-a7be394f5e27'),    // unilateral training
}

// ── Category hero images ───────────────────────────────────────────────────
export const categoryImages = {
  'Basket Lab':
    PEX(2874717),
  'Training':
    UNS('1534438327276-14e5300c3a48'),
  'Alimentazione':
    UNS('1490645935967-10de6ba17061'),
  'Medicina sportiva':
    UNS('1559757175-0eb30cd8c063'),
  "Scienza dell'esercizio":
    UNS('1532187863486-abf9dbad1b69'),
}

export function getArticleImage(slug, category) {
  return (
    articleImages[slug] ||
    categoryImages[category] ||
    UNS('1571019613454-1cb2f99b2d8b')
  )
}
