export const SIGNS = [
  ['牡羊座','♈'],['牡牛座','♉'],['双子座','♊'],['蟹座','♋'],
  ['獅子座','♌'],['乙女座','♍'],['天秤座','♎'],['蠍座','♏'],
  ['射手座','♐'],['山羊座','♑'],['水瓶座','♒'],['魚座','♓']
];

export const HOUSES = [
  { no:1, theme:'自分', keywords:['始動','自己表現','決断'] },
  { no:2, theme:'お金', keywords:['収入','持ち物','価値観'] },
  { no:3, theme:'学び', keywords:['連絡','学習','移動'] },
  { no:4, theme:'居場所', keywords:['家庭','安心','基盤'] },
  { no:5, theme:'楽しみ', keywords:['恋愛','創作','遊び'] },
  { no:6, theme:'日課', keywords:['仕事習慣','健康','整備'] },
  { no:7, theme:'対人', keywords:['関係','協力','契約'] },
  { no:8, theme:'共有', keywords:['深い縁','継承','変容'] },
  { no:9, theme:'探究', keywords:['専門知識','遠方','視野'] },
  { no:10, theme:'仕事', keywords:['評価','責任','目標'] },
  { no:11, theme:'仲間', keywords:['友人','未来','共同体'] },
  { no:12, theme:'休息', keywords:['内省','浄化','手放し'] }
];

export const ASPECTS = [
  { key:'conjunction', angle:0, orb:8, tone:'intense', weight:1.00, label:'合', name:'コンジャンクション', symbol:'☌' },
  { key:'sextile', angle:60, orb:5, tone:'support', weight:0.72, label:'六分', name:'セクスタイル', symbol:'⚹' },
  { key:'square', angle:90, orb:6, tone:'caution', weight:0.88, label:'矩', name:'スクエア', symbol:'□' },
  { key:'trine', angle:120, orb:6, tone:'support', weight:1.00, label:'三分', name:'トライン', symbol:'△' },
  { key:'opposition', angle:180, orb:7, tone:'balance', weight:0.82, label:'衝', name:'オポジション', symbol:'☍' }
];

export const PLANET_META = {
  Sun:     { theme:'主体性', pace:'medium', baseWeight:1.30 },
  Moon:    { theme:'感情', pace:'short', baseWeight:1.25 },
  Mercury: { theme:'言葉', pace:'short', baseWeight:1.10 },
  Venus:   { theme:'関係', pace:'short', baseWeight:1.12 },
  Mars:    { theme:'行動', pace:'short', baseWeight:1.18 },
  Jupiter: { theme:'成長', pace:'long', baseWeight:1.34 },
  Saturn:  { theme:'責任', pace:'long', baseWeight:1.36 },
  Uranus:  { theme:'刷新', pace:'long', baseWeight:1.16 },
  Neptune: { theme:'直感', pace:'long', baseWeight:1.08 },
  Pluto:   { theme:'再生', pace:'long', baseWeight:1.18 }
};

const OPENERS = {
  support:['追い風が入り','流れが整い','自然な助けが入り'],
  caution:['急がず整えると','丁寧に向き合うと','一呼吸おくと'],
  balance:['相手との調整で','両方の視点を持つと','偏りを戻すと'],
  intense:['意識が強まり','テーマが前に出て','変化が濃くなり'],
  neutral:['小さく整えると','足元を見直すと','静かに進めると']
};

const ENDINGS = {
  自分:['一歩が決まりそう','自分らしく動けそう','決断に芯が通りそう'],
  お金:['使い方が整いそう','価値ある選択ができそう','収支の勘が働きそう'],
  学び:['言葉が届きやすそう','学びが形になりそう','連絡が流れを変えそう'],
  居場所:['安心できる場が整いそう','身近な関係が和らぎそう','心の土台が戻りそう'],
  楽しみ:['創作や恋に光が差しそう','好きなことが力になりそう','遊び心が運を呼びそう'],
  日課:['仕事の段取りが整いそう','習慣を立て直せそう','体調管理が実を結びそう'],
  対人:['関係が一歩深まりそう','対話から道が開けそう','良い協力が生まれそう'],
  共有:['深い話が前進につながりそう','手放しが転機になりそう','信頼を育てられそう'],
  探究:['視野が大きく広がりそう','遠くの情報が役立ちそう','学び直しが効きそう'],
  仕事:['評価につながる動きができそう','目標が具体化しそう','責任ある一歩が実りそう'],
  仲間:['仲間との縁が広がりそう','未来の話が動き出しそう','協力者が見つかりそう'],
  休息:['休むほど感覚が戻りそう','内省から答えが見えそう','手放すほど軽くなれそう']
};

const PLANET_HINTS = {
  Sun:'自分の意思を大切に', Moon:'気分の波を丁寧に', Mercury:'確認と言葉選びを意識し',
  Venus:'好意を素直に示し', Mars:'勢いを順序に変え', Jupiter:'少し大きな視点を持ち',
  Saturn:'地道さを優先し', Uranus:'新しい方法を試し', Neptune:'直感と事実を分け', Pluto:'古いやり方を手放し'
};

export function normalize(angle) { return ((angle % 360) + 360) % 360; }
export function angularDistance(a,b) { const d=Math.abs(normalize(a-b)); return Math.min(d,360-d); }
export function signOf(longitude) { return Math.floor(normalize(longitude)/30); }
export function degreeInSign(longitude) { return normalize(longitude)%30; }

export function solarHouseFor(baseSignIndex, planetLongitude) {
  const planetSignIndex = signOf(planetLongitude);
  return ((planetSignIndex - baseSignIndex + 12) % 12) + 1;
}

function findAspect(anchorLongitude, planetLongitude) {
  const distance = angularDistance(anchorLongitude, planetLongitude);
  let best = null;
  for (const aspect of ASPECTS) {
    const delta = Math.abs(distance - aspect.angle);
    if (delta <= aspect.orb && (!best || delta < best.delta)) {
      best = { ...aspect, delta, exactness: 1 - delta / aspect.orb };
    }
  }
  return best;
}

function paceMultiplier(pace, date) {
  const hour = date.getUTCHours();
  if (pace === 'short') return 1.12 + ((hour % 3) * .03);
  if (pace === 'long') return .98;
  return 1.04;
}

export function buildInfluences(signIndex, positions, date) {
  const anchorLongitude = signIndex * 30 + 15;
  return positions.map((planet) => {
    const meta = PLANET_META[planet.key];
    const house = HOUSES[solarHouseFor(signIndex, planet.longitude) - 1];
    const aspect = findAspect(anchorLongitude, planet.longitude);
    const aspectStrength = aspect ? aspect.weight * (.45 + aspect.exactness * .55) : .24;
    const houseEmphasis = [1,4,7,10].includes(house.no) ? 1.10 : [2,5,8,11].includes(house.no) ? 1.04 : 1;
    const strength = meta.baseWeight * paceMultiplier(meta.pace, date) * aspectStrength * houseEmphasis;
    const tone = aspect?.tone ?? 'neutral';
    return { planet, meta, house, aspect, tone, strength };
  }).sort((a,b)=>b.strength-a.strength);
}

function deterministicIndex(seed, length) {
  let hash = 2166136261;
  for (const char of seed) { hash ^= char.charCodeAt(0); hash = Math.imul(hash, 16777619); }
  return Math.abs(hash) % length;
}

function trimJapanese(text, max=30) { return Array.from(text).slice(0,max).join(''); }

export function forecastFor(signIndex, positions, date) {
  const influences = buildInfluences(signIndex, positions, date);
  const primary = influences[0];
  const secondary = influences.find((item, index) => index > 0 && item.house.no !== primary.house.no) ?? influences[1];
  const dominantTone = primary.strength >= .55 ? primary.tone : 'neutral';
  const seed = `${date.toISOString().slice(0,13)}-${signIndex}-${primary.planet.key}-${primary.house.no}-${primary.aspect?.key ?? 'none'}`;
  const openerList = OPENERS[dominantTone];
  const endingList = ENDINGS[primary.house.theme];
  const opener = openerList[deterministicIndex(seed+'o', openerList.length)];
  const ending = endingList[deterministicIndex(seed+'e', endingList.length)];

  let text = `${opener}${ending}`;
  if (dominantTone === 'caution' || dominantTone === 'balance') {
    const hint = PLANET_HINTS[primary.planet.key];
    text = `${hint}${ending}`;
  } else if (secondary && secondary.strength > primary.strength * .82) {
    const compact = `${primary.house.theme}と${secondary.house.theme}に追い風`;
    if (Array.from(compact).length <= 30) text = compact;
  }

  return {
    text: trimJapanese(text, 30),
    primary,
    secondary,
    influences: influences.slice(0,3)
  };
}


const GLOBAL_PAIR_HINTS = {
  support: ['流れを広げやすい時','自然な追い風が入りやすい時','協力と前進が噛み合いやすい時'],
  caution: ['急がず調整を優先したい時','勢いより確認を大切にしたい時','無理に進めず整えたい時'],
  balance: ['対立より折り合いを探したい時','両方の立場を見直したい時','偏りを戻すことが鍵になる時'],
  intense: ['大きなテーマが表面化しやすい時','意識の切り替えが起こりやすい時','変化の圧が強まりやすい時']
};

function pairAspect(a, b) {
  const distance = angularDistance(a.longitude, b.longitude);
  let best = null;
  for (const aspect of ASPECTS) {
    const delta = Math.abs(distance - aspect.angle);
    if (delta <= aspect.orb && (!best || delta < best.delta)) {
      best = { ...aspect, delta, exactness: 1 - delta / aspect.orb };
    }
  }
  return best;
}

export function buildGlobalAspects(positions) {
  const items = [];
  for (let i = 0; i < positions.length; i++) {
    for (let j = i + 1; j < positions.length; j++) {
      const a = positions[i];
      const b = positions[j];
      const aspect = pairAspect(a, b);
      if (!aspect) continue;
      const aw = PLANET_META[a.key]?.baseWeight ?? 1;
      const bw = PLANET_META[b.key]?.baseWeight ?? 1;
      const luminaryBoost = ['Sun','Moon'].includes(a.key) || ['Sun','Moon'].includes(b.key) ? 1.10 : 1;
      const strength = ((aw + bw) / 2) * aspect.weight * (.45 + aspect.exactness * .55) * luminaryBoost;
      items.push({ a, b, aspect, strength });
    }
  }
  return items.sort((x,y)=>y.strength-x.strength);
}

export function globalForecast(positions, date) {
  const aspects = buildGlobalAspects(positions);
  const top = aspects.slice(0, 3);
  if (!top.length) {
    return { text:'静かに足元を整える流れ', tone:'neutral', aspects:[] };
  }

  const scores = { support:0, caution:0, balance:0, intense:0 };
  top.forEach(item => { scores[item.aspect.tone] += item.strength; });
  const tone = Object.entries(scores).sort((a,b)=>b[1]-a[1])[0][0];
  const lead = top[0];
  const seed = `${date.toISOString().slice(0,13)}-${lead.a.key}-${lead.b.key}-${lead.aspect.key}`;
  const list = GLOBAL_PAIR_HINTS[tone] ?? GLOBAL_PAIR_HINTS.intense;
  let text = list[deterministicIndex(seed, list.length)];

  if (top.length >= 2 && top[1].strength > lead.strength * .88) {
    const themeA = PLANET_META[lead.a.key]?.theme ?? lead.a.label;
    const themeB = PLANET_META[top[1].a.key]?.theme ?? top[1].a.label;
    const compact = `${themeA}と${themeB}の調整が流れを変える時`;
    if (Array.from(compact).length <= 30) text = compact;
  }

  return { text:trimJapanese(text, 30), tone, aspects:top };
}
