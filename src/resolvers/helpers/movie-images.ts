import {
  ImageOrientation,
  LogoImage,
  Maybe,
  MovieBackgroundImage,
  PosterImage,
} from 'types/generated';

import { ParentMovieImages } from 'types/mappers';
import { filterImagesByLanguage } from 'resolvers/helpers/images';

export async function getMovieLogos(
  dataSources: any,
  parent: ParentMovieImages,
  limit?: Maybe<number>,
): Promise<LogoImage[]> {
  const logos: LogoImage[] = await dataSources.fanartApi.getMovieLogos(
    parent.tmdbId,
  );
  const filteredLogos = filterImagesByLanguage<LogoImage>(
    logos,
    parent.language,
    parent.fallbackLanguage,
  );
  if (limit) {
    return filteredLogos.slice(0, limit);
  }
  return filteredLogos;
}

export async function getMoviePosters(
  dataSources: any,
  parent: ParentMovieImages,
  orientation: ImageOrientation,
  limit?: Maybe<number>,
): Promise<PosterImage[]> {
  let allPosters: PosterImage[] = await dataSources.fanartApi.getMoviePosters(
    parent.tmdbId,
    orientation,
  );
  if (allPosters.length === 0) {
    allPosters = await dataSources.tmdbApi.getMoviePosters(
      parent.tmdbId,
      orientation,
    );
  }
  const filteredPosters = filterImagesByLanguage<PosterImage>(
    allPosters,
    parent.language,
    parent.fallbackLanguage,
  );
  if (limit) {
    return filteredPosters.slice(0, limit);
  }
  return filteredPosters;
}

export async function getMovieBackgrounds(
  dataSources: any,
  parent: ParentMovieImages,
  orientation: ImageOrientation,
  limit?: Maybe<number>,
): Promise<MovieBackgroundImage[]> {
  let backgrounds: MovieBackgroundImage[] = await dataSources.fanartApi.getMovieBackgrounds(
    parent.tmdbId,
    orientation,
  );
  if (backgrounds.length === 0) {
    backgrounds = await dataSources.tmdbApi.getMovieBackgrounds(
      parent.tmdbId,
      orientation,
    );
  }
  if (limit) {
    return backgrounds.slice(0, limit);
  }
  return backgrounds;
}
