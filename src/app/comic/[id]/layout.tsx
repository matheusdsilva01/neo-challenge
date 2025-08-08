'use client'
import { RootLayout } from '@/layouts/RootLayout'
import Link from 'next/link'
import { ReactNode } from 'react'
import styled from 'styled-components'

type LayoutComicDetailProps = {
  children: ReactNode
}

const LayoutComicDetail = ({ children }: LayoutComicDetailProps) => {
	return (
		<RootLayout>
			<Back href="/comics">← Voltar</Back>
			{children}
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
export default LayoutComicDetail