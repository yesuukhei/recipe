import search from './model/search';
let s = new search('pizza');
s.doSearch().then(r => console.log(r));