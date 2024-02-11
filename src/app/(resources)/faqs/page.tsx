import { Card, Typography } from '@mui/material'
import Box from '@mui/material/Box'
import Overview, { QAItem } from '../../../components/resources/OverviewCard'
import ArchiveSubMenu from '@/components/archived/ArchiveSubMenu'
import FAQCard from '../../../components/resources/FAQCard'
import BannerBox from '@shared/BannerBox'

export default function ArchivedHome() {
  const faqItems: QAItem[] = [
    {
      question: 'What is SITE?',
      answer: 'Discover the core concept and purpose behind SITE, and how it can benefit you or your organization.',
    },
    {
      question: 'How do I get started with SITE?',
      answer:
        "Step-by-step guidance on creating an account, setting up your profile, and navigating through SITE's user-friendly interface.",
    },
    {
      question: 'What are the key features of SITE?',
      answer: 'Explore the various tools, functions, and capabilities that SITE offers to help you achieve your goals.',
    },
    {
      question: 'How can I connect with other users on SITE?',
      answer: 'Learn how to build connections, join communities, and engage with fellow SITE users.',
    },
    {
      question: 'Is SITE compatible with mobile devices?',
      answer:
        'Find out if SITE is accessible on smartphones and tablets, and how to make the most of the mobile experience.',
    },
    {
      question: 'How can I report issues or seek assistance on SITE?',
      answer: 'Get information on how to report bugs, seek technical support, or contact our customer service team.',
    },
  ]

  return (
    <div>
      <BannerBox
        breadcrumbs={undefined}
        heading={'Welcome to the ONC SITE'}
        subHeading={'A hub of valuable questions & answers'}
        isTourButton={false}
        description={
          "Welcome to the Frequently Asked Questions (FAQ) section of the SITE website. Here, we've compiled a comprehensive list of common queries and inquiries to provide you with quick and informative answers to your most pressing questions about SITE. Whether you're a new visitor exploring our platform or a long-time user seeking clarification, this FAQ section aims to simplify your experience and provide valuable insights into SITE's features and functionalities."
        }
      />
      <Box
        sx={{
          position: 'relative',
          width: '1441px',
          display: 'flex',
          flexWrap: 'wrap',
          flexDirection: 'row',
          justifyContent: 'flex-end',
          alignItems: 'flex',
          padding: '0 32px',
          mt: 4,
        }}
      >
        <ArchiveSubMenu></ArchiveSubMenu>
        <Overview header="Overview" items={faqItems}></Overview>
        <FAQCard
          header="Frequently Asked Questions"
          content={
            <div>
              <Typography sx={{ mb: 5 }}>
                <Typography variant="body1" sx={{ mb: 1.5 }}>
                  <strong>Q: How do you use the C-CDA 2.1 Validator?</strong>
                </Typography>
                <Typography variant="body2" sx={{ mb: 1.5 }}>
                  A: 1. Using the C-CDA Validator 2.1, Step 1 is to select whether you are performing a Sender specific
                  test or Receiver Specific test (Select Sender / Receiver). a. The above choice will make what appears
                  when you click the “Select Document “ to change based on the SUT role. b. In your case you would
                  select “Sender”
                </Typography>
                <Typography variant="body2" sx={{ mb: 1 }}>
                  1. Then you would select the criteria first and for each criteria that you select you may have one or
                  more PDF files.
                </Typography>
                <Typography variant="body2" sx={{ mb: 1 }}>
                  2. You would download the PDF file,
                </Typography>
                <Typography variant="body2" sx={{ mb: 1 }}>
                  3. Enter the test data provided into your SUT instance.
                </Typography>
                <Typography variant="body2" sx={{ mb: 1 }}>
                  4. Generate a C-CDA document. (This is C-CDA Validator Step 2)
                </Typography>
                <Typography variant="body2" sx={{ mb: 1 }}>
                  5. Then in the C-CDA Validator Step 3, you have to select the Criteria and the PDF file which you used
                  to generate the C-CDA.
                </Typography>
                <Typography variant="body2" sx={{ mb: 1.5 }}>
                  6. Then upload the C-CDA file that you generated in C-CDA Validator Step 4 and then validate.
                </Typography>
                <Typography variant="body2" sx={{ mb: 1.5 }}>
                  The above sequence is what you would use to validate the C-CDA files you generated using the test
                  data.
                </Typography>
                <Typography variant="body2" sx={{ mb: 1.5 }}>
                  If you want to validate files generated by your system without using the test data provided then you
                  can proceed to Step 3 and select “CCDAIGOnly” or “CCDAIGPlus_Vocab” options and then upload and
                  validate. This is to help vendors prepare their systems however certification procedures require the
                  use of the provided test data unless you work with the ATLs to file for deviations to the test data.
                </Typography>
                <Typography variant="body1" sx={{ mb: 1.5 }}>
                  <strong>
                    Q: Can multiple organizations be included as information recipients within the{' '}
                    {'<informationRecipient>'} element?
                  </strong>
                </Typography>
                <Typography variant="body2" sx={{ mb: 1.5 }}>
                  A: CDA allows for 0..* information Recipients. You should include more than one informationRecipient
                  if you’d like to send information to multiple organizations.
                </Typography>
                <Typography variant="body1" sx={{ mb: 1.5 }}>
                  <strong>
                    Q: How can CCDA xml files for interoperability modules be created to include multiple races and
                    ethnicities?
                  </strong>
                </Typography>
                <Typography variant="body2" sx={{ mb: 1.5 }}>
                  A: There is an extension package that may be used. sdtc:raceCode sdtc:ethnicGroupCode See the C-CDA
                  companion guide for additional details:
                  http://www.hl7.org/implement/standards/productbrief.cfm?productid=447
                </Typography>
                <Typography variant="body1" sx={{ mb: 1.5 }}>
                  <strong>
                    {
                      "Q: I'm now trying to increase the debugging output from the validator, hopefully to see where my issues exist with the vocabulary. I've tried using a global DEBUG level in the logging.properties file and setting to ALL, but it appears that the validator doesn't look at the properties file to set it's level of logging."
                    }
                  </strong>
                </Typography>
                <Typography variant="body1" sx={{ mb: 1.5 }}>
                  <strong>{'Does anyone know where I can change that info level for the validator classes?'}</strong>
                </Typography>
                <Typography variant="body1" sx={{ mb: 1.5 }}>
                  <strong>
                    {
                      'The logging that I do get appears to show the vocab/valuesystems loading just too quickly. 08:27:14,748 INFO [VocabularyLoadRunner:92] Loading vocabularies at: /var/tomcat2/ValidatorConfig/CodeSystems... 08:27:14,748 INFO [VocabularyLoadRunner:94] Vocabularies loaded... 08:27:14,748 INFO [VocabularyLoadRunner:99] Loading value sets at: /var/tomcat2/ValidatorConfig/ValueSets... 08:27:14,749 INFO [VocabularyLoadRunner:101] Value Sets loaded... 08:27:14,749 INFO [VocabularyLoadRunner:105] !!!!* VOCABULARY DATABASE HAS FINISHED LOADING - SERVER WILL CONTINUE AND SHOULD BE DONE SHORTLY. *!!!!'
                    }
                  </strong>
                </Typography>
                <Typography variant="body2" sx={{ mb: 1.5 }}>
                  {
                    '* A: 15:02:46,635 INFO  [VocabularyLoadRunner:92] Loading vocabularies at: C:CCDAValidatorcode_repository... 15:02:46,636 INFO [VocabularyLoadRunner:44] Loading files in : CDT... 15:02:47,758 INFO [VocabularyLoadRunner:44] Loading files in : ICD10CM... 15:02:51,412 INFO [VocabularyLoadRunner:44] Loading files in : ICD10PCS... 15:02:53,378 INFO [VocabularyLoadRunner:44] Loading files in : ICD9CMDX... .... C:CCDAValidator\valuesetrepository... 15:04:37,554 INFO [VocabularyLoadRunner:44] Loading files in : VSAC... 15:04:37,555 INFO [VsacLoader:30] Loading Value Set File: Ability.xlsx 15:04:37,662 INFO [VsacLoader:30] Loading Value Set File: ActPriority.xlsx 15:04:37,708 INFO [VsacLoader:30] Loading Value Set File: ActStatus.xlsx ... Here are my config settings for the the codes set and value set files:'
                  }
                </Typography>
                <Typography variant="body2" sx={{ mb: 1.5 }}>
                  {
                    '<Parameter name="vocabulary.localCodeRepositoryDir" value="C:CCDAValidatorcoderepository" override="true"/> <Parameter name="vocabulary.localValueSetRepositoryDir" value="C:CCDAValidator\valuesetrepository" override="true"/>The localCodeRepositoryDir is the path to the folders (e.g. ICD9CMDX, ICD9CMSG, ICD10CM, etc...) that contain the code set files. The localValueSetRepositoryDir is the path to the VSAC folder that contains all of the value set files. I believe the application is hard-coded to look for those particular folders in order to process the files within. That may be case-sensitive...'
                  }
                </Typography>
                <Typography variant="body1" sx={{ mb: 1.5 }}>
                  <strong>
                    {
                      'Q: Hello, were there any updates made to the tool? I\'m getting this same error with problem codes for "no known problems".'
                    }
                  </strong>
                </Typography>
                <Typography variant="body2" sx={{ mb: 1.5 }}>
                  {
                    'A: No specific updates were made to the tool to remove the validation for the “No Known Problems”. Are you following the HL7 example at http://hl7-c-cda-examples.herokuapp.com/examples/view/7353a215efda8dfe3fbacb19abbb90756ce14bab'
                  }
                </Typography>
                <Typography variant="body1" sx={{ mb: 1.5 }}>
                  <strong>
                    {
                      'Q: Hoping to obtain some clarity around representing NDC codes for administered immunizations in the C-CDA. NDC is published as a standard for immunizations as a CCDS element and the ONC\'s CCDS companion guide cites that it\'s supported as a translational element accompanying the CVX code in CDA R2.1. Looking at the 2.1 IG, NDC is referenced within the Immunization Medication Information entry-level template with the Vaccine Clinical Drug value set stating: "Value set intensionally defined from RXNORM (OID: 2.16.840.1.113883.6.88), comprised of those codes whose ingredients map to NDC codes that the CDC associates with CVX codes." Reading this and viewing the provided examples it appears as though the IG expects only RxNorm codes (not NDC) to be used as translational element entries mapping between an NDC and a CVX.'
                    }
                  </strong>
                </Typography>
                <Typography variant="body2" sx={{ mb: 1.5 }}>
                  {
                    "NDC's are not actually included anywhere in the certification test data/validation for immunizations (only CVX), and I'm struggling to find any examples of their use for immunizations in C-CDA. Is there a specific expectation of how NDC codes are to be represented in C-CDA docs (if at all) to satisfy the ONC's CCDS standard?"
                  }
                </Typography>
                <Typography variant="body1" sx={{ mb: 1.5 }}>
                  <strong>
                    {
                      "NDC's are not actually included anywhere in the certification test data/validation for immunizations (only CVX), and I'm struggling to find any examples of their use for immunizations in C-CDA. Is there a specific expectation of how NDC codes are to be represented in C-CDA docs (if at all) to satisfy the ONC's CCDS standard?"
                    }
                  </strong>
                </Typography>
                <Typography variant="body2" sx={{ mb: 1.5 }}>
                  {
                    'A: The test data contains CVX because that is accompanied with a SHALL requirement in the C-CDA IG. Since the translation elements are having a conformance statement of “MAY” and not a “SHALL”, you could choose to use the NDC codes mapped to the CVX codes in the translation element as specified by the CCG'
                  }
                </Typography>
              </Typography>
            </div>
          }
        />
      </Box>
    </div>
  )
}
