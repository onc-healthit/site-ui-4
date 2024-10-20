import ValidationHome from '@/components/direct/send-direct/message-status/validation-report/ValidationHome'

const ValidationReport = ({ params }: { params: { category: string; messageId: string } }) => {
  return <ValidationHome messageId={params.messageId} category={params.category} />
}

export default ValidationReport
