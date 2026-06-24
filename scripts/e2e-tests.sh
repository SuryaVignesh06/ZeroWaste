#!/bin/bash
# Zero-Waste E2E Tests — Updated for new flow: Onboarding → Role Select → Login → OTP → Home
set -e
PASS=0; FAIL=0; TOTAL=0
log_pass() { echo "✅ PASS: $1"; PASS=$((PASS+1)); TOTAL=$((TOTAL+1)); }
log_fail() { echo "❌ FAIL: $1 — $2"; FAIL=$((FAIL+1)); TOTAL=$((TOTAL+1)); }
log_section() { echo ""; echo "━━━━━━━━━━━━━━━━━━━━━━━━━━"; echo "▶ $1"; echo "━━━━━━━━━━━━━━━━━━━━━━━━━━"; }

agent-browser set viewport 390 844 > /dev/null 2>&1
agent-browser open http://localhost:3000 > /dev/null 2>&1
sleep 3

has_text() {
  result=$(agent-browser eval "(function(){return document.body.textContent.includes('$1');})()" 2>/dev/null | tail -1)
  if [ "$result" = "true" ]; then return 0; else return 1; fi
}
test_scroll() {
  result=$(agent-browser eval "(function(){const m=document.querySelector('main');if(!m)return 'no-main';return 'canScroll:'+(m.scrollHeight>m.clientHeight+50);})()" 2>/dev/null | tail -1)
  if echo "$result" | grep -q "canScroll:true"; then return 0; else return 1; fi
}

# ============================================================
log_section "FEATURE 1: Onboarding"
# ============================================================
if has_text "Rescue Surplus Food"; then log_pass "Slide 1 renders"; else log_fail "Slide 1" "not found"; fi
# Skip → Role Select (new flow)
agent-browser eval "(function(){const b=Array.from(document.querySelectorAll('button')).find(x=>x.textContent&&x.textContent.includes('Skip'));if(b){b.click();return 'ok';}return 'nf';})()" > /dev/null 2>&1; sleep 1.5
if has_text "How will you use"; then log_pass "Onboarding → Role Select"; else log_fail "Role Select" "not loaded"; fi

# ============================================================
log_section "FEATURE 2: Role Selection"
# ============================================================
if has_text "Normal User"; then log_pass "User role card visible"; else log_fail "Role" "not found"; fi
if has_text "NGO"; then log_pass "NGO role card visible"; else log_fail "Role" "not found"; fi
if has_text "Meals Rescued" || has_text "Active Rescues"; then log_pass "Stats strip visible"; else log_fail "Stats" "not found"; fi

# Test scroll on role select
if test_scroll; then log_pass "Role Select SCROLLS ✅"; else log_fail "Role Select scroll" "FAILED"; fi

# Select Normal User → should go to Login
agent-browser eval "(function(){const b=Array.from(document.querySelectorAll('button')).find(x=>x.textContent&&x.textContent.includes('Normal User'));if(b){b.click();return 'ok';}return 'nf';})()" > /dev/null 2>&1; sleep 1.5
if has_text "Welcome back"; then log_pass "Role Select → Login (user)"; else log_fail "Login" "not loaded"; fi

# ============================================================
log_section "FEATURE 3: Login"
# ============================================================
if has_text "ZERO WASTE"; then log_pass "Login branding visible"; else log_fail "Login branding" "not found"; fi
if has_text "+91"; then log_pass "Country code +91 visible"; else log_fail "Phone input" "no +91"; fi
# Enter phone with native setter
agent-browser eval "(function(){const i=document.querySelector('input[type=\"tel\"]');const s=Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype,'value').set;s.call(i,'9876543210');i.dispatchEvent(new Event('input',{bubbles:true}));return 'ok';})()" > /dev/null 2>&1; sleep 0.5
agent-browser eval "(function(){const b=Array.from(document.querySelectorAll('button')).find(x=>x.textContent&&x.textContent.includes('Send OTP'));if(b){b.click();return 'ok';}return 'nf';})()" > /dev/null 2>&1; sleep 2.5
if has_text "Verify your number"; then log_pass "Login → OTP screen"; else log_fail "OTP" "not loaded"; fi

# ============================================================
log_section "FEATURE 4: OTP Verification"
# ============================================================
if has_text "Enter the 4-digit"; then log_pass "OTP instructions visible"; else log_fail "OTP instructions" "not found"; fi
# Enter 4 digits
agent-browser eval "(function(){const inputs=Array.from(document.querySelectorAll('input[type=\"tel\"]'));const s=Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype,'value').set;['9','8','7','6'].forEach((d,i)=>{s.call(inputs[i],d);inputs[i].dispatchEvent(new Event('input',{bubbles:true}));});return 'ok';})()" > /dev/null 2>&1; sleep 2.5
if has_text "Good morning" || has_text "Zero Waste"; then log_pass "OTP → Home (user)"; else log_fail "OTP verify" "home not loaded"; fi

# ============================================================
log_section "FEATURE 5: Home Screen"
# ============================================================
if has_text "Good morning" || has_text "Arjun"; then log_pass "Home greeting visible"; else log_fail "Home" "not loaded"; fi
if has_text "My Impact"; then log_pass "Impact grid visible"; else log_fail "Impact grid" "not found"; fi
if has_text "Nearby Rescues"; then log_pass "Nearby Rescues section"; else log_fail "Rescues" "not found"; fi
if has_text "Deals Near You"; then log_pass "Deals section"; else log_fail "Deals" "not found"; fi
if test_scroll; then log_pass "Home SCROLLS ✅"; else log_fail "Home scroll" "FAILED"; fi

# ============================================================
log_section "FEATURE 6: Marketplace"
# ============================================================
agent-browser eval "(function(){const b=Array.from(document.querySelectorAll('button')).find(x=>x.getAttribute('aria-label')==='market');if(b){b.click();return 'ok';}return 'nf';})()" > /dev/null 2>&1; sleep 1.5
if has_text "Marketplace"; then log_pass "Marketplace loads"; else log_fail "Marketplace" "not loaded"; fi
if has_text "Flash Deals"; then log_pass "Flash deal banner"; else log_fail "Flash banner" "not found"; fi
if test_scroll; then log_pass "Marketplace SCROLLS ✅"; else log_fail "Marketplace scroll" "FAILED"; fi

# ============================================================
log_section "FEATURE 7: Product Detail"
# ============================================================
agent-browser eval "(function(){const c=Array.from(document.querySelectorAll('*')).find(x=>x.textContent&&x.textContent.includes('OFF')&&x.textContent.includes('Amul')&&x.textContent.length<100);if(c){c.click();return 'ok';}return 'nf';})()" > /dev/null 2>&1; sleep 1.5
if has_text "Add to Cart" || has_text "AI Freshness" || has_text "About"; then log_pass "Product detail sheet opens"; else log_fail "Product detail" "not opened"; fi
agent-browser press Escape > /dev/null 2>&1; sleep 0.5

# ============================================================
log_section "FEATURE 8: Impact Dashboard"
# ============================================================
agent-browser eval "(function(){const b=Array.from(document.querySelectorAll('button')).find(x=>x.getAttribute('aria-label')==='profile');if(b){b.click();return 'ok';}return 'nf';})()" > /dev/null 2>&1; sleep 1.5
if has_text "Your Impact" || has_text "Achievements" || has_text "Meals"; then log_pass "Impact dashboard loads"; else log_fail "Impact" "not loaded"; fi

# ============================================================
log_section "FEATURE 9: AI Assistant"
# ============================================================
# Go to home first to ensure BottomNav is rendered
agent-browser eval "(function(){const b=Array.from(document.querySelectorAll('button')).find(x=>x.getAttribute('aria-label')==='home');if(b){b.click();return 'ok';}return 'nf';})()" > /dev/null 2>&1; sleep 1.5
# Now find AI button by aria-label
agent-browser eval "(function(){const b=Array.from(document.querySelectorAll('button')).find(x=>x.getAttribute('aria-label')==='AI Assistant');if(b){b.click();return 'ok';}return 'nf';})()" > /dev/null 2>&1; sleep 1.5
if has_text "Zira" || has_text "Ask"; then log_pass "AI Assistant opens"; else log_fail "AI" "not opened"; fi
agent-browser press Escape > /dev/null 2>&1; sleep 1

# ============================================================
log_section "FEATURE 10: NGO Flow + AirDrop Radar"
# ============================================================
# Log out and restart as NGO
agent-browser reload > /dev/null 2>&1; sleep 3
agent-browser eval "(function(){const b=Array.from(document.querySelectorAll('button')).find(x=>x.textContent&&x.textContent.includes('Skip'));if(b){b.click();return 'ok';}return 'nf';})()" > /dev/null 2>&1; sleep 1.5
# Select NGO
agent-browser eval "(function(){const b=Array.from(document.querySelectorAll('button')).find(x=>x.textContent&&x.textContent.includes('NGO'));if(b){b.click();return 'ok';}return 'nf';})()" > /dev/null 2>&1; sleep 1.5
# Should be on Login
if has_text "Welcome back"; then log_pass "NGO → Login"; else log_fail "NGO Login" "not loaded"; fi
# Enter phone
agent-browser eval "(function(){const i=document.querySelector('input[type=\"tel\"]');const s=Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype,'value').set;s.call(i,'9876543210');i.dispatchEvent(new Event('input',{bubbles:true}));return 'ok';})()" > /dev/null 2>&1; sleep 0.5
agent-browser eval "(function(){const b=Array.from(document.querySelectorAll('button')).find(x=>x.textContent&&x.textContent.includes('Send OTP'));if(b){b.click();return 'ok';}return 'nf';})()" > /dev/null 2>&1; sleep 2.5
# Enter OTP
agent-browser eval "(function(){const inputs=Array.from(document.querySelectorAll('input[type=\"tel\"]'));const s=Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype,'value').set;['9','8','7','6'].forEach((d,i)=>{s.call(inputs[i],d);inputs[i].dispatchEvent(new Event('input',{bubbles:true}));});return 'ok';})()" > /dev/null 2>&1; sleep 2.5
# Should be on NGO feed
if has_text "NSS Chapter" || has_text "Donations Near You" || has_text "Rescue"; then log_pass "NGO OTP → NGO Feed"; else log_fail "NGO Feed" "not loaded"; fi
if has_text "Donations Near You"; then log_pass "AirDrop radar section visible"; else log_fail "Radar" "not found"; fi
if has_text "Active Requests" || has_text "Accept"; then log_pass "Donation list visible"; else log_fail "Donation list" "not found"; fi
if test_scroll; then log_pass "NGO Feed SCROLLS ✅"; else log_fail "NGO scroll" "FAILED"; fi

# ============================================================
log_section "SUMMARY"
# ============================================================
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "  TOTAL: $TOTAL"
echo "  ✅ PASSED: $PASS"
echo "  ❌ FAILED: $FAIL"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
if [ $FAIL -eq 0 ]; then echo "🎉 ALL TESTS PASSED!"; else echo "⚠️ $FAIL tests failed."; fi
