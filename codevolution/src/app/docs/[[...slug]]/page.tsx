type DocsProps = {
  params: {
    slug: string[]
  }
}

const Docs = ({ params }: DocsProps) => {
  return (
    <div>
      docs:
      {params.slug?.map((i) => (
        <span key={i}> {i}</span>
      ))}
    </div>
  )
}

export default Docs
