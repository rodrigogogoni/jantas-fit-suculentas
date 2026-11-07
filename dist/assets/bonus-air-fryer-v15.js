(() => {
  const title = '100 Receitas Fit para Air Fryer';
  const description = 'Receitas práticas, crocantes e sem complicação para preparar na air fryer';
  const image = '/bonus-air-fryer-v1.webp';
  const oldLastBonus = 'Guia de Jantas Leves para Desinchar Dormindo';

  const replaceText = (root, from, to) => {
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
    let node;
    while ((node = walker.nextNode())) {
      if (node.nodeValue.includes(from)) {
        node.nodeValue = node.nodeValue.replaceAll(from, to);
      }
    }
  };

  const addBonusCard = () => {
    const grid = document.querySelector('.front-bonuses-grid');
    if (!grid || grid.querySelector('[data-air-fryer-bonus]')) return;
    const reference = grid.lastElementChild;
    if (!reference) return;

    const card = reference.cloneNode(true);
    card.dataset.airFryerBonus = 'true';
    const badge = card.querySelector('.absolute');
    const cover = card.querySelector('img');
    const heading = card.querySelector('h4');
    const copy = card.querySelector('p');
    const crossedPrice = card.querySelector('.line-through');

    if (badge) badge.textContent = 'Bônus 7';
    if (cover) {
      cover.src = image;
      cover.alt = title;
    }
    if (heading) heading.textContent = title;
    if (copy) copy.textContent = description;
    if (crossedPrice) crossedPrice.textContent = 'R$ 24,90';
    grid.appendChild(card);
  };

  const addOfferRows = () => {
    const labels = [...document.querySelectorAll('span')].filter((element) => {
      const text = element.textContent.trim();
      return (
        text === `Bônus 6 - ${oldLastBonus}` ||
        text === `Bônus: ${oldLastBonus}`
      );
    });

    labels.forEach((label) => {
      const row = label.parentElement;
      const parent = row?.parentElement;
      if (!row || !parent || parent.querySelector('[data-air-fryer-row]')) return;
      const clone = row.cloneNode(true);
      clone.dataset.airFryerRow = 'true';
      const text = clone.querySelector('span:last-child') || clone;
      text.textContent = label.textContent.startsWith('Bônus:')
        ? `Bônus: ${title}`
        : `Bônus 7 - ${title}`;
      row.after(clone);
    });
  };

  const apply = () => {
    document.querySelectorAll('h2 span').forEach((span) => {
      if (/^6 BÔNUS$/i.test(span.textContent.trim())) {
        span.textContent = '7 BÔNUS';
      }
    });
    addBonusCard();
    addOfferRows();
    replaceText(document.body, 'todos os 6 bônus exclusivos', 'todos os 7 bônus exclusivos');
  };

  apply();
  new MutationObserver(apply).observe(document.getElementById('root'), {
    childList: true,
    subtree: true
  });
})();
