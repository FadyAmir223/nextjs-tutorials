import { Metadata } from 'next'

type ProductProps = {
  params: { productId: string }
}

export const generateMetadata = async ({
  params,
}: ProductProps): Promise<Metadata> => {
  const title = await new Promise((resolve) => {
    setTimeout(() => {
      resolve(`product ${params.productId}`)
    }, 100)
  })

  return { title: { absolute: title as string } }
}

const Product = ({ params }: ProductProps) => {
  return <div>Product - {params.productId}</div>
}

export default Product
