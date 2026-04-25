
// Shared constants, utilities, Nav, Footer
const { useState, useEffect, useRef } = React;

const C = {
  bg: '#F7F3EE',
  surface: '#EDE9E3',
  surfaceAlt: '#E4DED6',
  text: '#1A1410',
  muted: '#7B6F65',
  green: '#2B4D1A',
  greenHover: '#3A6624',
  greenLight: '#EBF0E6',
  wood: '#C4843A',
  woodLight: '#F5EAD9',
  border: '#D5CFC7',
  white: '#FEFCF9',
  dark: '#12100D',
};

const T = {
  display: { fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 700, letterSpacing: '-0.02em' },
  heading: { fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 600 },
  headingItalic: { fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 400, fontStyle: 'italic' },
  body: { fontFamily: "'DM Sans', system-ui, sans-serif", fontWeight: 400 },
  ui: { fontFamily: "'DM Sans', system-ui, sans-serif", fontWeight: 500 },
  label: { fontFamily: "'DM Sans', system-ui, sans-serif", fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', fontSize: 11 },
};

// Image placeholder
function Img({ label, aspect, height, style = {}, dark = false }) {
  const bg = dark
    ? `repeating-linear-gradient(45deg, #2a2520, #2a2520 2px, #1e1b18 2px, #1e1b18 14px)`
    : `repeating-linear-gradient(45deg, #DDD8D0, #DDD8D0 2px, #E8E3DC 2px, #E8E3DC 14px)`;
  const textColor = dark ? '#6B6058' : '#9A8F85';
  return (
    <div style={{
      width: '100%', aspectRatio: aspect, height, background: bg,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontSize: 11, fontFamily: 'monospace', color: textColor,
      letterSpacing: '0.08em', textTransform: 'uppercase', flexShrink: 0,
      ...style
    }}>{label || 'photo'}</div>
  );
}

// Button
function Btn({ children, variant = 'solid', size = 'md', onClick, style = {}, full }) {
  const [hov, setHov] = useState(false);
  const base = {
    display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
    cursor: 'pointer', border: 'none', outline: 'none',
    ...T.ui, letterSpacing: '0.04em',
    transition: 'all 0.18s',
    width: full ? '100%' : undefined,
  };
  const sizes = {
    sm: { padding: '8px 18px', fontSize: 13 },
    md: { padding: '13px 28px', fontSize: 14 },
    lg: { padding: '17px 38px', fontSize: 15 },
  };
  const variants = {
    solid: { background: hov ? C.greenHover : C.green, color: C.white },
    outline: { background: 'transparent', color: C.green, border: `1.5px solid ${C.green}` },
    ghost: { background: 'transparent', color: C.muted, border: 'none' },
    wood: { background: hov ? '#B5762E' : C.wood, color: C.white },
    dark: { background: hov ? '#2A2420' : C.dark, color: C.white },
  };
  return (
    <button
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      onClick={onClick}
      style={{ ...base, ...sizes[size], ...variants[variant], ...style }}
    >{children}</button>
  );
}

// Tag / badge
function Tag({ children, color = C.greenLight }) {
  return (
    <span style={{
      ...T.label, background: color, color: C.green,
      padding: '4px 10px', display: 'inline-block',
    }}>{children}</span>
  );
}

// Section wrapper
function Section({ children, bg, style = {}, id }) {
  return (
    <section id={id} style={{ background: bg || C.bg, ...style }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 48px', ...style.inner }}>
        {children}
      </div>
    </section>
  );
}

// Product card (used on Home, Shop, etc.)
function ProductCard({ name, price, material, tag, onNavigate }) {
  const [hov, setHov] = useState(false);
  return (
    <div
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      onClick={() => onNavigate('product')}
      style={{ cursor: 'pointer', background: C.white, border: `1px solid ${C.border}`, overflow: 'hidden', transition: 'box-shadow 0.2s', boxShadow: hov ? '0 8px 32px rgba(26,20,16,0.12)' : '0 2px 8px rgba(26,20,16,0.05)' }}
    >
      <div style={{ position: 'relative', overflow: 'hidden' }}>
        <Img label={name} aspect="4/3" style={{ transform: hov ? 'scale(1.03)' : 'scale(1)', transition: 'transform 0.4s' }} />
        {tag && <div style={{ position: 'absolute', top: 14, left: 14 }}><Tag>{tag}</Tag></div>}
      </div>
      <div style={{ padding: '20px 22px 22px' }}>
        {material && <div style={{ ...T.label, color: C.muted, marginBottom: 6 }}>{material}</div>}
        <div style={{ ...T.heading, fontSize: 18, color: C.text, marginBottom: 8 }}>{name}</div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ ...T.body, fontSize: 20, color: C.green, fontWeight: 600 }}>{price}</div>
          <div style={{ ...T.ui, fontSize: 12, color: C.muted, opacity: hov ? 1 : 0, transition: 'opacity 0.18s' }}>View product →</div>
        </div>
      </div>
    </div>
  );
}

// NAV
function Nav({ page, onNavigate }) {
  const [open, setOpen] = useState(false);
  const navLinks = [
    { id: 'shop', label: 'Shop' },
    { id: 'about', label: 'About' },
    { id: 'blog', label: 'Journal' },
    { id: 'contact', label: 'Contact' },
  ];
  return (
    <nav style={{ background: C.white, borderBottom: `1px solid ${C.border}`, position: 'sticky', top: 0, zIndex: 100 }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 48px', height: 72, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        {/* Logo */}
        <div onClick={() => onNavigate('home')} style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ width: 32, height: 32, background: C.green, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <rect x="2" y="8" width="14" height="2.5" fill={C.white}/>
              <rect x="4" y="4" width="10" height="2" fill={C.white} opacity="0.7"/>
              <rect x="6" y="12.5" width="2.5" height="4" fill={C.white}/>
              <rect x="9.5" y="12.5" width="2.5" height="4" fill={C.white}/>
            </svg>
          </div>
          <div>
            <div style={{ ...T.heading, fontSize: 17, color: C.text, lineHeight: 1.1 }}>WJ Houtbouw</div>
            <div style={{ ...T.label, fontSize: 9, color: C.muted }}>Outdoor Furniture</div>
          </div>
        </div>
        {/* Links */}
        <div style={{ display: 'flex', gap: 36 }}>
          {navLinks.map(l => (
            <button key={l.id} onClick={() => onNavigate(l.id)}
              style={{ ...T.ui, fontSize: 14, color: page === l.id ? C.green : C.text, background: 'none', border: 'none', cursor: 'pointer', padding: 0, borderBottom: page === l.id ? `2px solid ${C.green}` : '2px solid transparent', paddingBottom: 2 }}>
              {l.label}
            </button>
          ))}
        </div>
        {/* Right */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
          <button onClick={() => onNavigate('account')} style={{ background: 'none', border: 'none', cursor: 'pointer', color: C.muted, ...T.ui, fontSize: 13 }}>Account</button>
          <button onClick={() => onNavigate('cart')} style={{ position: 'relative', background: 'none', border: 'none', cursor: 'pointer', color: C.text }}>
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="1.6">
              <path d="M2 3h2.5l2.5 11h9l2-7H7"/>
              <circle cx="9" cy="18" r="1.2" fill="currentColor" stroke="none"/>
              <circle cx="15" cy="18" r="1.2" fill="currentColor" stroke="none"/>
            </svg>
            <div style={{ position: 'absolute', top: -4, right: -5, width: 16, height: 16, background: C.wood, borderRadius: '50%', ...T.label, fontSize: 9, color: C.white, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>2</div>
          </button>
          <Btn size="sm" onClick={() => onNavigate('shop')}>Shop now</Btn>
        </div>
      </div>
    </nav>
  );
}

// FOOTER
function Footer({ onNavigate }) {
  const cols = [
    { title: 'Shop', links: ['Picnic Tables', 'Garden Benches', 'Children\'s Furniture', 'Accessories', 'New arrivals'] },
    { title: 'Company', links: ['About us', 'Sustainability', 'Craftsmanship', 'Press'] },
    { title: 'Support', links: ['FAQ', 'Shipping & delivery', 'Returns', 'Care guide', 'Contact us'] },
    { title: 'Legal', links: ['Privacy Policy', 'Terms & Conditions', 'Cookie Policy'] },
  ];
  return (
    <footer style={{ background: C.dark, color: C.white }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '72px 48px 48px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr 1fr', gap: 48, marginBottom: 64 }}>
          {/* Brand col */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
              <div style={{ width: 36, height: 36, background: C.green, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg width="20" height="20" viewBox="0 0 18 18" fill="none">
                  <rect x="2" y="8" width="14" height="2.5" fill={C.white}/>
                  <rect x="4" y="4" width="10" height="2" fill={C.white} opacity="0.7"/>
                  <rect x="6" y="12.5" width="2.5" height="4" fill={C.white}/>
                  <rect x="9.5" y="12.5" width="2.5" height="4" fill={C.white}/>
                </svg>
              </div>
              <div style={{ ...T.heading, fontSize: 18, color: C.white }}>WJ Houtbouw</div>
            </div>
            <div style={{ ...T.body, fontSize: 14, color: '#9A8F85', lineHeight: 1.7, maxWidth: 240 }}>
              Handcrafted outdoor furniture built to last generations. Made in the Netherlands from sustainably sourced timber.
            </div>
            <div style={{ marginTop: 28, ...T.label, color: '#6B6058' }}>Follow us</div>
            <div style={{ display: 'flex', gap: 12, marginTop: 10 }}>
              {['Instagram', 'Pinterest', 'Facebook'].map(s => (
                <div key={s} style={{ ...T.label, fontSize: 10, color: '#9A8F85', border: '1px solid #3A3530', padding: '6px 10px', cursor: 'pointer' }}>{s}</div>
              ))}
            </div>
          </div>
          {cols.map(col => (
            <div key={col.title}>
              <div style={{ ...T.label, color: '#6B6058', marginBottom: 18 }}>{col.title}</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {col.links.map(l => (
                  <button key={l} onClick={() => col.title === 'Legal' ? onNavigate('legal') : undefined}
                    style={{ ...T.body, fontSize: 14, color: '#9A8F85', background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left', padding: 0 }}>{l}</button>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div style={{ borderTop: '1px solid #2A2520', paddingTop: 24, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ ...T.body, fontSize: 13, color: '#6B6058' }}>© 2025 WJ Houtbouw B.V. All rights reserved.</div>
          <div style={{ ...T.body, fontSize: 13, color: '#6B6058' }}>KVK 12345678 · Handmade in the Netherlands 🇳🇱</div>
        </div>
      </div>
    </footer>
  );
}

Object.assign(window, { C, T, Img, Btn, Tag, Section, ProductCard, Nav, Footer });
