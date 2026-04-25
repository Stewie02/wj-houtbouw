
// BLOG, BLOG POST, ABOUT, CONTACT, LEGAL, 404

function BlogPage({ onNavigate }) {
  const { C, T, Img, Btn, Tag } = window;
  const posts = [
    { title: 'How to protect your outdoor table through winter', category: 'Care & Maintenance', date: '18 March 2025', excerpt: 'Winter can be hard on outdoor furniture. Here is exactly what we recommend to our customers before the first frost hits.', featured: true },
    { title: 'Douglas fir vs. European oak: which wood is right for you?', category: 'Wood Guide', date: '5 February 2025', excerpt: 'Two of our most popular timbers, two very different characters. We break down the differences so you can choose with confidence.' },
    { title: 'Our workshop: from raw timber to finished table', category: 'Behind the Scenes', date: '14 January 2025', excerpt: 'A look inside our Gelderland workshop, where every table starts its life as a freshly sawn plank.' },
    { title: 'Five garden setups we love right now', category: 'Inspiration', date: '3 December 2024', excerpt: 'From a minimal urban courtyard to a sprawling country garden — five real customer setups that caught our eye.' },
    { title: 'Why we only use FSC-certified timber', category: 'Sustainability', date: '28 October 2024', excerpt: 'Sustainability is not a marketing checkbox for us. Here is what FSC certification means in practice.' },
    { title: 'The case for Accoya: a 50-year guarantee', category: 'Wood Guide', date: '9 September 2024', excerpt: 'Accoya is the most durable timber we work with. Its above-ground guarantee outlasts most things you will ever buy.' },
  ];

  const categories = ['All', 'Care & Maintenance', 'Wood Guide', 'Inspiration', 'Behind the Scenes', 'Sustainability'];
  const [active, setActive] = React.useState('All');

  return (
    <div style={{ background: C.bg }}>
      {/* HERO */}
      <div style={{ background: C.dark, padding: '80px 0' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 48px' }}>
          <div style={{ ...T.label, color: '#6B6058', marginBottom: 12 }}>
            <span onClick={() => onNavigate('home')} style={{ cursor: 'pointer' }}>Home</span> › Journal
          </div>
          <div style={{ ...T.display, fontSize: 54, color: C.white, maxWidth: 560, lineHeight: 1.1 }}>
            From the<br /><span style={{ ...T.headingItalic, color: C.wood, fontWeight: 400 }}>workshop journal</span>
          </div>
          <div style={{ ...T.body, fontSize: 16, color: 'rgba(254,252,249,0.6)', marginTop: 16, maxWidth: 440 }}>
            Care guides, wood selection advice, behind-the-scenes stories and inspiration for your outdoor space.
          </div>
        </div>
      </div>

      {/* CATEGORY FILTER */}
      <div style={{ background: C.white, borderBottom: `1px solid ${C.border}`, position: 'sticky', top: 72, zIndex: 10 }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 48px', display: 'flex', gap: 4, overflowX: 'auto' }}>
          {categories.map(cat => (
            <button key={cat} onClick={() => setActive(cat)}
              style={{ padding: '16px 20px', background: 'none', border: 'none', borderBottom: active === cat ? `2px solid ${C.green}` : '2px solid transparent', cursor: 'pointer', ...T.ui, fontSize: 13, color: active === cat ? C.green : C.muted, whiteSpace: 'nowrap', marginBottom: -1 }}>
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '56px 48px 96px' }}>
        {/* FEATURED POST */}
        <div onClick={() => onNavigate('blogpost')} style={{ cursor: 'pointer', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 0, marginBottom: 56, border: `1px solid ${C.border}`, overflow: 'hidden', background: C.white }}>
          <Img label={posts[0].title} aspect="4/3" />
          <div style={{ padding: '48px 44px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <Tag>{posts[0].category}</Tag>
            <div style={{ ...T.display, fontSize: 32, color: C.text, lineHeight: 1.2, margin: '18px 0 16px' }}>{posts[0].title}</div>
            <div style={{ ...T.body, fontSize: 15, color: C.muted, lineHeight: 1.7, marginBottom: 24 }}>{posts[0].excerpt}</div>
            <div style={{ ...T.label, color: C.muted }}>{posts[0].date}</div>
          </div>
        </div>

        {/* GRID */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 32 }}>
          {posts.slice(1).map(p => (
            <div key={p.title} onClick={() => onNavigate('blogpost')} style={{ cursor: 'pointer', background: C.white, border: `1px solid ${C.border}`, overflow: 'hidden' }}>
              <Img label={p.title} aspect="16/9" />
              <div style={{ padding: '24px 24px 28px' }}>
                <Tag>{p.category}</Tag>
                <div style={{ ...T.heading, fontSize: 19, color: C.text, lineHeight: 1.35, margin: '12px 0 12px' }}>{p.title}</div>
                <div style={{ ...T.body, fontSize: 13, color: C.muted, lineHeight: 1.65, marginBottom: 16 }}>{p.excerpt}</div>
                <div style={{ ...T.label, color: C.muted, fontSize: 10 }}>{p.date}</div>
              </div>
            </div>
          ))}
        </div>
        <div style={{ textAlign: 'center', marginTop: 56 }}>
          <Btn variant="outline">Load more articles</Btn>
        </div>
      </div>
    </div>
  );
}

function BlogPostPage({ onNavigate }) {
  const { C, T, Img, Btn, Tag } = window;
  const recent = [
    'Douglas fir vs. European oak: which wood is right for you?',
    'Our workshop: from raw timber to finished table',
    'Five garden setups we love right now',
  ];
  return (
    <div style={{ background: C.bg }}>
      {/* HERO IMAGE */}
      <div style={{ position: 'relative', height: 480 }}>
        <Img label="blog hero — outdoor table in winter garden setting" style={{ height: '100%', aspectRatio: 'unset', position: 'absolute', inset: 0 }} dark />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(12,10,8,0.7) 0%, transparent 50%)' }} />
      </div>

      {/* ARTICLE HEADER */}
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 48px' }}>
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
          <div style={{ ...T.label, color: C.muted, marginTop: 40, marginBottom: 12 }}>
            <span onClick={() => onNavigate('home')} style={{ cursor: 'pointer' }}>Home</span> ›
            <span onClick={() => onNavigate('blog')} style={{ cursor: 'pointer' }}> Journal</span> › Article
          </div>
          <Tag>Care & Maintenance</Tag>
          <h1 style={{ ...T.display, fontSize: 48, color: C.text, lineHeight: 1.1, margin: '16px 0 20px' }}>
            How to protect your outdoor table through winter
          </h1>
          <div style={{ display: 'flex', alignItems: 'center', gap: 20, marginBottom: 48, paddingBottom: 32, borderBottom: `1px solid ${C.border}` }}>
            <Img label="author" style={{ width: 44, height: 44, borderRadius: '50%', flexShrink: 0 }} />
            <div>
              <div style={{ ...T.ui, fontSize: 14, color: C.text }}>Willem Janssen</div>
              <div style={{ ...T.body, fontSize: 12, color: C.muted }}>18 March 2025 · 6 min read</div>
            </div>
          </div>
        </div>
      </div>

      {/* BODY */}
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 48px 96px', display: 'grid', gridTemplateColumns: '1fr 300px', gap: 72, alignItems: 'start' }}>
        <article style={{ maxWidth: 720 }}>
          {[
            { type: 'lead', text: 'Outdoor furniture that survives one winter well will survive fifty. The difference is almost entirely in how you treat it before the cold arrives — not during, and not after.' },
            { type: 'h2', text: 'Step 1: Clean thoroughly before temperatures drop' },
            { type: 'p', text: 'Before you do anything else, wash the table with a mild soapy water solution and a soft brush. Pay attention to the underside of the top boards and the joints — these are where moisture collects and where rot starts if it is going to start at all. Rinse clean and let dry completely, ideally over two dry days.' },
            { type: 'img', label: 'cleaning outdoor table detail' },
            { type: 'h2', text: 'Step 2: Re-oil if the wood looks thirsty' },
            { type: 'p', text: 'Douglas Fir and Oak benefit from an annual oil treatment — particularly if the wood has started to look grey or dry. We use and recommend WOCA Master Oil, applied in two thin coats. Work with the grain, allow the first coat to absorb for 20 minutes before wiping any excess, then repeat.' },
            { type: 'h2', text: 'Step 3: Cover or store, but breathe' },
            { type: 'p', text: 'If you are covering the table in-situ, use a breathable outdoor furniture cover — not a tarpaulin. Trapped moisture under a plastic cover is one of the most common causes of accelerated weathering. If storing indoors, a dry outbuilding or garage is ideal. Do not wrap in plastic.' },
          ].map((block, i) => {
            if (block.type === 'lead') return <p key={i} style={{ ...T.headingItalic, fontSize: 21, color: C.text, lineHeight: 1.65, marginBottom: 32 }}>{block.text}</p>;
            if (block.type === 'h2') return <h2 key={i} style={{ ...T.heading, fontSize: 26, color: C.text, margin: '40px 0 16px' }}>{block.text}</h2>;
            if (block.type === 'p') return <p key={i} style={{ ...T.body, fontSize: 16, color: C.muted, lineHeight: 1.8, marginBottom: 20 }}>{block.text}</p>;
            if (block.type === 'img') return <div key={i} style={{ margin: '32px 0' }}><Img label={block.label} aspect="16/9" /></div>;
            return null;
          })}

          {/* TAGS + SHARE */}
          <div style={{ marginTop: 48, paddingTop: 32, borderTop: `1px solid ${C.border}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', gap: 8 }}>
              {['Care', 'Maintenance', 'Seasonal'].map(t => (
                <span key={t} style={{ ...T.label, fontSize: 10, background: C.surface, color: C.muted, padding: '5px 10px' }}>{t}</span>
              ))}
            </div>
            <div style={{ display: 'flex', gap: 12 }}>
              {['Share', 'Save'].map(a => (
                <button key={a} style={{ ...T.ui, fontSize: 13, color: C.muted, background: 'none', border: `1px solid ${C.border}`, padding: '7px 16px', cursor: 'pointer' }}>{a}</button>
              ))}
            </div>
          </div>

          {/* AUTHOR BIO */}
          <div style={{ marginTop: 40, padding: 28, background: C.surface, display: 'grid', gridTemplateColumns: '60px 1fr', gap: 20, alignItems: 'center' }}>
            <Img label="Willem" style={{ width: 60, height: 60, borderRadius: '50%', flexShrink: 0 }} />
            <div>
              <div style={{ ...T.heading, fontSize: 16, color: C.text, marginBottom: 4 }}>Willem Janssen</div>
              <div style={{ ...T.body, fontSize: 13, color: C.muted, lineHeight: 1.65 }}>Founder of WJ Houtbouw. Has been working with timber since 1998. Still does the finishing by hand.</div>
            </div>
          </div>
        </article>

        {/* SIDEBAR */}
        <aside style={{ position: 'sticky', top: 100 }}>
          <div style={{ background: C.white, border: `1px solid ${C.border}`, padding: 24, marginBottom: 24 }}>
            <div style={{ ...T.label, color: C.muted, marginBottom: 16 }}>Recent articles</div>
            {recent.map(r => (
              <div key={r} onClick={() => onNavigate('blogpost')} style={{ paddingBottom: 14, marginBottom: 14, borderBottom: `1px solid ${C.border}`, cursor: 'pointer' }}>
                <div style={{ ...T.body, fontSize: 13, color: C.text, lineHeight: 1.5 }}>{r}</div>
              </div>
            ))}
          </div>
          <div style={{ background: C.greenLight, border: `1px solid #C8D9BE`, padding: 24 }}>
            <div style={{ ...T.heading, fontSize: 16, color: C.green, marginBottom: 8 }}>Browse our tables</div>
            <div style={{ ...T.body, fontSize: 13, color: C.muted, marginBottom: 16 }}>All tables come with our 10-year guarantee and free delivery over €500.</div>
            <Btn full size="sm" onClick={() => onNavigate('shop')}>Shop now</Btn>
          </div>
        </aside>
      </div>
    </div>
  );
}

function AboutPage({ onNavigate }) {
  const { C, T, Img, Btn, Tag } = window;
  return (
    <div style={{ background: C.bg }}>
      {/* HERO */}
      <div style={{ position: 'relative', height: 520, overflow: 'hidden' }}>
        <Img label="about — workshop exterior, Gelderland" style={{ height: '100%', aspectRatio: 'unset', position: 'absolute', inset: 0 }} dark />
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(12,10,8,0.55)' }} />
        <div style={{ position: 'relative', maxWidth: 1280, margin: '0 auto', padding: '0 48px', height: '100%', display: 'flex', alignItems: 'flex-end', paddingBottom: 72 }}>
          <div>
            <div style={{ ...T.label, color: 'rgba(254,252,249,0.5)', marginBottom: 14 }}>About WJ Houtbouw</div>
            <div style={{ ...T.display, fontSize: 58, color: C.white, lineHeight: 1.05, maxWidth: 600 }}>
              Built on<br /><span style={{ ...T.headingItalic, color: C.wood, fontWeight: 400 }}>honest craft.</span>
            </div>
          </div>
        </div>
      </div>

      {/* INTRO */}
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '80px 48px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80 }}>
          <div>
            <div style={{ ...T.display, fontSize: 40, color: C.text, lineHeight: 1.15, marginBottom: 28 }}>We build furniture for the long haul.</div>
            <div style={{ ...T.body, fontSize: 16, color: C.muted, lineHeight: 1.8, marginBottom: 20 }}>
              WJ Houtbouw was founded in Arnhem in 2009 by Willem Janssen, a carpenter who had spent a decade restoring historic Dutch farmhouses and grew frustrated that you couldn't buy outdoor furniture that was built the same way those buildings were — with care, with the right materials, and with the expectation that it would outlast you.
            </div>
            <div style={{ ...T.body, fontSize: 16, color: C.muted, lineHeight: 1.8 }}>
              Today we run a 600m² workshop in the Gelderse Vallei with a team of nine. We still do all joinery by hand. We still use timber from the same FSC-certified supplier we started with. And every table still leaves with Willem's signature on the underside.
            </div>
          </div>
          <div>
            <Img label="founder — Willem Janssen in the workshop" aspect="3/4" />
          </div>
        </div>
      </div>

      {/* VALUES */}
      <div style={{ background: C.surface, padding: '80px 0' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 48px' }}>
          <div style={{ ...T.label, color: C.wood, marginBottom: 12, textAlign: 'center' }}>What we stand for</div>
          <div style={{ ...T.display, fontSize: 40, color: C.text, textAlign: 'center', marginBottom: 56 }}>Our principles</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 40 }}>
            {[
              ['01', 'Timber-first thinking', 'We select every plank ourselves. If the timber isn\'t right, the table isn\'t right. We\'d rather delay a delivery than send something we\'re not proud of.'],
              ['02', 'Traditional joinery', 'Mortise and tenon, not screws through the face. It looks better, it\'s stronger, and it\'s repairable. This is how outdoor furniture should be built.'],
              ['03', 'Sustainable sourcing', 'All our timber is FSC-certified and sourced from European forests managed for longevity. We\'ve used the same supplier since 2009.'],
            ].map(([num, title, body]) => (
              <div key={num}>
                <div style={{ ...T.display, fontSize: 48, color: C.border, marginBottom: 16 }}>{num}</div>
                <div style={{ ...T.heading, fontSize: 22, color: C.text, marginBottom: 12 }}>{title}</div>
                <div style={{ ...T.body, fontSize: 15, color: C.muted, lineHeight: 1.75 }}>{body}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* TEAM */}
      <div style={{ padding: '80px 0' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 48px' }}>
          <div style={{ ...T.display, fontSize: 40, color: C.text, marginBottom: 48 }}>The team</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 32 }}>
            {[
              { name: 'Willem Janssen', role: 'Founder & Lead Carpenter' },
              { name: 'Roos van der Berg', role: 'Workshop Manager' },
              { name: 'Pieter Smit', role: 'Senior Joiner' },
              { name: 'Lotte Verhoef', role: 'Sales & Customer Care' },
            ].map(m => (
              <div key={m.name}>
                <Img label={`${m.name} portrait`} aspect="3/4" style={{ marginBottom: 16 }} />
                <div style={{ ...T.heading, fontSize: 17, color: C.text }}>{m.name}</div>
                <div style={{ ...T.body, fontSize: 13, color: C.muted, marginTop: 4 }}>{m.role}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* WORKSHOP STRIP */}
      <div style={{ background: C.dark }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '80px 48px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'center' }}>
          <div>
            <div style={{ ...T.label, color: '#6B6058', marginBottom: 14 }}>Visit us</div>
            <div style={{ ...T.display, fontSize: 38, color: C.white, lineHeight: 1.15, marginBottom: 24 }}>Come see it being made.</div>
            <div style={{ ...T.body, fontSize: 15, color: 'rgba(254,252,249,0.6)', lineHeight: 1.75, marginBottom: 32 }}>Our workshop is open by appointment on Thursdays and Fridays. You can see all our standard models in person, discuss custom sizes, and speak directly with the team.</div>
            <Btn variant="wood" onClick={() => onNavigate('contact')}>Book a visit</Btn>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 4 }}>
            <Img label="workshop interior 1" aspect="1/1" dark />
            <Img label="workshop detail — timber stack" aspect="1/1" dark />
            <Img label="joinery close-up" aspect="1/1" dark />
            <Img label="finished table detail" aspect="1/1" dark />
          </div>
        </div>
      </div>
    </div>
  );
}

function ContactPage({ onNavigate }) {
  const { C, T, Img, Btn } = window;
  const [sent, setSent] = React.useState(false);
  const Field = ({ label, placeholder, type = 'text', area }) => (
    <div>
      <label style={{ display: 'block', ...T.label, fontSize: 10, color: C.muted, marginBottom: 6 }}>{label}</label>
      {area
        ? <textarea placeholder={placeholder} rows={5} style={{ width: '100%', padding: '11px 14px', border: `1px solid ${C.border}`, background: C.white, ...T.body, fontSize: 14, color: C.text, outline: 'none', resize: 'vertical', fontFamily: 'inherit', boxSizing: 'border-box' }} />
        : <input type={type} placeholder={placeholder} style={{ width: '100%', padding: '11px 14px', border: `1px solid ${C.border}`, background: C.white, ...T.body, fontSize: 14, color: C.text, outline: 'none', boxSizing: 'border-box' }} />
      }
    </div>
  );
  return (
    <div style={{ background: C.bg }}>
      <div style={{ background: C.surface, borderBottom: `1px solid ${C.border}`, padding: '48px 0 40px' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 48px' }}>
          <div style={{ ...T.label, color: C.muted, marginBottom: 10 }}><span onClick={() => onNavigate('home')} style={{ cursor: 'pointer' }}>Home</span> › Contact</div>
          <div style={{ ...T.display, fontSize: 48, color: C.text }}>Get in touch</div>
          <div style={{ ...T.body, fontSize: 16, color: C.muted, marginTop: 10 }}>Questions about an order, a custom request, or want to visit the workshop?</div>
        </div>
      </div>

      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '64px 48px 96px', display: 'grid', gridTemplateColumns: '1fr 400px', gap: 72 }}>
        {/* FORM */}
        {sent ? (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'center', gap: 16 }}>
            <div style={{ width: 56, height: 56, background: C.green, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
            </div>
            <div style={{ ...T.display, fontSize: 36, color: C.text }}>Message sent!</div>
            <div style={{ ...T.body, fontSize: 16, color: C.muted, lineHeight: 1.7 }}>We'll get back to you within one business day. For urgent enquiries, call us directly.</div>
            <Btn variant="outline" onClick={() => setSent(false)}>Send another message</Btn>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
              <Field label="First name" placeholder="Jan" />
              <Field label="Last name" placeholder="de Vries" />
            </div>
            <Field label="Email address" placeholder="jan@example.com" type="email" />
            <Field label="Phone (optional)" placeholder="+31 6 ..." />
            <div>
              <label style={{ display: 'block', ...T.label, fontSize: 10, color: C.muted, marginBottom: 6 }}>Subject</label>
              <select style={{ width: '100%', padding: '11px 14px', border: `1px solid ${C.border}`, background: C.white, ...T.body, fontSize: 14, color: C.text, outline: 'none' }}>
                <option>Question about a product</option>
                <option>Custom order enquiry</option>
                <option>Book a workshop visit</option>
                <option>Order status</option>
                <option>Other</option>
              </select>
            </div>
            <Field label="Message" placeholder="Tell us what you're looking for..." area />
            <Btn size="lg" onClick={() => setSent(true)}>Send message</Btn>
          </div>
        )}

        {/* CONTACT INFO */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
          <div style={{ background: C.white, border: `1px solid ${C.border}`, padding: 32 }}>
            <div style={{ ...T.heading, fontSize: 18, color: C.text, marginBottom: 20 }}>Contact details</div>
            {[
              ['Address', 'Bosweg 14\n6811 KP Arnhem\nNetherlands'],
              ['Phone', '+31 26 445 67 89'],
              ['Email', 'info@wjhoutbouw.nl'],
              ['KVK', '12345678'],
            ].map(([k, v]) => (
              <div key={k} style={{ display: 'flex', gap: 16, marginBottom: 16 }}>
                <div style={{ ...T.label, fontSize: 10, color: C.muted, width: 70, flexShrink: 0, paddingTop: 2 }}>{k}</div>
                <div style={{ ...T.body, fontSize: 14, color: C.text, whiteSpace: 'pre-line' }}>{v}</div>
              </div>
            ))}
          </div>
          <div style={{ background: C.white, border: `1px solid ${C.border}`, padding: 32 }}>
            <div style={{ ...T.heading, fontSize: 18, color: C.text, marginBottom: 16 }}>Opening hours</div>
            {[['Mon – Wed', '08:00 – 17:00'], ['Thu – Fri', '08:00 – 17:00 (visits by appt.)'], ['Saturday', 'Closed'], ['Sunday', 'Closed']].map(([day, hrs]) => (
              <div key={day} style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: 10, marginBottom: 10, borderBottom: `1px solid ${C.border}` }}>
                <span style={{ ...T.body, fontSize: 13, color: C.text }}>{day}</span>
                <span style={{ ...T.body, fontSize: 13, color: C.muted }}>{hrs}</span>
              </div>
            ))}
          </div>
          <div style={{ background: C.surface, border: `1px solid ${C.border}` }}>
            <Img label="map — Bosweg 14, Arnhem" aspect="4/3" />
            <div style={{ padding: '14px 20px', ...T.body, fontSize: 13, color: C.muted }}>Bosweg 14, Arnhem · <span style={{ color: C.green, cursor: 'pointer' }}>Open in Maps →</span></div>
          </div>
        </div>
      </div>
    </div>
  );
}

function LegalPage({ onNavigate }) {
  const { C, T } = window;
  const [active, setActive] = React.useState('privacy');
  const docs = {
    privacy: {
      title: 'Privacy Policy',
      updated: 'Last updated: 1 January 2025',
      sections: [
        { heading: '1. Who we are', body: 'WJ Houtbouw B.V. is a company registered in the Netherlands (KVK 12345678), with its registered office at Bosweg 14, 6811 KP Arnhem. We operate the website wjhoutbouw.nl and are responsible for the personal data we collect and process.' },
        { heading: '2. What data we collect', body: 'We collect data you provide directly — name, email address, telephone number, delivery address and payment information — when you place an order or contact us. We also collect technical data about your device and browsing behaviour via cookies (see our Cookie Policy).' },
        { heading: '3. How we use your data', body: 'We use your data to process and deliver your order, respond to your enquiries, send transactional emails (order confirmation, shipping updates), and comply with our legal obligations. We do not sell your data to third parties.' },
        { heading: '4. Data retention', body: 'We retain order and customer data for 7 years to comply with Dutch tax law. Marketing data is retained until you opt out. You may request deletion of all other data at any time.' },
        { heading: '5. Your rights', body: 'Under the GDPR you have the right to access, correct, delete or export your personal data. Submit requests to privacy@wjhoutbouw.nl. We respond within 30 days.' },
        { heading: '6. Contact', body: 'Data protection enquiries: privacy@wjhoutbouw.nl or write to our registered office above.' },
      ]
    },
    terms: {
      title: 'Terms & Conditions',
      updated: 'Last updated: 1 January 2025',
      sections: [
        { heading: '1. Applicability', body: 'These Terms & Conditions apply to all orders placed via wjhoutbouw.nl and any direct sales agreements with WJ Houtbouw B.V. By placing an order, you agree to these terms.' },
        { heading: '2. Prices and payment', body: 'All prices are inclusive of Dutch VAT (21%) unless otherwise stated. Payment is due in full before delivery unless a business invoice arrangement has been agreed in writing.' },
        { heading: '3. Delivery', body: 'Standard delivery is 3–5 business days within the Netherlands. Delivery to Belgium and Germany is 5–7 business days. Free delivery applies to orders over €500. Delivery is to the kerbside; placement on-site is available at an additional charge.' },
        { heading: '4. Returns and cancellations', body: 'You may cancel your order within 14 days of receipt for a full refund, provided the goods are returned undamaged and in their original packaging. Custom orders are non-refundable.' },
        { heading: '5. Guarantee', body: 'All WJ Houtbouw products carry a 10-year structural guarantee against defects in workmanship. This does not cover weathering, surface wear or damage caused by incorrect maintenance.' },
        { heading: '6. Governing law', body: 'These terms are governed by Dutch law. Disputes will be brought before the competent court in Gelderland.' },
      ]
    }
  };
  const doc = docs[active];
  return (
    <div style={{ background: C.bg, minHeight: '100vh' }}>
      <div style={{ background: C.surface, borderBottom: `1px solid ${C.border}`, padding: '40px 0 0' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 48px' }}>
          <div style={{ ...T.label, color: C.muted, marginBottom: 12 }}><span onClick={() => onNavigate('home')} style={{ cursor: 'pointer' }}>Home</span> › Legal</div>
          <div style={{ display: 'flex', gap: 4 }}>
            {[['privacy', 'Privacy Policy'], ['terms', 'Terms & Conditions']].map(([id, label]) => (
              <button key={id} onClick={() => setActive(id)}
                style={{ padding: '16px 24px', background: active === id ? C.bg : 'transparent', border: `1px solid ${active === id ? C.border : 'transparent'}`, borderBottom: 'none', cursor: 'pointer', ...T.ui, fontSize: 14, color: active === id ? C.text : C.muted, marginBottom: -1 }}>
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '48px 48px 96px', display: 'grid', gridTemplateColumns: '240px 1fr', gap: 64, alignItems: 'start' }}>
        {/* TOC */}
        <aside style={{ position: 'sticky', top: 88 }}>
          <div style={{ ...T.label, color: C.muted, marginBottom: 14 }}>Contents</div>
          {doc.sections.map((s, i) => (
            <div key={i} style={{ ...T.body, fontSize: 13, color: C.muted, padding: '8px 0', borderLeft: `2px solid ${C.border}`, paddingLeft: 14, marginBottom: 4, cursor: 'pointer', lineHeight: 1.4 }}>{s.heading}</div>
          ))}
        </aside>

        {/* CONTENT */}
        <div style={{ maxWidth: 760 }}>
          <div style={{ ...T.display, fontSize: 44, color: C.text, marginBottom: 8 }}>{doc.title}</div>
          <div style={{ ...T.body, fontSize: 13, color: C.muted, marginBottom: 48 }}>{doc.updated}</div>
          {doc.sections.map((s, i) => (
            <div key={i} style={{ marginBottom: 40, paddingBottom: 40, borderBottom: i < doc.sections.length - 1 ? `1px solid ${C.border}` : 'none' }}>
              <h2 style={{ ...T.heading, fontSize: 22, color: C.text, marginBottom: 14 }}>{s.heading}</h2>
              <p style={{ ...T.body, fontSize: 15, color: C.muted, lineHeight: 1.8 }}>{s.body}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function NotFoundPage({ onNavigate }) {
  const { C, T, Btn } = window;
  return (
    <div style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: C.bg }}>
      <div style={{ textAlign: 'center', padding: 48 }}>
        <div style={{ ...T.display, fontSize: 160, color: C.surface, lineHeight: 1, userSelect: 'none', marginBottom: -20 }}>404</div>
        <div style={{ ...T.display, fontSize: 40, color: C.text, marginBottom: 14, position: 'relative' }}>Page not found</div>
        <div style={{ ...T.body, fontSize: 16, color: C.muted, maxWidth: 380, margin: '0 auto 36px', lineHeight: 1.7 }}>
          The page you're looking for doesn't exist — or it may have moved. Try going back to the homepage.
        </div>
        <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
          <Btn onClick={() => onNavigate('home')}>Back to home</Btn>
          <Btn variant="outline" onClick={() => onNavigate('shop')}>Go to shop</Btn>
        </div>
        <div style={{ marginTop: 40, ...T.body, fontSize: 13, color: C.border }}>WJ Houtbouw · Bosweg 14, Arnhem</div>
      </div>
    </div>
  );
}

Object.assign(window, { BlogPage, BlogPostPage, AboutPage, ContactPage, LegalPage, NotFoundPage });
