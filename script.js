(() => {
  // Topbar + mobile CTA visibility
  const mobileCta = document.querySelector("[data-mobile-cta]");
  const register = document.getElementById("register");
  let registerVisible = false;

  const onScroll = () => {
    const y = window.scrollY;
    mobileCta.classList.toggle("is-on", y > window.innerHeight * 0.7 && !registerVisible);
  };
  window.addEventListener("scroll", onScroll, { passive: true });

  new IntersectionObserver(([e]) => {
    registerVisible = e.isIntersecting;
    onScroll();
  }).observe(register);
  onScroll();

  // Reading progress
  const progress = document.querySelector("[data-progress]");
  const onProgress = () => {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    progress.style.transform = `scaleX(${max > 0 ? Math.min(window.scrollY / max, 1) : 0})`;
  };
  window.addEventListener("scroll", onProgress, { passive: true });
  window.addEventListener("resize", onProgress);
  onProgress();

  // Active nav link
  const navLinks = document.querySelectorAll("[data-nav]");
  const navObserver = new IntersectionObserver(
    (entries) => entries.forEach((e) => {
      if (!e.isIntersecting) return;
      navLinks.forEach((a) => a.classList.toggle("is-active", a.hash === `#${e.target.id}`));
    }),
    { rootMargin: "-45% 0px -50% 0px" }
  );
  ["top", "about", "whom", "program", "host", "register"].forEach((id) => {
    const el = document.getElementById(id);
    if (el) navObserver.observe(el);
  });

  // Countdown to 6 Nov 2026, 18:00 Kyiv (16:00 UTC)
  const countdown = document.querySelector("[data-countdown]");
  const countdownText = countdown.querySelector("[data-countdown-text]");
  const EVENT_START = Date.UTC(2026, 10, 6, 16, 0);
  const EVENT_END = EVENT_START + 60 * 60 * 1000;
  const kyivDay = (t) => new Date(t).toLocaleDateString("en-CA", { timeZone: "Europe/Kyiv" });
  const dayWord = (n) => {
    const m10 = n % 10, m100 = n % 100;
    if (m10 === 1 && m100 !== 11) return "день";
    if (m10 >= 2 && m10 <= 4 && (m100 < 12 || m100 > 14)) return "дні";
    return "днів";
  };
  const updateCountdown = () => {
    const now = Date.now();
    const days = Math.round((new Date(kyivDay(EVENT_START)) - new Date(kyivDay(now))) / 864e5);
    let label;
    if (now >= EVENT_END) label = "Зустріч відбулася";
    else if (now >= EVENT_START) label = "Зустріч триває зараз";
    else if (days === 0) label = "Сьогодні о 18:00";
    else if (days === 1) label = "Завтра о 18:00";
    else label = `Через ${days} ${dayWord(days)} · 6 листопада, 18:00`;
    countdownText.textContent = label;
    countdown.classList.toggle("is-past", now >= EVENT_END);
  };
  updateCountdown();
  setInterval(updateCountdown, 60 * 1000);

  // Scroll reveal
  const reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) { e.target.classList.add("is-in"); io.unobserve(e.target); }
      }),
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    reveals.forEach((el) => io.observe(el));
  } else {
    reveals.forEach((el) => el.classList.add("is-in"));
  }
})();
