# Plantify

Boutique de plantes d’intérieur réalisée avec React, Vite et Tailwind CSS. Le
catalogue est défini dans `src/datas/plantList.js` et les photos sont stockées
dans `public/plants/`.

## Démarrer l’application

```sh
npm install
npm run dev
```

Les commandes `npm run lint` et `npm run build` vérifient le code et génèrent la
version de production.

## Fonctionnalités

- Recherche de plantes et filtres par catégorie.
- Catalogue de 36 plantes, réparti sur trois pages de 12 produits.
- Fiche détaillée pour chaque plante avec des suggestions similaires.
- Panier avec gestion des quantités, enregistré dans le `localStorage` du
  navigateur (`plantify-cart`).
- Aucun backend, base de données ou paiement n’est configuré.
- L’interface est stylée avec les classes utilitaires Tailwind. `src/styles/tailwind.css`
  ne contient que l’import Tailwind et la police du thème.
