import TestByCriteriaComponent from '@/components/direct/TestByCriteria'
const TestByCriteria = ({ params }: { params: { slug?: string[] } }) => {
  const criteria = params.slug ? params.slug[0] : ''

  return <TestByCriteriaComponent criteria={criteria} />
}

export default TestByCriteria
