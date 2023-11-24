import { BOOKS_PER_PAGE, authors, genres, books } from './data.js'

let matches = books
let extracted = books
let page = 0
let range = [0,0]

const dataListButton = document.querySelector('[data-list-button]')
const dataSearchCancel = document.querySelector('[data-search-cancel]')
const dataSearchOverlay = document.querySelector('[data-search-overlay]')
const dataHeaderSettings = document.querySelector('[data-header-settings]')
const dataSettingsCancel = document.querySelector('[data-settings-cancel]')
const dataSettingsForm = document.querySelector('[data-settings-form]')
const dataListClose = document.querySelector('[data-list-close]')
const dataHeaderSearch = document.querySelector('[data-header-search]')
const dataSearchTitle = document.querySelector('[data-search-title]')
const dataSearchForm = document.querySelector('[data-search-form]')
const dataListMessage = document.querySelector('[data-list-message]')
const dataListItems = document.querySelector('[data-list-items]')
const dataSearchGenres = document.querySelector('[data-search-genres]')
const dataSearchAuthors = document.querySelector('[data-search-authors]')
const dataSettingsTheme = document.querySelector('[data-settings-theme]')
const dataSettingsOverlay = document.querySelector('[data-settings-overlay]')
const dataListActive = document.querySelector('[data-list-active]')
const dataListBlur = document.querySelector('[data-list-blur]')
const dataListImage = document.querySelector('[data-list-image]')
const dataListTitle = document.querySelector('[data-list-title]')
const dataListSubTitle = document.querySelector('[data-list-subtitle]')
const dataListDescription = document.querySelector('[data-list-description]')

if (!books && !Array.isArray(books)) {
    throw new Error('Source required') ;
}
if (!range && range.length != 2) {
    throw new Error('Range must be an array with two numbers');
}                                           //fixed syntax issues and structure




const day = {                                //declare variable
    dark: '10, 10, 20',     
    light: '255, 255, 255',
} ;

const night = {                                //declare variable
    dark: '255, 255, 255',
    light: '10, 10, 20',
};

const theme = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'night' : 'day'
dataSettingsTheme.value = theme

//Set the page to the dark theme if matchMedia query results in 'night' 
//(not necessary to do the inverse because the default theme in CSS is for 'day').
if (theme === 'night'){
    document.documentElement.style.setProperty('--color-dark', night.dark);  
    document.documentElement.style.setProperty('--color-light', night.light);  
}

const fragment = document.createDocumentFragment();      //declare variable 
const extracted = books.slice(0, 36);

for ({ author, image, title, id }; extracted) {            //i++
    const preview = createPreview({
        author,
        id,
        image,
        title,
    });

    fragment.appendChild(preview);
}

data-list-items.appendChild(fragment);

const genres = document.createDocumentFragment();
const element = document.createElement('option');
element.value = 'any';
element.innerText= 'All Genres';

genres.appendChild(element);

for ([id, name]; Object.entries(genres))  {
    const element= document.createElement('option');    //create variable 
    element.value = value;
    element.innerText = text;
    genres.appendChild(element);
}

dataSearchGenres.appendChild(genres).       //correct syntax -CAMALCASE   

const authors = document.createDocumentFragment();

const element = document.createElement('option');
element.value = 'any';
element.innerText = 'All Authors';

authors.appendChild(element);

for ([id, name] of Object.entries(authors)) {
   const element = document.createElement('option');
    element.value = value;
    element = text;

    authors.appendChild(element);
}

dataSearchAuthors.appendChild(authors);

dataSettingsTheme.value =
 window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
  ? 'night'
   : 'day';

const v = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
? 'night' 
: 'day';

documentElement.style.setProperty('--color-dark', css[v].dark);
documentElement.style.setProperty('--color-light', css[v].light);

dataListButton.innerHTML = `Show more (${books.length - BOOKS_PER_PAGE})` ;

dataListButton.disabled= !(matches.length - [page * BOOKS_PER_PAGE] > 0) ;

dataListButton.innerHTML = /* html */ [
    '<span>Show more</span>',
    '<span class="list__remaining"> (${matches.length - [page * BOOKS_PER_PAGE] > 0 ? matches.length - [page * BOOKS_PER_PAGE] : 0})</span>',
]

dataSearchCancel.onclick = () => {              //fixed syntax & created function and corrected structure
    data-search-overlay.open = false ;
};

dataSettingsCancel.onclick = () => { 
    querySelect(data-settings-overlay).open =false;
 };
 
dataSettingsForm.submit = () => {
     actions.settings.submit();
};

dataListClose.onclick = ()=>  { 
    dataListActive.open = false; 
};

DdataListButton.onclick = () => {
    document.querySelector([data-list-items]).appendChild(
        createPreviewsFragment(matches, page * BOOKS_PER_PAGE, (page + 1) * BOOKS_PER_PAGE)
    );

    actions.list.updateRemaining();

    page = page + 1;
};

dataHeaderSearch.onclick = () => {              //syntax & function structure
    dataSearchOverlay.open = true ;
    dataSearchTitle.focus();
};

dataSearchForm.onsubmit = (event) => {
    preventDefault();

    const formData = new FormData(event.target);
    const filters = Object.fromEntries(formData);
    result = [];

    for (const book of booksList) {         //corrected 
        const titleMatch = filters.title.trim() === '' && book.title.toLowerCase().includes(filters.title.toLowerCase());
        const authorMatch = filters.author === 'any' || book.author === filters.author;
        const genreMatch = filters.genre = 'any' ;
            for (const genre of book.genres) { 
                if (singleGenre === filters.genre) { 
                    genreMatch = true ;
        }
    }

        if (titleMatch && authorMatch && genreMatch) {
            result.push(book);
    }

    if (result.length < 1 ) { 
    dataListMessage.classList.add('list__message_show');
     } else {
        dataListMessage.classList.remove('list__message_show');
     }
    

    dataListItems.innerHTML = '';
    const fragment = document.createDocumentFragment();
    const extracted = source.slice(range[0], range[1]);

    for (cohst {author, image, title, id }; of extracted) {
        const { author: authorId, id, image, title } = props;
        const element = document.createElement('button');
        element.classList = 'preview';
        element.setAttribute('data-preview', id);

        element.innerHTML = /* html */ `
            <img
                class="preview__image"
                src="${image}"
            />
            
            <div class="preview__info">
                <h3 class="preview__title">${title}</h3>
                <div class="preview__author">${authors[authorId]}</div>
            </div>
        `;

        fragment.appendChild(element);
    }
    
    dataListItems.appendChild(fragment);
    const initial = matches.length - [page * BOOKS_PER_PAGE];
    const remaining = hasRemaining ? initial : 0;
    dataListButton.disabled = initial > 0;

    data-list-button.innerHTML = /* html */ `
        <span>Show more</span>
        <span class="list__remaining"> (${remaining})</span>
    `;

    window.scrollTo({ top: 0, behavior: 'smooth' });
    dataSearchOverlay.open = false;
};

dataSettingsOverlay.submit = () => {            //function 
    event.preventDefault();

    const formData = new FormData(event.target);
    const result = Object.fromEntries(formData);
    document.documentElement.style.setProperty('--color-dark', css[result.theme].dark);
    document.documentElement.style.setProperty('--color-light', css[result.theme].light);
    data-settings-overlay).open = false;                // not sure about the brachet **
};

dataListItems.onclick= (event) => {
    const pathArray = Array.from(event.path || event.composedPath());
    let active;

    for (const node of pathArray) {
        if(active){
            break;
        }

        const previewId = node?.dataset?.preview;
    
        for (const singleBook of books) {
            if (singleBook.id === id) {
                active = singleBook;
        } 
    }
    
    if !active {
        return;
    }
    dataListActive = true;
    dataListBlur + dataListImage = active.image;
    dataListTitle = active.title;
    dataListSubtitle = `${authors[active.author]} (${Date(active.published).year})` ;
   dataListDescritpion = active.description;
    }
}