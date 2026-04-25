
// SHOP PAGE + SINGLE PRODUCT PAGE
function ShopPage({ onNavigate }) {
  const { C, T, Img, Btn, Tag } = window;
  const { useState } = React;
  const [finish, setFinish] = useState('Natural');
  const finishes = ['Natural', 'Grey wash', 'Dark stain', 'Oiled'];

  const products = [
    {
      name: 'Classic Picnic Table',
      tagline: 'Our most popular model. Seats 6–8. Available in four lengths.',
      material: 'Douglas Fir',
      sizes: ['140 cm', '180 cm', '220 cm', '240 cm'],
      priceFrom: 549,
      tag: 'Bestseller',
      features: ['Mortise & tenon joinery', 'FSC-certified timber', 'Arrives flat-packed', '10-year guarantee'],
      imgLabel: 'Classic Picnic Table — in garden, lifestyle shot',
    },
    {
      name: 'Round Garden Table',
      tagline: 'A contemporary round table for four. No head of the table.',
      material: 'European Oak',
      sizes: ['120 cm ø'],
      priceFrom: 849,
      tag: null,
      features: ['Dense-grain European oak', 'Central pedestal base', 'Weather-resistant oil finish', '10-year guarantee'],
      imgLabel: 'Round Garden Table — on terrace, overhead angle',
    },
    {
      name: 'Garden Bench',
      tagline: 'Built to match the Classic Picnic Table or stand alone.',
      material: 'Douglas Fir',
      sizes: ['140 cm', '180 cm', '220 cm'],
      priceFrom: 349,
      tag: null,
      features: ['Matching joinery to the table', 'Available with or without backrest', 'FSC-certified timber', '10-year guarantee'],
      imgLabel: 'Garden Bench — standalone in garden setting',
    },
  ];

  return (
    <div style={{ background: C.bg, minHeight: '100vh' }}>

      {/* PAGE HEADER */}
      <div style={{ background: C.dark, padding: '56px 0 48px' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 48px' }}>
          <div style={{ ...T.label, color: '#6B6058', marginBottom: 12 }}>
            <span onClick={() => onNavigate('home')} style={{ cursor: 'pointer' }}>Home</span>
            <span style={{ margin: '0 8px' }}>›</span>Shop
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48, alignItems: 'end' }}>
            <div>
              <div style={{ ...T.display, fontSize: 52, color: C.white, lineHeight: 1.08 }}>
                Three products.<br />
                <span style={{ ...T.headingItalic, color: C.wood, fontWeight: 400 }}>Built properly.</span>
              </div>
            </div>
            <div style={{ ...T.body, fontSize: 15, color: 'rgba(254,252,249,0.6)', lineHeight: 1.75 }}>
              We don't make dozens of products. We make three — and we've been refining each of them since 2009. Every size, finish, and configuration ships from our own workshop in Arnhem.
            </div>
          </div>
        </div>
      </div>



      {/* PRODUCT LIST — editorial layout */}
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '64px 48px 96px' }}>
        {products.map((p, i) => (
          <div key={p.name} style={{
            display: 'grid',
            gridTemplateColumns: i % 2 === 0 ? '1fr 1fr' : '1fr 1fr',
            gap: 0,
            marginBottom: 4,
            border: `1px solid ${C.border}`,
            background: C.white,
            overflow: 'hidden',
          }}>
            {/* Image side */}
            <div style={{ order: i % 2 === 0 ? 0 : 1, position: 'relative' }}>
              <Img
                label={`${p.imgLabel} · ${finish} finish`}
                style={{ height: 500, aspectRatio: 'unset', position: 'absolute', inset: 0 }}
              />
              {p.tag && (
                <div style={{ position: 'absolute', top: 20, left: 20 }}>
                  <Tag>{p.tag}</Tag>
                </div>
              )}
            </div>

            {/* Info side */}
            <div style={{ order: i % 2 === 0 ? 1 : 0, padding: '52px 52px', display: 'flex', flexDirection: 'column', justifyContent: 'center', minHeight: 500 }}>
              <div style={{ ...T.label, color: C.wood, marginBottom: 10 }}>{p.material}</div>
              <h2 style={{ ...T.display, fontSize: 40, color: C.text, marginBottom: 12, lineHeight: 1.1 }}>{p.name}</h2>
              <p style={{ ...T.body, fontSize: 16, color: C.muted, lineHeight: 1.7, marginBottom: 28 }}>{p.tagline}</p>

              {/* Features */}
              <div style={{ marginBottom: 28 }}>
                {p.features.map(f => (
                  <div key={f} style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
                    <div style={{ width: 6, height: 6, background: C.green, flexShrink: 0 }} />
                    <span style={{ ...T.body, fontSize: 14, color: C.text }}>{f}</span>
                  </div>
                ))}
              </div>

              {/* Sizes */}
              <div style={{ marginBottom: 32 }}>
                <div style={{ ...T.label, fontSize: 10, color: C.muted, marginBottom: 10 }}>Available sizes</div>
                <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                  {p.sizes.map(s => (
                    <span key={s} style={{ ...T.ui, fontSize: 12, padding: '5px 12px', border: `1px solid ${C.border}`, color: C.text }}>{s}</span>
                  ))}
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ ...T.label, fontSize: 10, color: C.muted, marginBottom: 4 }}>Starting from</div>
                  <div style={{ ...T.display, fontSize: 34, color: C.green }}>€ {p.priceFrom}</div>
                </div>
                <Btn size="lg" onClick={() => onNavigate('product')}>Configure & order</Btn>
              </div>
            </div>
          </div>
        ))}

        {/* CUSTOM / BESPOKE CTA */}
        <div style={{ marginTop: 4, background: C.surface, border: `1px solid ${C.border}`, padding: '52px 56px', display: 'grid', gridTemplateColumns: '1fr auto', gap: 48, alignItems: 'center' }}>
          <div>
            <div style={{ ...T.label, color: C.wood, marginBottom: 10 }}>Need something different?</div>
            <div style={{ ...T.heading, fontSize: 28, color: C.text, marginBottom: 10 }}>Custom sizes and configurations</div>
            <div style={{ ...T.body, fontSize: 15, color: C.muted, lineHeight: 1.7, maxWidth: 560 }}>
              All three products are available in custom lengths up to 300 cm, with optional backrest benches, custom finish colours, and engraving. Contact us for a tailored quote — turnaround is typically 3–4 weeks.
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, flexShrink: 0 }}>
            <Btn size="lg" onClick={() => onNavigate('contact')}>Request a custom quote</Btn>
            <Btn size="lg" variant="outline" onClick={() => onNavigate('about')}>Visit our workshop</Btn>
          </div>
        </div>

        {/* GUARANTEE STRIP */}
        <div style={{ marginTop: 4, display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 0 }}>
          {[
            ['10-year guarantee', 'On all structural defects. No questions asked.'],
            ['Free delivery', 'On orders over €500 within the Netherlands.'],
            ['Dutch-made', 'Every product built in our Arnhem workshop.'],
            ['FSC-certified', 'All timber from sustainably managed forests.'],
          ].map(([title, body], i) => (
            <div key={title} style={{ background: i % 2 === 0 ? C.green : C.greenLight, padding: '32px 28px', borderLeft: i > 0 ? '1px solid rgba(255,255,255,0.08)' : 'none' }}>
              <div style={{ ...T.heading, fontSize: 16, color: i % 2 === 0 ? C.white : C.green, marginBottom: 8 }}>{title}</div>
              <div style={{ ...T.body, fontSize: 13, color: i % 2 === 0 ? 'rgba(255,255,255,0.65)' : C.muted, lineHeight: 1.6 }}>{body}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// SINGLE PRODUCT PAGE
function ProductPage({ onNavigate }) {
  const { C, T, Img, Btn, Tag } = window;
  const { useState } = React;
  const [activeImg, setActiveImg] = useState(0);
  const [size, setSize] = useState('180 cm');
  const [finish, setFinish] = useState('Natural');
  const [qty, setQty] = useState(1);
  const [activeTab, setActiveTab] = useState('description');
  const sizes = ['140 cm', '180 cm', '220 cm', '240 cm'];
  const finishes = ['Natural', 'Grey wash', 'Dark stain', 'Oiled'];
  const thumbs = ['Main product shot', 'Detail — joint', 'In garden setting', 'Size comparison'];

  return (
    <div style={{ background: C.bg }}>
      {/* BREADCRUMB */}
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '20px 48px' }}>
        <div style={{ ...T.label, fontSize: 11, color: C.muted }}>
          <span onClick={() => onNavigate('home')} style={{ cursor: 'pointer' }}>Home</span>
          <span style={{ margin: '0 8px' }}>›</span>
          <span onClick={() => onNavigate('shop')} style={{ cursor: 'pointer' }}>Shop</span>
          <span style={{ margin: '0 8px' }}>›</span>
          <span>Classic Picnic Table</span>
        </div>
      </div>

      {/* MAIN PRODUCT LAYOUT */}
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 48px 80px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 72, alignItems: 'start' }}>

        {/* GALLERY */}
        <div>
          <div style={{ marginBottom: 12 }}>
            <Img label={thumbs[activeImg]} aspect="1/1" style={{ border: `1px solid ${C.border}` }} />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8 }}>
            {thumbs.map((t, i) => (
              <div key={i} onClick={() => setActiveImg(i)} style={{ cursor: 'pointer', border: `2px solid ${activeImg === i ? C.green : C.border}`, overflow: 'hidden' }}>
                <Img label={t} aspect="1/1" />
              </div>
            ))}
          </div>
        </div>

        {/* INFO */}
        <div style={{ paddingTop: 8 }}>
          <div style={{ display: 'flex', gap: 8, marginBottom: 14 }}>
            <Tag>Bestseller</Tag>
            <Tag color={C.woodLight} style={{ color: C.wood }}>In stock</Tag>
          </div>
          <h1 style={{ ...T.display, fontSize: 40, color: C.text, marginBottom: 8, margin: 0 }}>Classic Picnic Table</h1>
          <div style={{ ...T.label, color: C.muted, marginTop: 6, marginBottom: 16 }}>Douglas Fir · FSC Certified</div>

          {/* Rating */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 24 }}>
            <div style={{ display: 'flex', gap: 3 }}>
              {[1,2,3,4,5].map(i => <div key={i} style={{ width: 14, height: 14, background: C.wood, clipPath: 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)' }} />)}
            </div>
            <span style={{ ...T.body, fontSize: 13, color: C.muted }}>4.9 · 124 reviews</span>
          </div>

          <div style={{ ...T.display, fontSize: 38, color: C.green, marginBottom: 28 }}>€ 649</div>
          <div style={{ ...T.body, fontSize: 15, color: C.muted, lineHeight: 1.75, marginBottom: 32 }}>
            Our most popular model — the Classic 180 seats 6 comfortably and is built from FSC-certified Douglas Fir with mortise-and-tenon joinery. Arrives ready to assemble in under 20 minutes.
          </div>

          {/* Size selector */}
          <div style={{ marginBottom: 24 }}>
            <div style={{ ...T.label, color: C.text, marginBottom: 12 }}>Table length: <span style={{ color: C.green }}>{size}</span></div>
            <div style={{ display: 'flex', gap: 8 }}>
              {sizes.map(s => (
                <button key={s} onClick={() => setSize(s)}
                  style={{ padding: '10px 18px', border: `1.5px solid ${size === s ? C.green : C.border}`, background: size === s ? C.greenLight : 'transparent', cursor: 'pointer', ...T.ui, fontSize: 13, color: size === s ? C.green : C.text }}>
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Finish selector */}
          <div style={{ marginBottom: 32 }}>
            <div style={{ ...T.label, color: C.text, marginBottom: 12 }}>Finish: <span style={{ color: C.green }}>{finish}</span></div>
            <div style={{ display: 'flex', gap: 8 }}>
              {finishes.map(f => (
                <button key={f} onClick={() => setFinish(f)}
                  style={{ padding: '10px 16px', border: `1.5px solid ${finish === f ? C.green : C.border}`, background: finish === f ? C.greenLight : 'transparent', cursor: 'pointer', ...T.ui, fontSize: 13, color: finish === f ? C.green : C.text }}>
                  {f}
                </button>
              ))}
            </div>
          </div>

          {/* Qty + Add to cart */}
          <div style={{ display: 'flex', gap: 12, marginBottom: 16 }}>
            <div style={{ display: 'flex', alignItems: 'center', border: `1.5px solid ${C.border}`, background: C.white }}>
              <button onClick={() => setQty(Math.max(1, qty - 1))} style={{ width: 44, height: 52, background: 'none', border: 'none', cursor: 'pointer', ...T.ui, fontSize: 18, color: C.muted }}>−</button>
              <div style={{ width: 48, textAlign: 'center', ...T.ui, fontSize: 15, color: C.text }}>{qty}</div>
              <button onClick={() => setQty(qty + 1)} style={{ width: 44, height: 52, background: 'none', border: 'none', cursor: 'pointer', ...T.ui, fontSize: 18, color: C.muted }}>+</button>
            </div>
            <Btn size="lg" full onClick={() => onNavigate('cart')} style={{ flex: 1 }}>Add to cart — € {649 * qty}</Btn>
          </div>
          <Btn variant="outline" full onClick={() => {}}>Add to wishlist</Btn>

          {/* Meta */}
          <div style={{ marginTop: 32, padding: '20px 0', borderTop: `1px solid ${C.border}`, display: 'flex', flexDirection: 'column', gap: 8 }}>
            {[['SKU', 'WJ-CP-DF'], ['Material', 'Douglas Fir (FSC)'], ['Dimensions', '180 × 74 × 76 cm'], ['Weight', '38 kg'], ['Delivery', '3–5 business days']].map(([k, v]) => (
              <div key={k} style={{ display: 'flex', gap: 16 }}>
                <span style={{ ...T.label, fontSize: 10, color: C.muted, width: 90, flexShrink: 0, paddingTop: 2 }}>{k}</span>
                <span style={{ ...T.body, fontSize: 14, color: C.text }}>{v}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* TABS */}
      <div style={{ borderTop: `1px solid ${C.border}`, background: C.white }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 48px' }}>
          <div style={{ display: 'flex', gap: 0, borderBottom: `1px solid ${C.border}` }}>
            {[['description', 'Description'], ['specs', 'Technical specs'], ['reviews', 'Reviews (124)'], ['care', 'Care guide']].map(([id, label]) => (
              <button key={id} onClick={() => setActiveTab(id)}
                style={{ padding: '18px 28px', ...T.ui, fontSize: 14, background: 'none', border: 'none', cursor: 'pointer', color: activeTab === id ? C.green : C.muted, borderBottom: activeTab === id ? `2px solid ${C.green}` : '2px solid transparent', marginBottom: -1 }}>
                {label}
              </button>
            ))}
          </div>
          <div style={{ padding: '48px 0', maxWidth: 720 }}>
            {activeTab === 'description' && (
              <div style={{ ...T.body, fontSize: 15, color: C.muted, lineHeight: 1.8 }}>
                <p>The Classic Picnic Table is the cornerstone of our collection. Built using traditional mortise-and-tenon joinery — no bolts through the top — it is both structurally superior and visually clean.</p>
                <p style={{ marginTop: 16 }}>Douglas Fir is our entry-level timber, but don't let the name fool you: it's naturally resinous and weather-resistant, with a characteristic warm grain. Untreated, it weathers to a beautiful silver-grey. Oiled, it holds its honey colour indefinitely.</p>
                <p style={{ marginTop: 16 }}>Delivered flat-packed with four bolts per bench attachment, fully assembled in under 20 minutes.</p>
              </div>
            )}
            {activeTab === 'specs' && (
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <tbody>
                  {[['Total length', '180 cm'], ['Table width', '74 cm', ], ['Seat height', '45 cm'], ['Table height', '76 cm'], ['Seat depth', '28 cm'], ['Weight', '38 kg'], ['Max. load', '500 kg'], ['Timber grade', 'Select, knot-free'], ['Joinery', 'Mortise & tenon + 4× bolt'], ['Treatment', 'None (natural) / WOCA oil']].map(([k, v]) => (
                    <tr key={k} style={{ borderBottom: `1px solid ${C.border}` }}>
                      <td style={{ padding: '12px 0', ...T.label, fontSize: 11, color: C.muted, width: 200 }}>{k}</td>
                      <td style={{ padding: '12px 0', ...T.body, fontSize: 14, color: C.text }}>{v}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
            {activeTab === 'reviews' && (
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 32, marginBottom: 40, padding: 32, background: C.surface }}>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ ...T.display, fontSize: 56, color: C.text }}>4.9</div>
                    <div style={{ ...T.label, color: C.muted, marginTop: 4 }}>of 5 · 124 reviews</div>
                  </div>
                  <div style={{ flex: 1 }}>
                    {[5,4,3,2,1].map(star => (
                      <div key={star} style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
                        <span style={{ ...T.label, fontSize: 11, color: C.muted, width: 20 }}>{star}★</span>
                        <div style={{ flex: 1, height: 6, background: C.border }}>
                          <div style={{ height: '100%', background: C.wood, width: star === 5 ? '88%' : star === 4 ? '9%' : '2%' }} />
                        </div>
                        <span style={{ ...T.body, fontSize: 12, color: C.muted, width: 30 }}>{star === 5 ? 109 : star === 4 ? 11 : 4}</span>
                      </div>
                    ))}
                  </div>
                </div>
                {[{name:'Jeroen V.', loc:'Rotterdam',text:'Perfect table. Heavy, solid, and the craftsmanship is excellent. Delivered in 4 days.'}, {name:'Anna M.', loc:'Bruges', text:'We ordered the grey wash finish — stunning. Looks incredible on our terrace.'}].map(r => (
                  <div key={r.name} style={{ paddingBottom: 28, marginBottom: 28, borderBottom: `1px solid ${C.border}` }}>
                    <div style={{ display: 'flex', gap: 3, marginBottom: 10 }}>
                      {[1,2,3,4,5].map(i => <div key={i} style={{ width: 12, height: 12, background: C.wood, clipPath: 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)' }} />)}
                    </div>
                    <div style={{ ...T.body, fontSize: 15, color: C.text, lineHeight: 1.65, marginBottom: 10 }}>{r.text}</div>
                    <div style={{ ...T.ui, fontSize: 13, color: C.muted }}>{r.name} · {r.loc}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* RELATED — only 2 other products */}
      <div style={{ padding: '80px 0', background: C.surface }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 48px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 40 }}>
            <div style={{ ...T.display, fontSize: 34, color: C.text }}>Complete your setup</div>
            <Btn variant="outline" onClick={() => onNavigate('shop')}>View all products</Btn>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32 }}>
            {[
              { name: 'Round Garden Table', price: '€ 849', material: 'European Oak', tag: null },
              { name: 'Garden Bench', price: 'From € 349', material: 'Douglas Fir', tag: null },
            ].map(p => (
              <div key={p.name} onClick={() => onNavigate('product')} style={{ cursor: 'pointer', background: C.white, border: `1px solid ${C.border}`, display: 'grid', gridTemplateColumns: '200px 1fr', overflow: 'hidden' }}>
                <Img label={p.name} style={{ height: '100%', aspectRatio: 'unset' }} />
                <div style={{ padding: '28px 28px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div>
                    <div style={{ ...T.label, color: C.muted, marginBottom: 6 }}>{p.material}</div>
                    <div style={{ ...T.heading, fontSize: 22, color: C.text, marginBottom: 8 }}>{p.name}</div>
                    <div style={{ ...T.display, fontSize: 26, color: C.green }}>{p.price}</div>
                  </div>
                  <div style={{ ...T.ui, fontSize: 13, color: C.green, marginTop: 16 }}>Configure & order →</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

window.ShopPage = ShopPage;
window.ProductPage = ProductPage;
