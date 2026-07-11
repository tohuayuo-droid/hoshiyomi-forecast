import * as Astronomy from 'astronomy-engine';
import './style.css';
import { SIGNS, normalize, signOf, degreeInSign, forecastFor } from './astrology.js';

const PLANETS = [
  { key:'Sun', label:'太陽', symbol:'☉', body:Astronomy.Body.Sun },
  { key:'Moon', label:'月', symbol:'☽', body:Astronomy.Body.Moon },
  { key:'Mercury', label:'水星', symbol:'☿', body:Astronomy.Body.Mercury },
  { key:'Venus', label:'金星', symbol:'♀', body:Astronomy.Body.Venus },
  { key:'Mars', label:'火星', symbol:'♂', body:Astronomy.Body.Mars },
  { key:'Jupiter', label:'木星', symbol:'♃', body:Astronomy.Body.Jupiter },
  { key:'Saturn', label:'土星', symbol:'♄', body:Astronomy.Body.Saturn },
  { key:'Uranus', label:'天王星', symbol:'♅', body:Astronomy.Body.Uranus },
  { key:'Neptune', label:'海王星', symbol:'♆', body:Astronomy.Body.Neptune },
  { key:'Pluto', label:'冥王星', symbol:'♇', body:Astronomy.Body.Pluto }
];

const app = document.querySelector('#app');
app.innerHTML = `
  <header class="hero">
    <div><p class="eyebrow">LIVE HOROSCOPE</p><h1>星よみ予報</h1><p>今この瞬間の天体配置から、12星座へ一言。</p></div>
    <div class="clock" id="clock"></div>
  </header>
  <main>
    <section class="forecast-section">
      <div class="section-head"><div><p class="section-kicker">ZODIAC FORECAST</p><h2>12星座の運気ポイント</h2></div><span>10分ごとに再計算</span></div>
      <div class="forecast-grid" id="forecastGrid"></div>
    </section>
    <section class="horoscope-section">
      <div class="section-head"><div><p class="section-kicker">LIVE CELESTIAL MAP</p><h2>現在のホロスコープ</h2></div><span>実際の天体位置を表示</span></div>
      <div class="sky-panel">
        <div class="wheel-wrap"><div id="wheel" class="wheel"></div></div>
        <div class="planet-list" id="planetList"></div>
      </div>
    </section>
    <p class="notice">※ソーラーハウス方式による娯楽コンテンツです。重要な判断の根拠には使用しないでください。</p>
  </main>
`;

function planetPositions(date) {
  return PLANETS.map(p => {
    const vector = Astronomy.GeoVector(p.body, date, true);
    const ecliptic = Astronomy.Ecliptic(vector);
    return { ...p, longitude: normalize(ecliptic.elon) };
  });
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

  document.querySelector('#forecastGrid').innerHTML = SIGNS.map(([name,symbol],i) => {
    const forecast = forecastFor(i,positions,date);
    const p = forecast.primary;
    const detail = `${p.planet.label}・第${p.house.no}ハウス${p.aspect ? `・${p.aspect.label}` : ''}`;
    return `<article class="forecast-card" title="${detail}">
      <div class="sign-icon">${symbol}</div>
      <div><h3>${name}</h3><p>${forecast.text}</p><small class="forecast-meta">${detail}</small></div>
    </article>`;
  }).join('');
}

function updateClock() {
  const now=new Date();
  document.querySelector('#clock').innerHTML=`<b>${new Intl.DateTimeFormat('ja-JP',{dateStyle:'long',timeZone:'Asia/Tokyo'}).format(now)}</b><span>${new Intl.DateTimeFormat('ja-JP',{timeStyle:'medium',hour12:false,timeZone:'Asia/Tokyo'}).format(now)} JST</span>`;
}

function refresh() { const now=new Date(); render(now); updateClock(); }
refresh();
setInterval(updateClock,1000);
setInterval(refresh,10*60*1000);
