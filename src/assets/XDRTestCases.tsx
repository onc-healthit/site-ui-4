const testCases = [
  {
    name: 'XDR Test 1',
    id: 1,
    ID: '1',
    desc: 'Verifies the ability of the sending system to initiate a SOAP-based communication with an XDR-based payload.  This test uses Limited XDR metadata.',
    sutEdge: true,
    sutHisp: false,
    sutRole: 'sender',
    criteria: "['b1-1']",
    inputs: [
      {
        name: 'Direct From Address',
        hoverlabel: 'Direct From Address: SUT (HISP) outgoing SMTP address (or) MDN.',
        key: 'direct_from',
        type: 'string',
      },
      {
        name: 'C-CDA Document Type',
        key: 'payload',
        type: 'CCDAWidgetXdr',
      },
    ],
    moreInfo: {
      headers: ['Vendor Role', 'Metadata Included'],
      tableData: [
        {
          cells: [
            { content: 'Sender (EDGE - SUT)', type: 'text' },
            { content: 'Limited Metadata', type: 'text' },
          ],
        },
      ],
    },
    'Test Focus': 'XDR Send ',
    'Data Flow in Direct': 'Edge Sends an XDR message to HISP along with Direct Address block',
    'Metadata Included': 'Limited Metadata',
    'Direct Address Block': 'Included',
    'SUT: Sender/ Receiver': 'Sender (Edge - SUT)',
    'Test Tool: Sender / Receiver': 'Receiver (Test Tool)',
    'Purpose/Description':
      'Verify that the Edge system can create an XDR message per the specification. Per the Test Procedure, the user is to select a payload for transmission that meets the test scenario with regard to 170_b1_ToC_Amb or 170.315_b1_ToC_Inp. The user should select the C-CDA document type that matches the architecture for the document they are sending.',
    'Conformance  Test Details':
      'XDR Message Checklist + XDS Metadata Checklist for Limited Metadata Document Source + Direct Address Block',
    'Expected Test Results': 'Edge System produces the right message and conforms to the specification.',
    'Required / Conditional per Direct Edge Protocol Guide': 'R',
    'Direct Edge Protocol Guide 1.1 RTM Reference': 1.1,
    'Test Data IDs': null,
  },
  {
    name: 'XDR Test 2',
    id: 2,
    ID: '2',
    desc: 'Verifies the ability of the sending system to initiate a SOAP-based communication with an XDR-based payload. This test uses Full XDR metadata.',
    sutEdge: true,
    sutHisp: false,
    sutRole: 'sender',
    criteria: "['b1-1']",
    inputs: [
      {
        name: 'Direct From Address',
        hoverlabel: 'Direct From Address: SUT (HISP) outgoing SMTP address (or) MDN.',
        key: 'direct_from',
        type: 'string',
      },
      {
        name: 'C-CDA Document Type',
        key: 'payload',
        type: 'CCDAWidgetXdr',
      },
    ],
    moreInfo: {
      headers: ['Vendor Role', 'Metadata Included'],
      tableData: [
        {
          cells: [
            { content: 'Sender (EDGE - SUT)', type: 'text' },
            { content: 'Full Metadata', type: 'text' },
          ],
        },
      ],
    },
    'Test Focus': 'XDR Send',
    'Data Flow in Direct': 'Edge Sends an XDR message to HISP along with Full Metadata',
    'Metadata Included': 'Full Metadata',
    'Direct Address Block': 'Included',
    'SUT: Sender/ Receiver': 'Sender (Edge - SUT)',
    'Test Tool: Sender / Receiver': 'Receiver (Test Tool)',
    'Purpose/Description': 'Verify that the Edge system can create an XDR message per the specification',
    'Conformance  Test Details':
      'XDR Message Checklist + XDS Metadata Checklist for Full Metadata Document Source + Direct XDR Checklist',
    'Expected Test Results': 'Edge System produces the right message and conforms to the specification.',
    'Required / Conditional per Direct Edge Protocol Guide': 'O',
    'Direct Edge Protocol Guide 1.1 RTM Reference': 1.1,
    'Test Data IDs': null,
  },
  {
    name: 'XDR Test 3',
    id: '3add',
    ID: '3add',
    desc: 'Verify the ability of the receiving system to correctly receive a properly formatted XDR message with Limited metadata.',
    sutEdge: true,
    sutHisp: false,
    sutRole: 'receiver',
    criteria: "['b1-3','su1-3']",
    inputs: [
      {
        name: 'Endpoint',
        hoverlabel: 'Receiving endpoint of the SUT for XDR SOAP messages',
        key: 'targetEndpointTLS',
        type: 'string',
      },
      {
        name: 'C-CDA Document Type',
        key: 'payload',
        type: 'CCDAWidgetReceiverXdr',
      },
    ],
    moreInfo: {
      headers: ['Vendor Role', 'Metadata Included'],
      tableData: [
        {
          cells: [
            { content: 'Receiver (EDGE - SUT)', type: 'text' },
            { content: 'Limited Metadata', type: 'text' },
          ],
        },
      ],
    },
    'Test Focus': 'XDR Receive',
    'Data Flow in Direct': 'Edge receives an XDR message from the HISP',
    'Metadata Included': 'Limited Metadata',
    'Direct Address Block': 'Included',
    'SUT: Sender/ Receiver': 'Receiver (Edge - SUT)',
    'Test Tool: Sender / Receiver': 'Sender (Test Tool)',
    'Purpose/Description':
      "Verify that an Edge system can receive a properly formatted XDR message. The SUT will receive the XDR message with a 'direct:from' and 'direct:to' address of testcase3add@ett.healthit.gov. This was designed to require the SUT's endpoint as the only input parameter.",
    'Conformance  Test Details': '',
    'Expected Test Results':
      'Edge system is capable of receiving and processing a valid message, test procedure may include other details for verification. Test Tool is satisfied with a good response.',
    'Required / Conditional per Direct Edge Protocol Guide': 'R',
    'Direct Edge Protocol Guide 1.1 RTM Reference': 1.1,
    'Test Data IDs': null,
  },
  {
    name: 'XDR Test 4a',
    id: '4a',
    ID: '4a',
    desc: 'Verify the ability of the receiving system to appropriately respond to a malformed message.  This test is for an invalid SOAP header.',
    sutEdge: true,
    sutHisp: false,
    sutRole: 'receiver',
    criteria: "['b1-3']",
    inputs: [
      {
        name: 'Endpoint',
        hoverlabel: 'Receiving endpoint of the SUT for XDR SOAP messages',
        key: 'targetEndpointTLS',
        type: 'string',
      },
    ],
    moreInfo: {
      headers: ['Vendor Role', 'Metadata Included'],
      tableData: [
        {
          cells: [
            { content: 'Receiver (EDGE - SUT)', type: 'text' },
            { content: 'N/A', type: 'text' },
          ],
        },
      ],
    },
    'Test Focus': 'XDR Receive',
    'Data Flow in Direct': 'Edge receives an incorrect XDR message from the HISP',
    'Metadata Included': 'N/A',
    'Direct Address Block': 'N/A',
    'SUT: Sender/ Receiver': 'Receiver (Edge - SUT)',
    'Test Tool: Sender / Receiver': 'Sender (Test Tool)',
    'Purpose/Description':
      "Verify that the Edge system throws an error when an incorrect message is received. The SUT will receive the XDR message with a 'direct:from' and 'direct:to' address of testcase4a@ett.healthit.gov. This was designed to require the SUT's endpoint as the only input parameter.",
    'Conformance  Test Details': 'Create incorrect messages which include Bad SOAP Envelope Details',
    'Expected Test Results': 'Edge system is rejecting the various bad messages sent from the test tool.',
    'Required / Conditional per Direct Edge Protocol Guide ': 'R',
    'Direct Edge Protocol Guide 1.1 RTM Reference ': 1.1,
    'Test Data IDs ': null,
  },
  {
    name: 'XDR Test 4b',
    id: '4b',
    ID: '4b',
    desc: 'Verify the ability of the receiving system to appropriately respond to a malformed message.  This test is for an invalid SOAP body.',
    sutEdge: true,
    sutHisp: false,
    sutRole: 'receiver',
    criteria: "['b1-3']",
    inputs: [
      {
        name: 'Endpoint',
        hoverlabel: 'Receiving endpoint of the SUT for XDR SOAP messages',
        key: 'targetEndpointTLS',
        type: 'string',
      },
    ],
    moreInfo: {
      headers: ['Vendor Role', 'Metadata Included'],
      tableData: [
        {
          cells: [
            { content: 'Receiver (EDGE - SUT)', type: 'text' },
            { content: 'N/A', type: 'text' },
          ],
        },
      ],
    },
    'Test Focus': 'XDR Receive',
    'Data Flow in Direct': 'Edge receives an incorrect XDR message from the HISP',
    'Metadata Included': 'N/A',
    'Direct Address Block': 'N/A',
    'SUT: Sender/ Receiver': 'Receiver (Edge - SUT)',
    'Test Tool: Sender / Receiver': 'Sender (Test Tool)',
    'Purpose/Description':
      "Verify that the Edge system throws an error when an incorrect message is received. The SUT will receive the XDR message with a 'direct:from' and 'direct:to' address of testcase4b@ett.healthit.gov. This was designed to require the SUT's endpoint as the only input parameter.",
    'Conformance  Test Details': 'Create incorrect messages which include Bad SOAP Body Details',
    'Expected Test Results': 'Edge system is rejecting the various bad messages sent from the test tool.',
    'Required / Conditional per Direct Edge Protocol Guide ': 'R',
    'Direct Edge Protocol Guide 1.1 RTM Reference ': 1.1,
    'Test Data IDs ': null,
  },
  {
    name: 'XDR Test 5',
    id: 5,
    ID: '5',
    desc: 'Verify the ability of the receiving system to correctly receive a properly formatted XDR message with Full (XDS) metadata.',
    sutEdge: true,
    sutHisp: false,
    sutRole: 'receiver',
    criteria: "['b1-3','su1-3']",
    inputs: [
      {
        name: 'Endpoint',
        hoverlabel: 'Receiving endpoint of the SUT for XDR SOAP messages',
        key: 'targetEndpointTLS',
        type: 'string',
      },
    ],
    moreInfo: {
      headers: ['Vendor Role', 'Metadata Included'],
      tableData: [
        {
          cells: [
            { content: 'Receiver (EDGE - SUT)', type: 'text' },
            { content: 'Full Metadata', type: 'text' },
          ],
        },
      ],
    },
    'Test Focus': 'XDR Receive',
    'Data Flow in Direct': 'Edge receives an XDR message from the HISP',
    'Metadata Included': 'Full Metadata',
    'Direct Address Block': 'Included',
    'SUT: Sender/ Receiver': 'Receiver (Edge - SUT)',
    'Test Tool: Sender / Receiver': 'Sender (Test Tool)',
    'Purpose/Description':
      "Verify that an Edge system can receive a properly formatted XDR message. The SUT will receive the XDR message with a 'direct:from' and 'direct:to' address of testcase5@ett.healthit.gov. This was designed to require the SUT's endpoint as the only input parameter.",
    'Conformance  Test Details': '',
    'Expected Test Results':
      'Edge system is capable of receiving and processing a valid message with Full Metadata, test procedure may include other details for verification. Test Tool is satisfied with a good response.',
    'Required / Conditional per Direct Edge Protocol Guide': 'R',
    'Direct Edge Protocol Guide 1.1 RTM Reference': 1.1,
    'Test Data IDs': null,
  },
  {
    name: 'XDR Test 6',
    id: 6,
    ID: '6',
    desc: 'Verifies the ability of the sending system to complete a mutual TLS handshake before data is sent across.\nNote that an unsuccessful TLS attempt may result in the Pending Refresh button being displayed instead of a Fail.  A disconnection happening at the server level would cause the communication not to be forwarded to the application level.',
    sutEdge: true,
    sutHisp: false,
    sutRole: 'sender',
    criteria: "['b1-1']",
    inputs: [
      {
        name: 'Direct From Address',
        hoverlabel: 'Direct From Address: SUT (HISP) outgoing SMTP address (or) MDN.',
        key: 'direct_from',
        type: 'string',
      },
    ],
    moreInfo: {
      headers: ['Vendor Role', 'Metadata Included'],
      tableData: [
        {
          cells: [
            { content: 'Sender (EDGE - SUT)', type: 'text' },
            { content: 'N/A', type: 'text' },
          ],
        },
      ],
    },
    'Test Focus': 'Authentication',
    'Data Flow in Direct': 'Edge uses Mutual TLS to authenticate to the HISP',
    'Metadata Included': 'N/A',
    'Direct Address Block': 'N/A',
    'SUT: Sender/ Receiver': 'Sender (Edge - SUT)',
    'Test Tool: Sender / Receiver': 'Server (Test Tool)',
    'Purpose/Description':
      'Verify that Mutual TLS session is established between the Sender and the Receiver before transimitting data. The Tester (i.e., Vendor) assures that the appropriate XDR Certificates have been downloaded from the ETT and imported into the SUT trust store before executing the test.',
    'Conformance  Test Details': 'Require Mutual TLS in the configuration',
    'Expected Test Results':
      'Edge Sysem is capable of establishing the Mutual TLS connection prior to transmitting the data.',
    'Required / Conditional per Direct Edge Protocol Guide': 'R',
    'Direct Edge Protocol Guide 1.1 RTM Reference': 1.1,
    'Test Data IDs': null,
  },
  {
    name: 'XDR Test 7',
    id: 7,
    ID: '7',
    desc: 'Verifies the ability of the sending system to reject a mutual TLS connection where the certificate provided by the ETT is invalid.  If you experience Pending Refresh or a Fail that you think is incorrect, please run this test again but wait 15 seconds after the connection has been dropped for the ETT to fully test the socket connection.',
    sutEdge: true,
    sutHisp: false,
    sutRole: 'sender',
    criteria: "['b1-1']",
    inputs: [
      {
        name: 'IP Address',
        key: 'ip_address',
        hoverlabel: 'IP Address (eg: 202.255.24.62)',
        type: 'string',
      },
    ],
    moreInfo: {
      headers: ['Vendor Role', 'Metadata Included'],
      tableData: [
        {
          cells: [
            { content: 'Sender (EDGE - SUT)', type: 'text' },
            { content: 'N/A', type: 'text' },
          ],
        },
      ],
    },
    'Test Focus': 'Authentication',
    'Data Flow in Direct': 'Edge uses Mutual TLS to authenticate to the HISP exception case',
    'Metadata Included': 'N/A',
    'Direct Address Block': 'N/A',
    'SUT: Sender/ Receiver': 'Sender (Edge - SUT)',
    'Test Tool: Sender / Receiver': 'Server (Test Tool)',
    'Purpose/Description': 'Verify that Edge disconnects when the Server provided certificate is invalid.',
    'Conformance  Test Details': 'Incorrect Mutual TLS configuration should not proceed.',
    'Expected Test Results': 'Edge Sysem rejects the connection from the Server due to bad certificate.',
    'Required / Conditional per Direct Edge Protocol Guide': 'R',
    'Direct Edge Protocol Guide 1.1 RTM Reference': 1.1,
    'Test Data IDs': 'Column J is not necessary.',
  },
  {
    name: 'XDR Test 8',
    id: 8,
    ID: '8',
    desc: 'Verifies the ability of the receiving system to complete a mutual TLS handshake before data is sent across. Certificates for this test can be downloaded from the link at the top of this page. This is a socket-level test, the full endpoint is not necessary.  Enter only  IP Address and port below.',
    sutEdge: true,
    sutHisp: false,
    sutRole: 'receiver',
    criteria: "['b1-3']",
    inputs: [
      {
        name: 'IP Address',
        key: 'ip_address',
        hoverlabel: 'IP Address (eg: 202.255.24.62)',
        type: 'string',
      },
      {
        name: 'Port',
        key: 'port',
        type: 'string',
      },
    ],
    moreInfo: {
      headers: ['Vendor Role', 'Metadata Included'],
      tableData: [
        {
          cells: [
            { content: 'Receiver (EDGE - SUT)', type: 'text' },
            { content: 'N/A', type: 'text' },
          ],
        },
      ],
    },
    'Test Focus': 'Authentication',
    'Data Flow in Direct': 'HISP authenticates to the Edge using Mutual TLS',
    'Metadata Included': 'N/A',
    'Direct Address Block': 'N/A',
    'SUT: Sender/ Receiver': 'Receiver (Edge - SUT)',
    'Test Tool: Sender / Receiver': 'Client (Test Tool)',
    'Purpose/Description': 'Test Tool authenticates with the Edge using Mutual TLS correctly',
    'Conformance  Test Details': 'Require Mutual TLS in the configuration in the Edge system',
    'Expected Test Results': 'Edge System is capable of accepting and validating a Mutual TLS connection.',
    'Required / Conditional per Direct Edge Protocol Guide': 'R',
    'Direct Edge Protocol Guide 1.1 RTM Reference': 1.1,
    'Test Data IDs': null,
  },
  {
    name: 'XDR Test 9',
    id: 9,
    ID: '9',
    desc: 'Verifies the ability of the receiving system to reject a mutual TLS connection where the certificate provided by the ETT is invalid. Certificates for this test can be downloaded from the link at the top of this page. As this is a socket-level test, the full endpoint is not necessary and only  IP Address and port are to be entered below. The SUT MUST attempt an HTTPS connection.',
    sutEdge: true,
    sutHisp: false,
    sutRole: 'receiver',
    criteria: "['b1-3']",
    inputs: [
      {
        name: 'IP Address',
        key: 'ip_address',
        hoverlabel: 'IP Address (eg: 202.255.24.62)',
        type: 'string',
      },
      {
        name: 'Port',
        key: 'port',
        type: 'string',
      },
    ],
    moreInfo: {
      headers: ['Vendor Role', 'Metadata Included'],
      tableData: [
        {
          cells: [
            { content: 'Receiver (EDGE - SUT)', type: 'text' },
            { content: 'N/A', type: 'text' },
          ],
        },
      ],
    },
    'Test Focus': 'Authentication',
    'Data Flow in Direct': 'HISP authenticates to the Edge using Mutual TLS exception case',
    'Metadata Included': 'N/A',
    'Direct Address Block': 'N/A',
    'SUT: Sender/ Receiver': 'Receiver (Edge - SUT)',
    'Test Tool: Sender / Receiver': 'Client (Test Tool)',
    'Purpose/Description': 'Test Tool authenticates with the Edge using bad certificates',
    'Conformance  Test Details': 'Incorrect Mutual TLS configuration should not proceed.',
    'Expected Test Results':
      'Edge System rejects the connection due to the bad certificate published by the Test Tool.',
    'Required / Conditional per Direct Edge Protocol Guide': 'R',
    'Direct Edge Protocol Guide 1.1 RTM Reference': 1.1,
    'Test Data IDs': null,
  },
  {
    name: 'XDR Test 10',
    id: 10,
    ID: '10',
    desc: 'Test Tool sends a Direct Message to the SUT.  The SUT must translate this to an XDR message and send it back to the Edge.\nVerify that the HISP system can create an XDR message per the specification and forward to Edge.  The return endpoint is provided below. The validation report will be sent to the email address registered with the Direct address enter during setup.',
    sutEdge: false,
    sutHisp: true,
    sutRole: 'sender',
    criteria: "['h2-1','h2-3','sc2-1','sc2-3']",
    status: 'configure',
    inputs: [
      {
        name: 'Direct To Address',
        hoverlabel:
          "Direct To Address: SUT's receiving email endpoint for Direct/XDR translation, ETT to SUT workflow.",
        key: 'direct_to',
        type: 'string',
      },
    ],
    moreInfo: {
      subHeader: 'Description',
      subDesc: `Test Tool sends a Direct Message, which is translated to an XDR message and sent to the Edge.
      Verify that the HISP system can create an XDR message per the specification and forward to Edge. The validation report will be sent to the email address registered with the Direct address enter during setup. Direct To Address: SUT's receiving email endpoint for Direct/XDR translation, ETT to SUT workflow. The SUT will receive a message from testcase10@ett.healthit.gov`,
      expTestHeader: `Expected Test Results`,
      expTestResults: `HISP generates an XDR message with Limited Metadata from a Direct Message and forwards to Edge.`,

      headers: ['Vendor Role', 'Metadata Included'],
      tableData: [
        {
          cells: [
            { content: 'Sender (HISP - SUT)', type: 'text' },
            { content: 'Limited Metadata', type: 'text' },
          ],
        },
      ],

      actionLabel: 'RUN',
    },
    'Test Focus': 'XDR Send ',
    'Data Flow in Direct': 'HISP Sends an XDR message to Edge',
    'Metadata Included': 'Limited Metadata',
    'Direct Address Block': 'Included',
    'SUT: Sender/ Receiver': 'Sender (HISP - SUT)',
    'Test Tool: Sender / Receiver': 'Receiver (Test Tool)',
    'Purpose/Description':
      "Test Tool sends a Direct Message, which is translated to an XDR message and sent to the Edge.\nVerify that the HISP system can create an XDR message per the specification and forward to Edge. The validation report will be sent to the email address registered with the Direct address enter during setup. Direct To Address: SUT's receiving email endpoint for Direct/XDR translation, ETT to SUT workflow. The SUT will receive a message from testcase10@ett.healthit.gov",
    'Conformance  Test Details':
      'XDR Message Checklist + XDS Metadata Checklist for Limited Metadata Document Source + Direct XDR Checklist',
    'Expected Test Results':
      'HISP generates an XDR message with Limited Metadata from a Direct Message and forwards to Edge.',
    'Required / Conditional per Direct Edge Protocol Guide': 'R',
    'Direct Edge Protocol Guide 1.1 RTM Reference': 1.1,
    'Test Data IDs': null,
  },
  {
    name: 'XDR Test 11',
    id: 11,
    ID: '11',
    desc: 'Test Tool sends a Direct Message + XDM to the SUT.  The SUT must translate this to an XDR message with Limited Metadata and send it back to the Edge.\nVerify that the HISP system can create an XDR message per the specification and forward to Edge. The return endpoint is provided below. The validation report will be sent to the email address registered with the Direct address enter during setup.',
    sutEdge: false,
    sutHisp: true,
    sutRole: 'sender',
    criteria: "['h2-1','h2-3','sc2-1','sc2-3']",
    status: 'configure',
    inputs: [
      {
        name: 'Direct To Address',
        hoverlabel:
          "Direct To Address: SUT's receiving email endpoint for Direct/XDR translation, ETT to SUT workflow.",
        key: 'direct_to',
        type: 'string',
      },
    ],
    moreInfo: {
      subHeader: 'Description',
      subDesc: `Test Tool sends a Direct Message + XDM, which is translated to an XDR message with Limited Metadata and sent to the Edge.`,
      subDesc2: `Verify that the HISP system can create an XDR message per the specification and forward to Edge. The validation report will be sent to the email address registered with the Direct address enter during setup. Direct To Address: SUT's receiving email endpoint for Direct/XDR translation, ETT to SUT workflow. The SUT will receive a message from testcase11@ett.healthit.gov.`,

      expTestHeader: `Expected Test Results`,
      expTestResults: `HISP generates an XDR message with Limited Metadata from a Direct Message and forwards to Edge.`,

      headers: ['Vendor Role', 'Metadata Included'],
      tableData: [
        {
          cells: [
            { content: 'Sender (HISP - SUT)', type: 'text' },
            { content: 'Limited Metadata', type: 'text' },
          ],
        },
      ],

      actionLabel: 'RUN',
    },
    'Test Focus': 'XDR Send',
    'Data Flow in Direct': 'HISP Sends an XDR message to Edge with Limited Metadata',
    'Metadata Included': 'Limited Metadata',
    'Direct Address Block': 'Included',
    'SUT: Sender/ Receiver': 'Sender (HISP - SUT)',
    'Test Tool: Sender / Receiver': 'Receiver (Test Tool)',
    'Purpose/Description':
      "Test Tool sends a Direct Message + XDM, which is translated to an XDR message with Limited Metadata and sent to the Edge.\nVerify that the HISP system can create an XDR message per the specification and forward to Edge. The validation report will be sent to the email address registered with the Direct address enter during setup. Direct To Address: SUT's receiving email endpoint for Direct/XDR translation, ETT to SUT workflow. The SUT will receive a message from testcase11@ett.healthit.gov.",
    'Conformance  Test Details':
      'XDR Message Checklist + XDS Metadata Checklist for Limited Metadata Document Source + Direct XDR Checklist',
    'Expected Test Results':
      'HISP generates an XDR message with Limited Metadata from a Direct Message and forwards to Edge.',
    'Required / Conditional per Direct Edge Protocol Guide': 'R',
    'Direct Edge Protocol Guide 1.1 RTM Reference': 1.1,
    'Test Data IDs': null,
  },
  {
    name: 'XDR Test 12',
    id: 12,
    ID: '12',
    desc: 'Test Tool sends a Direct Message + XDM to the SUT.  The SUT must translate this to an XDR message with Full Metadata and send it back to the Edge.\nVerify that the HISP system can create an XDR message per the specification and forward to Edge. The return endpoint is provided below.The validation report will be sent to the email address registered with the Direct address enter during setup.',
    sutEdge: false,
    sutHisp: true,
    sutRole: 'sender',
    criteria: "['h2-1','h2-3','sc2-1','sc2-3']",
    status: 'configure',
    inputs: [
      {
        name: 'Direct To Address',
        hoverlabel:
          "Direct To Address: SUT's receiving email endpoint for Direct/XDR translation, ETT to SUT workflow.",
        key: 'direct_to',
        type: 'string',
      },
    ],
    moreInfo: {
      subHeader: 'Description',
      subDesc: `Test Tool sends a Direct Message + XDM, which is translated to an XDR message with Limited Metadata and sent to the Edge.`,
      subDesc2: `Verify that the HISP system can create an XDR message per the specification and forward to Edge. The validation report will be sent to the email address registered with the Direct address enter during setup. Direct To Address: SUT's receiving email endpoint for Direct/XDR translation, ETT to SUT workflow. The SUT will receive a message from testcase12@ett.healthit.gov.`,

      expTestHeader: `Expected Test Results`,
      expTestResults: `HISP generates an XDR message with Limited Metadata from a Direct Message and forwards to Edge.`,

      headers: ['Vendor Role', 'Metadata Included'],
      tableData: [
        {
          cells: [
            { content: 'Sender (HISP - SUT)', type: 'text' },
            { content: 'Limited Metadata', type: 'text' },
          ],
        },
      ],

      actionLabel: 'RUN',
    },
    'Test Focus': 'XDR Send',
    'Data Flow in Direct': 'HISP Sends an XDR message to Edge along with Full Metadata',
    'Metadata Included': 'Full Metadata',
    'Direct Address Block': 'Included',
    'SUT: Sender/ Receiver': 'Sender (HISP - SUT)',
    'Test Tool: Sender / Receiver': 'Receiver (Test Tool)',
    'Purpose/Description':
      "Test Tool sends a Direct Message + XDM, which is translated to an XDR message with Full Metadata and sent to the Edge.\nVerify that the HISP system can create an XDR message per the specification and forward to Edge. The validation report will be sent to the email address registered with the Direct address enter during setup. Direct To Address: SUT's receiving email endpoint for Direct/XDR translation, ETT to SUT workflow. The SUT will receive a message from testcase12@ett.healthit.gov.",
    'Conformance  Test Details':
      'XDR Message Checklist + XDS Metadata Checklist for Full Metadata Document Source + Direct XDR Checklist',
    'Expected Test Results':
      'HISP generates an XDR message with Full Metadata from a Direct Message and forwards to Edge.',
    'Required / Conditional per Direct Edge Protocol Guide': 'O',
    'Direct Edge Protocol Guide 1.1 RTM Reference': 1.1,
    'Test Data IDs': null,
  },
  {
    name: 'XDR Test 13',
    id: 13,
    ID: '13',
    desc: 'Before this test is run, the vendor must register a Direct Address / Contact address pairing using the Direct portion of the ETT tool.\nTest Tool sends an XDR Message with Limited metadata to the SUT (HISP).  The SUT must then translate the message into Direct and send it back to the ETT which is acting as the Destination HISP.  The Direct Address it passes the message along to must match the Direct Address that has been pre-registered.  A validation report will be sent to the Contact address.\nVerify that an HISP system can receive a properly formatted XDR message and translate to Direct Message.',
    sutEdge: false,
    sutHisp: true,
    sutRole: 'receiver',
    criteria: "['h2-2','h2-7','sc2-2','sc2-7']",
    inputs: [
      {
        name: 'Endpoint',
        hoverlabel: 'Receiving endpoint of the SUT for XDR SOAP messages.',
        key: 'targetEndpointTLS',
        type: 'string',
      },
      {
        name: 'Outgoing (ETT --> SUT) Direct From Address',
        hoverlabel: 'SUT (HISP) outgoing SMTP address.',
        key: 'outgoing_from',
        type: 'string',
      },
    ],
    moreInfo: {
      subHeader: 'Description',
      subDesc: `Test Tool sends an XDR Message to the HSIP which then translates the message to Direct and sends to the other HISP.`,
      subDesc2: `Verify that an HISP system can receive a properly formatted XDR message and translate to Direct Message.
      Note: When the SUT (HISP) receives the MDN (from the 'direct:to' and hence RCPT TO from the Direct communication), the MAIL FROM of the MDN will be 'direct:to' - since the 'direct:to' endpoint is sending the MAIL FROM. The ETT hardcodes 'direct:to' based on the test case, normally is not needed.`,
      expTestHeader: `Expected Test Results`,
      expTestResults: `HISP receives an XDR message and converts to a Direct + XDM Message.`,

      headers: ['Vendor Role', 'Metadata Included'],
      tableData: [
        {
          cells: [
            { content: 'Receiver', type: 'text' },
            { content: 'Limited Metadata', type: 'text' },
          ],
        },
      ],
      actionLabel: 'RUN',
    },
    'Test Focus': 'XDR Receive',
    'Data Flow in Direct': 'HISP receives an XDR message from the Edge',
    'Metadata Included': 'Limited Metadata',
    'Direct Address Block': 'Included',
    'SUT: Sender/ Receiver': 'Receiver (HISP - SUT)',
    'Test Tool: Sender / Receiver': 'Sender (Test Tool)',
    'Purpose/Description':
      "Test Tool sends an XDR Message to the HSIP which then translates the message to Direct and sends to the other HISP.\nVerify that an HISP system can receive a properly formatted XDR message and translate to Direct Message.\nNote: When the SUT (HISP) receives the MDN (from the 'direct:to' and hence RCPT TO from the Direct communication), the MAIL FROM of the MDN will be 'direct:to' - since the 'direct:to' endpoint is sending the MAIL FROM. The ETT hardcodes 'direct:to' based on the test case, normally is not needed.",
    'Conformance  Test Details':
      'XDR Message Checklist + XDS Metadata Checklist for Limited Metadata Document Source + Direct XDR Checklist',
    'Expected Test Results': 'HISP receives an XDR message and converts to a Direct + XDM Message.',
    'Required / Conditional per Direct Edge Protocol Guide': 'R',
    'Direct Edge Protocol Guide 1.1 RTM Reference': 1.1,
    'Test Data IDs': null,
  },
  {
    name: 'XDR MT Test 13',
    id: '32mu2',
    ID: '32mu2',
    desc: "Verify the ability of the SUT to appropriately respond to a delivery to a non-existent address.  ETT will send a message via XDR to the SUT.  If the SUT's final response is delivered synchronously, that message will be saved in the logs (click 'Logs').  If the SUT's final response is delivered asynchronously: 1) wait until the SUT's message has been sent and the ETT's response has been received, 2) click the Pending Refresh button to continue, 3) the logs for the asynchronous communication will then be available.  The proctor will read the logs for the synchronous communication or the asynchronous communication for an appropriate response. This test is part of the Message Tracking Using Processed MDN test suite.",
    sutEdge: false,
    sutHisp: true,
    sutRole: 'receiver',
    criteria: "['h2-3','sc2-3']",
    status: 'configure',
    inputs: [
      {
        name: 'Endpoint',
        hoverlabel: 'Receiving endpoint of the SUT for XDR SOAP messages.',
        key: 'targetEndpointTLS',
        type: 'string',
      },
      {
        name: 'Direct From Address',
        hoverlabel: 'SUT (HISP) outgoing SMTP address.',
        key: 'direct_from',
        type: 'string',
      },
      {
        name: 'Outgoing (ETT --> SUT) Direct From Address',
        key: 'outgoing_from',
        type: 'string',
      },
    ],
    moreInfo: {
      subHeader: 'Description',
      subDesc: `The ETT (as Edge) sends a message to the Health IT Module using a bad address, such that the Health IT Module is unable to deliver the message. The Health IT Module delivers a failure message to the ETT (as Edge) using the XDR profile due to a bad address.
      Note: When the SUT (HISP) receives the MDN (from the 'direct:to' and hence RCPT TO from the Direct communication), the MAIL FROM of the MDN will be 'direct:to' - since the 'direct:to' endpoint is sending the MAIL FROM. The ETT hardcodes 'direct:to' based on the test case, normally is not needed.`,
      subDesc2: `Outgoing (ETT --> SUT) Direct From Address:Note: MDN Direct from address in the 'direct:from' address the XDR MDN. ETT will use in creating the SOAP XDR transaction for this test. In turn this is destined to become the SMTP MAIL FROM for the ensuing Direct Communication between the SUT HISP to the ETT HISP (the 'direct:to' becomes the RCPT TO).`,

      expTestHeader: `Expected Test Results`,
      expTestResults: `The message disposition must indicate a failure.`,

      headers: ['Vendor Role', 'Metadata Included'],
      tableData: [
        {
          cells: [
            { content: 'Client (HISP - SUT)', type: 'text' },
            { content: 'N/A', type: 'text' },
          ],
        },
      ],

      actionLabel: 'RUN',
    },
    'Test Focus': 'XDR Receive',
    'Data Flow in Direct': 'HISP receives an XDR message from the Edge',
    'Metadata Included': 'N/A',
    'Direct Address Block': 'Included',
    'SUT: Sender/ Receiver': 'Receiver (HISP - SUT)',
    'Test Tool: Sender / Receiver': 'Sender (Test Tool)',
    'Purpose/Description':
      "The ETT (as Edge) sends a message to the Health IT Module using a bad address, such that the Health IT Module is unable to deliver the message. The Health IT Module delivers a failure message to the ETT (as Edge) using the XDR profile due to a bad address. \n Note: When the SUT (HISP) receives the MDN (from the 'direct:to' and hence RCPT TO from the Direct communication), the MAIL FROM of the MDN will be 'direct:to' - since the 'direct:to' endpoint is sending the MAIL FROM. The ETT hardcodes 'direct:to' based on the test case, normally is not needed. \n Outgoing (ETT --> SUT) Direct From Address:Note: MDN Direct from address in the 'direct:from' address the XDR MDN. ETT will use in creating the SOAP XDR transaction for this test. In turn this is destined to become the SMTP MAIL FROM for the ensuing Direct Communication between the SUT HISP to the ETT HISP (the 'direct:to' becomes the RCPT TO).",
    'Conformance  Test Details':
      "Conforms to section 1.5.2.1.1 of the Direct Edge Protocol Implementation Guide 1.1, including an appropriately filled 'direct:disposition' element in the XML payload",
    'Expected Test Results': 'The message disposition must indicate a failure.',
    'Required / Conditional per Direct Edge Protocol Guide': 'R',
    'Direct Edge Protocol Guide 1.1 RTM Reference': 1.1,
    'Test Data IDs': null,
  },
  {
    name: 'XDR Test 14',
    id: 14,
    ID: '14',
    desc: 'Before this test is run, the vendor must register a Direct Address / Contact address pairing using the Direct portion of the ETT tool.\nTest Tool sends an XDR Message with Full (XDS) metadata to the SUT (HISP).  The SUT must then translate the message into Direct and send it back to the ETT which is acting as the Destination HISP.  The Direct Address it passes the message along to must match the Direct Address that has been pre-registered.  A validation report will be sent to the Contact address.\nVerify that an HISP system can receive a properly formatted XDR message and translate to Direct Message.',
    sutEdge: false,
    sutHisp: true,
    sutRole: 'receiver',
    criteria: "['h2-2','h2-7','sc2-2','sc2-7']",
    inputs: [
      {
        name: 'Endpoint',
        hoverlabel: 'Receiving endpoint of the SUT for XDR SOAP messages.',
        key: 'targetEndpointTLS',
        type: 'string',
      },
      {
        name: 'Outgoing (ETT --> SUT) Direct From Address',
        hoverlabel: 'SUT (HISP) outgoing SMTP address.',
        key: 'outgoing_from',
        type: 'string',
      },
    ],
    moreInfo: {
      subHeader: 'Description',
      subDesc: `Test Tool sends an XDR Message with Full Metadata to the HSIP which then translates the message to Direct and sends to the other HISP.
      Verify that an HISP system can receive a properly formatted XDR message and translate to Direct Message.`,
      subDesc2: `Note: When the SUT (HISP) receives the MDN (from the 'direct:to' and hence RCPT TO from the Direct communication), the MAIL FROM of the MDN will be 'direct:to' - since the 'direct:to' endpoint is sending the MAIL FROM. The ETT hardcodes 'direct:to' based on the test case, normally is not needed.`,
      expTestHeader: `Expected Test Results`,
      expTestResults: `HISP receives an XDR message and converts to a Direct Message.`,

      headers: ['Vendor Role', 'Metadata Included'],
      tableData: [
        {
          cells: [
            { content: 'Receiver (HISP - SUT)', type: 'text' },
            { content: 'Full Metadata', type: 'text' },
          ],
        },
      ],
      actionLabel: 'RUN',
    },
    'Test Focus': 'XDR Receive',
    'Data Flow in Direct': 'HISP receives an XDR message from the Edge along with Full Metadata',
    'Metadata Included': 'Full Metadata',
    'Direct Address Block': 'Included',
    'SUT: Sender/ Receiver': 'Receiver (HISP - SUT)',
    'Test Tool: Sender / Receiver': 'Sender (Test Tool)',
    'Purpose/Description':
      "Test Tool sends an XDR Message with Full Metadata to the HSIP which then translates the message to Direct and sends to the other HISP.\nVerify that an HISP system can receive a properly formatted XDR message and translate to Direct Message.\nNote: When the SUT (HISP) receives the MDN (from the 'direct:to' and hence RCPT TO from the Direct communication), the MAIL FROM of the MDN will be 'direct:to' - since the 'direct:to' endpoint is sending the MAIL FROM. The ETT hardcodes 'direct:to' based on the test case, normally is not needed.",
    'Conformance  Test Details':
      'XDR Message Checklist + XDS Metadata Checklist for Full Metadata Document Source + Direct XDR Checklist',
    'Expected Test Results': 'HISP receives an XDR message and converts to a Direct Message.',
    'Required / Conditional per Direct Edge Protocol Guide': 'O',
    'Direct Edge Protocol Guide 1.1 RTM Reference': 1.1,
    'Test Data IDs': null,
  },
  {
    name: 'XDR MT Test 14',
    id: '33mu2',
    ID: '33mu2',
    desc: "Verify the ability of the SUT to appropriately respond to a delivery to an untrusted HISP.  ETT will send a message via XDR to the SUT.  If the SUT's final response is delivered synchronously, that message will be saved in the logs (click 'Logs').  If the SUT's final response is delivered asynchronously: 1) wait until the SUT's message has been sent and the ETT's response has been received, 2) click the Pending Refresh button to continue, 3) the logs for the asynchronous communication will then be available.  The proctor will read the logs for the synchronous communication or the asynchronous communication for an appropriate response. This test is part of the Message Tracking Using Processed MDN test suite.",
    sutEdge: false,
    sutHisp: true,
    sutRole: 'receiver',
    criteria: "['h2-3','sc2-3']",
    status: 'configure',
    inputs: [
      {
        name: 'Endpoint',
        hoverlabel: 'Receiving endpoint of the SUT for XDR SOAP messages.',
        key: 'targetEndpointTLS',
        type: 'string',
      },
      {
        name: 'Direct From Address',
        hoverlabel: 'SUT (HISP) outgoing SMTP address.',
        key: 'direct_from',
        type: 'string',
      },
      {
        name: 'Outgoing (ETT --> SUT) Direct From Address',
        key: 'outgoing_from',
        type: 'string',
      },
    ],
    moreInfo: {
      subHeader: 'Description',
      subDesc: `The ETT (as Edge) sends a message to the Health IT Module using a bad address, such that the Health IT Module is unable to deliver the message. The Health IT Module delivers a failure message to the ETT (as Edge) using the XDR profile due to a bad address.
      Note: When the SUT (HISP) receives the MDN (from the 'direct:to' and hence RCPT TO from the Direct communication), the MAIL FROM of the MDN will be 'direct:to' - since the 'direct:to' endpoint is sending the MAIL FROM. The ETT hardcodes 'direct:to' based on the test case, normally is not needed.`,
      subDesc2: `Outgoing (ETT --> SUT) Direct From Address:Note: MDN Direct from address in the 'direct:from' address the XDR MDN. ETT will use in creating the SOAP XDR transaction for this test. In turn this is destined to become the SMTP MAIL FROM for the ensuing Direct Communication between the SUT HISP to the ETT HISP (the 'direct:to' becomes the RCPT TO).`,

      expTestHeader: `Expected Test Results`,
      expTestResults: `The message disposition must indicate a failure.`,

      headers: ['Vendor Role', 'Metadata Included'],
      tableData: [
        {
          cells: [
            { content: 'Client (HISP - SUT)', type: 'text' },
            { content: 'N/A', type: 'text' },
          ],
        },
      ],

      actionLabel: 'RUN',
    },
    'Test Focus': 'XDR Receive',
    'Data Flow in Direct':
      'The ETT (as Edge) sends a message to the Health IT Module using a valid address, but the ETT (as Destination HISP) is not trusted.',
    'Metadata Included': 'N/A',
    'Direct Address Block': 'Included',
    'SUT: Sender/ Receiver': 'Receiver (HISP - SUT)',
    'Test Tool: Sender / Receiver': 'Sender (Test Tool)',
    'Purpose/Description':
      "The ETT (as Edge) sends a message to the Health IT Module using a valid address, but the ETT (as Destination HISP) is not trusted. \n Note: When the SUT (HISP) receives the MDN (from the 'direct:to' and hence RCPT TO from the Direct communication), the MAIL FROM of the MDN will be 'direct:to' - since the 'direct:to' endpoint is sending the MAIL FROM. The ETT hardcodes 'direct:to' based on the test case, normally is not needed. \n Outgoing (ETT --> SUT) Direct From Address:Note: MDN Direct from address in the 'direct:from' address the XDR MDN. ETT will use in creating the SOAP XDR transaction for this test. In turn this is destined to become the SMTP MAIL FROM for the ensuing Direct Communication between the SUT HISP to the ETT HISP (the 'direct:to' becomes the RCPT TO).",
    'Conformance  Test Details': 'Conforms to section 1.5.2.1.1 of the Direct Edge Protocol Implementation Guide 1.1',
    'Expected Test Results':
      'The Health IT Module delivers a failure message to the ETT (as Edge) using the XDR profile due to an untrusted HISP (ETT as Destination HISP)',
    'Required / Conditional per Direct Edge Protocol Guide': 'R',
    'Direct Edge Protocol Guide 1.1 RTM Reference': 1.1,
    'Test Data IDs': null,
  },
  {
    name: 'XDR Test 15a',
    id: '15a',
    ID: '15a',
    desc: 'Verify the ability of the receiving system to appropriately respond to a malformed message. This test is for an invalid SOAP header.',
    sutEdge: false,
    criteria: "['h2-7']",
    sutHisp: true,
    sutRole: 'receiver',
    inputs: [
      {
        name: 'Endpoint',
        hoverlabel: 'Receiving endpoint of the SUT for XDR SOAP messages',
        key: 'targetEndpointTLS',
        type: 'string',
      },
    ],
    moreInfo: {
      subHeader: 'Description',
      subDesc: `Verify that the HISP system throws an error when an incorrect message is received.`,
      expTestHeader: `Expected Test Results`,
      expTestResults: `HISP should validate the messages per the specification and reject the bad messages`,

      headers: ['Vendor Role', 'Metadata Included'],
      tableData: [
        {
          cells: [
            { content: 'Receiver (HISP - SUT)', type: 'text' },
            { content: 'Limited Metadata', type: 'text' },
          ],
        },
      ],
      actionLabel: 'RUN',
    },
    'Test Focus': 'XDR Receive',
    'Data Flow in Direct': 'HISP receives an incorrect XDR message from the Edge',
    'Metadata Included': 'Limited Metadata',
    'Direct Address Block': 'Included',
    'SUT: Sender/ Receiver': 'Receiver (HISP - SUT)',
    'Test Tool: Sender / Receiver': 'Sender (Test Tool)',
    'Purpose/Description': 'Verify that the HISP system throws an error when an incorrect message is received.',
    'Conformance  Test Details': 'Create an incorrect message with invalid SOAP envelope details',
    'Expected Test Results': 'HISP should validate the messages per the specification and reject the bad messages',
    'Required / Conditional per Direct Edge Protocol Guide ': 'R',
    'Direct Edge Protocol Guide 1.1 RTM Reference ': 1.1,
    'Test Data IDs ': null,
  },
  {
    name: 'XDR Test 15b',
    id: '15b',
    ID: '15b',
    desc: 'Verify the ability of the receiving system to appropriately respond to a malformed message. This test is for an invalid SOAP body.',
    sutEdge: false,
    criteria: "['h2-7']",
    sutHisp: true,
    sutRole: 'receiver',
    inputs: [
      {
        name: 'Endpoint',
        hoverlabel: 'Receiving endpoint of the SUT for XDR SOAP messages',
        key: 'targetEndpointTLS',
        type: 'string',
      },
    ],
    moreInfo: {
      subHeader: 'Description',
      subDesc: `Verify the ability of the SUT to appropriately respond to a delivery to a HISP which does not have a published certificate.
      Note: When the SUT (HISP) receives the MDN (from the 'direct:to' and hence RCPT TO from the Direct communication), the MAIL FROM of the MDN will be 'direct:to' - since the 'direct:to' endpoint is sending the MAIL FROM. The ETT hardcodes 'direct:to' based on the test case, normally is not needed.`,
      subDesc2: `Outgoing (ETT --> SUT) Direct From Address:Note: MDN Direct from address in the 'direct:from' address the XDR MDN. ETT will use in creating the SOAP XDR transaction for this test. In turn this is destined to become the SMTP MAIL FROM for the ensuing Direct Communication between the SUT HISP to the ETT HISP (the 'direct:to' becomes the RCPT TO).`,
      expTestHeader: `Expected Test Results`,
      expTestResults: `The SUT will respond with a message that conforms to section 1.5.2.1.1 of the Direct Edge Protocol Implementation Guide 1.1`,

      headers: ['Vendor Role', 'Metadata Included'],
      tableData: [
        {
          cells: [
            { content: 'Receiver (HISP - SUT)', type: 'text' },
            { content: 'Limited Metadata', type: 'text' },
          ],
        },
      ],
      actionLabel: 'RUN',
    },
    'Test Focus': 'XDR Receive',
    'Data Flow in Direct': 'HISP receives an incorrect XDR message from the Edge',
    'Metadata Included': 'Limited Metadata',
    'Direct Address Block': 'Included',
    'SUT: Sender/ Receiver': 'Receiver (HISP - SUT)',
    'Test Tool: Sender / Receiver': 'Sender (Test Tool)',
    'Purpose/Description': 'Verify that the HISP system throws an error when an incorrect message is received.',
    'Conformance  Test Details': 'Create an incorrect message with invalid SOAP body details',
    'Expected Test Results': 'HISP should validate the messages per the specification and reject the bad messages',
    'Required / Conditional per Direct Edge Protocol Guide ': 'R',
    'Direct Edge Protocol Guide 1.1 RTM Reference ': 1.1,
    'Test Data IDs ': null,
  },
  {
    name: 'XDR MT Test 15',
    id: '34mu2',
    ID: '34mu2',
    desc: "Verify the ability of the SUT to appropriately respond to a delivery to a HISP which does not have a published certificate.  ETT will send a message via XDR to the SUT.  If the SUT's final response is delivered synchronously, that message will be saved in the logs (click 'Logs').  If the SUT's final response is delivered asynchronously: 1) wait until the SUT's message has been sent and the ETT's response has been received, 2) click the Pending Refresh button to continue, 3) the logs for the asynchronous communication will then be available.  The proctor will read the logs for the synchronous communication or the asynchronous communication for an appropriate response. This test is part of the Message Tracking Using Processed MDN test suite.",
    sutEdge: false,
    sutHisp: true,
    sutRole: 'receiver',
    criteria: "['h2-3','sc2-3']",
    status: 'configure',
    inputs: [
      {
        name: 'Endpoint',
        hoverlabel: 'Receiving endpoint of the SUT for XDR SOAP messages.',
        key: 'targetEndpointTLS',
        type: 'string',
      },
      {
        name: 'Direct From Address',
        hoverlabel: 'SUT (HISP) outgoing SMTP address.',
        key: 'direct_from',
        type: 'string',
      },
      {
        name: 'Outgoing (ETT --> SUT) Direct From Address',
        key: 'outgoing_from',
        type: 'string',
      },
    ],
    moreInfo: {
      subHeader: 'Description',
      subDesc: `Verify the ability of the SUT to appropriately respond to a delivery to a HISP which does not have a published certificate.
      Note: When the SUT (HISP) receives the MDN (from the 'direct:to' and hence RCPT TO from the Direct communication), the MAIL FROM of the MDN will be 'direct:to' - since the 'direct:to' endpoint is sending the MAIL FROM. The ETT hardcodes 'direct:to' based on the test case, normally is not needed.`,
      subDesc2: `Outgoing (ETT --> SUT) Direct From Address:Note: MDN Direct from address in the 'direct:from' address the XDR MDN. ETT will use in creating the SOAP XDR transaction for this test. In turn this is destined to become the SMTP MAIL FROM for the ensuing Direct Communication between the SUT HISP to the ETT HISP (the 'direct:to' becomes the RCPT TO).`,
      expTestHeader: `Expected Test Results`,
      expTestResults: `The SUT will respond with a message that conforms to section 1.5.2.1.1 of the Direct Edge Protocol Implementation Guide 1.1`,

      headers: ['Vendor Role', 'Metadata Included'],
      tableData: [
        {
          cells: [
            { content: 'Receiver (HISP - SUT)', type: 'text' },
            { content: 'Limited Metadata', type: 'text' },
          ],
        },
      ],
      actionLabel: 'RUN',
    },
    'Test Focus': 'XDR Receive',
    'Data Flow in Direct': 'HISP receives an XDR message from the Edge',
    'Metadata Included': 'N/A',
    'Direct Address Block': 'Included',
    'SUT: Sender/ Receiver': 'Receiver (HISP - SUT)',
    'Test Tool: Sender / Receiver': 'Sender (Test Tool)',
    'Purpose/Description':
      "Verify the ability of the SUT to appropriately respond to a delivery to a HISP which does not have a published certificate. \n Note: When the SUT (HISP) receives the MDN (from the 'direct:to' and hence RCPT TO from the Direct communication), the MAIL FROM of the MDN will be 'direct:to' - since the 'direct:to' endpoint is sending the MAIL FROM. The ETT hardcodes 'direct:to' based on the test case, normally is not needed. \n Outgoing (ETT --> SUT) Direct From Address:Note: MDN Direct from address in the 'direct:from' address the XDR MDN. ETT will use in creating the SOAP XDR transaction for this test. In turn this is destined to become the SMTP MAIL FROM for the ensuing Direct Communication between the SUT HISP to the ETT HISP (the 'direct:to' becomes the RCPT TO).",
    'Conformance  Test Details':
      'Create and send a valid XDR message, with a valid destination with an unpublished certificate',
    'Expected Test Results':
      'The SUT will respond with a message that conforms to section 1.5.2.1.1 of the Direct Edge Protocol Implementation Guide 1.1',
    'Required / Conditional per Direct Edge Protocol Guide': 'R',
    'Direct Edge Protocol Guide 1.1 RTM Reference': 1.1,
    'Test Data IDs': null,
  },
  {
    name: 'XDR Test 16',
    id: 16,
    ID: '16',
    desc: 'Verify that Mutual TLS session is established between the Sender and the Receiver before transimitting data.',
    sutEdge: false,
    criteria: "['h2-3','sc2-3']",
    sutHisp: true,
    sutRole: 'sender',
    inputs: [
      {
        name: 'Direct From Address',
        hoverlabel: 'Direct From Address: SUT (HISP) outgoing SMTP address (or) MDN.',
        key: 'direct_from',
        type: 'string',
      },
    ],
    moreInfo: {
      subHeader: 'Description',
      subDesc: `Verify that Mutual TLS session is established between the Sender and the Receiver before transimitting data.`,
      expTestHeader: `Expected Test Results`,
      expTestResults: `HISP should initiate a connection to the Edge using Mutual TLS correctly.`,

      headers: ['Vendor Role', 'Metadata Included'],
      tableData: [
        {
          cells: [
            { content: 'Client (HISP - SUT)', type: 'text' },
            { content: 'N/A', type: 'text' },
          ],
        },
      ],

      actionLabel: 'RUN',
    },
    'Test Focus': 'Authentication',
    'Data Flow in Direct': 'HISP uses Mutual TLS to authenticate to the Edge',
    'Metadata Included': 'N/A',
    'Direct Address Block': 'N/A',
    'SUT: Sender/ Receiver': 'Client (HISP - SUT)',
    'Test Tool: Sender / Receiver': 'Server (Test Tool)',
    'Purpose/Description':
      'Verify that Mutual TLS session is established between the Sender and the Receiver before transimitting data.',
    'Conformance  Test Details': 'Require Mutual TLS in the configuration',
    'Expected Test Results': 'HISP should initiate a connection to the Edge using Mutual TLS correctly.',
    'Required / Conditional per Direct Edge Protocol Guide': 'R',
    'Direct Edge Protocol Guide 1.1 RTM Reference': 1.1,
    'Test Data IDs': null,
  },
  {
    name: 'XDR MT Test 16',
    id: '35mu2',
    ID: '35mu2',
    desc: "Verify the ability of the SUT to appropriately respond in the event of a lack of a Processed MDN. ETT will send a message via XDR to the SUT.  If the SUT's final response is delivered synchronously, that message will be saved in the logs (click 'Logs').  If the SUT's final response is delivered asynchronously: 1) wait until the SUT's message has been sent and the ETT's response has been received, 2) click the Pending Refresh button to continue, 3) the logs for the asynchronous communication will then be available.  The proctor will read the logs for the synchronous communication or the asynchronous communication for an appropriate response. This test is part of the Message Tracking Using Processed MDN test suite.",
    sutEdge: false,
    sutHisp: true,
    sutRole: 'receiver',
    criteria: "['h2-3']",
    status: 'configure',
    inputs: [
      {
        name: 'Endpoint',
        hoverlabel: 'Receiving endpoint of the SUT for XDR SOAP messages.',
        key: 'targetEndpointTLS',
        type: 'string',
      },
      {
        name: 'Direct From Address',
        hoverlabel: 'SUT (HISP) outgoing SMTP address.',
        key: 'direct_from',
        type: 'string',
      },
      {
        name: 'Outgoing (ETT --> SUT) Direct From Address',
        key: 'outgoing_from',
        type: 'string',
      },
    ],
    moreInfo: {
      subHeader: 'Description',
      subDesc: `Verify the ability of the SUT to appropriately respond to a delivery to a HISP due to an extended wait period using an XDR profile.
      Note: When the SUT (HISP) receives the MDN (from the 'direct:to' and hence RCPT TO from the Direct communication), the MAIL FROM of the MDN will be 'direct:to' - since the 'direct:to' endpoint is sending the MAIL FROM. The ETT hardcodes 'direct:to' based on the test case, normally is not needed.`,
      subDesc2: `Outgoing (ETT --> SUT) Direct From Address:Note: MDN Direct from address in the 'direct:from' address the XDR MDN. ETT will use in creating the SOAP XDR transaction for this test. In turn this is destined to become the SMTP MAIL FROM for the ensuing Direct Communication between the SUT HISP to the ETT HISP (the 'direct:to' becomes the RCPT TO).`,
      expTestHeader: `Expected Test Results`,
      expTestResults: `The SUT will respond with a message that conforms to section 1.5.2.1.1 of the Direct Edge Protocol Implementation Guide 1.1`,

      headers: ['Vendor Role', 'Metadata Included'],
      tableData: [
        {
          cells: [
            { content: 'Receiver (HISP - SUT)', type: 'text' },
            { content: 'Limited Metadata', type: 'text' },
          ],
        },
      ],
      actionLabel: 'RUN',
    },

    'Test Focus': 'XDR Receive',
    'Data Flow in Direct': 'HISP receives an XDR message from the Edge',
    'Metadata Included': 'N/A',
    'Direct Address Block': 'Included',
    'SUT: Sender/ Receiver': 'Receiver (HISP - SUT)',
    'Test Tool: Sender / Receiver': 'Sender (Test Tool)',
    'Purpose/Description':
      "Verify the ability of the SUT to appropriately respond to a delivery to a HISP due to an extended wait period using an XDR profile. \n Note: When the SUT (HISP) receives the MDN (from the 'direct:to' and hence RCPT TO from the Direct communication), the MAIL FROM of the MDN will be 'direct:to' - since the 'direct:to' endpoint is sending the MAIL FROM. The ETT hardcodes 'direct:to' based on the test case, normally is not needed. \n Outgoing (ETT --> SUT) Direct From Address:Note: MDN Direct from address in the 'direct:from' address the XDR MDN. ETT will use in creating the SOAP XDR transaction for this test. In turn this is destined to become the SMTP MAIL FROM for the ensuing Direct Communication between the SUT HISP to the ETT HISP (the 'direct:to' becomes the RCPT TO).",
    'Conformance  Test Details':
      'Create and send a valid XDR message, with a valid destination with an extended wait period, time-out scenario, failure message.',
    'Expected Test Results':
      'The SUT will respond with a message that conforms to section 1.5.2.1.1 of the Direct Edge Protocol Implementation Guide 1.1',
    'Required / Conditional per Direct Edge Protocol Guide': 'R',
    'Direct Edge Protocol Guide 1.1 RTM Reference': 1.1,
    'Test Data IDs': null,
  },
  {
    name: 'XDR Test 17',
    id: 17,
    ID: '17',
    desc: 'Verify that HISP disconnects when the Server provided certificate is invalid.  Only the IP address of the SUT shall be entered below.  As this is a socket based test, the full endpoint is not required.  Only the  IP Address and port are needed and provided.',
    sutEdge: false,
    sutHisp: true,
    sutRole: 'sender',
    criteria: "['h2-3']",
    inputs: [
      {
        name: 'IP Address',
        hoverlabel: 'IP Address (eg: 202.255.24.62)',
        key: 'ip_address',
        type: 'string',
      },
    ],
    moreInfo: {
      subHeader: 'Description',
      subDesc: `Verify that HISP disconnects when the Server provided certificate is invalid.`,
      expTestHeader: `Expected Test Results`,
      expTestResults: `HISP should disconnect when the certificate from the edge is bad.`,

      headers: ['Vendor Role', 'Metadata Included'],
      tableData: [
        {
          cells: [
            { content: 'Client (HISP - SUT)', type: 'text' },
            { content: 'N/A', type: 'text' },
          ],
        },
      ],

      actionLabel: 'RUN',
    },
    'Test Focus': 'Authentication',
    'Data Flow in Direct': 'HISP uses Mutual TLS to authenticate to the Edge exception case',
    'Metadata Included': 'N/A',
    'Direct Address Block': 'N/A',
    'SUT: Sender/ Receiver': 'Client (HISP - SUT)',
    'Test Tool: Sender / Receiver': 'Server (Test Tool)',
    'Purpose/Description': 'Verify that HISP disconnects when the Server provided certificate is invalid.',
    'Conformance  Test Details': 'Incorrect Mutual TLS configuration should not proceed.',
    'Expected Test Results': 'HISP should disconnect when the certificate from the edge is bad.',
    'Required / Conditional per Direct Edge Protocol Guide': 'R',
    'Direct Edge Protocol Guide 1.1 RTM Reference': 1.1,
    'Test Data IDs': null,
  },
  {
    name: 'XDR Test 18',
    id: 18,
    ID: '18',
    desc: 'Test Tool authenticates with the HISP using Mutual TLS correctly. Certificates for this testing tool can be downloaded from the top of this page. This is a socket-level test, the full endpoint is not required. Enter only the  IP Address and port below.',
    sutEdge: false,
    criteria: "['h2-7']",
    sutHisp: true,
    sutRole: 'receiver',
    inputs: [
      {
        name: 'IP Address',
        hoverlabel: 'IP Address (eg: 202.255.24.62)',
        key: 'ip_address',
        type: 'string',
      },
      {
        name: 'Port',
        key: 'port',
        type: 'string',
      },
    ],
    moreInfo: {
      subHeader: 'Description',
      subDesc: `Test Tool authenticates with the HISP using Mutual TLS correctly`,
      expTestHeader: `Expected Test Results`,
      expTestResults: `	HISP should accept a connection from the Edge for Mutual TLS correctly.`,

      headers: ['Vendor Role', 'Metadata Included'],
      tableData: [
        {
          cells: [
            { content: 'Server (HISP - SUT)', type: 'text' },
            { content: 'N/A', type: 'text' },
          ],
        },
      ],
      actionLabel: 'RUN',
    },
    'Test Focus': 'Authentication',
    'Data Flow in Direct': 'Edge authenticates to the HISP using Mutual TLS',
    'Metadata Included': 'N/A',
    'Direct Address Block': 'N/A',
    'SUT: Sender/ Receiver': 'Server (HISP - SUT)',
    'Test Tool: Sender / Receiver': 'Client (Test Tool)',
    'Purpose/Description': 'Test Tool authenticates with the HISP using Mutual TLS correctly',
    'Conformance  Test Details': 'Require Mutual TLS in the configuration in the Edge system',
    'Expected Test Results': 'HISP should accept a connection from the Edge for Mutual TLS correctly.',
    'Required / Conditional per Direct Edge Protocol Guide': 'R',
    'Direct Edge Protocol Guide 1.1 RTM Reference': 1.1,
    'Test Data IDs': null,
  },
  {
    name: 'XDR Test 19',
    id: 19,
    ID: '19',
    desc: 'Test Tool authenticates with the HISP using bad certificates. The SUT is expected to disconnect before any meaningful data is sent. Certificates for this testing tool can be downloaded from the top of this page. This is a socket-level test, the full endpoint is not required. Enter only the  IP Address and port below.',
    sutEdge: false,
    sutHisp: true,
    criteria: "['h2-7']",
    sutRole: 'receiver',
    inputs: [
      {
        name: 'IP Address',
        hoverlabel: 'IP Address (eg: 202.255.24.62)',
        key: 'ip_address',
        type: 'string',
      },
      {
        name: 'Port',
        key: 'port',
        type: 'string',
      },
    ],
    moreInfo: {
      subHeader: 'Description',
      subDesc: `Test Tool authenticates with the HISP using bad certificates`,
      expTestHeader: `Expected Test Results`,
      expTestResults: `HISP should disconnect when the certificate from the edge is bad.`,

      headers: ['Vendor Role', 'Metadata Included'],
      tableData: [
        {
          cells: [
            { content: 'Server (HISP - SUT)', type: 'text' },
            { content: 'N/A', type: 'text' },
          ],
        },
      ],
      actionLabel: 'RUN',
    },
    'Test Focus': 'Authentication',
    'Data Flow in Direct': 'Edge authenticates to the HISP using Mutual TLS exception case',
    'Metadata Included': 'N/A',
    'Direct Address Block': 'N/A',
    'SUT: Sender/ Receiver': 'Server (HISP - SUT)',
    'Test Tool: Sender / Receiver': 'Client (Test Tool)',
    'Purpose/Description': 'Test Tool authenticates with the HISP using bad certificates',
    'Conformance  Test Details': 'Incorrect Mutual TLS configuration should not proceed.',
    'Expected Test Results': 'HISP should disconnect when the certificate from the edge is bad.',
    'Required / Conditional per Direct Edge Protocol Guide': 'R',
    'Direct Edge Protocol Guide 1.1 RTM Reference': 1.1,
    'Test Data IDs': null,
  },
  {
    name: 'XDR MT Test 19',
    id: '19mu2',
    ID: '19mu2',
    desc: "Verifies the ability of the sending system to send messages with unique message-IDs. Hit 'RUN' and then the sending system will send three messages with unique identifiers to the endpoint provided. When all three messages have been completely sent, press the 'Pending Refresh' button.",
    sutEdge: true,
    sutHisp: false,
    sutRole: 'sender',
    inputs: [
      {
        name: 'Direct From Address',
        hoverlabel: 'Direct From Address: SUT (HISP) outgoing SMTP address (or) MDN.',
        key: 'direct_from',
        type: 'string',
      },
    ],
    'Test Focus': '',
    'Data Flow in Direct': '',
    'Metadata Included': 'N/A',
    'Direct Address Block': 'N/A',
    'SUT: Sender/ Receiver': 'Sender (Edge - SUT)',
    'Test Tool: Sender / Receiver': '',
    'Purpose/Description':
      'Test to validate that the Edge system is able to create messages with unique message id for XDR profile.',
    'Conformance  Test Details': '',
    'Expected Test Results': 'Edge system creates each message with a unique message id with no duplicates.',
    'Required / Conditional per Direct Edge Protocol Guide': 'R',
    'Direct Edge Protocol Guide 1.1 RTM Reference': 1.1,
    'Test Data IDs': null,
  },
  {
    name: 'XDR MT Test 20a',
    id: '20amu2',
    ID: '20mu2',
    desc: 'Verifies the ability of the sending system to initiate an XDR transaction to ETT and to receive a positive (success) delivery status notification. The test lab will inspect the SUT logs and system to verify that the response was handled appropriately.',
    sutEdge: true,
    sutHisp: false,
    sutRole: 'sender',
    criteria: "['b1-1','su1-1']",
    status: 'configure',
    inputs: [
      {
        name: 'Direct From Address',
        hoverlabel: 'Direct From Address: SUT (HISP) outgoing SMTP address (or) MDN.',
        key: 'direct_from',
        type: 'string',
      },
      {
        name: 'Endpoint',
        hoverlabel: 'Receiving endpoint of the SUT for XDR SOAP messages',
        key: 'targetEndpointTLS',
        type: 'string',
      },
    ],
    moreInfo: {
      headers: ['Vendor Role', 'Metadata Included'],
      tableData: [
        {
          cells: [
            { content: 'Sender (EDGE - SUT)', type: 'text' },
            { content: 'N/A', type: 'text' },
          ],
        },
      ],
    },
    expectedMDN: true,
    'Test Focus': '',
    'Data Flow in Direct': '',
    'Metadata Included': 'N/A',
    'Direct Address Block': 'N/A',
    'SUT: Sender/ Receiver': 'Sender (Edge - SUT)',
    'Test Tool: Sender / Receiver': '',
    'Purpose/Description':
      'The SUT should send the test message to Testcase20a@ett.healthit.gov. This is a preconfigured address and designed to accommodate the variety of Systems that are testing with minimal user input. The users will see a message from the ETT to allow easy recognition.',
    'Conformance  Test Details': '',
    'Expected Test Results': 'Edge system receives and processes a positive (success) delivery status notification.',
    'Required / Conditional per Direct Edge Protocol Guide': 'R',
    'Direct Edge Protocol Guide 1.1 RTM Reference': 1.1,
    'Test Data IDs': null,
  },
  {
    name: 'XDR MT Test 20b',
    id: '20bmu2',
    ID: '20bmu2',
    desc: 'Verifies the ability of the sending system to initiate an XDR transaction to ETT and to receive negative (failure) delivery status notification. The test lab will inspect the SUT logs and system to verify that the response was handled appropriately.',
    sutEdge: true,
    sutHisp: false,
    sutRole: 'sender',
    criteria: "['b1-1','su1-1']",
    status: 'configure',
    inputs: [
      {
        name: 'Direct From Address',
        hoverlabel: 'Direct From Address: SUT (HISP) outgoing SMTP address (or) MDN.',
        key: 'direct_from',
        type: 'string',
      },
      {
        name: 'Endpoint',
        hoverlabel: 'Receiving endpoint of the SUT for XDR SOAP messages',
        key: 'targetEndpointTLS',
        type: 'string',
      },
    ],
    moreInfo: {
      headers: ['Vendor Role', 'Metadata Included'],
      tableData: [
        {
          cells: [
            { content: 'Sender (EDGE - SUT)', type: 'text' },
            { content: 'N/A', type: 'text' },
          ],
        },
      ],
    },
    expectedMDN: true,
    'Test Focus': '',
    'Data Flow in Direct': '',
    'Metadata Included': 'N/A',
    'Direct Address Block': 'N/A',
    'SUT: Sender/ Receiver': 'Sender (Edge - SUT)',
    'Test Tool: Sender / Receiver': '',
    'Purpose/Description':
      'The SUT should send the test message to Testcase20b@ett.healthit.gov. This is a preconfigured address and designed to accommodate the variety of Systems that are testing with minimal user input. The users will see a message from the ETT to allow easy recognition.',
    'Conformance  Test Details': '',
    'Expected Test Results': 'Edge system receives and processes a negative (failure) delivery status notification..',
    'Required / Conditional per Direct Edge Protocol Guide': 'R',
    'Direct Edge Protocol Guide 1.1 RTM Reference': 1.1,
    'Test Data IDs': null,
  },
  {
    name: 'XDR MT Test 30',
    id: '30mu2',
    ID: '30mu2',
    desc: 'Verify the ability of the receiving system to appropriately handle a VALID delivery notifications request, including X-DIRECT-FINAL-DESTINATION-DELIVERY data. ETT will create the Direct address block Header following section 4.1 of the XDR and XDM for Direct Messaging v1.0 and include the X-DIRECT-FINAL-DESTINATION-DELIVERY data following section 1.3 of Implementation Guide for Delivery Notification in Direct v1.0 and send it to the SUT.',
    sutEdge: false,
    criteria: "['h2-11','sc2-11']",
    sutHisp: true,
    sutRole: 'receiver',
    inputs: [
      {
        name: 'Endpoint',
        hoverlabel: 'Receiving endpoint of the SUT for XDR SOAP messages.',
        key: 'targetEndpointTLS',
        type: 'string',
      },
      {
        name: 'Direct To Address',
        hoverlabel: 'SUT (HISP) outgoing SMTP address.',
        key: 'direct_to',
        type: 'string',
      },
      {
        name: 'Outgoing (ETT --> SUT) Direct From Address',
        key: 'outgoing_from',
        type: 'string',
      },
    ],
    moreInfo: {
      subHeader: 'Description',
      subDesc: `The Health IT Module is able to successfully process a valid message from the ETT.
      Note: When the SUT (HISP) receives the MDN (from the 'direct:to' and hence RCPT TO from the Direct communication), the MAIL FROM of the MDN will be 'direct:to' - since the 'direct:to' endpoint is sending the MAIL FROM. The ETT hardcodes 'direct:to' based on the test case, normally is not needed.`,
      subDesc2: `Outgoing (ETT --> SUT) Direct From Address:Note: MDN Direct from address in the 'direct:from' address the XDR MDN. ETT will use in creating the SOAP XDR transaction for this test. In turn this is destined to become the SMTP MAIL FROM for the ensuing Direct Communication between the SUT HISP to the ETT HISP (the 'direct:to' becomes the RCPT TO).`,

      expTestHeader: `Expected Test Results`,
      expTestResults: `The Health IT Module is able to successfully process a message from the ETT (as Sending Edge)`,

      headers: ['Vendor Role', 'Metadata Included'],
      tableData: [
        {
          cells: [
            { content: 'Receiver (HISP - SUT)', type: 'text' },
            { content: 'N/A', type: 'text' },
          ],
        },
      ],
      actionLabel: 'RUN',
    },
    'Test Focus': 'XDR Receive',
    'Data Flow in Direct': 'HISP receives an XDR message from the Edge',
    'Metadata Included': 'N/A',
    'Direct Address Block': 'Included',
    'SUT: Sender/ Receiver': 'Receiver (HISP - SUT)',
    'Test Tool: Sender / Receiver': 'Sender (Test Tool)',
    'Purpose/Description':
      "The Health IT Module is able to successfully process a valid message from the ETT. \n Note: When the SUT (HISP) receives the MDN (from the 'direct:to' and hence RCPT TO from the Direct communication), the MAIL FROM of the MDN will be 'direct:to' - since the 'direct:to' endpoint is sending the MAIL FROM. The ETT hardcodes 'direct:to' based on the test case, normally is not needed. \n Outgoing (ETT --> SUT) Direct From Address:Note: MDN Direct from address in the 'direct:from' address the XDR MDN. ETT will use in creating the SOAP XDR transaction for this test. In turn this is destined to become the SMTP MAIL FROM for the ensuing Direct Communication between the SUT HISP to the ETT HISP (the 'direct:to' becomes the RCPT TO).",
    'Conformance  Test Details':
      'HISP should appropriately handle a VALID delivery notification request, including X-DIRECT-FINAL-DESTINATION-DELIVERY data.',
    'Expected Test Results':
      'The Health IT Module is able to successfully process a message from the ETT (as Sending Edge)',
    'Required / Conditional per Direct Edge Protocol Guide': 'R',
    'Direct Edge Protocol Guide 1.1 RTM Reference': 1.1,
    'Test Data IDs': null,
  },
  {
    name: 'XDR MT Test 31',
    id: '31mu2',
    ID: '31mu2',
    desc: 'Verify the ability of the receiving system to appropriately handle an INVALID delivery notifications request, including X-DIRECT-FINAL-DESTINATION-DELIVERY data. ETT will create the Direct address block Header following section 4.1 of the XDR and XDM for Direct Messaging v1.0 and include INVALID X-DIRECT-FINAL-DESTINATION-DELIVERY data following section 1.3 of Implementation Guide for Delivery Notification in Direct v1.0 and send it to the SUT.',
    sutEdge: false,
    criteria: "['h2-11','sc2-11']",
    sutHisp: true,
    sutRole: 'receiver',
    inputs: [
      {
        name: 'Endpoint',
        hoverlabel: 'Receiving endpoint of the SUT for XDR SOAP messages.',
        key: 'targetEndpointTLS',
        type: 'string',
      },
      {
        name: 'Outgoing (ETT --> SUT) Direct From Address',
        hoverlabel: 'SUT (HISP) outgoing SMTP address.',
        key: 'outgoing_from',
        type: 'string',
      },
    ],
    moreInfo: {
      subHeader: 'Description',
      subDesc: `The Health IT Module is able to successfully process an invalid message from the ETT, message contains a valid address block and invalid destination.`,
      subDesc2: `Note: When the SUT (HISP) receives the MDN (from the 'direct:to' and hence RCPT TO from the Direct communication), the MAIL FROM of the MDN will be 'direct:to' - since the 'direct:to' endpoint is sending the MAIL FROM. The ETT hardcodes 'direct:to' based on the test case, normally is not needed.`,

      expTestHeader: `Expected Test Results`,
      expTestResults: `The Health IT Module is able to process the header handle an invalid delivery notification request`,

      headers: ['Vendor Role', 'Metadata Included'],
      tableData: [
        {
          cells: [
            { content: 'Receiver (HISP - SUT)', type: 'text' },
            { content: 'N/A', type: 'text' },
          ],
        },
      ],
      actionLabel: 'RUN',
    },
    'Test Focus': 'XDR Receive',
    'Data Flow in Direct': 'HISP receives an XDR message from the Edge',
    'Metadata Included': 'N/A',
    'Direct Address Block': 'Included',
    'SUT: Sender/ Receiver': 'Receiver (HISP - SUT)',
    'Test Tool: Sender / Receiver': 'Sender (Test Tool)',
    'Purpose/Description':
      "The Health IT Module is able to successfully process an invalid message from the ETT, message contains a valid address block and invalid destination.\nNote: When the SUT (HISP) receives the MDN (from the 'direct:to' and hence RCPT TO from the Direct communication), the MAIL FROM of the MDN will be 'direct:to' - since the 'direct:to' endpoint is sending the MAIL FROM. The ETT hardcodes 'direct:to' based on the test case, normally is not needed.",
    'Conformance  Test Details':
      'HISP should appropriately handle an INVALID delivery notification request, including X-DIRECT-FINAL-DESTINATION-DELIVERY data.',
    'Expected Test Results':
      'The Health IT Module is able to process the header handle an invalid delivery notification request',
    'Required / Conditional per Direct Edge Protocol Guide': 'R',
    'Direct Edge Protocol Guide 1.1 RTM Reference': 1.1,
    'Test Data IDs': null,
  },
  {
    name: 'XDR MT Test 32',
    id: '32mu2',
    ID: '32mu2',
    desc: "Verify the ability of the SUT to appropriately respond to a delivery to a non-existent address.  ETT will send a message via XDR to the SUT.  If the SUT's final response is delivered synchronously, that message will be saved in the logs (click 'Logs').  If the SUT's final response is delivered asynchronously: 1) wait until the SUT's message has been sent and the ETT's response has been received, 2) click the Pending Refresh button to continue, 3) the logs for the asynchronous communication will then be available.  The proctor will read the logs for the synchronous communication or the asynchronous communication for an appropriate response. This test is part of the Implementation Guide for Delivery Notification test suite.",
    sutEdge: false,
    criteria: "['h2-11']",
    sutHisp: true,
    sutRole: 'receiver',
    status: 'configure',
    inputs: [
      {
        name: 'Endpoint',
        hoverlabel: 'Receiving endpoint of the SUT for XDR SOAP messages.',
        key: 'targetEndpointTLS',
        type: 'string',
      },
      {
        name: 'Direct From Address',
        hoverlabel: 'SUT (HISP) outgoing SMTP address.',
        key: 'direct_from',
        type: 'string',
      },
      {
        name: 'Outgoing (ETT --> SUT) Direct From Address',
        key: 'outgoing_from',
        type: 'string',
      },
    ],
    moreInfo: {
      subHeader: 'Description',
      subDesc: `The Health IT Module is able to successfully process a message from the ETT (as Sending Edge) that includes an invalid (non-existent) address.
      Note: When the SUT (HISP) receives the MDN (from the 'direct:to' and hence RCPT TO from the Direct communication), the MAIL FROM of the MDN will be 'direct:to' - since the 'direct:to' endpoint is sending the MAIL FROM. The ETT hardcodes 'direct:to' based on the test case, normally is not needed.`,
      subDesc2: `Outgoing (ETT --> SUT) Direct From Address:Note: MDN Direct from address in the 'direct:from' address the XDR MDN. ETT will use in creating the SOAP XDR transaction for this test. In turn this is destined to become the SMTP MAIL FROM for the ensuing Direct Communication between the SUT HISP to the ETT HISP (the 'direct:to' becomes the RCPT TO).`,

      expTestHeader: `Expected Test Results`,
      expTestResults: `The Health IT Module sends a negative delivery status notification message to the ETT (as Sending Edge) using XDR profile`,

      headers: ['Vendor Role', 'Metadata Included'],
      tableData: [
        {
          cells: [
            { content: 'Receiver (HISP - SUT)', type: 'text' },
            { content: 'N/A', type: 'text' },
          ],
        },
      ],
      actionLabel: 'RUN',
    },
    'Test Focus': 'XDR Receive',
    'Data Flow in Direct': 'HISP receives an XDR message from the Edge',
    'Metadata Included': 'N/A',
    'Direct Address Block': 'Included',
    'SUT: Sender/ Receiver': 'Receiver (HISP - SUT)',
    'Test Tool: Sender / Receiver': 'Sender (Test Tool)',
    'Purpose/Description':
      "The Health IT Module is able to successfully process a message from the ETT (as Sending Edge) that includes an invalid (non-existent) address. \n Note: When the SUT (HISP) receives the MDN (from the 'direct:to' and hence RCPT TO from the Direct communication), the MAIL FROM of the MDN will be 'direct:to' - since the 'direct:to' endpoint is sending the MAIL FROM. The ETT hardcodes 'direct:to' based on the test case, normally is not needed. \n Outgoing (ETT --> SUT) Direct From Address:Note: MDN Direct from address in the 'direct:from' address the XDR MDN. ETT will use in creating the SOAP XDR transaction for this test. In turn this is destined to become the SMTP MAIL FROM for the ensuing Direct Communication between the SUT HISP to the ETT HISP (the 'direct:to' becomes the RCPT TO).",
    'Conformance  Test Details':
      'HISP should appropriately handle an INVALID address and send the negative delivery notification back to the EDGE.',
    'Expected Test Results':
      'The Health IT Module sends a negative delivery status notification message to the ETT (as Sending Edge) using XDR profile',
    'Required / Conditional per Direct Edge Protocol Guide': 'R',
    'Direct Edge Protocol Guide 1.1 RTM Reference': 1.1,
    'Test Data IDs': null,
  },
  {
    name: 'XDR MT Test 33',
    id: '33mu2',
    ID: '33mu2',
    desc: "Verify the ability of the SUT to appropriately respond to a delivery to an untrusted HISP.  ETT will send a message via XDR to the SUT.  If the SUT's final response is delivered synchronously, that message will be saved in the logs (click 'Logs').  If the SUT's final response is delivered asynchronously: 1) wait until the SUT's message has been sent and the ETT's response has been received, 2) click the Pending Refresh button to continue, 3) the logs for the asynchronous communication will then be available.  The proctor will read the logs for the synchronous communication or the asynchronous communication for an appropriate response. This test is part of the Implementation Guide for Delivery Notification test suite.",
    sutEdge: false,
    criteria: "['h2-11']",
    sutHisp: true,
    sutRole: 'receiver',
    status: 'configure',
    inputs: [
      {
        name: 'Endpoint',
        hoverlabel: 'Receiving endpoint of the SUT for XDR SOAP messages.',
        key: 'targetEndpointTLS',
        type: 'string',
      },
      {
        name: 'Direct From Address',
        hoverlabel: 'SUT (HISP) outgoing SMTP address.',
        key: 'direct_from',
        type: 'string',
      },
      {
        name: 'Outgoing (ETT --> SUT) Direct From Address',
        key: 'outgoing_from',
        type: 'string',
      },
    ],
    moreInfo: {
      subHeader: 'Description',
      subDesc: `The Health IT Module is able to successfully process a message from the ETT (as Sending Edge) to a valid address. The ETT (as Destination HISP) is not trusted.
      Note: When the SUT (HISP) receives the MDN (from the 'direct:to' and hence RCPT TO from the Direct communication), the MAIL FROM of the MDN will be 'direct:to' - since the 'direct:to' endpoint is sending the MAIL FROM. The ETT hardcodes 'direct:to' based on the test case, normally is not needed.`,
      subDesc2: `Outgoing (ETT --> SUT) Direct From Address:Note: MDN Direct from address in the 'direct:from' address the XDR MDN. ETT will use in creating the SOAP XDR transaction for this test. In turn this is destined to become the SMTP MAIL FROM for the ensuing Direct Communication between the SUT HISP to the ETT HISP (the 'direct:to' becomes the RCPT TO).`,

      expTestHeader: `Expected Test Results`,
      expTestResults: `The Health IT Module sends a negative delivery status notification message to the ETT (as Sending Edge) using XDR profile`,

      headers: ['Vendor Role', 'Metadata Included'],
      tableData: [
        {
          cells: [
            { content: 'Receiver (HISP - SUT)', type: 'text' },
            { content: 'N/A', type: 'text' },
          ],
        },
      ],
      actionLabel: 'RUN',
    },
    'Test Focus': 'XDR Receive',
    'Data Flow in Direct': 'HISP receives an XDR message from the Edge',
    'Metadata Included': 'N/A',
    'Direct Address Block': 'Included',
    'SUT: Sender/ Receiver': 'Receiver (HISP - SUT)',
    'Test Tool: Sender / Receiver': 'Sender (Test Tool)',
    'Purpose/Description':
      "The Health IT Module is able to successfully process a message from the ETT (as Sending Edge) to a valid address. The ETT (as Destination HISP) is not trusted. \n Note: When the SUT (HISP) receives the MDN (from the 'direct:to' and hence RCPT TO from the Direct communication), the MAIL FROM of the MDN will be 'direct:to' - since the 'direct:to' endpoint is sending the MAIL FROM. The ETT hardcodes 'direct:to' based on the test case, normally is not needed. \n Outgoing (ETT --> SUT) Direct From Address:Note: MDN Direct from address in the 'direct:from' address the XDR MDN. ETT will use in creating the SOAP XDR transaction for this test. In turn this is destined to become the SMTP MAIL FROM for the ensuing Direct Communication between the SUT HISP to the ETT HISP (the 'direct:to' becomes the RCPT TO).",
    'Conformance  Test Details':
      'XDR Message Checklist + XDS Metadata Checklist for Limited Metadata Document Source + Direct XDR Checklist',
    'Expected Test Results':
      'The Health IT Module sends a negative delivery status notification message to the ETT (as Sending Edge) using XDR profile',
    'Required / Conditional per Direct Edge Protocol Guide': 'R',
    'Direct Edge Protocol Guide 1.1 RTM Reference': 1.1,
    'Test Data IDs': null,
  },
  {
    name: 'XDR MT Test 34',
    id: '34mu2',
    ID: '34mu2',
    desc: "Verify the ability of the SUT to appropriately respond to a delivery to a HISP which does not have a published certificate.  ETT will send a message via XDR to the SUT.  If the SUT's final response is delivered synchronously, that message will be saved in the logs (click 'Logs').  If the SUT's final response is delivered asynchronously: 1) wait until the SUT's message has been sent and the ETT's response has been received, 2) click the Pending Refresh button to continue, 3) the logs for the asynchronous communication will then be available.  The proctor will read the logs for the synchronous communication or the asynchronous communication for an appropriate response. This test is part of the Implementation Guide for Delivery Notification test suite.",
    sutEdge: false,
    criteria: "['h2-11']",
    sutHisp: true,
    sutRole: 'receiver',
    status: 'configure',
    inputs: [
      {
        name: 'Endpoint',
        hoverlabel: 'Receiving endpoint of the SUT for XDR SOAP messages.',
        key: 'targetEndpointTLS',
        type: 'string',
      },
      {
        name: 'Direct From Address',
        hoverlabel: 'SUT (HISP) outgoing SMTP address.',
        key: 'direct_from',
        type: 'string',
      },
      {
        name: 'Outgoing (ETT --> SUT) Direct From Address',
        key: 'outgoing_from',
        type: 'string',
      },
    ],
    moreInfo: {
      subHeader: 'Description',
      subDesc: `The Health IT Module is able to successfully process a message from the ETT (as Sending Edge) to a valid address. The ETT (as Destination HISP) does not have published certificates, and security and trust processing fails.
      Note: When the SUT (HISP) receives the MDN (from the 'direct:to' and hence RCPT TO from the Direct communication), the MAIL FROM of the MDN will be 'direct:to' - since the 'direct:to' endpoint is sending the MAIL FROM. The ETT hardcodes 'direct:to' based on the test case, normally is not needed.`,
      subDesc2: `Outgoing (ETT --> SUT) Direct From Address:Note: MDN Direct from address in the 'direct:from' address the XDR MDN. ETT will use in creating the SOAP XDR transaction for this test. In turn this is destined to become the SMTP MAIL FROM for the ensuing Direct Communication between the SUT HISP to the ETT HISP (the 'direct:to' becomes the RCPT TO).`,

      expTestHeader: `Expected Test Results`,
      expTestResults: `The Health IT Module sends a negative delivery status notification message to the ETT (as Sending Edge) using XDR profile`,

      headers: ['Vendor Role', 'Metadata Included'],
      tableData: [
        {
          cells: [
            { content: 'Receiver (HISP - SUT)', type: 'text' },
            { content: 'N/A', type: 'text' },
          ],
        },
      ],
      actionLabel: 'RUN',
    },
    'Test Focus': 'XDR Receive',
    'Data Flow in Direct': 'HISP receives an XDR message from the Edge',
    'Metadata Included': 'N/A',
    'Direct Address Block': 'Included',
    'SUT: Sender/ Receiver': 'Receiver (HISP - SUT)',
    'Test Tool: Sender / Receiver': 'Sender (Test Tool)',
    'Purpose/Description':
      "The Health IT Module is able to successfully process a message from the ETT (as Sending Edge) to a valid address. The ETT (as Destination HISP) does not have published certificates, and security and trust processing fails. \n Note: When the SUT (HISP) receives the MDN (from the 'direct:to' and hence RCPT TO from the Direct communication), the MAIL FROM of the MDN will be 'direct:to' - since the 'direct:to' endpoint is sending the MAIL FROM. The ETT hardcodes 'direct:to' based on the test case, normally is not needed. \n Outgoing (ETT --> SUT) Direct From Address:Note: MDN Direct from address in the 'direct:from' address the XDR MDN. ETT will use in creating the SOAP XDR transaction for this test. In turn this is destined to become the SMTP MAIL FROM for the ensuing Direct Communication between the SUT HISP to the ETT HISP (the 'direct:to' becomes the RCPT TO).",
    'Conformance  Test Details': 'The HISP sends a negative delivery status notification message back to the EDGE.',
    'Expected Test Results':
      'The Health IT Module sends a negative delivery status notification message to the ETT (as Sending Edge) using XDR profile',
    'Required / Conditional per Direct Edge Protocol Guide': 'R',
    'Direct Edge Protocol Guide 1.1 RTM Reference': 1.1,
    'Test Data IDs': null,
  },
  {
    name: 'XDR MT Test 35',
    id: '35mu2',
    ID: '35mu2',
    desc: "Verify the ability of the SUT to appropriately respond in the event of a lack of a Processed MDN. ETT will send a message via XDR to the SUT.  If the SUT's final response is delivered synchronously, that message will be saved in the logs (click 'Logs').  If the SUT's final response is delivered asynchronously: 1) wait until the SUT's message has been sent and the ETT's response has been received, 2) click the Pending Refresh button to continue, 3) the logs for the asynchronous communication will then be available.  The proctor will read the logs for the synchronous communication or the asynchronous communication for an appropriate response.  This test is part of the Implementation Guide for Delivery Notification test suite.",
    sutEdge: false,
    criteria: "['h2-11']",
    sutHisp: true,
    sutRole: 'receiver',
    status: 'configure',
    inputs: [
      {
        name: 'Endpoint',
        hoverlabel: 'Receiving endpoint of the SUT for XDR SOAP messages.',
        key: 'targetEndpointTLS',
        type: 'string',
      },
      {
        name: 'Direct From Address',
        hoverlabel: 'SUT (HISP) outgoing SMTP address.',
        key: 'direct_from',
        type: 'string',
      },
      {
        name: 'Outgoing (ETT --> SUT) Direct From Address',
        key: 'outgoing_from',
        type: 'string',
      },
    ],
    moreInfo: {
      subHeader: 'Description',
      subDesc: `The Health IT Module is able to successfully process a message from the ETT (as Sending Edge) to a valid address. The ETT (as Destination HISP) does not respond with a Processed MDN.
      Note: When the SUT (HISP) receives the MDN (from the 'direct:to' and hence RCPT TO from the Direct communication), the MAIL FROM of the MDN will be 'direct:to' - since the 'direct:to' endpoint is sending the MAIL FROM. The ETT hardcodes 'direct:to' based on the test case, normally is not needed.`,
      subDesc2: `Outgoing (ETT --> SUT) Direct From Address:Note: MDN Direct from address in the 'direct:from' address the XDR MDN. ETT will use in creating the SOAP XDR transaction for this test. In turn this is destined to become the SMTP MAIL FROM for the ensuing Direct Communication between the SUT HISP to the ETT HISP (the 'direct:to' becomes the RCPT TO).`,
      expTestHeader: `Expected Test Results`,
      expTestResults: `The Health IT Module sends a negative delivery status notification message to the ETT (as Sending Edge) using XDR profile`,

      headers: ['Vendor Role', 'Metadata Included'],
      tableData: [
        {
          cells: [
            { content: 'Receiver (HISP - SUT)', type: 'text' },
            { content: 'N/A', type: 'text' },
          ],
        },
      ],
      actionLabel: 'RUN',
    },
    'Test Focus': 'XDR Receive',
    'Data Flow in Direct': 'HISP receives an XDR message from the Edge',
    'Metadata Included': 'N/A',
    'Direct Address Block': 'Included',
    'SUT: Sender/ Receiver': 'Receiver (HISP - SUT)',
    'Test Tool: Sender / Receiver': 'Sender (Test Tool)',
    'Purpose/Description':
      "The Health IT Module is able to successfully process a message from the ETT (as Sending Edge) to a valid address. The ETT (as Destination HISP) does not respond with a Processed MDN. \n Note: When the SUT (HISP) receives the MDN (from the 'direct:to' and hence RCPT TO from the Direct communication), the MAIL FROM of the MDN will be 'direct:to' - since the 'direct:to' endpoint is sending the MAIL FROM. The ETT hardcodes 'direct:to' based on the test case, normally is not needed. \n Outgoing (ETT --> SUT) Direct From Address:Note: MDN Direct from address in the 'direct:from' address the XDR MDN. ETT will use in creating the SOAP XDR transaction for this test. In turn this is destined to become the SMTP MAIL FROM for the ensuing Direct Communication between the SUT HISP to the ETT HISP (the 'direct:to' becomes the RCPT TO).",
    'Conformance  Test Details': 'The HISP sends a negative delivery status notification message back to the EDGE.',
    'Expected Test Results':
      'The Health IT Module sends a negative delivery status notification message to the ETT (as Sending Edge) using XDR profile',
    'Required / Conditional per Direct Edge Protocol Guide': 'R',
    'Direct Edge Protocol Guide 1.1 RTM Reference': 1.1,
    'Test Data IDs': null,
  },
  {
    name: 'XDR MT Test 36',
    id: '36mu2',
    ID: '36mu2',
    desc: "Verify the ability of the SUT to appropriately respond in the event of a lack of a Dispatched MDN. ETT will send a message via XDR to the SUT.  If the SUT's final response is delivered synchronously, that message will be saved in the logs (click 'Logs').  If the SUT's final response is delivered asynchronously: 1) wait until the SUT's message has been sent and the ETT's response has been received, 2) click the Pending Refresh button to continue, 3) the logs for the asynchronous communication will then be available.  The proctor will read the logs for the synchronous communication or the asynchronous communication for an appropriate response.  This test is part of the Implementation Guide for Delivery Notification test suite.",
    sutEdge: false,
    criteria: "['h2-11']",
    sutHisp: true,
    sutRole: 'receiver',
    status: 'configure',
    inputs: [
      {
        name: 'Endpoint',
        hoverlabel: 'Receiving endpoint of the SUT for XDR SOAP messages.',
        key: 'targetEndpointTLS',
        type: 'string',
      },
      {
        name: 'Direct From Address',
        hoverlabel: 'SUT (HISP) outgoing SMTP address.',
        key: 'direct_from',
        type: 'string',
      },
      {
        name: 'Outgoing (ETT --> SUT) Direct From Address',
        key: 'outgoing_from',
        type: 'string',
      },
    ],
    moreInfo: {
      subHeader: 'Description',
      subDesc: `The Health IT Module is able to successfully process a message from the ETT (as Sending Edge) to a valid address. The ETT (as Destination HISP) responds with a Processed MDN, but no Dispatched MDN.
      Note: When the SUT (HISP) receives the MDN (from the 'direct:to' and hence RCPT TO from the Direct communication), the MAIL FROM of the MDN will be 'direct:to' - since the 'direct:to' endpoint is sending the MAIL FROM. The ETT hardcodes 'direct:to' based on the test case, normally is not needed.`,
      subDesc2: `Outgoing (ETT --> SUT) Direct From Address:Note: MDN Direct from address in the 'direct:from' address the XDR MDN. ETT will use in creating the SOAP XDR transaction for this test. In turn this is destined to become the SMTP MAIL FROM for the ensuing Direct Communication between the SUT HISP to the ETT HISP (the 'direct:to' becomes the RCPT TO).`,
      expTestHeader: `Expected Test Results`,
      expTestResults: `The Health IT Module sends a negative delivery status notification message to the ETT (as Sending Edge) using XDR profile`,

      headers: ['Vendor Role', 'Metadata Included'],
      tableData: [
        {
          cells: [
            { content: 'Receiver (HISP - SUT)', type: 'text' },
            { content: 'N/A', type: 'text' },
          ],
        },
      ],
      actionLabel: 'RUN',
    },
    'Test Focus': 'XDR Receive',
    'Data Flow in Direct': 'HISP receives an XDR message from the Edge',
    'Metadata Included': 'N/A',
    'Direct Address Block': 'Included',
    'SUT: Sender/ Receiver': 'Receiver (HISP - SUT)',
    'Test Tool: Sender / Receiver': 'Sender (Test Tool)',
    'Purpose/Description':
      "The Health IT Module is able to successfully process a message from the ETT (as Sending Edge) to a valid address. The ETT (as Destination HISP) responds with a Processed MDN, but no Dispatched MDN. \n Note: When the SUT (HISP) receives the MDN (from the 'direct:to' and hence RCPT TO from the Direct communication), the MAIL FROM of the MDN will be 'direct:to' - since the 'direct:to' endpoint is sending the MAIL FROM. The ETT hardcodes 'direct:to' based on the test case, normally is not needed. \n Outgoing (ETT --> SUT) Direct From Address:Note: MDN Direct from address in the 'direct:from' address the XDR MDN. ETT will use in creating the SOAP XDR transaction for this test. In turn this is destined to become the SMTP MAIL FROM for the ensuing Direct Communication between the SUT HISP to the ETT HISP (the 'direct:to' becomes the RCPT TO).",
    'Conformance  Test Details': 'The HISP sends a negative delivery status notification message back to the EDGE.',
    'Expected Test Results':
      'The Health IT Module sends a negative delivery status notification message to the ETT (as Sending Edge) using XDR profile',
    'Required / Conditional per Direct Edge Protocol Guide': 'R',
    'Direct Edge Protocol Guide 1.1 RTM Reference': 1.1,
    'Test Data IDs': null,
  },
  {
    name: 'XDR MT Test 37',
    id: '37mu2',
    ID: '37mu2',
    desc: "Verify the ability of the SUT to appropriately respond in the event of a message timeout failure. ETT will send a message via XDR to the SUT.  If the SUT's final response is delivered synchronously, that message will be saved in the logs (click 'Logs').  If the SUT's final response is delivered asynchronously: 1) wait until the SUT's message has been sent and the ETT's response has been received, 2) click the Pending Refresh button to continue, 3) the logs for the asynchronous communication will then be available.  The proctor will read the logs for the synchronous communication or the asynchronous communication for an appropriate response.  This test is part of the Implementation Guide for Delivery Notification test suite.",
    sutEdge: false,
    criteria: "['h2-11']",
    sutHisp: true,
    status: 'configure',
    sutRole: 'receiver',
    inputs: [
      {
        name: 'Endpoint',
        hoverlabel: 'Receiving endpoint of the SUT for XDR SOAP messages.',
        key: 'targetEndpointTLS',
        type: 'string',
      },
      {
        name: 'Direct From Address',
        hoverlabel: 'SUT (HISP) outgoing SMTP address.',
        key: 'direct_from',
        type: 'string',
      },
      {
        name: 'Outgoing (ETT --> SUT) Direct From Address',
        key: 'outgoing_from',
        type: 'string',
      },
    ],
    moreInfo: {
      subHeader: 'Description',
      subDesc: `The Health IT Module is able to successfully process a message from the ETT (as Sending Edge) to a valid address. The ETT (as Destination HISP) responds with a Processed MDN, but the Dispatched MDN is received after the expected wait time has exceeded.
      Note: When the SUT (HISP) receives the MDN (from the 'direct:to' and hence RCPT TO from the Direct communication), the MAIL FROM of the MDN will be 'direct:to' - since the 'direct:to' endpoint is sending the MAIL FROM. The ETT hardcodes 'direct:to' based on the test case, normally is not needed.`,
      subDesc2: `Outgoing (ETT --> SUT) Direct From Address:Note: MDN Direct from address in the 'direct:from' address the XDR MDN. ETT will use in creating the SOAP XDR transaction for this test. In turn this is destined to become the SMTP MAIL FROM for the ensuing Direct Communication between the SUT HISP to the ETT HISP (the 'direct:to' becomes the RCPT TO).`,
      expTestHeader: `Expected Test Results`,
      expTestResults: `The Health IT Module sends a negative delivery status notification message to the ETT (as Sending Edge) using XDR profile`,

      headers: ['Vendor Role', 'Metadata Included'],
      tableData: [
        {
          cells: [
            { content: 'Receiver (HISP - SUT)', type: 'text' },
            { content: 'N/A', type: 'text' },
          ],
        },
      ],
      actionLabel: 'RUN',
    },
    'Test Focus': 'XDR Receive',
    'Data Flow in Direct': 'HISP receives an XDR message from the Edge',
    'Metadata Included': 'N/A',
    'Direct Address Block': 'Included',
    'SUT: Sender/ Receiver': 'Receiver (HISP - SUT)',
    'Test Tool: Sender / Receiver': 'Sender (Test Tool)',
    'Purpose/Description':
      "The Health IT Module is able to successfully process a message from the ETT (as Sending Edge) to a valid address. The ETT (as Destination HISP) responds with a Processed MDN, but the Dispatched MDN is received after the expected wait time has exceeded. \n Note: When the SUT (HISP) receives the MDN (from the 'direct:to' and hence RCPT TO from the Direct communication), the MAIL FROM of the MDN will be 'direct:to' - since the 'direct:to' endpoint is sending the MAIL FROM. The ETT hardcodes 'direct:to' based on the test case, normally is not needed. \n Outgoing (ETT --> SUT) Direct From Address:Note: MDN Direct from address in the 'direct:from' address the XDR MDN. ETT will use in creating the SOAP XDR transaction for this test. In turn this is destined to become the SMTP MAIL FROM for the ensuing Direct Communication between the SUT HISP to the ETT HISP (the 'direct:to' becomes the RCPT TO).",
    'Conformance  Test Details': 'The HISP sends a negative delivery status notification message back to the EDGE.',
    'Expected Test Results':
      'The Health IT Module sends a negative delivery status notification message to the ETT (as Sending Edge) using XDR profile',
    'Required / Conditional per Direct Edge Protocol Guide': 'R',
    'Direct Edge Protocol Guide 1.1 RTM Reference': 1.1,
    'Test Data IDs': null,
  },
  {
    name: 'XDR MT Test 38',
    id: '38mu2',
    ID: '38mu2',
    desc: "Verify the ability of the SUT to appropriately respond in the event of positive delivery notification. ETT will send a message via XDR to the SUT.  If the SUT's final response is delivered synchronously, that message will be saved in the logs (click 'Logs').  If the SUT's final response is delivered asynchronously: 1) wait until the SUT's message has been sent and the ETT's response has been received, 2) click the Pending Refresh button to continue, 3) the logs for the asynchronous communication will then be available.  The proctor will read the logs for the synchronous communication or the asynchronous communication for an appropriate response.  This test is part of the Implementation Guide for Delivery Notification test suite.",
    sutEdge: false,
    criteria: "['h2-11']",
    sutHisp: true,
    sutRole: 'receiver',
    status: 'configure',
    inputs: [
      {
        name: 'Endpoint',
        hoverlabel: 'Receiving endpoint of the SUT for XDR SOAP messages.',
        key: 'targetEndpointTLS',
        type: 'string',
      },
      {
        name: 'Direct From Address',
        hoverlabel: 'SUT (HISP) outgoing SMTP address.',
        key: 'direct_from',
        type: 'string',
      },
      {
        name: 'Outgoing (ETT --> SUT) Direct From Address',
        key: 'outgoing_from',
        type: 'string',
      },
    ],
    moreInfo: {
      subHeader: 'Description',
      subDesc: `The Health IT Module is able to successfully process a message from the ETT (as Sending Edge) to a valid address. The ETT (as Destination HISP) responds with a Processed MDN and Dispatched MDN within the expected time period.
      Note: When the SUT (HISP) receives the MDN (from the 'direct:to' and hence RCPT TO from the Direct communication), the MAIL FROM of the MDN will be 'direct:to' - since the 'direct:to' endpoint is sending the MAIL FROM. The ETT hardcodes 'direct:to' based on the test case, normally is not needed.`,
      subDesc2: `Outgoing (ETT --> SUT) Direct From Address:Note: MDN Direct from address in the 'direct:from' address the XDR MDN. ETT will use in creating the SOAP XDR transaction for this test. In turn this is destined to become the SMTP MAIL FROM for the ensuing Direct Communication between the SUT HISP to the ETT HISP (the 'direct:to' becomes the RCPT TO).`,
      expTestHeader: `Expected Test Results`,
      expTestResults: `The Health IT Module sends a positive delivery status notification message to the ETT (as Sending Edge) using XDR profile`,

      headers: ['Vendor Role', 'Metadata Included'],
      tableData: [
        {
          cells: [
            { content: 'Receiver (HISP - SUT)', type: 'text' },
            { content: 'N/A', type: 'text' },
          ],
        },
      ],
      actionLabel: 'RUN',
    },
    'Test Focus': 'XDR Receive',
    'Data Flow in Direct': 'HISP receives an XDR message from the Edge',
    'Metadata Included': 'N/A',
    'Direct Address Block': 'Included',
    'SUT: Sender/ Receiver': 'Receiver (HISP - SUT)',
    'Test Tool: Sender / Receiver': 'Sender (Test Tool)',
    'Purpose/Description':
      "The Health IT Module is able to successfully process a message from the ETT (as Sending Edge) to a valid address. The ETT (as Destination HISP) responds with a Processed MDN and Dispatched MDN within the expected time period. \n Note: When the SUT (HISP) receives the MDN (from the 'direct:to' and hence RCPT TO from the Direct communication), the MAIL FROM of the MDN will be 'direct:to' - since the 'direct:to' endpoint is sending the MAIL FROM. The ETT hardcodes 'direct:to' based on the test case, normally is not needed. \n Outgoing (ETT --> SUT) Direct From Address:Note: MDN Direct from address in the 'direct:from' address the XDR MDN. ETT will use in creating the SOAP XDR transaction for this test. In turn this is destined to become the SMTP MAIL FROM for the ensuing Direct Communication between the SUT HISP to the ETT HISP (the 'direct:to' becomes the RCPT TO).",
    'Conformance  Test Details':
      'The HISP sends only one positive delivery status notification message back to the EDGE.',
    'Expected Test Results':
      'The Health IT Module sends a positive delivery status notification message to the ETT (as Sending Edge) using XDR profile',
    'Required / Conditional per Direct Edge Protocol Guide': 'R',
    'Direct Edge Protocol Guide 1.1 RTM Reference': 1.1,
    'Test Data IDs': null,
  },
  {
    name: 'XDR MT Test 43',
    id: '43mu2',
    ID: '43mu2',
    desc: "Verify the ability of the SUT to appropriately provide a delivery failure message if it is unable to deliver the message to the destination. ETT will send a message via XDR to the SUT.  If the SUT's final response is delivered synchronously, that message will be saved in the logs (click 'Logs').  If the SUT's final response is delivered asynchronously: 1) wait until the SUT's message has been sent and the ETT's response has been received, 2) click the Pending Refresh button to continue, 3) the logs for the asynchronous communication will then be available.  The proctor will read the logs for the synchronous communication or the asynchronous communication for an appropriate response.",
    sutEdge: false,
    criteria: "['h2-12']",
    sutHisp: true,
    sutRole: 'receiver',
    status: 'configure',
    inputs: [
      {
        name: 'Endpoint',
        hoverlabel: 'Receiving endpoint of the SUT for XDR SOAP messages.',
        key: 'targetEndpointTLS',
        type: 'string',
      },
      {
        name: 'Direct From Address',
        hoverlabel: 'SUT (HISP) outgoing SMTP address.',
        key: 'direct_from',
        type: 'string',
      },
      {
        name: 'Outgoing (ETT --> SUT) Direct From Address',
        key: 'outgoing_from',
        type: 'string',
      },
    ],
    moreInfo: {
      subHeader: 'Description',
      subDesc: `The Health IT Module receives a message from the ETT (as Sending HISP) and is unable to deliver the message to its final destination (ETT as Destination Edge).
      Note: When the SUT (HISP) receives the MDN (from the 'direct:to' and hence RCPT TO from the Direct communication), the MAIL FROM of the MDN will be 'direct:to' - since the 'direct:to' endpoint is sending the MAIL FROM. The ETT hardcodes 'direct:to' based on the test case, normally is not needed.
      
      Outgoing (ETT --> SUT) Direct From Address:Note: MDN Direct from address in the 'direct:from' address the XDR MDN. ETT will use in creating the SOAP XDR transaction for this test. In turn this is destined to become the SMTP MAIL FROM for the ensuing Direct Communication between the SUT HISP to the ETT HISP (the 'direct:to' becomes the RCPT TO).`,
      subDesc2: `Expected outcome: '...Final-Recipient: rfc822; processedfailure@ett.healthit.gov, Original-Recipient: rfc822; processedfailure@ett.healthit.gov, Original-Message-ID: <681247680.299.1498573532567.JavaMail.root@ip-172-31-46-193>, Disposition: automatic-action/MDN-sent-automatically;failure, Failure: Failure MDN'`,
      expTestHeader: `Expected Test Results`,
      expTestResults: `The Health IT Module sends a negative delivery status notification message to the ETT (as Sending Edge) using XDR profile`,

      headers: ['Vendor Role', 'Metadata Included'],
      tableData: [
        {
          cells: [
            { content: 'Receiver (HISP - SUT)', type: 'text' },
            { content: 'N/A', type: 'text' },
          ],
        },
      ],
      actionLabel: 'RUN',
    },
    'Test Focus': 'XDR Receive',
    'Data Flow in Direct': 'HISP receives an XDR message from the Edge',
    'Metadata Included': 'N/A',
    'Direct Address Block': 'Included',
    'SUT: Sender/ Receiver': 'Receiver (HISP - SUT)',
    'Test Tool: Sender / Receiver': 'Sender (Test Tool)',
    'Purpose/Description':
      "The Health IT Module receives a message from the ETT (as Sending HISP) and is unable to deliver the message to its final destination (ETT as Destination Edge). \n Note: When the SUT (HISP) receives the MDN (from the 'direct:to' and hence RCPT TO from the Direct communication), the MAIL FROM of the MDN will be 'direct:to' - since the 'direct:to' endpoint is sending the MAIL FROM. The ETT hardcodes 'direct:to' based on the test case, normally is not needed. \n Outgoing (ETT --> SUT) Direct From Address:Note: MDN Direct from address in the 'direct:from' address the XDR MDN. ETT will use in creating the SOAP XDR transaction for this test. In turn this is destined to become the SMTP MAIL FROM for the ensuing Direct Communication between the SUT HISP to the ETT HISP (the 'direct:to' becomes the RCPT TO).\n Expected outcome: '...Final-Recipient: rfc822; processedfailure@ett.healthit.gov, Original-Recipient: rfc822; processedfailure@ett.healthit.gov, Original-Message-ID: <681247680.299.1498573532567.JavaMail.root@ip-172-31-46-193>, Disposition: automatic-action/MDN-sent-automatically;failure, Failure: Failure MDN'",
    'Conformance  Test Details':
      'The Health IT Module delivers a Processed MDN to the ETT (as Sending HISP) followed by a delivery failure message to the ETT (as Sending HISP) after the wait time has exceeded',
    'Expected Test Results':
      'The Health IT Module sends a negative delivery status notification message to the ETT (as Sending Edge) using XDR profile',
    'Required / Conditional per Direct Edge Protocol Guide': 'R',
    'Direct Edge Protocol Guide 1.1 RTM Reference': 1.1,
    'Test Data IDs': null,
  },
  {
    name: 'XDR MT Test 44',
    id: '44mu2',
    ID: '44mu2',
    desc: "Verify the ability of the receiving system to appropriately respond in the event of a message timeout failure. ETT will send a message via XDR to the SUT.  If the SUT's final response is delivered synchronously, that message will be saved in the logs (click 'Logs').  If the SUT's final response is delivered asynchronously: 1) wait until the SUT's message has been sent and the ETT's response has been received, 2) click the Pending Refresh button to continue, 3) the logs for the asynchronous communication will then be available.  The proctor will read the logs for the synchronous communication or the asynchronous communication for an appropriate response.",
    sutEdge: false,
    criteria: "['h2-12']",
    sutHisp: true,
    sutRole: 'receiver',
    status: 'configure',
    inputs: [
      {
        name: 'Endpoint',
        hoverlabel: 'Receiving endpoint of the SUT for XDR SOAP messages.',
        key: 'targetEndpointTLS',
        type: 'string',
      },
      { name: 'Timeout', hoverlabel: 'Timeout', key: 'timeout', type: 'string' },
      {
        name: 'Direct From Address',
        hoverlabel: 'SUT (HISP) outgoing SMTP address.',
        key: 'direct_from',
        type: 'string',
      },
      {
        name: 'Outgoing (ETT --> SUT) Direct From Address',
        key: 'outgoing_from',
        type: 'string',
      },
    ],
    moreInfo: {
      subHeader: 'Description',
      subDesc: `The Health IT Module receives a message from the ETT (as Sending HISP) and is unable to deliver the message to its final destination (ETT as Destination Edge).
      Note: When the SUT (HISP) receives the MDN (from the 'direct:to' and hence RCPT TO from the Direct communication), the MAIL FROM of the MDN will be 'direct:to' - since the 'direct:to' endpoint is sending the MAIL FROM. The ETT hardcodes 'direct:to' based on the test case, normally is not needed.
      
      Outgoing (ETT --> SUT) Direct From Address:Note: MDN Direct from address in the 'direct:from' address the XDR MDN. ETT will use in creating the SOAP XDR transaction for this test. In turn this is destined to become the SMTP MAIL FROM for the ensuing Direct Communication between the SUT HISP to the ETT HISP (the 'direct:to' becomes the RCPT TO).`,
      subDesc2: `The Timeout parameter is amount of time the SUT will wait before sending a Failed MDN, this parameter should be the SUT default plus 5 minutes (N + 5 minutes). If a value is not defined, the test default is 65 minutes`,
      expTestHeader: `Expected Test Results`,
      expTestResults: `--uuid:184c5b14-5eb3-4192-b5a4-3ca7e0758305 Content-Type: message/delivery-status; name=status.dat Content-Transfer-Encoding: binary Content-ID: <67bf0371-bf9a-4d39-b2b1-2a0d94ac3b41-24@urn:ihe:iti:xds-b:2007>

      Reporting-MTA: dns;Security Agent X-Original-Message-ID: <985848505.23.1500407627229.JavaMail.root@ip-172-31-46-193>
      
      Action: failed Final-Recipient: rfc822;delaydispatched5@ttpedgetest.sitenv.org Status: 5.0.0`,

      headers: ['Vendor Role', 'Metadata Included'],
      tableData: [
        {
          cells: [
            { content: 'Receiver (HISP - SUT)', type: 'text' },
            { content: 'N/A', type: 'text' },
          ],
        },
      ],
      actionLabel: 'RUN',
    },
    'Test Focus': 'XDR Receive',
    'Data Flow in Direct': 'HISP receives an XDR message from the Edge',
    'Metadata Included': 'N/A',
    'Direct Address Block': 'Included',
    'SUT: Sender/ Receiver': 'Receiver (HISP - SUT)',
    'Test Tool: Sender / Receiver': 'Sender (Test Tool)',
    'Purpose/Description':
      "The Health IT Module receives a message from the ETT (as Sending HISP) and is unable to deliver the message to its final destination (ETT as Destination Edge). \n Note: When the SUT (HISP) receives the MDN (from the 'direct:to' and hence RCPT TO from the Direct communication), the MAIL FROM of the MDN will be 'direct:to' - since the 'direct:to' endpoint is sending the MAIL FROM. The ETT hardcodes 'direct:to' based on the test case, normally is not needed. \n Outgoing (ETT --> SUT) Direct From Address:Note: MDN Direct from address in the 'direct:from' address the XDR MDN. ETT will use in creating the SOAP XDR transaction for this test. In turn this is destined to become the SMTP MAIL FROM for the ensuing Direct Communication between the SUT HISP to the ETT HISP (the 'direct:to' becomes the RCPT TO).\n The Timeout parameter is amount of time the SUT will wait before sending a Failed MDN, this parameter should be the SUT default plus 5 minutes (N + 5 minutes). If a value is not defined, the test default is 65 minutes \n Expected outcome: \n--uuid:184c5b14-5eb3-4192-b5a4-3ca7e0758305  Content-Type: message/delivery-status; name=status.dat Content-Transfer-Encoding: binary Content-ID: <67bf0371-bf9a-4d39-b2b1-2a0d94ac3b41-24@urn:ihe:iti:xds-b:2007> \n Reporting-MTA: dns;Security Agent X-Original-Message-ID: <985848505.23.1500407627229.JavaMail.root@ip-172-31-46-193> \n Action: failed Final-Recipient: rfc822;delaydispatched5@ttpedgetest.sitenv.org Status: 5.0.0",
    'Conformance  Test Details':
      'The Health IT Module delivers a Processed MDN to the ETT (as Sending HISP) followed by a delivery failure message to the ETT (as Sending HISP) due to the bad address',
    'Expected Test Results':
      'The Health IT Module sends a negative delivery status notification message to the ETT (as Sending Edge) using XDR profile',
    'Required / Conditional per Direct Edge Protocol Guide': 'R',
    'Direct Edge Protocol Guide 1.1 RTM Reference': 1.1,
    'Test Data IDs': null,
  },
  {
    name: 'XDR MT Test 48',
    id: '48mu2',
    ID: '48mu2',
    desc: "Verifies the ability of the sending system to send messages with unique message-IDs. Hit 'RUN' and then the sending system will send three messages with unique identifiers to the endpoint provided. When all three messages have been completely sent, press the 'Pending Refresh' button.  (Message Tracking Using \"Implementation Guide for Delivery Notification\")",
    sutEdge: true,
    sutHisp: false,
    sutRole: 'sender',
    inputs: [
      {
        name: 'Direct From Address',
        hoverlabel: 'Direct From Address: SUT (HISP) outgoing SMTP address (or) MDN.',
        key: 'direct_from',
        type: 'string',
      },
    ],
    'Test Focus': '',
    'Data Flow in Direct': '',
    'Metadata Included': 'N/A',
    'Direct Address Block': 'N/A',
    'SUT: Sender/ Receiver': 'Sender (Edge - SUT)',
    'Test Tool: Sender / Receiver': '',
    'Purpose/Description': 'Test to validate that the Edge system is able to create messages with unique message id.',
    'Conformance  Test Details': '',
    'Expected Test Results': 'Edge system creates each message with a unique message id with no duplicates.',
    'Required / Conditional per Direct Edge Protocol Guide': 'R',
    'Direct Edge Protocol Guide 1.1 RTM Reference': 1.1,
    'Test Data IDs': null,
  },
  {
    name: 'XDR MT Test 49',
    id: '49mu2',
    ID: '49mu2',
    desc: 'Verify the ability of the sending system to correctly use a direct address block per the section 4.0 XDR and XDM Messaging for Direct v1.0 and per section 1.3 of the "Implementation Guide for Delivery Notification for Direct v1.0".  The SOAP header will be inspected for the appropriate content.',
    sutEdge: true,
    sutHisp: false,
    sutRole: 'sender',
    criteria: "['b1-1']",
    inputs: [
      {
        name: 'Direct From Address',
        hoverlabel: 'Direct From Address: SUT (HISP) outgoing SMTP address (or) MDN.',
        key: 'direct_from',
        type: 'string',
      },
    ],
    moreInfo: {
      headers: ['Vendor Role', 'Metadata Included'],
      tableData: [
        {
          cells: [
            { content: 'Sender (EDGE - SUT)', type: 'text' },
            { content: 'N/A', type: 'text' },
          ],
        },
      ],
    },
    'Test Focus': '',
    'Data Flow in Direct': '',
    'Metadata Included': 'N/A',
    'Direct Address Block': 'N/A',
    'SUT: Sender/ Receiver': 'Sender (Edge - SUT)',
    'Test Tool: Sender / Receiver': '',
    'Purpose/Description':
      'Test to validate that the Edge system is able to generate the direct address block header including delivery notifications element.',
    'Conformance  Test Details': '',
    'Expected Test Results':
      'Edge system creates the direct address block including the disposition notifications header.',
    'Required / Conditional per Direct Edge Protocol Guide': 'R',
    'Direct Edge Protocol Guide 1.1 RTM Reference': 1.1,
    'Test Data IDs': null,
  },
  {
    name: 'XDR MT Test 50a',
    id: '50amu2',
    ID: '50amu2',
    desc: ' Verify the ability of the sending system to correctly handle the case of sending XDR messages to valid recipients. The SUT is expected to appropriately track success messages.',
    sutEdge: true,
    sutHisp: false,
    sutRole: 'sender',
    status: 'configure',
    inputs: [
      {
        name: 'Direct From Address',
        hoverlabel: 'Direct From Address: SUT (HISP) outgoing SMTP address (or) MDN.',
        key: 'direct_from',
        type: 'string',
      },
      {
        name: 'Endpoint',
        hoverlabel: 'Receiving endpoint of the SUT for XDR SOAP messages',
        key: 'targetEndpointTLS',
        type: 'string',
      },
    ],
    expectedMDN: true,
    'Test Focus': '',
    'Data Flow in Direct': '',
    'Metadata Included': 'N/A',
    'Direct Address Block': 'N/A',
    'SUT: Sender/ Receiver': 'Sender (Edge - SUT)',
    'Test Tool: Sender / Receiver': '',
    'Purpose/Description':
      'The SUT should send the test message to Testcase50a@ett.healthit.gov. Verify the ability of the sending system to correctly handle the case of sending XDR messages to valid recipients.',
    'Conformance  Test Details': '',
    'Expected Test Results': 'Edge system receives and processes a positive (success) delivery status notification.',
    'Required / Conditional per Direct Edge Protocol Guide': 'R',
    'Direct Edge Protocol Guide 1.1 RTM Reference': 1.1,
    'Test Data IDs': null,
  },
  {
    name: 'XDR MT Test 50b',
    id: '50bmu2',
    ID: '50bmu2',
    desc: ' Verify the ability of the sending system to correctly handle the case of sending XDR messages to invalid recipients. The SUT is expected to appropriately track failure messages. Failure messages to invalid recipients have to be processed/tracked appropriately by the edge system and has to be made available for testing purposes.',
    sutEdge: true,
    sutHisp: false,
    sutRole: 'sender',
    status: 'configure',
    inputs: [
      {
        name: 'Direct From Address',
        hoverlabel: 'Direct From Address: SUT (HISP) outgoing SMTP address (or) MDN.',
        key: 'direct_from',
        type: 'string',
      },
      {
        name: 'Endpoint',
        hoverlabel: 'Receiving endpoint of the SUT for XDR SOAP messages',
        key: 'targetEndpointTLS',
        type: 'string',
      },
    ],
    expectedMDN: true,
    'Test Focus': '',
    'Data Flow in Direct': '',
    'Metadata Included': 'N/A',
    'Direct Address Block': 'N/A',
    'SUT: Sender/ Receiver': 'Sender (Edge - SUT)',
    'Test Tool: Sender / Receiver': '',
    'Purpose/Description':
      'The SUT should send the test message to Testcase50b@ett.healthit.gov. Verify the ability of the sending system to correctly handle the case of sending XDR messages to invalid recipients.',
    'Conformance  Test Details': '',
    'Expected Test Results':
      'Edge system successfully processes the invalid MDN received for tracking. The Edge SUT should display the event in the log for tracking.',
    'Required / Conditional per Direct Edge Protocol Guide': 'R',
    'Direct Edge Protocol Guide 1.1 RTM Reference': 1.1,
    'Test Data IDs': null,
  },
]
export default testCases
