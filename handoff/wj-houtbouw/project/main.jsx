
// Main App — routing, page switcher, tweaks
const { useState, useEffect } = React;

const PAGES = [
  { id: 'home', label: 'Home' },
  { id: 'shop', label: 'Shop' },
  { id: 'product', label: 'Single Product' },
  { id: 'cart', label: 'Cart' },
  { id: 'checkout', label: 'Checkout' },
  { id: 'account', label: 'My Account' },
  { id: 'blog', label: 'Blog' },
  { id: 'blogpost', label: 'Blog Post' },
  { id: 'about', label: 'About' },
  { id: 'contact', label: 'Contact' },
  { id: 'legal', label: 'Privacy / Terms' },
  { id: 'notfound', label: '404' },
];

function PageSwitcher({ current, onNavigate }) {
  const { C, T } = window;
  const [open, setOpen] = useState(false);
  const currentPage = PAGES.find(p => p.id === current);

  return (
    <div style={{ position: 'fixed', bottom: 28, right: 28, zIndex: 9999, fontFamily: "'DM Sans', system-ui, sans-serif" }}>
      {open && (
        <div style={{ position: 'absolute', bottom: 52, right: 0, background: '#1A1410', border: '1px solid #2A2520', width: 220, boxShadow: '0 16px 48px rgba(0,0,0,0.3)', overflow: 'hidden' }}>
          <div style={{ padding: '12px 16px', borderBottom: '1px solid #2A2520', fontSize: 10, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#6B6058', fontWeight: 600 }}>
            Pages ({PAGES.length})
          </div>
          {PAGES.map(p => (
            <button key={p.id} onClick={() => { onNavigate(p.id); setOpen(false); }}
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', padding: '11px 16px', background: p.id === current ? '#2B4D1A' : 'transparent', border: 'none', borderBottom: '1px solid #2A2520', cursor: 'pointer', textAlign: 'left', fontSize: 13, color: p.id === current ? '#FEFCF9' : '#9A8F85', fontFamily: 'inherit' }}>
              {p.label}
              {p.id === current && <span style={{ fontSize: 10, color: '#C4843A' }}>current</span>}
            </button>
          ))}
        </div>
      )}
      <button onClick={() => setOpen(!open)}
        style={{ display: 'flex', alignItems: 'center', gap: 8, background: '#1A1410', border: '1px solid #2A2520', color: '#FEFCF9', padding: '10px 16px', cursor: 'pointer', fontSize: 13, fontFamily: 'inherit', boxShadow: '0 4px 16px rgba(0,0,0,0.25)', fontWeight: 500 }}>
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <rect x="1" y="2" width="12" height="1.5" fill="#9A8F85"/>
          <rect x="1" y="6.25" width="12" height="1.5" fill="#9A8F85"/>
          <rect x="1" y="10.5" width="12" height="1.5" fill="#9A8F85"/>
        </svg>
        {currentPage?.label}
        <span style={{ color: '#6B6058', fontSize: 11 }}>{open ? '↓' : '↑'}</span>
      </button>
    </div>
  );
}

function App() {
  const [page, setPage] = useState('home');

  // Tweaks integration
  const tweaks = window.useTweaks && window.useTweaks({
    colorScheme: 'warm',
    roundedCards: false,
    compactNav: false,
  });

  // Scroll to top on page change
  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [page]);

  const navigate = (id) => setPage(id);

  const pageMap = {
    home: window.HomePage,
    shop: window.ShopPage,
    product: window.ProductPage,
    cart: window.CartPage,
    checkout: window.CheckoutPage,
    account: window.AccountPage,
    blog: window.BlogPage,
    blogpost: window.BlogPostPage,
    about: window.AboutPage,
    contact: window.ContactPage,
    legal: window.LegalPage,
    notfound: window.NotFoundPage,
  };

  const PageComponent = pageMap[page] || window.NotFoundPage;

  const showNav = page !== 'notfound';
  const showFooter = !['cart', 'checkout'].includes(page);

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {showNav && <window.Nav page={page} onNavigate={navigate} />}
      <main style={{ flex: 1 }}>
        <PageComponent onNavigate={navigate} />
      </main>
      {showFooter && <window.Footer onNavigate={navigate} />}
      <PageSwitcher current={page} onNavigate={navigate} />

      {/* Tweaks panel */}
      {window.TweaksPanel && tweaks && (
        <window.TweaksPanel tweaks={tweaks}>
          <window.TweakSection title="Layout">
            <window.TweakRadio id="colorScheme" label="Color scheme" options={['warm', 'cool', 'dark']} tweaks={tweaks} />
            <window.TweakToggle id="compactNav" label="Compact navigation" tweaks={tweaks} />
            <window.TweakToggle id="roundedCards" label="Rounded card corners" tweaks={tweaks} />
          </window.TweakSection>
        </window.TweaksPanel>
      )}
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
