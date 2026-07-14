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

const TIME_SLOTS = [
  { key:'morning', label:'朝', icon:'🌅', start:5, end:11 },
  { key:'day', label:'昼', icon:'☀️', start:11, end:16 },
  { key:'evening', label:'夕方', icon:'🌇', start:16, end:20 },
  { key:'night', label:'夜', icon:'🌙', start:20, end:29 }
];

const HOUSE_ACTIONS = {
  自分:{ support:['迷っていたことを一つ決める','先延ばしの用事を始める'], caution:['予定を一つ減らす','返事の前に一呼吸おく'], balance:['自分の希望を短く伝える','相手と条件をすり合わせる'], intense:['本音をメモに書き出す','古い目標を見直す'], neutral:['今日やることを三つに絞る'] },
  お金:{ support:['必要な買い物を比較して決める','固定費を一つ見直す'], caution:['衝動買いを明日に延ばす','金額を確認してから支払う'], balance:['自分用と共有用を分ける','貸し借りの条件を確認する'], intense:['使っていない物を手放す','お金の不安を数字にする'], neutral:['財布や口座を整理する'] },
  学び:{ support:['気になる人へ連絡する','調べたことを誰かに共有する'], caution:['送信前に宛先と日時を確認する','情報を一つずつ確かめる'], balance:['話す時間と聞く時間を半分にする','結論より質問を先にする'], intense:['言えなかったことを文章にする','古い思い込みを調べ直す'], neutral:['未返信を一件だけ片づける'] },
  居場所:{ support:['部屋の一角を整える','家族とゆっくり食事をする'], caution:['家事を完璧にしようとしない','疲れたら早めに帰る'], balance:['一人の時間と家族時間を分ける','身近な人へ希望を伝える'], intense:['思い出の品を一つ整理する','安心できる場所を作り直す'], neutral:['机の上を五分だけ片づける'] },
  楽しみ:{ support:['好きなことを予定に入れる','気になる相手へ素直に返す'], caution:['反応を急かさず待つ','遊びの予定を詰め込みすぎない'], balance:['自分の楽しみと相手の希望を両立する','誘う前に相手の都合を聞く'], intense:['眠っていた作品を再開する','本当に好きなものを選び直す'], neutral:['十分だけ好きなことをする'] },
  日課:{ support:['面倒な作業を最初に終える','作業手順を一つ改善する'], caution:['休憩を予定に入れる','無理な残業を引き受けない'], balance:['頼る仕事と自分でやる仕事を分ける','役割分担を言葉にする'], intense:['続かない習慣をやめる','生活リズムを立て直す'], neutral:['明日の準備を一つ済ませる'] },
  対人:{ support:['相談を一人で抱えず共有する','感謝を具体的に伝える'], caution:['返事を急がせない','相手の言葉を最後まで聞く'], balance:['譲れる条件と譲れない条件を分ける','対等な落としどころを探す'], intense:['曖昧な関係に名前をつける','距離感を率直に見直す'], neutral:['大切な人へ短い連絡をする'] },
  共有:{ support:['深い相談を信頼できる人にする','共同作業の条件を確認する'], caution:['秘密や個人情報を慎重に扱う','借り物や共有物を確認する'], balance:['頼る範囲を具体的に決める','負担の偏りを話し合う'], intense:['執着していることを一つ手放す','言いにくい本音を整理する'], neutral:['共有事項をメモにまとめる'] },
  探究:{ support:['専門的な記事を一本読む','遠い場所の情報を調べる'], caution:['結論を出す前に別の資料を見る','予定変更に余白を残す'], balance:['理想と現実の条件を並べる','異なる意見を一つ読む'], intense:['価値観が変わった理由を考える','学び直すテーマを決める'], neutral:['知らない言葉を一つ調べる'] },
  仕事:{ support:['成果を具体的な数字で共有する','重要な提案を形にする'], caution:['期限と担当を再確認する','曖昧な依頼をそのまま受けない'], balance:['自分の役割と相手の期待を合わせる','優先順位を上司や仲間と確認する'], intense:['目標を現実的に組み直す','不要な責任を手放す'], neutral:['今日の最優先を一つ決める'] },
  仲間:{ support:['仲間へアイデアを共有する','未来の予定を一つ決める'], caution:['グループの空気に流されない','約束を増やしすぎない'], balance:['全員の意見を一度並べる','協力できる範囲を明確にする'], intense:['付き合い方を見直す','古い所属から距離を取る'], neutral:['気になる人へ近況を送る'] },
  休息:{ support:['一人で静かに過ごす時間を取る','早めに眠る準備をする'], caution:['判断を疲れたまま下さない','予定を詰めず回復を優先する'], balance:['人と会う時間と休む時間を分ける','助ける前に自分の余力を確認する'], intense:['終わったことを手放す儀式をする','心に残る感情を書き出す'], neutral:['通知を切って十分休む'] }
};

const PLANET_PREFIX = {
  Sun:'自分の意思を基準に', Moon:'気分の波を否定せず', Mercury:'言葉と数字を確認して',
  Venus:'好意を具体的に示して', Mars:'勢いを一つの行動に絞って', Jupiter:'少し広い視点を持って',
  Saturn:'期限と手順を守って', Uranus:'いつもと違う方法を試して', Neptune:'直感と事実を分けて', Pluto:'古いやり方を手放して'
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
    if (delta <= aspect.orb && (!best || delta < best.delta)) best = { ...aspect, delta, exactness: 1 - delta / aspect.orb };
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
    return { planet, meta, house, aspect, tone:aspect?.tone ?? 'neutral', strength };
  }).sort((a,b)=>b.strength-a.strength);
}

function deterministicIndex(seed, length) {
  let hash = 2166136261;
  for (const char of seed) { hash ^= char.charCodeAt(0); hash = Math.imul(hash, 16777619); }
  return Math.abs(hash) % length;
}

function jstHour(date) { return (date.getUTCHours() + 9) % 24; }
function timeSlot(date, seed) {
  const current = jstHour(date);
  const candidates = TIME_SLOTS.filter(x => current <= x.end || x.key === 'night');
  return candidates[deterministicIndex(seed, candidates.length)] ?? TIME_SLOTS[3];
}
function trimJapanese(text, max=46) { return Array.from(text).slice(0,max).join(''); }

export function forecastFor(signIndex, positions, date) {
  const influences = buildInfluences(signIndex, positions, date);
  const primary = influences[0];
  const secondary = influences.find((item, index) => index > 0 && item.house.no !== primary.house.no) ?? influences[1];
  const tone = primary.strength >= .55 ? primary.tone : 'neutral';
  const seed = `${date.toISOString().slice(0,10)}-${signIndex}-${primary.planet.key}-${primary.house.no}-${primary.aspect?.key ?? 'none'}`;
  const actionList = HOUSE_ACTIONS[primary.house.theme][tone] ?? HOUSE_ACTIONS[primary.house.theme].neutral;
  const action = actionList[deterministicIndex(seed+'a', actionList.length)];
  const slot = timeSlot(date, seed+'t');
  const prefix = PLANET_PREFIX[primary.planet.key];
  let text = `${slot.icon}${slot.label}は${action}と流れが整いそう`;
  if (tone === 'caution' || tone === 'balance') text = `${slot.icon}${slot.label}は${prefix}${action}のがよさそう`;
  if (secondary && secondary.strength > primary.strength * .9 && secondary.house.theme !== primary.house.theme) {
    text = `${slot.icon}${slot.label}は${primary.house.theme}を優先。${secondary.house.theme}は急がなくて大丈夫`;
  }
  return { text:trimJapanese(text,46), primary, secondary, influences:influences.slice(0,3), time:slot };
}


const GLOBAL_PAIR_HINTS = {
  support: ['連絡や相談は今日のうちに。動くほど話がまとまりそう','予定を一つ前へ進めると、次の選択肢が見えてきそう','人に頼ることで、止まっていた用事が動き出しそう'],
  caution: ['大きな決断は急がず、期限と条件を先に確認したい時','予定を詰めるより、一つ終わらせてから次へ進みたい時','疲れたまま返事をせず、休んでから判断したい時'],
  balance: ['自分の希望だけでなく、相手の条件も言葉にして合わせたい時','譲れる点と譲れない点を分けると、話が進みやすい時','返事を急がせず、互いの予定を確認して決めたい時'],
  intense: ['続けるか迷っていることを、率直に見直すのに向く時','曖昧なままの用事を一つ決めると、気持ちが軽くなりそう','古いやり方を一つやめると、新しい流れが入りやすい時']
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

  return { text:trimJapanese(text, 52), tone, aspects:top };
}


export function pairAspectAt(a, b) { return pairAspect(a, b); }

export function gentleInterpretation(item) {
  const themes = [PLANET_META[item.a.key]?.theme ?? item.a.label, PLANET_META[item.b.key]?.theme ?? item.b.label];
  const base = {
    conjunction:`${themes[0]}と${themes[1]}が重なり、大切な気づきが生まれそう`,
    sextile:`${themes[0]}と${themes[1]}が支え合い、小さな好機が見つかりそう`,
    square:`${themes[0]}と${themes[1]}を整えるほど、次の一歩が見えそう`,
    trine:`${themes[0]}と${themes[1]}が調和し、自然な追い風を感じられそう`,
    opposition:`${themes[0]}と${themes[1]}の間に、心地よいバランスを探せそう`
  };
  return trimJapanese(base[item.aspect.key] ?? '静かな変化の気配に耳を澄ませたい時', 38);
}
