const ProductLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      {children}
      <span>similar products...</span>
    </>
  )
}

export default ProductLayout
