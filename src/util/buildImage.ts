import { Image } from '@/model/marvel/Comic';

export function buildImage(img: Image): string {
    const defaultVariant = 'portrait_incredible';
    return `${img.path}/${defaultVariant}.${img.extension}`
}