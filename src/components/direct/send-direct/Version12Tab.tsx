import DirectForm, { algorithmProps, certProps } from './DirectForm'

const certificateDropdownV12: certProps[] = [
  { value: 'GOOD', label: 'GOOD_CERT' },
  { value: 'INVALID', label: 'INVALID_CERT' },
  { value: 'EXPIRED', label: 'EXPIRED_CERT' },
  { value: 'DIFF', label: 'DIFFERENT_TRUST_ANCHOR' },
  { value: 'AIA', label: 'BAD_AIA' },
]

const algorithmDropdownV12: algorithmProps[] = [
  { value: 'sha1', label: 'SHA-1' },
  { value: 'sha256', label: 'SHA-256' },
]
const Version12 = () => {
  return (
    <DirectForm version={'v12'} certificateDropdown={certificateDropdownV12} algorithmDropdown={algorithmDropdownV12} />
  )
}

export default Version12
