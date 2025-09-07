  function openSidebar() {
    document.getElementById('sidebar').style.left = '0';
    document.querySelector('.menu-icon').classList.add('hide-menu-icon');
  }
  function closeSidebar() {
    document.getElementById('sidebar').style.left = '-250px';
    document.querySelector('.menu-icon').classList.remove('hide-menu-icon');
  }
  // عرض صفحة محددة
         function openPage(pageId) {
  closeSidebar();
  // إخفاء جميع الصفحات الفرعية
  document.querySelectorAll('section[id^="page-"]').forEach(el => {
    el.style.display = 'none';
    el.classList.remove('show');
  });
  // إخفاء بطاقات الأقسام والبانر الرئيسي
  document.querySelector('.card-section').style.display = 'none';
  document.querySelector('.hero').style.display = 'none';

  // إظهار الصفحة المطلوبة
  const page = document.getElementById(pageId);
  if (page) {
    page.style.display = 'block';
    setTimeout(() => page.classList.add('show'), 50);
  }

  // إذا كانت صفحة الألعاب، فعل حركة البطاقات
  if (pageId === 'page-games') {
    setTimeout(() => { animateGameCardsOnScroll(); }, 150);
  }
}
  // العودة للرئيسية
      function goHome() {
  closeSidebar();
  // إخفاء كل الصفحات الفرعية
  document.querySelectorAll('section[id^="page-"]').forEach(el => {
    el.style.display = 'none';
    el.classList.remove('show');
  });
  // إظهار البطاقات والبانر الرئيسي
  document.querySelector('.card-section').style.display = 'flex';
  document.querySelector('.hero').style.display = 'block';
}
  // تواصل واتساب
  function goContact() {
    closeSidebar();
    window.open('https://wa.me/1234567890', '_blank');
  }
function showPageFromHash() {
  const hash = window.location.hash.substring(1); // يشيل #
  if (!hash || hash === "home") {
    goHome();
  } else {
    openPage("page-" + hash);
  }
}

// لما يتغير الهاش (الرابط بعد #)
window.addEventListener("hashchange", showPageFromHash);

// لما يفتح الموقع أول مرة
window.addEventListener("load", showPageFromHash);
  // حركة بطاقات الألعاب عند الظهور
  function animateGameCardsOnScroll() {
    const cards = document.querySelectorAll('.game-card');
    function checkAndAnimate() {
      cards.forEach((card, i) => {
        const rect = card.getBoundingClientRect();
        if (rect.top < window.innerHeight - 40) {
          if (!card.classList.contains('animated-in-left') && !card.classList.contains('animated-in-right')) {
            if (i % 2 === 0) {
              card.classList.add('animated-in-right');
            } else {
              card.classList.add('animated-in-left');
            }
            card.style.opacity = 1;
            card.style.transform = 'none';
          }
        }
      });
    }
    cards.forEach(card => {
      card.classList.remove('animated-in-right', 'animated-in-left');card.style.opacity = 0;
      card.style.transform = 'translateY(40px) scale(0.96)';
    });
    checkAndAnimate();
    window.removeEventListener('scroll', window._gameCardScrollHandler);
    window._gameCardScrollHandler = checkAndAnimate;
    window.addEventListener('scroll', window._gameCardScrollHandler);
  }
  // إيقاف حركة البطاقات عند الخروج من صفحة الألعاب
  document.addEventListener('DOMContentLoaded', function() {
    document.addEventListener('transitionPage', function(e) {
      if (e.detail !== 'page-games') {
        window.removeEventListener('scroll', window._gameCardScrollHandler);
      }
    });
  });
  // بحث الألعاب
  document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('game-search-input');
    const allCardsContainer = document.getElementById('all-game-cards');
    const searchCardsContainer = document.getElementById('search-game-cards');
    if (searchInput) {
      searchInput.addEventListener('input', function(e) {
        const query = e.target.value.trim().toLowerCase();
        const cards = Array.from(allCardsContainer.querySelectorAll('.game-card'));
        if (!query) {
          allCardsContainer.style.display = '';
          searchCardsContainer.style.display = 'none';
          cards.forEach(card => card.style.display = '');
          animateGameCardsOnScroll();
          return;
        }
        const foundCards = cards.filter(card => card.getAttribute('data-title').toLowerCase().includes(query));
        if (foundCards.length === 0) {
          searchCardsContainer.innerHTML = '<div style="padding:40px 0;text-align:center;color:#888;font-size:17px;">No games found</div>';
        } else {
          searchCardsContainer.innerHTML = '';
          foundCards.forEach(card => {
            const clone = card.cloneNode(true);
            clone.classList.remove('animated-in-right','animated-in-left');
            clone.style.opacity = 1;
            clone.style.transform = 'none';
            searchCardsContainer.appendChild(clone);
          });
        }
        allCardsContainer.style.display = 'none';
        searchCardsContainer.style.display = '';
      });
    }
  });// بيانات الألعاب
  // يمكنك تعديل بيانات أي لعبة من هنا
  const subwayData = {
    icon: "https://play-lh.googleusercontent.com/2hJxJv7Grj1qMTKZr9fE1k6wQF2lE6S3_7eB3oKQw9RjKZkEEhdnQd3fWn1kbr8F9w=w240-h480-rw",
    title: "Subway Surfers",
    dev: "SYBO Games",
    description: "Subway Surfers is an endless runner mobile game. Run, dodge obstacles, collect coins, and unlock new characters in the world's most popular endless runner! Enjoy smooth controls and vibrant graphics in this addictive game.",
    downloadLink: "https://play.google.com/store/apps/details?id=com.kiloo.subwaysurf",
    size: "120 MB",
    age: "7+",
    rating: "4.1",
    reviews: "37M",
    downloads: "1B+",
    img1: "https://play-lh.googleusercontent.com/2hJxJv7Grj1qMTKZr9fE1k6wQF2lE6S3_7eB3oKQw9RjKZkEEhdnQd3fWn1kbr8F9w=w240-h480-rw",
    img2: "https://play-lh.googleusercontent.com/c6H4VqD0nnt7aP5OQe0tfpOU6b_3bTR_9XKVyUkKcL5V8frQZ6Pp3y5WnT4wB9i3Cw=w240-h480-rw",
    img3: "https://play-lh.googleusercontent.com/r7v8el4w3GTIuR7QhA6z63ipL7T6Xvn2zW4Z3m3rIh8pWc4J2zvXdmwRKvGQ9S7GKw=w240-h480-rw",
  };
  const game2Data = {
    icon: "https://i.postimg.cc/7hF6wK4P/game2.png",
    title: "Game Name 2",
    dev: "Awesome Devs Studio",
    description: "Enjoy the thrill of Game 2, packed with action and adventure for hours of entertainment.",
    downloadLink: "#",
    size: "90 MB",
    age: "12+",
    rating: "4.5",
    reviews: "5M",
    downloads: "10M+",
    img1: "https://i.postimg.cc/7hF6wK4P/game2.png",
    img2: "https://i.postimg.cc/pX8c8Jmj/game3.png",
    img3: "https://i.postimg.cc/N0Jj5bXb/game4.png",
  };
  const game3Data = {
    icon: "https://i.postimg.cc/pX8c8Jmj/game3.png",
    title: "Game Name 3",
    dev: "Puzzle Minds",
    description: "Puzzle your mind with Game 3, the best logic and brain challenge for all ages.",
    downloadLink: "#",
    size: "60 MB",
    age: "3+",
    rating: "4.7",
    reviews: "1M",
    downloads: "5M+",
    img1: "https://i.postimg.cc/pX8c8Jmj/game3.png",
    img2: "https://i.postimg.cc/7hF6wK4P/game2.png",
    img3: "https://i.postimg.cc/N0Jj5bXb/game4.png",
  };
  const game4Data = {
    icon: "https://i.postimg.cc/N0Jj5bXb/game4.png",
    title: "Game Name 4",
    dev: "Game Creators",
    description: "Game 4 combines stunning graphics with addictive gameplay. Join now and compete with friends!",
    downloadLink: "#",
    size: "140 MB",
    age: "16+",
    rating: "4.4",
    reviews: "750K",
    downloads: "2M+",
    img1: "https://i.postimg.cc/N0Jj5bXb/game4.png",
    img2: "https://i.postimg.cc/pX8c8Jmj/game3.png",
    img3: "https://i.postimg.cc/7hF6wK4P/game2.png",
  };// عرض تفاصيل اللعبة
  function showGameDetails(gameData) {
  // إخفاء جميع الصفحات الفرعية فقط
  document.querySelectorAll('section[id^="page-"]').forEach(el => { el.style.display = 'none'; });

  // إخفاء البطاقات الرئيسية والأقسام الرئيسية فقط (وليس كل .card-section في الصفحة)
  document.querySelector('.card-section').style.display = 'none';
  document.querySelector('.hero').style.display = 'none';

  // تعبئة معلومات اللعبة
  document.getElementById('details-game-icon').src = gameData.icon;
  document.getElementById('details-game-title').textContent = gameData.title;
  document.getElementById('details-game-dev').textContent = gameData.dev || '';
  document.getElementById('details-game-description').textContent = gameData.description;
  document.getElementById('details-game-download-link').href = gameData.downloadLink;
  document.getElementById('details-game-size').textContent = gameData.size;
  document.getElementById('details-game-age').textContent = gameData.age;
  document.getElementById('details-game-rating').textContent = gameData.rating;
  document.getElementById('details-game-reviews').textContent = '(' + gameData.reviews + ')';
  document.getElementById('details-game-downloads').textContent = gameData.downloads;
  document.getElementById('details-game-img1').src = gameData.img1;
  document.getElementById('details-game-img2').src = gameData.img2;
  document.getElementById('details-game-img3').src = gameData.img3;
  // إظهار صفحة التفاصيل
  var detailsPage = document.getElementById('game-details-page');
  detailsPage.style.display = 'block';
  setTimeout(() => detailsPage.classList.add('show'), 50);
}
  // العودة لصفحة الألعاب من صفحة التفاصيل
  function goBackToGames() {
    var detailsPage = document.getElementById('game-details-page');
    detailsPage.classList.remove('show');
    setTimeout(() => { detailsPage.style.display = 'none'; }, 300);
    var pageGames = document.getElementById('page-games');
    pageGames.style.display = 'block';
    setTimeout(() => pageGames.classList.add('show'), 50);
    setTimeout(() => {
      if (typeof animateGameCardsOnScroll === 'function') animateGameCardsOnScroll();
    }, 200);
  }
