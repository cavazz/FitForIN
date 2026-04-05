const BASE = 'https://images.unsplash.com/photo-'
const OPT  = '?w=800&h=520&fit=crop&auto=format&q=80'

export const articleImages = {
  'cervello-playmaker':          `${BASE}1546519638405-a7be394f5e27${OPT}`,
  'quiet-eye-basket':            `${BASE}1608245449230-4ac19066d2d0${OPT}`,
  'allenare-gesto-atleta':       `${BASE}1571019613454-1cb2f99b2d8b${OPT}`,
  'sarcopenia-problema-cerebrale': `${BASE}1559757175-0eb30cd8c063${OPT}`,
  'professionisti-dilettanti-falso-mito': `${BASE}1461896836934-ffe607ba8211${OPT}`,
  'post-activation-potentiation':`${BASE}1534438327276-14e5300c3a48${OPT}`,
  'epigenetica-sport':           `${BASE}1532187863486-abf9dbad1b69${OPT}`,
  'decelerazione-basket':        `${BASE}1546866655-5aa049cde2c2${OPT}`,
  'acsm-linee-guida-forza':      `${BASE}1549060279-7e168fcee0c2${OPT}`,
  'repeated-sprint-ability':     `${BASE}1526676037777-05a232554f77${OPT}`,
  'tagliafuori-basket':          `${BASE}1579952363873-27f3bade9f55${OPT}`,
  'distribuzione-proteica':      `${BASE}1490645935967-10de6ba17061${OPT}`,
  'microbiota-sport-squadra':    `${BASE}1536856136534-bb679c52a9aa${OPT}`,
  'vitamina-d-performance':      `${BASE}1505576399279-565b52d4ac71${OPT}`,
  'warm-up-durata-ottimale':     `${BASE}1571019613454-1cb2f99b2d8b${OPT}`,
  'muscolo-organo-endocrino':    `${BASE}1559757175-0eb30cd8c063${OPT}`,
  'crampi-muscolari-esercizio':  `${BASE}1526676037777-05a232554f77${OPT}`,
  'physical-technical-assessments-basketball': `${BASE}1608245449230-4ac19066d2d0${OPT}`,
  'oltre-vo2max-soglia-neuromeccanica': `${BASE}1532187863486-abf9dbad1b69${OPT}`,
  'injury-patterns-nba':         `${BASE}1579952363873-27f3bade9f55${OPT}`,
  'emergenze-sportive-primo-soccorso': `${BASE}1559757175-0eb30cd8c063${OPT}`,
  'cross-education-effect':      `${BASE}1571019613454-1cb2f99b2d8b${OPT}`,
  'recovery-methods-basketball': `${BASE}1546519638405-a7be394f5e27${OPT}`,
  'basketball-off-season':       `${BASE}1490645935967-10de6ba17061${OPT}`,
  'approccio-integrato-performance-metabolomica': `${BASE}1532187863486-abf9dbad1b69${OPT}`,
}

export const categoryImages = {
  'Basket Lab':           `${BASE}1546519638405-a7be394f5e27${OPT}`,
  'Training':             `${BASE}1534438327276-14e5300c3a48${OPT}`,
  'Alimentazione':        `${BASE}1490645935967-10de6ba17061${OPT}`,
  'Medicina sportiva':    `${BASE}1559757175-0eb30cd8c063${OPT}`,
  "Scienza dell'esercizio": `${BASE}1532187863486-abf9dbad1b69${OPT}`,
}

export function getArticleImage(slug, category) {
  return articleImages[slug] || categoryImages[category] || `${BASE}1571019613454-1cb2f99b2d8b${OPT}`
}
