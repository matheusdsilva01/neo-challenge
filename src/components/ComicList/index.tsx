'use client'

import { useGetComicsQuery } from '@/lib/redux/features/marvel/marvelComicsApiSlice';
import styled from 'styled-components';
import { CardComic } from '@/components/CardComic';
import { Pagination } from '@/components/Pagination';
import { useState } from 'react';
import { Skeleton } from '../CardComic/Skeleton';
import { LoaderCircle } from 'lucide-react';

export const ComicList = () => {
  const offset = 25
  const [page, setPage] = useState(1)
  const { data, isLoading, isFetching } = useGetComicsQuery(offset * (page - 1));
  const totalPages = data ? Math.ceil(data.data.total / data.data.limit) : 1

  return (
    <>
      <Pagination page={page} totalPages={totalPages} onChangePage={(page) => setPage(page)} disabled={isLoading || isFetching} />
      {isFetching && <Loader />}
      <Container>
        {isLoading && new Array(25).fill(1).map((_, i) => (
          <Skeleton key={i} />
        ))}
        {data?.data?.results.map(comic => (
          <CardComic key={comic.id} comic={comic} />
        )
      )}
      </Container>
      {isFetching && <Loader />}
      <Pagination page={page} totalPages={totalPages} onChangePage={(page) => setPage(page)} disabled={isLoading || isFetching} />
    </>
  )
}


const Loader = styled(LoaderCircle)`
  display: flex;
  margin: 4px auto;
  animation: spin 1s linear infinite;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`

const Container = styled.section`
  display: grid;
  place-items: center;
  grid-template-columns: repeat(1, minmax(165px, 1fr));
  gap: 26px;

  @media (min-width: 380px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (min-width: 560px) {
    grid-template-columns: repeat(3, 1fr);
  }
  @media (min-width: 780px) {
    grid-template-columns: repeat(4, 1fr);
  }
  @media (min-width: 980px) {
    grid-template-columns: repeat(5, 1fr);
  }
  @media (min-width: 1200px) {
    grid-template-columns: repeat(6, 1fr);
  }
`