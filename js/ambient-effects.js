// Builds the floating particles, star field, and shooting stars.
const particleLayer = document.querySelector(".particles");
    const particleCount = 72;

    for (let i = 0; i < particleCount; i += 1) {
      const particle = document.createElement("span");
      particle.className = "particle";
      particle.style.left = `${Math.random() * 100}%`;
      particle.style.animationDuration = `${7 + Math.random() * 10}s`;
      particle.style.animationDelay = `${Math.random() * -14}s`;
      particle.style.opacity = `${0.22 + Math.random() * 0.6}`;
      particleLayer.appendChild(particle);
    }

    const cosmosLayer = document.querySelector(".cosmos");
    const starCount = 320;

    for (let i = 0; i < starCount; i += 1) {
      const star = document.createElement("span");
      const bright = Math.random() > 0.88;
      const size = bright ? 2.4 + Math.random() * 3.8 : 0.9 + Math.random() * (Math.random() > 0.86 ? 3.1 : 1.8);
      const alpha = bright ? 0.78 + Math.random() * 0.22 : 0.36 + Math.random() * 0.62;
      const isGold = Math.random() > 0.88;
      const isDeep = Math.random() > 0.68;

      star.className = `space-star${isGold ? " gold" : ""}${isDeep ? " deep" : ""}${bright ? " bright" : ""}`;
      star.style.setProperty("--star-size", `${size.toFixed(2)}px`);
      star.style.setProperty("--star-x", `${Math.random() * 100}%`);
      star.style.setProperty("--star-y", `${Math.random() * 100}%`);
      star.style.setProperty("--star-alpha", alpha.toFixed(2));
      star.style.setProperty("--twinkle-speed", `${2.4 + Math.random() * 5.2}s`);
      star.style.setProperty("--float-speed", `${18 + Math.random() * 36}s`);
      star.style.setProperty("--star-delay", `${Math.random() * -8}s`);
      star.style.setProperty("--float-delay", `${Math.random() * -30}s`);
      star.style.setProperty("--float-x", `${-18 - Math.random() * 70}px`);
      star.style.setProperty("--float-y", `${8 + Math.random() * 48}px`);
      cosmosLayer.appendChild(star);
    }

    for (let i = 0; i < 5; i += 1) {
      const shootingStar = document.createElement("span");
      shootingStar.className = "shooting-star";
      shootingStar.style.setProperty("--shoot-x", `${55 + Math.random() * 38}%`);
      shootingStar.style.setProperty("--shoot-y", `${8 + Math.random() * 44}%`);
      shootingStar.style.setProperty("--shoot-speed", `${8 + Math.random() * 7}s`);
      shootingStar.style.setProperty("--shoot-delay", `${Math.random() * -18}s`);
      cosmosLayer.appendChild(shootingStar);
    }

