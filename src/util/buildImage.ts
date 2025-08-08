import { Image } from '@/model/marvel/Comic';

// https://developer.marvel.com/documentation/images
type Variant = 'portrait_uncanny' | 'landscape_incredible' | 'standard_fantastic';

export function buildImage(img: Image, variant?: Variant): string {
    const variantPath = variant ? `/${variant}` : '';
    return `${img.path}${variantPath}.${img.extension}`
}