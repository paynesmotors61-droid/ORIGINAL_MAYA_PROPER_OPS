 "use client";

import { useEffect, useRef, useState } from "react";
import { Manrope } from "next/font/google";


const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

const services = [
  {
    number: "01",
    eyebrow: "One-Off Project",
    title: "Systems Architecture & Operational Audits",
    text:
      "A focused review of how your business currently operates — identifying bottlenecks, duplicated effort, unclear ownership and the systems that are slowing delivery down.",
    items: [
      "Operational workflow and systems audit",
      "Documented SOPs, process mapping and handovers",
      "CRM, onboarding and project-board optimisation",
      "Prioritised recommendations for what to fix first",
    ],
  },
  {
    number: "02",
    eyebrow: "Ongoing Monthly Support",
    title: "Ongoing Operational Retainers",
    text:
      "Ongoing hands-on operational support that keeps delivery moving, protects the client experience and reduces the amount of day-to-day coordination sitting with the founder.",
    items: [
      "CRM, onboarding and client-care pipeline management",
      "Inbox, scheduling and communication triage",
      "Project coordination and operational follow-through",
      "Day-to-day administrative infrastructure",
    ],
  },
  {
    number: "03",
    eyebrow: "Fractional Operations Partner",
    title: "Fractional Operations Leadership",
    text:
      "Senior operational oversight for growing service businesses that need stronger systems, clearer ownership and more consistent delivery without hiring a full-time operations lead.",
    items: [
      "Strategic operational planning and priorities",
      "Team and subcontractor coordination",
      "Clearer ownership, accountability and handovers",
      "Ongoing governance and process refinement",
    ],
  },
];

const principles = [
  ["01", "Diagnose first", "We start by understanding how the business actually runs — not how it is supposed to run."],
  ["02", "Build what is useful", "Systems are designed around the work, the people and the client journey rather than unnecessary software."],
  ["03", "Embed the structure", "The goal is straightforward: fewer operational bottlenecks, clearer ownership and less founder dependency."],
];


const approachCards = [
  {
    number: "01",
    title: "Diagnose first",
    text:
      "We start by understanding how the business actually runs — not how it is supposed to run. That means reviewing the real workflows, handovers, systems, communication points and founder dependencies that shape day-to-day delivery before deciding what needs to change.",
  },
  {
    number: "02",
    title: "Build what is useful",
    text:
      "We design systems around the work, the people and the client journey rather than adding unnecessary software. Every process has to earn its place by making delivery clearer, reducing duplication and giving the team a more reliable way to work.",
  },
  {
    number: "03",
    title: "Embed the structure",
    text:
      "The goal is fewer operational bottlenecks, clearer ownership and less founder dependency. When the structure is right, the business becomes easier to manage, easier to delegate and more consistent for both the team and the client.",
  },
];

function CountUp({
  start,
  target,
  suffix = "",
  duration = 1450,
}: {
  start: number;
  target: number;
  suffix?: string;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const [value, setValue] = useState(start);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (reducedMotion) {
      setValue(target);
      return;
    }

    let animationFrame: number | null = null;

    const runAnimation = () => {
      if (animationFrame !== null) {
        cancelAnimationFrame(animationFrame);
      }

      setValue(start);
      const startedAt = performance.now();
      const range = target - start;

      const animate = (now: number) => {
        const progress = Math.min((now - startedAt) / duration, 1);
        const eased =
          progress < 0.5
            ? 4 * progress * progress * progress
            : 1 - Math.pow(-2 * progress + 2, 3) / 2;

        setValue(Math.round(start + range * eased));

        if (progress < 1) {
          animationFrame = requestAnimationFrame(animate);
        } else {
          animationFrame = null;
        }
      };

      animationFrame = requestAnimationFrame(animate);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          runAnimation();
        } else {
          if (animationFrame !== null) {
            cancelAnimationFrame(animationFrame);
            animationFrame = null;
          }
          setValue(start);
        }
      },
      {
        threshold: 0,
        rootMargin: "24% 0px 0px 0px",
      }
    );

    observer.observe(node);

    return () => {
      observer.disconnect();
      if (animationFrame !== null) cancelAnimationFrame(animationFrame);
    };
  }, [duration, start, target]);

  return (
    <span ref={ref} className="tabular-nums">
      {value}
      {suffix}
    </span>
  );
}


function usePremiumRevealSystem(enabled: boolean) {
  useEffect(() => {
    if (!enabled) return;

    const root = document.querySelector<HTMLElement>("[data-premium-page]");
    if (!root) return;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const reveal = (
      element: Element | null,
      type: "up" | "left" | "right" | "image" = "up",
      delay = 0
    ) => {
      if (!(element instanceof HTMLElement)) return;
      if (element.dataset.reveal) return;

      element.dataset.reveal = type;
      element.dataset.revealState = reducedMotion ? "visible" : "hidden";
      element.style.transitionDelay = `${delay}ms`;
    };

    root
      .querySelectorAll<HTMLElement>('[data-reveal-section="services"]')
      .forEach((section) => {
        reveal(section.querySelector("h2"), "up", 0);
        reveal(section.querySelector('img[alt="Proper Ops"]'), "image", 90);

        section.querySelectorAll("article").forEach((card, index) => {
          reveal(card, "up", 120 + index * 90);
        });
      });

    root
      .querySelectorAll<HTMLElement>('[data-reveal-section="stats"]')
      .forEach((section) => {
        const statItems = section.querySelectorAll(
          ".premium-stat-item"
        );
        statItems.forEach((item, index) => {
          reveal(item, "up", index * 100);
        });
      });

    root
      .querySelectorAll<HTMLElement>('[data-reveal-section="approach"]')
      .forEach((section) => {
        reveal(section.querySelector(".premium-approach-label"), "up", 0);

        section.querySelectorAll("h2").forEach((heading, index) => {
          reveal(heading, index % 2 === 0 ? "left" : "up", 60);
        });

        section.querySelectorAll("p").forEach((paragraph, index) => {
          reveal(paragraph, "up", 140 + Math.min(index, 3) * 70);
        });

        section.querySelectorAll(".approach-principle").forEach((item, index) => {
          reveal(item, "up", 180 + index * 75);
        });
      });

    root
      .querySelectorAll<HTMLElement>('[data-reveal-section="about-maya"]')
      .forEach((section) => {
        reveal(section.querySelector("h2"), "left", 0);

        section.querySelectorAll(".premium-maya-copy > p").forEach((paragraph, index) => {
          reveal(paragraph, "up", Math.min(index, 4) * 55);
        });

        reveal(section.querySelector(".premium-maya-signature"), "up", 80);
        reveal(section.querySelector(".premium-maya-cta"), "up", 150);
        reveal(section.querySelector(".premium-maya-portrait"), "image", 80);
      });

    root
      .querySelectorAll<HTMLElement>('[data-reveal-section="quote"]')
      .forEach((section) => {
        reveal(section.querySelector("blockquote"), "up", 0);
        reveal(section.querySelector(".premium-quote-attribution"), "up", 130);
      });

    root
      .querySelectorAll<HTMLElement>('[data-reveal-section="reviews"]')
      .forEach((section) => {
        reveal(section.querySelector(".reviews-heading h2"), "up", 0);
        reveal(section.querySelector(".reviews-heading .intro"), "up", 90);

        section.querySelectorAll(".review-card").forEach((card, index) => {
          reveal(card, "up", 140 + index * 100);
        });
      });

    root
      .querySelectorAll<HTMLElement>('[data-reveal-section="working"]')
      .forEach((section) => {
        reveal(section.querySelector("h2"), "up", 0);

        section.querySelectorAll(".premium-working-point").forEach((point, index) => {
          reveal(point, "up", 120 + index * 100);
        });
      });

    root
      .querySelectorAll<HTMLElement>('[data-reveal-section="contact"]')
      .forEach((section) => {
        reveal(section.querySelector(".premium-contact-copy"), "left", 0);
        reveal(section.querySelector("form"), "right", 110);
      });

    root
      .querySelectorAll<HTMLElement>('[data-reveal-section="book"]')
      .forEach((section) => {
        reveal(section.querySelector("h2"), "left", 0);
        reveal(section.querySelector(".premium-book-cta"), "right", 110);
      });

    root
      .querySelectorAll<HTMLElement>('[data-reveal-section="footer"]')
      .forEach((footer) => {
        footer
          .querySelectorAll(".premium-footer-group")
          .forEach((group, index) => {
            reveal(group, "up", index * 80);
          });

        reveal(footer.querySelector(".premium-footer-legal"), "up", 180);
      });

    const targets = Array.from(
      root.querySelectorAll<HTMLElement>('[data-reveal][data-reveal-state="hidden"]')
    );

    if (
      reducedMotion ||
      typeof IntersectionObserver === "undefined"
    ) {
      targets.forEach((target) => {
        target.dataset.revealState = "visible";
      });
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          const target = entry.target as HTMLElement;
          target.dataset.revealState = "visible";
          observer.unobserve(target);
        });
      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -8% 0px",
      }
    );

    targets.forEach((target) => observer.observe(target));

    return () => observer.disconnect();
  }, [enabled]);
}

function ReviewsSection() {
  return (
    <section className="reviews-section" data-reveal-section="reviews">
      <div className="reviews-inner">
        <div className="reviews-heading">
          <h2 className="font-serif text-[42px] font-semibold leading-[1.02] tracking-[-0.035em] md:text-[54px]">
            What our clients have to say
          </h2>

          <p className="intro">
            Feedback from clients on the clarity, structure and operational support they have
            <br className="desktop-break" />
            gained through working together.
          </p>
        </div>

        <div className="review-grid">
          <article className="review-card">
            <div className="rating-mark" aria-hidden="true">
              <span className="quote-mark">“</span>
              <span className="stars">★★★★★</span>
            </div>

            <p className="review-copy">
              "Maya quickly spotted the parts of the business that were creating unnecessary work for us. The new systems are clearer, easier to manage and have taken a lot off my plate. Thank you, Maya."
            </p>

            <div className="review-person">
              <strong>Craig Sawyer</strong>
              <span>CEO</span>
            </div>
          </article>

          <article className="review-card">
            <div className="rating-mark" aria-hidden="true">
              <span className="quote-mark">“</span>
              <span className="stars">★★★★★</span>
            </div>

            <p className="review-copy">
              "Working with Maya has made the day-to-day side of the business feel far more organised. She understood how we actually work and built processes around us rather than forcing a template."
            </p>

            <div className="review-person">
              <strong>Malcolm Gilberston</strong>
              <span>CEO</span>
            </div>
          </article>

          <article className="review-card">
            <div className="rating-mark" aria-hidden="true">
              <span className="quote-mark">“</span>
              <span className="stars">★★★★★</span>
            </div>

            <p className="review-copy">
              "Proper Ops has brought real structure to the backend of the business. Maya simplified our onboarding and handovers and gave us a much clearer way of working. I’m genuinely grateful."
            </p>

            <div className="review-person">
              <strong>Rowan Matthews</strong>
              <span>Operations Manager</span>
            </div>
          </article>
        </div>
      </div>

      <style>{`
        .reviews-section {
          width: 100%;
          background: #F8FAFC;
          color: #0a0b0f;
          border-top: 9px solid #1D3528;
          padding: 50px 0 56px;
          box-sizing: border-box;
        }

        .reviews-inner {
          width: calc(100% - 250px);
          max-width: 1665px;
          margin: 0 auto;
        }

        .reviews-heading {
          text-align: center;
        }

        .eyebrow {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 14px;
          color: #d6a428;
          font-size: 16px;
          line-height: 1;
          font-weight: 700;
          letter-spacing: -0.2px;
          margin-bottom: 24px;
        }

        .eyebrow-line {
          width: 22px;
          height: 4px;
          border-radius: 999px;
          background: #d6a428;
          display: inline-block;
        }

        .reviews-heading h2 {
          margin: 0;
        }

        .intro {
          margin: 22px 0 0;
          font-size: 20px;
          line-height: 1.35;
          letter-spacing: -0.35px;
          font-weight: 400;
        }

        .review-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 24px;
          margin-top: 40px;
        }

        .review-card {
          min-height: 318px;
          background: #f8f7f3;
          padding: 40px 42px 36px;
          box-sizing: border-box;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
        }

        .rating-mark {
          position: relative;
          width: 118px;
          height: 46px;
          margin-bottom: 6px;
        }

        .quote-mark {
          position: absolute;
          left: -3px;
          top: -23px;
          display: block;
          color: #efe4c5;
          font-family: Georgia, "Times New Roman", serif;
          font-size: 84px;
          line-height: 1;
          font-weight: 700;
          letter-spacing: -14px;
          transform: scaleX(1.15);
          transform-origin: left center;
        }

        .stars {
          position: absolute;
          left: 8px;
          bottom: 3px;
          color: #e6a23c;
          font-size: 17px;
          line-height: 1;
          letter-spacing: 0px;
          white-space: nowrap;
        }

        .review-copy {
          margin: 0;
          font-size: 17px;
          line-height: 1.4;
          letter-spacing: -0.35px;
          font-weight: 400;
        }

        .review-person {
          margin-top: auto;
          padding-top: 24px;
          display: flex;
          flex-direction: column;
          gap: 0;
        }

        .review-person strong {
          font-family: "Century Gothic", "CenturyGothic", "AppleGothic", sans-serif;
          font-size: 17px;
          line-height: 1.2;
          font-weight: 700;
          letter-spacing: 0;
          font-synthesis: none;
        }

        .review-person span {
          margin-top: 1px;
          font-family: "Century Gothic", "CenturyGothic", "AppleGothic", sans-serif;
          font-size: 13px;
          line-height: 1.2;
          font-weight: 400;
          letter-spacing: 0;
          font-synthesis: none;
        }

        @media (max-width: 1400px) {
          .reviews-inner {
            width: calc(100% - 120px);
          }

          .review-card {
            padding-left: 34px;
            padding-right: 34px;
          }

          .review-copy {
            font-size: 18px;
          }
        }

        @media (max-width: 1000px) {
          .reviews-section {
            padding: 46px 0 52px;
          }

          .reviews-inner {
            width: calc(100% - 48px);
          }

          .review-grid {
            grid-template-columns: 1fr;
          }

          .review-card {
            min-height: 0;
          }

          .review-copy br {
            display: none;
          }
        }

        @media (max-width: 640px) {
          .reviews-inner {
            width: calc(100% - 32px);
          }

          .eyebrow {
            font-size: 14px;
          }

          .reviews-heading h2 {
            font-size: 38px;
            letter-spacing: -1.2px;
          }

          .intro {
            font-size: 17px;
          }

          .desktop-break {
            display: none;
          }

          .review-card {
            padding: 34px 26px 30px;
          }

          .review-copy {
            font-size: 17px;
          }
        }
      `}</style>
    </section>
  );
}

export default function ProperOpsPage() {
  const [scrolled, setScrolled] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [activeApproach, setActiveApproach] = useState(0);
  const approachRef = useRef<HTMLElement | null>(null);
  const [loaderVisible, setLoaderVisible] = useState(true);
  const [loaderLeaving, setLoaderLeaving] = useState(false);
  const [heroReady, setHeroReady] = useState(false);

  usePremiumRevealSystem(!loaderVisible);

  useEffect(() => {
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (reducedMotion) {
      setHeroReady(true);
      setLoaderLeaving(true);
      const reducedTimer = window.setTimeout(() => setLoaderVisible(false), 180);
      return () => window.clearTimeout(reducedTimer);
    }

    const exitTimer = window.setTimeout(() => {
      setLoaderLeaving(true);
      setHeroReady(true);
    }, 620);

    const removeTimer = window.setTimeout(() => {
      setLoaderVisible(false);
    }, 1080);

    return () => {
      window.clearTimeout(exitTimer);
      window.clearTimeout(removeTimer);
    };
  }, []);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    const previousOverscroll = document.body.style.overscrollBehavior;
    const html = document.documentElement;

    html.style.overflowY = "scroll";
    html.style.scrollbarGutter = "stable";

    if (loaderVisible) {
      document.body.style.overflow = "hidden";
      document.body.style.overscrollBehavior = "none";
    } else {
      document.body.style.overflow = previousOverflow;
      document.body.style.overscrollBehavior = previousOverscroll;
    }

    return () => {
      document.body.style.overflow = previousOverflow;
      document.body.style.overscrollBehavior = previousOverscroll;
    };
  }, [loaderVisible]);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24);
      setScrollY(window.scrollY);

      const section = approachRef.current;
      if (section) {
        const rect = section.getBoundingClientRect();
        const scrollableDistance = Math.max(rect.height - window.innerHeight, 1);
        const progress = Math.min(
          Math.max(-rect.top / scrollableDistance, 0),
          1
        );

        if (progress < 1 / 3) {
          setActiveApproach(0);
        } else if (progress < 2 / 3) {
          setActiveApproach(1);
        } else {
          setActiveApproach(2);
        }
      }
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <main
      data-premium-page
      data-hero-ready={heroReady ? "true" : "false"}
      className={`${manrope.className} min-h-screen bg-[#FAFAFA] text-[#111E2E] selection:bg-[#1D3528] selection:text-white`}
    >
      {loaderVisible && (
        <div
          aria-hidden="true"
          className={`premium-loader fixed inset-0 z-[9999] grid place-items-center bg-[#111E2E] transition-opacity duration-[440ms] ease-out ${
            loaderLeaving ? "pointer-events-none opacity-0" : "opacity-100"
          }`}
        >
          <img
            src="/media/proper_ops/img_13.png"
            alt=""
            className="premium-loader-logo h-auto w-[210px] object-contain sm:w-[250px] md:w-[285px]"
          />
        </div>
      )}

      {/* HEADER */}
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          scrolled
            ? "border-b border-white/10 bg-[#111E2E]/94 shadow-[0_8px_32px_rgba(17,30,46,0.08)] backdrop-blur-xl"
            : "bg-transparent"
        }`}
      >
        <div className="mx-auto flex h-[84px] max-w-[1440px] items-center justify-between px-6 md:px-10 lg:px-14">
          <a
            href="#top"
            className="inline-flex items-center"
            aria-label="Proper Ops home"
            data-hero-item
            style={{ transitionDelay: "20ms" }}
          >
            <img
              src="/media/proper_ops/img_13.png"
              alt="Proper Ops"
              className="h-[58px] w-auto object-contain md:h-[118px]"
            />
          </a>

          <nav
            className="hidden items-center gap-9 text-[16px] font-normal tracking-[-0.02em] text-white/82 md:flex"

          >
            <a className="transition hover:text-white" href="#top" data-hero-item style={{ transitionDelay: "60ms" }}>
              Home
            </a>
            <a className="transition hover:text-white" href="#about" data-hero-item style={{ transitionDelay: "110ms" }}>
              About
            </a>
            <a className="transition hover:text-white" href="#services" data-hero-item style={{ transitionDelay: "160ms" }}>
              Services
            </a>
            <a className="transition hover:text-white" href="#approach" data-hero-item style={{ transitionDelay: "210ms" }}>
              Approach
            </a>
            <a className="transition hover:text-white" href="#contact" data-hero-item style={{ transitionDelay: "260ms" }}>
              Contact
            </a>
          </nav>

          <a
            href="https://calendar.app.google/ZdAJB4QW6VobEp7L9"
            target="_blank"
            rel="noreferrer"
            className="group inline-flex items-center gap-2.5 border border-white/55 bg-[rgba(17,30,46,0.24)] px-4 py-[10px] text-[14px] font-normal tracking-[-0.015em] text-white hover:bg-white hover:text-[#111E2E]"
            data-hero-item
            style={{
              transitionDelay: "320ms",
            }}
          >
            Book a discovery call
            <span
              className="text-[17px] font-light leading-none"

            >
              ›
            </span>
          </a>
        </div>
      </header>

      {/* HERO */}
      <section id="top" className="relative h-[100svh] overflow-hidden bg-[#111E2E]">
        <img
          src="/media/proper_ops/img.png"
          alt=""
          className="absolute inset-0 h-full w-full object-cover object-center will-change-transform"
          style={{
            transform: `translate3d(0, ${Math.min(scrollY * 0.2, 72)}px, 0) scale(1.045)`,
            transformOrigin: "center center",
          }}
        />

        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(10,20,31,0.88)_0%,rgba(10,20,31,0.72)_42%,rgba(10,20,31,0.28)_74%,rgba(10,20,31,0.08)_100%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(0deg,rgba(17,30,46,0.28)_0%,rgba(17,30,46,0)_44%)]" />
        <div className="absolute inset-x-0 top-0 h-[34%] bg-[linear-gradient(180deg,rgba(10,20,31,0.40)_0%,rgba(10,20,31,0.14)_55%,rgba(10,20,31,0)_100%)]" />

        <div className="relative z-10 mx-auto flex h-full max-w-[1440px] items-center px-6 pt-[84px] md:px-10 lg:px-14">
          <div className="max-w-[860px]">
            <h1 data-hero-item className="max-w-[850px] font-serif text-[48px] font-normal leading-[0.98] tracking-[-0.045em] text-white sm:text-[58px] md:text-[70px] lg:text-[82px]" style={{ transitionDelay: "180ms" }}>
              Operations &amp; Systems Business Consultancy
            </h1>

            <p data-hero-item className="mt-7 max-w-[690px] text-[17px] font-normal leading-8 text-white/76 md:text-[19px] md:leading-9" style={{ transitionDelay: "300ms" }}>
              Strategic operational support for founders and growing service businesses,
              bringing greater clarity, structure and consistency to the way the business runs.
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-3">
              <a
                href="#services"
                data-hero-item
                style={{ transitionDelay: "420ms" }}
                className="inline-flex items-center justify-center rounded-full bg-[#ff2d05] px-7 py-[15px] text-[12px] font-semibold text-white hover:bg-white hover:text-[#111E2E]"
              >
                Services
              </a>

              <a
                href="#about"
                data-hero-item
                style={{ transitionDelay: "500ms" }}
                className="inline-flex items-center justify-center rounded-full bg-[#ff2d05] px-7 py-[15px] text-[12px] font-semibold text-white hover:bg-white hover:text-[#111E2E]"
              >
                About Us
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION TWO */}
      <section
        id="services"
        data-reveal-section="services"
        className="bg-[#F8FAFC]"
      >
        <div className="mx-auto max-w-[1440px] px-6 pb-24 pt-10 md:px-10 md:pt-12 lg:px-14 lg:pb-32 lg:pt-14">
          {/* Exact centreline header */}
          <div className="mb-14 hidden grid-cols-[1fr_auto_1fr] items-center gap-8 sm:grid">
            <h2 className="justify-self-end font-serif text-[42px] font-semibold leading-[1.02] tracking-[-0.035em] text-[#111E2E] md:text-[54px]">
              Our Services
            </h2>

            <div
              aria-hidden="true"
              className="h-[82px] w-px bg-[#111E2E]/20"
            />

            <img
              src="/media/proper_ops/img_18.png"
              alt="Proper Ops"
              className="h-[82px] w-auto justify-self-start object-contain md:h-[108px]"
            />
          </div>

          <div className="mb-14 flex flex-col items-center gap-6 sm:hidden">
            <h2 className="font-serif text-[42px] font-semibold leading-[1.02] tracking-[-0.035em] text-[#111E2E]">
              Our Services
            </h2>

            <div aria-hidden="true" className="h-px w-20 bg-[#111E2E]/20" />

            <img
              src="/media/proper_ops/img_18.png"
              alt="Proper Ops"
              className="h-[82px] w-auto object-contain"
            />
          </div>

          <div className="grid gap-8 lg:grid-cols-3">
            {services.map((service) => (
              <article
                key={service.title}
                className="group relative"
              >
                <div
                  className="absolute inset-0 rounded-[26px] shadow-[8px_8px_0_#E2E8F0,16px_16px_0_rgba(43,48,58,0.10)] transition-shadow duration-300 group-hover:shadow-[10px_10px_0_#E2E8F0,20px_20px_0_rgba(43,48,58,0.12)]"
                />

                <div className="relative z-10 flex min-h-[535px] flex-col overflow-hidden rounded-[26px] border border-[#111E2E]/10 bg-white">
                  <div className="flex flex-1 flex-col p-8 pb-5 md:p-9 md:pb-5">
                    <h3 className="max-w-[330px] font-serif text-[31px] leading-[1.1] tracking-[-0.025em] text-[#111E2E]">
                      {service.title}
                    </h3>

                    <p className="mt-5 text-[15px] leading-7 text-[#2B303A]/72">
                      {service.text}
                    </p>

                    <ul className="mt-7 space-y-4">
                      {service.items.map((item) => (
                        <li
                          key={item}
                          className="flex gap-3 text-[13px] leading-6 text-[#2B303A]/72"
                        >
                          <span className="mt-[9px] h-[4px] w-[4px] shrink-0 rounded-full bg-[#1D3528]" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex min-h-[100px] items-center justify-between gap-5 px-8 pb-8 pt-4 md:px-9 md:pb-9">
                    <p className="max-w-[190px] text-[10px] font-semibold uppercase leading-[1.45] tracking-[0.17em] text-[#1D3528]/70">
                      {service.eyebrow}
                    </p>

                    <a
                      href="#contact"
                      className="inline-flex shrink-0 items-center justify-center rounded-full bg-[#2B303A] px-6 py-[13px] text-[12px] font-semibold text-white transition duration-300 hover:bg-[#111E2E]"
                    >
                      Enquire now
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>


      {/* STATS PARALLAX */}
      <section
        data-reveal-section="stats"
        className="relative min-h-[390px] overflow-hidden bg-[#111E2E] md:min-h-[430px]"
        style={{
          backgroundImage: "url('/media/proper_ops/img_1.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundAttachment: "fixed",
        }}
      >
        <div className="absolute inset-0 bg-[#111E2E]/62" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(17,30,46,0.70)_0%,rgba(17,30,46,0.48)_50%,rgba(17,30,46,0.70)_100%)]" />

        <div className="relative z-10 mx-auto flex min-h-[390px] max-w-[1180px] items-center px-6 py-14 md:min-h-[430px] md:px-10 md:py-16">
          <div className="mx-auto grid w-full max-w-[980px] gap-8 md:grid-cols-3 md:gap-6">
            <div className="premium-stat-item text-center text-white">
              <div className={`${manrope.className} text-[52px] font-medium leading-none tracking-[-0.045em] md:text-[64px]`}>
                <CountUp start={3} target={10} suffix="+" />
              </div>
              <p className="mx-auto mt-4 max-w-[255px] text-[15px] leading-7 text-white/74">
                Years of experience supporting business owners through operational change,
                delivery improvements and stronger systems.
              </p>
            </div>

            <div className="premium-stat-item text-center text-white">
              <div className={`${manrope.className} text-[52px] font-medium leading-none tracking-[-0.045em] md:text-[64px]`}>
                <CountUp start={185} target={200} suffix="+" />
              </div>
              <p className="mx-auto mt-4 max-w-[255px] text-[15px] leading-7 text-white/74">
                Small business processes, workflows and delivery structures reviewed,
                refined or rebuilt to work more effectively.
              </p>
            </div>

            <div className="premium-stat-item text-center text-white">
              <div className={`${manrope.className} text-[52px] font-medium leading-none tracking-[-0.045em] md:text-[64px]`}>
                <CountUp start={90} target={100} suffix="%" />
              </div>
              <p className="mx-auto mt-4 max-w-[255px] text-[15px] leading-7 text-white/74">
                Customer satisfaction built on clear communication, practical solutions
                and a client experience that feels calm, structured and dependable.
              </p>
            </div>
          </div>
        </div>
      </section>


      {/* OUR BUSINESS APPROACH */}
      <section
        id="about"
        data-reveal-section="approach"
        className="relative overflow-hidden border-b border-[rgba(17,30,46,0.035)] bg-[#F8FAFC]"
      >
        <span id="approach" className="absolute -top-24" aria-hidden="true" />

        {/* restrained architectural grid background */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(17,30,46,0.035)_1px,transparent_1px),linear-gradient(to_bottom,rgba(17,30,46,0.035)_1px,transparent_1px)] bg-[size:92px_92px]" />
        </div>

        <div className="relative mx-auto max-w-[1440px] px-6 pb-[92px] pt-12 md:px-10 md:pb-[92px] md:pt-14 lg:px-14 lg:pb-[92px] lg:pt-16">
          {/* centered title + introduction */}
          <div className="mx-auto max-w-[980px] text-center">
            <h2 className="font-serif text-[34px] font-semibold leading-[1.02] tracking-[-0.035em] text-[#111E2E] sm:whitespace-nowrap sm:text-[42px] md:text-[54px]">
              Our Business Approach
            </h2>

            <p className="mx-auto mt-7 max-w-[830px] text-[15px] leading-7 text-[#2B303A]/74 md:text-[16px]">
              Proper Ops starts by understanding how your business really works — where
              delivery slows down, where ownership becomes unclear and where too much still
              depends on the founder. From there, we build practical operational structure
              around the way your team, clients and services actually need to work.
            </p>
          </div>

          {/* three-step circular process */}
          <div className="relative mx-auto mt-12 max-w-[1160px] lg:mt-14">
            <div className="grid gap-14 md:grid-cols-3 md:gap-8 lg:gap-12">
              {/* STEP 01 */}
              <article className="approach-principle relative flex flex-col items-center text-center">
                <div className="relative">
                  <div className="relative h-[210px] w-[210px] overflow-hidden rounded-full border-[7px] border-white shadow-[0_18px_48px_rgba(17,30,46,0.12)] md:h-[220px] md:w-[220px] lg:h-[238px] lg:w-[238px]">
                    <img
                      src="/media/proper_ops/img_1.png"
                      alt=""
                      aria-hidden="true"
                      className="h-full w-full object-cover"
                    />
                    <div className="absolute inset-0 bg-[#111E2E]/78" />
                    <div className="absolute inset-0 flex items-center justify-center px-8 text-center">
                      <span className="text-[14px] font-medium leading-[1.25] tracking-[0.03em] text-white md:text-[15px]">
                        <span className="block">Image</span>
                        <span className="block">coming soon</span>
                      </span>
                    </div>
                  </div>

                  <span className="absolute -left-2 top-5 flex h-12 w-12 items-center justify-center rounded-full border-[4px] border-[#F8FAFC] bg-[#111E2E] font-serif text-[17px] text-white shadow-[0_8px_20px_rgba(17,30,46,0.16)]">
                    01
                  </span>
                </div>

                <h3 className="mt-8 font-serif text-[28px] leading-tight tracking-[-0.025em] text-[#111E2E]">
                  Diagnose first
                </h3>

                <p className="mt-4 max-w-[315px] text-[14px] leading-6 text-[#2B303A]/72">
                  We review the real workflows, systems, handovers and founder dependencies
                  before recommending changes, so the work starts with the actual cause of
                  the friction rather than the symptom.
                </p>
              </article>

              {/* STEP 02 */}
              <article className="approach-principle relative flex flex-col items-center text-center">
                <div className="relative">
                  <div className="relative h-[210px] w-[210px] overflow-hidden rounded-full border-[7px] border-white shadow-[0_18px_48px_rgba(17,30,46,0.12)] md:h-[220px] md:w-[220px] lg:h-[238px] lg:w-[238px]">
                    <img
                      src="/media/proper_ops/img_10.png"
                      alt=""
                      aria-hidden="true"
                      className="h-full w-full object-cover"
                    />
                    <div className="absolute inset-0 bg-[#111E2E]/78" />
                    <div className="absolute inset-0 flex items-center justify-center px-8 text-center">
                      <span className="text-[14px] font-medium leading-[1.25] tracking-[0.03em] text-white md:text-[15px]">
                        <span className="block">Image</span>
                        <span className="block">coming soon</span>
                      </span>
                    </div>
                  </div>

                  <span className="absolute -left-2 top-5 flex h-12 w-12 items-center justify-center rounded-full border-[4px] border-[#F8FAFC] bg-[#1D3528] font-serif text-[17px] text-white shadow-[0_8px_20px_rgba(17,30,46,0.16)]">
                    02
                  </span>
                </div>

                <h3 className="mt-8 font-serif text-[28px] leading-tight tracking-[-0.025em] text-[#111E2E]">
                  Build what is useful
                </h3>

                <p className="mt-4 max-w-[315px] text-[14px] leading-6 text-[#2B303A]/72">
                  We turn the findings into clear workflows, ownership, SOPs, CRM structure,
                  onboarding and handovers — adding only the systems and process the business
                  genuinely needs.
                </p>
              </article>

              {/* STEP 03 */}
              <article className="approach-principle relative flex flex-col items-center text-center">
                <div className="relative">
                  <div className="relative h-[210px] w-[210px] overflow-hidden rounded-full border-[7px] border-white shadow-[0_18px_48px_rgba(17,30,46,0.12)] md:h-[220px] md:w-[220px] lg:h-[238px] lg:w-[238px]">
                    <img
                      src="/media/proper_ops/img_2.png"
                      alt=""
                      aria-hidden="true"
                      className="h-full w-full object-cover"
                    />
                    <div className="absolute inset-0 bg-[#111E2E]/78" />
                    <div className="absolute inset-0 flex items-center justify-center px-8 text-center">
                      <span className="text-[14px] font-medium leading-[1.25] tracking-[0.03em] text-white md:text-[15px]">
                        <span className="block">Image</span>
                        <span className="block">coming soon</span>
                      </span>
                    </div>
                  </div>

                  <span className="absolute -left-2 top-5 flex h-12 w-12 items-center justify-center rounded-full border-[4px] border-[#F8FAFC] bg-[#111E2E] font-serif text-[17px] text-white shadow-[0_8px_20px_rgba(17,30,46,0.16)]">
                    03
                  </span>
                </div>

                <h3 className="mt-8 font-serif text-[28px] leading-tight tracking-[-0.025em] text-[#111E2E]">
                  Embed the structure
                </h3>

                <p className="mt-4 max-w-[315px] text-[14px] leading-6 text-[#2B303A]/72">
                  We help embed the new structure into day-to-day delivery, reducing chasing,
                  bottlenecks and unnecessary founder involvement so the business becomes
                  clearer, more consistent and easier to run.
                </p>
              </article>
            </div>
          </div>
        </div>
      </section>



      {/* ABOUT MAYA */}
      <section id="about-maya" data-reveal-section="about-maya" className="bg-[#F8FAFC] text-[#111E2E]">
        <div className="mx-auto max-w-[1440px] px-6 pb-20 pt-3 md:px-10 md:pb-24 md:pt-5 lg:px-14 lg:pb-28 lg:pt-6">
          <div className="grid gap-14 lg:grid-cols-[1.55fr_0.85fr] lg:gap-20">
            <div>
              <div className="relative max-w-[820px]">
                <h2 className="font-serif text-[42px] font-semibold leading-[1.02] tracking-[-0.035em] md:text-[50px] lg:text-[56px]">
                  About Maya.
                </h2>

                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute right-6 -top-10 hidden rotate-[-8deg] font-serif text-[70px] leading-none text-[#D887A8] drop-shadow-[0_1px_0_rgba(255,255,255,0.65)] md:block"
                >
                  ★
                </span>

                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute right-[-54px] top-[42px] hidden rotate-[10deg] font-serif text-[56px] leading-none text-[#7E8794] drop-shadow-[0_1px_0_rgba(255,255,255,0.6)] lg:block"
                >
                  ★
                </span>
              </div>

              <div className="premium-maya-copy mt-9 max-w-[860px] space-y-6 text-[16px] leading-[1.72] text-[#243047] md:text-[17px]">
                <p>
                  I’m Maya, founder of Proper Ops. I work with founders and growing
                  service businesses that have reached the point where the business is
                  moving faster than the systems behind it.
                </p>

                <p>
                  Usually, that looks like too much information living in your head,
                  processes that have evolved rather than been designed, a CRM that is
                  only half doing its job, and a constant stream of small operational
                  decisions finding their way back to you.
                </p>

                <p className="font-semibold italic text-[#111E2E]">
                  My job is to take that operational noise and turn it into something
                  clear, structured and genuinely useful.
                </p>

                <p>
                  I look closely at how work actually moves through your business: how
                  enquiries become clients, how projects are delivered, where information
                  is stored, who owns what, what gets missed, what gets repeated and where
                  you are still acting as the human glue holding everything together.
                </p>

                <p>
                  From there, I build the structure around it. That might mean redesigning
                  your onboarding, improving your CRM, documenting key processes,
                  simplifying communication, creating clearer handovers or putting proper
                  operational ownership in place across the team.
                </p>

                <p>
                  I’m not interested in adding software for the sake of it or creating
                  twenty-step processes where five will do. I like systems that are
                  simple enough to be used properly, strong enough to support growth and
                  clear enough that the business does not depend on one person remembering
                  everything.
                </p>

                <p className="font-semibold italic text-[#111E2E]">
                  The best operations work is often the work nobody notices — because
                  everything simply happens when it should.
                </p>

                <p>
                  That is the part I love. Taking something that feels messy, reactive or
                  unnecessarily difficult and quietly making it make sense. Seeing a
                  founder stop chasing updates. Seeing a team know exactly what happens
                  next. Seeing the client experience become more consistent because the
                  backend finally supports it.
                </p>

                <p>
                  Depending on what the business needs, I can come in for a focused
                  diagnostic sprint, stay involved as an ongoing operations partner, or
                  work at a more strategic level through fractional operations
                  leadership.
                </p>

                <p>
                  However we work together, I keep the same approach: practical, calm and
                  straightforward. I want to understand the way your business needs to
                  operate, not force it into a generic template.
                </p>

                <p>
                  Ultimately, I want your business to feel easier to run. You should have
                  the headspace to focus on clients, growth and the decisions that
                  actually require you — while the operational side runs clearly and
                  consistently in the background.
                </p>

                <p className="font-semibold italic text-[#111E2E]">
                  Less firefighting. Fewer loose ends. Better systems behind the work
                  you’re already doing.
                </p>

                <div className="relative mt-12 max-w-[560px]">
                  <img
                    src="/media/proper_ops/img_4.png"
                    alt="Maya Leftwick signature"
                    className="premium-maya-signature relative z-10 ml-4 h-auto w-[235px] object-contain md:ml-8 md:w-[280px]"
                  />

                  <a
                    href="#contact"
                    className="premium-maya-cta relative z-20 mt-6 inline-flex shrink-0 items-center justify-center rounded-full bg-[#2B303A] px-6 py-[13px] text-[12px] font-semibold text-white transition duration-300 hover:bg-[#111E2E] sm:absolute sm:right-0 sm:top-1/2 sm:mt-0 sm:-translate-y-1/2"
                  >
                    Enquire now
                  </a>
                </div>
              </div>
            </div>

            <div className="relative self-stretch lg:-mt-1">
              <div className="lg:sticky lg:top-[108px]">
                <div className="premium-maya-portrait relative w-full max-w-[430px] overflow-hidden rounded-[58px] bg-[#D8DADF] lg:ml-auto">
                  <img
                    src="/media/proper_ops/Headshot.jpg"
                    alt="Maya Leftwick, founder of Proper Ops"
                    className="aspect-[0.78] h-auto w-full object-cover object-center"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PARALLAX QUOTE */}
      <section
        data-reveal-section="quote"
        className="relative min-h-[390px] overflow-hidden bg-[#111E2E] md:min-h-[430px]"
        style={{
          backgroundImage: "url('/media/proper_ops/image2.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundAttachment: "fixed",
        }}
      >
        <div className="absolute inset-0 bg-[#111E2E]/60" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(17,30,46,0.60)_0%,rgba(17,30,46,0.44)_50%,rgba(17,30,46,0.60)_100%)]" />

        <div className="relative z-10 mx-auto flex min-h-[390px] max-w-[1440px] items-center justify-center px-6 py-14 text-center md:min-h-[430px] md:px-10 md:py-16 lg:px-14">
          <div className="mx-auto max-w-[1040px]">
            <blockquote className="font-serif text-[29px] font-normal leading-[1.18] tracking-[-0.03em] text-white sm:text-[34px] md:text-[40px] lg:text-[46px]">
              “Good operations aren’t about adding more tools or more processes.
              They’re about creating the right structure so the business works more
              clearly, consistently and calmly.”
            </blockquote>

            <div className="premium-quote-attribution mt-8 flex flex-col items-center justify-center">
              <p className="text-[13px] font-medium tracking-[0.035em] text-white/82 md:text-[14px]">
                Maya Leftwick
              </p>
              <p className="mt-1 text-[11px] font-normal tracking-[0.06em] text-white/52 md:text-[12px]">
                Founder, Proper Ops
              </p>
            </div>
          </div>
        </div>
      </section>


      {/* REVIEWS */}
      <ReviewsSection />

      {/* WORKING WITH PROPER OPS PARALLAX */}
      <section
        data-reveal-section="working"
        className="relative min-h-[390px] overflow-hidden border-t-[9px] border-[#1D3528] bg-[#111E2E] md:min-h-[430px]"
        style={{
          backgroundImage: "url('/media/proper_ops/img_10.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundAttachment: "fixed",
        }}
      >
        <div className="absolute inset-0 bg-[#111E2E]/64" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(17,30,46,0.72)_0%,rgba(17,30,46,0.48)_50%,rgba(17,30,46,0.72)_100%)]" />

        <div className="relative z-10 mx-auto flex min-h-[390px] max-w-[1280px] items-center px-6 py-14 md:min-h-[430px] md:px-10 md:py-16 lg:px-14">
          <div className="w-full">
            <div className="mx-auto mb-12 max-w-[850px] text-center md:mb-14">
              <h2 className="font-serif text-[42px] font-semibold leading-[1.02] tracking-[-0.035em] text-white md:text-[54px]">
                What it&apos;s like to work with us
              </h2>
            </div>

            <div className="mx-auto grid w-full max-w-[1080px] place-items-start gap-8 text-center md:grid-cols-3 md:gap-10">
              <div className="premium-working-point text-center text-white">
                <h3 className="font-serif text-[25px] font-medium leading-[1.08] tracking-[-0.025em] md:text-[28px]">
                  Clear from the outset
                </h3>
                <p className="mx-auto mt-4 max-w-[285px] text-[14px] leading-7 text-white/74">
                  We start by understanding how the business actually runs, where the
                  friction sits and what needs to change before recommending a solution.
                </p>
              </div>

              <div className="premium-working-point text-center text-white">
                <h3 className="font-serif text-[25px] font-medium leading-[1.08] tracking-[-0.025em] md:text-[28px]">
                  Built around your business
                </h3>
                <p className="mx-auto mt-4 max-w-[285px] text-[14px] leading-7 text-white/74">
                  Systems, workflows and processes are shaped around your team, delivery
                  and client journey rather than forcing the business into a generic template.
                </p>
              </div>

              <div className="premium-working-point text-center text-white">
                <h3 className="font-serif text-[25px] font-medium leading-[1.08] tracking-[-0.025em] md:text-[28px]">
                  Practical, hands-on support
                </h3>
                <p className="mx-auto mt-4 max-w-[285px] text-[14px] leading-7 text-white/74">
                  From diagnosis through implementation and ongoing support, the focus
                  stays on putting useful structure in place and making it work day to day.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" data-reveal-section="contact" className={`${manrope.className} min-h-[610px] bg-white text-[#292523] md:min-h-[640px]`}>
        <div className="mx-auto grid min-h-[610px] w-full max-w-[1400px] content-center gap-12 px-6 py-[54px] md:min-h-[640px] md:px-10 lg:grid-cols-[0.82fr_1.18fr] lg:gap-[64px] lg:px-[6%] lg:py-[62px]">
          <div className="premium-contact-copy flex flex-col">
            <h2
              className="m-0 max-w-[390px] font-serif text-[37px] font-semibold leading-[1.02] tracking-[-0.035em] text-[#292523] md:text-[47px]"
            >
              Get a Free
              <br />
              Consultation
            </h2>

            <p
              className="mt-[34px] max-w-[470px] text-[13px] font-normal leading-[1.7] text-[#504b48] md:text-[14px]"
            >
              No obligation, just a straightforward conversation. Tell me a little about
              what you are looking for and I’ll be in touch to discuss the most
              appropriate way Proper Ops can support your business. I’m happy to answer
              any questions before we decide on the right next step.
            </p>

            <div className="mt-[28px] space-y-[14px] text-[12.5px] text-[#3d3937] md:text-[13.5px]">
              <a
                href="#"
                aria-label="WhatsApp Proper Ops"
                className="flex items-center gap-5 transition-opacity hover:opacity-65"
              >
                <img
                  src="/media/proper_ops/img_5.png"
                  alt=""
                  className="h-[40px] w-[40px] shrink-0 object-contain"
                />
                <span>WhatsApp us</span>
              </a>

              <a
                href="https://calendar.app.google/ZdAJB4QW6VobEp7L9"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-5 transition-opacity hover:opacity-65"
              >
                <img
                  src="/media/proper_ops/img_6.png"
                  alt=""
                  className="h-[40px] w-[40px] shrink-0 object-contain"
                />
                <span>Book a discovery call</span>
              </a>

              <a
                href="#"
                className="flex items-center gap-5 transition-opacity hover:opacity-65"
              >
                <img
                  src="/media/proper_ops/img_7.png"
                  alt=""
                  className="h-[40px] w-[40px] shrink-0 object-contain"
                />
                <span>LinkedIn</span>
              </a>
            </div>
          </div>

          <form
            className="grid content-start gap-y-[15px]"
            onSubmit={(event) => event.preventDefault()}
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <label className="block">
                <span className="mb-1.5 block text-[12px] font-medium text-[#393431]">
                  First name
                </span>
                <input
                  type="text"
                  name="firstName"
                  className="h-[50px] w-full border border-[#69635f] bg-white px-4 text-[14px] outline-none transition focus:border-[#292523]"
                />
              </label>

              <label className="block">
                <span className="mb-1.5 block text-[12px] font-medium text-[#393431]">
                  Last name
                </span>
                <input
                  type="text"
                  name="lastName"
                  className="h-[50px] w-full border border-[#69635f] bg-white px-4 text-[14px] outline-none transition focus:border-[#292523]"
                />
              </label>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <label className="block">
                <span className="mb-1.5 block text-[12px] font-medium text-[#393431]">
                  Email address
                </span>
                <input
                  type="email"
                  name="email"
                  className="h-[50px] w-full border border-[#69635f] bg-white px-4 text-[14px] outline-none transition focus:border-[#292523]"
                />
              </label>

              <label className="block">
                <span className="mb-1.5 block text-[12px] font-medium text-[#393431]">
                  Service
                </span>

                <span className="relative block">
                  <select
                    name="service"
                    defaultValue=""
                    className="h-[50px] w-full appearance-none border border-[#69635f] bg-white px-4 pr-11 text-[14px] text-[#7b7470] outline-none transition focus:border-[#292523]"
                  >
                    <option value="" disabled>
                      Select a service
                    </option>
                    <option>Systems Architecture & Operational Audit</option>
                    <option>Ongoing Operational Retainer</option>
                    <option>Fractional Operations Leadership</option>
                    <option>Not sure yet</option>
                  </select>

                  <svg
                    viewBox="0 0 20 20"
                    fill="none"
                    aria-hidden="true"
                    className="pointer-events-none absolute right-5 top-1/2 h-5 w-5 -translate-y-1/2 stroke-[#77706c]"
                  >
                    <path d="m5 7.5 5 5 5-5" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </label>
            </div>

            <label className="block">
              <span className="mb-1.5 block text-[12px] font-medium text-[#393431]">
                Message
              </span>
              <textarea
                name="message"
                className="h-[132px] w-full resize-none border border-[#69635f] bg-white p-4 text-[14px] leading-6 outline-none transition focus:border-[#292523]"
              />
            </label>

            <button
              type="submit"
              className="mt-1 inline-flex h-[40px] w-[136px] items-center justify-center bg-[#2B303A] text-[10px] font-semibold uppercase tracking-[0.02em] text-white transition hover:bg-[#111E2E]"
            >
              Send enquiry
            </button>
          </form>
        </div>
      </section>

      {/* BOOK A CALL PARALLAX */}
      <section
        data-reveal-section="book"
        className="relative min-h-[180px] overflow-hidden bg-[#111E2E] md:min-h-[200px]"
        style={{
          backgroundImage: "url('/media/proper_ops/img_2.png')",
          backgroundSize: "100% auto",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundAttachment: "fixed",
        }}
      >
        <div className="absolute inset-0 bg-black/34" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,0.46)_0%,rgba(0,0,0,0.24)_62%,rgba(0,0,0,0.28)_100%)]" />

        <div className="relative z-10 mx-auto grid min-h-[180px] max-w-[1370px] items-center gap-6 px-6 py-8 md:min-h-[200px] md:px-10 lg:grid-cols-[1fr_auto] lg:px-14">
          <h2 className="max-w-[900px] font-serif text-[32px] font-semibold leading-[1.06] tracking-[-0.03em] text-white sm:text-[35px] md:text-[38px] lg:text-[40px]">
            Ready to make your business easier to run?
          </h2>

          <div className="premium-book-cta lg:-translate-x-8">
            <a
              href="https://calendar.app.google/ZdAJB4QW6VobEp7L9"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center rounded-full bg-[#2B303A] px-7 py-[14px] text-[12px] font-semibold text-white transition duration-300 hover:bg-[#111E2E]"
            >
              Book a call
            </a>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer data-reveal-section="footer" className="bg-[#111E2E] text-white">
        <div className="mx-auto w-full max-w-[1510px] px-8 pb-8 pt-10 md:px-12 md:pt-12 lg:px-[70px]">
          {/* Main footer content */}
          <div className="grid gap-10 pb-10 text-center md:grid-cols-2 md:text-left lg:grid-cols-[1.35fr_0.78fr_0.78fr_0.9fr] lg:gap-x-16 lg:pb-11">
            {/* Brand */}
            <div className="premium-footer-group relative flex flex-col items-center md:items-start lg:-mt-4 lg:pr-6">
              <a
                href="#top"
                className="inline-flex items-center"
                aria-label="Proper Ops home"
              >
                <img
                  src="/media/proper_ops/img_13.png"
                  alt="Proper Ops"
                  className="relative z-0 h-[98px] w-auto object-contain md:h-[152px] lg:translate-x-4"
                />
              </a>

              <p className="relative z-20 -mt-3 max-w-[410px] text-[15px] leading-[1.5] text-white/92 md:-mt-5">
                <span className="block">Strategic operations and systems support for founders</span>
                <span className="block">and growing service businesses — clearer processes,</span>
                <span className="block">stronger delivery and an easier business to run.</span>
              </p>
            </div>

            {/* Services */}
            <div className="premium-footer-group pt-4 lg:pt-11">
              <h3 className="text-[15px] font-bold uppercase text-white">
                OUR SERVICES
              </h3>

              <nav className="mt-5 flex flex-col gap-[14px] text-[15px] leading-[1.15] text-white">
                <a href="#services" className="transition-opacity hover:opacity-70">
                  Systems Audits
                </a>
                <a href="#services" className="transition-opacity hover:opacity-70">
                  Operational Retainers
                </a>
                <a href="#services" className="transition-opacity hover:opacity-70">
                  Fractional Operations
                </a>
              </nav>
            </div>

            {/* About */}
            <div className="premium-footer-group pt-4 lg:pt-11">
              <h3 className="text-[15px] font-bold uppercase text-white">
                ABOUT
              </h3>

              <nav className="mt-5 flex flex-col gap-[14px] text-[15px] leading-none text-white">
                <a href="#about" className="transition-opacity hover:opacity-70">
                  About Proper Ops
                </a>
                <a href="#about-maya" className="transition-opacity hover:opacity-70">
                  About Maya
                </a>
                <a href="#approach" className="transition-opacity hover:opacity-70">
                  Our Approach
                </a>
                <a href="#contact" className="transition-opacity hover:opacity-70">
                  Contact
                </a>
              </nav>
            </div>

            {/* Contact */}
            <div className="premium-footer-group pt-4 lg:pt-11">
              <h3 className="text-[15px] font-bold uppercase text-white">
                CONTACT
              </h3>

              <div className="mt-5 text-[15px] leading-[1.5] text-white">
                <p>01273 000 000</p>
              </div>

              <div className="mt-5 flex items-center justify-center gap-3 md:justify-start">
                <a
                  href="#"
                  aria-label="LinkedIn"
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-white/45 text-[15px] font-bold transition hover:bg-[#2B303A] hover:text-white"
                >
                  in
                </a>

                <a
                  href="#contact"
                  aria-label="Email"
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-white/45 text-[18px] transition hover:bg-[#2B303A] hover:text-white"
                >
                  ✉
                </a>
              </div>
            </div>
          </div>

          {/* Legal row aligned to the SAME footer grid */}
          <div className="premium-footer-legal border-t border-white/20 pb-2 pt-6">
            <div className="grid min-h-[42px] items-center gap-5 text-center text-[13px] text-white/88 md:grid-cols-2 md:text-left lg:grid-cols-[1.35fr_0.78fr_0.78fr_0.9fr] lg:gap-x-16">
              <div className="flex justify-center md:justify-start lg:translate-x-4">
                <p>© 2026 Proper Ops. All rights reserved.</p>
              </div>

              <div className="hidden lg:block" />
              <div className="hidden lg:block" />

              <div className="flex items-center justify-center gap-2 md:justify-start lg:-translate-x-3 lg:justify-start">
                <a href="#" className="transition-opacity hover:opacity-70">Privacy Policy</a>
                <span className="text-white/60">|</span>
                <a href="#" className="transition-opacity hover:opacity-70">Terms</a>
                <span className="text-white/60">|</span>
                <a href="#" className="transition-opacity hover:opacity-70">Cookies</a>
              </div>
            </div>
          </div>
        </div>
      </footer>

      <style>{`
        html {
          overflow-y: scroll;
          scrollbar-gutter: stable;
        }

        .premium-loader {
          will-change: opacity;
        }

        .premium-loader-logo {
          opacity: 0;
          transform: translate3d(0, 8px, 0) scale(.992);
          animation: premiumLoaderBrandIn 700ms cubic-bezier(.16, 1, .3, 1) 100ms forwards;
          will-change: transform, opacity;
        }

        @keyframes premiumLoaderBrandIn {
          to {
            opacity: 1;
            transform: translate3d(0, 0, 0) scale(1);
          }
        }

        [data-hero-item] {
          opacity: 0;
          transform: translate3d(0, 18px, 0) scale(.992);
          transition:
            opacity 720ms cubic-bezier(.16, 1, .3, 1),
            transform 820ms cubic-bezier(.16, 1, .3, 1);
          will-change: transform, opacity;
        }

        [data-hero-ready="true"] [data-hero-item] {
          opacity: 1;
          transform: translate3d(0, 0, 0) scale(1);
        }

        [data-reveal] {
          opacity: 0;
          transition:
            opacity 680ms cubic-bezier(.16, 1, .3, 1),
            transform 820ms cubic-bezier(.16, 1, .3, 1);
          will-change: transform, opacity;
        }

        [data-reveal="up"] {
          transform: translate3d(0, 18px, 0);
        }

        [data-reveal="left"] {
          transform: translate3d(-18px, 8px, 0);
        }

        [data-reveal="right"] {
          transform: translate3d(18px, 8px, 0);
        }

        [data-reveal="image"] {
          transform: translate3d(0, 14px, 0) scale(.992);
        }

        [data-reveal][data-reveal-state="visible"] {
          opacity: 1;
          transform: translate3d(0, 0, 0) scale(1);
        }

        @media (prefers-reduced-motion: reduce) {
          .premium-loader-logo {
            animation: none !important;
            opacity: 1 !important;
            transform: none !important;
          }

          [data-hero-item],
          [data-reveal] {
            opacity: 1 !important;
            transform: none !important;
            transition: none !important;
          }
        }
      `}</style>
    </main>
  );
}
