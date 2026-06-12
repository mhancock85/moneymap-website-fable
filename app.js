/* ============================================================
   MY MONEY MAP — Field Guide redesign
   three.js contour terrain · GSAP choreography · gauge · i18n
   ============================================================ */

(() => {
    "use strict";

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isTouch = window.matchMedia("(hover: none)").matches;
    if (prefersReduced) document.documentElement.classList.add("reduced-motion");

    /* ================= i18n ================= */
    const translations = {
        en: {
            "nav.services": "The Territory",
            "nav.instrument": "The Instrument",
            "nav.about": "The Guide",
            "nav.contact": "First Step",
            "nav.cta": "Book a free call",
            "hero.kicker": "Personal finance coaching",
            "hero.l1": "Where does",
            "hero.l2": "your money",
            "hero.l3": "actually go?",
            "hero.desc": "Expert coaching on budgeting, debt and investing. Let’s chart the route to your financial freedom — together.",
            "hero.cta1": "Start your journey",
            "hero.cta2": "Meet Marcia",
            "hero.scroll": "Scroll to begin",
            "marquee": "Budgeting · Debt · Investing · Savings · Miles · ",
            "services.kicker": "The territory",
            "services.t1": "Four routes,",
            "services.t2": "one destination.",
            "services.1.name": "Budgeting & Planning",
            "services.1.desc": "A realistic spending plan that fits your lifestyle while protecting your long-term goals.",
            "services.2.name": "Debt Management",
            "services.2.desc": "Strategies to dismantle debt efficiently and take back control of your financial health.",
            "services.3.name": "Investing Basics",
            "services.3.desc": "The stock market, demystified — building a diversified portfolio for future growth.",
            "services.4.name": "Miles & Discounts",
            "services.4.desc": "Maximise rewards, travel for less, and surface the hidden savings in everyday life.",
            "instrument.kicker": "The instrument",
            "instrument.t1": "How hard could",
            "instrument.t2": "your money work?",
            "instrument.sub": "Drag the dial. One habit — a monthly amount set aside — compounds into something bigger.",
            "instrument.permonth": "set aside per month",
            "instrument.note": "Kept up for ten years at a steady 8% annual growth, that habit becomes",
            "instrument.foot": "Illustration only — not financial advice. The map is drawn together, in coaching.",
            "instrument.figcap": "Field notes — the Money Map planner",
            "about.kicker": "The guide",
            "about.t1": "Your partner in",
            "about.t2": "wealth building.",
            "about.desc": "Financial freedom isn’t just about the numbers; it’s the confidence to live the life you want. As a Certified Personal Finance Consultant, I bridge the gap between complex financial concepts and actionable daily habits.",
            "about.c1": "Certified Personal Finance Consultant (C.P.F.E.®)",
            "about.c2": "Member of the Personal Finance Society (UK) and ABEFIN (Brazil)",
            "about.c3": "Cross-border money mentoring sessions",
            "about.c4": "Approachable, inclusive, non-judgemental",
            "about.c5": "Tailored roadmaps for every client",
            "about.cta": "Book a free discovery call",
            "contact.kicker": "The first step",
            "contact.t1": "Ready to draw",
            "contact.t2": "your map?",
            "contact.sub": "Send a message and Marcia will reply within 24 hours.",
            "contact.name": "Your name",
            "contact.email": "Your email",
            "contact.message": "Your goal",
            "contact.placeholder": "e.g. ‘Start investing’, ‘Travel planning’",
            "contact.submit": "Send message",
            "contact.sending": "Sending…",
            "contact.success": "Thank you — Marcia will be in touch soon.",
            "contact.error": "Something went wrong. Please try again or email directly.",
            "contact.figcap": "Let's start growing your money.",
            "footer.tag": "Empowering your financial future.",
            "footer.copy": "© 2026 My Money Map. All rights reserved."
        },
        pt: {
            "nav.services": "O Território",
            "nav.instrument": "O Instrumento",
            "nav.about": "A Guia",
            "nav.contact": "Primeiro Passo",
            "nav.cta": "Agende uma chamada",
            "hero.kicker": "Consultoria financeira pessoal",
            "hero.l1": "Para onde vai",
            "hero.l2": "o seu dinheiro,",
            "hero.l3": "de verdade?",
            "hero.desc": "Consultoria especializada em orçamento, dívidas e investimentos. Vamos traçar juntos a rota para a sua liberdade financeira.",
            "hero.cta1": "Comece sua jornada",
            "hero.cta2": "Conheça a Marcia",
            "hero.scroll": "Role para começar",
            "marquee": "Orçamento · Dívidas · Investimentos · Poupança · Milhas · ",
            "services.kicker": "O território",
            "services.t1": "Quatro rotas,",
            "services.t2": "um destino.",
            "services.1.name": "Orçamento & Planejamento",
            "services.1.desc": "Um plano de gastos realista, que cabe no seu estilo de vida e protege seus objetivos de longo prazo.",
            "services.2.name": "Gestão de Dívidas",
            "services.2.desc": "Estratégias para eliminar dívidas com eficiência e retomar o controle da sua saúde financeira.",
            "services.3.name": "Investimentos para Iniciantes",
            "services.3.desc": "O mercado financeiro, descomplicado — construindo uma carteira diversificada para o futuro.",
            "services.4.name": "Milhas & Descontos",
            "services.4.desc": "Maximize recompensas, viaje gastando menos e descubra economias escondidas no dia a dia.",
            "instrument.kicker": "O instrumento",
            "instrument.t1": "Quão longe pode ir",
            "instrument.t2": "o seu dinheiro?",
            "instrument.sub": "Arraste o medidor. Um hábito — um valor guardado por mês — se transforma em algo bem maior.",
            "instrument.permonth": "guardado por mês",
            "instrument.note": "Mantido por dez anos com crescimento de 8% ao ano, esse hábito se torna",
            "instrument.foot": "Apenas ilustrativo — não é aconselhamento financeiro. O mapa é desenhado junto, na consultoria.",
            "instrument.figcap": "Notas de campo — o planner Money Map",
            "about.kicker": "A guia",
            "about.t1": "Sua parceira na",
            "about.t2": "construção de patrimônio.",
            "about.desc": "Liberdade financeira não é só sobre números; é a confiança de viver a vida que você quer. Como Consultora de Finanças Pessoais Certificada, eu conecto conceitos financeiros complexos a hábitos diários práticos.",
            "about.c1": "Consultora de Finanças Pessoais Certificada (C.P.F.E.®)",
            "about.c2": "Membro da Personal Finance Society (Reino Unido) e da ABEFIN (Brasil)",
            "about.c3": "Mentorias financeiras internacionais, entre países",
            "about.c4": "Acolhedora, inclusiva e sem julgamentos",
            "about.c5": "Roteiros personalizados para cada cliente",
            "about.cta": "Agende uma conversa gratuita",
            "contact.kicker": "O primeiro passo",
            "contact.t1": "Pronto para desenhar",
            "contact.t2": "o seu mapa?",
            "contact.sub": "Envie uma mensagem e a Marcia responde em até 24 horas.",
            "contact.name": "Seu nome",
            "contact.email": "Seu e-mail",
            "contact.message": "Seu objetivo",
            "contact.placeholder": "ex.: ‘Começar a investir’, ‘Planejar viagens’",
            "contact.submit": "Enviar mensagem",
            "contact.sending": "Enviando…",
            "contact.success": "Obrigada — a Marcia entrará em contato em breve.",
            "contact.error": "Algo deu errado. Tente novamente ou envie um e-mail diretamente.",
            "contact.figcap": "Vamos começar a fazer o seu dinheiro crescer.",
            "footer.tag": "Fortalecendo o seu futuro financeiro.",
            "footer.copy": "© 2026 My Money Map. Todos os direitos reservados."
        }
    };

    let currentLang = localStorage.getItem("mmm-lang") || "en";

    function applyLang(lang) {
        currentLang = lang;
        localStorage.setItem("mmm-lang", lang);
        document.body.dataset.lang = lang;
        document.documentElement.lang = lang === "pt" ? "pt-BR" : "en";
        const dict = translations[lang];
        document.querySelectorAll("[data-i18n]").forEach(el => {
            const key = el.dataset.i18n;
            if (dict[key] !== undefined) el.textContent = dict[key];
        });
        document.querySelectorAll("[data-i18n-placeholder]").forEach(el => {
            const key = el.dataset.i18nPlaceholder;
            if (dict[key] !== undefined) el.placeholder = dict[key];
        });
        document.querySelectorAll(".lang-btn").forEach(btn =>
            btn.classList.toggle("active", btn.dataset.lang === lang));
    }

    document.querySelectorAll(".lang-btn").forEach(btn =>
        btn.addEventListener("click", () => applyLang(btn.dataset.lang)));

    applyLang(currentLang);

    /* ================= Smooth scroll (Lenis) ================= */
    let lenis = null;
    if (!prefersReduced && typeof Lenis !== "undefined") {
        lenis = new Lenis({ lerp: 0.1, smoothWheel: true });
        lenis.on("scroll", () => { if (window.ScrollTrigger) ScrollTrigger.update(); });
        gsap.ticker.add(t => lenis.raf(t * 1000));
        gsap.ticker.lagSmoothing(0);

        // Anchor links route through Lenis so smooth scroll isn't bypassed
        document.querySelectorAll('a[href^="#"]').forEach(a => {
            a.addEventListener("click", e => {
                const target = document.querySelector(a.getAttribute("href"));
                if (target) { e.preventDefault(); lenis.scrollTo(target, { offset: -70 }); }
            });
        });
    }

    /* ================= three.js contour terrain ================= */
    const canvas = document.getElementById("terrain");
    if (canvas && typeof THREE !== "undefined" && !prefersReduced) {
        const hero = document.getElementById("hero");
        const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(55, 1, 0.1, 100);
        camera.position.set(0, 4.2, 7.5);
        camera.lookAt(0, 0, 0);

        const COLS = 90, ROWS = 55;
        const geo = new THREE.PlaneGeometry(26, 15, COLS, ROWS);
        geo.rotateX(-Math.PI / 2);
        const basePos = geo.attributes.position.array.slice();

        const mat = new THREE.MeshBasicMaterial({
            color: 0xc0431f,
            wireframe: true,
            transparent: true,
            opacity: 0.10
        });
        const terrain = new THREE.Mesh(geo, mat);
        terrain.position.y = -1.4;
        scene.add(terrain);

        // Cheap layered-sine "noise" — no library needed, looks like contours in motion
        function height(x, z, t) {
            return (
                Math.sin(x * 0.55 + t * 0.45) * 0.55 +
                Math.sin(z * 0.85 + t * 0.32) * 0.45 +
                Math.sin((x + z) * 0.32 + t * 0.6) * 0.35 +
                Math.sin(Math.sqrt(x * x + z * z) * 0.7 - t * 0.5) * 0.25
            );
        }

        let mouseX = 0, mouseY = 0;
        window.addEventListener("pointermove", e => {
            mouseX = (e.clientX / window.innerWidth - 0.5);
            mouseY = (e.clientY / window.innerHeight - 0.5);
        }, { passive: true });

        function resize() {
            const w = hero.clientWidth, h = hero.clientHeight;
            renderer.setSize(w, h, false);
            camera.aspect = w / h;
            camera.updateProjectionMatrix();
        }
        resize();
        window.addEventListener("resize", resize);

        const pos = geo.attributes.position;
        let rafId;
        function tick(now) {
            const t = now * 0.001;
            for (let i = 0; i < pos.count; i++) {
                const x = basePos[i * 3], z = basePos[i * 3 + 2];
                pos.array[i * 3 + 1] = height(x, z, t);
            }
            pos.needsUpdate = true;
            camera.position.x += (mouseX * 1.4 - camera.position.x) * 0.04;
            camera.position.y += (4.2 - mouseY * 1.2 - camera.position.y) * 0.04;
            camera.lookAt(0, 0, 0);
            renderer.render(scene, camera);
            rafId = requestAnimationFrame(tick);
        }
        rafId = requestAnimationFrame(tick);

        // Pause rendering when hero is off-screen — keeps scroll buttery
        new IntersectionObserver(entries => {
            entries.forEach(en => {
                if (en.isIntersecting) {
                    if (!rafId) rafId = requestAnimationFrame(tick);
                } else {
                    cancelAnimationFrame(rafId);
                    rafId = null;
                }
            });
        }).observe(hero);
    }

    /* ================= GSAP choreography ================= */
    if (typeof gsap !== "undefined") {
        gsap.registerPlugin(ScrollTrigger);

        // --- Loader → hero entrance ---
        const intro = gsap.timeline();
        if (!prefersReduced) {
            intro
                .from(".loader-word", { yPercent: 110, duration: 0.9, ease: "power3.out" })
                .to(".loader-rule", { scaleX: 1, duration: 0.7, ease: "power2.inOut" }, "-=0.3")
                .to("#loader", { yPercent: -100, duration: 0.9, ease: "power3.inOut", delay: 0.2 })
                .set("#loader", { display: "none" })
                .from(".hero-title .line-inner", {
                    yPercent: 115, duration: 1.1, stagger: 0.12, ease: "power3.out"
                }, "-=0.55")
                .from(".hero-kicker, .hero-desc, .hero-ctas, .hero-scroll", {
                    opacity: 0, y: 24, duration: 0.8, stagger: 0.08, ease: "power2.out"
                }, "-=0.6");
        } else {
            gsap.set("#loader", { display: "none" });
        }

        // --- Scroll reveals ---
        gsap.utils.toArray(".reveal").forEach(el => {
            gsap.to(el, {
                opacity: 1, y: 0, duration: 1, ease: "power3.out",
                scrollTrigger: { trigger: el, start: "top 86%" }
            });
        });

        // --- Image clip reveals ---
        if (!prefersReduced) {
            document.querySelectorAll(".reveal-img").forEach(wrap => {
                gsap.fromTo(wrap,
                    { clipPath: "inset(0 0 100% 0)" },
                    {
                        clipPath: "inset(0 0 0% 0)", duration: 1.3, ease: "power3.inOut",
                        scrollTrigger: { trigger: wrap, start: "top 80%" }
                    });
                gsap.fromTo(wrap.querySelector("img"),
                    { scale: 1.18 },
                    {
                        scale: 1, duration: 1.6, ease: "power2.out",
                        scrollTrigger: { trigger: wrap, start: "top 80%" }
                    });
            });
        }

        // --- Marquee: duplicate content, infinite drift, scroll-direction aware ---
        const track = document.getElementById("marqueeTrack");
        if (track && !prefersReduced) {
            const seq = track.querySelector(".marquee-seq");
            for (let i = 0; i < 5; i++) track.appendChild(seq.cloneNode(true));
            const drift = gsap.to(track, { xPercent: -50, duration: 30, ease: "none", repeat: -1 });
            ScrollTrigger.create({
                onUpdate: self => { drift.timeScale(self.direction === -1 ? -1 : 1); }
            });
        }

        // --- Nav: hide on scroll down, show on scroll up ---
        const nav = document.getElementById("nav");
        ScrollTrigger.create({
            start: "top -120",
            onUpdate: self => nav.classList.toggle("is-hidden", self.direction === 1),
            onLeaveBack: () => nav.classList.remove("is-hidden")
        });
    }

    /* ================= The Instrument (gauge) ================= */
    const range = document.getElementById("amountRange");
    if (range) {
        const needle = document.getElementById("gaugeNeedle");
        const fill = document.getElementById("gaugeFill");
        const ticksGroup = document.getElementById("gaugeTicks");
        const gaugeValue = document.getElementById("gaugeValue");
        const projValue = document.getElementById("projValue");

        const ARC_LEN = Math.PI * 120; // semicircle r=120
        fill.style.strokeDasharray = ARC_LEN;

        // Ticks every 22.5° along the arc
        const CX = 150, CY = 160, R = 120;
        for (let i = 0; i <= 8; i++) {
            const a = Math.PI - (i / 8) * Math.PI; // 180° → 0°
            const x1 = CX + Math.cos(a) * (R - 2), y1 = CY - Math.sin(a) * (R - 2);
            const x2 = CX + Math.cos(a) * (R - (i % 4 === 0 ? 14 : 8));
            const y2 = CY - Math.sin(a) * (R - (i % 4 === 0 ? 14 : 8));
            const tick = document.createElementNS("http://www.w3.org/2000/svg", "line");
            tick.setAttribute("x1", x1); tick.setAttribute("y1", y1);
            tick.setAttribute("x2", x2); tick.setAttribute("y2", y2);
            tick.setAttribute("class", "gauge-tick");
            ticksGroup.appendChild(tick);
        }

        // FV of monthly contributions: m × ((1+i)^N − 1)/i × (1+i), 8%/yr, 10yrs
        const i = 0.08 / 12, N = 120;
        const FACTOR = ((Math.pow(1 + i, N) - 1) / i) * (1 + i);

        const fmt = v => "£" + Math.round(v).toLocaleString(currentLang === "pt" ? "pt-BR" : "en-GB");
        const state = { amount: Number(range.value), shown: Number(range.value) * FACTOR };

        function render() {
            const frac = state.amount / 1000;
            const deg = -90 + frac * 180;
            if (typeof gsap !== "undefined" && !prefersReduced) {
                gsap.to(needle, { rotation: deg, svgOrigin: "150 160", duration: 0.6, ease: "power3.out" });
                gsap.to(fill, { strokeDashoffset: ARC_LEN * (1 - frac), duration: 0.6, ease: "power3.out" });
                gsap.to(state, {
                    shown: state.amount * FACTOR, duration: 0.7, ease: "power2.out",
                    onUpdate: () => { projValue.textContent = fmt(state.shown); }
                });
            } else {
                needle.style.transform = `rotate(${deg}deg)`;
                fill.style.strokeDashoffset = ARC_LEN * (1 - frac);
                projValue.textContent = fmt(state.amount * FACTOR);
            }
            gaugeValue.textContent = fmt(state.amount);
        }

        range.addEventListener("input", () => { state.amount = Number(range.value); render(); });
        render();
    }

    /* ================= Magnetic buttons + cursor ================= */
    if (!isTouch && !prefersReduced && typeof gsap !== "undefined") {
        document.querySelectorAll(".magnetic").forEach(el => {
            el.addEventListener("pointermove", e => {
                const r = el.getBoundingClientRect();
                gsap.to(el, {
                    x: (e.clientX - r.left - r.width / 2) * 0.25,
                    y: (e.clientY - r.top - r.height / 2) * 0.35,
                    duration: 0.4, ease: "power2.out"
                });
            });
            el.addEventListener("pointerleave", () =>
                gsap.to(el, { x: 0, y: 0, duration: 0.5, ease: "elastic.out(1, 0.4)" }));
        });

        const dot = document.querySelector(".cursor-dot");
        const ring = document.querySelector(".cursor-ring");
        const setDot = { x: gsap.quickTo(dot, "x", { duration: 0.08 }), y: gsap.quickTo(dot, "y", { duration: 0.08 }) };
        const setRing = { x: gsap.quickTo(ring, "x", { duration: 0.35, ease: "power3" }), y: gsap.quickTo(ring, "y", { duration: 0.35, ease: "power3" }) };
        window.addEventListener("pointermove", e => {
            setDot.x(e.clientX - 3); setDot.y(e.clientY - 3);
            setRing.x(e.clientX - 17); setRing.y(e.clientY - 17);
        }, { passive: true });
        document.querySelectorAll("a, button, input, .service-row").forEach(el => {
            el.addEventListener("pointerenter", () => ring.classList.add("is-hover"));
            el.addEventListener("pointerleave", () => ring.classList.remove("is-hover"));
        });
    }

    /* ================= Contact form (same Apps Script endpoint) ================= */
    const form = document.getElementById("contactForm");
    if (form) {
        const submitBtn = document.getElementById("submitBtn");
        const formMsg = document.getElementById("formMsg");
        const ENDPOINT = "https://script.google.com/macros/s/AKfycbyJsso4KsPVc1xsnP0p_YmVTsP5mkt5xBe5h2n2CTx6D8hIr3GTLFq6tdaPcpiAkaOnAA/exec";

        form.addEventListener("submit", async e => {
            e.preventDefault();
            if (!form.reportValidity()) return;
            const dict = translations[currentLang];
            submitBtn.disabled = true;
            submitBtn.textContent = dict["contact.sending"];
            formMsg.textContent = "";
            formMsg.className = "form-msg mono";

            try {
                await fetch(ENDPOINT, {
                    method: "POST",
                    mode: "no-cors",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        name: document.getElementById("contactName").value,
                        email: document.getElementById("contactEmail").value,
                        message: document.getElementById("contactMessage").value
                    })
                });
                formMsg.textContent = dict["contact.success"];
                formMsg.classList.add("ok");
                form.reset();
            } catch (err) {
                console.error("Form submission error:", err);
                formMsg.textContent = dict["contact.error"];
                formMsg.classList.add("err");
            } finally {
                submitBtn.disabled = false;
                submitBtn.textContent = dict["contact.submit"];
            }
        });
    }
})();
