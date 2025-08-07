'use client'

import { useGetComicsQuery } from '@/lib/redux/features/marvel/marvelComicsApiSlice';
import styled from 'styled-components';
import { CardComic } from '@/components/CardComic';
import { Pagination } from '@/components/Pagination';
import { useState } from 'react';

export const ComicList = () => {
  const offset = 25
  const [page, setPage] = useState(1)
  const { data, isLoading, isFetching } = useGetComicsQuery(offset * (page - 1));
  const totalPages = data ? Math.ceil(data.data.total / data.data.limit) : 1

  return (
    <>
      <Pagination page={page} totalPages={totalPages} onChangePage={(page) => setPage(page)} disabled={isLoading || isFetching} />
      <Container>
        {data?.data?.results.map(comic => (
          <CardComic key={comic.id} comic={comic} />
        )
      )}
      </Container>
      <Pagination page={page} totalPages={totalPages} onChangePage={(page) => setPage(page)} disabled={isLoading || isFetching} />
    </>
  )
}

const Container = styled.section`
  display: flex;
  flex-wrap: wrap;
  column-gap: 46px;
  row-gap: 26px;
`