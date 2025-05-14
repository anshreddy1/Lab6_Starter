// main.js

window.addEventListener('DOMContentLoaded', init);

async function init() {
  let recipes = getRecipesFromStorage();      // already defined earlier

  /* 👇 NEW: re‑seed if localStorage was empty */
  if (recipes.length === 0) {
    const resp = await fetch('reference/recipes.json');
    recipes = await resp.json();
    localStorage.setItem('recipes', JSON.stringify(recipes));
  }

  addRecipesToDocument(recipes);
  initFormHandler();
}

/* ---------- A9 ---------- */
const getRecipesFromStorage = () =>
  JSON.parse(localStorage.getItem('recipes')) || [];

/* ---------- A10 & A11 ---------- */
function addRecipesToDocument(recipes) {
  const main = document.querySelector('main');
  recipes.forEach((r) => {
    const card = document.createElement('recipe-card');
    card.data  = r;
    main.appendChild(card);
  });
}

/* ---------- B1 ---------- */
const saveRecipesToStorage = (recipes) =>
  localStorage.setItem('recipes', JSON.stringify(recipes));

/* ---------- B2 – B13 ---------- */
function initFormHandler() {
  const form        = document.querySelector('form');         // B2
  const main        = document.querySelector('main');
  const clearButton = document.querySelector('button.danger'); // B10

  /* ---- add‑recipe flow ---- */
  form.addEventListener('submit', (e) => {                    // B3
    e.preventDefault();
    const data = new FormData(form);                          // B4

    const recipeObject = {};                                  // B5
    data.forEach((val, key) => (recipeObject[key] = val));

    const card = document.createElement('recipe-card');       // B6
    card.data  = recipeObject;                                // B7
    main.appendChild(card);                                   // B8

    const recipes = getRecipesFromStorage();                  // B9
    recipes.push(recipeObject);
    saveRecipesToStorage(recipes);

    form.reset();
  });

  /* ---- clear‑storage flow ---- */
  clearButton.addEventListener('click', () => {               // B11
    localStorage.clear();                                     // B12
    main.innerHTML = '';                                      // B13
  });
}
