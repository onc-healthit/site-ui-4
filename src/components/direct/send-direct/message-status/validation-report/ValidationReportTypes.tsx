export interface ValidationReport {
  partID: string
  logID: string
  rawMessage: string
  contentType: string
  contentTransferEncoding: string
  contentDisposition: string
  status: boolean
  children: Children[]
  details: Detail[]
  svapdetails: Svapdetail[]
}
export type Children = {
  partID: string
  logID: string
  rawMessage: string
  contentType: string
  contentTransferEncoding: string
  contentDisposition: string
  status: boolean
  children: Children[]
  details: Detail[]
  svapdetails: Svapdetail[]
}

export type Detail = {
  detailID: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  logID: any
  partID: string
  counter: number
  name: string
  status: string
  dts: string
  found: string
  expected: string
  rfc: string
}
export type Svapdetail = {
  detailID: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  logID: any
  partID: string
  counter: number
  name: string
  status: string
  dts: string
  found: string
  expected: string
  rfc: string
}

export interface ReportProps {
  validationReport: ValidationReport
  validationReportRawContent: RawContent[]
  ccdaReport: []
}

export type RawContent = {
  filename: string
  rawContent: string
  downloadLink: string
}
