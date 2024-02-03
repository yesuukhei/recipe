import Search from './model/Search';
import {elements} from './view/base';
import * as searchView from './view/searchView';
/* 
    web app төлөв:
    * хайлтын query, үр дүн
    * Тухайн үзүүлж байгаа жор
    * Лайкласан жорууд
    * Захиалж байаа жорын найрлагууд

*/
const state = {};
const controlSearch = async () => {
    //1) Вэбээс хайлтын түлхүүр үгийг гаргаж авна
    const query = searchView.getInput();

    if(query) {
    //2) Шинээр хайлтын обьктийг үүсгэж өгнө
        state.search = new Search(query);

    //3) Хайлт хийхэд зориулж дэлгэцийг UI бэлтгэнэ
    searchView.clearSearchField();
    searchView.clearSearchResult();

    //4) Хайлтыг гүйцэтгэнэ
    await state.search.doSearch();
    
    //5) Хайлтын үр дүнг дэлгэцэнд хэвлэнэ
    if(state.search.result === undefined) alert('Хайлтаар илэрцгүй');
    else searchView.renderRecipes(state.search.result);
    }
  
   
};

elements.searchForm.addEventListener('submit', e => {
    e.preventDefault();
    controlSearch();
})