/* dc-lite: tiny runtime that renders the portfolio's page templates without the design-canvas runtime. */
(function () {
  class DCLogic {
    constructor(props) { this.props = props || {}; this.state = {}; }
    setState(patch) {
      const next = typeof patch === 'function' ? patch(this.state, this.props) : patch;
      this.state = Object.assign({}, this.state, next);
      if (this.__render) this.__schedule();
    }
    renderVals() { return {}; }
  }
  window.DCLogic = DCLogic;
  const HOLE = /\{\{(\w+)\}\}/g;
  const EVENTS = { onclick: 'click', onanimationend: 'animationend', onmouseenter: 'mouseenter', onmouseleave: 'mouseleave', onchange: 'change', oninput: 'input', onkeydown: 'keydown' };
  function mount() {
    const tpl = document.getElementById('dc-template');
    const src = document.getElementById('dc-logic');
    const root = document.getElementById('dc-root');
    const Comp = new Function('DCLogic', src.textContent + '\n;return Component;')(DCLogic);
    const comp = new Comp({});
    let queued = false;
    comp.__schedule = () => { if (queued) return; queued = true; requestAnimationFrame(() => { queued = false; render(); }); };
    function val(vals, name) { return Object.prototype.hasOwnProperty.call(vals, name) ? vals[name] : undefined; }
    function render() {
      const vals = comp.renderVals() || {};
      const frag = tpl.content.cloneNode(true);
      // conditionals (innermost first)
      let ifs;
      while ((ifs = frag.querySelectorAll('sc-if')).length) {
        const el = ifs[ifs.length - 1];
        const m = /\{\{(\w+)\}\}/.exec(el.getAttribute('value') || '');
        const keep = m ? !!val(vals, m[1]) : false;
        if (keep) { while (el.firstChild) el.parentNode.insertBefore(el.firstChild, el); }
        el.remove();
      }
      const walker = document.createTreeWalker(frag, NodeFilter.SHOW_ELEMENT | NodeFilter.SHOW_TEXT);
      const refs = [];
      let n;
      while ((n = walker.nextNode())) {
        if (n.nodeType === 3) {
          if (n.nodeValue.indexOf('{{') >= 0) n.nodeValue = n.nodeValue.replace(HOLE, (_, k) => { const v = val(vals, k); return v == null ? '' : String(v); });
          continue;
        }
        for (const a of Array.from(n.attributes)) {
          if (a.value.indexOf('{{') < 0) continue;
          const whole = /^\{\{(\w+)\}\}$/.exec(a.value);
          const lname = a.name.toLowerCase();
          if (whole && typeof val(vals, whole[1]) === 'function') {
            const fn = val(vals, whole[1]);
            n.removeAttribute(a.name);
            if (lname === 'ref') refs.push([fn, n]);
            else if (EVENTS[lname]) n.addEventListener(EVENTS[lname], fn);
            continue;
          }
          const s = a.value.replace(HOLE, (_, k) => { const v = val(vals, k); return v == null || v === false ? '' : String(v); });
          if (whole && (val(vals, whole[1]) === false || val(vals, whole[1]) == null) && lname !== 'style' && lname !== 'class') n.removeAttribute(a.name);
          else n.setAttribute(a.name, s);
        }
      }
      // keep the DOM identity where possible: replace children in one go
      root.replaceChildren(frag);
      refs.forEach(([fn, el]) => { try { fn(el); } catch (e) {} });
    }
    comp.__render = render;
    render();
    if (comp.componentDidMount) comp.componentDidMount();
    window.addEventListener('pagehide', () => { if (comp.componentWillUnmount) comp.componentWillUnmount(); });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', mount); else mount();
})();
