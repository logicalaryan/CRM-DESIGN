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
    if(window.lucide) window.lucide.createIcons();
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
  gsap.set('.flow-node, .flow-line, .flow-split', { opacity: 0, y: 20 });
  gsap.set('.flow-line, .flow-split', { y: 0 }); 

  // Native smooth scroll to the flowchart
  window.scrollTo({
    top: workflowSection.offsetTop,
    behavior: 'smooth'
  });

  // Delay timeline slightly to wait for scroll
  setTimeout(() => {
    const tl = gsap.timeline();

    tl.to('#node-login', { opacity: 1, y: 0, duration: 0.5 })
      .to('#line-1', { opacity: 1, duration: 0.3 })
      
      .to('#node-db', { opacity: 1, y: 0, duration: 0.5 })
      .to('#line-2', { opacity: 1, duration: 0.3 })
      
      .to('#node-mfa', { opacity: 1, y: 0, duration: 0.5 })
      .to('#node-office', { opacity: 0.3, y: 0, duration: 0.5 }, "-=0.5")
      .to('#line-3', { opacity: 1, duration: 0.3 })
      
      .to('#node-role', { opacity: 1, y: 0, duration: 0.5 })
      .to('#split-lines', { opacity: 1, duration: 0.5 })
      
      .to('.dashboard-node', { opacity: 0.4, y: 0, duration: 0.5, stagger: 0.1 })
      .to('#node-dash-admin', { opacity: 1, scale: 1.05, duration: 0.5, ease: "back.out(1.7)" });
  }, 600); // Wait 600ms for scroll
}

if (btnLogin) btnLogin.addEventListener('click', startSimulation);

// ==========================================
// 4. INTERACTIVE MODALS
// ==========================================
const nodeData = {
  'node-login': {
    title: 'The Gateway',
    icon: 'log-in',
    flowsteps: [
      { icon: 'keyboard', text: 'Type Credentials' },
      { icon: 'lock', text: 'Encrypt Data' },
      { icon: 'zap', text: 'Send via Secure Tunnel' },
      { icon: 'server', text: 'Reach Auth Server' }
    ]
  },
  'node-db': {
    title: 'The Vault',
    icon: 'database',
    flowsteps: [
      { icon: 'inbox', text: 'Receive Request' },
      { icon: 'search', text: 'Find User Account' },
      { icon: 'key', text: 'Verify Password' },
      { icon: 'check-square', text: 'Check if Active' },
      { icon: 'check-circle', text: 'Approve Login' }
    ]
  },
  'node-mfa': {
    title: 'The Defense',
    icon: 'smartphone',
    flowsteps: [
      { icon: 'map-pin', text: 'Detect New Location' },
      { icon: 'pause-circle', text: 'Pause Login' },
      { icon: 'hash', text: 'Generate Unique Code' },
      { icon: 'message-square', text: 'Send Code to Phone' },
      { icon: 'user-check', text: 'Verify User Input' }
    ]
  },
  'node-office': {
    title: 'Trusted Connection',
    icon: 'shield-check',
    flowsteps: [
      { icon: 'globe', text: 'Check IP Address' },
      { icon: 'building', text: 'Recognize Office' },
      { icon: 'laptop', text: 'Verify Company Device' },
      { icon: 'fast-forward', text: 'Skip Extra Checks' },
      { icon: 'unlock', text: 'Grant Fast Access' }
    ]
  },
  'node-role': {
    title: 'The Sorting Hat',
    icon: 'users',
    flowsteps: [
      { icon: 'fingerprint', text: 'Read User ID' },
      { icon: 'briefcase', text: 'Look up Job Title' },
      { icon: 'list', text: 'Determine Permissions' },
      { icon: 'eye-off', text: 'Block Restricted Info' },
      { icon: 'layout', text: 'Load Custom View' }
    ]
  },
  'node-dash-staff': {
    title: 'Staff Access',
    icon: 'user',
    flowsteps: [
      { icon: 'user-check', text: 'Confirm Staff Role' },
      { icon: 'lock', text: 'Hide Financials' },
      { icon: 'lock', text: 'Hide HR Records' },
      { icon: 'contact', text: 'Unlock Basic CRM' },
      { icon: 'home', text: 'Welcome to Portal' }
    ]
  },
  'node-dash-manager': {
    title: 'Manager Access',
    icon: 'users',
    flowsteps: [
      { icon: 'user-check', text: 'Confirm Manager Role' },
      { icon: 'lock', text: 'Hide Financials' },
      { icon: 'users', text: 'Unlock Team HR' },
      { icon: 'edit', text: 'Unlock CRM Editing' },
      { icon: 'home', text: 'Welcome to Portal' }
    ]
  },
  'node-dash-admin': {
    title: 'Admin Access',
    icon: 'crown',
    flowsteps: [
      { icon: 'user-check', text: 'Confirm Admin Role' },
      { icon: 'key', text: 'Grant Master Key' },
      { icon: 'pie-chart', text: 'Unlock Financials' },
      { icon: 'users', text: 'Unlock HR Records' },
      { icon: 'home', text: 'Welcome to Portal' }
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
    if(data) {
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

      if(window.lucide) window.lucide.createIcons();

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

if(btnCloseModal) btnCloseModal.addEventListener('click', closeModal);
if(modalOverlay) {
  modalOverlay.addEventListener('click', (e) => {
    if(e.target === modalOverlay) closeModal();
  });
}
