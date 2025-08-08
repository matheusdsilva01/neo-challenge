import { Comic } from '@/model/marvel/Comic'
import { buildImage } from '@/util/buildImage'
import Image from 'next/image'
import Link from 'next/link'
import styled from 'styled-components'

type CardComicProps = {
	comic: Comic
}

export const CardComic = ({ comic }: CardComicProps) => {
  return (
    <Card href={`/comic/${comic.id}`}>
      <Img width={550} height={820} src={buildImage(comic.thumbnail, 'portrait_uncanny')} alt={`thumbnail quadrilho ${comic.title} `} />
      <Content>
        <p>{comic.title}</p>
      </Content>
		</Card>
  )
}

const Card = styled(Link)`
    border-radius: 8px;
    width: fit-content;
    position: relative;
    overflow: hidden;
    border: 1px #0F0F0F solid;
`

const Img = styled(Image)`
    max-width: 165px;
    height: auto;
    aspect-ratio: 2 / 3;
    object-fit: cover;
    display: block;
`

const Content = styled.section`
    position: absolute;
    padding: 4px 6px;
    background-color: #0C0C0C90;
    color: #FFFFFF;
    left: 0;
    bottom: 0;
    width: 100%;
    font-size: 1rem;
    overflow: hidden;
    max-height: calc(2em + 8px);
    transition: all 0.3s ease-in-out;
    p {
      overflow: hidden;
      -webkit-line-clamp: 2;
      display: -webkit-box;
      -webkit-box-orient: vertical;
    }
    &:hover {
      max-height: 500px;
      p  {
        -webkit-line-clamp: unset;
      }
    }
`