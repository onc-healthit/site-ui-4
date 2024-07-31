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
  categoryList: ScorecardCategoryList[]
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

export interface ScorecardCategoryList {
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
}

export interface ScorecardCategoryRubric {
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
