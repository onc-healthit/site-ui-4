import Image from 'next/image'

export default function Home() {
  return (
    <Image
      src="/healthit-gov-logo-temp.png"
      alt="healthit.gov logo"
      width={281}
      height={109}
      priority
    />
  )
}
