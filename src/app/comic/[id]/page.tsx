'use client'

import { addItem, decreaseQuantity, increaseQuantity, selectQuantityItemsFromId } from '@/lib/redux/features/cart/cartSlice'
import { useGetComicQuery } from '@/lib/redux/features/marvel/marvelComicsApiSlice'
import { useAppDispatch, useAppSelector } from '@/lib/redux/hooks'
import { buildImage } from '@/util/buildImage'
import { formatCurrency } from '@/util/formatCurrency'
import Image from 'next/image'
import { use } from 'react'
import styled from 'styled-components'
import ComicPageSkeleton from './Skeleton'

type PageProps = {
    params: Promise<{ id: string }>
}

const ComicPage = ({ params }: PageProps) => {
	const { id } = use(params)
  const dispatch = useAppDispatch();
  const { data, isLoading } = useGetComicQuery(id)
  const quantity = useAppSelector((store) => selectQuantityItemsFromId(store, Number(id)))

	if (isLoading || !data) {
    return <ComicPageSkeleton />
	}

  const comic = data.data.results[0]
  const price = comic.prices.find((p) => p.type === 'printPrice')?.price ?? 0

	return (
    <Container>
      <Cover width={550} height={820} src={buildImage(comic.thumbnail, 'portrait_uncanny')} alt={`thumbnail comic: ${comic.title}`} />
      <div>
        <Title>{comic?.title}</Title>
        <Price>{formatCurrency().format(price)}</Price>
        {!!quantity ? (
          <>
            <p>Você tem {quantity} item(s) no carrinho</p>
            <Button onClick={() => dispatch(decreaseQuantity(Number(id)))}>Remover</Button>
            <Button onClick={() => dispatch(increaseQuantity(Number(id)))}>Adicionar</Button>
          </>
        ) : (
          <Button
            onClick={() => dispatch(addItem(comic))}
          >
            Adicionar ao carrinho
          </Button>
        )}
        <SectionTitle>Descrição</SectionTitle>
        <Text>{comic?.description || 'Descrição não disponível.'}</Text>
        {comic && comic.creators.items.length > 0 && (
          <>
            <SectionTitle>Criadores</SectionTitle>
            <ul>
              {comic.creators.items.map((cr, idx) => (
                <li key={`${cr.name}-${idx}`}>
                  <strong>{cr.role}:</strong> {cr.name}
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    </Container>
  )
}

const Container = styled.div`
  display: grid;
  gap: 20px;
  grid-template-columns: 1fr;

  @media (min-width: 520px) {
    grid-template-columns: 220px 1fr;
  }
  @media (min-width: 900px) {
    grid-template-columns: 378px 1fr;
  }
`

const Cover = styled(Image)`
  width: 100%;
  max-width: 320px;
  margin: 0 auto;
  min-height: 0;
  aspect-ratio: 2 / 3;
  object-fit: cover;
	height: auto;
  border-radius: 12px;
  object-fit: cover;
  @media (min-width: 520px) {
    margin: 0;
  }
`

const Title = styled.h1`
  font-weight: 800;
  font-size: 1.5rem;
`

const Price = styled.div`
  color: #16a34a;
  font-weight: 700;
  margin-bottom: 12px;
  font-size: 1.125rem;
`

const Button = styled.button`
  padding: 10px 14px;
  border-radius: 10px;
  border: 1px solid #E5E5E5;
  background-color: #111827;
  color: #FFFFFF;
  font-weight: 600;
  cursor: pointer;
	transition: all 0.3s ease-in-out;

  &:hover {
    border-color: #FFFFFF;
		background-color: #E5E5E5;
		color: #111827;
  }
`

const SectionTitle = styled.h2`
  font-size: 1rem;
  margin: 18px 0 8px 0;
`

const Text = styled.p`
  color: #444444;
`

export default ComicPage