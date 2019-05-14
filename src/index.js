import { buildCustomElementConstructor } from 'lwc';
import SearchBox from 'wc/searchBox';
customElements.define(
    'wc-search-box',
    buildCustomElementConstructor(SearchBox)
);
