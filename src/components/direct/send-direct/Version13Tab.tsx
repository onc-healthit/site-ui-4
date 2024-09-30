import React from 'react'
import DirectForm, { algorithmProps, certProps } from './DirectForm'
import { SendDirectTabsProps } from './SendDirectTabs'
const certificateDropdown: certProps[] = [
  { value: 'GOOD', label: 'GOOD_CERT' },
  { value: 'GOOD_ECDSA_CERT', label: 'GOOD_ECDSA_CERT' },
  { value: 'INVALID', label: 'INVALID_CERT' },
  { value: 'EXPIRED', label: 'EXPIRED_CERT' },
  { value: 'DIFF', label: 'DIFFERENT_TRUST_ANCHOR' },
  { value: 'AIA', label: 'BAD_AIA' },
  { value: 'WILD_CARD', label: 'WILD_CARD_DOMAIN_CERT' },
  { value: 'EMAIL', label: 'CERT_WITH_EMAIL_ADDRESS' },
  { value: 'LESS_2048', label: 'CERT_LESS_THAN_2048_BITS' },
  { value: 'NO_CRL', label: 'CERT_WITH_NO_CRL' },
  { value: 'NO_NOTBEFORE', label: 'CERT_WITH_NO_NOTBEFORE_ATTR' },
  { value: 'NO_NOTAFTER', label: 'CERT_WITH_NO_NOTAFTER_ATT' },
  { value: 'CERT_3072', label: 'CERT_WITH_3072_BITS' },
  { value: 'CERT_4096', label: 'CERT_WITH_4096_BITS' },
]
const algorithmDropdown: algorithmProps[] = [
  { value: 'sha256', label: 'SHA-256' },
  { value: 'sha384', label: 'SHA-384' },
  { value: 'sha512', label: 'SHA-512' },
  {
    value: 'OAEP-RSA',
    label: 'Optimal Asymmetric Encryption Padding (OAEP) for RSA encryption and decryption',
  },
  { value: 'edsap256', label: 'ECDSA with P-256' },
  { value: 'edsasha256', label: 'ECDSA with SHA-256' },
  { value: 'edsap384', label: 'ECDSA with P-384' },
  { value: 'edsasha384', label: 'ECDSA with SHA-384' },
  { value: 'aescbc', label: 'AES with CBC' },
  { value: 'aesgcm', label: 'AES with GCM' },
]

const Version13 = ({ domainName }: SendDirectTabsProps) => {
  return (
    <DirectForm
      version={'v13'}
      certificateDropdown={certificateDropdown}
      algorithmDropdown={algorithmDropdown}
      domainName={domainName}
    />
  )
}

export default Version13
