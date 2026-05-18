import './style.css';
import { gsap } from 'gsap';

// ==========================================
// UI INTERACTIONS (LOGIN MOCKUP)
// ==========================================

// Password Visibility Toggle
const eyeBtn = document.getElementById('toggle-eye');
const passInput = document.getElementById('password-input');

if (eyeBtn && passInput) {
  eyeBtn.addEventListener('click', () => {
    if (passInput.type === 'password') {
      passInput.type = 'text';
      eyeBtn.innerHTML = '<i data-lucide="eye-off"></i>';
    } else {
      passInput.type = 'password';
      eyeBtn.innerHTML = '<i data-lucide="eye"></i>';
    }
    if (window.lucide) window.lucide.createIcons();
  });
}

// ==========================================
// WORKFLOW ANIMATION SEQUENCE
// ==========================================
const btnLogin = document.getElementById('btn-login');
const workflowSection = document.getElementById('workflow-section');
const connArrow = document.getElementById('conn-arrow');

function startSimulation() {
  // Show connecting arrow
  gsap.to(connArrow, { opacity: 1, duration: 0.5 });

  // Reset workflow elements
  gsap.set('.flow-node, .flow-line, .horizontal-line-left, .horizontal-line-right, .flow-arrow-up, .flow-label', { opacity: 0 });
  gsap.set('.flow-node', { y: 20 });
  gsap.set('.flow-label.yes, .flow-label.no', { x: 20 });
  gsap.set('.flow-label.green-yes', { y: 10 });

  // Native smooth scroll to the flowchart
  window.scrollTo({
    top: workflowSection.offsetTop,
    behavior: 'smooth'
  });

  // Delay timeline slightly to wait for scroll
  setTimeout(() => {
    const tl = gsap.timeline();

    tl.to('#node-start', { opacity: 1, y: 0, duration: 0.3 })
      .to('#line-0', { opacity: 1, duration: 0.2 })
      .to('#node-step1', { opacity: 1, y: 0, duration: 0.4 })
      .to('#line-1', { opacity: 1, duration: 0.2 })
      .to('#node-step2', { opacity: 1, y: 0, duration: 0.4 })
      .to('#line-2', { opacity: 1, duration: 0.2 })
      .to('#node-step3', { opacity: 1, y: 0, duration: 0.4 })

      // Error 1: Validation
      .to('#line-to-error1', { opacity: 1, duration: 0.2 })
      .to('#node-error1', { opacity: 1, y: 0, duration: 0.4 }, "-=0.2")
      .to('#label-no1', { opacity: 1, x: 0, duration: 0.2 }, "-=0.4")

      // Main Path continues
      .to('#label-yes1', { opacity: 1, y: 0, duration: 0.2 })
      .to('#line-3', { opacity: 1, duration: 0.2 })
      .to('#node-step4', { opacity: 1, y: 0, duration: 0.4 })

      // Error 2: Security Lockout
      .to('#line-to-error2', { opacity: 1, duration: 0.2 })
      .to('#node-error2', { opacity: 1, y: 0, duration: 0.4 }, "-=0.2")
      .to('#label-no2', { opacity: 1, x: 0, duration: 0.2 }, "-=0.4")

      // Main Path continues
      .to('#label-yes2', { opacity: 1, y: 0, duration: 0.2 })
      .to('#line-4', { opacity: 1, duration: 0.2 })
      .to('#node-step5', { opacity: 1, y: 0, duration: 0.4 })
      .to('#line-5', { opacity: 1, duration: 0.2 })
      .to('#node-step6', { opacity: 1, y: 0, duration: 0.4 })

      // Error 3: Invalid Credentials
      .to('#line-to-error3', { opacity: 1, duration: 0.2 })
      .to('#node-error3', { opacity: 1, y: 0, duration: 0.4 }, "-=0.2")
      .to('#label-no3', { opacity: 1, x: 0, duration: 0.2 }, "-=0.4")

      // Main Path continues
      .to('#label-yes3', { opacity: 1, y: 0, duration: 0.2 })
      .to('#line-6', { opacity: 1, duration: 0.2 })
      .to('#node-step7', { opacity: 1, y: 0, duration: 0.4 })
      .to('#line-7', { opacity: 1, duration: 0.2 })
      .to('#node-step8', { opacity: 1, y: 0, duration: 0.4 })

      // Error 4: Account Suspended
      .to('#line-to-error4', { opacity: 1, duration: 0.2 })
      .to('#node-error4', { opacity: 1, y: 0, duration: 0.4 }, "-=0.2")
      .to('#label-no4', { opacity: 1, x: 0, duration: 0.2 }, "-=0.4")

      // Main Path continues
      .to('#label-yes4', { opacity: 1, y: 0, duration: 0.2 })
      .to('#line-8', { opacity: 1, duration: 0.2 })
      .to('#node-step9', { opacity: 1, y: 0, duration: 0.4 })
      .to('#line-9', { opacity: 1, duration: 0.2 })
      .to('#node-step10', { opacity: 1, y: 0, duration: 0.4 })
      .to('#line-10', { opacity: 1, duration: 0.2 })
      .to('#node-end', { opacity: 1, y: 0, duration: 0.4 });
  }, 600); // Wait 600ms for scroll
}

if (btnLogin) btnLogin.addEventListener('click', startSimulation);

// ==========================================
// SOCIAL LOGINS INTERACTION
// ==========================================
const btnLinkedin = document.getElementById('btn-linkedin');
const btnZoho = document.getElementById('btn-zoho');

function handleSocialLogin(button, providerName, originalHTML) {
  if (button.classList.contains('loading')) return;
  button.classList.add('loading');
  button.disabled = true;
  
  // Set temporary loading state with spin animation
  button.innerHTML = `<i data-lucide="loader" class="animate-spin" style="width: 20px; height: 20px;"></i><span>Connecting to ${providerName}...</span>`;
  if (window.lucide) window.lucide.createIcons();

  setTimeout(() => {
    // Reset button
    button.classList.remove('loading');
    button.disabled = false;
    button.innerHTML = originalHTML;
    if (window.lucide) window.lucide.createIcons();
    
    // Start login flow simulation
    startSimulation();
  }, 1200);
}

if (btnLinkedin) {
  const original = btnLinkedin.innerHTML;
  btnLinkedin.addEventListener('click', () => handleSocialLogin(btnLinkedin, 'LinkedIn', original));
}
if (btnZoho) {
  const original = btnZoho.innerHTML;
  btnZoho.addEventListener('click', () => handleSocialLogin(btnZoho, 'Zoho', original));
}

// ==========================================
// 4. INTERACTIVE MODALS
// ==========================================
const nodeData = {
  'node-step1': {
    title: 'Display Login Interface',
    icon: 'monitor',
    flowsteps: [
      { icon: 'globe', text: 'User visits site' },
      { icon: 'server', text: 'Server sends HTML' },
      { icon: 'monitor', text: 'Browser renders page' },
      { icon: 'eye', text: 'User sees login screen' }
    ]
  },
  'node-step2': {
    title: 'User Submits Credentials',
    icon: 'user',
    flowsteps: [
      { icon: 'keyboard', text: 'Type Email' },
      { icon: 'key', text: 'Type Password' },
      { icon: 'check-square', text: 'Check Keep Me Logged In' },
      { icon: 'mouse-pointer-click', text: 'Click Login' }
    ]
  },
  'node-step3': {
    title: 'Are Inputs Valid?',
    icon: 'check-square',
    flowsteps: [
      { icon: 'file-search', text: 'Check if empty' },
      { icon: 'at-sign', text: 'Check email format' },
      { icon: 'lock', text: 'Check password length' },
      { icon: 'check-circle', text: 'Valid format' }
    ]
  },
  'node-error1': {
    title: 'Validation Error',
    icon: 'alert-circle',
    flowsteps: [
      { icon: 'x-circle', text: 'Validation fails' },
      { icon: 'alert-triangle', text: 'Generate error text' },
      { icon: 'layout', text: 'Update UI state' },
      { icon: 'eye', text: 'Display error message' }
    ]
  },
  'node-step4': {
    title: 'Check Security Rules',
    icon: 'shield',
    flowsteps: [
      { icon: 'globe', text: 'Extract IP Address' },
      { icon: 'clock', text: 'Check recent attempts' },
      { icon: 'shield-alert', text: 'Analyze for Bots' },
      { icon: 'shield-check', text: 'Traffic is safe' }
    ]
  },
  'node-error2': {
    title: 'Security Lockout',
    icon: 'shield-alert',
    flowsteps: [
      { icon: 'x-octagon', text: 'Threshold exceeded' },
      { icon: 'lock', text: 'Lock IP for 15 mins' },
      { icon: 'database', text: 'Log security event' },
      { icon: 'alert-circle', text: 'Show lockout message' }
    ]
  },
  'node-step5': {
    title: 'Query Database',
    icon: 'database',
    flowsteps: [
      { icon: 'send', text: 'Send to Auth API' },
      { icon: 'database', text: 'Query SQL Database' },
      { icon: 'search', text: 'Find User Record' },
      { icon: 'download', text: 'Retrieve hashed password' }
    ]
  },
  'node-step6': {
    title: 'Is Password Correct?',
    icon: 'key',
    flowsteps: [
      { icon: 'lock', text: 'Hash input password' },
      { icon: 'cpu', text: 'Compute algorithms' },
      { icon: 'file-diff', text: 'Compare with DB hash' },
      { icon: 'check', text: 'Hashes match perfectly' }
    ]
  },
  'node-error3': {
    title: 'Invalid Credentials',
    icon: 'x-circle',
    flowsteps: [
      { icon: 'alert-triangle', text: 'Hashes do not match' },
      { icon: 'plus-circle', text: 'Increment failed attempts' },
      { icon: 'layout', text: 'Update UI state' },
      { icon: 'eye', text: 'Show "Invalid Credentials"' }
    ]
  },
  'node-step7': {
    title: 'Generate Session Token',
    icon: 'ticket',
    flowsteps: [
      { icon: 'pen-tool', text: 'Sign payload with secret' },
      { icon: 'ticket', text: 'Create JWT Token' },
      { icon: 'clock', text: 'Set expiration to 30 days' },
      { icon: 'hard-drive', text: 'Store in secure HttpOnly cookie' }
    ]
  },
  'node-step8': {
    title: 'Is Account Active?',
    icon: 'user-check',
    flowsteps: [
      { icon: 'search', text: 'Check account status field' },
      { icon: 'calendar', text: 'Verify subscription active' },
      { icon: 'shield', text: 'Check for admin bans' },
      { icon: 'check-circle', text: 'Account is fully active' }
    ]
  },
  'node-error4': {
    title: 'Account Suspended',
    icon: 'ban',
    flowsteps: [
      { icon: 'x-circle', text: 'Status is Suspended' },
      { icon: 'trash-2', text: 'Destroy session token' },
      { icon: 'mail', text: 'Trigger support email' },
      { icon: 'alert-circle', text: 'Show suspension notice' }
    ]
  },
  'node-step9': {
    title: 'Load Role & Permissions',
    icon: 'users',
    flowsteps: [
      { icon: 'contact', text: 'Identify user role' },
      { icon: 'list', text: 'Fetch permissions list' },
      { icon: 'eye-off', text: 'Filter restricted modules' },
      { icon: 'layers', text: 'Prepare Dashboard layout' }
    ]
  },
  'node-step10': {
    title: 'Route to Secure Dashboard',
    icon: 'layout-dashboard',
    flowsteps: [
      { icon: 'loader', text: 'Clear loading states' },
      { icon: 'route', text: 'Update browser URL routing' },
      { icon: 'layout', text: 'Render CRM components' },
      { icon: 'home', text: 'User successfully logs in' }
    ]
  }
};

const modalOverlay = document.getElementById('info-modal-overlay');
const modalContent = document.getElementById('info-modal');
const modalTitle = document.getElementById('modal-title');
const miniFlowContainer = document.getElementById('mini-flow-container');
const modalIconContainer = document.getElementById('modal-icon-container');
const btnCloseModal = document.getElementById('close-modal');

document.querySelectorAll('.flow-node').forEach(node => {
  node.addEventListener('click', () => {
    const data = nodeData[node.id];
    if (data) {
      modalTitle.textContent = data.title;
      modalIconContainer.innerHTML = `<i data-lucide="${data.icon}"></i>`;

      // Generate Mini Flowchart HTML
      const processSteps = data.flowsteps.slice(0, -1);
      const outcomeStep = data.flowsteps[data.flowsteps.length - 1];

      let flowHTML = `<div class="mini-flow-wrapper">`;

      // Top row (process)
      flowHTML += `<div class="mini-process-row">`;
      processSteps.forEach((step, index) => {
        flowHTML += `
          <div class="mini-step-card">
            <i data-lucide="${step.icon}"></i>
            <span>${step.text}</span>
          </div>
        `;
        if (index < processSteps.length - 1) {
          flowHTML += `<div class="mini-arrow"><i data-lucide="arrow-right"></i></div>`;
        }
      });
      flowHTML += `</div>`; // End top row

      // Bottom bar (outcome)
      flowHTML += `
        <div class="mini-outcome-bar">
          <i data-lucide="${outcomeStep.icon}"></i>
          <span>${outcomeStep.text}</span>
        </div>
      </div>`; // End wrapper

      miniFlowContainer.innerHTML = flowHTML;

      if (window.lucide) window.lucide.createIcons();

      // Animate In with staggered timeline
      const modalTl = gsap.timeline();
      modalTl.to(modalOverlay, { opacity: 1, duration: 0.3, pointerEvents: 'auto' })
        .to(modalContent, { scale: 1, duration: 0.3, ease: 'back.out(1.5)' }, "<")
        .to('.mini-step-card, .mini-arrow', {
          opacity: 1,
          y: 0,
          duration: 0.4,
          stagger: 0.1,
          ease: 'power2.out'
        }, "-=0.1")
        .to('.mini-outcome-bar', {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: 'back.out(1.5)'
        }, "-=0.1");
    }
  });
});

function closeModal() {
  gsap.to(modalOverlay, { opacity: 0, duration: 0.3, pointerEvents: 'none' });
  gsap.to(modalContent, { scale: 0.9, duration: 0.3 });
}

if (btnCloseModal) btnCloseModal.addEventListener('click', closeModal);
if (modalOverlay) {
  modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) closeModal();
  });
}
