import { notFound } from 'next/navigation'

type ReviewProps = {
  params: {
    productId: string
    reviewId: string
  }
}

const Review = ({ params }: ReviewProps) => {
  const { productId, reviewId } = params

  return +reviewId > 100 ? (
    notFound()
  ) : (
    <div>
      Review {reviewId} for product {productId}
    </div>
  )
}

export default Review
