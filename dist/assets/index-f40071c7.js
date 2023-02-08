(function () { const t = document.createElement('link').relList; if (t && t.supports && t.supports('modulepreload')) return; for (const r of document.querySelectorAll('link[rel="modulepreload"]'))a(r); new MutationObserver(r => { for (const n of r) if (n.type === 'childList') for (const o of n.addedNodes)o.tagName === 'LINK' && o.rel === 'modulepreload' && a(o) }).observe(document, { childList: !0, subtree: !0 }); function s (r) { const n = {}; return r.integrity && (n.integrity = r.integrity), r.referrerpolicy && (n.referrerPolicy = r.referrerpolicy), r.crossorigin === 'use-credentials' ? n.credentials = 'include' : r.crossorigin === 'anonymous' ? n.credentials = 'omit' : n.credentials = 'same-origin', n } function a (r) { if (r.ep) return; r.ep = !0; const n = s(r); fetch(r.href, n) } })(); const M = 'bucaramanga'; const E = 'zWtp6tnljgVxiimFXp7kB0TVV3VnbulN'; const N = 'https://api.tomorrow.io/v4/weather/forecast'; async function D (e = M) { return fetch(`${N}?location=${e}&apikey=${E}`).then(t => t.json()).then(t => t) } const h = (e, t) => { e.innerHTML = t }; const d = e => document.getElementById(e); const y = d('body'); const L = y.className; const g = e => { const t = { start: 18, end: 6 }; const s = { start: 6, end: 14 }; return e >= t.start || e < t.end ? 'night' : e >= s.start && e < s.end ? 'morning' : 'afternoon' }; function W (e, t, s, a, r, n, o, c) {
  const i = g(t); return x(t), `
  <div class="weather-card">
      <div class="weather-values">
        <p><span class="material-symbols-outlined">air</span> ${c}</p>
        <p><span class="material-symbols-outlined">humidity_low</span> ${o}</p>
      </div>
      <p class="weather-time">${t} : ${s}</p>
      <p class="absolute-text">${r}° - ${n}°</p>
      <h2 class="weather-temperature">${e}°</h2>
      <p class="weather-location">${a}</p>
      <img class="weather-svg" src="./img/${i}.svg">
    </div>
  `
} function I (e, t, s, a = 'summer') {
  return `
    <div class="weathers-futures">
     <img src="./img/${a}.svg" class="futures-svg">
      <p class="futures-day">${s}</p>
      <p class="futures-date">${t}</p>
      <p class="futures-temperature">${e}°</p>
    </div>
  `
} function x (e) { const t = g(e); y.setAttribute('class', `${L} ${t}-background`) } const O = d('weatherMain'); const B = d('weathersFutures'); const P = d('searchForm'); const _ = d('search'); const j = ({ timelines: e, location: t }, s) => { const a = e.minutely[0].time; const r = e.daily; const { temperatureApparentMin: n, temperatureApparentMax: o } = r[0].values; const { temperature: c, humidity: i, windGust: u } = e.minutely[0].values; const l = s ?? t.name.split(',')[0]; const m = new Date(a); const f = m.getHours(); const p = m.getMinutes(); return { hours: f, minutes: p, temperature: c, locationName: l, daily: r, temperatureApparentMin: n, temperatureApparentMax: o, humidity: i, windGust: u } }; const k = ({ cloudBaseAvg: e, rainIntensityAvg: t, snowIntensityAvg: s, windSpeedAvg: a }) => t > 0.3 ? 'rain' : s > 0.2 ? 'winter' : e > 1 ? 'clouds' : a > 1.4 ? 'wind' : 'summer'; const G = e => e.map(s => { const { time: a, values: r } = s; const n = k(r); const c = new Date(a).toDateString().split(' '); const i = c.splice(0, 1); const u = c.join(' '); const l = r.temperatureApparentAvg; return { date: u, temperatureExpected: l, day: i, environmentDay: n } }); const v = async e => { const t = await D(e); const { hours: s, minutes: a, locationName: r, temperature: n, daily: o, temperatureApparentMin: c, temperatureApparentMax: i, humidity: u, windGust: l } = j(t); const m = W(Math.round(n), s, a, r, c, i, u, l); h(O, m); const p = G(o).map(w => { const { temperatureExpected: $, date: F, day: b, environmentDay: A } = w; return I(Math.round($), F, b, A) }).join(''); h(B, p) }; P.addEventListener('submit', e => { e.preventDefault(); const t = _.value; v(t) }); v()
