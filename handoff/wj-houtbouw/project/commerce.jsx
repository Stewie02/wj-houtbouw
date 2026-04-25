
// CART, CHECKOUT, MY ACCOUNT pages

// CART PAGE (WooCommerce Blocks layout)
function CartPage({ onNavigate }) {
  const { C, T, Img, Btn, Tag } = window;
  const { useState } = React;

  const [qty1, setQty1] = useState(1);
  const [qty2, setQty2] = useState(1);
  const [coupon, setCoupon] = useState('');
  const [couponApplied, setCouponApplied] = useState(false);

  const subtotal = 649 * qty1 + 349 * qty2;
  const discount = couponApplied ? Math.round(subtotal * 0.1) : 0;
  const shipping = subtotal >= 500 ? 0 : 49;
  const total = subtotal - discount + shipping;

  const CartItem = ({ name, variant, price, qty, setQty, imgLabel }) => (
    <div style={{ display: 'grid', gridTemplateColumns: '96px 1fr auto', gap: 20, padding: '24px 0', borderBottom: `1px solid ${C.border}`, alignItems: 'center' }}>
      <Img label={imgLabel} aspect="1/1" style={{ border: `1px solid ${C.border}` }} />
      <div>
        <div style={{ ...T.heading, fontSize: 17, color: C.text, marginBottom: 4 }}>{name}</div>
        <div style={{ ...T.body, fontSize: 13, color: C.muted, marginBottom: 12 }}>{variant}</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 2, border: `1px solid ${C.border}`, width: 'fit-content', background: C.white }}>
          <button onClick={() => setQty(Math.max(1, qty - 1))} style={{ width: 36, height: 36, background: 'none', border: 'none', cursor: 'pointer', color: C.muted, fontSize: 16 }}>−</button>
          <span style={{ width: 36, textAlign: 'center', ...T.ui, fontSize: 14 }}>{qty}</span>
          <button onClick={() => setQty(qty + 1)} style={{ width: 36, height: 36, background: 'none', border: 'none', cursor: 'pointer', color: C.muted, fontSize: 16 }}>+</button>
        </div>
      </div>
      <div style={{ textAlign: 'right' }}>
        <div style={{ ...T.heading, fontSize: 18, color: C.text, marginBottom: 8 }}>€ {price * qty}</div>
        <button style={{ ...T.body, fontSize: 12, color: C.muted, background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'underline' }}>Remove</button>
      </div>
    </div>
  );

  return (
    <div style={{ background: C.bg, minHeight: '100vh' }}>
      <div style={{ background: C.surface, borderBottom: `1px solid ${C.border}`, padding: '28px 0' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 48px' }}>
          <div style={{ ...T.label, color: C.muted, marginBottom: 8 }}>
            <span onClick={() => onNavigate('home')} style={{ cursor: 'pointer' }}>Home</span> › Cart
          </div>
          <div style={{ ...T.display, fontSize: 38, color: C.text }}>Your cart</div>
        </div>
      </div>

      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '48px 48px 96px', display: 'grid', gridTemplateColumns: '1fr 380px', gap: 48, alignItems: 'start' }}>
        {/* CART ITEMS — WooCommerce Blocks */}
        <div>
          <div style={{ background: C.white, border: `1px solid ${C.border}`, padding: '0 28px' }}>
            {/* Header row */}
            <div style={{ display: 'grid', gridTemplateColumns: '96px 1fr auto', gap: 20, padding: '16px 0', borderBottom: `1px solid ${C.border}` }}>
              <div /><div style={{ ...T.label, color: C.muted }}>Product</div>
              <div style={{ ...T.label, color: C.muted }}>Total</div>
            </div>
            <CartItem name="Classic Picnic Table" variant="Douglas Fir · Natural · 180 cm" price={649} qty={qty1} setQty={setQty1} imgLabel="Classic Picnic Table" />
            <CartItem name="Garden Bench" variant="Douglas Fir · Natural · 180 cm" price={349} qty={qty2} setQty={setQty2} imgLabel="Garden Bench" />
          </div>

          {/* Coupon */}
          <div style={{ marginTop: 24, background: C.white, border: `1px solid ${C.border}`, padding: '20px 28px', display: 'flex', gap: 12, alignItems: 'center' }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={C.muted} strokeWidth="1.5"><path d="M9 14l6-6M10 9h.01M14 14h.01M3 9l4-4h10l4 4v6l-4 4H7L3 15V9z"/></svg>
            <input value={coupon} onChange={e => setCoupon(e.target.value)} placeholder="Discount code" style={{ flex: 1, border: 'none', outline: 'none', ...T.body, fontSize: 14, color: C.text, background: 'transparent' }} />
            <Btn size="sm" variant="outline" onClick={() => setCouponApplied(coupon.length > 0)}>Apply</Btn>
            {couponApplied && <span style={{ ...T.body, fontSize: 13, color: C.green }}>✓ 10% off applied</span>}
          </div>

          <div style={{ marginTop: 24 }}>
            <button onClick={() => onNavigate('shop')} style={{ ...T.ui, fontSize: 13, color: C.muted, background: 'none', border: 'none', cursor: 'pointer' }}>← Continue shopping</button>
          </div>
        </div>

        {/* ORDER SUMMARY */}
        <div style={{ background: C.white, border: `1px solid ${C.border}`, padding: '28px' }}>
          <div style={{ ...T.heading, fontSize: 20, color: C.text, marginBottom: 24, paddingBottom: 16, borderBottom: `1px solid ${C.border}` }}>Order summary</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 20 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ ...T.body, fontSize: 14, color: C.muted }}>Subtotal ({qty1 + qty2} items)</span>
              <span style={{ ...T.ui, fontSize: 14, color: C.text }}>€ {subtotal}</span>
            </div>
            {couponApplied && (
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ ...T.body, fontSize: 14, color: C.green }}>Discount (10%)</span>
                <span style={{ ...T.ui, fontSize: 14, color: C.green }}>−€ {discount}</span>
              </div>
            )}
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ ...T.body, fontSize: 14, color: C.muted }}>Shipping</span>
              <span style={{ ...T.ui, fontSize: 14, color: shipping === 0 ? C.green : C.text }}>{shipping === 0 ? 'Free' : `€ ${shipping}`}</span>
            </div>
            {shipping > 0 && <div style={{ ...T.body, fontSize: 12, color: C.muted, background: C.greenLight, padding: '8px 12px' }}>Add € {500 - subtotal} more for free delivery</div>}
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', padding: '16px 0', borderTop: `1px solid ${C.border}`, marginBottom: 20 }}>
            <span style={{ ...T.heading, fontSize: 18, color: C.text }}>Total</span>
            <span style={{ ...T.display, fontSize: 22, color: C.text }}>€ {total}</span>
          </div>
          <Btn full size="lg" onClick={() => onNavigate('checkout')}>Proceed to checkout</Btn>
          <div style={{ marginTop: 16, display: 'flex', gap: 8, justifyContent: 'center' }}>
            {['iDeal', 'Visa', 'Mastercard', 'PayPal'].map(p => (
              <div key={p} style={{ ...T.label, fontSize: 9, color: C.muted, border: `1px solid ${C.border}`, padding: '4px 8px' }}>{p}</div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// CHECKOUT PAGE (WooCommerce Blocks)
function CheckoutPage({ onNavigate }) {
  const { C, T, Img, Btn } = window;
  const { useState } = React;
  const [step, setStep] = useState('checkout'); // checkout | confirm
  const [method, setMethod] = useState('ideal');
  const [shipMethod, setShipMethod] = useState('standard');

  if (step === 'confirm') return (
    <div style={{ background: C.bg, minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ textAlign: 'center', maxWidth: 520, padding: 48 }}>
        <div style={{ width: 72, height: 72, background: C.green, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 28px' }}>
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
        </div>
        <div style={{ ...T.display, fontSize: 42, color: C.text, marginBottom: 12 }}>Order confirmed!</div>
        <div style={{ ...T.body, fontSize: 16, color: C.muted, lineHeight: 1.7, marginBottom: 8 }}>Thank you for your order. You'll receive a confirmation email at <strong>jan@example.com</strong></div>
        <div style={{ ...T.label, color: C.muted, marginBottom: 32 }}>Order #WJ-2025-4821 · Estimated delivery: 3–5 business days</div>
        <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
          <Btn onClick={() => onNavigate('account')}>View my orders</Btn>
          <Btn variant="outline" onClick={() => onNavigate('shop')}>Continue shopping</Btn>
        </div>
      </div>
    </div>
  );

  const Field = ({ label, placeholder, half, type = 'text' }) => (
    <div style={{ gridColumn: half ? 'span 1' : 'span 2' }}>
      <label style={{ display: 'block', ...T.label, fontSize: 10, color: C.muted, marginBottom: 6 }}>{label}</label>
      <input type={type} placeholder={placeholder} style={{ width: '100%', padding: '11px 14px', border: `1px solid ${C.border}`, background: C.white, ...T.body, fontSize: 14, color: C.text, outline: 'none', boxSizing: 'border-box' }} />
    </div>
  );

  return (
    <div style={{ background: C.bg, minHeight: '100vh' }}>
      {/* Progress */}
      <div style={{ background: C.white, borderBottom: `1px solid ${C.border}` }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '20px 48px', display: 'flex', alignItems: 'center', gap: 8 }}>
          {['Cart', 'Checkout', 'Confirmation'].map((s, i) => (
            <React.Fragment key={s}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <div style={{ width: 26, height: 26, borderRadius: '50%', background: i <= 1 ? C.green : C.border, display: 'flex', alignItems: 'center', justifyContent: 'center', ...T.label, fontSize: 10, color: i <= 1 ? C.white : C.muted }}>
                  {i === 0 ? '✓' : i + 1}
                </div>
                <span style={{ ...T.ui, fontSize: 13, color: i === 1 ? C.text : C.muted }}>{s}</span>
              </div>
              {i < 2 && <div style={{ flex: 1, height: 1, background: C.border, maxWidth: 80 }} />}
            </React.Fragment>
          ))}
        </div>
      </div>

      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '40px 48px 96px', display: 'grid', gridTemplateColumns: '1fr 380px', gap: 48, alignItems: 'start' }}>
        {/* FORM */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>

          {/* Contact */}
          <div style={{ background: C.white, border: `1px solid ${C.border}`, padding: 28 }}>
            <div style={{ ...T.heading, fontSize: 18, color: C.text, marginBottom: 20 }}>Contact information</div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
              <Field label="First name" placeholder="Jan" half />
              <Field label="Last name" placeholder="de Vries" half />
              <Field label="Email address" placeholder="jan@example.com" type="email" />
              <Field label="Phone number" placeholder="+31 6 12 34 56 78" />
            </div>
          </div>

          {/* Shipping */}
          <div style={{ background: C.white, border: `1px solid ${C.border}`, padding: 28 }}>
            <div style={{ ...T.heading, fontSize: 18, color: C.text, marginBottom: 20 }}>Shipping address</div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
              <Field label="Street address" placeholder="Dorpsstraat 12" />
              <Field label="House number / addition" placeholder="12b" half />
              <Field label="Postcode" placeholder="6811 AA" half />
              <Field label="City" placeholder="Arnhem" />
              <div style={{ gridColumn: 'span 2' }}>
                <label style={{ display: 'block', ...T.label, fontSize: 10, color: C.muted, marginBottom: 6 }}>Country</label>
                <select style={{ width: '100%', padding: '11px 14px', border: `1px solid ${C.border}`, background: C.white, ...T.body, fontSize: 14, color: C.text, outline: 'none' }}>
                  <option>Netherlands</option><option>Belgium</option><option>Germany</option>
                </select>
              </div>
            </div>
          </div>

          {/* Shipping method */}
          <div style={{ background: C.white, border: `1px solid ${C.border}`, padding: 28 }}>
            <div style={{ ...T.heading, fontSize: 18, color: C.text, marginBottom: 20 }}>Shipping method</div>
            {[['standard', 'Standard delivery (3–5 days)', 'Free'],['express', 'Express delivery (1–2 days)', '€ 29']].map(([id, label, price]) => (
              <label key={id} onClick={() => setShipMethod(id)} style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '14px 16px', border: `1.5px solid ${shipMethod === id ? C.green : C.border}`, background: shipMethod === id ? C.greenLight : 'transparent', marginBottom: 10, cursor: 'pointer' }}>
                <div style={{ width: 18, height: 18, borderRadius: '50%', border: `2px solid ${shipMethod === id ? C.green : C.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  {shipMethod === id && <div style={{ width: 8, height: 8, borderRadius: '50%', background: C.green }} />}
                </div>
                <span style={{ ...T.body, fontSize: 14, color: C.text, flex: 1 }}>{label}</span>
                <span style={{ ...T.ui, fontSize: 14, color: price === 'Free' ? C.green : C.text }}>{price}</span>
              </label>
            ))}
          </div>

          {/* Payment */}
          <div style={{ background: C.white, border: `1px solid ${C.border}`, padding: 28 }}>
            <div style={{ ...T.heading, fontSize: 18, color: C.text, marginBottom: 20 }}>Payment method</div>
            {[['ideal', 'iDEAL'], ['card', 'Credit / Debit card'], ['paypal', 'PayPal'], ['invoice', 'Invoice (business)']].map(([id, label]) => (
              <label key={id} onClick={() => setMethod(id)} style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '14px 16px', border: `1.5px solid ${method === id ? C.green : C.border}`, background: method === id ? C.greenLight : 'transparent', marginBottom: 10, cursor: 'pointer' }}>
                <div style={{ width: 18, height: 18, borderRadius: '50%', border: `2px solid ${method === id ? C.green : C.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  {method === id && <div style={{ width: 8, height: 8, borderRadius: '50%', background: C.green }} />}
                </div>
                <span style={{ ...T.body, fontSize: 14, color: C.text }}>{label}</span>
              </label>
            ))}
            {method === 'card' && (
              <div style={{ marginTop: 16, padding: 20, background: C.surface, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                <Field label="Card number" placeholder="•••• •••• •••• ••••" />
                <Field label="Name on card" placeholder="J. de Vries" half />
                <Field label="Expiry" placeholder="MM / YY" half />
                <Field label="CVV" placeholder="•••" half />
              </div>
            )}
          </div>

          <Btn size="lg" full onClick={() => setStep('confirm')}>Place order — € 998</Btn>
          <div style={{ ...T.body, fontSize: 12, color: C.muted, textAlign: 'center' }}>
            By placing your order you agree to our <span style={{ color: C.green, cursor: 'pointer' }} onClick={() => onNavigate('legal')}>Terms & Conditions</span> and <span style={{ color: C.green, cursor: 'pointer' }} onClick={() => onNavigate('legal')}>Privacy Policy</span>.
          </div>
        </div>

        {/* ORDER SUMMARY */}
        <div style={{ background: C.white, border: `1px solid ${C.border}`, padding: 28, position: 'sticky', top: 88 }}>
          <div style={{ ...T.heading, fontSize: 18, color: C.text, marginBottom: 20, paddingBottom: 16, borderBottom: `1px solid ${C.border}` }}>Order summary</div>
          {[['Classic Picnic Table', 'Douglas Fir · Natural · 180 cm', '€ 649'], ['Garden Bench', 'Douglas Fir · Natural · 180 cm', '€ 349']].map(([name, variant, price]) => (
            <div key={name} style={{ display: 'grid', gridTemplateColumns: '64px 1fr auto', gap: 12, marginBottom: 16, alignItems: 'center' }}>
              <Img label={name} aspect="1/1" style={{ border: `1px solid ${C.border}` }} />
              <div>
                <div style={{ ...T.ui, fontSize: 13, color: C.text }}>{name}</div>
                <div style={{ ...T.body, fontSize: 12, color: C.muted }}>{variant}</div>
              </div>
              <div style={{ ...T.ui, fontSize: 14, color: C.text }}>{price}</div>
            </div>
          ))}
          <div style={{ borderTop: `1px solid ${C.border}`, paddingTop: 16, display: 'flex', flexDirection: 'column', gap: 10 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', ...T.body, fontSize: 14, color: C.muted }}><span>Subtotal</span><span>€ 998</span></div>
            <div style={{ display: 'flex', justifyContent: 'space-between', ...T.body, fontSize: 14, color: C.green }}><span>Shipping</span><span>Free</span></div>
            <div style={{ display: 'flex', justifyContent: 'space-between', ...T.heading, fontSize: 18, color: C.text, paddingTop: 10, borderTop: `1px solid ${C.border}` }}><span>Total</span><span>€ 998</span></div>
          </div>
        </div>
      </div>
    </div>
  );
}

// MY ACCOUNT PAGE
function AccountPage({ onNavigate }) {
  const { C, T, Btn } = window;
  const { useState } = React;
  const [tab, setTab] = useState('orders');

  const navItems = [
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'orders', label: 'Orders' },
    { id: 'addresses', label: 'Addresses' },
    { id: 'details', label: 'Account details' },
    { id: 'logout', label: 'Log out' },
  ];

  const orders = [
    { id: '#WJ-2025-4821', date: '18 April 2025', items: 'Classic Picnic Table, Garden Bench', total: '€ 998', status: 'Shipped' },
    { id: '#WJ-2024-3102', date: '3 August 2024', items: 'Round Garden Table', total: '€ 849', status: 'Delivered' },
    { id: '#WJ-2023-1887', date: '12 May 2023', items: 'Classic Picnic Table', total: '€ 649', status: 'Delivered' },
  ];

  const statusColor = { Shipped: C.wood, Delivered: C.green, Processing: C.muted };

  const Field = ({ label, value }) => (
    <div>
      <label style={{ display: 'block', ...T.label, fontSize: 10, color: C.muted, marginBottom: 6 }}>{label}</label>
      <input defaultValue={value} style={{ width: '100%', padding: '11px 14px', border: `1px solid ${C.border}`, background: C.white, ...T.body, fontSize: 14, color: C.text, outline: 'none', boxSizing: 'border-box' }} />
    </div>
  );

  return (
    <div style={{ background: C.bg, minHeight: '100vh' }}>
      <div style={{ background: C.surface, borderBottom: `1px solid ${C.border}`, padding: '40px 0 32px' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 48px' }}>
          <div style={{ ...T.label, color: C.muted, marginBottom: 10 }}>
            <span onClick={() => onNavigate('home')} style={{ cursor: 'pointer' }}>Home</span> › My Account
          </div>
          <div style={{ ...T.display, fontSize: 38, color: C.text }}>My Account</div>
          <div style={{ ...T.body, fontSize: 14, color: C.muted, marginTop: 6 }}>Welcome back, <strong style={{ color: C.text }}>Jan de Vries</strong></div>
        </div>
      </div>

      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '48px 48px 96px', display: 'grid', gridTemplateColumns: '220px 1fr', gap: 48 }}>
        {/* SIDEBAR NAV */}
        <aside>
          <div style={{ background: C.white, border: `1px solid ${C.border}` }}>
            {navItems.map((item, i) => (
              <button key={item.id} onClick={() => item.id !== 'logout' && setTab(item.id)}
                style={{ display: 'flex', alignItems: 'center', width: '100%', padding: '15px 20px', background: tab === item.id ? C.greenLight : 'transparent', border: 'none', borderBottom: i < navItems.length - 1 ? `1px solid ${C.border}` : 'none', cursor: 'pointer', borderLeft: tab === item.id ? `3px solid ${C.green}` : '3px solid transparent', ...T.ui, fontSize: 14, color: item.id === 'logout' ? C.muted : tab === item.id ? C.green : C.text, textAlign: 'left' }}>
                {item.label}
              </button>
            ))}
          </div>
        </aside>

        {/* CONTENT */}
        <div>
          {tab === 'dashboard' && (
            <div>
              <div style={{ ...T.heading, fontSize: 24, color: C.text, marginBottom: 24 }}>Dashboard</div>
              <div style={{ ...T.body, fontSize: 15, color: C.muted, lineHeight: 1.7, marginBottom: 32 }}>
                Hello, <strong style={{ color: C.text }}>Jan</strong>! From here you can manage your orders, edit your shipping addresses and update your account details.
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
                {[['3', 'Total orders'], ['1', 'Active shipments'], ['€ 2,496', 'Total spent']].map(([v, l]) => (
                  <div key={l} style={{ background: C.white, border: `1px solid ${C.border}`, padding: '24px 20px' }}>
                    <div style={{ ...T.display, fontSize: 32, color: C.green }}>{v}</div>
                    <div style={{ ...T.body, fontSize: 13, color: C.muted, marginTop: 4 }}>{l}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {tab === 'orders' && (
            <div>
              <div style={{ ...T.heading, fontSize: 24, color: C.text, marginBottom: 24 }}>My orders</div>
              <div style={{ background: C.white, border: `1px solid ${C.border}` }}>
                <div style={{ display: 'grid', gridTemplateColumns: '130px 1fr 1fr 100px 120px', gap: 16, padding: '12px 24px', background: C.surface, borderBottom: `1px solid ${C.border}` }}>
                  {['Order', 'Date', 'Items', 'Total', 'Status'].map(h => (
                    <div key={h} style={{ ...T.label, fontSize: 10, color: C.muted }}>{h}</div>
                  ))}
                </div>
                {orders.map((o, i) => (
                  <div key={o.id} style={{ display: 'grid', gridTemplateColumns: '130px 1fr 1fr 100px 120px', gap: 16, padding: '18px 24px', borderBottom: i < orders.length - 1 ? `1px solid ${C.border}` : 'none', alignItems: 'center' }}>
                    <div style={{ ...T.ui, fontSize: 13, color: C.green, cursor: 'pointer' }}>{o.id}</div>
                    <div style={{ ...T.body, fontSize: 13, color: C.text }}>{o.date}</div>
                    <div style={{ ...T.body, fontSize: 13, color: C.muted }}>{o.items}</div>
                    <div style={{ ...T.ui, fontSize: 14, color: C.text }}>{o.total}</div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <div style={{ width: 7, height: 7, borderRadius: '50%', background: statusColor[o.status] }} />
                      <span style={{ ...T.ui, fontSize: 12, color: statusColor[o.status] }}>{o.status}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {tab === 'addresses' && (
            <div>
              <div style={{ ...T.heading, fontSize: 24, color: C.text, marginBottom: 24 }}>Addresses</div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
                {['Billing address', 'Shipping address'].map(type => (
                  <div key={type} style={{ background: C.white, border: `1px solid ${C.border}`, padding: 28 }}>
                    <div style={{ ...T.heading, fontSize: 16, color: C.text, marginBottom: 16, paddingBottom: 14, borderBottom: `1px solid ${C.border}` }}>{type}</div>
                    <div style={{ ...T.body, fontSize: 14, color: C.text, lineHeight: 1.75 }}>
                      Jan de Vries<br />Dorpsstraat 12b<br />6811 AA Arnhem<br />Netherlands
                    </div>
                    <button style={{ marginTop: 20, ...T.ui, fontSize: 12, color: C.green, background: 'none', border: `1px solid ${C.border}`, padding: '8px 16px', cursor: 'pointer' }}>Edit address</button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {tab === 'details' && (
            <div>
              <div style={{ ...T.heading, fontSize: 24, color: C.text, marginBottom: 24 }}>Account details</div>
              <div style={{ background: C.white, border: `1px solid ${C.border}`, padding: 32 }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 28 }}>
                  <Field label="First name" value="Jan" />
                  <Field label="Last name" value="de Vries" />
                  <Field label="Email address" value="jan@example.com" />
                  <Field label="Phone" value="+31 6 12 34 56 78" />
                </div>
                <div style={{ borderTop: `1px solid ${C.border}`, paddingTop: 24, marginBottom: 24 }}>
                  <div style={{ ...T.heading, fontSize: 16, color: C.text, marginBottom: 16 }}>Change password</div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
                    <Field label="Current password" value="" />
                    <div />
                    <Field label="New password" value="" />
                    <Field label="Confirm new password" value="" />
                  </div>
                </div>
                <Btn onClick={() => {}}>Save changes</Btn>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

window.CartPage = CartPage;
window.CheckoutPage = CheckoutPage;
window.AccountPage = AccountPage;
