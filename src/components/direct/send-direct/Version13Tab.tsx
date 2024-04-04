import React from 'react'
import DirectForm, { algorithmProps, certProps } from './DirectForm'

const certificateDropdown: certProps[] = [
  { value: 'GOOD_CERT', label: 'GOOD_CERT' },
  { value: 'INVALID_CERT', label: 'INVALID_CERT' },
  { value: 'EXPIRED_CERT', label: 'EXPIRED_CERT' },
  { value: 'DIFFERENT_TRUST_ANCHOR', label: 'DIFFERENT_TRUST_ANCHOR' },
  { value: 'BAD_AIA', label: 'BAD_AIA' },
  { value: 'WILD_CARD_DOMAIN_CERT', label: 'WILD_CARD_DOMAIN_CERT' },
  { value: 'CERT_WITH_EMAIL_ADDRESS', label: 'CERT_WITH_EMAIL_ADDRESS' },
  { value: 'CERT_LESS_THAN_2048_BITS', label: 'CERT_LESS_THAN_2048_BITS' },
  { value: 'CERT_WITH_NO_CRL', label: 'CERT_WITH_NO_CRL' },
  { value: 'CERT_WITH_NO_NOTBEFORE_ATTR', label: 'CERT_WITH_NO_NOTBEFORE_ATTR' },
  { value: 'CERT_WITH_NO_NOTAFTER_ATT', label: 'CERT_WITH_NO_NOTAFTER_ATT' },
  { value: 'CERT_WITH_3072_BITS', label: 'CERT_WITH_3072_BITS' },
  { value: 'CERT_WITH_4096_BITS', label: 'CERT_WITH_4096_BITS' },
]
const algorithmDropdown: algorithmProps[] = [
  { value: 'SHA-256', label: 'SHA-256' },
  { value: 'SHA-384', label: 'SHA-384' },
  { value: 'SHA-512', label: 'SHA-512' },
  {
    value: 'Optimal Asymmetric Encryption Padding (OAEP) for RSA encryption and decryption',
    label: 'Optimal Asymmetric Encryption Padding (OAEP) for RSA encryption and decryption',
  },
  { value: 'ECDSA with P-256', label: 'ECDSA with P-256' },
  { value: 'ECDSA with SHA-256', label: 'ECDSA with SHA-256' },
  { value: 'ECDSA with P-384', label: 'ECDSA with P-384' },
  { value: 'ECDSA with SHA-384', label: 'ECDSA with SHA-384' },
  { value: 'AES with CBC', label: 'AES with CBC' },
  { value: 'AES with GCM', label: 'AES with GCM' },
]

const Version13 = () => {
  return <DirectForm version={'v13'} certificateDropdown={certificateDropdown} algorithmDropdown={algorithmDropdown} />
}

export default Version13
