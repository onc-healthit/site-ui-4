import Image from 'next/image'

export default function Home() {
  return (
    <>
      <Image
        src="/healthit-gov-logo-temp.png"
        alt="healthit.gov logo"
        width={281}
        height={109}
        priority
      />

      <h1>Welcome to the ONC SITE The hub for testing tools & resources</h1>
      <h2>The hub for testing tools & resources</h2>
      <p>The Standards Implementation & Testing Environment (SITE) is a centralized collection
        of testing tools and resources designed to assist health IT developers and health IT users
        fully evaluating specific technical standards and maximizing the potential of their health
        IT implementations. SITE is organized in a collection of sandboxes that provide test tools,
        sample data, collaboration resources, and useful links.</p>

      <h1>ONC Certification Tools</h1>
      <h5>All tools required for certification.</h5>
      <ul>
        <li>Inferno FHIR Testing</li>
        <li>C-CDA Testing</li>
        <li>Direct Project Toling</li>
        <li>CQM QRDA Testing</li>
      </ul>

      <h1>General Testing Tools</h1>
      <h5>All tools not required for certification, but a benefit for your software!</h5>
      <ul>
        <li>CPOE Evaluation Tool</li>
        <li>IHE Testing Tools</li>
        <li>NIST Conformance Testing</li>
        <li>Lantern Project</li>
      </ul>

      <h1>Industry Testing Resources</h1>
      <h5>Outside tools may help you!</h5>
      <ul>
        <li>HL7 Tools</li>
        <li>Reference Data</li>
        <li>Implementation Guides</li>
      </ul>

    </>
  )
}
