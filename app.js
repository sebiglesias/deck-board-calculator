
const state = { len: 20, wid: 16, bWidth: 5.5, joistSpace: 16, waste: true };

function init() {
  const l = document.getElementById('deckLen');
  const w = document.getElementById('deckWid');
  const bw = document.getElementById('boardWidth');
  const js = document.getElementById('joistSpacing');
  const dw = document.getElementById('deckWaste');

  l.addEventListener('input', e => { state.len = parseFloat(e.target.value)||0; calc(); });
  w.addEventListener('input', e => { state.wid = parseFloat(e.target.value)||0; calc(); });
  bw.addEventListener('change', e => { state.bWidth = parseFloat(e.target.value)||5.5; calc(); });
  js.addEventListener('change', e => { state.joistSpace = parseFloat(e.target.value)||16; calc(); });
  dw.addEventListener('change', e => { state.waste = e.target.checked; calc(); });
  calc();
}

function calc() {
  const area = state.len * state.wid;
  // Board width in feet with 1/8" gap (0.125")
  const boardFootWidth = (state.bWidth + 0.125) / 12;

  // Number of rows running across length
  const rows = Math.ceil(state.wid / boardFootWidth);
  let linearFt = rows * state.len;
  if (state.waste) linearFt *= 1.10;

  const b12 = Math.ceil(linearFt / 12);
  const b16 = Math.ceil(linearFt / 16);
  const b20 = Math.ceil(linearFt / 20);

  // Joist count along length
  const joists = Math.ceil((state.len * 12) / state.joistSpace) + 1;

  // Hidden clips: approx 2.5 clips per sq ft
  const totalClips = Math.round(area * 2.5);

  // Joist tape: joist count * wid + perimeter
  const totalTapeFt = (joists * state.wid) + (2 * (state.len + state.wid));
  const tapeRolls = Math.ceil(totalTapeFt / 50);

  document.getElementById('boards16').textContent = b16;
  document.getElementById('linearFeetText').textContent = `≈ ${Math.round(linearFt)} Total Linear Feet (${rows} Rows)`;
  document.getElementById('boards12').textContent = `${b12} Boards`;
  document.getElementById('boards20').textContent = `${b20} Boards`;
  document.getElementById('deckArea').textContent = `${Math.round(area)} sq ft`;
  document.getElementById('joistCount').textContent = `${joists} Joists (${state.joistSpace}" O.C.)`;
  document.getElementById('clipCount').textContent = `≈ ${totalClips.toLocaleString()} Clips`;
  document.getElementById('tapeRolls').textContent = `${tapeRolls} Rolls (50ft each)`;
}
window.addEventListener('DOMContentLoaded', init);
