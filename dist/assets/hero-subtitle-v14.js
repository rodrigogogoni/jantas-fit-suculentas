(() => {
  const subtitle = 'Para secar comendo bem sem abrir mão do sabor em menos de 30 minutos por dia!';
  const applySubtitle = () => {
    const element = document.querySelector('.front-hero-subtitle');
    if (!element) return false;
    element.textContent = subtitle;
    return true;
  };

  if (!applySubtitle()) {
    const observer = new MutationObserver(() => {
      if (applySubtitle()) observer.disconnect();
    });
    observer.observe(document.getElementById('root'), {
      childList: true,
      subtree: true
    });
  }
})();
