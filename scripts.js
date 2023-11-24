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

if (!books && !Array.isArray(books)) throw new Error('Source required') 
if (!range && range.length != 2) throw new Error('Range must be an array with two numbers')
                                                //corrected structure

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

//Create the preview fragment for a single book.
const createPreview = ({author, id, image, title}) =>
{
    const previewFragment = document.createDocumentFragment()

    const previewElement = document.createElement('button')
    previewElement.classList = 'preview'
    previewElement.setAttribute('data-preview', id)

    previewElement.innerHTML = /* html */ `
        <img
            class="preview__image"
            src="${image}"
        />
        
        <div class="preview__info">
            <h3 class="preview__title">${title}</h3>
            <div class="preview__author">${authors[author]}</div>
        </div>
    `

    previewFragment.appendChild(previewElement)
    return(previewFragment)
}


//Create a page of previews.
//the matches object contains the currently relevant list of books
//the range array contains 2 elements to identify the range within the matches list to display on the page
const createPreviewsFragment= (matches, range) =>                   //create function 
{
const previewPageFragment = document.createDocumentFragment()     //declare variable 
extracted = matches.slice(range[0], range[1])

for ({ author, image, title, id }; of extracted) {            //i++ removed
    const preview = createPreview({
        author,
        id,
        image,
        title,
    })

    previewPageFragment.appendChild(preview)
}
    return previewPageFragment
} 

//Display the first page for the initial, unfiltered list.
dataListItems.innerHTML = ''
range = [page * BOOKS_PER_PAGE, (page + 1) * BOOKS_PER_PAGE]
dataListItems.appendChild(createPreviewsFragment(matches, range))
page = page + 1

//Update the text for the "More" button at the bottom of the book preview list
//to display the number of remaining matches.
//The button is also set to disabled if 0 matches remain.
//Global variables "matches" and "page", together with the constant "BOOKS_PER_PAGE", are used to do the calculation.
const updateRemaining = () =>
{
    const initial = matches.length - (page * BOOKS_PER_PAGE)
    const hasRemaining = initial > 0
    const remaining = hasRemaining ? initial : 0
    dataListButton.disabled = !hasRemaining

    dataListButton.innerHTML = /* html */ `
        <span>Show more</span>
        <span class="list__remaining"> (${remaining})</span>
    `
}

//Set the initial state of the button.
updateRemaining()


const genresFragment = document.createDocumentFragment()
const genresElement = document.createElement('option')
genresElement.value = 'any'
genresElement.text= 'All Genres'

genresFragment.appendChild(genresElement)

for (const [key, value] of Object.entries(genres)) {
    genresElement = document.createElement('option')
    genresElement.value = key
    genresElement.text = value
    genresFragment.appendChild(genresElement)
}
dataSearchGenres.appendChild(genresFragment)
                                                 //correct syntax -CamelCase


//Create the fragment to display the list of Authors in the dropdown
//in the search overlay.
const authorsFragment = document.createDocumentFragment()
let authorsElement = document.createElement('option')
authorsElement.value = 'any'
authorsElement.innerText = 'All Authors'
authorsFragment.appendChild(authorsElement)


for (const [key, value] of Object.entries(authors)) {
    authorsElement = document.createElement('option')
    authorsElement.value = key
    authorsElement.innerText = value
    authorsFragment.appendChild(authorsElement)
}
dataSearchAuthors.appendChild(authorsFragment)

//Added Event Listeners:

dataSearchCancel.addEventListener('click', () => { dataSearchOverlay.close() } )
dataSettingsCancel.addEventListener('click',  () => { dataSettingsOverlay.close() })
dataListClose.addEventListener('click', () => { dataListActive.close() })

dataListButton.addEventListener('click', () => {
    dataListItems.innerHTML = ''
    range = [page * BOOKS_PER_PAGE, (page + 1) * BOOKS_PER_PAGE]
    dataListItems.appendChild(createPreviewsFragment(matches, range))
    page = page + 1
    updateRemaining()
})

dataHeaderSearch.addEventListener('click', () => {
    dataSearchOverlay.showModal();
    dataSearchTitle.focus();
})

dataHeaderSettings.addEventListener('click', () => {
    dataSettingsOverlay.showModal();
    dataSettingsTheme.value = 'day'
    dataSettingsTheme.focus();
})

const handleDataSearchFormSubmit = (event) => {            
    event.preventDefault()
    const formData = new FormData(event.target)
    const filters = Object.fromEntries(formData)
    const result = []
}

//Find book matches to the 3 filters
    for (const book of books) {         //corrected 
        const titleMatch = filters.title.trim() === '' || book.title.toLowerCase().includes(filters.title.toLowerCase())
        const authorMatch = filters.author === 'any' || book.author === filters.author
        let genreMatch = filters.genre = 'any' ;
            
        if(!genreMatch)
        {
            for (const singleGenre of book.genres) 
            { 
                if (singleGenre === filters.genre) genreMatch = true
            }
        }
        if ( titleMatch && authorMatch && genreMatch ) result.push(book)
    }

    matches = result
    matches.length < 1 ? dataListMessage.classList.add('list__message_show') : dataListMessage.classList.remove('list__message_show') 
    
    //Show message if no matches found.

    //Display the first page of the matches.
    dataListItems.innerHTML = ''
    range = [0, BOOKS_PER_PAGE]
    dataListItems.appendChild(createPreviewsFragment(matches, range))
    page = 1
    updateRemaining()

    window.scrollTo({ top: 0, behavior: 'smooth' });
    dataSearchOverlay.close()


dataSearchForm.addEventListener('submit', handleDataSearchFormSubmit)

const handleSettingsFormSubmit = (event) => {
    event.preventDefault()
    const formData = new FormData(event.target)
    const result = Object.fromEntries(formData)

    //Set the page to the selected theme
    if (result.theme === 'night'){
        document.documentElement.style.setProperty('--color-dark', night.dark)
        document.documentElement.style.setProperty('--color-light', night.light)  
    }
    else{
        document.documentElement.style.setProperty('--color-dark', day.dark)  
        document.documentElement.style.setProperty('--color-light', day.light)
    } 

    dataSettingsOverlay.close()
}
dataSettingsForm.addEventListener('submit', handleSettingsFormSubmit )

const handleDataListItemsClick = (event) => {
    const pathArray = Array.from(event.path || event.composedPath())
    let active = event.target
    let previewId = null

    //Find the Preview ID for the clicked book.
    //It is not necessarily set on the event target itself, but could be on its parent (button) element, 
    //so we need to iterate through pathArray to find the element with the "data-preview" attribute set.
    for (const node of pathArray) {
        const { preview } = node.dataset
        if (preview) {
            previewId = node.dataset.preview
            break
        }
    }
    
    if (!previewId) return

    //Use the previewId to find the details of the clicked book in the master books list.
    for (const singleBook of books) {
        if (singleBook.id === previewId) {
            active = singleBook
            break
        }
    } 

    //Display the details of the clicked book in a modal overlay.
    dataListActive.showModal()
    dataListBlur.src = active.image
    dataListImage.src = active.image
    dataListTitle.innerHTML = active.title
    
    dataListSubTitle.innerHTML = `${authors[active.author]} (${new Date(active.published).getFullYear()})`
    dataListDescription.innerHTML = active.description
}

dataListItems.addEventListener('click', handleDataListItemsClick)
