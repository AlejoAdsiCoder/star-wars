import { LitElement, html, } from 'lit-element';
import { getComponentSharedStyles } from '@bbva-web-components/bbva-core-lit-helpers';
// import styles from './StarWars-styles.js';
import '@training-cells/rick-and-morty-dm/rick-and-morty-dm';
import '@bbva-web-components/bbva-web-card-product/bbva-web-card-product';
import '@training-cells/bbva-web-navigation-pagination/bbva-web-navigation-pagination';
import '@bbva-web-components/bbva-expandable-accordion/bbva-expandable-accordion';
import '@bbva-web-components/bbva-text/bbva-text';
import '@bbva-web-components/bbva-web-list-item-bullet/bbva-web-list-item-bullet';
/**
![LitElement component](https://img.shields.io/badge/litElement-component-blue.svg)

This component ...

Example:

```html
<star-wars></star-wars>
```

##styling-doc

@customElement star-wars
*/
export class StarWars extends LitElement {
  static get is() {
    return 'star-wars';
  }

  // Declare properties
  static get properties() {
    return {
      name: { type: String, },
      characters: {
        type: Array,
      },
      image: {
        type: String,
      },
      pageNext: {
        type: String,
      },
      pagePrevious: {
        type: String,
      },
      count: {
        type: Number,
      },
      host: {
        type: String,
      },
      path: {
        type: String,
      },
      page: {
        type: Number,
      },
      films: {
        type: String,
      },
      details: {
        type: String,
      },
      title: {
        type: String,
      },
      expandable: {
        type: Boolean,
      }
    };
  }

  // Initialize properties
  constructor() {
    super();
    this.host = 'https://swapi.dev';
    this.path = 'api/people';
    this.pathtwo = 'api/films';
    this.method = 'GET';
    this.characters = [];
    this.movies = [];
    this.image = '';
    this.pageNext = '' ;
    this.pagePrevious = '' ;
    this.count = 0;
    this.page = 0;
    this.movie = '';
    this.details = [];
    this.title = '';
    this.expandable = false;
  }

  setCharacters(event) {
    this.characters = event.detail.data.results
    this.count = event.detail.data.count
    // this.pageNext = event.detail.
    console.log(event.detail)
    // this.pageNext = event.detail.data.next
    // this.pagePrevious = event.detail.data.previous
    console.log(this.pageNext)
    //this.characters.map((Character) => console.log(Character.name))
  }

  setMovies(event) {
    let arraynew = [];
    arraynew.push(event.detail.data.title)
    console.log(event.detail.data.title)
    /* this.title = event.detail.data.title; */
    /* let myarray */
    /* console.log("event", event.detail.data.results)
    this.movies.push(event.detail.data.results[0])
    console.log("setMovies", this.movies) */
    

    //console.log(this.detail.data.results.title  )

    //this.movies = event
    //console.log("peliculas", this.movies)
    // this.count = event.detail.data.count
    // // this.pageNext = event.detail.
    // console.log(event.detail)
    // this.pageNext = event.detail.data.next
    // this.pagePrevious = event.detail.data.previous
    // console.log(this.pageNext)
    //this.characters.map((Character) => console.log(Character.name))
  }

  onImg(dataImg) {
    this.image = `https://starwars-visualguide.com/assets/img/characters/${this._getId(dataImg)}.jpg`
    //console.log(this.image)
    
  }

  _getId(url) {
    return url.split('/')[url.split('/').length - 2]
  }

  /* static get styles() {
    return [
      styles,
      getComponentSharedStyles('star-wars-shared-styles')
    ];  
  } */

  nextClick(event) {
    console.log(event.detail)
    this.path = `api/people/?page=${event.detail}`;
   /*  this.page = event.detail */
    console.log("nextclick", this.path)
  }

  _handleResultFilms(films) {
    this.details.push(films)
    console.log("detailfilms", this.details)

    
    //this.details.push = arrayRequest[0]
   // this.details.push(
     // {films: films})
    //console.log("detail: ", this.details[2])
  }

  handlExpandable() {
    this.expandable = !this.expandable;
  }
 
  previousClick(event) {
    console.log(event.detail)
    this.path = `api/people/?page=${event.detail}`;
    /* this.page = event.detail */
  }

  // Define a template
  render() {
    return html`<rick-and-morty-dm @success-response-api="${this.setCharacters}" _host="${this.host}" _method="${this.method}" _path="${this.path}"></rick-and-morty-dm>
    

    ${this.characters.map((Character) => {  
      return html`
      ${this.onImg(Character.url)}
      <bbva-web-card-product heading="${Character.name}" badge-text="${Character.name}" image="${this.image}">
          <div class="horizontal" role="list" slot="options">
            <bbva-web-item-bullet>Genero: ${Character.gender}</bbva-web-item-bullet>
          </div>
            <bbva-expandable-accordion @expandable-accordion-open-change="${this.handlExpandable}" slot="option" row-title="Details" >
            // Hay que pasar esto a un componente
              ${this.expandable ? html`
                ${Character.films.map((film, index) => {
                  return html`
                  <h1>${film}</h1>
                  <rick-and-morty-dm @success-response-api="${this.setMovies}" _host="${film}" _method="${this.method}" _path=""></rick-and-morty-dm>
                  `;
                } )}
              `: ``}
            //
              
            <p>Color de ojos: ${Character.eye_color}</p>
            <p>Año de nacimiento: ${Character.birth_year}</p>
            </bbva-expandable-accordion>
        </bbva-web-card-product>
      
      `})}
    
      <bbva-web-navigation-pagination
        current-page="1"
        pages="42"
        results="42"
        visible-pages="10"
        visible-result="5"
        @next-click="${this.nextClick}"
        @back-click="${this.previousClick}"
      >
      
    `;
  }
}