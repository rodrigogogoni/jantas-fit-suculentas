(() => {
  const replacements = [
    [/7 Dias de Garantia/g, "30 Dias de Garantia"],
    [/7 DIAS DE GARANTIA INCONDICIONAL/g, "30 DIAS DE GARANTIA INCONDICIONAL"],
    [/7 dias completos/g, "30 dias completos"],
    [/garantia incondicional de 7 dias/g, "garantia incondicional de 30 dias"],
    [/dentro desse prazo/g, "dentro dos 30 dias"]
  ];

  const updateText = (root = document.body) => {
    if (!root) return;

    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
    const nodes = [];
    while (walker.nextNode()) nodes.push(walker.currentNode);

    for (const node of nodes) {
      let value = node.nodeValue;
      for (const [pattern, replacement] of replacements) {
        value = value.replace(pattern, replacement);
      }
      if (value !== node.nodeValue) node.nodeValue = value;
    }
  };

  updateText();

  const observer = new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      for (const node of mutation.addedNodes) {
        if (node.nodeType === Node.TEXT_NODE) {
          let value = node.nodeValue;
          for (const [pattern, replacement] of replacements) {
            value = value.replace(pattern, replacement);
          }
          if (value !== node.nodeValue) node.nodeValue = value;
        } else if (node.nodeType === Node.ELEMENT_NODE) {
          updateText(node);
        }
      }
    }
  });

  observer.observe(document.documentElement, { childList: true, subtree: true });
})();
