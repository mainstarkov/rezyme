// Code Slides
const slides = [
  {
    lang: 'node.js',
    html: `<span class="cm">// SocksyFree — парсер чатов</span>
<span class="kw">const</span> <span class="fn">GramJS</span> <span class="op">=</span> <span class="fn">require</span>(<span class="st">'telegram'</span>);
<span class="kw">const</span> client <span class="op">=</span> <span class="kw">new</span> <span class="cl">TelegramClient</span>(session);

<span class="kw">async function</span> <span class="fn">parseChat</span>(chatId) {
  <span class="kw">await</span> client.<span class="fn">connect</span>();
  <span class="kw">const</span> msgs <span class="op">=</span> <span class="kw">await</span> client.<span class="fn">getMessages</span>(chatId, {
    limit: <span class="num">500</span>
  });
  msgs.<span class="fn">forEach</span>(msg <span class="op">=></span> {
    db.<span class="fn">run</span>(<span class="st">'INSERT INTO data VALUES(?)'</span>,
      [msg.text]);
  });
}`,
  },
  {
    lang: 'node.js',
    html: `<span class="cm">// @ezhikchekrobot — пробив домена</span>
<span class="kw">const</span> bot <span class="op">=</span> <span class="kw">new</span> <span class="cl">TelegramBot</span>(TOKEN);

bot.<span class="fn">on</span>(<span class="st">'message'</span>, <span class="kw">async</span> (msg) <span class="op">=></span> {
  <span class="kw">const</span> domain <span class="op">=</span> msg.text.<span class="fn">trim</span>();
  <span class="kw">const</span> [ip, whois, geo] <span class="op">=</span> <span class="kw">await</span>
    <span class="cl">Promise</span>.<span class="fn">all</span>([
      <span class="fn">getIP</span>(domain),
      <span class="fn">getWhois</span>(domain),
      <span class="fn">getGeo</span>(domain)
    ]);
  bot.<span class="fn">sendMessage</span>(msg.chat.id,
    <span class="st">\`IP: \${ip}\nGEO: \${geo}\`</span>);
});`,
  },
  {
    lang: 'python',
    html: `<span class="cm"># Парсер на Pyrogram / MTProto</span>
<span class="kw">from</span> pyrogram <span class="kw">import</span> <span class="cl">Client</span>

app <span class="op">=</span> <span class="cl">Client</span>(<span class="st">"session"</span>,
  api_id<span class="op">=</span><span class="num">12345</span>,
  api_hash<span class="op">=</span><span class="st">"abc..."</span>)

<span class="op">@</span>app.<span class="fn">on_message</span>()
<span class="kw">async def</span> <span class="fn">handler</span>(client, msg):
  <span class="kw">await</span> db.<span class="fn">execute</span>(
    <span class="st">"INSERT INTO msgs VALUES(?)"</span>,
    (msg.text,)
  )
  <span class="kw">await</span> db.<span class="fn">commit</span>()`,
  },
  {
    lang: 'python',
    html: `<span class="cm"># Gemini AI интеграция</span>
<span class="kw">import</span> google.generativeai <span class="kw">as</span> genai

genai.<span class="fn">configure</span>(api_key<span class="op">=</span>API_KEY)
model <span class="op">=</span> genai.<span class="cl">GenerativeModel</span>(
  <span class="st">'gemini-pro'</span>
)

<span class="kw">def</span> <span class="fn">analyze_text</span>(text: <span class="cl">str</span>) <span class="op">-></span> <span class="cl">str</span> {
  resp <span class="op">=</span> model.<span class="fn">generate_content</span>(text)
  <span class="kw">return</span> resp.text
}

result <span class="op">=</span> <span class="fn">analyze_text</span>(
  <span class="st">"Summarize this data..."</span>
)`,
  },
  {
    lang: 'java',
    html: `<span class="cm">// REST API клиент на Java</span>
<span class="kw">public class</span> <span class="cl">ApiClient</span> {

  <span class="kw">private final</span> <span class="cl">String</span> baseUrl;

  <span class="kw">public</span> <span class="cl">ApiClient</span>(<span class="cl">String</span> url) {
    <span class="kw">this</span>.baseUrl <span class="op">=</span> url;
  }

  <span class="kw">public</span> <span class="cl">JsonObject</span> <span class="fn">getDomain</span>(
      <span class="cl">String</span> domain) <span class="kw">throws</span> <span class="cl">Exception</span> {
    <span class="cl">HttpRequest</span> req <span class="op">=</span> <span class="cl">HttpRequest</span>
      .<span class="fn">newBuilder</span>()
      .<span class="fn">uri</span>(<span class="cl">URI</span>.<span class="fn">create</span>(baseUrl <span class="op">+</span> domain))
      .<span class="fn">GET</span>().<span class="fn">build</span>();
    <span class="kw">return</span> <span class="fn">parse</span>(client.<span class="fn">send</span>(req));
  }
}`,
  },
  {
    lang: 'node.js',
    html: `<span class="cm">// SQLite — оптимизация запросов</span>
<span class="kw">const</span> db <span class="op">=</span> <span class="kw">new</span> <span class="cl">Database</span>(<span class="st">'data.db'</span>);

db.<span class="fn">exec</span>(<span class="st">\`
  CREATE TABLE IF NOT EXISTS users (
    id      INTEGER PRIMARY KEY,
    username TEXT UNIQUE,
    link    TEXT
  );
  CREATE INDEX IF NOT EXISTS
    idx_user ON users(username);
\`</span>);

<span class="kw">const</span> insert <span class="op">=</span> db.<span class="fn">prepare</span>(
  <span class="st">'INSERT OR IGNORE INTO users VALUES(?,?,?)'</span>
);`,
  },
];

(function initCodeSlides() {
  const container = document.getElementById('codeSlides');
  const langEl = document.getElementById('screenLang');
  if (!container) return;

  slides.forEach((s, i) => {
    const div = document.createElement('div');
    div.className = 'code-slide' + (i === 0 ? ' active' : '');
    div.innerHTML = s.html;
    container.appendChild(div);
  });

  let current = 0;
  setInterval(() => {
    const all = container.querySelectorAll('.code-slide');
    all[current].classList.remove('active');
    all[current].classList.add('exit');
    setTimeout(() => all[current].classList.remove('exit'), 500);
    current = (current + 1) % slides.length;
    all[current].classList.add('active');
    langEl.textContent = slides[current].lang;
  }, 3000);
})();

// Nav Scroll
const mainNav = document.getElementById('mainNav');
window.addEventListener('scroll', () => {
  mainNav.classList.toggle('scrolled', window.scrollY > 40);
}, { passive: true });

// Mobile Nav
function toggleMobileNav() {
  const nav = document.getElementById('mobileNav');
  const btn = document.getElementById('burgerBtn');
  nav.classList.toggle('open');
  btn.classList.toggle('open');
}
function closeMobileNav() {
  document.getElementById('mobileNav').classList.remove('open');
  document.getElementById('burgerBtn').classList.remove('open');
}

// Scroll Reveal
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));