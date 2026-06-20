import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useLayoutEffect, useMemo, useRef, useState, type ReactNode } from "react";
import heroCouple from "@/assets/hero-couple.jpg";
import ato01 from "@/assets/ato-01.jpg";
import ato02 from "@/assets/ato-02.jpg";
import ato03 from "@/assets/ato-03.jpg";
import giftMaldives from "@/assets/gift-maldives.jpg";
import giftDinner from "@/assets/gift-dinner.jpg";
import giftSpa from "@/assets/gift-spa.jpg";
import giftWine from "@/assets/gift-wine.jpg";
import giftBangalo from "@/assets/gift-bangalo.jpg";
import giftHidroaviao from "@/assets/gift-hidroaviao.jpg";
import giftTartaruga from "@/assets/gift-tartaruga.jpg";
import giftPanelas from "@/assets/gift-panelas.jpg";
import giftAspirador from "@/assets/gift-aspirador.jpg";
import giftCafeteira from "@/assets/gift-cafeteira.jpg";
import giftTacas from "@/assets/gift-tacas.jpg";
import luanBg from "@/assets/luan-bg.jpg";
import rosas from "@/assets/rosas.png";
import { Switch } from "@/components/ui/switch";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Evellyn & Sarah · 12.12.2026 · Fazenda Pitangueiras" },
      { name: "description", content: "Site oficial do casamento de Evellyn & Sarah. Nossa história, guia do convidado, confirmação de presença e boutique de presentes simbólicos." },
    ],
  }),
  component: Index,
});

const NAV = [
  { label: "História", href: "#historia" },
  { label: "Guia", href: "#guia" },
  { label: "Endereço", href: "#endereco" },
  { label: "Presentes", href: "#presentes" },
];

const WEDDING_DATE = new Date("2026-12-12T17:00:00-03:00");

function useCountdown(target: Date) {
  const [now, setNow] = useState<number | null>(null);
  useEffect(() => {
    setNow(Date.now());
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);
  if (now === null) return { d: 0, h: 0, m: 0, s: 0 };
  const diff = Math.max(0, target.getTime() - now);
  const d = Math.floor(diff / 86400000);
  const h = Math.floor((diff % 86400000) / 3600000);
  const m = Math.floor((diff % 3600000) / 60000);
  const s = Math.floor((diff % 60000) / 1000);
  return { d, h, m, s };
}

function Pad({ n }: { n: number }) {
  return <span>{String(n).padStart(2, "0")}</span>;
}

const SCROLL_REVEAL_STYLES = `
  @keyframes scroll-reveal-up {
    from { opacity: 0; transform: translate3d(0, 20px, 0); }
    to { opacity: 1; transform: translate3d(0, 0, 0); }
  }
  @keyframes scroll-reveal-fade {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  .scroll-reveal,
  .scroll-reveal-fade {
    will-change: opacity, transform;
  }
  .scroll-reveal {
    opacity: 0;
    transform: translate3d(0, 20px, 0);
  }
  .scroll-reveal.is-visible {
    animation: scroll-reveal-up 0.85s ease-out forwards;
  }
  .scroll-reveal-fade {
    opacity: 0;
  }
  .scroll-reveal-fade.is-visible {
    animation: scroll-reveal-fade 0.85s ease-out forwards;
  }
  @media (prefers-reduced-motion: reduce) {
    .scroll-reveal,
    .scroll-reveal-fade {
      opacity: 1 !important;
      transform: none !important;
      animation: none !important;
    }
  }
`;

function ScrollRevealStyles() {
  return <style dangerouslySetInnerHTML={{ __html: SCROLL_REVEAL_STYLES }} />;
}

function ScrollReveal({
  children,
  className = "",
  delay = 0,
  variant = "up",
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  variant?: "up" | "fade";
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reveal = () => setVisible(true);

    if (typeof window === "undefined" || typeof IntersectionObserver === "undefined") {
      reveal();
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          reveal();
          observer.disconnect();
        }
      },
      { threshold: 0.08, rootMargin: "0px 0px -40px 0px" }
    );

    observer.observe(el);

    if (el.getBoundingClientRect().top < window.innerHeight * 0.92) {
      reveal();
    }

    return () => observer.disconnect();
  }, []);

  const baseClass = variant === "fade" ? "scroll-reveal-fade" : "scroll-reveal";

  return (
    <div
      ref={ref}
      className={[baseClass, visible && "is-visible", className].filter(Boolean).join(" ")}
      style={visible && delay > 0 ? { animationDelay: `${delay}ms` } : undefined}
    >
      {children}
    </div>
  );
}

/* ---------- HERO ---------- */
function Hero() {
  const c = useCountdown(WEDDING_DATE);
  return (
    <section className="relative bg-background text-foreground">
      {/* Nav */}
      <nav className="relative z-30 mx-auto flex max-w-[1400px] items-center justify-between px-6 py-6 md:px-12 md:py-8">
        <div className="font-serif text-lg italic text-primary">E <span className="script text-2xl">&</span> S</div>
        <ul className="hidden gap-10 md:flex">
          {NAV.map((n) => (
            <li key={n.href}>
              <a href={n.href} className="label-eyebrow text-foreground/70 transition-colors hover:text-primary">
                {n.label}
              </a>
            </li>
          ))}
        </ul>
        <a href="#endereco" className="label-eyebrow border border-primary px-4 py-2 text-primary transition-colors hover:bg-primary hover:text-primary-foreground">
          Convite
        </a>
      </nav>

      {/* Editorial cover */}
      <ScrollReveal className="relative mx-auto max-w-[1400px] px-6 pb-16 pt-6 md:px-12 md:pb-24">
        <div className="grid grid-cols-12 gap-6">
          {/* Left text column */}
          <div className="relative z-20 col-span-12 md:col-span-7 md:pt-12">
            <p className="label-eyebrow mb-8 text-primary/80">12 · 12 · 2026 — São Paulo, Brasil</p>
            <h1 className="font-serif leading-[0.85] text-primary">
              <span className="block text-[18vw] md:text-[10vw] lg:text-[9.5rem]">Evellyn</span>
              <span className="my-2 block script text-[14vw] md:text-[7vw] lg:text-[7rem] leading-none">&amp;</span>
              <span className="block text-[18vw] md:text-[10vw] lg:text-[9.5rem]">Sarah</span>
            </h1>
            <p className="mt-8 max-w-md text-sm leading-relaxed text-foreground/70">
              Uma celebração em azul porcelana, entre o campo e o céu. Você está convidado(a) a viver esse dia ao nosso lado.
            </p>
          </div>

          {/* Right image */}
          <div className="col-span-12 md:col-span-5">
            <div className="relative aspect-[3/4] overflow-hidden bg-muted">
              <img
                src={heroCouple}
                alt="Evellyn e Sarah, retrato editorial"
                width={896}
                height={1216}
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 ring-1 ring-inset ring-primary/10" />
            </div>
            <p className="label-eyebrow mt-3 text-foreground/50">4ever</p>
          </div>
        </div>

        {/* Sub-header grid */}
        <div className="mt-16 grid grid-cols-1 gap-px border-y border-primary/15 bg-primary/15 md:grid-cols-3">
          {[
            { l: "Local", v: "Fazenda Pitangueiras" },
            { l: "Cerimônia", v: "17h00" },
            { l: "Recepção", v: "15h00" },
          ].map((i) => (
            <div key={i.l} className="bg-background px-6 py-6 md:px-10 md:py-8">
              <p className="label-eyebrow text-primary/70">{i.l}</p>
              <p className="mt-2 font-serif text-2xl text-foreground">{i.v}</p>
            </div>
          ))}
        </div>

        {/* Countdown */}
        <div className="mt-14 flex flex-wrap items-end justify-between gap-6 border-t border-primary/15 pt-8">
          <p className="label-eyebrow text-primary">Contagem regressiva</p>
          <div className="flex flex-1 justify-end gap-8 md:gap-14">
            {[
              { l: "Dias", v: c.d },
              { l: "Horas", v: c.h },
              { l: "Minutos", v: c.m },
              { l: "Segundos", v: c.s },
            ].map((u) => (
              <div key={u.l} className="text-right">
                <div className="font-serif text-4xl tabular-nums text-primary md:text-5xl">
                  <Pad n={u.v} />
                </div>
                <div className="label-eyebrow mt-1 text-foreground/60">{u.l}</div>
              </div>
            ))}
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
}

/* ---------- TIMELINE ---------- */
function Timeline() {
  const acts = [
    { tag: "Ato 01 · 2019", title: "O primeiro olhar", img: ato01, text: "Começou sem nenhum plano. Uma conversa que deveria durar alguns minutos atravessou a noite inteira. Entre cafés já frios e assuntos que iam de coisas sérias a completas bobagens, surgiu aquela sensação rara de estar exatamente onde se queria estar. Na época não chamamos de amor. Hoje sabemos que era." },
    { tag: "Ato 02 · 2022", title: "Pés na areia, juntas", img: ato02, text: "Uma viagem nasceu quase por impulso. Mala feita às pressas, roteiro improvisado e nenhuma expectativa além de descansar alguns dias. Mas foi olhando o mar, dividindo silêncios tão confortáveis quanto as conversas, que percebemos algo importante: não importava muito o destino. O melhor lugar continuava sendo uma ao lado da outra." },
    { tag: "Ato 03 · 2025", title: "Sim, para sempre", img: ato03, text: "Não houve discurso ensaiado nem pedido cinematográfico. Só uma conversa qualquer na cozinha, daquelas que começam falando da lista do mercado e terminam mudando a vida. Entre uma ideia e outra, percebemos que já estávamos construindo um futuro juntas havia muito tempo. A festa veio depois. A escolha já tinha sido feita." },
  ];
  return (
    <section id="historia" className="bg-background py-24 md:py-36">
      <ScrollReveal className="mx-auto max-w-[1400px] px-6 md:px-12">
        <header className="mb-20 max-w-3xl">
          <p className="label-eyebrow text-primary">Capítulo I</p>
          <h2 className="mt-4 font-serif text-4xl leading-tight text-primary md:text-6xl">
            Nossa <span className="script text-[1.3em] text-primary">história</span>,<br />
            contada em três atos.
          </h2>
        </header>

        <div className="space-y-28 md:space-y-40">
          {acts.map((a, i) => {
            const reverse = i % 2 === 1;
            return (
              <ScrollReveal key={a.tag} delay={i * 120}>
                <article className="grid grid-cols-12 items-center gap-6 md:gap-12">
                <div className={`col-span-12 md:col-span-6 ${reverse ? "md:order-2 md:col-start-7" : ""}`}>
                  <div className="relative aspect-[4/5] overflow-hidden bg-muted">
                    <img src={a.img} alt={a.title} loading="lazy" width={800} height={1024} className="h-full w-full object-cover" />
                    <div className="absolute inset-0 ring-1 ring-inset ring-primary/10" />
                  </div>
                </div>
                <div className={`col-span-12 md:col-span-5 ${reverse ? "md:order-1 md:col-start-1" : "md:col-start-8"}`}>
                  <p className="label-eyebrow text-primary">{a.tag}</p>
                  <h3 className="mt-4 font-serif text-3xl text-foreground md:text-5xl">{a.title}</h3>
                  <p className="mt-6 text-base leading-relaxed text-foreground/70">{a.text}</p>
                  <div className="mt-8 h-px w-16 bg-primary" />
                </div>
              </article>
              </ScrollReveal>
            );
          })}
        </div>
      </ScrollReveal>
    </section>
  );
}

/* ---------- GUIA ---------- */
function Guia() {
  const palette = [
    { n: "Navy", h: "#0D1F4F" },
    { n: "Serenity", h: "#A2B9CE" },
    { n: "Slate", h: "#5C7AB5" },
    { n: "Soft Gray", h: "#C7CCD4" },
    { n: "Ice Blue", h: "#E3EBEE" },
  ];
  const protocols = [
    { n: "01", t: "Pontualidade", d: "A cerimônia inicia exatamente às 17h00. Chegada sugerida a partir das 16h15." },
    { n: "02", t: "Celulares em silêncio", d: "Durante a cerimônia, deixe que o momento seja vivido — não gravado." },
    { n: "03", t: "Sem flash", d: "Nossos fotógrafos cuidam do registro. Por gentileza, sem flash na cerimônia." },
    { n: "04", t: "Crianças", d: "Crianças são bem-vindas a partir dos 6 anos, com acompanhamento dos responsáveis." },
    { n: "05", t: "Confirmação", d: "Confirme sua presença até 30 de outubro de 2026 através do formulário." },
  ];
  const menu = {
    gastronomia: ["Churrasco Gourmet", "Sushi & Sashimi", "Risotos Autorais", "Cortes Frios e Queijos"],
    sobremesas: ["Açaí", "Sorvete", "Pudim", "Mousse de Maracujá", "Bem-casados"],
  };

  return (
    <section id="guia" className="bg-secondary py-24 md:py-36">
      <ScrollReveal className="mx-auto max-w-[1400px] px-6 md:px-12">
        <header className="mb-16 max-w-3xl">
          <p className="label-eyebrow text-primary">Capítulo II</p>
          <h2 className="mt-4 font-serif text-4xl leading-tight text-primary md:text-6xl">
            Guia do <span className="script text-[1.3em]">Convidado</span>
          </h2>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-foreground/70">
            Tudo o que você precisa saber para viver esse dia ao nosso lado — do traje à última colher de mousse.
          </p>
        </header>

        <div className="grid grid-cols-12 gap-6 md:gap-10">
          {/* Dress code */}
          <div className="col-span-12 lg:col-span-5">
            <div className="bg-card p-8 shadow-[0_30px_80px_-40px_rgba(13,59,178,0.25)] md:p-12">
              <p className="label-eyebrow text-primary">Dress Code</p>
              <h3 className="mt-3 font-serif text-3xl text-foreground md:text-4xl">Esporte Fino · Passeio</h3>
              <p className="mt-5 text-sm leading-relaxed text-foreground/70">
                Pense em tecidos leves, alfaiataria com toque de informalidade e cores que conversem com o céu — apenas uma única restrição: proibido o uso de trajes nas cores Branco e Azul Royal.
              </p>
              <div className="mt-10">
                <p className="label-eyebrow text-foreground/60">Paleta Sugerida</p>
                <div className="mt-4 flex gap-2">
                  {palette.map((p) => (
                    <div key={p.n} className="flex-1">
                      <div className="aspect-square w-full ring-1 ring-inset ring-foreground/10" style={{ backgroundColor: p.h }} />
                      <p className="mt-2 text-[10px] uppercase tracking-wider text-foreground/60">{p.n}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Protocols */}
          <div className="col-span-12 lg:col-span-7">
            <p className="label-eyebrow text-primary">Etiqueta</p>
            <h3 className="mt-3 font-serif text-3xl text-foreground md:text-4xl">Pequenos protocolos, grandes momentos</h3>
            <ul className="mt-8 grid grid-cols-1 gap-px bg-primary/15 sm:grid-cols-2">
              {protocols.map((p) => (
                <li key={p.n} className="bg-secondary px-6 py-7">
                  <div className="flex items-baseline gap-4">
                    <span className="font-serif text-2xl text-primary">{p.n}</span>
                    <div>
                      <p className="font-serif text-lg text-foreground">{p.t}</p>
                      <p className="mt-2 text-xs leading-relaxed text-foreground/65">{p.d}</p>
                    </div>
                  </div>
                </li>
              ))}
              <li className="hidden bg-secondary px-6 py-7 sm:block" />
            </ul>
          </div>
        </div>

        {/* Menu */}
        <div className="mt-20 border-t border-primary/15 pt-16">
          <div className="grid grid-cols-12 gap-6 md:gap-10">
            <div className="col-span-12 md:col-span-4">
              <p className="label-eyebrow text-primary">O Banquete</p>
              <h3 className="mt-3 font-serif text-3xl text-foreground md:text-5xl">Menu</h3>
              <p className="mt-5 text-sm text-foreground/70">Uma mesa pensada para durar a noite inteira — com tempo para conversar entre cada prato.</p>
            </div>
            <div className="col-span-12 grid grid-cols-1 gap-10 md:col-span-8 md:grid-cols-2">
              <div>
                <p className="label-eyebrow text-foreground/60">Gastronomia</p>
                <ul className="mt-4 space-y-3">
                  {menu.gastronomia.map((m) => (
                    <li key={m} className="flex items-baseline gap-3 border-b border-primary/10 pb-3 font-serif text-lg text-foreground">
                      <span className="text-xs text-primary">◆</span> {m}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="label-eyebrow text-foreground/60">Sobremesas</p>
                <ul className="mt-4 space-y-3">
                  {menu.sobremesas.map((m) => (
                    <li key={m} className="flex items-baseline gap-3 border-b border-primary/10 pb-3 font-serif text-lg text-foreground">
                      <span className="text-xs text-primary">◆</span> {m}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
}

/* ---------- LUAN ---------- */
function Luan() {
  return (
    <section className="relative overflow-hidden bg-primary text-primary-foreground">
      {/* Background image layer — substituível */}
      <div className="pointer-events-none absolute inset-y-0 right-0 z-0 hidden w-1/2 lg:block">
        <img
          src={luanBg}
          alt=""
          aria-hidden="true"
          loading="lazy"
          width={768}
          height={1024}
          className="h-full w-full object-cover opacity-40 mix-blend-screen"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/70 to-transparent" />
      </div>
      <div className="pointer-events-none absolute inset-0 z-0 lg:hidden">
        <img
          src={luanBg}
          alt=""
          aria-hidden="true"
          loading="lazy"
          width={768}
          height={1024}
          className="h-full w-full object-cover opacity-25"
        />
      </div>

      <ScrollReveal className="relative z-10 mx-auto grid max-w-[1400px] grid-cols-12 gap-10 px-6 py-24 md:px-12 md:py-32">
        <div className="col-span-12 lg:col-span-7">
          <p className="label-eyebrow text-primary-foreground/60">Atração Confirmada!</p>
          <h2 className="mt-6 font-serif text-5xl leading-[0.95] md:text-8xl">Luan<br />Santana</h2>
          <p className="mt-6 font-serif text-2xl italic text-primary-foreground/80">— AO VIVO —</p>
          
          <div className="mt-10 grid grid-cols-1 gap-px bg-primary-foreground/15 sm:grid-cols-3">
            {[
              { l: "Início", v: "22h30" },
              { l: "Duração", v: "90 min" },
              { l: "Local", v: "Pavilhão Glass" },
            ].map((i) => (
              <div key={i.l} className="bg-primary px-4 py-5">
                <p className="label-eyebrow text-primary-foreground/50">{i.l}</p>
                <p className="mt-2 font-serif text-xl">{i.v}</p>
              </div>
            ))}
          </div>

          {/* NOVO: Biografia & Informações */}
          <div className="mt-12 space-y-4 max-w-xl">
            <h3 className="label-eyebrow text-primary-foreground/70 tracking-wider">Sobre o Artista</h3>
            <p className="text-base leading-relaxed text-primary-foreground/80">
              Fenômeno da música brasileira, Luan Santana traz para o palco do Pavilhão Glass uma turnê histórica. 
              Com mais de 15 anos de carreira e colecionando recordes no topo das paradas, o artista promete uma 
              experiência inesquecível combinando seus maiores clássicos românticos aos hits mais recentes do sertanejo pop.
            </p>
          </div>

          {/* NOVO: Setlist / Músicas confirmadas */}
          <div className="mt-12">
            <h3 className="label-eyebrow text-primary-foreground/70 tracking-wider mb-4">Setlist Confirmado</h3>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-primary-foreground/90 font-serif text-lg italic">
              <li>🎵 Meteoro</li>
              <li>🎵 Morena</li>
              <li>🎵 Coração Cigano</li>
              <li>🎵 Amar não é Pecado</li>
              <li>🎵 Quando a Bad Bater</li>
              <li>🎵 Escreve Aí</li>
            </ul>
          </div>
        </div>

        <div className="col-span-12 lg:col-span-5">
          <div className="relative aspect-[4/5] overflow-hidden">
            <div
              className="absolute inset-0 rounded-sm"
              style={{
                background:
                  "radial-gradient(120% 60% at 50% 0%, oklch(0.6 0.25 265 / 0.7), transparent 60%), linear-gradient(180deg, oklch(0.25 0.18 265), oklch(0.18 0.12 265))",
                boxShadow:
                  "inset 0 0 0 1px oklch(0.75 0.18 265 / 0.6), 0 0 60px oklch(0.6 0.22 265 / 0.4), 0 0 120px oklch(0.55 0.22 265 / 0.25)",
              }}
            />
            <div className="relative flex h-full flex-col justify-between p-8 md:p-12">
              <div>
                <p className="label-eyebrow text-primary-foreground/70">Convite VIP</p>
                <p className="mt-2 label-eyebrow text-primary-foreground/40">Lote Único · Nº 001</p>
              </div>
              <div>
                <p className="font-serif text-3xl italic leading-snug text-primary-foreground md:text-4xl">
                  "Uma noite. Uma voz. Uma promessa."
                </p>
                <p className="mt-6 label-eyebrow text-primary-foreground/70">Evellyn &amp; Sarah · 12.12.2026</p>
              </div>
              <div className="flex items-end justify-between">
                <div>
                  <p className="label-eyebrow text-primary-foreground/40">Acesso</p>
                  <p className="font-serif text-xl text-primary-foreground">All Areas</p>
                </div>
                <div className="script text-3xl text-primary-foreground/80">L · S</div>
              </div>
            </div>
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
}
/* ---------- Convite ---------- */
function Endereco() {
  const [submitted, setSubmitted] = useState(false);
  return (
    <section id="endereco" className="bg-background py-24 md:py-36">
      <ScrollReveal className="mx-auto max-w-[1400px] px-6 md:px-12">
        <div className="grid grid-cols-12 gap-10">
          <div className="col-span-12 md:col-span-5">
            <p className="label-eyebrow text-primary">Capítulo III</p>
            <h2 className="mt-4 font-serif text-4xl leading-tight text-primary md:text-6xl">
              Confirmação de <span className="script text-[1.3em]">endereço</span>
            </h2>
            <p className="mt-6 max-w-md text-sm leading-relaxed text-foreground/70">
              Para enviarmos o convite físico em papel algodão e os detalhes finais da cerimônia, deixe seus dados ao lado.
            </p>
            <div className="mt-10 space-y-3 text-sm">
              <p className="label-eyebrow text-foreground/50">Prazo</p>
              <p className="font-serif text-2xl text-foreground">Até 30 de outubro de 2026</p>
            </div>
          </div>

          <div className="col-span-12 md:col-span-6 md:col-start-7">
            {submitted ? (
              <div className="border border-primary/30 bg-card p-10 text-center">
                <p className="script text-4xl text-primary">Obrigada!</p>
                <p className="mt-3 text-sm text-foreground/70">Recebemos sua confirmação. Em breve, o convite encontra você.</p>
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setSubmitted(true);
                }}
                className="space-y-8"
              >
                {[
                  { l: "Nome Completo", t: "text", n: "nome" },
                  { l: "Telefone", t: "tel", n: "tel" },
                  { l: "Endereço Completo", t: "text", n: "end" },
                ].map((f) => (
                  <div key={f.n}>
                    <label className="label-eyebrow text-primary/70">{f.l}</label>
                    <input
                      type={f.t}
                      required
                      maxLength={200}
                      name={f.n}
                      className="mt-3 w-full border-0 border-b border-foreground/30 bg-transparent pb-3 font-serif text-xl text-foreground outline-none transition-colors focus:border-primary"
                    />
                  </div>
                ))}
                <button
                  type="submit"
                  className="label-eyebrow mt-6 w-full bg-primary py-5 text-primary-foreground transition-opacity hover:opacity-90"
                >
                  Confirmar Presença
                </button>
              </form>
            )}
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
}

/* ---------- BOUTIQUE ---------- */
type GiftCategory = "maldivas" | "lar";
type Gift = { tag: string; title: string; price: number; img: string; category: GiftCategory };
const GIFTS: Gift[] = [
  { tag: "Maldivas", title: "Mergulho nas Maldivas", price: 1800, img: giftMaldives, category: "maldivas" },
  { tag: "Maldivas", title: "Diária em Bangalô sobre as Águas", price: 1200, img: giftBangalo, category: "maldivas" },
  { tag: "Maldivas", title: "Passagem de Hidroavião entre as Ilhas", price: 850, img: giftHidroaviao, category: "maldivas" },
  { tag: "Maldivas", title: "Jantar Romântico Subaquático", price: 600, img: giftDinner, category: "maldivas" },
  { tag: "Maldivas", title: "Mergulho com Tartarugas Marinhas", price: 350, img: giftTartaruga, category: "maldivas" },
  { tag: "Maldivas", title: "Day Spa para Duas", price: 720, img: giftSpa, category: "maldivas" },
  { tag: "Lar", title: "Robô Aspirador Inteligente", price: 520, img: giftAspirador, category: "lar" },
  { tag: "Lar", title: "Jogo de Panelas Premium de Cerâmica", price: 480, img: giftPanelas, category: "lar" },
  { tag: "Lar", title: "Cafeteira Espresso Profissional", price: 360, img: giftCafeteira, category: "lar" },
  { tag: "Lar", title: "Jogo de Taças de Cristal de Quartzo", price: 220, img: giftTacas, category: "lar" },
  { tag: "Lar", title: "Vinho da Nossa Data", price: 360, img: giftWine, category: "lar" },
];

const FILTERS: { id: "todos" | GiftCategory; label: string }[] = [
  { id: "todos", label: "Todos" },
  { id: "maldivas", label: "Lua de Mel nas Maldivas" },
  { id: "lar", label: "Utensílios para o Lar" },
];

function Boutique() {
  const [expired, setExpired] = useState(false);
  const [filter, setFilter] = useState<"todos" | GiftCategory>("todos");
  const [selected, setSelected] = useState<Gift | null>(null);
  const [step, setStep] = useState<"detail" | "pix">("detail");
  const fee = useMemo(() => (selected ? Math.round(selected.price * 0.05 * 100) / 100 : 0), [selected]);
  const total = useMemo(() => (selected ? selected.price + fee : 0), [selected, fee]);
  const visible = useMemo(
    () => (filter === "todos" ? GIFTS : GIFTS.filter((g) => g.category === filter)),
    [filter]
  );

  const open = (g: Gift) => {
    if (expired) return;
    setSelected(g);
    setStep("detail");
  };

  return (
    <section id="presentes" className="bg-secondary py-24 md:py-36">
      <ScrollReveal className="mx-auto max-w-[1400px] px-6 md:px-12">
        <header className="mb-12 flex flex-wrap items-center justify-between gap-6">
          <div className="max-w-2xl">
            <p className="label-eyebrow text-primary">Capítulo IV</p>
            <h2 className="mt-4 font-serif text-4xl leading-tight text-primary md:text-6xl">
              Boutique de <span className="script text-[1.3em]">Presentes</span> Simbólicos
            </h2>
            <p className="mt-5 max-w-xl text-sm leading-relaxed text-foreground/70">
              Sem listas de loja, sem talheres. Aqui, cada presente vira uma memória — e cada memória, parte da nossa vida a dois.
            </p>
          </div>

          <div className="flex shrink-0 items-center gap-3 border border-primary/30 bg-card px-4 py-3 sm:gap-4 sm:px-5">
            <label
              htmlFor="boutique-expired-toggle"
              className="label-eyebrow cursor-pointer select-none whitespace-nowrap text-foreground/70"
            >
              Simular Expiração
            </label>
            <Switch
              id="boutique-expired-toggle"
              checked={expired}
              onCheckedChange={setExpired}
              aria-label="Simular expiração da boutique de presentes"
              className="shrink-0 data-[state=checked]:bg-primary data-[state=unchecked]:bg-foreground/20 [&_span]:bg-card"
            />
          </div>
        </header>

        {/* Filtros */}
        <div className="mb-10 flex flex-wrap items-center gap-2 border-b border-primary/15 pb-1">
          {FILTERS.map((f) => {
            const active = filter === f.id;
            return (
              <button
                key={f.id}
                type="button"
                onClick={() => setFilter(f.id)}
                aria-pressed={active}
                className={`label-eyebrow relative -mb-px border-b-2 px-4 py-3 transition-colors ${
                  active
                    ? "border-primary text-primary"
                    : "border-transparent text-foreground/55 hover:text-primary"
                }`}
              >
                {f.label}
              </button>
            );
          })}
          <span className="ml-auto label-eyebrow text-foreground/40">
            {visible.length} {visible.length === 1 ? "item" : "itens"}
          </span>
        </div>

        <div className="relative">
          {expired && (
            <div className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center bg-background/85 backdrop-blur-sm">
              <div className="border border-primary/30 bg-card px-10 py-8 text-center">
                <p className="script text-3xl text-primary">Período encerrado</p>
                <p className="mt-2 text-sm text-foreground/70">A boutique de presentes foi encerrada após o casamento.</p>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {visible.map((g) => (
              <article key={g.title} className="group flex flex-col bg-card">
                <div className="relative aspect-[3/4] overflow-hidden bg-muted">
                  <img src={g.img} alt={g.title} loading="lazy" width={768} height={1024} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  <span className="absolute left-4 top-4 label-eyebrow bg-card/90 px-3 py-1.5 text-primary backdrop-blur">
                    {g.tag}
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <h3 className="font-serif text-2xl text-foreground">{g.title}</h3>
                  <p className="mt-2 text-xs text-foreground/60">Contribuição simbólica para nossa lua de mel e primeiros capítulos.</p>
                  <div className="mt-auto flex items-end justify-between pt-6">
                    <div>
                      <p className="label-eyebrow text-foreground/50">A partir de</p>
                      <p className="font-serif text-xl text-primary">R$ {g.price.toLocaleString("pt-BR")}</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => open(g)}
                      className="label-eyebrow text-primary transition-opacity hover:opacity-70"
                    >
                      Presentear →
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </ScrollReveal>

      {/* Modal */}
      {selected && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-ink/60 p-4"
          onClick={() => setSelected(null)}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="w-full max-w-md bg-card p-8 md:p-10"
            onClick={(e) => e.stopPropagation()}
          >
            {step === "detail" ? (
              <>
                <p className="label-eyebrow text-primary">{selected.tag}</p>
                <h3 className="mt-3 font-serif text-3xl text-foreground">{selected.title}</h3>
                <div className="mt-8 space-y-3 border-y border-primary/15 py-6 text-sm">
                  <div className="flex justify-between"><span className="text-foreground/60">Valor do presente</span><span className="font-serif text-lg text-foreground">R$ {selected.price.toLocaleString("pt-BR")}</span></div>
                  <div className="flex justify-between"><span className="text-foreground/60">Taxa da plataforma (5%)</span><span className="font-serif text-lg text-foreground">R$ {fee.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}</span></div>
                  <div className="flex justify-between border-t border-primary/15 pt-3"><span className="label-eyebrow text-primary">Total</span><span className="font-serif text-2xl text-primary">R$ {total.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}</span></div>
                </div>
                <button
                  type="button"
                  onClick={() => setStep("pix")}
                  className="label-eyebrow mt-8 w-full bg-primary py-4 text-primary-foreground"
                >
                  Pagar com Pix
                </button>
                <button type="button" onClick={() => setSelected(null)} className="mt-3 w-full text-xs text-foreground/50 hover:text-foreground">
                  Cancelar
                </button>
              </>
            ) : (
              <>
                <p className="label-eyebrow text-primary">Pix · Simulação</p>
                <h3 className="mt-3 font-serif text-2xl text-foreground">Quase lá!</h3>
                <div className="mt-6 grid h-48 w-full place-items-center bg-muted">
                  <div className="grid grid-cols-8 gap-0.5">
                    {Array.from({ length: 64 }).map((_, i) => {
                      const seed = selected.title.charCodeAt(i % selected.title.length) + i * 7;
                      const on = (seed % 3) !== 0;
                      return (
                        <span key={i} className="h-3 w-3" style={{ backgroundColor: on ? "#0D3BB2" : "transparent" }} />
                      );
                    })}
                  </div>
                </div>
                <p className="mt-4 text-center text-xs text-foreground/60">Escaneie o QR Code ou copie o código abaixo</p>
                <p className="mt-3 truncate rounded-sm bg-muted px-3 py-2 text-center font-mono text-xs text-foreground">00020126580014BR.GOV.BCB.PIX...{selected.title.slice(0, 6)}</p>
                <p className="mt-6 text-center font-serif text-2xl text-primary">R$ {total.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}</p>
                <button type="button" onClick={() => setSelected(null)} className="label-eyebrow mt-6 w-full border border-primary py-3 text-primary">
                  Concluir
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </section>
  );
}

const FOOTER_TEAM = [
  { name: "NOHANA ASSIS", role: "Product Owner" },
  { name: "ISABELLA CHAVES", role: "Scrum Master" },
  { name: "CARLOS HENRIQUE", role: "Desenvolvedor back-end" },
  { name: "PEDRO SOARES", role: "Desenvolvedor back-end" },
  { name: "LARAYNNY DALYLLA", role: "Desenvolvedora DevOps" },
  { name: "PEDRO MATOS", role: "Desenvolvedor front-end" },
] as const;

/* ---------- FOOTER ---------- */
function Footer() {
  return (
    <footer className="bg-black text-white">
      <ScrollReveal variant="fade" className="mx-auto flex max-w-[1400px] flex-col items-center px-6 py-20 text-center md:px-12 md:py-28">
        <div className="relative flex min-h-[7.5rem] w-full max-w-2xl flex-col items-center justify-center py-6 md:min-h-[9rem]">
          <img
            src={rosas}
            alt=""
            aria-hidden="true"
            className="pointer-events-none absolute left-1/2 top-1/2 z-0 h-auto w-[min(100%,18rem)] max-w-[18rem] -translate-x-1/2 -translate-y-1/2 object-contain md:max-w-[22rem]"
          />
          <h2 className="relative z-10 font-sans text-xl font-medium tracking-widest text-white md:text-2xl">
            NOVA ORDEM
          </h2>
          <p className="relative z-10 mt-4 font-sans text-[10px] tracking-[0.22em] text-white md:text-xs">
            CONSTRUINDO O AMANHÃ DO SEU SIM.
          </p>
        </div>

        <div className="mt-14 flex flex-wrap justify-center gap-x-12 gap-y-10 md:mt-16">
          {FOOTER_TEAM.map((member) => (
            <div key={member.name} className="w-[9.5rem] sm:w-auto">
              <p className="font-sans text-[10px] font-bold tracking-[0.14em] text-white md:text-[11px]">
                {member.name}
              </p>
              <p className="mt-1.5 font-sans text-[10px] text-neutral-400 md:text-[11px]">
                ({member.role})
              </p>
            </div>
          ))}
        </div>

        <div className="mt-16 w-full max-w-5xl border-t border-neutral-800 md:mt-20" />

        <p className="mt-8 max-w-5xl px-2 font-sans text-[9px] leading-relaxed tracking-wide text-neutral-500 md:text-[10px]">
          Nova Ordem LTDA • CNPJ 24.681.023/0001-99 • Sede em Itaim Bibi, São Paulo/SP •{" "}
          <a href="mailto:contato@novaordemweddings.com" className="transition-colors hover:text-neutral-300">
            contato@novaordemweddings.com
          </a>{" "}
          • +55 (11) 5555-0198
        </p>
      </ScrollReveal>
    </footer>
  );
}

function Index() {
  return (
    <main className="min-h-screen bg-background">
      <ScrollRevealStyles />
      <Hero />
      <Timeline />
      <Guia />
      <Luan />
      <Endereco />
      <Boutique />
      <Footer />
    </main>
  );
}
