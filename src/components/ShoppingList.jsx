import { useMemo, useState } from "react";
import { plantList } from "../datas/plantList";
import PlantItem from "./PlantItem";
import {
  eyebrow,
  focusRing,
  pageContainer,
  plantGrid,
} from "../utils/uiClasses";

const categories = [
  "Toutes",
  ...new Set(plantList.map((plant) => plant.category)),
];
const pageSize = 12;

const ShoppingList = ({ searchQuery, onAddToCart, onSelectPlant }) => {
  const [selectedCategory, setSelectedCategory] = useState("Toutes");
  const [pagination, setPagination] = useState({ filter: "", page: 1 });
  const filter = `${searchQuery}\u0000${selectedCategory}`;
  const currentPage = pagination.filter === filter ? pagination.page : 1;
  const filteredPlants = useMemo(() => {
    const query = searchQuery.trim().toLocaleLowerCase("fr");

    return plantList.filter((plant) => {
      const matchesCategory =
        selectedCategory === "Toutes" || plant.category === selectedCategory;
      const matchesSearch =
        !query ||
        `${plant.name} ${plant.category} ${plant.description}`
          .toLocaleLowerCase("fr")
          .includes(query);

      return matchesCategory && matchesSearch;
    });
  }, [searchQuery, selectedCategory]);
  const pageCount = Math.ceil(filteredPlants.length / pageSize);
  const visiblePlants = filteredPlants.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize,
  );

  return (
    <section
      className={`${pageContainer} scroll-mt-[95px] pt-[88px] pb-[100px] max-[620px]:pt-[62px] max-[620px]:pb-[66px]`}
      id="plantes"
    >
      <div className="flex items-end justify-between gap-6 max-[620px]:items-start">
        <div>
          <p className={`${eyebrow} mb-[10px]`}>La collection Plantify</p>
          <h2 className="m-0 font-sans text-[clamp(27px,3.5vw,38px)] font-semibold tracking-[-1.4px] text-[#2d4634] max-[620px]:max-w-[430px] max-[620px]:text-[28px] max-[620px]:tracking-[-1px]">
            Un coin de verdure à votre image
          </h2>
          <p className="mt-3 max-w-[630px] text-sm leading-[1.7] text-[#7a857b] max-[620px]:text-xs">
            Des plantes choisies avec amour, pour tous les intérieurs et tous
            les niveaux de main verte.
          </p>
        </div>
        <span className="shrink-0 pb-[5px] text-xs text-[#839080] max-[620px]:hidden">
          {filteredPlants.length} plante{filteredPlants.length > 1 ? "s" : ""}
        </span>
      </div>

      <div
        className="my-[29px] flex flex-wrap gap-[9px] max-[620px]:mx-[-18px] max-[620px]:mt-[22px] max-[620px]:mb-[21px] max-[620px]:flex-nowrap max-[620px]:overflow-x-auto max-[620px]:px-[18px] max-[620px]:pb-1 max-[620px]:[scrollbar-width:none]"
        aria-label="Filtrer par catégorie"
      >
        {categories.map((category) => (
          <button
            key={category}
            className={`min-h-[38px] rounded-full border px-[17px] text-xs transition-colors max-[620px]:min-h-[35px] max-[620px]:shrink-0 max-[620px]:px-[13px] max-[620px]:text-[11px] ${
              selectedCategory === category
                ? "border-[#315e3d] bg-[#315e3d] text-white"
                : "border-[#e8ece5] bg-white text-[#69766c] hover:border-[#adbea1]"
            } ${focusRing}`}
            type="button"
            aria-pressed={selectedCategory === category}
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>

      {filteredPlants.length > 0 ? (
        <ul className={`${plantGrid} m-0 list-none p-0`}>
          {visiblePlants.map((plant) => (
            <PlantItem
              key={plant.id}
              plant={plant}
              onAddToCart={onAddToCart}
              onSelectPlant={onSelectPlant}
            />
          ))}
        </ul>
      ) : (
        <div className="rounded-[14px] border border-dashed border-[#dfe6d9] px-5 py-[70px] text-center text-[#758174]">
          <span className="text-[30px]" aria-hidden="true">
            🌿
          </span>
          <h3 className="mt-3 mb-[7px] font-sans text-lg text-[#3c5340]">
            Aucune plante trouvée
          </h3>
          <p className="m-0 text-[13px]">
            Essayez un autre nom ou choisissez une autre catégorie.
          </p>
        </div>
      )}

      {pageCount > 1 && (
        <nav
          className="mt-[37px] flex items-center justify-center gap-2"
          aria-label="Pagination des plantes"
        >
          <button
            className={`grid size-[38px] place-items-center rounded-full border border-[#e8ece5] bg-white text-[13px] text-[#667366] transition-colors hover:enabled:border-[#9eb18d] disabled:cursor-not-allowed disabled:bg-[#f7f8f5] disabled:text-[#b6bdb4] ${focusRing}`}
            type="button"
            aria-label="Page précédente"
            disabled={currentPage === 1}
            onClick={() =>
              setPagination({ filter, page: currentPage - 1 })
            }
          >
            ←
          </button>
          {Array.from({ length: pageCount }, (_, index) => index + 1).map(
            (page) => (
              <button
                key={page}
                className={`grid size-[38px] place-items-center rounded-full border text-[13px] transition-colors ${
                  currentPage === page
                    ? "border-[#315e3d] bg-[#315e3d] text-white"
                    : "border-[#e8ece5] bg-white text-[#667366] hover:border-[#9eb18d]"
                } ${focusRing}`}
                type="button"
                aria-label={`Page ${page}`}
                aria-current={currentPage === page ? "page" : undefined}
                onClick={() => setPagination({ filter, page })}
              >
                {page}
              </button>
            ),
          )}
          <button
            className={`grid size-[38px] place-items-center rounded-full border border-[#e8ece5] bg-white text-[13px] text-[#667366] transition-colors hover:enabled:border-[#9eb18d] disabled:cursor-not-allowed disabled:bg-[#f7f8f5] disabled:text-[#b6bdb4] ${focusRing}`}
            type="button"
            aria-label="Page suivante"
            disabled={currentPage === pageCount}
            onClick={() =>
              setPagination({ filter, page: currentPage + 1 })
            }
          >
            →
          </button>
        </nav>
      )}
    </section>
  );
};

export default ShoppingList;
