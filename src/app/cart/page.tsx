'use client'
import { RootLayout } from '@/layouts/RootLayout'
import { clearCart, decreaseQuantity, increaseQuantity, removeItem, selectCartItems, selectTotalPrice } from '@/lib/redux/features/cart/cartSlice'
import { useAppDispatch, useAppSelector } from '@/lib/redux/hooks'
import { buildImage } from '@/util/buildImage'
import { formatCurrency } from '@/util/formatCurrency'
import { Trash } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import styled from 'styled-components'

const CartPage = () => {
	const items = useAppSelector(selectCartItems)
	const dispatch = useAppDispatch();
	const totalPrice = useAppSelector(selectTotalPrice)

	function handleCheckout() {
		if (!items.length) return 
		alert('Compra realizada')
		dispatch(clearCart())
	}

	return (
    <RootLayout>
			<H1>Seu Carrinho</H1>
			<List>
				{items.map((item) => (
					<Row key={item.id}>
						<Link href={`/comic/${item.id}`}>
							<ItemCell>
									<Img
										src={buildImage(item.thumbnail)}
										alt={`Thumbnail image comic: ${item.title}`}
										width={64}
										height={64}
										/>
									<div>
										<p>{item.title}</p>
										<UnitPrice>{formatCurrency().format(item.prices.find(el => el.type === 'printPrice')?.price || 0)}</UnitPrice>
									</div>
							</ItemCell>
						</Link>
						<ItemCell>
							<Controls>
								<Btn onClick={() => dispatch(decreaseQuantity(item.id))}>−</Btn>
								<Strong>{item.quantity}</Strong>
								<Btn onClick={() => dispatch(increaseQuantity(item.id))}>+</Btn>
							</Controls>
							<h4>
								{formatCurrency().format((item.prices.find(el => el.type === 'printPrice')?.price || 0) * item.quantity)}
							</h4>
							<div>
								<Btn disabled={!items.length} onClick={() => handleCheckout()}>
									<Trash size={16} />
								</Btn>
							</div>
						</ItemCell>
					</Row>
				))}
				<Footer>
					<Btn onClick={() => dispatch(clearCart())}>Limpar carrinho</Btn>
					<h3>Total: {formatCurrency().format(totalPrice)}</h3>
					<Checkout onClick={() => handleCheckout()}>Comprar</Checkout>
				</Footer>
			</List>
		</RootLayout>
  )
}

const H1 = styled.h1`
  font-size: 28px;
	margin: 16px 0 8px;
`

const List = styled.div`
  border: 1px solid #E5E5E5;
  border-radius: 4px;
  overflow: hidden;
  background: white;
`

const Row = styled.div`
  display: flex;
	justify-content: space-between;
	gap: 12px;
  align-items: center;
  padding: 12px;

  &:not(:last-child) {
    border-bottom: 1px solid #eee;
  }

  @media (max-width: 640px) {
    grid-template-columns: 1fr auto;
    grid-auto-rows: auto;
    row-gap: 8px;
  }
`

const ItemCell = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
`

const Img = styled(Image)`
	width: 64px;
	height: 64px;
	object-fit: cover;
	border-radius: 8px;
	border: 1px solid #E5E5E5;
`

const UnitPrice = styled.div`
  color: #16A34A;
  font-weight: 600;
  font-size: 16px;
`

const Controls = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`

const Btn = styled.button`
  padding: 6px 10px;
  border-radius: 8px;
  background: #FFFFFF;
  border: 1px solid #E5E5E5;
  font-weight: 700;
	transition: all 0.3s ease-in-out;

  &:hover {
    background-color: #F4F4F5;
  }
`

const Strong = styled.span`
  font-weight: 800;
`

const Footer = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  justify-content: flex-end;
  padding: 12px;
`

const Checkout = styled.button`
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


export default CartPage