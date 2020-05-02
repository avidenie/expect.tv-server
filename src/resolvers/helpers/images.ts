import { LogoImage, PosterImage } from 'types/generated';

type LanguageImage = LogoImage | PosterImage;

export function filterImagesByLanguage<T extends LanguageImage>(
  sourceImages: T[],
  language: string,
  fallbackLanguage: string,
): T[] {
  let images = sourceImages.filter((image) => image.lang === language);
  if (images.length === 0) {
    images = sourceImages.filter((image) => image.lang === fallbackLanguage);
  }
  if (images.length === 0 && language !== 'en' && fallbackLanguage !== 'en') {
    images = sourceImages.filter((image) => image.lang === 'en');
  }
  return images;
}
