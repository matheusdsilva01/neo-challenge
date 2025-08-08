'use client'
import { selectTotalItems } from '@/lib/redux/features/cart/cartSlice'
import { useAppSelector } from '@/lib/redux/hooks'
import Link from 'next/link'
import styled from 'styled-components'

export const Header = () => {
	const totalItems = useAppSelector(selectTotalItems)
  return (
    <HeaderComp>
			<NavWrapper>
				<NavLink href="/">Marvel Shop</NavLink>
				<Nav>
					<NavLink href="/">
						Comics
					</NavLink>
					<NavLink href="/cart">
						Cart
						{totalItems > 0 && <CartBadge >{totalItems}</CartBadge>}
					</NavLink>
				</Nav>
			</NavWrapper>
    </HeaderComp>
  )
}

const HeaderComp = styled.header`
	position: sticky;
  top: 0;
  z-index: 50;
  background-color: #111;
  color: #FFFFFF;
  padding: 4px 2px;
  border-bottom: 1px solid #222222;
`

const NavWrapper = styled.section`
	max-width: 1280px;
	margin: 0 auto;
	display: flex;
  align-items: center;
	justify-content: space-between;
`

const Nav = styled.nav`
	display: flex;
  align-items: center;
  gap: 16px;
`

const NavLink = styled(Link)`
  color: #FFFFFF;
  font-weight: 500;
  padding: 8px 10px;
  border-radius: 8px;
  background-color: #1B1B1B;
	transition: all 0.3s ease-in-out;

  &:hover {
    background-color: #FFFFFF;
    color: #1B1B1B;
  }
`

const CartBadge = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 22px;
  height: 22px;
  padding: 0 6px;
  margin-left: 6px;
  border-radius: 999px;
  background: #E11D48;
  color: white;
  font-size: 12px;
`