'use strict';
const main = () => {
  const form = document.querySelector('.recipe-form');
  const listRecipes = document.querySelector('.recipe-list');

  const addEventsToDelete = () => {
    const deleteButtons = document.querySelectorAll('article button');
    deleteButtons.forEach(button => {
      button.addEventListener('click', async (event) => {
        const id = event.target.id;
        await axios.post(`/api/recipes/${id}/delete`);
        const article = event.target.parentElement;
        article.remove();
      });
    });
  };

  addEventsToDelete();

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const recipe = {
      title: event.srcElement.title.value,
      duration: event.srcElement.duration.value,
      cuisine: event.srcElement.cuisine.value,
      level: event.srcElement.level.value
    };
    if (!recipe.title || !recipe.duration || !recipe.cuisine || !recipe.level) {
      const pError = document.createElement('p');
      pError.innerText = 'Please fill all fields to create a recipe';
      const errors = document.querySelector('.errors');
      errors.appendChild(pError);
    }

    const response = await axios.post('/api/recipes', recipe);
    const newRecipe = response.data;
    form.reset();
    const p = document.createElement('p');
    p.innerText = `${newRecipe.title} - ${newRecipe.level}`;
    const button = document.createElement('button');
    button.innerText = 'Delete';
    button.setAttribute('id', newRecipe._id);
    const article = document.createElement('article');
    article.appendChild(p);
    article.appendChild(button);
    listRecipes.appendChild(article);
    addEventsToDelete();
  });
};

window.addEventListener('load', main);
