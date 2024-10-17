import SendForm from './SendForm'

interface TemplateProps {
  sampleCCDAFiles: string[]
}
const Template = ({ sampleCCDAFiles }: TemplateProps) => {
  return <SendForm version={'template'} sampleCCDAFiles={sampleCCDAFiles} />
}

export default Template
