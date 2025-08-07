import styled from 'styled-components';
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';

const NavContainer = styled.nav`
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 1280px;
  margin: 16px auto;
  padding: 0 16px;
`;

const baseButtonStyles = `
  position: relative;
  display: inline-flex;
  align-items: center;
  padding: 8px 16px;
  font-size: 14px;
  font-weight: 500;
  line-height: 20px;
  border-radius: 6px;
  border: 1px solid #d1d5db;
  background-color: #ffffff;
  color: #4b5563;
  transition: all 0.15s ease-in-out;

  &:hover {
    color: #6b7280;
  }

  &:focus {
    outline: none;
    z-index: 10;
    box-shadow: 0 0 0 3px rgba(199, 210, 254, 0.5);
    border-color: #93c5fd;
  }

  &:active {
    background-color: #f3f4f6;
    color: #4b5563;
  }

  .dark & {
    background-color: #1f2937;
    border-color: #4b5563;
    color: #d1d5db;
    
    &:hover {
      color: #9ca3af;
    }

    &:active {
      background-color: #374151;
      color: #d1d5db;
    }

    &:focus {
      border-color: #3b82f6;
    }
  }
`;

const NavLink = styled.button`
  ${baseButtonStyles}
`;

const NavSpan = styled.span`
  ${baseButtonStyles}
  cursor: default;
  color: #9ca3af;

  .dark & {
    color: #6b7280;
  }
`;

// Estilos para o grupo de botões de desktop
const PageGroupContainer = styled.span`
  position: relative;
  z-index: 0;
  display: inline-flex;
  border-radius: 6px;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
`;

const PageLink = styled.button<{ active?: string }>`
  ${baseButtonStyles}
  padding: 8px 16px;
  margin-left: -1px;
  border-radius: 0;
  
  &:first-of-type {
    border-top-left-radius: 6px;
    border-bottom-left-radius: 6px;
    margin-left: 0;
  }
  
  &:last-of-type {
    border-top-right-radius: 6px;
    border-bottom-right-radius: 6px;
  }

 
  ${(props) =>
    props.active === 'true' &&
    `
    z-index: 10;
    color: #ffffff;
    background-color: #2563eb;
    border-color: #2563eb;
    
    &:hover {
      color: #ffffff;
    }

    .dark & {
      background-color: #1d4ed8;
      border-color: #1d4ed8;
      
      &:hover {
        color: #ffffff;
      }
    }
  `}

 
  &.nav-icon {
    padding: 8px;
    &:first-of-type {
      border-radius: 6px 0 0 6px;
    }
    &:last-of-type {
      border-radius: 0 6px 6px 0;
    }
  }
`;

const PageEllipsis = styled.span`
  ${baseButtonStyles}
  padding: 8px 16px;
  margin-left: -1px;
  cursor: default;
  color: #4b5563;
  border-radius: 0;

  .dark & {
    color: #d1d5db;
  }
`;

const InfoText = styled.p`
  font-size: 14px;
  line-height: 20px;
  color: #4b5563;

  .dark & {
    color: #9ca3af;
  }
`;

const InfoNumber = styled.span`
  font-weight: 500;
`;

const MobileView = styled.div`
  display: flex;
  justify-content: space-between;
  flex: 1;
  
  @media (min-width: 640px) {
    display: none;
  }
`;

const DesktopView = styled.div`
  display: none;
  
  @media (min-width: 640px) {
    display: flex;
    flex: 1;
    align-items: center;
    justify-content: space-between;
  }
`;


interface PaginationProps {
  page: number;
  totalPages: number | undefined;
  onChangePage: (page: number) => void
  disabled: boolean
}

export const Pagination = ({ page, totalPages, onChangePage, disabled }: PaginationProps) => {
  const isFirstPage = page === 1;
  const hasMorePages = totalPages && page < totalPages;

  const generatePageNumbers = () => {
    if (!totalPages) return [];

    const pages = [];
    const showPages = 5; // Número de páginas para mostrar

    let startPage = Math.max(1, page - Math.floor(showPages / 2));
    let endPage = Math.min(totalPages, startPage + showPages - 1);

    // Ajusta o início se estivermos no final
    if (endPage - startPage < showPages - 1) {
      startPage = Math.max(1, endPage - showPages + 1);
    }

    // Adiciona "..." no início se necessário
    if (startPage > 1) {
      pages.push(1);
      if (startPage > 2) {
        pages.push('...');
      }
    }

    // Adiciona as páginas do meio
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    // Adiciona "..." no final se necessário
    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        pages.push('...');
      }
      pages.push(totalPages);
    }

    return pages;
  };

  const pageNumbers = generatePageNumbers();

  return (
    <NavContainer
      role="navigation"
      aria-label="Navegação de Paginação"
    >
      {/* Mobile view */}
      <MobileView>
        {isFirstPage ? (
          <NavSpan>Anterior</NavSpan>
        ) : (
          <NavLink
            onClick={() => onChangePage(page - 1)}
          >
            Anterior
          </NavLink>
        )}

        {hasMorePages ? (
          <NavLink
            onClick={() => onChangePage(page + 1)}
          >
            Próximo
          </NavLink>
        ) : (
          <NavSpan>Próximo</NavSpan>
        )}
      </MobileView>

      {/* Desktop view */}
      <DesktopView>
        <div>
          <InfoText>
            Mostrando página <InfoNumber>{page}</InfoNumber> de{' '}
            <InfoNumber>{totalPages || 0}</InfoNumber>
          </InfoText>
        </div>

        <div>
          <PageGroupContainer>
            {/* Previous Page Link */}
            {isFirstPage ? (
              <span aria-disabled="true" aria-label="Página anterior">
                <NavSpan className="nav-icon">
                  <ChevronLeftIcon className="w-5 h-5" />
                </NavSpan>
              </span>
            ) : (
              <PageLink
                disabled={disabled}
                onClick={() => onChangePage(page - 1)}
                className="nav-icon"
                aria-label="Página anterior"
              >
                <ChevronLeftIcon className="w-5 h-5" />
              </PageLink>
            )}

            {/* Page Numbers */}
            {pageNumbers.map((pageNum, index) => {
              if (pageNum === '...' || typeof pageNum === 'string') {
                return (
                  <PageEllipsis key={`dots-${index}`}>
                    ...
                  </PageEllipsis>
                );
              }

              const isCurrentPage = pageNum === page;

              return (
                <PageLink
                  key={pageNum}
                  disabled={disabled}
                  onClick={() => onChangePage(pageNum)}
                  active={String(isCurrentPage)}
                  aria-current={isCurrentPage ? 'page' : undefined}
                  aria-label={`Ir para página ${pageNum}`}
                >
                  {pageNum}
                </PageLink>
              );
            })}

            {/* Next Page Link */}
            {hasMorePages ? (
              <PageLink
                onClick={() => onChangePage(page + 1)}
                disabled={disabled}
                className="nav-icon"
                aria-label="Próxima página"
              >
                <ChevronRightIcon className="w-5 h-5" />
              </PageLink>
            ) : (
              <span aria-disabled="true" aria-label="Próxima página">
                <NavSpan className="nav-icon">
                  <ChevronRightIcon className="w-5 h-5" />
                </NavSpan>
              </span>
            )}
          </PageGroupContainer>
        </div>
      </DesktopView>
    </NavContainer>
  );
};
