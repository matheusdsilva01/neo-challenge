import { Comic } from '@/model/marvel/Comic'
import Image from 'next/image'
import Link from 'next/link'
import styled from 'styled-components'

type CardComicProps = {
	comic: Comic
}

export const CardComic = ({ comic }: CardComicProps) => {
  return (
			<Card href={`/comic/${comic.id}`}>
				<Img width={550} height={820} src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`} alt={`thumbnail quadrilho ${comic.title} `} />
				<Content>
						<p>{comic.title}</p>
				</Content>
		</Card>
  )
}

const Card = styled(Link)`
    border-radius: 8px;
    position: relative;
    overflow: hidden;
    border: 1px #0F0F0F solid;
`

const Img = styled(Image)`
    max-width: 165px;
    max-height: 246px;
    display: block;
		height: 100%;
`

const Content = styled.section`
    position: absolute;
    padding: 4px 6px;
    background-color: #0C0C0C90;
    color: #FFFFFF;
    left: 0;
    bottom: 0;
    width: 100%;
`