import { Metadata } from 'next'

type ReviewsProps = {
  params: { productId: string }
}

export const metadata: Metadata = {
  title: {
    absolute: 'reviews',
  },
}

const Reviews = ({ params }: ReviewsProps) => {
  return <div>Reviews for product {params.productId}</div>
}

export default Reviews
