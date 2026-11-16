(function(){
  'use strict';
  const info = window.MULLET_CATALOG;
  const body = document.getElementById('catalog-rows');
  if (!info || !body) return;
  const clean = x => String(x == null ? '' : x);
  document.getElementById('catalog-year').textContent = clean(info.year);
  document.getElementById('catalog-status').textContent = clean(info.status);
  document.getElementById('catalog-note').textContent = clean(info.note);
  const link = document.getElementById('catalog-order-link');
  const allowed = /^orders\/[a-zA-Z0-9._-]+\.(doc|docx|pdf|xlsx?)$/i;
  if (allowed.test(clean(info.orderForm))) link.href = info.orderForm;
  body.replaceChildren();
  (Array.isArray(info.items) ? info.items : []).forEach(item => {
    const tr = document.createElement('tr');
    const priceValid = typeof item.price === 'number' && Number.isFinite(item.price) && item.price >= 0;
    const priceText = priceValid ? 'NT$ ' + Math.round(item.price).toLocaleString('zh-TW') : (clean(item.name) === '金鑽一口吃烏魚子' ? '依時價' : '請洽詢');
    [clean(item.name),clean(item.spec),priceText].forEach(t => {
      const td = document.createElement('td'); td.textContent = t; tr.appendChild(td);
    });
    body.appendChild(tr);
  });
  if(!body.childElementCount){const tr=document.createElement('tr');const td=document.createElement('td');td.colSpan=3;td.textContent='尚無上架品項，請洽詢。';tr.appendChild(td);body.appendChild(tr)}
})();
