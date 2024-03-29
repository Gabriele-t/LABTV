export class SimpleMovie {
  adult: boolean = false;
  backdrop_path: string = '';
  genre_ids: number[] = [];
  id: number = 0;
  original_language: string = '';
  original_title: string = '';
  overview: string = '';
  popularity: number = 0;
  poster_path: string = '';
  release_date: string = '';
  title: string = '';
  video: boolean = false;
  vote_average: number = 0;
  vote_count: number = 0;
  genre: string = '';
}

export class MovieList {
  page: number = 0;
  results: SimpleMovie[] = [];
  total_pages: number = 0;
  total_results: number = 0;
}

export type DetailedMovie = {
  adult: boolean;
  backdrop_path: string;
  belongs_to_collection: null | any;
  budget: number;
  genres: Genre[];
  homepage: string;
  id: number;
  imdb_id: string;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: ProductionCompany[];
  production_countries: ProductionCountry[];
  release_date: string;
  revenue: number;
  runtime: number;
  spoken_languages: SpokenLanguage[];
  status: string;
  tagline: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
};

export type Genre = {
  id: number;
  name: string;
};

export type ProductionCompany = {
  id: number;
  logo_path: string | null;
  name: string;
  origin_country: string;
};

export type ProductionCountry = {
  iso_3166_1: string;
  name: string;
};

export type SpokenLanguage = {
  english_name: string;
  iso_639_1: string;
  name: string;
};

export type VideoResponse = {
  id: number;
  results: Video[];
}

export class Video {
  iso_639_1: string = '';
  iso_3166_1: string = '';
  name: string = '';
  key: string = '';
  site: string = '';
  size: number = 0;
  type: string = '';
  official: boolean = false;
  published_at: string = '';
  id: string = '';
}