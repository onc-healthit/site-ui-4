import TestByCriteriaComponent from '@/components/direct/test-by-criteria/TestByCriteria'
const TestByCriteria = ({ params }: { params: { slug?: string[] } }) => {
  const criteriaTab = params.slug ? params.slug[0] : ''

  return <TestByCriteriaComponent selectedTab={criteriaTab} />
}

export default TestByCriteria
