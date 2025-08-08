'use client'

import { RootLayout } from '@/layouts/RootLayout'
import { useGetComicQuery } from '@/lib/redux/features/marvel/marvelComicsApiSlice'
import { buildImage } from '@/util/buildImage'
import { formatCurrency } from '@/util/formatCurrency'
import Image from 'next/image'
import Link from 'next/link'
import { use } from 'react'
import styled from 'styled-components'

type PageProps = {
    params: Promise<{ id: string }>
}

const ComicPage = ({ params }: PageProps) => {
	const { id } = use(params)
	const { data, isLoading } = useGetComicQuery(id)

	if (isLoading || !data) {
    return 'loading'
	}

  const comic = data.data.results[0]
  const price = comic.prices.find((p) => p.type === 'printPrice')?.price ?? 0

	return (
    <RootLayout>
      <Back href="/comics">← Voltar</Back>
      <Container>
        <div>
          <Cover width={550} height={820} src={buildImage(comic.thumbnail)} alt={`thumbnail comic: ${comic.title}`} />
        </div>
        <div>
          <Title>{comic?.title}</Title>
          <Price>{formatCurrency().format(price)}</Price>
					<Button>
						Adicionar ao carrinho
					</Button>
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
    </RootLayout>
  )
}

const Back = styled(Link)`
  display: block;
  margin-bottom: 12px;
  color: #6b7280;

  &:hover {
    color: #111827;
  }
`

const Container = styled.div`
  display: grid;
  gap: 20px;
  grid-template-columns: 1fr;

  @media (min-width: 420px) {
    grid-template-columns: minmax(265px, 318px) 1fr;
  }
  @media (min-width: 900px) {
    grid-template-columns: 378px 1fr;
  }
`

const Cover = styled(Image)`
  width: 100%;
	min-width: 265px;
	height: 100%;
  border-radius: 12px;
  object-fit: cover;
`

const Title = styled.h1`
  font-weight: 800;
  font-size: 28px;
`

const Price = styled.div`
  color: #16a34a;
  font-weight: 700;
  margin-bottom: 12px;
  font-size: 18px;
`

const Button = styled.button`
  padding: 10px 14px;
  border-radius: 10px;
  border: 1px solid #E5E5E5;
  background-color: #111827;
  color: #FFFFFF;
  font-weight: 700;
  cursor: pointer;
	transition: all 0.3s ease-in-out;

  &:hover {
    border-color: #FFFFFF;
		background-color: #E5E5E5;
		color: #111827;
  }
`

const SectionTitle = styled.h2`
  font-size: 16px;
  margin: 18px 0 8px 0;
`

const Text = styled.p`
  color: #444444;
`

export default ComicPage