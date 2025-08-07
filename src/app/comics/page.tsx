'use client'
import { ComicList } from '@/components/ComicList';
import { RootLayout } from '@/layouts/RootLayout';
import styled from 'styled-components';

const Home = () => {
  return (
    <RootLayout>
      <Title>Marvel Comics</Title>
      <ComicList />
    </RootLayout>
  );
};

const Title = styled.h1`
  font-size: 24px;
`;

export default Home;
