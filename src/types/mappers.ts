export interface ParentMovieImages {
  tmdbId: number;
  language: string;
  fallbackLanguage: string;
}

export interface ParentTvShowImages {
  tmdbId: number;
  tvdbId?: string | null;
  language: string;
  fallbackLanguage: string;
}
