'use client';
import Head from 'next/head';
import {
  Container,
  Main,
  Title,
  Description,
  CodeTag,
} from '@/components/sharedstyles';
import Cards from '@/components/cards';

export default function Home() {
  return (
    <Container>
      <Head>
        <title>NeoChallenge Marvel</title>
        <meta name="description" content="desafio técnico da empresa NeoApp" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Main>
        <Title>
          Welcome to <a href="https://nextjs.org">Next.js!</a>
        </Title>

        <Description>
          Get started by editing
          <CodeTag>app/page.tsx</CodeTag>
        </Description>

        <Cards />
      </Main>
    </Container>
  );
}
