'use client'
import { ReactNode } from 'react'
import styled from 'styled-components'

type RootLayoutProps = {
  children: ReactNode
}

export const RootLayout = ({ children }: RootLayoutProps) => {
  return (
    <Container>
      {children}
    </Container>
  )
}

const Container = styled.div`
    max-width: 1280px;
    margin: 0 auto;
    padding: 0 8px;
`