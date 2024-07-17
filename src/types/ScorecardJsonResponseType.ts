export interface ScorecardJsonResponseType {
  errorMessage: string | null
  filename: string
  ccdaDocumentType: string | null
  results: ScorecardResultsType | null
  referenceResults: ScorecardReferenceResultType[] | []
  // referenceResults: ReferenceResult[]
  schemaErrorList: SchemaErrorList[] | null
  schemaErrors: boolean
  success: boolean
}

export interface ScorecardResultsType {
  finalGrade: string
  finalNumericalGrade: number
  categoryList: CategoryList[]
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

interface CategoryList {
  categoryName: string
  categoryGrade: string | null
  categoryNumericalScore: number
  categoryRubrics: CategoryRubric[]
  numberOfIssues: number
  numberOfChecks: number
  numberOfFailedRubrics: number
  certificationFeedback: boolean
  failingConformance: boolean
  nullFlavorNI: boolean
}

interface CategoryRubric {
  rule: string
  numberOfIssues: number
  issuesList: IssuesList[]
  exampleTaskForceLinks: string[]
  igReferences: string[]
  description: string | null
}

interface IssuesList {
  lineNumber: string
  xmlString: string
}

interface TotalGradesGiven {
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
  referenceErrors: ReferenceError[]
}

interface ReferenceError {
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

interface SchemaErrorList {
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
