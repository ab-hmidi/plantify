import { plantList } from "../datas/plantList";
import PlantItem from "./PlantItem";
import { formatPrice } from "../utils/formatPrice";
import {
  eyebrow,
  focusRing,
  pageContainer,
  plantGrid,
  primaryButton,
} from "../utils/uiClasses";

function Description({ plant, onBack, onSelectPlant, onAddToCart }) {
  const similarPlants = [
    ...plantList.filter(
      (candidate) =>
        candidate.category === plant.category && candidate.id !== plant.id,
    ),
    ...plantList.filter(
      (candidate) =>
        candidate.category !== plant.category && candidate.id !== plant.id,
    ),
  ].slice(0, 4);

  return (
    <div className="min-h-[65vh] bg-white">
      <div className={`${pageContainer} pt-[34px] pb-[90px] max-[620px]:pt-[25px] max-[620px]:pb-[62px]`}>
        <button
          className={`mb-7 inline-flex cursor-pointer items-center gap-[9px] border-0 bg-transparent p-0 text-[13px] text-[#657568] hover:text-[#315e3d] max-[620px]:mb-5 ${focusRing}`}
          type="button"
          onClick={() => onBack()}
        >
          <span className="text-lg" aria-hidden="true">
            ←
          </span>
          Retour à la boutique
        </button>

        <section className="grid grid-cols-[1fr_0.9fr] items-center gap-[74px] max-[620px]:grid-cols-1 max-[620px]:gap-6">
          <div className="relative h-[480px] overflow-hidden rounded-[18px] bg-[#f2f4ee] max-[620px]:h-[min(95vw,390px)] max-[620px]:rounded-[13px]">
            <img
              className="size-full object-cover"
              src={plant.cover}
              alt={plant.name}
            />
            {plant.badge && (
              <span className="pointer-events-none absolute top-5 left-5 rounded-full bg-white/95 px-[13px] py-[9px] text-[11px] font-semibold text-[#3a5a3c]">
                {plant.badge}
              </span>
            )}
          </div>
          <div className="max-w-[480px]">
            <span className="text-[10px] text-[#85907f]">{plant.category}</span>
            <h1 className="mt-[10px] mb-[9px] font-sans text-[clamp(32px,4vw,46px)] font-semibold tracking-[-1.6px] text-[#2d4634] max-[620px]:text-[32px]">
              {plant.name}
            </h1>
            <span className="text-[19px] font-bold text-[#3d603e]">
              {formatPrice(plant.price)}
            </span>
            <p className="my-5 text-[15px] leading-[1.85] text-[#6e7c70] max-[620px]:my-[14px] max-[620px]:text-[13px]">
              {plant.details}
            </p>
            <div className="grid gap-3 border-t border-[#f0f2ed] py-[18px] text-xs text-[#748073]">
              <span className="flex items-center gap-[7px]">
                <span className="w-[14px] text-center text-sm text-[#82945d]" aria-hidden="true">
                  ☀
                </span>
                {plant.light}
              </span>
              <span className="flex items-center gap-[7px]">
                <span className="w-[14px] text-center text-sm text-[#82945d]" aria-hidden="true">
                  ♧
                </span>
                {plant.water}
              </span>
            </div>
            <button
              className={`${primaryButton} mt-5 min-w-[230px] max-[620px]:mt-[14px] max-[620px]:w-full ${focusRing}`}
              type="button"
              onClick={() => onAddToCart(plant.id)}
            >
              Ajouter au panier <span aria-hidden="true">＋</span>
            </button>
          </div>
        </section>

        <section
          className="pt-[88px] max-[620px]:pt-[54px]"
          aria-labelledby="similar-title"
        >
          <p className={`${eyebrow} mb-[9px]`}>
            Pour compléter votre coin de verdure
          </p>
          <h2
            id="similar-title"
            className="mb-[26px] font-sans text-[clamp(27px,3.5vw,36px)] font-semibold tracking-[-1px] text-[#2d4634]"
          >
            Vous aimerez aussi
          </h2>
          <ul className={`${plantGrid} m-0 list-none p-0`}>
            {similarPlants.map((similarPlant) => (
              <PlantItem
                key={similarPlant.id}
                plant={similarPlant}
                onAddToCart={onAddToCart}
                onSelectPlant={onSelectPlant}
              />
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}

export default Description;
