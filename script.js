// الشريط الجانبي
function openSidebar() {
  document.getElementById('sidebar').style.left = '0';
  document.querySelector('.menu-icon').classList.add('hide-menu-icon');
}
function closeSidebar() {
  document.getElementById('sidebar').style.left = '-250px';
  document.querySelector('.menu-icon').classList.remove('hide-menu-icon');
}

// بحث الألعاب (خاص بصفحة الألعاب فقط)
document.addEventListener('DOMContentLoaded', function() {
  const searchInput = document.getElementById('game-search-input');
  const allCardsContainer = document.getElementById('all-game-cards');
  const searchCardsContainer = document.getElementById('search-game-cards');

  // عند تحميل الصفحة: أظهر كل البطاقات وأخفي نتائج البحث
  if (allCardsContainer) {
    allCardsContainer.style.display = 'flex';
  }
  if (searchCardsContainer) {
    searchCardsContainer.style.display = 'none';
  }

  if (searchInput && allCardsContainer && searchCardsContainer) {
    searchInput.addEventListener('input', function(e) {
      const query = e.target.value.trim().toLowerCase();
      const cards = Array.from(allCardsContainer.querySelectorAll('.game-card'));

      if (!query) {
        // إذا لم يكن هناك بحث، أظهر كل البطاقات الأصلية وأخفي نتائج البحث
        allCardsContainer.style.display = 'flex';
        searchCardsContainer.style.display = 'none';
        cards.forEach(card => card.style.display = '');
        return;
      }

      // عند البحث، أظهر فقط البطاقات المطابقة في search-game-cards
      const foundCards = cards.filter(card => card.getAttribute('data-title').toLowerCase().includes(query));
      if (foundCards.length === 0) {
        searchCardsContainer.innerHTML = '<div style="padding:40px 0;text-align:center;color:#888;font-size:17px;">No games found</div>';
      } else {
        searchCardsContainer.innerHTML = '';
        foundCards.forEach(card => {
          const clone = card.cloneNode(true);
          searchCardsContainer.appendChild(clone);
        });
      }
      allCardsContainer.style.display = 'none';
      searchCardsContainer.style.display = 'flex';
    });
  }
});
