// Mho test page: chat with streamed replies, KaTeX math and a lesson picker.
(() => {
  const $ = (id) => document.getElementById(id);
  const chat = $('chat'), input = $('input'), form = $('form'), send = $('send');
  const courseSel = $('course'), lessonSel = $('lesson'), lessonWrap = $('lessonWrap');
  const store = {
    get: (k) => { try { return localStorage.getItem(k); } catch { return null; } },
    set: (k, v) => { try { localStorage.setItem(k, v); } catch {} },
  };

  let code = store.get('mho-code') || '';
  let messages = []; // {role, content}
  let busy = false;
  let courses = [];

  const headers = () => ({ 'Content-Type': 'application/json', ...(code ? { 'x-mho-code': code } : {}) });

  // ── Markdown + math ───────────────────────────────────────────────
  // Math is pulled out before Markdown runs (so underscores and backslashes survive), then
  // rendered with KaTeX and put back.
  function render(text) {
    const math = [];
    const keep = (tex, display) => `@@MATH${math.push({ tex, display }) - 1}@@`;
    let src = text
      .replace(/\$\$([\s\S]+?)\$\$/g, (_, t) => keep(t, true))
      .replace(/\\\[([\s\S]+?)\\\]/g, (_, t) => keep(t, true))
      .replace(/\\\(([\s\S]+?)\\\)/g, (_, t) => keep(t, false))
      .replace(/(^|[^\\$])\$(?!\s)([^$\n]+?)(?<!\s)\$(?!\d)/g, (_, pre, t) => pre + keep(t, false));
    let html = DOMPurify.sanitize(marked.parse(src, { breaks: false, gfm: true }));
    return html.replace(/@@MATH(\d+)@@/g, (_, i) => {
      const m = math[Number(i)];
      try { return katex.renderToString(m.tex, { displayMode: m.display, throwOnError: false, strict: 'ignore' }); }
      catch { return m.display ? `$$${m.tex}$$` : `$${m.tex}$`; }
    });
  }

  // ── Messages on screen ───────────────────────────────────────────
  function addBubble(role, content) {
    $('welcome')?.remove();
    const row = document.createElement('div');
    row.className = `msg ${role === 'user' ? 'user' : 'mho'}`;
    if (role !== 'user') row.innerHTML = '<div class="mark" aria-hidden="true"><span>Ω</span></div>';
    const bubble = document.createElement('div');
    bubble.className = 'bubble';
    if (role === 'user') bubble.textContent = content; else bubble.innerHTML = content;
    row.appendChild(bubble);
    chat.appendChild(row);
    scrollDown(true);
    return bubble;
  }
  function scrollDown(force) {
    const nearBottom = chat.scrollHeight - chat.scrollTop - chat.clientHeight < 120;
    if (force || nearBottom) chat.scrollTop = chat.scrollHeight;
  }
  const typing = '<span class="typing"><i></i><i></i><i></i></span>';

  // ── Sending ──────────────────────────────────────────────────────
  async function ask(text) {
    text = text.trim();
    if (!text || busy) return;
    busy = true; send.disabled = true;
    messages.push({ role: 'user', content: text });
    addBubble('user', text);
    input.value = ''; autosize();
    const bubble = addBubble('assistant', typing);
    let reply = '';
    let frame = 0;
    const paint = () => { frame = 0; bubble.innerHTML = render(reply) || typing; scrollDown(false); };

    try {
      const res = await fetch('/api/chat', {
        method: 'POST', headers: headers(),
        body: JSON.stringify({ messages, course: courseSel.value || undefined, lesson: lessonSel.value || undefined }),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        if (res.status === 401) { messages.pop(); bubble.closest('.msg').remove(); askForCode(); return; }
        throw new Error(err.error || `Request failed (${res.status})`);
      }
      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let buf = '';
      for (;;) {
        const { value, done } = await reader.read();
        if (done) break;
        buf += decoder.decode(value, { stream: true });
        let cut;
        while ((cut = buf.indexOf('\n\n')) >= 0) {
          const line = buf.slice(0, cut).replace(/^data: /, '');
          buf = buf.slice(cut + 2);
          if (!line) continue;
          const ev = JSON.parse(line);
          if (ev.type === 'text') { reply += ev.text; if (!frame) frame = requestAnimationFrame(paint); }
          else if (ev.type === 'error') throw new Error(ev.message);
        }
      }
      cancelAnimationFrame(frame); paint();
      if (!reply.trim()) throw new Error('Mho didn\'t send a reply. Please try again.');
      messages.push({ role: 'assistant', content: reply });
    } catch (e) {
      // Keep the conversation valid: drop the unanswered question so it can be asked again.
      messages.pop();
      if (reply.trim()) bubble.innerHTML = render(reply);
      const note = addBubble('assistant', '');
      note.classList.add('error');
      note.textContent = e.message;
    } finally {
      busy = false; send.disabled = false; input.focus();
    }
  }

  form.addEventListener('submit', (e) => { e.preventDefault(); ask(input.value); });
  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey && !e.isComposing) { e.preventDefault(); ask(input.value); }
  });
  function autosize() { input.style.height = 'auto'; input.style.height = Math.min(input.scrollHeight, 180) + 'px'; }
  input.addEventListener('input', autosize);

  // Quick actions: prompts ending in ": " need the student's problem, so they go in the box;
  // the others send right away.
  $('chips').addEventListener('click', (e) => {
    const b = e.target.closest('button[data-prompt]');
    if (!b) return;
    const p = b.dataset.prompt;
    if (p.endsWith(': ')) { input.value = p; autosize(); input.focus(); input.setSelectionRange(p.length, p.length); }
    else ask(p);
  });

  $('newChat').addEventListener('click', () => {
    if (busy) return;
    messages = [];
    chat.innerHTML = '';
    const w = document.createElement('div');
    w.className = 'welcome'; w.id = 'welcome';
    w.innerHTML = '<div class="mark big" aria-hidden="true"><span>Ω</span></div><h1>New chat</h1><p>What are you working on?</p>';
    chat.appendChild(w);
    input.focus();
  });

  // ── Lesson picker ────────────────────────────────────────────────
  function fillLessons() {
    const c = courses.find((x) => x.slug === courseSel.value);
    lessonWrap.hidden = !c;
    lessonSel.innerHTML = '';
    if (!c) return;
    c.units.forEach((u, ui) => {
      const group = document.createElement('optgroup');
      group.label = `Unit ${ui + 1}: ${u.title}`;
      u.lessons.forEach((l) => group.appendChild(new Option(`${l.id.replace('-', '.')} ${l.title}`, l.id)));
      lessonSel.appendChild(group);
    });
    store.set('mho-course', c.slug);
  }
  courseSel.addEventListener('change', fillLessons);
  lessonSel.addEventListener('change', () => store.set('mho-lesson', lessonSel.value));

  async function loadCourses() {
    const res = await fetch('/api/courses', { headers: headers() });
    if (res.status === 401) return askForCode();
    courses = await res.json();
    for (const c of courses) courseSel.appendChild(new Option(`${c.code} · ${c.title}`, c.slug));
    const saved = store.get('mho-course');
    if (saved && courses.some((c) => c.slug === saved)) {
      courseSel.value = saved; fillLessons();
      const l = store.get('mho-lesson');
      if (l && [...lessonSel.options].some((o) => o.value === l)) lessonSel.value = l;
    }
  }

  // ── Access code ──────────────────────────────────────────────────
  function askForCode() {
    const d = $('codeDialog');
    if (!d.open) d.showModal();
    $('codeInput').focus();
  }
  $('codeForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const tryCode = $('codeInput').value.trim();
    const res = await fetch('/api/check-code', { method: 'POST', headers: { 'x-mho-code': tryCode } });
    if (!res.ok) { const er = $('codeError'); er.hidden = false; er.textContent = 'That code isn\'t right.'; return; }
    code = tryCode; store.set('mho-code', code);
    $('codeDialog').close();
    if (!courses.length) loadCourses();
  });
  $('codeDialog').addEventListener('cancel', (e) => e.preventDefault());

  // ── Start ────────────────────────────────────────────────────────
  (async () => {
    const cfg = await fetch('/api/config').then((r) => r.json()).catch(() => ({}));
    if (cfg.mock) $('welcome')?.insertAdjacentHTML('beforeend', '<p class="hint" style="color:#fbbf24">Test mode: no API key is set, so replies are canned examples.</p>');
    loadCourses();
    input.focus();
  })();
})();
