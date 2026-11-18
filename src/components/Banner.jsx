import { eyebrow, focusRing, pageContainer, primaryButton } from "../utils/uiClasses";

const Banner = () => (
  <section
    className="overflow-hidden bg-[#f5f6ef]"
    id="accueil"
  >
    <div
      className={`${pageContainer} grid min-h-[500px] grid-cols-[1.03fr_0.97fr] items-center gap-[60px] py-10 max-[900px]:min-h-[440px] max-[900px]:grid-cols-[1fr_0.9fr] max-[900px]:gap-7 max-[620px]:min-h-0 max-[620px]:grid-cols-1 max-[620px]:gap-[25px] max-[620px]:pt-[49px] max-[620px]:pb-[37px]`}
    >
      <div className="max-w-[545px] py-4 pb-5 max-[620px]:p-0">
        <p className={`${eyebrow} flex items-center gap-2`}>
          <span className="text-[17px] text-[#93a65f]" aria-hidden="true">
            ✳
          </span>
          Un peu plus de nature, chaque jour
        </p>
        <h1 className="m-0 font-sans text-[clamp(45px,5.3vw,68px)] leading-[1.08] font-semibold tracking-[-3.8px] text-[#284633] max-[620px]:text-[clamp(43px,11vw,60px)] max-[620px]:tracking-[-2.7px]">
          Faites entrer
          <br />
          <span className="font-medium text-[#748a50]">la vie chez vous.</span>
        </h1>
        <p className="my-[22px] max-w-[430px] text-[15px] leading-[1.75] text-[#67756a] max-[620px]:my-4 max-[620px]:mb-5 max-[620px]:text-[13px]">
          Des plantes choisies avec soin, prêtes à trouver leur place chez vous.
          On vous aide à trouver votre coup de cœur.
        </p>
        <a className={`${primaryButton} ${focusRing}`} href="#plantes">
          Découvrir la collection <span aria-hidden="true">↗</span>
        </a>
        <div className="mt-6 flex items-center gap-[9px] text-xs text-[#748074] max-[620px]:mt-4 max-[620px]:text-[11px]">
          <span
            className="grid size-[23px] place-items-center rounded-full bg-[#e6ecdc] text-[15px] text-[#62804f]"
            aria-hidden="true"
          >
            ♡
          </span>
          <span>Livraison soignée, plantes heureuses</span>
        </div>
      </div>
      <div className="relative h-[405px] w-full max-w-[492px] justify-self-end max-[900px]:h-[330px] max-[620px]:mx-auto max-[620px]:h-[290px] max-[620px]:max-w-[460px] max-[620px]:justify-self-center">
        <img
          src="/plants/hero.jpg"
          alt="Plante d’intérieur verdoyante dans un joli pot"
          className="size-full rounded-[45%_45%_17px_17px] object-cover object-center max-[620px]:rounded-[42%_42%_14px_14px]"
        />
        <div className="absolute right-[-24px] bottom-6 flex items-center gap-[11px] rounded-xl border border-white/75 bg-white/95 px-[17px] py-[13px] shadow-[0_9px_28px_rgba(34,55,38,.1)] max-[900px]:right-[-8px] max-[620px]:right-[7px] max-[620px]:bottom-3">
          <span className="text-[23px]" aria-hidden="true">
            🌱
          </span>
          <span>
            <strong className="block text-xs text-[#304834]">
              De belles feuilles
            </strong>
            <small className="mt-[3px] block text-[10px] text-[#7c867c]">
              et beaucoup de douceur
            </small>
          </span>
        </div>
        <span
          className="absolute top-4 left-[-27px] text-[37px] text-[#9eab7a] max-[620px]:left-px"
          aria-hidden="true"
        >
          ✳
        </span>
      </div>
    </div>
  </section>
);

export default Banner;

