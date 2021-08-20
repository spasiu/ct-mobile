export enum SearchType {
  Breaks = 'Breaks',
  Events = 'EventBreakers',
  Breakers = 'Users', // for our database modeling purposes a breaker is a user
  Hits = 'Hits',
}

export const SEARCH_TYPES = Object.values(SearchType);

export const TEXT_KEY_FOR_SEARCH_TYPE: {
  [key in SearchType]: string;
} = {
  [SearchType.Breaks]: 'search.searchType.breaks',
  [SearchType.Events]: 'search.searchType.events',
  [SearchType.Breakers]: 'search.searchType.breakers',
  [SearchType.Hits]: 'search.searchType.hits',
};
