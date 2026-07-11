import * as Astronomy from 'astronomy-engine';
import './style.css';
import { SIGNS, normalize, signOf, degreeInSign, forecastFor, globalForecast } from './astrology.js';

const PLANETS = [
  { key:'Sun', label:'太陽', symbol:'☉', body:Astronomy.Body.Sun, keywords:['意思','目的','自己表現'] },
  { key:'Moon', label:'月', symbol:'☽', body:Astronomy.Body.Moon, keywords:['感情','習慣','安心'] },
  { key:'Mercury', label:'水星', symbol:'☿', body:Astronomy.Body.Mercury, keywords:['思考','連絡','学習'] },
  { key:'Venus', label:'金星', symbol:'♀', body:Astronomy.Body.Venus, keywords:['愛情','調和','美意識'] },
  { key:'Mars', label:'火星', symbol:'♂', body:Astronomy.Body.Mars, keywords:['行動','競争','決断'] },
  { key:'Jupiter', label:'木星', symbol:'♃', body:Astronomy.Body.Jupiter, keywords:['拡大','成長','幸運'] },
  { key:'Saturn', label:'土星', symbol:'♄', body:Astronomy.Body.Saturn, keywords:['責任','制限','成熟'] },
  { key:'Uranus', label:'天王星', symbol:'♅', body:Astronomy.Body.Uranus, keywords:['刷新','独立','変化'] },
  { key:'Neptune', label:'海王星', symbol:'♆', body:Astronomy.Body.Neptune, keywords:['直感','夢','境界'] },
  { key:'Pluto', label:'冥王星', symbol:'♇', body:Astronomy.Body.Pluto, keywords:['再生','変容','根本改革'] }
];

const app = document.querySelector('#app');
app.innerHTML = `
  <header class="hero">
    <div><p class="eyebrow">LIVE HOROSCOPE</p><h1>星よみ予報</h1><p>今この瞬間の天体配置から、空全体と12星座の流れを読む。</p></div>
    <div class="clock" id="clock"></div>
  </header>
  <main>
    <section class="global-section">
      <div class="section-head"><div><p class="section-kicker">NOW SKY</p><h2>現在の星の流れ</h2></div><span>10分ごとに再計算</span></div>
      <div class="sky-status" id="skyStatus"></div>
      <article class="global-card" id="globalCard"></article>
    </section>
    <section class="forecast-section">
      <div class="section-head"><div><p class="section-kicker">ZODIAC FORECAST</p><h2>12星座の運気ポイント</h2></div><span>星座別の流れ</span></div>
      <div class="forecast-grid" id="forecastGrid"></div>
    </section>
    <section class="horoscope-section">
      <div class="section-head"><div><p class="section-kicker">LIVE CELESTIAL MAP</p><h2>現在のホロスコープ</h2></div><span>惑星をクリックして詳細表示</span></div>
      <div class="sky-panel">
        <div class="wheel-wrap"><div id="wheel" class="wheel"></div></div>
        <div class="planet-list" id="planetList"></div>
      </div>
    </section>
    <p class="notice">※ソーラーハウス方式による娯楽コンテンツです。重要な判断の根拠には使用しないでください。</p>
  </main>
  <dialog class="planet-dialog" id="planetDialog"><button class="dialog-close" aria-label="閉じる">×</button><div id="dialogBody"></div></dialog>
`;

function planetPositions(date) {
  return PLANETS.map(p => {
    const vector = Astronomy.GeoVector(p.body, date, true);
    const ecliptic = Astronomy.Ecliptic(vector);
    return { ...p, longitude: normalize(ecliptic.elon) };
  });
}

function isRetrograde(planet, date) {
  if (planet.key === 'Sun' || planet.key === 'Moon') return false;
  const before = new Date(date.getTime() - 6 * 60 * 60 * 1000);
  const after = new Date(date.getTime() + 6 * 60 * 60 * 1000);
  const lonBefore = normalize(Astronomy.Ecliptic(Astronomy.GeoVector(planet.body, before, true)).elon);
  const lonAfter = normalize(Astronomy.Ecliptic(Astronomy.GeoVector(planet.body, after, true)).elon);
  let delta = lonAfter - lonBefore;
  if (delta > 180) delta -= 360;
  if (delta < -180) delta += 360;
  return delta < 0;
}

function moonPhaseLabel(date) {
  const phase = Astronomy.MoonPhase(date);
  if (phase < 22.5 || phase >= 337.5) return ['新月','New Moon'];
  if (phase < 67.5) return ['満ちていく三日月','Waxing Crescent'];
  if (phase < 112.5) return ['上弦の月','First Quarter'];
  if (phase < 157.5) return ['満ちていく月','Waxing Gibbous'];
  if (phase < 202.5) return ['満月','Full Moon'];
  if (phase < 247.5) return ['欠けていく月','Waning Gibbous'];
  if (phase < 292.5) return ['下弦の月','Last Quarter'];
  return ['明け方の三日月','Waning Crescent'];
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
    const el=document.createElement('button');
    el.className='planet-marker';
    el.style.setProperty('--angle', `${p.longitude}deg`);
    el.style.setProperty('--ring', `${116 - (i%3)*17}px`);
    el.dataset.planet = p.key;
    el.innerHTML=`<span title="${p.label}">${p.symbol}</span>`;
    wheel.appendChild(el);
  });
}

function aspectDescription(item) {
  const tones = {
    conjunction:'二つのテーマが重なり、強く表れやすい配置',
    sextile:'意識して使うことで機会を活かしやすい配置',
    square:'摩擦を調整することで成長につながる配置',
    trine:'自然な追い風として働きやすい配置',
    opposition:'両極のバランスを求められやすい配置'
  };
  return tones[item.aspect.key];
}

function openPlanetDialog(planet, date) {
  const si = signOf(planet.longitude);
  const retro = isRetrograde(planet, date);
  document.querySelector('#dialogBody').innerHTML = `
    <p class="dialog-kicker">CELESTIAL DETAIL</p>
    <div class="dialog-title"><span>${planet.symbol}</span><div><h3>${planet.label}</h3><p>${SIGNS[si][0]} ${degreeInSign(planet.longitude).toFixed(1)}°</p></div></div>
    <div class="dialog-grid">
      <div><small>運行</small><b>${retro ? '逆行（Retrograde）' : '順行（Direct）'}</b></div>
      <div><small>現在テーマ</small><b>${planet.keywords.join('・')}</b></div>
    </div>`;
  document.querySelector('#planetDialog').showModal();
}

function render(date) {
  const positions = planetPositions(date);
  const global = globalForecast(positions, date);
  const moon = positions.find(p => p.key === 'Moon');
  const mercury = positions.find(p => p.key === 'Mercury');
  const [phaseJa, phaseEn] = moonPhaseLabel(date);
  const moonSign = SIGNS[signOf(moon.longitude)][0];
  const mercuryRetro = isRetrograde(mercury, date);

  document.querySelector('#skyStatus').innerHTML = `
    <div><span>☽</span><small>MOON IN</small><b>${moonSign}</b></div>
    <div><span>◐</span><small>LUNAR PHASE</small><b>${phaseJa}<em>${phaseEn}</em></b></div>
    <div><span>☿</span><small>MERCURY</small><b>${mercuryRetro ? '逆行' : '順行'}<em>${mercuryRetro ? 'Retrograde' : 'Direct'}</em></b></div>`;

  document.querySelector('#globalCard').innerHTML = `
    <div class="global-lead">
      <div class="global-symbol">✦</div>
      <div class="global-copy"><p class="global-label">現在もっとも影響の強い配置</p><h3>${global.text}</h3></div>
    </div>
    <div class="global-aspects">${global.aspects.map((item,index) => `
      <article class="aspect-item ${index===0?'is-primary':''}">
        <div class="aspect-symbols"><b>${item.a.symbol}</b><span>${item.aspect.symbol}</span><b>${item.b.symbol}</b></div>
        <div><h4>${item.a.label} × ${item.b.label}</h4><p>${item.aspect.name}（${item.aspect.angle}°）</p><small>${aspectDescription(item)}</small></div>
      </article>`).join('')}</div>`;

  renderWheel(positions);
  document.querySelector('#planetList').innerHTML = positions.map(p => {
    const si=signOf(p.longitude);
    const retro = isRetrograde(p, date);
    return `<button class="planet-row" data-planet="${p.key}"><span class="planet-symbol">${p.symbol}</span><span><b>${p.label}${retro ? '<i>R</i>' : ''}</b><small>${SIGNS[si][0]} ${degreeInSign(p.longitude).toFixed(1)}°</small></span></button>`;
  }).join('');

  document.querySelector('#forecastGrid').innerHTML = SIGNS.map(([name,symbol],i) => {
    const forecast = forecastFor(i,positions,date);
    const p = forecast.primary;
    const detail = `${p.planet.label}・第${p.house.no}ハウス${p.aspect ? `・${p.aspect.name}` : ''}`;
    return `<article class="forecast-card" title="${detail}">
      <div class="sign-icon">${symbol}</div>
      <div><h3>${name}</h3><p>${forecast.text}</p><small class="forecast-meta">${detail}</small></div>
    </article>`;
  }).join('');

  document.querySelectorAll('[data-planet]').forEach(el => {
    el.addEventListener('click', () => openPlanetDialog(positions.find(p => p.key === el.dataset.planet), date));
  });
}

function updateClock() {
  const now=new Date();
  document.querySelector('#clock').innerHTML=`<b>${new Intl.DateTimeFormat('ja-JP',{dateStyle:'long',timeZone:'Asia/Tokyo'}).format(now)}</b><span>${new Intl.DateTimeFormat('ja-JP',{timeStyle:'medium',hour12:false,timeZone:'Asia/Tokyo'}).format(now)} JST</span>`;
}

document.querySelector('.dialog-close').addEventListener('click',()=>document.querySelector('#planetDialog').close());
function refresh() { const now=new Date(); render(now); updateClock(); }
refresh();
setInterval(updateClock,1000);
setInterval(refresh,10*60*1000);
