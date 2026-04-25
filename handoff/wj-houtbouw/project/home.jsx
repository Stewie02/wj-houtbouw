
// HOME PAGE
function HomePage({ onNavigate }) {
  const { C, T, Img, Btn, Tag, ProductCard, Section } = window;
  const { useState } = React;

  const products = [
    { name: 'Classic Picnic Table', price: 'From € 549', material: 'Douglas Fir', tag: 'Bestseller' },
    { name: 'Round Garden Table', price: '€ 849', material: 'European Oak', tag: null },
    { name: 'Garden Bench', price: 'From € 349', material: 'Douglas Fir', tag: null },
  ];

  const testimonials = [
    { quote: "Ordered two tables for our terrace. The quality is exceptional — solid, heavy, and beautifully finished. Three summers in and they look as good as new.", name: 'Marieke V.', location: 'Utrecht' },
    { quote: "Fast delivery, perfect packaging, and the craftsmanship speaks for itself. Our kids absolutely love the children's table.", name: 'Thomas B.', location: 'Amsterdam' },
    { quote: "Bought the round oak table for our garden. Every guest asks where it's from. Highly recommend.", name: 'Sandra K.', location: 'Antwerp' },
  ];

  const posts = [
    { title: 'How to protect your outdoor table through winter', category: 'Care & Maintenance', date: 'March 2025' },
    { title: 'Douglas fir vs. European oak: which wood is right for you?', category: 'Wood Guide', date: 'February 2025' },
    { title: 'Our workshop: from raw timber to finished table', category: 'Behind the Scenes', date: 'January 2025' },
  ];

  return (
    <div style={{ background: C.bg }}>

      {/* HERO */}
      <div style={{ position: 'relative', height: '92vh', minHeight: 600, overflow: 'hidden', display: 'flex' }}>
        <Img label="hero — outdoor lifestyle, picnic table in garden setting" style={{ position: 'absolute', inset: 0, height: '100%', aspectRatio: 'unset' }} dark />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(105deg, rgba(12,10,8,0.72) 0%, rgba(12,10,8,0.28) 65%, transparent 100%)' }} />
        <div style={{ position: 'relative', maxWidth: 1280, margin: '0 auto', padding: '0 48px', display: 'flex', alignItems: 'center', width: '100%' }}>
          <div style={{ maxWidth: 620 }}>
            <Tag color="rgba(196,132,58,0.2)" style={{ color: C.wood }}>
              <span style={{ color: C.wood }}>Handcrafted in the Netherlands</span>
            </Tag>
            <div style={{ marginTop: 16, ...T.display, fontSize: 68, lineHeight: 1.05, color: C.white }}>
              Built for the<br />
              <span style={{ color: C.wood, ...T.headingItalic, fontWeight: 400 }}>long haul.</span>
            </div>
            <div style={{ marginTop: 24, ...T.body, fontSize: 18, color: 'rgba(254,252,249,0.75)', lineHeight: 1.65, maxWidth: 480 }}>
              Premium picnic tables and outdoor furniture crafted from sustainably sourced European timber. Built to weather every season.
            </div>
            <div style={{ marginTop: 40, display: 'flex', gap: 16 }}>
              <Btn size="lg" onClick={() => onNavigate('shop')}>Browse the collection</Btn>
              <Btn size="lg" variant="outline" onClick={() => onNavigate('about')} style={{ color: C.white, borderColor: 'rgba(254,252,249,0.5)' }}>Our story</Btn>
            </div>
            <div style={{ marginTop: 48, display: 'flex', gap: 40 }}>
              {[['15+', 'Years of craft'], ['2,400+', 'Happy customers'], ['100%', 'Dutch made']].map(([n, l]) => (
                <div key={l}>
                  <div style={{ ...T.display, fontSize: 28, color: C.white }}>{n}</div>
                  <div style={{ ...T.body, fontSize: 13, color: 'rgba(254,252,249,0.55)', marginTop: 2 }}>{l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* USP BAR */}
      <div style={{ background: C.green }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 48px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', borderLeft: '1px solid rgba(255,255,255,0.1)' }}>
            {[
              ['Sustainably sourced', 'FSC-certified European timber'],
              ['Free delivery', 'On all orders over €500'],
              ['10-year guarantee', 'Built to last, guaranteed'],
              ['Dutch craftsmanship', 'Made in our own workshop'],
            ].map(([title, sub]) => (
              <div key={title} style={{ padding: '22px 32px', borderRight: '1px solid rgba(255,255,255,0.1)' }}>
                <div style={{ ...T.ui, fontSize: 14, color: C.white }}>{title}</div>
                <div style={{ ...T.body, fontSize: 13, color: 'rgba(255,255,255,0.6)', marginTop: 3 }}>{sub}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* FEATURED PRODUCTS */}
      <div style={{ padding: '96px 0 80px' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 48px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 48 }}>
            <div>
              <div style={{ ...T.label, color: C.wood, marginBottom: 10 }}>Our collection</div>
              <div style={{ ...T.display, fontSize: 42, color: C.text }}>Bestselling tables</div>
            </div>
            <Btn variant="outline" onClick={() => onNavigate('shop')}>View all products</Btn>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 28 }}>
            {products.map(p => <ProductCard key={p.name} {...p} onNavigate={onNavigate} />)}
          </div>
        </div>
      </div>

      {/* CRAFT / ABOUT STRIP */}
      <div style={{ background: C.surface }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 48px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 0, alignItems: 'stretch', minHeight: 520 }}>
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '80px 72px 80px 0' }}>
              <div style={{ ...T.label, color: C.wood, marginBottom: 14 }}>About WJ Houtbouw</div>
              <div style={{ ...T.display, fontSize: 44, color: C.text, lineHeight: 1.1, marginBottom: 24 }}>
                Every joint,<br />
                <span style={{ ...T.headingItalic, fontWeight: 400 }}>hand-fitted.</span>
              </div>
              <div style={{ ...T.body, fontSize: 16, color: C.muted, lineHeight: 1.75, maxWidth: 420 }}>
                Since 2009, we've been building outdoor furniture the old way — slow, careful, and without compromise. Our workshop in Gelderland processes timber the day it arrives, and every table leaves with our name on it.
              </div>
              <div style={{ marginTop: 32 }}>
                <Btn variant="outline" onClick={() => onNavigate('about')}>Meet the team</Btn>
              </div>
            </div>
            <div style={{ position: 'relative' }}>
              <Img label="workshop — craftsman at work, timber joinery" style={{ height: '100%', aspectRatio: 'unset', position: 'absolute', inset: 0 }} />
            </div>
          </div>
        </div>
      </div>

      {/* MATERIALS STRIP */}
      <div style={{ padding: '88px 0' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 48px' }}>
          <div style={{ textAlign: 'center', marginBottom: 56 }}>
            <div style={{ ...T.label, color: C.muted, marginBottom: 10 }}>What we build with</div>
            <div style={{ ...T.display, fontSize: 38, color: C.text }}>Three exceptional timbers</div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 2 }}>
            {[
              { name: 'Douglas Fir', desc: 'Warm, strong, and naturally resinous. Used in our Classic Picnic Table and Garden Bench — our most popular timber for its durability and classic look.', note: 'From €349' },
              { name: 'European Oak', desc: 'Dense grain and outstanding weather resistance. The timber we chose for our Round Garden Table — our premium option for those who want it all.', note: 'From €849' },
              { name: 'FSC Certified', desc: 'Both timbers are sourced exclusively from FSC-certified European forests managed for long-term sustainability. Same supplier since 2009.', note: 'Both products' },
            ].map((m, i) => (
              <div key={m.name} style={{ background: i === 1 ? C.green : C.surface, padding: '48px 40px', position: 'relative', overflow: 'hidden' }}>
                <Img label={`${m.name} timber texture`} height={120} style={{ marginBottom: 24, opacity: 0.7 }} dark={i === 1} />
                <div style={{ ...T.label, color: i === 1 ? 'rgba(255,255,255,0.5)' : C.wood, marginBottom: 10 }}>0{i + 1}</div>
                <div style={{ ...T.heading, fontSize: 24, color: i === 1 ? C.white : C.text, marginBottom: 12 }}>{m.name}</div>
                <div style={{ ...T.body, fontSize: 14, color: i === 1 ? 'rgba(255,255,255,0.65)' : C.muted, lineHeight: 1.7, marginBottom: 20 }}>{m.desc}</div>
                <div style={{ ...T.ui, fontSize: 13, color: i === 1 ? C.wood : C.green }}>{m.note}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* TESTIMONIALS */}
      <div style={{ background: C.dark, padding: '88px 0' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 48px' }}>
          <div style={{ ...T.label, color: '#6B6058', textAlign: 'center', marginBottom: 12 }}>Customer reviews</div>
          <div style={{ ...T.display, fontSize: 38, color: C.white, textAlign: 'center', marginBottom: 56 }}>What our customers say</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 32 }}>
            {testimonials.map(t => (
              <div key={t.name} style={{ background: '#1E1B18', padding: '36px 32px', border: '1px solid #2A2520' }}>
                <div style={{ display: 'flex', gap: 3, marginBottom: 20 }}>
                  {[1,2,3,4,5].map(i => <div key={i} style={{ width: 14, height: 14, background: C.wood, clipPath: 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)' }} />)}
                </div>
                <div style={{ ...T.headingItalic, fontSize: 17, color: '#D5CFC7', lineHeight: 1.65, marginBottom: 24 }}>"{t.quote}"</div>
                <div style={{ ...T.ui, fontSize: 13, color: C.white }}>{t.name}</div>
                <div style={{ ...T.body, fontSize: 12, color: '#6B6058', marginTop: 2 }}>{t.location}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* BLOG PREVIEW */}
      <div style={{ padding: '88px 0' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 48px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 48 }}>
            <div>
              <div style={{ ...T.label, color: C.wood, marginBottom: 10 }}>From the workshop</div>
              <div style={{ ...T.display, fontSize: 38, color: C.text }}>Latest from the journal</div>
            </div>
            <Btn variant="outline" onClick={() => onNavigate('blog')}>All articles</Btn>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 32 }}>
            {posts.map((p, i) => (
              <div key={p.title} onClick={() => onNavigate('blogpost')} style={{ cursor: 'pointer' }}>
                <Img label={`blog — ${p.title}`} aspect={i === 0 ? '16/9' : '16/9'} style={{ marginBottom: 20 }} />
                <div style={{ ...T.label, color: C.wood, marginBottom: 8 }}>{p.category}</div>
                <div style={{ ...T.heading, fontSize: 19, color: C.text, lineHeight: 1.4, marginBottom: 10 }}>{p.title}</div>
                <div style={{ ...T.body, fontSize: 13, color: C.muted }}>{p.date}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA BANNER */}
      <div style={{ background: C.wood, padding: '80px 48px', textAlign: 'center' }}>
        <div style={{ ...T.display, fontSize: 46, color: C.white, marginBottom: 16 }}>Ready to order?</div>
        <div style={{ ...T.body, fontSize: 17, color: 'rgba(254,252,249,0.78)', marginBottom: 36 }}>Configure your table online or call us for a custom quote.</div>
        <div style={{ display: 'flex', gap: 16, justifyContent: 'center' }}>
          <Btn size="lg" variant="dark" onClick={() => onNavigate('shop')}>Browse the shop</Btn>
          <Btn size="lg" onClick={() => onNavigate('contact')} style={{ background: 'transparent', border: '2px solid rgba(254,252,249,0.6)', color: C.white }}>Get in touch</Btn>
        </div>
      </div>

    </div>
  );
}

window.HomePage = HomePage;
