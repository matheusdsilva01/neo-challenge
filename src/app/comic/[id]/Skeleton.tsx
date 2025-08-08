import { RootLayout } from '@/layouts/RootLayout';
import styled, { keyframes } from 'styled-components';

const ComicPageSkeleton = () => (
	<RootLayout>
		<SkeletonContainer>
			<div>
			<SkeletonImage />
			</div>
			<div>
			<SkeletonTitle />
			<SkeletonPrice />
			<SkeletonButton />
			<SkeletonList>
					<li />
					<li />
					<li />
			</SkeletonList>
			</div>
		</SkeletonContainer>
	</RootLayout>
);

const pulse = keyframes`
  0% { opacity: 75%; }
  50% { opacity: 100%; }
  100% { opacity: 75%; }
`;

const gradient = 'linear-gradient(to right, #E5E5E5, #C7C7C7)';

const SkeletonContainer = styled.div`
  display: grid;
  gap: 20px;
  grid-template-columns: 1fr;

  @media (min-width: 520px) {
    grid-template-columns: 220px 1fr;
  }
  @media (min-width: 900px) {
    grid-template-columns: 378px 1fr;
  }
`;

const SkeletonImage = styled.div`
  width: 100%;
  max-width: 320px;
  margin: 0 auto;
  height: 480px;
  border-radius: 12px;
  background-image: ${gradient};
  animation: ${pulse} 2s infinite;
	@media (min-width: 520px) {
    margin: 0;
  }
`;

const SkeletonTitle = styled.div`
	width: 100%;
  max-width: 600px;
  height: 36px;
  margin-bottom: 16px;
  border-radius: 8px;
  background-image: ${gradient};
  animation: ${pulse} 2s infinite;
`;

const SkeletonPrice = styled.div`
	width: 100%;
  max-width: 260px;
  height: 24px;
  margin-bottom: 12px;
  border-radius: 8px;
  background-image: ${gradient};
  animation: ${pulse} 2s infinite;
`;

const SkeletonButton = styled.div`
  width: 160px;
  height: 40px;
  border-radius: 10px;
  background: ${gradient};
  animation: ${pulse} 2s infinite;
  margin-bottom: 16px;
`;

const SkeletonList = styled.ul`
  margin-top: 18px;
  li {
		width: 100%;
    max-width: 518px;
    height: 18px;
    border-radius: 6px;
    background-image: ${gradient};
    animation: ${pulse} 2s infinite;
    margin-bottom: 8px;
  }
`;

export default ComicPageSkeleton;
