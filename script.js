// Peoplise — Premium SaaS Script v3
document.addEventListener('DOMContentLoaded', () => {
    // Navbar scroll
    const nav = document.getElementById('navbar');
    window.addEventListener('scroll', () => nav.classList.toggle('scrolled', scrollY > 10), { passive: true });

    // Mobile menu
    const ham = document.getElementById('hamburger');
    const menu = document.getElementById('navMenu');
    ham.addEventListener('click', () => {
        menu.classList.toggle('open');
        const s = ham.querySelectorAll('span');
        const o = menu.classList.contains('open');
        s[0].style.transform = o ? 'rotate(45deg) translate(4px,4px)' : '';
        s[1].style.transform = o ? 'rotate(-45deg) translate(4px,-4px)' : '';
    });
    menu.querySelectorAll('a').forEach(a => {
        // Don't close menu on dropdown trigger click
        if (a.classList.contains('nav-drop-trigger')) return;
        a.addEventListener('click', () => {
            menu.classList.remove('open');
            ham.querySelectorAll('span').forEach(s => s.style.transform = '');
            document.querySelectorAll('.nav-dropdown').forEach(d => d.classList.remove('open'));
        });
    });

    // Dropdown menu
    const dropdown = document.getElementById('navDropdown');
    if (dropdown) {
        const trigger = dropdown.querySelector('.nav-drop-trigger');
        let closeTimer;

        // Desktop: hover behavior
        dropdown.addEventListener('mouseenter', () => {
            clearTimeout(closeTimer);
            dropdown.classList.add('open');
        });
        dropdown.addEventListener('mouseleave', () => {
            closeTimer = setTimeout(() => dropdown.classList.remove('open'), 200);
        });

        // Mobile & desktop: click toggle
        trigger.addEventListener('click', (e) => {
            if (window.innerWidth <= 768) {
                e.preventDefault();
                dropdown.classList.toggle('open');
            }
        });

        // Close dropdown when clicking outside
        document.addEventListener('click', (e) => {
            if (!dropdown.contains(e.target)) {
                dropdown.classList.remove('open');
            }
        });

        // Close on dropdown item click
        dropdown.querySelectorAll('.drop-item').forEach(item => {
            item.addEventListener('click', () => {
                dropdown.classList.remove('open');
                menu.classList.remove('open');
                ham.querySelectorAll('span').forEach(s => s.style.transform = '');
            });
        });
    }

    // ===== Testimonial Slider =====
    const testimonials = [
        {
            quote: "CaseBot'u tüm ofis çalışanı işe alım ve yeni devreye aldığımız Gelecek Takımı Aday Mühendis Programı süreçlerimizde kullanmaya başladık. CaseBot ile aday deneyimini iyileştirerek, adaylarımızın süreçlerimizdeki memnuniyetlerini arttırdık. Biz İnsan Kaynakları Uzmanları adına da işe alım sürecimize daha hızlı devam edebilmemizi sağlayan ve süreci daha efektif bir şekilde tamamlamamıza olanak tanıyan bir sistem oldu.",
            company: "Ford Otosan",
            initials: "FO",
            color: "#F5A623"
        },
        {
            quote: "Mercedes-Benz Türk olarak işe alım süreçlerimizi kurgularken dijitalleşme ve teknoloji konusundaki trendleri yakından takip ediyoruz. Aday sürecini ve bu süreçteki tüm iletişimi tasarlayabildiğimiz, çeşitli raporlarla verimliliğimizi ölçümleyebildiğimiz Peoplise'ın bu konuda bizleri desteklediğine inanıyor; 2018'den beri staj programlarımızı bu platformdan yürütüyoruz.",
            company: "Mercedes-Benz Türk",
            initials: "MB",
            color: "#6C5CE7"
        },
        {
            quote: "İnsan Kaynakları gibi süreçlerin, belgelerin ve operasyonun hem yoğun hem karmaşık olduğu bir birimde Peoplise gibi bir iş ortağına sahip olmak elimizi çok güçlendiriyor. Onboarding ve işe alım uygulamalarımızdaki farklı süreçlerin dijitalleştirilmesinde birlikte çalıştığımız Peoplise ekibi gerek sürekli destek yeteneği, gerek ihtiyaçlarımız doğrultusunda geliştirmeye açık oluşları ile tam anlamıyla bu çağa uygun bir partner.",
            company: "SunExpress",
            initials: "SE",
            color: "#00B894"
        }
    ];

    let currentTest = 0;
    const quoteEl = document.getElementById('testQuote');
    const companyEl = document.getElementById('testCompany');
    const avatarEl = document.getElementById('testAvatar');
    const dots = document.querySelectorAll('.test-dot');

    function showTestimonial(idx) {
        const t = testimonials[idx];
        // Fade out
        quoteEl.style.opacity = '0';
        avatarEl.style.opacity = '0';
        companyEl.style.opacity = '0';
        setTimeout(() => {
            quoteEl.textContent = t.quote;
            companyEl.textContent = t.company;
            avatarEl.textContent = t.initials;
            avatarEl.style.background = t.color;
            // Fade in
            quoteEl.style.opacity = '1';
            avatarEl.style.opacity = '1';
            companyEl.style.opacity = '1';
        }, 300);
        dots.forEach((d, i) => d.classList.toggle('active', i === idx));
        currentTest = idx;
    }

    // Initialize first
    showTestimonial(0);
    quoteEl.style.opacity = '1';
    avatarEl.style.opacity = '1';
    companyEl.style.opacity = '1';

    // Dot clicks
    dots.forEach(d => d.addEventListener('click', () => showTestimonial(+d.dataset.index)));

    // Auto-rotate
    setInterval(() => {
        showTestimonial((currentTest + 1) % testimonials.length);
    }, 6000);

    // ===== Stats counter =====
    let done = false;
    function runStats() {
        if (done) return; done = true;
        document.querySelectorAll('.stat-num[data-target]').forEach(el => {
            const t = +el.dataset.target, s = performance.now(), d = 2000;
            (function tick(n) {
                const p = Math.min((n - s) / d, 1), e = 1 - (1 - p) ** 3, v = Math.round(t * e);
                el.textContent = t >= 1e6 ? (v >= t ? '1M' : (v / 1e6).toFixed(1).replace('.', ',')) : v.toLocaleString('tr-TR');
                if (p < 1) requestAnimationFrame(tick);
            })(s);
        });
    }
    const st = document.querySelector('.stats');
    if (st) new IntersectionObserver(([e], o) => { if (e.isIntersecting) { runStats(); o.unobserve(e.target); } }, { threshold: .2 }).observe(st);

    // ===== Fade-up =====
    const els = document.querySelectorAll('.feat-row, .test-slider, .price-card, .section-head');
    els.forEach(el => el.classList.add('fade-up'));
    const fobs = new IntersectionObserver(entries => {
        entries.forEach((e, i) => {
            if (e.isIntersecting) { setTimeout(() => e.target.classList.add('visible'), i * 60); fobs.unobserve(e.target); }
        });
    }, { threshold: .06, rootMargin: '0px 0px -20px 0px' });
    els.forEach(el => fobs.observe(el));

    // ===== Smooth scroll =====
    document.querySelectorAll('a[href^="#"]').forEach(a => {
        a.addEventListener('click', e => {
            const t = document.querySelector(a.getAttribute('href'));
            if (t) { e.preventDefault(); window.scrollTo({ top: t.offsetTop - 76, behavior: 'smooth' }); }
        });
    });
});
