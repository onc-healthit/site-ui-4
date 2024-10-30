import XDREdgeTestContent from './XDREdgeTestToolContent'
import { getSampleCCDAFiles } from './actions'

export default async function XDREdgeTest() {
  const sampleCCDAFilesEndpoint =
    process.env.TTT_SAMPLE_CCDA_FILES_ENDPOINT ||
    'https://site.healthit.gov/directtransportmessagesender/listsampleccdafiles'
  const sampleCCDAFiles: string[] = (await getSampleCCDAFiles(sampleCCDAFilesEndpoint)) || []

  return <XDREdgeTestContent sampleCCDAFiles={sampleCCDAFiles} />
}
