import { Comic, MarvelApiResponse } from '@/model/marvel/Comic';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const marvelApiSlice = createApi({
  baseQuery: fetchBaseQuery({ baseUrl:
    'https://gateway.marvel.com/v1/public/comics',
	cache: 'force-cache',
  }),
  reducerPath: 'comicsApi',
  tagTypes: ['comics'],
  endpoints: (build) => ({
    getComics: build.query<MarvelApiResponse<Comic[]>, number>({
			query: (offset: number) => {
				const searchParams = new URLSearchParams()
				const apikeypublic = process.env.NEXT_PUBLIC_MARVEL_PUBLIC_API_KEY as string
				searchParams.append('apikey', apikeypublic as string)
				searchParams.append('limit', '25')
				searchParams.append('offset', offset.toString())
				searchParams.append('orderBy', '-onsaleDate')
				return '?' + searchParams.toString()
			},
		}),
    getComic: build.query<MarvelApiResponse<Comic[]>, string>({
			query: (comicId: string) => {
				const searchParams = new URLSearchParams()
				const apikeypublic = process.env.NEXT_PUBLIC_MARVEL_PUBLIC_API_KEY as string
				searchParams.append('apikey', apikeypublic as string)
				return `${comicId}?${searchParams.toString()}`
			},
		}),
  }),
});

export const { useGetComicsQuery, useGetComicQuery } = marvelApiSlice;
