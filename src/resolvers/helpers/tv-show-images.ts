import {
  ImageOrientation,
  LogoImage,
  Maybe,
  PosterImage,
  TvShowBackgroundImage,
} from 'types/generated';

import { ParentTvShowImages } from 'types/mappers';
import { filterImagesByLanguage } from 'resolvers/helpers/images';

export async function getTvShowLogos(
  dataSources: any,
  parent: ParentTvShowImages,
  limit?: Maybe<number>,
): Promise<LogoImage[]> {
  if (!parent.tvdbId) {
    return [];
  }
  const logos: LogoImage[] = await dataSources.fanartApi.getTvShowLogos(
    parent.tvdbId,
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

export async function getTvShowPosters(
  dataSources: any,
  parent: ParentTvShowImages,
  orientation: ImageOrientation,
  limit?: Maybe<number>,
): Promise<PosterImage[]> {
  let posters: PosterImage[] = [];
  if (parent.tvdbId) {
    posters = await dataSources.fanartApi.getTvShowPosters(
      parent.tvdbId,
      orientation,
    );
  }
  if (posters.length === 0) {
    posters = await dataSources.tmdbApi.getMoviePosters(
      parent.tmdbId,
      orientation,
    );
  }
  const filteredPosters = filterImagesByLanguage<PosterImage>(
    posters,
    parent.language,
    parent.fallbackLanguage,
  );
  if (limit) {
    return filteredPosters.slice(0, limit);
  }
  return filteredPosters;
}

export async function getTvShowBackgrounds(
  dataSources: any,
  parent: ParentTvShowImages,
  orientation: ImageOrientation,
  limit?: Maybe<number>,
): Promise<TvShowBackgroundImage[]> {
  let backgrounds: TvShowBackgroundImage[] = [];
  if (parent.tvdbId) {
    backgrounds = await dataSources.fanartApi.getTvShowBackgrounds(
      parent.tvdbId,
      orientation,
    );
  }
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
