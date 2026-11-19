import { formatPrice } from "../utils/formatPrice";
import { focusRing } from "../utils/uiClasses";

function PlantItem({ plant, onAddToCart, onSelectPlant }) {
  return (
    <li className="group overflow-hidden rounded-[15px] border border-[#eef0ea] bg-white transition-[border-color,box-shadow,transform] duration-[180ms] hover:-translate-y-[3px] hover:border-[#dce5d7] hover:shadow-[0_12px_30px_rgba(41,62,43,.08)] max-[620px]:rounded-[11px]">
      <div className="relative h-[205px] overflow-hidden bg-[#f2f4ee] max-[900px]:h-[180px] max-[620px]:h-[clamp(112px,34vw,156px)]">
        <button
          className={`block size-full cursor-pointer border-0 bg-transparent p-0 ${focusRing}`}
          type="button"
          onClick={() => onSelectPlant(plant.id)}
          aria-label={`Voir ${plant.name}`}
        >
          <img
            className="size-full object-cover transition-transform duration-300 group-hover:scale-[1.035]"
            src={plant.cover}
            alt=""
            loading="lazy"
          />
        </button>
        {plant.badge && (
          <span className="pointer-events-none absolute top-[13px] left-[13px] rounded-full bg-white/95 px-[10px] py-[7px] text-[10px] font-semibold text-[#3a5a3c] max-[620px]:top-2 max-[620px]:left-2 max-[620px]:px-2 max-[620px]:py-[6px] max-[620px]:text-[8px]">
            {plant.badge}
          </span>
        )}
      </div>
      <div className="p-[14px_15px_15px] max-[900px]:p-3 max-[620px]:p-[12px_11px]">
        <span className="text-[10px] text-[#85907f] max-[620px]:text-[9px]">
          {plant.category}
        </span>
        <div className="mt-[7px] flex items-baseline justify-between gap-2 max-[620px]:block">
          <h3 className="m-0 min-w-0 flex-1 truncate font-sans text-base font-bold text-[#314636] max-[900px]:text-sm max-[620px]:text-[13px]">
            <button
              className={`max-w-full cursor-pointer truncate border-0 bg-transparent p-0 text-left align-baseline text-inherit hover:text-[#66804d] ${focusRing}`}
              type="button"
              onClick={() => onSelectPlant(plant.id)}
            >
              {plant.name}
            </button>
          </h3>
          <span className="shrink-0 text-sm font-bold text-[#3d603e] max-[900px]:text-xs max-[620px]:mt-[5px] max-[620px]:block">
            {formatPrice(plant.price)}
          </span>
        </div>
        <p className="my-[7px] mt-[7px] mb-[9px] min-h-[35px] text-[11px] leading-[1.65] text-[#818a80] max-[620px]:mb-[7px] max-[620px]:min-h-[45px] max-[620px]:text-[10px]">
          {plant.description}
        </p>
        <div className="grid gap-[6px] border-t border-[#f0f2ed] py-[9px] pt-[9px] pb-[10px] text-[10px] text-[#748073] max-[620px]:gap-[6px] max-[620px]:py-[9px] max-[620px]:text-[9px]">
          <span className="flex items-center gap-[7px]" title="Besoin en lumière">
            <span className="w-[14px] text-center text-sm text-[#82945d]" aria-hidden="true">
              ☀
            </span>
            {plant.light}
          </span>
          <span className="flex items-center gap-[7px]" title="Fréquence d’arrosage">
            <span className="w-[14px] text-center text-sm text-[#82945d]" aria-hidden="true">
              ♧
            </span>
            {plant.water}
          </span>
        </div>
        <button
          className={`flex min-h-9 w-full cursor-pointer items-center justify-center gap-[7px] rounded-lg border border-[#dfe7da] bg-[#f8faf6] text-[11px] font-semibold text-[#3d6041] transition-colors hover:border-[#315e3d] hover:bg-[#315e3d] hover:text-white max-[620px]:min-h-[35px] max-[620px]:text-[9px] ${focusRing}`}
          type="button"
          onClick={() => onAddToCart(plant.id)}
          aria-label={`Ajouter ${plant.name} au panier`}
        >
          <span className="text-base leading-none" aria-hidden="true">
            ＋
          </span>
          Ajouter au panier
        </button>
      </div>
    </li>
  );
}

export default PlantItem;
