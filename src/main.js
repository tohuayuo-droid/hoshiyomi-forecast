import * as Astronomy from 'astronomy-engine';
import './style.css';

const SIGNS = [
  ['牡羊座','♈'],['牡牛座','♉'],['双子座','♊'],['蟹座','♋'],
  ['獅子座','♌'],['乙女座','♍'],['天秤座','♎'],['蠍座','♏'],
  ['射手座','♐'],['山羊座','♑'],['水瓶座','♒'],['魚座','♓']
];

const PLANETS = [
  { key:'Sun', label:'太陽', symbol:'☉', body:Astronomy.Body.Sun, weight:2.2, theme:'自信' },
  { key:'Moon', label:'月', symbol:'☽', body:Astronomy.Body.Moon, weight:1.5, theme:'感情' },
  { key:'Mercury', label:'水星', symbol:'☿', body:Astronomy.Body.Mercury, weight:1.5, theme:'言葉' },
  { key:'Venus', label:'金星', symbol:'♀', body:Astronomy.Body.Venus, weight:1.7, theme:'関係' },
  { key:'Mars', label:'火星', symbol:'♂', body:Astronomy.Body.Mars, weight:1.8, theme:'行動' },
  { key:'Jupiter', label:'木星', symbol:'♃', body:Astronomy.Body.Jupiter, weight:2.4, theme:'拡大' },
  { key:'Saturn', label:'土星', symbol:'♄', body:Astronomy.Body.Saturn, weight:2.2, theme:'責任' },
  { key:'Uranus', label:'天王星', symbol:'♅', body:Astronomy.Body.Uranus, weight:1.2, theme:'変化' },
  { key:'Neptune', label:'海王星', symbol:'♆', body:Astronomy.Body.Neptune, weight:1.1, theme:'直感' },
  { key:'Pluto', label:'冥王星', symbol:'♇', body:Astronomy.Body.Pluto, weight:1.3, theme:'再生' }
];

const ASPECTS = [
  { angle:0, orb:8, score:0.8, name:'合' },
  { angle:60, orb:5, score:0.7, name:'六分' },
  { angle:90, orb:6, score:-0.8, name:'矩' },
  { angle:120, orb:6, score:1.0, name:'三分' },
  { angle:180, orb:7, score:-0.6, name:'衝' }
];

const PHRASES = {
  positive: {
    自信:['自分らしさを前に出して','主役になる意識が追い風'],
    感情:['気持ちに素直になると吉','心地よさを優先して'],
    言葉:['ひと言の発信が流れを変える','伝えるほど道が開けそう'],
    関係:['素直な好意が縁を深める','人との調和を大切に'],
    行動:['迷う前に小さく動いて','勢いを味方につけて'],
    拡大:['好機には少し大胆に乗って','視野を広げるほど好転'],
    責任:['地道な積み重ねが実を結ぶ','丁寧な継続が力になる'],
    変化:['予定外の展開を楽しんで','新しい方法を試す好機'],
    直感:['ひらめきを形にしてみて','静かな直感を信じて'],
    再生:['手放すことで次が始まる','仕切り直しが力になる']
  },
  negative: {
    自信:['強引さより余白を意識して','自己主張は少し控えめに'],
    感情:['気分だけで決めず一呼吸','感情の波を急いで結論にしない'],
    言葉:['送信前の確認を忘れずに','言葉の行き違いに注意'],
    関係:['相手のペースも尊重して','期待を押しつけないで'],
    行動:['焦らず順番を整えて','勢い任せの決断は避けて'],
    拡大:['広げすぎず優先順位を絞って','楽観より現実確認を'],
    責任:['完璧を求めすぎないで','抱え込みすぎに注意'],
    変化:['急な変更にも余白を残して','予定変更は柔軟に受け止めて'],
    直感:['曖昧な話は事実確認を','思い込みより確かめる姿勢を'],
    再生:['執着せず流れを見直して','無理な立て直しは急がないで']
  },
  neutral:['今日は足元を丁寧に整えて','小さな選択を大切に','自分のペースを守って']
};

const app = document.querySelector('#app');
app.innerHTML = `
  <header class="hero">
    <div><p class="eyebrow">LIVE HOROSCOPE</p><h1>星よみ予報</h1><p>今この瞬間の天体配置から、12星座へ一言。</p></div>
    <div class="clock" id="clock"></div>
  </header>
  <main>
    <section class="sky-panel">
      <div class="wheel-wrap"><div id="wheel" class="wheel"></div></div>
      <div class="planet-list" id="planetList"></div>
    </section>
    <section>
      <div class="section-head"><h2>12星座の運気ポイント</h2><span>10分ごとに再計算</span></div>
      <div class="forecast-grid" id="forecastGrid"></div>
    </section>
    <p class="notice">※占星術的な解釈による娯楽コンテンツです。重要な判断の根拠には使用しないでください。</p>
  </main>
`;

function normalize(angle) { return ((angle % 360) + 360) % 360; }
function angularDistance(a,b) { const d=Math.abs(normalize(a-b)); return Math.min(d,360-d); }
function signOf(lon) { return Math.floor(normalize(lon)/30); }
function degreeInSign(lon) { return normalize(lon)%30; }

function planetPositions(date) {
  return PLANETS.map(p => {
    const vector = Astronomy.GeoVector(p.body, date, true);
    const ecliptic = Astronomy.Ecliptic(vector);
    return { ...p, longitude: normalize(ecliptic.elon) };
  });
}

function strongestInfluence(signIndex, positions) {
  const anchor = signIndex * 30 + 15;
  const influences = [];
  for (const planet of positions) {
    const distance = angularDistance(planet.longitude, anchor);
    for (const aspect of ASPECTS) {
      const delta = Math.abs(distance - aspect.angle);
      if (delta <= aspect.orb) {
        const exactness = 1 - delta / aspect.orb;
        influences.push({ planet, aspect, value: aspect.score * planet.weight * (0.45 + exactness * 0.55) });
      }
    }
  }
  return influences.sort((a,b)=>Math.abs(b.value)-Math.abs(a.value))[0] ?? null;
}

function forecastFor(signIndex, positions, date) {
  const hit = strongestInfluence(signIndex, positions);
  if (!hit || Math.abs(hit.value) < 0.45) {
    return PHRASES.neutral[(signIndex + date.getUTCHours()) % PHRASES.neutral.length];
  }
  const polarity = hit.value >= 0 ? 'positive' : 'negative';
  const list = PHRASES[polarity][hit.planet.theme];
  const phrase = list[(signIndex + date.getUTCDate()) % list.length];
  return phrase.slice(0, 30);
}

function renderWheel(positions) {
  const wheel = document.querySelector('#wheel');
  wheel.innerHTML = '<div class="wheel-center"><span>NOW</span><b>天空図</b></div>';
  SIGNS.forEach(([name,symbol],i) => {
    const angle = i*30 + 15;
    const el = document.createElement('div');
    el.className='sign-marker';
    el.style.setProperty('--angle', `${angle}deg`);
    el.innerHTML=`<span title="${name}">${symbol}</span>`;
    wheel.appendChild(el);
  });
  positions.forEach((p,i) => {
    const el=document.createElement('div');
    el.className='planet-marker';
    el.style.setProperty('--angle', `${p.longitude}deg`);
    el.style.setProperty('--ring', `${116 - (i%3)*17}px`);
    el.innerHTML=`<span title="${p.label}">${p.symbol}</span>`;
    wheel.appendChild(el);
  });
}

function render(date) {
  const positions = planetPositions(date);
  renderWheel(positions);
  document.querySelector('#planetList').innerHTML = positions.map(p => {
    const si=signOf(p.longitude);
    return `<div><span class="planet-symbol">${p.symbol}</span><b>${p.label}</b><small>${SIGNS[si][0]} ${degreeInSign(p.longitude).toFixed(1)}°</small></div>`;
  }).join('');
  document.querySelector('#forecastGrid').innerHTML = SIGNS.map(([name,symbol],i) => `
    <article class="forecast-card">
      <div class="sign-icon">${symbol}</div>
      <div><h3>${name}</h3><p>${forecastFor(i,positions,date)}</p></div>
    </article>`).join('');
}

function updateClock() {
  const now=new Date();
  document.querySelector('#clock').innerHTML=`<b>${new Intl.DateTimeFormat('ja-JP',{dateStyle:'long',timeZone:'Asia/Tokyo'}).format(now)}</b><span>${new Intl.DateTimeFormat('ja-JP',{timeStyle:'medium',hour12:false,timeZone:'Asia/Tokyo'}).format(now)} JST</span>`;
}

function refresh() { const now=new Date(); render(now); updateClock(); }
refresh();
setInterval(updateClock,1000);
setInterval(refresh,10*60*1000);
