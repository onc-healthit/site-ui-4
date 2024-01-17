import Link from "next/link"
import styles from './page.module.css'

export default function Home() {
  return (
    <main className={styles.main}>
      <h1>Welcome to the ONC SITE The hub for testing tools & resources</h1>
      <h2>The hub for testing tools & resources</h2>
      <p>The Standards Implementation & Testing Environment (SITE) is a centralized collection
        of testing tools and resources designed to assist health IT developers and health IT users
        fully evaluating specific technical standards and maximizing the potential of their health
        IT implementations. SITE is organized in a collection of sandboxes that provide test tools,
        sample data, collaboration resources, and useful links.</p>
''
      <h1>ONC Certification Tools</h1>
      <h5>All tools required for certification.</h5>
      <ul>
        <li>
          <Link href={'https://inferno.healthit.gov/'}>Inferno FHIR Testing</Link>
        </li>
        <li>
          <Link href={'/c-cda'} >C-CDA Testing</Link>
        </li>
        <li>
          <Link href={'/direct'}>Direct Project Tooling</Link>
        </li>
        <li>
          <Link href={'/cqm-qrda'}>CQM QRDA Testing</Link>
        </li>
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
    </main >
  )
}
