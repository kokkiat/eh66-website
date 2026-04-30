function initMenuToggle() {
  var btn = document.getElementById("menu-toggle");
  var nav = document.getElementById("main-nav");
  if (!btn || !nav) {
    return;
  }

  btn.addEventListener("click", function () {
    var expanded = btn.getAttribute("aria-expanded") === "true";
    btn.setAttribute("aria-expanded", String(!expanded));
    nav.classList.toggle("is-open");
  });
}

function initRevealAnimation() {
  var items = document.querySelectorAll(".reveal");
  var observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.18 }
  );

  items.forEach(function (item) {
    observer.observe(item);
  });
}

function initMetricCounter() {
  var numbers = document.querySelectorAll(".metric-number[data-count]");
  numbers.forEach(function (numEl) {
    var target = parseInt(numEl.dataset.count || "0", 10);
    var original = numEl.textContent || "";
    var hasPlus = original.includes("+");
    var isPercent = original.includes("%");
    var current = 0;
    var step = Math.max(1, Math.floor(target / 55));

    var timer = setInterval(function () {
      current += step;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      if (isPercent) {
        numEl.textContent = current.toString() + "%";
      } else {
        numEl.textContent = current.toLocaleString() + (hasPlus ? "+" : "");
      }
    }, 22);
  });
}

window.addEventListener("DOMContentLoaded", function () {
  initMenuToggle();
  initRevealAnimation();
  initMetricCounter();
});
