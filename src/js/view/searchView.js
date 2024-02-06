import {elements} from './base';


const renderRecipe = recipe => {
    console.log(recipe);
    const markup = `  <li>
    <a class="results__link results__link--active" href="${recipe.recipe_id}">
        <figure class="results__fig">
            <img src="${recipe.image_url}" alt="Test">
        </figure>
        <div class="results__data">
            <h4 class="results__name">${recipe.title} ...</h4>
            <p class="results__author">${recipe.publisher}</p>
        </div>
    </a>
</li>`
    //ul ruugee nemne
    elements.searchResultList.insertAdjacentHTML('beforeend', markup);
}

export const clearSearchField = () => {
    elements.searchInput.value = '';
};
export const clearSearchResult = () => {
    elements.searchResultList.innerHTML = '';
    elements.searchButton.innerHTML = '';
};
export const getInput = () => elements.searchInput.value;
export const renderRecipes = (recipes, currentPage = 1, rePages = 10) => {
    //Хайлтын үр дүнг дэлгэцэнд хэвлэх
    const start = (currentPage - 1) * rePages;
    const end = currentPage * rePages;
    recipes.slice(start, end).forEach(renderRecipe);

    //Товчлуур гаргах
    const totalPages = Math.ceil( recipes.length / rePages );
    renderButton(currentPage, totalPages);
}
const createButton = (currentPage, type, direction) => 
`<button class="btn-inline results__btn--${type} " data-goto=${currentPage}>
<svg class="search__icon">
    <use href="img/icons.svg#icon-triangle-${direction}"></use>
</svg>
<span>Хуудас ${currentPage}</span>
</button>
`;
const renderButton = (currentPage, totalPages) => {
    let buttonHTML;
    if(currentPage === 1 && totalPages > 1) {
        buttonHTML = createButton(2, 'next', 'right');
    } else if(currentPage < totalPages) {
        buttonHTML = createButton(currentPage-1, 'pre', 'left');
        buttonHTML += createButton(currentPage+1, 'next', 'right');
    } else if(currentPage === totalPages) {
        buttonHTML = createButton(currentPage-1, 'pre', 'left');
    };

    elements.searchButton.insertAdjacentHTML('afterbegin', buttonHTML);
}
   