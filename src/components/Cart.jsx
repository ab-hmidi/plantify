import { useEffect } from "react";
import { formatPrice } from "../utils/formatPrice";
import {
  eyebrow,
  focusRing,
  primaryButton,
} from "../utils/uiClasses";

function Cart({ isOpen, items, onClose, onUpdateQuantity }) {
  useEffect(() => {
    if (!isOpen) return undefined;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  return (
    <div
      className="fixed inset-0 z-[30] flex justify-end bg-[rgba(24,37,28,.42)]"
      onClick={onClose}
    >
      <section
        className="flex h-full w-[min(470px,100%)] flex-col bg-white p-7 shadow-[-12px_0_45px_rgba(22,36,25,.14)] max-[620px]:px-[19px] max-[620px]:py-[22px]"
        role="dialog"
        aria-modal="true"
        aria-labelledby="cart-title"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-[#edf0e9] pb-[23px]">
          <div>
            <p className={`${eyebrow} mb-[5px]`}>Votre sélection</p>
            <h2
              id="cart-title"
              className="m-0 font-sans text-[25px] tracking-[-.8px] text-[#2c4433]"
            >
              Mon panier
            </h2>
          </div>
          <button
            className={`grid size-[38px] shrink-0 place-items-center rounded-full border-0 bg-[#f6f7f3] text-[25px] text-[#34523d] transition-colors hover:bg-[#f0f4ed] ${focusRing}`}
            type="button"
            onClick={onClose}
            aria-label="Fermer le panier"
          >
            ×
          </button>
        </div>

        {items.length > 0 ? (
          <>
            <ul className="m-0 grid list-none gap-[18px] overflow-y-auto py-[22px]">
              {items.map((item) => (
                <li
                  className="grid grid-cols-[76px_minmax(0,1fr)_auto] items-start gap-[13px]"
                  key={item.id}
                >
                  <img
                    className="h-[84px] w-[76px] rounded-[9px] bg-[#f0f2ed] object-cover"
                    src={item.cover}
                    alt=""
                  />
                  <div>
                    <h3 className="mt-[3px] mb-[5px] text-[13px] text-[#354a38]">
                      {item.name}
                    </h3>
                    <span className="text-xs text-[#778276]">
                      {formatPrice(item.price)}
                    </span>
                    <div className="mt-[11px] flex w-max items-center gap-3 rounded-[7px] border border-[#e8ece4] px-[7px] py-[3px]">
                      <button
                        className={`grid size-[22px] place-items-center rounded bg-transparent text-[17px] text-[#496149] hover:bg-[#eef2e9] ${focusRing}`}
                        type="button"
                        aria-label={`Retirer une ${item.name}`}
                        onClick={() => onUpdateQuantity(item.id, -1)}
                      >
                        −
                      </button>
                      <span
                        className="min-w-3 text-center text-[11px] text-[#394b3c]"
                        aria-label={`Quantité : ${item.quantity}`}
                      >
                        {item.quantity}
                      </span>
                      <button
                        className={`grid size-[22px] place-items-center rounded bg-transparent text-[17px] text-[#496149] hover:bg-[#eef2e9] ${focusRing}`}
                        type="button"
                        aria-label={`Ajouter une ${item.name}`}
                        onClick={() => onUpdateQuantity(item.id, 1)}
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <strong className="pt-1 text-xs font-semibold text-[#3a563b]">
                    {formatPrice(item.price * item.quantity)}
                  </strong>
                </li>
              ))}
            </ul>
            <div className="mt-auto border-t border-[#edf0e9] pt-5">
              <div className="flex justify-between text-[15px] text-[#344a37]">
                <span>Sous-total</span>
                <strong>{formatPrice(total)}</strong>
              </div>
              <p className="mt-[9px] mb-[18px] text-[11px] text-[#858e83]">
                Livraison calculée au moment de la commande.
              </p>
              <button
                className={`${primaryButton} w-full ${focusRing}`}
                type="button"
                onClick={onClose}
              >
                Continuer mes achats
              </button>
              <span className="mt-3 block text-center text-[10px] leading-[1.5] text-[#90978d]">
                Une boutique de démonstration — aucun paiement n’est effectué.
              </span>
            </div>
          </>
        ) : (
          <div className="flex flex-1 flex-col items-center justify-center px-5 pb-[50px] text-center">
            <span className="text-[49px]" aria-hidden="true">
              🪴
            </span>
            <h3 className="mt-4 mb-[6px] max-w-[250px] font-sans text-[19px] text-[#34503a]">
              Votre panier attend sa première plante
            </h3>
            <p className="mb-5 max-w-[290px] text-[13px] leading-[1.6] text-[#818c80]">
              Découvrez notre collection et trouvez votre coup de cœur.
            </p>
            <button
              className={`${primaryButton} ${focusRing}`}
              type="button"
              onClick={onClose}
            >
              Découvrir les plantes
            </button>
          </div>
        )}
      </section>
    </div>
  );
}

export default Cart;
