import Image from 'next/image'

export default function Home() {
  return (
    <main>
      <Image
        src="/test.svg"
        alt="Next.js"
        width={100}
        height={24}
        priority
      />
    </main>
  )
}
