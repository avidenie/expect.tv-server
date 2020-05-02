import { MovieResolvers } from 'types/generated';

const movieResolvers: MovieResolvers = {
  images: async (parent) => {
    return {
      tmdbId: parent.tmdbId,
      fanartId: parent.tmdbId,
      language: parent.language,
      fallbackLanguage: parent.originalLanguage,
    };
  },

  releaseDates: (parent, args) => {
    if (!args.region || parent.releaseDates.length === 0) {
      return parent.releaseDates;
    }

    let firstReleaseTs = 0;
    let firstReleaseDate = null;
    let usReleaseDate = null;

    for (let i = 0, n = parent.releaseDates.length; i < n; i++) {
      const releaseDate = parent.releaseDates[i];
      if (releaseDate.region === args.region) {
        return [releaseDate];
      } else if (releaseDate.region === 'US') {
        usReleaseDate = releaseDate;
      } else {
        const currentReleaseDate = +new Date(
          releaseDate.results[0].releaseDate,
        );
        if (firstReleaseDate === null) {
          firstReleaseTs = currentReleaseDate;
          firstReleaseDate = releaseDate;
        } else if (currentReleaseDate < firstReleaseTs) {
          firstReleaseTs = currentReleaseDate;
          firstReleaseDate = releaseDate;
        }
      }
    }

    if (usReleaseDate !== null) {
      return [usReleaseDate];
    } else if (firstReleaseDate !== null) {
      return [firstReleaseDate];
    } else {
      return [];
    }
  },
};

export default movieResolvers;
