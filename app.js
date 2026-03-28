/* ========================================
   SmartServe Kiosk — Application Logic
   Inclusive, Accessible, AI-Assisted
   ======================================== */

// Data now provided by db.js (APP_DATA)

// =============== STATE ===============

const state = {
    currentScreen: 'home',
    currentCategory: null,
    cart: [], // { id, name, price, emoji, qty }
    guidedMode: false,
    signLanguageMode: false,
    adaptiveMode: false,
    idleTimer: null,
    idleTimeout: 30000, // 30 seconds
    offerSlideIndex: 0,
    offerInterval: null,
    guidedStep: 0,
    interactionCount: 0,
    lastInteractionTime: Date.now(),
    razorpayKey: 'rzp_test_SWNJRxZV1t5lWd', // Public Test Key
};

// =============== DOM REFERENCES ===============

const $ = (sel) => document.querySelector(sel);
const $$ = (sel) => document.querySelectorAll(sel);

const dom = {
    app: $('#app'),
    statusTime: $('#statusTime'),
    langToggle: $('#langToggle'),

    // Screens
    screenHome: $('#screenHome'),
    screenMenu: $('#screenMenu'),
    screenCart: $('#screenCart'),
    screenPayment: $('#screenPayment'),

    // Home
    categoryGrid: $('#categoryGrid'),
    restaurantList: $('#restaurantList'),
    listCount: $('#listCount'),
    guidedToggle: $('#guidedToggle'),
    toggleSwitch: $('#toggleSwitch'),

    // Menu
    menuBackBtn: $('#menuBackBtn'),
    menuTitle: $('#menuTitle'),
    menuCartBtn: $('#menuCartBtn'),
    globalCartBtn: $('#globalCartBtn'),
    cartBadge: $('#cartBadge'),
    globalCartBadge: $('#globalCartBadge'),
    recommendedScroll: $('#recommendedScroll'),
    menuItemsList: $('#menuItemsList'),

    // Cart
    cartBackBtn: $('#cartBackBtn'),
    cartItemCount: $('#cartItemCount'),
    cartEmpty: $('#cartEmpty'),
    cartItemsWrap: $('#cartItemsWrap'),
    cartItemsList: $('#cartItemsList'),
    cartSubtotal: $('#cartSubtotal'),
    cartTax: $('#cartTax'),
    cartTotal: $('#cartTotal'),
    proceedPayBtn: $('#proceedPayBtn'),
    payBtnAmount: $('#payBtnAmount'),
    cartBrowseBtn: $('#cartBrowseBtn'),

    // Payment
    payBackBtn: $('#payBackBtn'),
    payAmount: $('#payAmount'),
    paymentContent: $('#paymentContent'),
    paymentProcessing: $('#paymentProcessing'),
    paymentSuccess: $('#paymentSuccess'),
    successOrderId: $('#successOrderId'),
    orderNumber: $('#orderNumber'),
    successAmount: $('#successAmount'),
    successDoneBtn: $('#successDoneBtn'),
    cardPayBtn: $('#cardPayBtn'),

    // Camera
    liveVideo: $('#liveVideo'),
    cameraPlaceholder: $('#cameraPlaceholder'),

    // ISL Gesture
    fabSign: $('#fabSign'),
    gestureOverlay: $('#gestureOverlay'),
    gestureClose: $('#gestureClose'),
    gestureValue: $('#gestureValue'),
    cameraPlaceholder: $('#cameraPlaceholder'),
    islGuidePopup: $('#islGuidePopup'),
    tooltipText: $('#tooltipText'),
    tooltipNext: $('#tooltipNext'),
    fabAI: $('#fabAI'),
    aiPanel: $('#aiPanel'),
    aiPanelClose: $('#aiPanelClose'),
    idleOverlay: $('#idleOverlay'),
    idleDismiss: $('#idleDismiss'),
    idleGuide: $('#idleGuide'),
    toastContainer: $('#toastContainer'),
};


// =============== INITIALIZATION ===============

function init() {
    renderHome();
    bindEvents();
    resetIdleTimer();
    showAIFab();
}

function updateClock() {
    const now = new Date();
    let h = now.getHours();
    const m = now.getMinutes().toString().padStart(2, '0');
    const ampm = h >= 12 ? 'PM' : 'AM';
    h = h % 12 || 12;
    dom.statusTime.textContent = `${h}:${m} ${ampm}`;
}


// =============== RENDER HOME ===============

function renderHome() {
    // Categories
    dom.categoryGrid.innerHTML = APP_DATA.categories.map(cat => `
        <div class="cat-item ${cat.id === 'all' ? 'active' : ''}" data-id="${cat.id}">
            <div class="cat-img-wrap"><img src="${cat.image}" alt="${cat.name}"></div>
            <span class="cat-name">${cat.name}</span>
        </div>
    `).join('');

    // Restaurants
    dom.listCount.textContent = `${APP_DATA.restaurants.length} RESTAURANTS DELIVERING TO YOU`;
    dom.restaurantList.innerHTML = APP_DATA.restaurants.map(r => `
        <div class="restaurant-card" data-id="${r.id}">
            <div class="rest-cover">
                <img src="${r.cover}" alt="${r.name}">
                <span class="rest-badge">${r.time}</span>
            </div>
            <div class="rest-info">
                <div class="rest-header-row">
                    <span class="rest-title">${r.name}</span>
                    <span class="rest-rating">⭐ ${r.rating}</span>
                </div>
                <div class="rest-meta">
                    <span>${r.tags.join(' • ')}</span>
                </div>
                <div class="rest-offer">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg> 
                    ${r.offer}
                </div>
            </div>
        </div>
    `).join('');

    // Bind Home clicks
    dom.restaurantList.querySelectorAll('.restaurant-card').forEach(card => {
        card.addEventListener('click', () => {
            openRestaurant(card.dataset.id);
        });
    });
}

// =============== MENU SELECTION ===============

function openRestaurant(id) {
    state.currentCategory = id;
    const data = APP_DATA.restaurants.find(r => r.id === id);
    if (!data) return;

    dom.menuTitle.textContent = data.name;
    renderMenuItems(data.menu);
    // document.getElementById('recommendedSection').style.display = 'none'; // hide generic recs
    updateCartBadge();
    navigateTo('menu');

    if (state.guidedMode) {
        setTimeout(() => showGuidedTooltip('Explore the menu and tap "+ Add" on items you like', dom.menuItemsList), 500);
    }
}


// =============== RENDER MENU ===============

// =============== SCREEN NAVIGATION ===============
function navigateTo(screen) {
    const screens = $$('.screen');
    const currentScreen = $(`.screen-${state.currentScreen}`);

    if (currentScreen) {
        currentScreen.classList.remove('active');
        currentScreen.classList.add('exit-left');
        setTimeout(() => {
            currentScreen.classList.remove('exit-left');
        }, 400);
    }

    setTimeout(() => {
        screens.forEach(s => {
            s.classList.remove('active', 'exit-left');
        });
        const target = $(`.screen-${screen}`);
        if (target) {
            target.classList.add('active');
            target.scrollTop = 0;
        }
    }, 100);

    state.currentScreen = screen;
    trackInteraction();
}

// =============== RENDER MENU ===============

function renderMenuItems(items) {
    dom.menuItemsList.innerHTML = items.map(item => {
        const cartItem = state.cart.find(c => c.id === item.id);
        const qty = cartItem ? cartItem.qty : 0;

        return `
        <div class="food-card" data-id="${item.id}">
            <div class="food-card-img" style="background: url('${item.image || ''}') center/cover; position:relative;">
                ${!item.image ? item.emoji || '🍽️' : ''}
                ${item.isHighProtein ? `<span class="rest-badge" style="background:var(--success);bottom:4px;top:auto;left:4px;">High Protein</span>` : ''}
            </div>
            <div class="food-card-info" style="flex:1;">
                <div style="display:flex;align-items:center;gap:6px;">
                    <span class="food-card-veg ${item.veg ? 'veg' : 'non-veg'}"></span>
                    <span class="food-card-name" style="font-weight:700;font-size:16px;">${item.name}</span>
                </div>
                <div class="food-card-desc" style="font-size:12px;color:var(--text-secondary);margin-top:2px;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;">${item.desc}</div>
                <div class="food-card-meta" style="margin-top:6px;">
                    <span class="food-card-price" style="font-weight:700; font-size:15px;">₹${item.price}</span>
                    ${item.originalPrice ? `<span style="text-decoration:line-through;color:var(--text-muted);font-size:12px;margin-left:4px;">₹${item.originalPrice}</span>` : ''}
                </div>
                
                ${item.nutrition ? `
                <div style="display:flex; gap:8px; margin-top:8px; font-size:11px; color:#aaa;">
                    <div>${item.nutrition.kcal} kcal</div>
                    <div>${item.nutrition.protein} protein</div>
                </div>` : ''}
            </div>

            ${qty > 0 ? `
                <div class="qty-control" style="position:static; display:flex; margin-left:auto; align-self:center;">
                    <button class="qty-btn qty-minus" data-id="${item.id}">−</button>
                    <span class="qty-value" style="color:#000;">${qty}</span>
                    <button class="qty-btn qty-plus" data-id="${item.id}">+</button>
                </div>
            ` : `
                <div style="display:flex; align-items:center; margin-left:auto; align-self:center;">
                    <button class="add-btn" style="position:static;" data-id="${item.id}" data-name="${item.name}" data-price="${item.price}" data-emoji="${item.emoji || '🍽️'}">
                        + Add
                    </button>
                </div>
            `}
        </div>
        `;
    }).join('');

    bindMenuItemEvents();
}

function bindMenuItemEvents() {
    // Add buttons
    dom.menuItemsList.querySelectorAll('.add-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const { id, name, price, emoji } = btn.dataset;
            addToCart(id, name, parseInt(price), emoji);
            // Re-render menu
            const rest = APP_DATA.restaurants.find(r => r.id === state.currentCategory);
            if (rest) renderMenuItems(rest.menu);
            showToast(`${name} added!`);
        });
    });

    // Qty buttons
    dom.menuItemsList.querySelectorAll('.qty-plus').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            changeQty(btn.dataset.id, 1);
            const rest = APP_DATA.restaurants.find(r => r.id === state.currentCategory);
            if (rest) renderMenuItems(rest.menu);
        });
    });

    dom.menuItemsList.querySelectorAll('.qty-minus').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            changeQty(btn.dataset.id, -1);
            const rest = APP_DATA.restaurants.find(r => r.id === state.currentCategory);
            if (rest) renderMenuItems(rest.menu);
        });
    });
}


// =============== CART LOGIC ===============

function addToCart(id, name, price, emoji) {
    const existing = state.cart.find(c => c.id === id);
    if (existing) {
        existing.qty += 1;
    } else {
        state.cart.push({ id, name, price, emoji, qty: 1 });
    }
    updateCartBadge();
    trackInteraction();
}

function changeQty(id, delta) {
    const item = state.cart.find(c => c.id === id);
    if (!item) return;
    item.qty += delta;
    if (item.qty <= 0) {
        state.cart = state.cart.filter(c => c.id !== id);
    }
    updateCartBadge();
    trackInteraction();
}

function updateCartBadge() {
    const total = state.cart.reduce((sum, c) => sum + c.qty, 0);
    
    if (dom.cartBadge) {
        dom.cartBadge.textContent = total;
        dom.cartBadge.classList.toggle('visible', total > 0);
    }
    
    if (dom.globalCartBadge) {
        dom.globalCartBadge.textContent = total;
        dom.globalCartBadge.classList.toggle('visible', total > 0);
    }
    
    if (dom.cartItemCount) {
        dom.cartItemCount.textContent = `${total} item${total !== 1 ? 's' : ''}`;
    }
}

function getCartTotal() {
    return state.cart.reduce((sum, c) => sum + c.price * c.qty, 0);
}

function renderCart() {
    const isEmpty = state.cart.length === 0;
    dom.cartEmpty.classList.toggle('hidden', !isEmpty);
    dom.cartItemsWrap.classList.toggle('hidden', isEmpty);

    if (isEmpty) return;

    dom.cartItemsList.innerHTML = state.cart.map(item => `
        <div class="cart-item" data-id="${item.id}">
            <span class="cart-item-emoji">${item.emoji}</span>
            <div class="cart-item-info">
                <div class="cart-item-name">${item.name}</div>
                <div class="cart-item-price">₹${item.price * item.qty}</div>
            </div>
            <div class="cart-qty-control">
                <button class="cart-qty-btn cart-minus" data-id="${item.id}" aria-label="Decrease">−</button>
                <span class="cart-qty-value">${item.qty}</span>
                <button class="cart-qty-btn cart-plus" data-id="${item.id}" aria-label="Increase">+</button>
            </div>
        </div>
    `).join('');

    // Summary
    const subtotal = getCartTotal();
    const tax = Math.round(subtotal * 0.05);
    const total = subtotal + tax;

    dom.cartSubtotal.textContent = `₹${subtotal}`;
    dom.cartTax.textContent = `₹${tax}`;
    dom.cartTotal.textContent = `₹${total}`;
    dom.payBtnAmount.textContent = `₹${total}`;

    // Bind cart item events
    dom.cartItemsList.querySelectorAll('.cart-plus').forEach(btn => {
        btn.addEventListener('click', () => {
            changeQty(btn.dataset.id, 1);
            renderCart();
        });
    });

    dom.cartItemsList.querySelectorAll('.cart-minus').forEach(btn => {
        btn.addEventListener('click', () => {
            changeQty(btn.dataset.id, -1);
            renderCart();
        });
    });
}

function openCart() {
    renderCart();
    navigateTo('cart');

    if (state.guidedMode && state.cart.length > 0) {
        setTimeout(() => showGuidedTooltip('Review your items, then tap "Proceed to Pay"', dom.proceedPayBtn), 500);
    }
}


// =============== PAYMENT ===============

function openPayment() {
    // Just trigger Razorpay immediately! The screen UI acts as a loading background.
    payWithRazorpay();
}

async function payWithRazorpay() {
    const total = getCartTotal();
    const tax = Math.round(total * 0.05);
    const grandTotal = total + tax;
    const amountInPaise = Math.round(grandTotal * 100);

    if (amountInPaise <= 0) {
        showToast('❌ Total amount must be greater than zero');
        return;
    }

    showToast('⏳ Creating order...');

    try {
        // Step 1: Create Order on Backend
        const orderResponse = await fetch('http://localhost:3000/create-order', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ amount: amountInPaise, currency: "INR" })
        });

        const orderData = await orderResponse.json();

        if (!orderData || !orderData.id) {
            throw new Error("Failed to create order on backend");
        }

        // Step 2: Initialize Razorpay Checkout
        const options = {
            "key": state.razorpayKey,
            "amount": orderData.amount, 
            "currency": orderData.currency,
            "name": "SmartServe Kiosk",
            "description": `Fast Checkout for ${state.cart.length} items`,
            "order_id": orderData.id, // Using the backend order_id
            "image": "https://api.dicebear.com/7.x/bottts/svg?seed=smartserve",
            "handler": async function (response) {
                // Step 3: Verify Payment on Backend
                showToast('⏳ Verifying payment...');
                const verifyResponse = await fetch('http://localhost:3000/verify-payment', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        razorpay_order_id: response.razorpay_order_id,
                        razorpay_payment_id: response.razorpay_payment_id,
                        razorpay_signature: response.razorpay_signature
                    })
                });

                const verifyData = await verifyResponse.json();

                if (verifyData.status === 'ok') {
                    handlePaymentSuccess(response.razorpay_payment_id);
                } else {
                    showToast('❌ Verification Failed - Please contact support');
                }
            },
            "prefill": {
                "name": "Kiosk Customer",
                "email": "customer@smartserve.com"
            },
            "theme": { "color": "#e94560" },
            "modal": {
                "ondismiss": function() { showToast("⚠️ Payment cancelled"); }
            }
        };

        const rzp1 = new Razorpay(options);
        rzp1.open();

    } catch (err) {
        console.error("Payment Flow Error:", err);
        showToast('❌ Error starting payment - Is the backend running?');
    }
}

function handlePaymentSuccess(paymentId) {
    dom.paymentContent.classList.add('hidden');
    dom.paymentProcessing.classList.remove('hidden');

    setTimeout(() => {
        dom.paymentProcessing.classList.add('hidden');
        dom.paymentSuccess.classList.remove('hidden');

        const orderNum = Math.floor(1000 + Math.random() * 9000);
        const total = getCartTotal();
        const tax = Math.round(total * 0.05);
        const grandTotal = total + tax;

        dom.orderNumber.textContent = orderNum;
        dom.successOrderId.textContent = paymentId ? paymentId : `#${orderNum}`;
        dom.successAmount.textContent = `₹${grandTotal}`;

        showToast('✅ Payment successful via Razorpay!');
    }, 1500);
}

function simulatePayment() {
    payWithRazorpay();
}

function resetOrder() {
    state.cart = [];
    state.currentCategory = null;
    state.guidedStep = 0;
    updateCartBadge();
    navigateTo('home');
    showToast('🎉 Ready for a new order!');
}


// =============== GUIDED MODE ===============

const GUIDED_STEPS = [
    { text: '👋 Welcome! Tap any food category to start', target: '#categoryGrid' },
    { text: '📱 Tap "+ Add" to add items to your cart', target: '.menu-items-list' },
    { text: '🛒 View your cart to review and checkout', target: '#menuCartBtn' },
    { text: '💳 Tap "Proceed to Pay" to pay for your order', target: '#proceedPayBtn' },
];

function toggleGuidedMode() {
    state.guidedMode = !state.guidedMode;
    dom.guidedToggle.classList.toggle('active', state.guidedMode);

    if (state.guidedMode) {
        state.guidedStep = 0;
        showToast('🧭 Guided Mode ON — Follow the highlights!');
        setTimeout(() => {
            showGuidedTooltip(GUIDED_STEPS[0].text, document.querySelector(GUIDED_STEPS[0].target));
        }, 400);
    } else {
        hideGuidedTooltip();
        showToast('Guided Mode OFF');
    }
    trackInteraction();
}

function showGuidedTooltip(text, targetEl) {
    if (!state.guidedMode) return;
    if (!targetEl) return;

    dom.tooltipText.textContent = text;
    dom.guidedTooltip.classList.remove('hidden');

    const rect = targetEl.getBoundingClientRect();
    const tooltipHeight = 80;

    // Position above or below target
    let top = rect.bottom + 12;
    if (top + tooltipHeight > window.innerHeight) {
        top = rect.top - tooltipHeight - 12;
    }
    let left = Math.max(16, rect.left);
    left = Math.min(left, window.innerWidth - 296);

    dom.guidedTooltip.style.top = `${top}px`;
    dom.guidedTooltip.style.left = `${left}px`;

    // Highlight target
    targetEl.classList.add('highlight');
    setTimeout(() => targetEl.classList.remove('highlight'), 2000);
}

function hideGuidedTooltip() {
    dom.guidedTooltip.classList.add('hidden');
}


// =============== SIGN LANGUAGE MODE & WEBSOCKET ===============

let gestureSocket = null;
let virtualCursorIndex = -1;
let focusableElements = [];
let islConfusionTimer = null;

function resetISLTimer() {
    clearTimeout(islConfusionTimer);
    if (dom.islGuidePopup) dom.islGuidePopup.classList.add('hidden');
    
    // Only restart timer if sign language is active
    if (!state.signLanguageMode) return;
    
    // Show guide if confused for 8 seconds
    islConfusionTimer = setTimeout(() => {
        if (state.signLanguageMode && dom.islGuidePopup) {
            dom.islGuidePopup.classList.remove('hidden');
        }
    }, 8000);
}

function toggleSignLanguage() {
    state.signLanguageMode = !state.signLanguageMode;

    if (state.signLanguageMode) {
        dom.gestureOverlay.classList.remove('hidden');
        dom.fabSign.style.display = 'none';
        
        // Connect to Python Backend
        connectGestureWebSocket();
        showToast('🤟 Sign Language Mode: Connecting...');
        
        // Show scanning animation instead of raw camera
        dom.cameraPlaceholder.classList.remove('hidden');
        showToast('Scanning Adaptive Camera Feed...');
        
        // Init cursor & timer
        updateFocusableElements();
        resetISLTimer();
        
    } else {
        if (gestureSocket) {
            gestureSocket.close();
        }
        dom.gestureOverlay.classList.add('hidden');
        dom.fabSign.style.display = 'flex';
        clearVirtualCursor();
        
        clearTimeout(islConfusionTimer);
        if (dom.islGuidePopup) dom.islGuidePopup.classList.add('hidden');
        
        showToast('Sign Language Mode: OFF');
    }
    trackInteraction();
}

function connectGestureWebSocket() {
    gestureSocket = new WebSocket('ws://localhost:8765');
    
    gestureSocket.onopen = () => {
        showToast('✅ Camera Connected via Secure Stream');
        dom.cameraPlaceholder.classList.add('hidden'); // Optional: replace with a "Connected" radar animation
    };
    
    gestureSocket.onmessage = (event) => {
        const data = JSON.parse(event.data);
        if (data.gesture) {
            handleGestureAction(data.gesture);
        }
    };
    
    gestureSocket.onerror = (error) => {
        console.error("WebSocket Error:", error);
        showToast('❌ Camera connection failed');
    };
    
    gestureSocket.onclose = () => {
        if (state.signLanguageMode) {
            console.log("WebSocket Disconnected. Reconnecting in 3s...");
            setTimeout(connectGestureWebSocket, 3000);
        }
    };
}

// =============== GESTURE CURSOR ENGINE ===============

function updateFocusableElements() {
    // Collect interactive elements based on current screen
    const screen = document.querySelector(`.screen-${state.currentScreen}`);
    if (!screen) return;
    
    // Clear old highlights
    clearVirtualCursor();
    
    // Select cards, buttons, category items
    const elements = Array.from(screen.querySelectorAll('.restaurant-card, .cat-item, .add-btn, .cart-item, #proceedPayBtn, #menuCartBtn, .qty-btn, #cartBrowseBtn, #menuBackBtn, #cartBackBtn'));
    
    focusableElements = elements.filter(el => {
        // filter out hidden elements
        return el.offsetParent !== null; 
    });
    virtualCursorIndex = 0;
    
    if (focusableElements.length > 0) {
        highlightCursorElement();
    }
}

function clearVirtualCursor() {
    focusableElements.forEach(el => el.classList.remove('gesture-focus'));
}

function highlightCursorElement() {
    clearVirtualCursor();
    if (focusableElements[virtualCursorIndex]) {
        const el = focusableElements[virtualCursorIndex];
        el.classList.add('gesture-focus');
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
}

function handleGestureAction(gesture) {
    dom.gestureValue.textContent = `Gesture: ${gesture}`;
    
    updateFocusableElements(); // ensure accurate elements
    
    let acted = false;

    if (focusableElements.length === 0) return;

    if (gesture === '1') {
        // Move UP/LEFT
        virtualCursorIndex = (virtualCursorIndex - 1 + focusableElements.length) % focusableElements.length;
        highlightCursorElement();
        showToast(`Cursor Moved (1)`);
        acted = true;
        
    } else if (gesture === '2') {
        // Move DOWN/RIGHT
        virtualCursorIndex = (virtualCursorIndex + 1) % focusableElements.length;
        highlightCursorElement();
        showToast(`Cursor Moved (2)`);
        acted = true;
        
    } else if (gesture === '3') {
        // SELECT
        const el = focusableElements[virtualCursorIndex];
        if (el) {
            el.click();
            showToast(`Selected (3)`);
            setTimeout(updateFocusableElements, 500); // UI updates, refresh cursor
        }
        acted = true;
        
    } else if (gesture === '4') {
        // TO CART directly
        openCart();
        showToast(`Cart Opened (4)`);
        setTimeout(updateFocusableElements, 500);
        acted = true;
        
    } else if (/^[A-Z]$/.test(gesture)) {
        // A-Z Quick Filter on Menu Items
        if (state.currentScreen === 'menu') {
            const letter = gesture.toUpperCase();
            // Find first item starting with this letter
            const matchIndex = focusableElements.findIndex(el => {
                const nameEl = el.closest('.food-card')?.querySelector('.food-card-name');
                if (nameEl && nameEl.textContent.toUpperCase().startsWith(letter)) return true;
                return false;
            });
            
            if (matchIndex !== -1) {
                virtualCursorIndex = matchIndex;
                highlightCursorElement();
                // Optionally select it instantly
                // focusableElements[virtualCursorIndex].click();
                showToast(`Found Item: ${letter}`);
            } else {
                showToast(`No item starting with ${letter}`);
            }
            acted = true;
        }
    }
    
    // If a valid gesture was recognized, reset the confusion guide timer
    if (acted) {
        resetISLTimer();
    }
}


// =============== AI ASSISTANT ===============

function showAIFab() {
    setTimeout(() => {
        dom.fabAI.classList.remove('hidden');
    }, 2000);
}

function toggleAIPanel() {
    const visible = !dom.aiPanel.classList.contains('hidden');
    if (visible) {
        dom.aiPanel.classList.add('hidden');
    } else {
        dom.aiPanel.classList.remove('hidden');
    }
    trackInteraction();
}


// =============== ADAPTIVE MODE ===============

function checkAdaptiveMode() {
    // If user hasn't interacted for extended time or has very few interactions
    const timeSinceLastInteraction = Date.now() - state.lastInteractionTime;

    if (timeSinceLastInteraction > 15000 && state.interactionCount < 3 && !state.adaptiveMode) {
        enableAdaptiveMode();
    }
}

function enableAdaptiveMode() {
    state.adaptiveMode = true;
    dom.app.classList.add('adaptive-mode');
    showToast('🔍 Buttons enlarged for easier use');
}

function disableAdaptiveMode() {
    state.adaptiveMode = false;
    dom.app.classList.remove('adaptive-mode');
}


// =============== IDLE DETECTION ===============

function resetIdleTimer() {
    if (state.idleTimer) clearTimeout(state.idleTimer);
    dom.idleOverlay.classList.add('hidden');

    state.idleTimer = setTimeout(() => {
        if (state.currentScreen !== 'home') return; // Only show on home
        dom.idleOverlay.classList.remove('hidden');
        checkAdaptiveMode();
    }, state.idleTimeout);
}


// =============== INTERACTION TRACKING ===============

function trackInteraction() {
    state.interactionCount++;
    state.lastInteractionTime = Date.now();
    resetIdleTimer();
}


// =============== TOAST NOTIFICATIONS ===============

function showToast(message) {
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `<span class="toast-icon"></span><span>${message}</span>`;
    dom.toastContainer.appendChild(toast);

    setTimeout(() => {
        toast.classList.add('removing');
        setTimeout(() => toast.remove(), 200);
    }, 2500);
}


// =============== EVENT BINDINGS ===============

function bindEvents() {
    // Language toggle
    dom.langToggle.addEventListener('click', () => {
        const langs = ['EN', 'हि', 'த'];
        const current = dom.langToggle.textContent;
        const idx = langs.indexOf(current);
        dom.langToggle.textContent = langs[(idx + 1) % langs.length];
        showToast(`Language: ${langs[(idx + 1) % langs.length]}`);
        trackInteraction();
    });

    // Category cards
    dom.categoryGrid.querySelectorAll('.category-card').forEach(card => {
        card.addEventListener('click', () => {
            openCategory(card.dataset.category);
        });
    });

    // Guided toggle
    dom.guidedToggle.addEventListener('click', toggleGuidedMode);

    // Menu back
    dom.menuBackBtn.addEventListener('click', () => {
        navigateTo('home');
        if (state.guidedMode) hideGuidedTooltip();
    });

    // Menu cart btn
    if (dom.menuCartBtn) dom.menuCartBtn.addEventListener('click', openCart);
    if (dom.globalCartBtn) dom.globalCartBtn.addEventListener('click', openCart);

    // Cart back
    dom.cartBackBtn.addEventListener('click', () => {
        if (state.currentCategory) {
            openCategory(state.currentCategory);
        } else {
            navigateTo('home');
        }
    });

    // Cart browse
    dom.cartBrowseBtn.addEventListener('click', () => navigateTo('home'));

    // Proceed to pay
    dom.proceedPayBtn.addEventListener('click', () => {
        if (state.cart.length === 0) {
            showToast('Your cart is empty!');
            return;
        }
        openPayment();
    });

    // Payment back
    dom.payBackBtn.addEventListener('click', () => {
        openCart();
    });

    // Card pay
    dom.cardPayBtn.addEventListener('click', () => {
        openPayment();
    });

    // Success done
    dom.successDoneBtn.addEventListener('click', resetOrder);

    // Sign language FAB
    dom.fabSign.addEventListener('click', toggleSignLanguage);
    dom.gestureClose.addEventListener('click', toggleSignLanguage);

    // AI FAB
    dom.fabAI.addEventListener('click', toggleAIPanel);
    dom.aiPanelClose.addEventListener('click', () => dom.aiPanel.classList.add('hidden'));

    // AI suggestions
    document.querySelectorAll('.ai-sugg').forEach(btn => {
        btn.addEventListener('click', () => {
            const action = btn.dataset.action;
            dom.aiPanel.classList.add('hidden');

            if (action === 'recommend') {
                openCategory('burgers');
                showToast('🤖 Showing popular burgers!');
            } else if (action === 'veg') {
                openCategory('biryani');
                showToast('🤖 Showing veg-friendly options!');
            } else if (action === 'help') {
                if (!state.guidedMode) toggleGuidedMode();
            }
        });
    });

    // Guided tooltip next
    dom.tooltipNext.addEventListener('click', () => {
        hideGuidedTooltip();
    });

    // Idle overlay
    dom.idleDismiss.addEventListener('click', () => {
        dom.idleOverlay.classList.add('hidden');
        resetIdleTimer();
        trackInteraction();
    });

    dom.idleGuide.addEventListener('click', () => {
        dom.idleOverlay.classList.add('hidden');
        if (!state.guidedMode) toggleGuidedMode();
        resetIdleTimer();
        trackInteraction();
    });

    // Offer dots
    dom.offerDots.querySelectorAll('.dot').forEach((dot, i) => {
        dot.addEventListener('click', () => {
            state.offerSlideIndex = i;
            updateOfferSlide();
            trackInteraction();
        });
    });

    // Global interaction tracking
    document.addEventListener('touchstart', trackInteraction, { passive: true });
    document.addEventListener('click', trackInteraction);
}


// =============== START ===============

document.addEventListener('DOMContentLoaded', init);
