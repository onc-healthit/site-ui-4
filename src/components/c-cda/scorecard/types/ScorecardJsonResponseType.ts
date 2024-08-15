export interface ScorecardJsonResponseType {
  errorMessage: string | null
  filename: string
  ccdaDocumentType: string | null
  results: ScorecardResultsType | null
  referenceResults: ScorecardReferenceResultType[] | []
  // referenceResults: ScorecardReferenceResultType[]
  schemaErrorList: SchemaErrorList[] | null
  schemaErrors: boolean
  success: boolean
}

export interface ScorecardResultsType {
  finalGrade: string
  finalNumericalGrade: number
  categoryList: ScorecardCategory[]
  numberOfIssues: number
  igReferenceUrl: string
  industryAverageScore: number
  industryAverageGrade: string
  numberOfDocumentsScored: number
  ccdaVersion: string
  passedCertification: boolean | null
  numberOfDocsScoredPerCcdaDocumentType: number
  industryAverageScoreForCcdaDocumentType: number
  industryAverageGradeForCcdaDocumentType: string
  numberOfRules: number
  totalElementsChecked: number
  numberOfFailedRules: number
  totalCertificationErrorChecks: number
  totalConformanceErrorChecks: number
  totalGradesGiven: TotalGradesGiven
}

export interface ScorecardCategory {
  categoryName: string
  categoryGrade: string | null
  categoryNumericalScore: number
  categoryRubrics: ScorecardCategoryRubric[]
  numberOfIssues: number
  numberOfChecks: number
  numberOfFailedRubrics: number
  certificationFeedback: boolean
  failingConformance: boolean
  nullFlavorNI: boolean
  conformanceErrorCount?: number // Note: Property was ADDED for this program. It does NOT exist in the server response
  vocabularyErrorCount?: number // Note: Property was ADDED for this program. It does NOT exist in the server response
}

export interface ScorecardCategoryRubric {
  rule: string
  numberOfIssues: number
  issuesList: ScorecardIssueXMLInstance[]
  exampleTaskForceLinks: string[]
  igReferences: string[]
  description: string | null
}

export interface ScorecardIssueXMLInstance {
  lineNumber: string
  xmlString: string
}

export interface TotalGradesGiven {
  aPlusGrades: number
  aMinusGrades: number
  bPlusGrades: number
  bMinusGrades: number
  cGrades: number
  dGrades: number
}

export interface ScorecardReferenceResultType {
  type: string
  totalErrorCount: number
  referenceErrors: ScorecardReferenceErrorType[]
}

export interface ScorecardReferenceErrorType {
  description: string
  type: string
  xPath: string
  validatorConfiguredXpath: string | null
  documentLineNumber: string
  actualCode: string | null
  actualCodeSystem: string | null
  actualCodeSystemName: string | null
  actualDisplayName: string | null
  schemaError: boolean
  dataTypeSchemaError: boolean
  sectionName: string | null
}

export interface SchemaErrorList {
  description: string
  type: string
  xPath: string
  validatorConfiguredXpath: string | null
  documentLineNumber: string
  actualCode: string | null
  actualCodeSystem: string | null
  actualCodeSystemName: string | null
  actualDisplayName: string | null
  schemaError: boolean
  dataTypeSchemaError: boolean
  sectionName: string | null
}
