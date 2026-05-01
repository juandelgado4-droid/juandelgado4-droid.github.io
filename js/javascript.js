// Switch tabs
function showPanel(id, btn) {
  document.querySelectorAll('.menu-panel').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
  document.getElementById(id).classList.add('active');
  btn.classList.add('active');
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Swipe gesture detection for mobile
let touchStartX = 0;
let touchEndX = 0;

function handleSwipe() {
  const threshold = 50;
  const diff = touchStartX - touchEndX;
  const activeTab = document.querySelector('.tab.active');

  if (Math.abs(diff) > threshold) {
    if (diff > 0) {
      // Swipe left - move to next tab
      const nextTab = activeTab.nextElementSibling;
      if (nextTab && nextTab.classList.contains('tab')) {
        nextTab.click();
      }
    } else {
      // Swipe right - move to previous tab
      const prevTab = activeTab.previousElementSibling;
      if (prevTab && prevTab.classList.contains('tab')) {
        prevTab.click();
      }
    }
  }
}

// Add touch listeners to page for swipe support
document.addEventListener('touchstart', e => {
  touchStartX = e.changedTouches[0].screenX;
}, false);

document.addEventListener('touchend', e => {
  touchEndX = e.changedTouches[0].screenX;
  handleSwipe();
}, false);
