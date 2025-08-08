export function formatCurrency(options?: Intl.NumberFormatOptions) {
  return new Intl.NumberFormat(
    'pt-BR',
    options ?? {
      style: 'currency',
      currency: 'BRL',
    },
  )
}
