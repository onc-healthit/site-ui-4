const testCases = {
  testingMode: false,
  tests: [
    {
      name: 'SMTP Test 8, 14, 18 (Send)',
      id: 1,
      protocol: 'smtp',
      moreInfo: {
        subHeader: 'Description',
        headers: ['Vendor Role', 'Vendor Edge', 'Vendor HISP'],
        tableData: [
          {
            cells: [
              { content: 'Sender', type: 'text' },
              { content: '', type: 'icon', isChecked: true },
              { content: '', type: 'icon', isChecked: false },
            ],
          },
        ],
        optionalTextField: {
          label: 'ccdaReferenceFilename',
          helperText: 'C-CDA Document Type',
          defaultValue: '',
        },
        actionLabel: 'RUN',
      },
      desc: 'Verifies the ability of the sending system to send an email to ETT using the SMTP protocol with STARTTLS and PLAIN SASL Authentication (if enabled). The SUT will send an email to wellformed1@ett.healthit.gov. Hitting Run will cause ETT to search for an email sent to wellformed1@ett.healthit.gov from the email address entered in Profile window. Note that the C-CDA Document Type selected will not affect the test result.',
      longDesc:
        'Run this series collectively from one action: Test 8 validates basic commands (HELO, MAIL FROM, RCPT TO) and STARTTLS. Test 14 validates SASL AUTH. For Test 18 the SUT needs to connect to the ETT SMTP server using the credentials vendoraccount@james.healthit.gov / vendortesting123 and send an email to wellformed1@ett.healthit.gov. \n The validator is designed to use an XML attachment, sending a PDF is permitted for transport; however, it will not validate.',
      sutRole: 'sender',
      sutHisp: false,
      criteria: "['b1-8']",
      sutEdge: true,
      ccdaFileRequired: true,
      fields: [
        {
          label: 'C-CDA Document Type',
          name: 'ccdaReferenceFilename',
          datatype: 'CCDAWidget',
          value: 'ccdaReferenceFilename',
          readOnly: false,
          display: true,
        },
      ],
    },
    {
      name: 'SMTP Test 8, 14 (Send)',
      id: 2,
      protocol: 'smtp',
      moreInfo: {
        subHeader: 'Description',
        headers: ['Vendor Role', 'Vendor Edge', 'Vendor HISP'],
        tableData: [
          {
            cells: [
              { content: 'Sender', type: 'text' },
              { content: '', type: 'icon', isChecked: false },
              { content: '', type: 'icon', isChecked: true },
            ],
          },
        ],
        optionalTextField: {
          label: 'ccdaReferenceFilename',
          helperText: 'C-CDA Document Type',
          defaultValue: '',
        },
        actionLabel: 'RUN',
      },
      desc: "Verifies the ability of the sending system to send an email to ETT using the SMTP protocol with STARTTLS. The SUT will send an email to edge-receiver@james.healthit.gov. Hitting 'Run' will cause ETT to search for an email sent to edge-receiver@james.healthit.gov from the email address entered in Profile window. Note that the C-CDA Document Type selected will not affect the test result.",
      longDesc:
        'Run this series collectively from one action: Test 8 validates basic commands (HELO, MAIL FROM, RCPT TO) and STARTTLS, and Test 14, sending an email to edge-receiver@james.healthit.gov. \n The validator is designed to use an XML attachment, sending a PDF is permitted for transport; however, it will not validate.',
      sutRole: 'sender',
      sutHisp: true,
      criteria: "['h2-13']",
      sutEdge: false,
      ccdaFileRequired: true,
      fields: [
        {
          label: 'C-CDA Document Type',
          name: 'ccdaReferenceFilename',
          datatype: 'CCDAWidget',
          value: 'ccdaReferenceFilename',
          readOnly: false,
          display: true,
        },
      ],
    },
    {
      name: 'SMTP Test 9, 16, 20 (Receive)',
      id: 16,
      protocol: 'smtp',
      moreInfo: {
        subHeader: 'Description',
        headers: ['Vendor Role', 'Vendor Edge', 'Vendor HISP'],
        tableData: [
          {
            cells: [
              { content: 'Receiver', type: 'text' },
              { content: '', type: 'icon', isChecked: true },
              { content: '', type: 'icon', isChecked: true },
            ],
          },
        ],
        optionalTextField: {
          label: 'ccdaReferenceFilename',
          helperText: 'C-CDA Document Type',
          defaultValue: '',
        },
        actionLabel: 'RUN',
      },
      desc: "Verifies the ability of the receiving system to accept a STARTTLS connection with PLAIN SASL authentication (if enabled). Hitting 'Run' will cause ETT to send an email. Verify the receipt of email with subject 'STARTTLS & PLAIN SASL AUTHENTICATION'.",
      longDesc:
        "Run this series collectively from one action: Test 9 and 16 verifies the ability of the receiving system to accept a STARTTLS connection with PLAIN SASL authentication. Hitting 'Run' will cause ETT to send an email (Test 20). Verify the receipt of email with subject 'STARTTLS & PLAIN SASL AUTHENTICATION'. If TLS Required is unchecked in the profile--STARTTLS validation will be ignored. ",
      sutRole: 'receiver',
      sutHisp: true,
      criteria: "['h2-8','b1-4','b1-7','su1-4','su1-7','sc2-8']",
      sutEdge: true,
      ccdaFileRequired: true,
      fields: [
        {
          label: 'C-CDA Document Type',
          name: 'ccdaReferenceFilename',
          datatype: 'CCDAWidgetReceiver',
          value: 'ccdaReferenceFilename',
          readOnly: false,
          display: true,
        },
      ],
    },
    {
      name: 'SMTP Test 10 (Reject Invalid DATA)',
      id: 10,
      protocol: 'smtp',
      moreInfo: {
        subHeader: 'Description',
        headers: ['Vendor Role', 'Vendor Edge', 'Vendor HISP'],
        tableData: [
          {
            cells: [
              { content: 'Receiver', type: 'text' },
              { content: '', type: 'icon', isChecked: true },
              { content: '', type: 'icon', isChecked: true },
            ],
          },
        ],
        actionLabel: 'RUN',
      },
      desc: "Negative Test: Verifies the ability of the receiving system to REJECT invalid data as part of DATA command. Hitting 'Run' will cause ETT to begin an SMTP transaction to the Vendor SMTP Hostname/IP entered into Profile window. A correct REJECTION will cause the SMTP session to end before the email is delivered.",
      longDesc:
        "The objective of this test sequence is to determine if an Edge System (e.g., SUT), acting as the receiver, rejects data sent from a HISP (e.g., ETT), acting as the sender, as a component of a successfully established and active session. Successful establishment of an end-point to end-point connection between the SUT and ETT is a necessary function for SMTP Test Case 10 execution.\n The details for conformance testing flow are as follows: The ETT will initiate a connected session with the SUT and attempt to send an invalid data via the DATA command (e.g., bad line feeds).\n This is required test and maintains compliance with the secure health data transport messaging formats, processing requirements, and communication standards for Direct Edge message exchanges. See Section 1.2.1 and 1.2.2 of the 'Implementation Guide for Direct Edge Protocols' document. \n The test correlates to Test ID 10 of the SMTP Test Cases (tab) within the 'DirectEdgeProtocols' spreadsheet.",
      sutRole: 'receiver',
      sutHisp: true,
      criteria: "['h2-8']",
      sutEdge: true,
    },
    {
      name: 'SMTP Test 11 (Reject Bad Commands)',
      id: 11,
      protocol: 'smtp',
      moreInfo: {
        subHeader: 'Description',
        headers: ['Vendor Role', 'Vendor Edge', 'Vendor HISP'],
        tableData: [
          {
            cells: [
              { content: 'Receiver', type: 'text' },
              { content: '', type: 'icon', isChecked: true },
              { content: '', type: 'icon', isChecked: true },
            ],
          },
        ],
        actionLabel: 'RUN',
      },
      desc: "Negative Tests: Verifies the ability of the receiving system to REJECT bad SMTP commands. ETT will send invalid SMTP commands following exception paths identified in Section 4.1.1 and 4.1.4 of RFC 2821. Hitting 'Run' will cause ETT to begin the invalid transactions to the Vendor SMTP Hostname/IP entered into Profile window.",
      longDesc:
        "The objective of this test sequence is to determine if an Edge System (e.g., SUT), acting as the receiver, rejects as invalid the commands sent from a HISP (e.g., ETT), acting as the sender./n The details for conformance testing flow are as follows: The ETT attempts to initiate a session with the SUT by sending an invalid SMTP command following identified exception paths. The test attempts to determine if the SUT rejects the command sent by the Edge Testing Tool as invalid and responds using the appropriate mechanisms. This is conducted in accordance with RFC 2811, Section 4.1.1 and 4.1.4 (e.g., closing the session abruptly).\n This is required test and maintains compliance with the secure health data transport messaging formats, processing requirements, and communication standards for Direct Edge message exchanges. See Section 1.2.1 and 1.2.2 of the 'Implementation Guide for Direct Edge Protocols' document. \nThe test correlates to Test ID 11 of the SMTP Test Cases (tab) within the 'DirectEdgeProtocols' spreadsheet. ",
      sutRole: 'receiver',
      sutHisp: true,
      criteria: "['h2-8']",
      sutEdge: true,
    },
    {
      name: 'SMTP Test 13 (Command Timeout)',
      id: 13,
      protocol: 'smtp',
      desc: "Verifies the ability of the receiving system to correctly timeout for various SMTP commands. The tool will keep the transaction open until a timeout is noted. As there are no required time limits in RFC 2821 section 4.5.3.2, this test is configurable. Hitting 'Run' will begin the ETT's timer based on the value in seconds entered below. The default entry, 0, allows a maximum time-out (no limit). Enter a value greater than your systems time-out period to perform this test.",
      longDesc:
        "The objective of this test sequence is to determine if an Edge System (e.g., SUT), acting as the receiver, can successfully establish an active session with a HISP (e.g., ETT), acting as the sender, and conform to the specific timeout requirements within the RFC and SMTP command.\n The details for conformance testing flow are as follows: The ETT will initiate a connected session with the SUT. The SUT will attempt to keep a transaction open with the ETT for beyond the specified time constraints found within RFC 2821, Section 4.5.3.2. \nThis is required test and maintains compliance with the secure health data transport messaging formats, processing requirements, and communication standards for Direct Edge message exchanges. See Section 1.2.1 and 1.2.2 of the 'Implementation Guide for Direct Edge Protocols' document. ",
      moreInfo: {
        subHeader: 'Description',
        subDesc:
          "Run this series collectively from one action: Test 9 and 16 verifies the ability of the receiving system to accept a STARTTLS connection with PLAIN SASL authentication. Hitting 'Run' will cause ETT to send an email (Test 20). Verify the receipt of email with subject 'STARTTLS & PLAIN SASL AUTHENTICATION'. If TLS Required is unchecked in the profile-STARTTLS validation will be ignored.",
        headers: ['Vendor Role', 'Vendor Edge', 'Vendor HISP'],
        tableData: [
          {
            cells: [
              { content: 'Sender', type: 'text' },
              { content: '', type: 'icon', isChecked: false },
              { content: '', type: 'icon', isChecked: true },
            ],
          },
        ],
        optionalTextField: {
          label: 'Command timeout in seconds',
          helperText: 'Amount of seconds you want to elapse before timeout',
          defaultValue: '0',
        },
        actionLabel: 'RUN',
      },
      sutRole: 'receiver',
      sutHisp: true,
      criteria: "['h2-8']",
      sutEdge: true,
      fields: [
        {
          label: 'Command timeout in seconds',
          name: 'sutCommandTimeoutInSeconds',
          datatype: 'String',
          placeHolder: 'Command timeout in seconds',
          value: 'Command timeout in seconds',
          readOnly: false,
          display: true,
        },
      ],
    },
    {
      name: 'SMTP MT Test 17 - Generate Unique Message-ID (Processed MDN suite)',
      id: 117,
      protocol: 'mu2',
      desc: "Verifies the ability of the sending system to send messages with unique message-IDs. The sending system will send multiple messages (at least 3) to wellformed14@james.healthit.gov. Hitting 'Run' will cause ETT to check the message IDs for uniqueness (use this case if you opt for 'Message tracking using Processed MDN').",
      longDesc: 'The credentials for authentication is vendoraccount@james.healthit.gov / vendortesting123  ',
      sutRole: 'sender',
      sutHisp: false,
      sutEdge: true,
    },
    {
      name: 'SMTP MT Test 45 - Generate Unique Message-ID (IG for Delivery Notification Suite)',
      id: 145,
      protocol: 'mu2',
      desc: "Verifies the ability of the sending system to send messages with unique message-IDs and a properly formed Disposition Notification Options Header. The sending system will send multiple messages (at least 3) to wellformed14@james.healthit.gov. Hitting 'Run' will cause ETT to check the message IDs for uniqueness.",
      longDesc: 'The credentials for authentication is vendoraccount@james.healthit.gov / vendortesting123  ',
      sutRole: 'sender',
      sutHisp: false,
      sutEdge: true,
    },
    {
      name: 'SMTP MT Test 46 (Generate Disposition Notification Options Header)',
      id: 146,
      protocol: 'mu2',
      moreInfo: {
        subHeader: 'Description',
        headers: ['Vendor Role', 'Vendor Edge', 'Vendor HISP'],
        tableData: [
          {
            cells: [
              { content: 'Sender', type: 'text' },
              { content: '', type: 'icon', isChecked: true },
              { content: '', type: 'icon', isChecked: false },
            ],
          },
        ],
        actionLabel: 'RUN',
      },
      desc: "Verifies the ability of the sending system to send messages with a correct Disposition Notification Options Header. The sending system will send a message to wellformed14@james.healthit.gov with the required header. Hitting 'Run' will cause ETT to check for this header.",
      longDesc: 'The credentials for authentication is vendoraccount@james.healthit.gov / vendortesting123  ',
      sutRole: 'sender',
      sutHisp: false,
      criteria: "['b1-2','su1-2']",
      sutEdge: true,
    },
    {
      name: 'SMTP MT Test 47 - Accept failure message for invalid recipient (IG for Delivery Notification Suite - IMAP/POP Receiver)',
      id: 147,
      protocol: 'mu2',
      desc: "Verifies the ability of the system to accept failure messages for some of the recipients. The system shall send a single email to multiple recipients: valid one (dispatchedonly-plain@ett.healthit.gov) and an invalid address (noaddressfailure9-plain@dnsops.ttpedge.sitenv.org ). The MDNs are delivered to the 'Mail From' address. The failure MDN for invalid recipient noaddressfailure9-plain@dnsops.ttpedge.sitenv.org  needs to be verified.",
      longDesc:
        'The credentials for authentication is vendoraccount@james.healthit.gov / vendortesting123. This is a test case for systems that receive using SMTP.  ',
      sutRole: 'sender',
      sutHisp: false,
      sutEdge: true,
    },
    {
      name: 'SMTP Test 22 (Reject invalid username/password)',
      id: 22,
      protocol: 'smtp',
      moreInfo: {
        subHeader: 'Description',
        headers: ['Vendor Role', 'Vendor Edge', 'Vendor HISP'],
        tableData: [
          {
            cells: [
              { content: 'Receiver', type: 'text' },
              { content: '', type: 'icon', isChecked: true },
              { content: '', type: 'icon', isChecked: true },
            ],
          },
        ],
        actionLabel: 'RUN',
      },
      desc: "Verifies the ability of the receiving to reject a PLAIN SASL connection. Hitting 'Run' will cause ETT to use an invalid username/password to authenticate to the system entered into Vendor SMTP Hostname/IP in the profile window.",
      longDesc:
        "The objective of this test sequence is to determine if an Edge System (e.g., SUT), acting as the receiver, will reject and fail to authenticate an invalid PLAIN SASL request sent from a HISP (e.g., ETT), acting as the sender.\nThe details for conformance testing flow are as follows: The ETT will send an invalid PLAIN SASL username/password authentication scheme to the SUT. The SUT will receive the invalid PLAIN SASL username/password, reject the credentials, and fail to established authentication to the ETT. The PLAIN SASL connection mechanisms will conform to the specified requirements within RFC 4616, Section 2.\n This is conditional test and maintains compliance with the secure health data transport messaging formats, processing requirements, and communication standards for Direct Edge message exchanges. See Section 1.2.4 of the 'Implementation Guide for Direct Edge Protocols' document.\n The test correlates to Test ID 22 of the SMTP Test Cases (tab) within the 'DirectEdgeProtocols' spreadsheet. ",
      sutRole: 'receiver',
      sutHisp: true,
      criteria: "['h2-8']",
      sutEdge: true,
    },
    {
      name: 'SMTP Test 25(a) (Receive Text and CCDA)',
      id: 91,
      protocol: 'smtp',
      moreInfo: {
        subHeader: 'Description',
        headers: ['Vendor Role', 'Vendor Edge', 'Vendor HISP'],
        tableData: [
          {
            cells: [
              { content: 'Receiver', type: 'text' },
              { content: '', type: 'icon', isChecked: true },
              { content: '', type: 'icon', isChecked: true },
            ],
          },
        ],
        actionLabel: 'RUN',
      },
      desc: ' Verifies the ability of SUT to receive text and CCDA attachments',
      longDesc: 'Verifies the ability of SUT to receive text and CCDA attachments',
      sutRole: 'receiver',
      sutHisp: true,
      criteria: "['b1-4','su1-4']",
      sutEdge: true,
    },
    {
      name: 'SMTP Test 25(b) (Receive PDF and CCDA)',
      id: 92,
      protocol: 'smtp',
      moreInfo: {
        subHeader: 'Description',
        headers: ['Vendor Role', 'Vendor Edge', 'Vendor HISP'],
        tableData: [
          {
            cells: [
              { content: 'Receiver', type: 'text' },
              { content: '', type: 'icon', isChecked: true },
              { content: '', type: 'icon', isChecked: true },
            ],
          },
        ],
        actionLabel: 'RUN',
      },
      desc: ' Verifies the ability of SUT to receive PDF and CCDA attachments',
      longDesc: 'Verifies the ability of SUT to receive PDF and CCDA attachments',
      sutRole: 'receiver',
      sutHisp: true,
      criteria: "['b1-4','su1-4']",
      sutEdge: true,
    },
    {
      name: 'SMTP Test 25(c) (Receive Text and XDM)',
      id: 93,
      protocol: 'smtp',
      moreInfo: {
        subHeader: 'Description',
        headers: ['Vendor Role', 'Vendor Edge', 'Vendor HISP'],
        tableData: [
          {
            cells: [
              { content: 'Receiver', type: 'text' },
              { content: '', type: 'icon', isChecked: true },
              { content: '', type: 'icon', isChecked: true },
            ],
          },
        ],
        actionLabel: 'RUN',
      },
      desc: ' Verifies the ability of SUT to receive text and XDM attachments',
      longDesc: 'Verifies the ability of SUT to receive text and CCDA attachments',
      sutRole: 'receiver',
      sutHisp: true,
      criteria: "['b1-4','su1-4']",
      sutEdge: true,
    },
    {
      name: 'SMTP Test 25(d) (Receive CCDA and Text)',
      id: 94,
      protocol: 'smtp',
      moreInfo: {
        subHeader: 'Description',
        headers: ['Vendor Role', 'Vendor Edge', 'Vendor HISP'],
        tableData: [
          {
            cells: [
              { content: 'Receiver', type: 'text' },
              { content: '', type: 'icon', isChecked: true },
              { content: '', type: 'icon', isChecked: true },
            ],
          },
        ],
        actionLabel: 'RUN',
      },
      desc: ' Verifies the ability of SUT to receive CCDA and text attachments',
      longDesc: 'Verifies the ability of SUT to receive text and CCDA attachments',
      sutRole: 'receiver',
      sutHisp: true,
      criteria: "['b1-4','su1-4']",
      sutEdge: true,
    },
    {
      name: 'SMTP Test 25(e) (Receive CCDA and Pdf)',
      id: 95,
      protocol: 'smtp',
      moreInfo: {
        subHeader: 'Description',
        headers: ['Vendor Role', 'Vendor Edge', 'Vendor HISP'],
        tableData: [
          {
            cells: [
              { content: 'Receiver', type: 'text' },
              { content: '', type: 'icon', isChecked: true },
              { content: '', type: 'icon', isChecked: true },
            ],
          },
        ],
        actionLabel: 'RUN',
      },
      desc: ' Verifies the ability of SUT to receive CCDA and PDF attachments',
      longDesc: 'Verifies the ability of SUT to receive text and CCDA attachments',
      sutRole: 'receiver',
      sutHisp: true,
      criteria: "['b1-4','su1-4']",
      sutEdge: true,
    },
    {
      name: 'SMTP Test 25(f) (Receive XDM and Text)',
      id: 96,
      protocol: 'smtp',
      moreInfo: {
        subHeader: 'Description',
        headers: ['Vendor Role', 'Vendor Edge', 'Vendor HISP'],
        tableData: [
          {
            cells: [
              { content: 'Receiver', type: 'text' },
              { content: '', type: 'icon', isChecked: true },
              { content: '', type: 'icon', isChecked: true },
            ],
          },
        ],
        actionLabel: 'RUN',
      },
      desc: ' Verifies the ability of SUT to receive XDM and text attachments',
      longDesc: 'Verifies the ability of SUT to receive text and CCDA attachments',
      sutRole: 'receiver',
      sutHisp: true,
      criteria: "['b1-4','su1-4']",
      sutEdge: true,
    },
    {
      name: 'SMTP Test 26(a) (Receive bad CCDA)',
      id: 97,
      protocol: 'smtp',
      moreInfo: {
        subHeader: 'Description',
        headers: ['Vendor Role', 'Vendor Edge', 'Vendor HISP'],
        tableData: [
          {
            cells: [
              { content: 'Receiver', type: 'text' },
              { content: '', type: 'icon', isChecked: true },
              { content: '', type: 'icon', isChecked: true },
            ],
          },
        ],
        actionLabel: 'RUN',
      },
      desc: ' Verifies the ability of SUT to receive a CCDA document that includes a broken reference to a style-sheet.',
      longDesc:
        ' Verifies the ability of SUT to receive a CCDA document that includes a broken reference to a style-sheet. \n Expected outcome: SUT will accept the C-CDA despite the problems.',
      sutRole: 'receiver',
      sutHisp: true,
      criteria: "['b1-4']",
      sutEdge: true,
    },
    {
      name: 'SMTP Test 26(b) (Receive bad CCDA)',
      id: 98,
      protocol: 'smtp',
      moreInfo: {
        subHeader: 'Description',
        headers: ['Vendor Role', 'Vendor Edge', 'Vendor HISP'],
        tableData: [
          {
            cells: [
              { content: 'Receiver', type: 'text' },
              { content: '', type: 'icon', isChecked: true },
              { content: '', type: 'icon', isChecked: true },
            ],
          },
        ],
        actionLabel: 'RUN',
      },
      desc: ' Verifies the ability of SUT to receive a CCDA document with good reference to an invalid style-sheet',
      longDesc:
        ' Verifies the ability of SUT to receive a CCDA document with good reference to an invalid style-sheet. \n Expected outcome: SUT will accept the C-CDA despite the problems.',
      sutRole: 'receiver',
      sutHisp: true,
      criteria: "['b1-4']",
      sutEdge: true,
    },
    {
      name: 'SMTP Test 27 (Receive XDM with bad XHTML)',
      id: 99,
      protocol: 'smtp',
      moreInfo: {
        subHeader: 'Description',
        headers: ['Vendor Role', 'Vendor Edge', 'Vendor HISP'],
        tableData: [
          {
            cells: [
              { content: 'Receiver', type: 'text' },
              { content: '', type: 'icon', isChecked: true },
              { content: '', type: 'icon', isChecked: true },
            ],
          },
        ],
        actionLabel: 'RUN',
      },
      desc: ' Verifies the ability of SUT to receive an XDM package containing a bad XHTML file',
      longDesc: 'Verifies the ability of SUT to receive an XDM package containing a bad XHTML file',
      sutRole: 'receiver',
      sutHisp: true,
      criteria: "['b1-4']",
      sutEdge: true,
    },
    {
      name: "SMTP Test 28 (Receive XDM with MIME type 'application/octet-stream')",
      id: 100,
      protocol: 'smtp',
      moreInfo: {
        subHeader: 'Description',
        headers: ['Vendor Role', 'Vendor Edge', 'Vendor HISP'],
        tableData: [
          {
            cells: [
              { content: 'Receiver', type: 'text' },
              { content: '', type: 'icon', isChecked: true },
              { content: '', type: 'icon', isChecked: true },
            ],
          },
        ],
        actionLabel: 'RUN',
      },
      desc: " Verifies the ability of SUT to receive an XDM package with MIME-type 'application/octet-stream' at the SMTP layer",
      longDesc: `Verifies the ability of SUT to receive an XDM package with MIME-type 'application/octet-stream' at the SMTP layer`,
      sutRole: 'receiver',
      sutHisp: true,
      criteria: "['b1-4','su1-4']",
      sutEdge: true,
    },
    {
      name: "SMTP Test 29 (Receive XDM with MIME type 'application/xml')",
      id: 90,
      protocol: 'smtp',
      moreInfo: {
        subHeader: 'Description',
        headers: ['Vendor Role', 'Vendor Edge', 'Vendor HISP'],
        tableData: [
          {
            cells: [
              { content: 'Receiver', type: 'text' },
              { content: '', type: 'icon', isChecked: true },
              { content: '', type: 'icon', isChecked: true },
            ],
          },
        ],
        actionLabel: 'RUN',
      },
      desc: " Verifies the ability of Vendor to receive an XDM package with MIME-type 'application/xml' at the XDM layer (in METADATA.XML)",
      longDesc: `Verifies the ability of Vendor to receive an XDM package with MIME-type 'application/xml' at the XDM layer (in METADATA.XML)`,
      sutRole: 'receiver',
      sutHisp: true,
      criteria: "['b1-4','su1-4']",
      sutEdge: true,
    },
    {
      name: 'SMTP MT Test 1 (Message to Non-Existent Address)',
      id: 101,
      desc: "Verify the ability of the system to provide a delivery failure message  when a message is sent to an invalid address. Hitting 'Run' will cause  ETT to send a message with a final destination that is not valid. Due to SMTP-SMTP configuration limitations, the proctor is to visually inspect for the receipt of the negative delivery status notification message. The expectation is that an appropriate delivery failure message will be returned.",
      longDesc: 'The email is sent to badaddresst@ttpds2.sitenv.org',
      protocol: 'mu2',
      moreInfo: {
        subHeader: 'Description',
        subDesc: 'The email is sent to badaddresst@direct.ett.healthit.gov',
        headers: ['Vendor Role', 'Vendor Edge', 'Vendor HISP'],
        tableData: [
          {
            cells: [
              { content: 'Sender', type: 'text' },
              { content: '', type: 'icon', isChecked: false },
              { content: '', type: 'icon', isChecked: true },
            ],
          },
        ],
        actionLabel: 'RUN',
      },
      sutRole: 'sender',
      sutHisp: true,
      criteria: "['h2-4','sc2-4']",
      sutEdge: false,
    },
    {
      name: 'SMTP MT Test 2 (Receiving HISP Not Trusted)',
      id: 102,
      desc: "Verify the ability of the system to provide a delivery failure message when a message is sent to an untrusted address). Hitting 'Run' will cause ETT  to send a message to an untrusted final address. Due to SMTP-SMTP configuration limitations, the proctor is to visually inspect for the receipt of the negative delivery status notification message. The expectation is that an appropriate delivery failure message will be returned.",
      longDesc: 'The email is sent to direct2.sitenv.org',
      protocol: 'mu2',
      moreInfo: {
        subHeader: 'Description',
        subDesc: 'The email is sent to provider1@direct2.sitenv.gov',
        headers: ['Vendor Role', 'Vendor Edge', 'Vendor HISP'],
        tableData: [
          {
            cells: [
              { content: 'Sender', type: 'text' },
              { content: '', type: 'icon', isChecked: false },
              { content: '', type: 'icon', isChecked: true },
            ],
          },
        ],
        actionLabel: 'RUN',
      },
      sutRole: 'sender',
      sutHisp: true,
      criteria: "['h2-4','sc2-4']",
      sutEdge: false,
    },
    {
      name: "SMTP MT Test 3 (Recipient's Certificate Not Published)",
      id: 103,
      longDesc: 'The email is sent to failure15@james.healthit.gov',
      desc: "Verify the ability of the system to provide a delivery failure message when a message is sent to a destination that does not have a published  certificate. Hitting 'Run' will cause ETT to send a message with a  final destination that does not have a published certificate. Due to SMTP-SMTP configuration limitations, the proctor is to visually inspect for the receipt of the negative delivery status notification message. The expectation is that an appropriate delivery failure message will be returned.",
      protocol: 'mu2',
      moreInfo: {
        subHeader: 'Description',
        subDesc: 'The email is sent to failure15@james.healthit.gov',
        headers: ['Vendor Role', 'Vendor Edge', 'Vendor HISP'],
        tableData: [
          {
            cells: [
              { content: 'Sender', type: 'text' },
              { content: '', type: 'icon', isChecked: false },
              { content: '', type: 'icon', isChecked: true },
            ],
          },
        ],
        actionLabel: 'RUN',
      },
      sutRole: 'sender',
      sutHisp: true,
      criteria: "['h2-4','sc2-4']",
      sutEdge: false,
    },
    {
      name: 'SMTP MT Test 4 (No Processed MDN)',
      id: 104,
      longDesc: 'The email is sent to nomdn8@ett.healthit.gov',
      desc: "Verify the ability of the system to provide a delivery failure message  when a message is sent to a destination that does not return a processed  MDN. Hitting 'Run' will cause ETT to send a message with a final  destination that will not provide a processed MDN. Due to SMTP-SMTP configuration limitations, the proctor is to visually inspect for the receipt of the negative delivery status notification message. The expectation is that an appropriate delivery failure message will be returned.",
      protocol: 'mu2',
      moreInfo: {
        subHeader: 'Description',
        subDesc: 'The email is sent to nomdn8@ett.healthit.gov',
        headers: ['Vendor Role', 'Vendor Edge', 'Vendor HISP'],
        tableData: [
          {
            cells: [
              { content: 'Sender', type: 'text' },
              { content: '', type: 'icon', isChecked: false },
              { content: '', type: 'icon', isChecked: true },
            ],
          },
        ],
        actionLabel: 'RUN',
      },
      sutRole: 'sender',
      sutHisp: true,
      criteria: "['h2-4','sc2-4']",
      sutEdge: false,
    },
    {
      name: 'SMTP/IMAP MT Test 5 (Message to Bad Address)',
      id: 105,
      longDesc: 'The email is sent to badaddresst@ttpds2.sitenv.org',
      desc: "Verify the ability of the system to provide a delivery failure message  when a message is sent to an invalid address. Hitting 'Run' will cause  ETT to send a message with a final destination that is not valid. If the message was sent successfully 'Check MDN' will appear. Clicking that will check for the incoming MDN (may have to click multiple times due to lag). The expectation is that an appropriate delivery failure message will be returned.",
      protocol: 'mu2',
      moreInfo: {
        subHeader: 'Description',
        subDesc: 'The email is sent to badaddresst@direct.ett.healthit.gov',
        headers: ['Vendor Role', 'Vendor Edge', 'Vendor HISP'],
        tableData: [
          {
            cells: [
              { content: 'Sender', type: 'text' },
              { content: '', type: 'icon', isChecked: false },
              { content: '', type: 'icon', isChecked: true },
            ],
          },
        ],
        actionLabel: 'RUN',
      },
      sutRole: 'sender',
      sutHisp: true,
      criteria: "['h2-4','sc2-4']",
      sutEdge: false,
    },
    {
      name: 'SMTP/IMAP MT Test 6 (Receiving HISP Not Trusted)',
      id: 106,
      longDesc: 'The email is sent to direct2.sitenv.org',
      desc: "Verify the ability of the system to provide a delivery failure message  when a message is sent to an untrusted address. Hitting 'Run' will  cause ETT to send a message with a final destination that is not a  trusted HISP. The expectation is that if the message was sent successfully 'Check MDN' will appear. Clicking that will check for the incoming MDN (may have to click multiple times due to lag). The expectation is that an appropriate delivery failure message will be returned.",
      protocol: 'mu2',
      moreInfo: {
        subHeader: 'Description',
        subDesc: 'The email is sent to provider1@direct2.sitenv.gov',
        headers: ['Vendor Role', 'Vendor Edge', 'Vendor HISP'],
        tableData: [
          {
            cells: [
              { content: 'Sender', type: 'text' },
              { content: '', type: 'icon', isChecked: false },
              { content: '', type: 'icon', isChecked: true },
            ],
          },
        ],
        actionLabel: 'RUN',
      },
      sutRole: 'sender',
      sutHisp: true,
      criteria: "['h2-4','sc2-4']",
      sutEdge: false,
    },
    {
      name: "SMTP/IMAP MT Test 7 (Recipient's Certificate Not Published)",
      id: 107,
      longDesc: 'The email is sent to failure15@james.healthit.gov',
      desc: "Verify the ability of the system to provide a delivery failure message  when a message is sent to a destination that does not have a published  certificate. Hitting 'Run' will cause ETT to send a message with a  final destination that does not have a published certificate. If the message was sent successfully 'Check MDN' will appear. Clicking that will check for the incoming MDN (may have to click multiple times due to lag). The expectation is that an appropriate delivery failure message will be returned.",
      protocol: 'mu2',
      moreInfo: {
        subHeader: 'Description',
        subDesc: 'The email is sent to failure15@james.healthit.gov',
        headers: ['Vendor Role', 'Vendor Edge', 'Vendor HISP'],
        tableData: [
          {
            cells: [
              { content: 'Sender', type: 'text' },
              { content: '', type: 'icon', isChecked: false },
              { content: '', type: 'icon', isChecked: true },
            ],
          },
        ],
        actionLabel: 'RUN',
      },
      sutRole: 'sender',
      sutHisp: true,
      criteria: "['h2-4','sc2-4']",
      sutEdge: false,
    },
    {
      name: 'SMTP/IMAP MT Test 8 (No Processed MDN)',
      id: 108,
      longDesc: 'The email is sent to nomdn8@ett.healthit.gov',
      desc: "Verify the ability of the system to provide a delivery failure message  when a message is sent to a destination that does not return a processed  MDN. Hitting 'Run' will cause ETT to send a message with a final  destination that will not provide a processed MDN. If the message was sent successfully 'Check MDN' will appear. Clicking that will check for the incoming MDN (may have to click multiple times due to lag). The expectation is that an appropriate delivery failure message will be returned.",
      protocol: 'mu2',
      moreInfo: {
        subHeader: 'Description',
        subDesc: 'The email is sent to nomdn8@ett.healthit.gov',
        headers: ['Vendor Role', 'Vendor Edge', 'Vendor HISP'],
        tableData: [
          {
            cells: [
              { content: 'Sender', type: 'text' },
              { content: '', type: 'icon', isChecked: false },
              { content: '', type: 'icon', isChecked: true },
            ],
          },
        ],
        actionLabel: 'RUN',
      },
      sutRole: 'sender',
      sutHisp: true,
      criteria: "['h2-4','sc2-4']",
      sutEdge: false,
    },
    {
      name: 'SMTP/POP MT Test 9 (Message to Bad Address)',
      id: 109,
      longDesc: 'The email is sent to badaddresst@ttpds2.sitenv.org',
      desc: "Verify the ability of the system to provide a delivery failure message  when a message is sent to an invalid address. Hitting 'Run' will cause  ETT to send a message with a final destination that is not valid.  The expectation is that if the message was sent successfully 'Check MDN' will appear. Clicking that will check for the incoming MDN (may have to click multiple times due to lag). The expectation is that an appropriate delivery failure message will be returned.",
      protocol: 'mu2',
      moreInfo: {
        subHeader: 'Description',
        subDesc: 'The email is sent to badaddresst@direct.ett.healthit.gov',
        headers: ['Vendor Role', 'Vendor Edge', 'Vendor HISP'],
        tableData: [
          {
            cells: [
              { content: 'Sender', type: 'text' },
              { content: '', type: 'icon', isChecked: false },
              { content: '', type: 'icon', isChecked: true },
            ],
          },
        ],
        actionLabel: 'RUN',
      },
      sutRole: 'sender',
      sutHisp: true,
      criteria: "['h2-4','sc2-4']",
      sutEdge: false,
    },
    {
      name: 'SMTP/POP MT Test 10 (Receiving HISP Not Trusted)',
      id: 110,
      longDesc: 'The email is sent to direct2.sitenv.org',
      desc: "Verify the ability of the system to provide a delivery failure message  when a message is sent to an untrusted address. Hitting 'Run' will  cause ETT to send a message with a final destination that is not a  trusted HISP. If the message was sent successfully 'Check MDN' will appear. Clicking that will check for the incoming MDN (may have to click multiple times due to lag). The expectation is that an appropriate delivery failure message will be returned.",
      protocol: 'mu2',
      moreInfo: {
        subHeader: 'Description',
        subDesc: 'The email is sent to provider1@direct2.sitenv.gov',
        headers: ['Vendor Role', 'Vendor Edge', 'Vendor HISP'],
        tableData: [
          {
            cells: [
              { content: 'Sender', type: 'text' },
              { content: '', type: 'icon', isChecked: false },
              { content: '', type: 'icon', isChecked: true },
            ],
          },
        ],
        actionLabel: 'RUN',
      },
      sutRole: 'sender',
      sutHisp: true,
      criteria: "['h2-4','sc2-4']",
      sutEdge: false,
    },
    {
      name: "SMTP/POP MT Test 11 (Recipient's Certificate Not Published)",
      id: 111,
      longDesc: 'The email is sent to failure15@james.healthit.gov',
      desc: "Verify the ability of the system to provide a delivery failure message  when a message is sent to a destination that does not have a published  certificate. Hitting 'Run' will cause ETT to send a message with a  final destination that does not have a published certificate. If the message was sent successfully 'Check MDN' will appear. Clicking that will check for the incoming MDN (may have to click multiple times due to lag). The expectation is that an appropriate delivery failure message will be returned.",
      protocol: 'mu2',
      moreInfo: {
        subHeader: 'Description',
        subDesc: 'The email is sent to failure15@james.healthit.gov',
        headers: ['Vendor Role', 'Vendor Edge', 'Vendor HISP'],
        tableData: [
          {
            cells: [
              { content: 'Sender', type: 'text' },
              { content: '', type: 'icon', isChecked: false },
              { content: '', type: 'icon', isChecked: true },
            ],
          },
        ],
        actionLabel: 'RUN',
      },
      sutRole: 'sender',
      sutHisp: true,
      criteria: "['h2-4','sc2-4']",
      sutEdge: false,
    },
    {
      name: 'SMTP/POP MT Test 12 (No Processed MDN)',
      id: 112,
      longDesc: 'The email is sent to nomdn8@ett.healthit.gov',
      desc: "Verify the ability of the system to provide a delivery failure message  when a message is sent to a destination that does not return a processed  MDN. Hitting 'Run' will cause ETT to send a message with a final  destination that will not provide a processed MDN. If the message was sent successfully 'Check MDN' will appear. Clicking that will check for the incoming MDN (may have to click multiple times due to lag). The expectation is that an appropriate delivery failure message will be returned.",
      protocol: 'mu2',
      moreInfo: {
        subHeader: 'Description',
        subDesc: 'The email is sent to nomdn8@ett.healthit.gov',
        headers: ['Vendor Role', 'Vendor Edge', 'Vendor HISP'],
        tableData: [
          {
            cells: [
              { content: 'Sender', type: 'text' },
              { content: '', type: 'icon', isChecked: false },
              { content: '', type: 'icon', isChecked: true },
            ],
          },
        ],
        actionLabel: 'RUN',
      },
      sutRole: 'sender',
      sutHisp: true,
      criteria: "['h2-4','sc2-4']",
      sutEdge: false,
    },
    {
      name: 'SMTP MT Test 21(a) (Message with Good Header)',
      id: 521,
      longDesc: 'The email is sent to processeddispatched6@ett.healthit.gov',
      desc: "Verify the ability of the system to properly process the  Disposition-Notifications-Options Header. Hitting 'Run' will cause ETT  to send a message with an appropriate Disposition-Notifications-Options  Header. Due to SMTP-SMTP configuration limitations, the proctor is to visually inspect for the receipt of the positive delivery status notification message.The expectation is that the Vendor will handle the header appropriately and provide a processed MDN.",
      protocol: 'mu2',
      moreInfo: {
        subHeader: 'Description',
        subDesc: 'The email is sent to processeddispatched6@ett.healthit.gov',
        headers: ['Vendor Role', 'Vendor Edge', 'Vendor HISP'],
        tableData: [
          {
            cells: [
              { content: 'Sender', type: 'text' },
              { content: '', type: 'icon', isChecked: false },
              { content: '', type: 'icon', isChecked: true },
            ],
          },
        ],
        actionLabel: 'RUN',
      },
      sutRole: 'sender',
      sutHisp: true,
      criteria: "['h2-9']",
      sutEdge: false,
    },
    {
      name: 'SMTP/IMAP MT Test 21(b) (Message with Good Header)',
      id: 121,
      longDesc: 'The email is sent to processeddispatched6@ett.healthit.gov',
      desc: "Verify the ability of the system to properly process the  Disposition-Notifications-Options Header. Hitting 'Run' will cause ETT  to send a message with an appropriate Disposition-Notifications-Options  Header. If the message was sent successfully 'Check MDN' will appear. Clicking that will check for the incoming MDN (may have to click multiple times due to lag).The expectation is that the Vendor will handle the header appropriately and provide a processed MDN.",
      protocol: 'mu2',
      moreInfo: {
        subHeader: 'Description',
        subDesc: 'The email is sent to processeddispatched6@ett.healthit.gov',
        headers: ['Vendor Role', 'Vendor Edge', 'Vendor HISP'],
        tableData: [
          {
            cells: [
              { content: 'Sender', type: 'text' },
              { content: '', type: 'icon', isChecked: false },
              { content: '', type: 'icon', isChecked: true },
            ],
          },
        ],
        actionLabel: 'RUN',
      },
      sutRole: 'sender',
      sutHisp: true,
      criteria: "['h2-9']",
      sutEdge: false,
    },
    {
      name: 'SMTP/POP MT Test 21(c) (Message with Good Header)',
      id: 151,
      longDesc: 'The email is sent to processeddispatched6@ett.healthit.gov',
      desc: "Verify the ability of the system to properly process the  Disposition-Notifications-Options Header. Hitting 'Run' will cause ETT  to send a message with an appropriate Disposition-Notifications-Options  Header. If the message was sent successfully 'Check MDN' will appear. Clicking that will check for the incoming MDN (may have to click multiple times due to lag). The expectation is that the Vendor will handle the header appropriately and provide a processed MDN.",
      protocol: 'mu2',
      moreInfo: {
        subHeader: 'Description',
        subDesc: 'The email is sent to processeddispatched6@ett.healthit.gov',
        headers: ['Vendor Role', 'Vendor Edge', 'Vendor HISP'],
        tableData: [
          {
            cells: [
              { content: 'Sender', type: 'text' },
              { content: '', type: 'icon', isChecked: false },
              { content: '', type: 'icon', isChecked: true },
            ],
          },
        ],
        actionLabel: 'RUN',
      },
      sutRole: 'sender',
      sutHisp: true,
      criteria: "['h2-9']",
      sutEdge: false,
    },
    {
      name: 'SMTP MT Test 23(a) (Message to Bad Address)',
      id: 523,
      longDesc: 'The email is sent to badaddresst@ttpds2.sitenv.org',
      desc: "Verify the ability of the system to provide a delivery failure message  when a message is sent to an invalid address. Hitting 'Run' will cause  ETT to send a message with a final destination that is not valid. Due to SMTP-SMTP configuration limitations, the proctor is to visually inspect for the receipt of the negative delivery status notification message. The expectation is that an appropriate delivery failure message will be returned.",
      protocol: 'mu2',
      moreInfo: {
        subHeader: 'Description',
        subDesc: 'The email is sent to nomdn8@ett.healthit.gov',
        headers: ['Vendor Role', 'Vendor Edge', 'Vendor HISP'],
        tableData: [
          {
            cells: [
              { content: 'Sender', type: 'text' },
              { content: '', type: 'icon', isChecked: false },
              { content: '', type: 'icon', isChecked: true },
            ],
          },
        ],
        actionLabel: 'RUN',
      },
      sutRole: 'sender',
      sutHisp: true,
      criteria: "['h2-9']",
      sutEdge: false,
    },
    {
      name: 'SMTP/IMAP MT Test 23(b) (Message to Bad Address)',
      id: 123,
      longDesc: 'The email is sent to badaddresst@ttpds2.sitenv.org',
      desc: "Verify the ability of the system to provide a delivery failure message  when a message is sent to an invalid address. Hitting 'Run' will cause  ETT to send a message with a final destination that is not valid. If the message was sent successfully 'Check MDN' will appear. Clicking that will check for the incoming MDN (may have to click multiple times due to lag). The expectation is that an appropriate delivery failure message will be returned.",
      protocol: 'mu2',
      moreInfo: {
        subHeader: 'Description',
        subDesc: 'The email is sent to nomdn8@ett.healthit.gov',
        headers: ['Vendor Role', 'Vendor Edge', 'Vendor HISP'],
        tableData: [
          {
            cells: [
              { content: 'Sender', type: 'text' },
              { content: '', type: 'icon', isChecked: false },
              { content: '', type: 'icon', isChecked: true },
            ],
          },
        ],
        actionLabel: 'RUN',
      },
      sutRole: 'sender',
      sutHisp: true,
      criteria: "['h2-9']",
      sutEdge: false,
    },
    {
      name: 'SMTP/POP MT Test 23(c) (Message to Bad Address)',
      id: 623,
      longDesc: 'The email is sent to badaddresst@ttpds2.sitenv.org',
      desc: "Verify the ability of the system to provide a delivery failure message  when a message is sent to an invalid address. Hitting 'Run' will cause  ETT to send a message with a final destination that is not valid. If the message was sent successfully 'Check MDN' will appear. Clicking that will check for the incoming MDN (may have to click multiple times due to lag). The expectation is that an appropriate delivery failure message will be returned.",
      protocol: 'mu2',
      moreInfo: {
        subHeader: 'Description',
        subDesc: 'The email is sent to nomdn8@ett.healthit.gov',
        headers: ['Vendor Role', 'Vendor Edge', 'Vendor HISP'],
        tableData: [
          {
            cells: [
              { content: 'Sender', type: 'text' },
              { content: '', type: 'icon', isChecked: false },
              { content: '', type: 'icon', isChecked: true },
            ],
          },
        ],
        actionLabel: 'RUN',
      },
      sutRole: 'sender',
      sutHisp: true,
      criteria: "['h2-9']",
      sutEdge: false,
    },
    {
      name: 'SMTP MT Test 24(a) (Receiving HISP Not Trusted)',
      id: 524,
      longDesc: 'The email is sent to badaddresst@ttpds2.sitenv.org',
      desc: "Verify the ability of the system to provide a delivery failure message  when a message is sent to an untrusted HISP. Hitting 'Run' will  cause ETT to send a message with a final destination that is not a  trusted HISP. Due to SMTP-SMTP configuration limitations, the proctor is to visually inspect for the receipt of the negative delivery status notification message. The expectation is that an appropriate delivery failure message will be returned.",
      protocol: 'mu2',
      moreInfo: {
        subHeader: 'Description',
        subDesc: 'badaddresst@direct.ett.healthit.gov',
        headers: ['Vendor Role', 'Vendor Edge', 'Vendor HISP'],
        tableData: [
          {
            cells: [
              { content: 'Sender', type: 'text' },
              { content: '', type: 'icon', isChecked: false },
              { content: '', type: 'icon', isChecked: true },
            ],
          },
        ],
        actionLabel: 'RUN',
      },
      sutRole: 'sender',
      sutHisp: true,
      criteria: "['h2-9']",
      sutEdge: false,
    },
    {
      name: 'SMTP/IMAP MT Test 24(b) (Receiving HISP Not Trusted)',
      id: 124,
      longDesc: 'The email is sent to direct2.sitenv.org',
      desc: "Verify the ability of the system to provide a delivery failure message  when a message is sent to an untrusted HISP(direct2.sitenv.org). Hitting 'Run' will  cause ETT to send a message with a final destination that is not a  trusted HISP. If the message was sent successfully 'Check MDN' will appear. Clicking that will check for the incoming MDN (may have to click multiple times due to lag). The expectation is that an appropriate delivery failure message will be returned.",
      protocol: 'mu2',
      moreInfo: {
        subHeader: 'Description',
        subDesc: 'The email is sent to provider1@direct2.sitenv.gov',
        headers: ['Vendor Role', 'Vendor Edge', 'Vendor HISP'],
        tableData: [
          {
            cells: [
              { content: 'Sender', type: 'text' },
              { content: '', type: 'icon', isChecked: false },
              { content: '', type: 'icon', isChecked: true },
            ],
          },
        ],
        actionLabel: 'RUN',
      },
      sutRole: 'sender',
      sutHisp: true,
      criteria: "['h2-9']",
      sutEdge: false,
    },
    {
      name: 'SMTP/POP MT Test 24(c) (Receiving HISP Not Trusted)',
      id: 624,
      longDesc: 'The email is sent to direct2.sitenv.org',
      desc: "Verify the ability of the system to provide a delivery failure message  when a message is sent to an untrusted HISP. Hitting 'Run' will  cause ETT to send a message with a final destination that is not a  trusted HISP. If the message was sent successfully 'Check MDN' will appear. Clicking that will check for the incoming MDN (may have to click multiple times due to lag). The expectation is that an appropriate delivery failure message will be returned.",
      protocol: 'mu2',
      moreInfo: {
        subHeader: 'Description',
        subDesc: 'The email is sent to provider1@direct2.sitenv.gov',
        headers: ['Vendor Role', 'Vendor Edge', 'Vendor HISP'],
        tableData: [
          {
            cells: [
              { content: 'Sender', type: 'text' },
              { content: '', type: 'icon', isChecked: false },
              { content: '', type: 'icon', isChecked: true },
            ],
          },
        ],
        actionLabel: 'RUN',
      },
      sutRole: 'sender',
      sutHisp: true,
      criteria: "['h2-9']",
      sutEdge: false,
    },
    {
      name: "SMTP MT Test 25(a) (Recipient's Certificate Not Published)",
      id: 525,
      longDesc: 'The email is sent to failure15@james.healthit.gov',
      desc: "Verify the ability of the system to provide a delivery failure message  when a message is sent to a destination that does not have a published  certificate. Hitting 'Run' will cause ETT to send a message with a  final destination that does not have a published certificate. Due to SMTP-SMTP configuration limitations, the proctor is to visually inspect for the receipt of the negative delivery status notification message. The expectation is that an appropriate delivery failure message will be returned.",
      protocol: 'mu2',
      moreInfo: {
        subHeader: 'Description',
        subDesc: 'The email is sent to failure15@james.healthit.gov',
        headers: ['Vendor Role', 'Vendor Edge', 'Vendor HISP'],
        tableData: [
          {
            cells: [
              { content: 'Sender', type: 'text' },
              { content: '', type: 'icon', isChecked: false },
              { content: '', type: 'icon', isChecked: true },
            ],
          },
        ],
        actionLabel: 'RUN',
      },
      sutRole: 'sender',
      sutHisp: true,
      criteria: "['h2-9']",
      sutEdge: false,
    },
    {
      name: "SMTP/IMAP MT Test 25(b) (Recipient's Certificate Not Published)",
      id: 125,
      longDesc: 'The email is sent to failure15@james.healthit.gov',
      desc: "Verify the ability of the system to provide a delivery failure message  when a message is sent to a destination that does not have a published  certificate. Hitting 'Run' will cause ETT to send a message with a  final destination that does not have a published certificate. If the message was sent successfully 'Check MDN' will appear. Clicking that will check for the incoming MDN (may have to click multiple times due to lag). The expectation is that an appropriate delivery failure message will be returned.",
      protocol: 'mu2',
      moreInfo: {
        subHeader: 'Description',
        subDesc: 'The email is sent to failure15@james.healthit.gov',
        headers: ['Vendor Role', 'Vendor Edge', 'Vendor HISP'],
        tableData: [
          {
            cells: [
              { content: 'Sender', type: 'text' },
              { content: '', type: 'icon', isChecked: false },
              { content: '', type: 'icon', isChecked: true },
            ],
          },
        ],
        actionLabel: 'RUN',
      },
      sutRole: 'sender',
      sutHisp: true,
      criteria: "['h2-9']",
      sutEdge: false,
    },
    {
      name: "SMTP/POP MT Test 25(c) (Recipient's Certificate Not Published)",
      id: 625,
      longDesc: 'The email is sent to failure15@james.healthit.gov',
      desc: "Verify the ability of the system to provide a delivery failure message  when a message is sent to a destination that does not have a published  certificate. Hitting 'Run' will cause ETT to send a message with a  final destination that does not have a published certificate. If the message was sent successfully 'Check MDN' will appear. Clicking that will check for the incoming MDN (may have to click multiple times due to lag). The expectation is that an appropriate delivery failure message will be returned.",
      protocol: 'mu2',
      moreInfo: {
        subHeader: 'Description',
        subDesc: 'The email is sent to failure15@james.healthit.gov',
        headers: ['Vendor Role', 'Vendor Edge', 'Vendor HISP'],
        tableData: [
          {
            cells: [
              { content: 'Sender', type: 'text' },
              { content: '', type: 'icon', isChecked: false },
              { content: '', type: 'icon', isChecked: true },
            ],
          },
        ],
        actionLabel: 'RUN',
      },
      sutRole: 'sender',
      sutHisp: true,
      criteria: "['h2-9']",
      sutEdge: false,
    },
    {
      name: 'SMTP MT Test 26(a) (No Processed MDN)',
      id: 526,
      longDesc: 'The email is sent to nomdn8@ett.healthit.gov',
      desc: "Verify the ability of the system to provide a delivery failure message  when a message is sent to a destination that does not return a processed  MDN due to an exceeded wait time. Hitting 'Run' will cause ETT to send a message with a final  destination that will not provide a processed MDN. Due to SMTP-SMTP configuration limitations, the proctor is to visually inspect for the receipt of the negative delivery status notification message. The expectation is that an appropriate delivery failure message will be returned.",
      protocol: 'mu2',
      moreInfo: {
        subHeader: 'Description',
        subDesc: 'The email is sent to nomdn8@ett.healthit.gov',
        headers: ['Vendor Role', 'Vendor Edge', 'Vendor HISP'],
        tableData: [
          {
            cells: [
              { content: 'Sender', type: 'text' },
              { content: '', type: 'icon', isChecked: false },
              { content: '', type: 'icon', isChecked: true },
            ],
          },
        ],
        actionLabel: 'RUN',
      },
      sutRole: 'sender',
      sutHisp: true,
      criteria: "['h2-9']",
      sutEdge: false,
    },
    {
      name: 'SMTP/IMAP MT Test 26(b) (No Processed MDN)',
      id: 126,
      longDesc: 'The email is sent to nomdn8@ett.healthit.gov',
      desc: "Verify the ability of the system to provide a delivery failure message  when a message is sent to a destination that does not return a processed  MDN due to an exceeded wait time. Hitting 'Run' will cause ETT to send a message with a final  destination that will not provide a processed MDN. If the message was sent successfully 'Check MDN' will appear. Clicking that will check for the incoming MDN (may have to click multiple times due to lag). The expectation is that an appropriate delivery failure message will be returned",
      protocol: 'mu2',
      moreInfo: {
        subHeader: 'Description',
        subDesc: 'The email is sent to nomdn8@ett.healthit.gov',
        headers: ['Vendor Role', 'Vendor Edge', 'Vendor HISP'],
        tableData: [
          {
            cells: [
              { content: 'Sender', type: 'text' },
              { content: '', type: 'icon', isChecked: false },
              { content: '', type: 'icon', isChecked: true },
            ],
          },
        ],
        actionLabel: 'RUN',
      },
      sutRole: 'sender',
      sutHisp: true,
      criteria: "['h2-9']",
      sutEdge: false,
    },
    {
      name: 'SMTP/POP MT Test 26(c) (No Processed MDN)',
      id: 626,
      longDesc: 'The email is sent to nomdn8@ett.healthit.gov',
      desc: "Verify the ability of the system to provide a delivery failure message  when a message is sent to a destination that does not return a processed  MDN due to an exceeded wait time. Hitting 'Run' will cause ETT to send a message with a final  destination that will not provide a processed MDN. If the message was sent successfully 'Check MDN' will appear. Clicking that will check for the incoming MDN (may have to click multiple times due to lag). The expectation is that an appropriate delivery failure message will be returned.",
      protocol: 'mu2',
      moreInfo: {
        subHeader: 'Description',
        subDesc: 'The email is sent to nomdn8@ett.healthit.gov',
        headers: ['Vendor Role', 'Vendor Edge', 'Vendor HISP'],
        tableData: [
          {
            cells: [
              { content: 'Sender', type: 'text' },
              { content: '', type: 'icon', isChecked: false },
              { content: '', type: 'icon', isChecked: true },
            ],
          },
        ],
        actionLabel: 'RUN',
      },
      sutRole: 'sender',
      sutHisp: true,
      criteria: "['h2-9']",
      sutEdge: false,
    },
    {
      name: 'SMTP MT Test 27(a) (No Dispatched MDN)',
      id: 527,
      longDesc: 'The email is sent to processedonly5@ett.healthit.gov',
      desc: "Verify the ability of the system to provide a delivery failure message  when a message is sent to a destination that does not return a  dispatched MDN. Hitting 'Run' will cause ETT to send a message with a  final destination that will not provide a dispatched MDN. Due to SMTP-SMTP configuration limitations, the proctor is to visually inspect for the receipt of the negative delivery status notification message. The expectation is that an appropriate delivery failure message will be returned.",
      protocol: 'mu2',
      moreInfo: {
        subHeader: 'Description',
        subDesc: 'The email is sent to processedonly5@ett.healthit.gov',
        headers: ['Vendor Role', 'Vendor Edge', 'Vendor HISP'],
        tableData: [
          {
            cells: [
              { content: 'Sender', type: 'text' },
              { content: '', type: 'icon', isChecked: false },
              { content: '', type: 'icon', isChecked: true },
            ],
          },
        ],
        actionLabel: 'RUN',
      },
      sutRole: 'sender',
      sutHisp: true,
      criteria: "['h2-9']",
      sutEdge: false,
    },
    {
      name: 'SMTP/IMAP MT Test 27(b) (No Dispatched MDN)',
      id: 127,
      longDesc: 'The email is sent to processedonly5@ett.healthit.gov',
      desc: "Verify the ability of the system to provide a delivery failure message  when a message is sent to a destination that does not return a  dispatched MDN. Hitting 'Run' will cause ETT to send a message with a  final destination that will not provide a dispatched MDN. If the message was sent successfully 'Check MDN' will appear. Clicking that will check for the incoming MDN (may have to click multiple times due to lag). The expectation is that an appropriate delivery failure message will be returned.",
      protocol: 'mu2',
      moreInfo: {
        subHeader: 'Description',
        subDesc: 'The email is sent to processedonly5@ett.healthit.gov',
        headers: ['Vendor Role', 'Vendor Edge', 'Vendor HISP'],
        tableData: [
          {
            cells: [
              { content: 'Sender', type: 'text' },
              { content: '', type: 'icon', isChecked: false },
              { content: '', type: 'icon', isChecked: true },
            ],
          },
        ],
        actionLabel: 'RUN',
      },
      sutRole: 'sender',
      sutHisp: true,
      criteria: "['h2-9']",
      sutEdge: false,
    },
    {
      name: 'SMTP/POP MT Test 27(c) (No Dispatched MDN)',
      id: 157,
      longDesc: 'The email is sent to processedonly5@ett.healthit.gov',
      desc: "Verify the ability of the system to provide a delivery failure message  when a message is sent to a destination that does not return a  dispatched MDN. Hitting 'Run' will cause ETT to send a message with a  final destination that will not provide a dispatched MDN. If the message was sent successfully 'Check MDN' will appear. Clicking that will check for the incoming MDN (may have to click multiple times due to lag). The expectation is that an appropriate delivery failure message will be returned.",
      protocol: 'mu2',
      moreInfo: {
        subHeader: 'Description',
        headers: ['Vendor Role', 'Vendor Edge', 'Vendor HISP'],
        tableData: [
          {
            cells: [
              { content: 'Sender', type: 'text' },
              { content: '', type: 'icon', isChecked: false },
              { content: '', type: 'icon', isChecked: true },
            ],
          },
        ],
        actionLabel: 'RUN',
      },
      sutRole: 'sender',
      sutHisp: true,
      criteria: "['h2-9']",
      sutEdge: false,
    },
    {
      name: 'SMTP MT Test 28(a) (Delayed Dispatched MDN)',
      id: 528,
      longDesc:
        'This test is setup to allow a (N) + 5 minute timeout for the failure MDN, where N is the value entered to run the test. To run this test, enter the value (N) that the SUT will wait before generating a failure MDN. If the SUT sends an MDN prior to its default timeout (N), the test will fail. Sending a message between (N) and (N) + 5 min, no failure or success will be recorded. The test is setup to allow a buffer for the delivery of Dispatched MDN from the ETT as a Receiving HISP. Steps to run the test: 1) Enter the SUT timeout value (N) into the test input parameter box, 2) Select Run, 3) wait for (N) + 5 min, then select Check MDN. A PASS will result only if a FAILURE Notification and NO Success Notification is sent (Which means if no Failure Notification found or both found will generate failure). If the ETT receives a Dispatch MDN, the test will result in a Failure.',
      desc: "Verify the ability of the system to provide a delivery failure message  when a message is sent to a destination that does not return a  dispatched MDN after the expected wait time is exceeded. Hitting 'Run' will  cause ETT to send a message with a final destination that will not  provide a dispatched MDN. Due to SMTP-SMTP configuration limitations, the proctor is to visually inspect for the receipt of the negative delivery status notification message. The expectation is that an appropriate delivery failure message indicating a timeout will be returned.",
      protocol: 'mu2',
      moreInfo: {
        subHeader: 'Description',
        headers: ['Vendor Role', 'Vendor Edge', 'Vendor HISP'],
        tableData: [
          {
            cells: [
              { content: 'Sender', type: 'text' },
              { content: '', type: 'icon', isChecked: false },
              { content: '', type: 'icon', isChecked: true },
            ],
          },
        ],
        optionalTextField: {
          label: 'Command timeout in seconds',
          helperText: 'Amount of seconds you want to elapse before timeout',
          defaultValue: '0',
        },
        actionLabel: 'RUN',
      },
      sutRole: 'sender',
      sutHisp: true,
      criteria: "['h2-9']",
      sutEdge: false,
      fields: [
        {
          label: 'Timeout in minutes',
          name: 'sutCommandTimeoutInSeconds',
          datatype: 'String',
          placeHolder: 'Timeout In Minutes',
          value: 'Timeout In Minutes',
          readOnly: false,
          display: true,
        },
      ],
    },
    {
      name: 'SMTP/IMAP MT Test 28(b) (Delayed Dispatched MDN)',
      id: 128,
      longDesc:
        'This test is setup to allow a (N) + 5 minute timeout for the failure MDN, where N is the value entered to run the test. To run this test, enter the value (N) that the SUT will wait before generating a failure MDN. If the SUT sends an MDN prior to its default timeout (N), the test will fail. Sending a message between (N) and (N) + 5 min, no failure or success will be recorded. The test is setup to allow a buffer for the delivery of Dispatched MDN from the ETT as a Receiving HISP. Steps to run the test: 1) Enter the SUT timeout value (N) into the test input parameter box, 2) Select Run, 3) wait for (N) + 5 min, then select Check MDN. A PASS will result only if a FAILURE Notification and NO Success Notification is sent (Which means if no Failure Notification found or both found will generate failure). If the ETT receives a Dispatch MDN, the test will result in a Failure.',
      desc: "Verify the ability of the system to provide a delivery failure message  when a message is sent to a destination that does not return a  dispatched MDN after the expected wait time is exceeded. Hitting 'Run' will  cause ETT to send a message with a final destination that will not  provide a dispatched MDN. If the message was sent successfully 'Check MDN' will appear. Clicking that will check for the incoming MDN (may have to click multiple times due to lag). The expectation is that an appropriate delivery failure message indicating a timeout will be returned.",
      protocol: 'mu2',
      moreInfo: {
        subHeader: 'Description',
        headers: ['Vendor Role', 'Vendor Edge', 'Vendor HISP'],
        tableData: [
          {
            cells: [
              { content: 'Sender', type: 'text' },
              { content: '', type: 'icon', isChecked: false },
              { content: '', type: 'icon', isChecked: true },
            ],
          },
        ],
        optionalTextField: {
          label: 'Command timeout in seconds',
          helperText: 'Amount of seconds you want to elapse before timeout',
          defaultValue: '0',
        },
        actionLabel: 'RUN',
      },
      sutRole: 'sender',
      sutHisp: true,
      criteria: "['h2-9']",
      sutEdge: false,
      fields: [
        {
          label: 'Timeout in minutes',
          name: 'sutCommandTimeoutInSeconds',
          placeHolder: 'Timeout In Minutes',
          datatype: 'String',
          value: 'Timeout In Minutes',
          readOnly: false,
          display: true,
        },
      ],
    },
    {
      name: 'SMTP/POP MT Test 28(c) (Delayed Dispatched MDN)',
      id: 158,
      longDesc:
        'This test is setup to allow a (N) + 5 minute timeout for the failure MDN, where N is the value entered to run the test. To run this test, enter the value (N) that the SUT will wait before generating a failure MDN. If the SUT sends an MDN prior to its default timeout (N), the test will fail. Sending a message between (N) and (N) + 5 min, no failure or success will be recorded. The test is setup to allow a buffer for the delivery of Dispatched MDN from the ETT as a Receiving HISP. Steps to run the test: 1) Enter the SUT timeout value (N) into the test input parameter box, 2) Select Run, 3) wait for (N) + 5 min, then select Check MDN. A PASS will result only if a FAILURE Notification and NO Success Notification is sent (Which means if no Failure Notification found or both found will generate failure). If the ETT receives a Dispatch MDN, the test will result in a Failure.',
      desc: "Verify the ability of the system to provide a delivery failure message  when a message is sent to a destination that does not return a  dispatched MDN after the expected wait time is exceeded. Hitting 'Run' will  cause ETT to send a message with a final destination that will not  provide a dispatched MDN. If the message was sent successfully 'Check MDN' will appear. Clicking that will check for the incoming MDN (may have to click multiple times due to lag). The expectation is that an appropriate delivery failure message indicating a timeout will be returned.",
      protocol: 'mu2',
      moreInfo: {
        subHeader: 'Description',
        headers: ['Vendor Role', 'Vendor Edge', 'Vendor HISP'],
        tableData: [
          {
            cells: [
              { content: 'Sender', type: 'text' },
              { content: '', type: 'icon', isChecked: false },
              { content: '', type: 'icon', isChecked: true },
            ],
          },
        ],
        optionalTextField: {
          label: 'Command timeout in seconds',
          helperText: 'Amount of seconds you want to elapse before timeout',
          defaultValue: '0',
        },
        actionLabel: 'RUN',
      },
      sutRole: 'sender',
      sutHisp: true,
      criteria: "['h2-9']",
      sutEdge: false,
      fields: [
        {
          label: 'Timeout in minutes',
          name: 'sutCommandTimeoutInSeconds',
          placeHolder: 'Timeout In Minutes',
          datatype: 'String',
          value: 'Timeout In Minutes',
          readOnly: false,
          display: true,
        },
      ],
    },
    {
      name: 'SMTP MT Test 29(a) (Positive Notification)',
      id: 529,
      longDesc: 'The email is sent to processeddispatched6@ett.healthit.gov',
      desc: 'Verify the ability of the system to provide a final positive delivery  notification when a message is sent to a destination that has responding  appropriately. Due to SMTP-SMTP configuration limitations, the proctor is to visually inspect for the receipt of the positive delivery status notification message. The expectation is that an appropriate final positive delivery notification will be returned.',
      protocol: 'mu2',
      moreInfo: {
        subHeader: 'Description',
        headers: ['Vendor Role', 'Vendor Edge', 'Vendor HISP'],
        tableData: [
          {
            cells: [
              { content: 'Sender', type: 'text' },
              { content: '', type: 'icon', isChecked: false },
              { content: '', type: 'icon', isChecked: true },
            ],
          },
        ],
        actionLabel: 'RUN',
      },
      sutRole: 'sender',
      sutHisp: true,
      criteria: "['h2-9','sc2-9']",
      sutEdge: false,
    },
    {
      name: 'SMTP/IMAP MT Test 29(b) (Positive Notification)',
      id: 129,
      longDesc: 'The email is sent to processeddispatched6@ett.healthit.gov',
      desc: "Verify the ability of the system to provide a final positive delivery  notification when a message is sent to a destination that has responding  appropriately. Hitting 'Run' will cause ETT to send a message with a  final destination that will respond appropriately. If the message was sent successfully 'Check MDN' will appear. Clicking that will check for the incoming MDN (may have to click multiple times due to lag). The expectation is that an appropriate final positive delivery notification will be returned.",
      protocol: 'mu2',
      moreInfo: {
        subHeader: 'Description',
        headers: ['Vendor Role', 'Vendor Edge', 'Vendor HISP'],
        tableData: [
          {
            cells: [
              { content: 'Sender', type: 'text' },
              { content: '', type: 'icon', isChecked: false },
              { content: '', type: 'icon', isChecked: true },
            ],
          },
        ],
        actionLabel: 'RUN',
      },
      sutRole: 'sender',
      sutHisp: true,
      criteria: "['h2-9','sc2-9']",
      sutEdge: false,
    },
    {
      name: 'SMTP/POP MT Test 29(c) (Positive Notification)',
      id: 159,
      longDesc: 'The email is sent to processeddispatched6@ett.healthit.gov',
      desc: "Verify the ability of the system to provide a final positive delivery  notification when a message is sent to a destination that has responding  appropriately. Hitting 'Run' will cause ETT to send a message with a  final destination that will respond appropriately. If the message was sent successfully 'Check MDN' will appear. Clicking that will check for the incoming MDN (may have to click multiple times due to lag). The expectation is that an appropriate final positive delivery notification will be returned.",
      protocol: 'mu2',
      moreInfo: {
        subHeader: 'Description',
        headers: ['Vendor Role', 'Vendor Edge', 'Vendor HISP'],
        tableData: [
          {
            cells: [
              { content: 'Sender', type: 'text' },
              { content: '', type: 'icon', isChecked: false },
              { content: '', type: 'icon', isChecked: true },
            ],
          },
        ],
        actionLabel: 'RUN',
      },
      sutRole: 'sender',
      sutHisp: true,
      criteria: "['h2-9','sc2-9']",
      sutEdge: false,
    },
    {
      name: 'SMTP MT Test 39 (Message with Good Header)',
      id: 139,
      desc: "Verify the ability of the system to properly process the Disposition-Notifications-Options Header. Hitting 'Run' will cause ETT to send a message with a well-formed Disposition-Notifications-Options Header. If the message is sent successfully 'Check MDN' will appear. Clicking that will check for the expected Processed and Dispatched MDN (Note that you may have to click multiple times due to lag.) The expected result is a Processed and Dispatched MDN. The selection of a file is optional, if the system requires clinical information with the message.",
      protocol: 'mu2',
      moreInfo: {
        subHeader: 'Description',
        headers: ['Vendor Role', 'Vendor Edge', 'Vendor HISP'],
        tableData: [
          {
            cells: [
              { content: 'Receiver', type: 'text' },
              { content: '', type: 'icon', isChecked: false },
              { content: '', type: 'icon', isChecked: true },
            ],
          },
        ],
        optionalTextField: {
          label: 'ccdaReferenceFilename',
          helperText: 'C-CDA Document Type',
          defaultValue: '',
        },
        actionLabel: 'RUN',
      },
      longDesc:
        'If you are acting as a Receiving HISP and need to load your trust anchor and certificates to properly to receive MDNs, please request this service on the mailing list.  ',
      sutRole: 'receiver',
      criteria: "['h1-1','h2-10','sa1-1','sc2-10']",
      sutHisp: true,
      sutEdge: false,
      ccdaFileRequired: true,
      fields: [
        {
          label: 'C-CDA Document Type',
          name: 'ccdaReferenceFilename',
          datatype: 'CCDAWidgetReceiver',
          value: 'ccdaReferenceFilename',
          readOnly: false,
          display: true,
        },
      ],
    },
    {
      name: 'SMTP MT Test 40 (Message with Bad Header)',
      id: 140,
      desc: "Verify the ability of the system to process an invalid Disposition-Notifications-Options Header. Hitting 'Run' will cause ETT to send a message with an incorrect Disposition-Notifications-Options Header. If the message is sent successfully 'Check MDN' will appear. Clicking that will check for the expected Processed MDN (Note that you may have to click multiple times due to lag.) The expected result is that the Vendor will be able to process the invalid Disposition-Notifications-Options Header and respond with a Processed MDN. Optionally, the test will accommodate systems that also respond with a Dispatched MDN--however the Dispatched MDN must NOT contain the X-DIRECT-FINAL-DESTINATION-DELIVERY header to pass. The selection of a file is optional, if the system requires clinical information with the message.",
      protocol: 'mu2',
      moreInfo: {
        subHeader: 'Description',
        headers: ['Vendor Role', 'Vendor Edge', 'Vendor HISP'],
        tableData: [
          {
            cells: [
              { content: 'Receiver', type: 'text' },
              { content: '', type: 'icon', isChecked: false },
              { content: '', type: 'icon', isChecked: true },
            ],
          },
        ],
        optionalTextField: {
          label: 'ccdaReferenceFilename',
          helperText: 'C-CDA Document Type',
          defaultValue: '',
        },
        actionLabel: 'RUN',
      },
      longDesc:
        'If you are acting as a Receiving HISP and need to load your trust anchor and certificates to properly to receive MDNs, please request this service on the mailing list.  ',
      sutRole: 'receiver',
      criteria: "['h1-1','h2-10','sa1-1','sc2-10']",
      sutHisp: true,
      sutEdge: false,
      ccdaFileRequired: true,
      fields: [
        {
          label: 'C-CDA Document Type',
          name: 'ccdaReferenceFilename',
          datatype: 'CCDAWidgetReceiver',
          value: 'ccdaReferenceFilename',
          readOnly: false,
          display: true,
        },
      ],
    },
    {
      name: 'SMTP MT Test 41 (Unable to deliver)',
      id: 142,
      desc: 'Verifies that when the system successfully validates security and trust, but cannot deliver the message to its final destination, the system generates an MDN failed or a failure DSN. ETT (as Sending HISP) sends a well-formed message to a destination address.  The system decrypts and trust validates the message, returning a Processed MDN. The system is unable to deliver the message (mail box full, unavailable, mailbox does not exist)  and returns either an MDN failed or a failure Delivery Status Notification. The selection of a file is optional, if the system requires clinical information with the message.',
      protocol: 'mu2',
      moreInfo: {
        subHeader: 'Description',
        headers: ['Vendor Role', 'Vendor Edge', 'Vendor HISP'],
        tableData: [
          {
            cells: [
              { content: 'Receiver', type: 'text' },
              { content: '', type: 'icon', isChecked: false },
              { content: '', type: 'icon', isChecked: true },
            ],
          },
        ],
        optionalTextField: {
          label: 'ccdaReferenceFilename',
          helperText: 'C-CDA Document Type',
          defaultValue: '',
        },
        actionLabel: 'RUN',
      },
      longDesc:
        'If you are acting as a Receiving HISP and need to load your trust anchor and certificates to properly to receive MDNs, please request this service on the mailing list.  ',
      sutRole: 'receiver',
      criteria: "['h1-1','sa1-1','sc2-10']",
      sutHisp: true,
      sutEdge: false,
      ccdaFileRequired: true,
      fields: [
        {
          label: 'C-CDA Document Type',
          name: 'ccdaReferenceFilename',
          datatype: 'CCDAWidgetReceiver',
          value: 'ccdaReferenceFilename',
          readOnly: false,
          display: true,
        },
      ],
    },

    {
      name: 'POP Test 1, 2',
      id: 301,
      protocol: 'pop',
      moreInfo: {
        subHeader: 'Description',
        headers: ['Vendor Role', 'Vendor Edge', 'Vendor HISP'],
        tableData: [
          {
            cells: [
              { content: 'Sender', type: 'text' },
              { content: '', type: 'icon', isChecked: false },
              { content: '', type: 'icon', isChecked: true },
            ],
          },
        ],
        actionLabel: 'RUN',
      },
      desc: 'Verifies POP3 CAPA, NOOP and QUIT commands are implemented.',
      longDesc: 'The test tool connects to the vendor on the standard POP3 port 110.',
      sutRole: 'sender',
      sutHisp: true,
      criteria: "['h2-6']",
      sutEdge: false,
    },
    {
      name: 'POP Test 5, 11, 15',
      id: 303,
      protocol: 'pop',
      moreInfo: {
        subHeader: 'Description',
        headers: ['Vendor Role', 'Vendor Edge', 'Vendor HISP'],
        tableData: [
          {
            cells: [
              { content: 'Sender', type: 'text' },
              { content: '', type: 'icon', isChecked: false },
              { content: '', type: 'icon', isChecked: true },
            ],
          },
        ],
        actionLabel: 'RUN',
      },
      desc: 'Verifies POP3 STAT, STLS, RETR, LIST, RSET and QUIT commands are implemented',
      longDesc:
        'The vendor has to provide the profile information (hostname, username, password) and an account with preloaded email.  ',
      sutRole: 'sender',
      sutHisp: true,
      criteria: "['h2-6']",
      sutEdge: false,
    },
    {
      name: 'POP Test 9',
      id: 309,
      protocol: 'pop',
      moreInfo: {
        subHeader: 'Description',
        headers: ['Vendor Role', 'Vendor Edge', 'Vendor HISP'],
        tableData: [
          {
            cells: [
              { content: 'Sender', type: 'text' },
              { content: '', type: 'icon', isChecked: false },
              { content: '', type: 'icon', isChecked: true },
            ],
          },
        ],
        actionLabel: 'RUN',
      },
      desc: 'Verifies the ability of the Vendor HISP(POP Server) to reject a command when a command with bad syntax is sent.',
      longDesc: 'The test tool connects to the vendor on the standard POP3 port 110.',
      sutRole: 'sender',
      sutHisp: true,
      criteria: "['h2-6']",
      sutEdge: false,
    },
    {
      name: 'POP Test 10',
      id: 310,
      protocol: 'pop',
      moreInfo: {
        subHeader: 'Description',
        headers: ['Vendor Role', 'Vendor Edge', 'Vendor HISP'],
        tableData: [
          {
            cells: [
              { content: 'Sender', type: 'text' },
              { content: '', type: 'icon', isChecked: false },
              { content: '', type: 'icon', isChecked: true },
            ],
          },
        ],
        actionLabel: 'RUN',
      },
      desc: 'Verifies the ability of the Vendor HISP(POP Server) to reject a command in bad state.',
      longDesc: 'The test tool connects to the vendor on the standard POP3 port 110.',
      sutRole: 'sender',
      sutHisp: true,
      criteria: "['h2-6']",
      sutEdge: false,
    },
    {
      name: 'POP Test 17',
      id: 317,
      protocol: 'pop',
      moreInfo: {
        subHeader: 'Description',
        headers: ['Vendor Role', 'Vendor Edge', 'Vendor HISP'],
        tableData: [
          {
            cells: [
              { content: 'Sender', type: 'text' },
              { content: '', type: 'icon', isChecked: false },
              { content: '', type: 'icon', isChecked: true },
            ],
          },
        ],
        actionLabel: 'RUN',
      },
      desc: 'Verifies the ability of the Vendor HISP(POP Server) to reject authentication when bad username/password is used.',
      longDesc: 'The test tool connects to the vendor on the standard POP3 port 110.',
      sutRole: 'sender',
      sutHisp: true,
      criteria: "['h2-6']",
      sutEdge: false,
    },
    {
      name: 'IMAP Test 1, 2, 3',
      id: 201,
      protocol: 'imap',
      moreInfo: {
        subHeader: 'Description',
        headers: ['Vendor Role', 'Vendor Edge', 'Vendor HISP'],
        tableData: [
          {
            cells: [
              { content: 'Sender', type: 'text' },
              { content: '', type: 'icon', isChecked: false },
              { content: '', type: 'icon', isChecked: true },
            ],
          },
        ],
        actionLabel: 'RUN',
      },
      desc: 'Verifies IMAP4 CAPABILITY, NOOP and LOGOUT commands are implemented.',
      longDesc: 'The test tool connects to the vendor on the standard IMAP port 143.',
      sutRole: 'sender',
      sutHisp: true,
      criteria: "['h2-5']",
      sutEdge: false,
    },
    {
      name: 'IMAP Test 8, 11, 15',
      id: 205,
      protocol: 'imap',
      moreInfo: {
        subHeader: 'Description',
        headers: ['Vendor Role', 'Vendor Edge', 'Vendor HISP'],
        tableData: [
          {
            cells: [
              { content: 'Sender', type: 'text' },
              { content: '', type: 'icon', isChecked: false },
              { content: '', type: 'icon', isChecked: true },
            ],
          },
        ],
        actionLabel: 'RUN',
      },
      desc: 'Verifies the ability of the Vendor HISP to implement imap commands.(AUTHENTICATE, STARTTLS, LOGIN, SELECT, FETCH)',
      longDesc:
        'The vendor has to provide the profile information (hostname, username, password) and an account with preloaded email.  ',
      sutRole: 'sender',
      sutHisp: true,
      criteria: "['h2-5']",
      sutEdge: false,
    },
    {
      name: 'IMAP Test 9',
      id: 209,
      protocol: 'imap',
      moreInfo: {
        subHeader: 'Description',
        headers: ['Vendor Role', 'Vendor Edge', 'Vendor HISP'],
        tableData: [
          {
            cells: [
              { content: 'Sender', type: 'text' },
              { content: '', type: 'icon', isChecked: false },
              { content: '', type: 'icon', isChecked: true },
            ],
          },
        ],
        actionLabel: 'RUN',
      },
      desc: 'Verifies the ability of the Vendor HISP to reject a command when a command with bad syntax is sent.',
      longDesc: 'The test tool connects to the vendor on the standard IMAP port 143.',
      sutRole: 'sender',
      sutHisp: true,
      criteria: "['h2-5']",
      sutEdge: false,
    },
    {
      name: 'IMAP Test 10',
      id: 210,
      protocol: 'imap',
      moreInfo: {
        subHeader: 'Description',
        headers: ['Vendor Role', 'Vendor Edge', 'Vendor HISP'],
        tableData: [
          {
            cells: [
              { content: 'Sender', type: 'text' },
              { content: '', type: 'icon', isChecked: false },
              { content: '', type: 'icon', isChecked: true },
            ],
          },
        ],
        actionLabel: 'RUN',
      },
      desc: 'Verifies the ability of the Vendor HISP to reject commands with right syntax based on the specific state of the connection.',
      longDesc: 'The test tool connects to the vendor on the standard IMAP port 143.',
      sutRole: 'sender',
      sutHisp: true,
      criteria: "['h2-5']",
      sutEdge: false,
    },
    {
      name: 'IMAP Test 17',
      id: 217,
      protocol: 'imap',
      moreInfo: {
        subHeader: 'Description',
        headers: ['Vendor Role', 'Vendor Edge', 'Vendor HISP'],
        tableData: [
          {
            cells: [
              { content: 'Sender', type: 'text' },
              { content: '', type: 'icon', isChecked: false },
              { content: '', type: 'icon', isChecked: true },
            ],
          },
        ],
        actionLabel: 'RUN',
      },
      desc: 'Verifies the ability of the Vendor HISP to reject incorrect username/password.',
      longDesc: 'The test tool connects to the vendor on the standard IMAP port 143.',
      sutRole: 'sender',
      sutHisp: true,
      criteria: "['h2-5']",
      sutEdge: false,
    },
    {
      name: 'IMAP Test 19, 20, 24',
      id: 219,
      protocol: 'imap',
      moreInfo: {
        subHeader: 'Description',
        headers: ['Vendor Role', 'Vendor Edge', 'Vendor HISP'],
        tableData: [
          {
            cells: [
              { content: 'Reciever', type: 'text' },
              { content: '', type: 'icon', isChecked: true },
              { content: '', type: 'icon', isChecked: false },
            ],
          },
        ],
        actionLabel: 'RUN',
      },
      desc: "Verifies the ability of the Edge system to initiate a IMAP session with STARTTLS and PLAIN SASL AUTHENTICATION (if enabled). The Vendor should retrieve an email from 'imaptesting@james.healthit.gov'.",
      longDesc:
        'Run this series collectively from one action: Test 19 invokes the STARTTLS validation and Test 20 validates the SASL authentication. Test 24 invokes the retrieve validation. It is necessary to configure an email account on the SUT in order to retrieve messages using these credentials: imaptesting@james.healthit.gov / smtptesting123.',
      sutRole: 'receiver',
      sutHisp: false,
      criteria: "['b1-5']",
      sutEdge: true,
    },
    {
      name: 'IMAP Test 21',
      id: 221,
      protocol: 'imap',
      moreInfo: {
        subHeader: 'Description',
        headers: ['Vendor Role', 'Vendor Edge', 'Vendor HISP'],
        tableData: [
          {
            cells: [
              { content: 'Reciever', type: 'text' },
              { content: '', type: 'icon', isChecked: true },
              { content: '', type: 'icon', isChecked: false },
            ],
          },
        ],
        actionLabel: 'RUN',
      },
      desc: "Verifies the ability of the Vendor to use either the uppercase, lowercase or mixed case mailbox names and access data. The Vendor should fetch emails from imaptesting@james.healthit.gov within the folders 'FOLDER' and 'folder2'.",
      longDesc:
        'The user is to establish or configure an email account on the SUT in order to retrieve messages using the credentials. The credentials for authentication is imaptesting@james.healthit.gov / smtptesting123 ',
      sutRole: 'receiver',
      sutHisp: false,
      criteria: "['b1-5']",
      sutEdge: true,
    },
    {
      name: 'IMAP Test 25',
      id: 225,
      protocol: 'imap',
      moreInfo: {
        subHeader: 'Description',
        headers: ['Vendor Role', 'Vendor Edge', 'Vendor HISP'],
        tableData: [
          {
            cells: [
              { content: 'Reciever', type: 'text' },
              { content: '', type: 'icon', isChecked: true },
              { content: '', type: 'icon', isChecked: false },
            ],
          },
        ],
        actionLabel: 'RUN',
      },
      desc: 'Verifies the ability of the Vendor to receive status and size updates from the IMAP4 server. An email will be sent to the SUT and the SUT will show size and status updates (e.g change in the number of emails in inbox) when new email is received.',
      longDesc:
        'The proctor needs to send an email to the Vendor and should verify that the Vendor system is able to show size and status updates (e.g change in the number of emails in inbox) when new email is received. ',
      sutRole: 'receiver',
      sutHisp: false,
      criteria: "['b1-5']",
      sutEdge: true,
    },
    {
      name: 'IMAP Test 27',
      id: 227,
      protocol: 'imap',
      moreInfo: {
        subHeader: 'Description',
        headers: ['Vendor Role', 'Vendor Edge', 'Vendor HISP'],
        tableData: [
          {
            cells: [
              { content: 'Reciever', type: 'text' },
              { content: '', type: 'icon', isChecked: true },
              { content: '', type: 'icon', isChecked: false },
            ],
          },
        ],
        actionLabel: 'RUN',
      },
      desc: "Verifies the ability of the Vendor to accept XDM packages sent using different MIME Types. The SUT should fetch emails from 'xdmmimetypes@james.healthit.gov'.",
      longDesc:
        'The user is to establish or configure an email account on the SUT in order to retrieve messages using the credentials. The credentials for authentication is xdmmimetypes@james.healthit.gov / smtptesting123 ',
      sutRole: 'receiver',
      sutHisp: false,
      criteria: "['b1-5']",
      sutEdge: true,
    },
    {
      name: 'IMAP Test 28',
      id: 228,
      protocol: 'imap',
      moreInfo: {
        subHeader: 'Description',
        headers: ['Vendor Role', 'Vendor Edge', 'Vendor HISP'],
        tableData: [
          {
            cells: [
              { content: 'Reciever', type: 'text' },
              { content: '', type: 'icon', isChecked: true },
              { content: '', type: 'icon', isChecked: false },
            ],
          },
        ],
        actionLabel: 'RUN',
      },
      desc: "Verifies the ability of the Vendor to accept multiple attachments (in varying order). The Vendor should fetch an email from 'multipleattachments@james.healthit.gov'.",
      longDesc:
        'The user is to establish or configure an email account on the SUT in order to retrieve messages using the credentials. The credentials for authentication is multipleattachments@james.healthit.gov / smtptesting123 ',
      sutRole: 'receiver',
      sutHisp: false,
      criteria: "['b1-5']",
      sutEdge: true,
    },
    {
      name: 'IMAP Test 29(a)',
      id: 2291,
      protocol: 'imap',
      moreInfo: {
        subHeader: 'Description',
        headers: ['Vendor Role', 'Vendor Edge', 'Vendor HISP'],
        tableData: [
          {
            cells: [
              { content: 'Reciever', type: 'text' },
              { content: '', type: 'icon', isChecked: true },
              { content: '', type: 'icon', isChecked: false },
            ],
          },
        ],
        actionLabel: 'RUN',
      },
      desc: "Test for the ability of the Vendor to accept C-CDA even when the CCDA document includes a broken reference to a style-sheet. The Vendor should fetch an email from 'brokenrefstylesheet@james.healthit.gov'.",
      longDesc:
        'The user is to establish or configure an email account on the SUT in order to retrieve messages using the credentials. The credentials for authentication is brokenrefstylesheet@james.healthit.gov / smtptesting123 ',
      sutRole: 'receiver',
      sutHisp: false,
      criteria: "['b1-5']",
      sutEdge: true,
    },
    {
      name: 'IMAP Test 29(b)',
      id: 2292,
      protocol: 'imap',
      moreInfo: {
        subHeader: 'Description',
        headers: ['Vendor Role', 'Vendor Edge', 'Vendor HISP'],
        tableData: [
          {
            cells: [
              { content: 'Reciever', type: 'text' },
              { content: '', type: 'icon', isChecked: true },
              { content: '', type: 'icon', isChecked: false },
            ],
          },
        ],
        actionLabel: 'RUN',
      },
      desc: "Test for the ability of the Vendor to accept C-CDA even when the CCDA document includes a good reference to an invalid style-sheet.. The Vendor should fetch an email from 'invalidstylesheet@james.healthit.gov'.",
      longDesc:
        'The user is to establish or configure an email account on the SUT in order to retrieve messages using the credentials. The credentials for authentication is invalidstylesheet@james.healthit.gov / smtptesting123 ',
      sutRole: 'receiver',
      sutHisp: false,
      criteria: "['b1-5']",
      sutEdge: true,
    },
    {
      name: 'IMAP Test 30',
      id: 230,
      protocol: 'imap',
      moreInfo: {
        subHeader: 'Description',
        headers: ['Vendor Role', 'Vendor Edge', 'Vendor HISP'],
        tableData: [
          {
            cells: [
              { content: 'Reciever', type: 'text' },
              { content: '', type: 'icon', isChecked: true },
              { content: '', type: 'icon', isChecked: false },
            ],
          },
        ],
        actionLabel: 'RUN',
      },
      desc: "Verifies the ability of the Vendor to accept XDM package even in the case where the required XHTML is bad. The Vendor should fetch an email from 'xdmbadxhtml@james.healthit.gov'.",
      longDesc:
        'The user is to establish or configure an email account on the SUT in order to retrieve messages using the credentials. The credentials for authentication is xdmbadxhtml@james.healthit.gov / smtptesting123 ',
      sutRole: 'receiver',
      sutHisp: false,
      criteria: "['b1-5']",
      sutEdge: true,
    },
    {
      name: 'IMAP Test 31 (Receive)',
      id: 231,
      protocol: 'imap',
      moreInfo: {
        subHeader: 'Description',
        headers: ['Vendor Role', 'Vendor Edge', 'Vendor HISP'],
        tableData: [
          {
            cells: [
              { content: 'Reciever', type: 'text' },
              { content: '', type: 'icon', isChecked: true },
              { content: '', type: 'icon', isChecked: false },
            ],
          },
        ],
        optionalTextField: {
          label: 'attachmentType',
          helperText: 'Attachment Type',
          defaultValue: '',
        },
        actionLabel: 'RUN',
      },
      desc: 'Verifies the ability of the SUT to accept different attachment types.',
      longDesc:
        'The user is to establish or configure an email account on the SUT in order to retrieve messages using the credentials. The credentials for authentication is b1-ambulatory@james.healthit.gov, b1-inpatient@james.healthit.gov, b2-ambulatory@james.healthit.gov, b2-inpatient@james.healthit.gov, b5-ambulatory@james.healthit.gov, b5-inpatient@james.healthit.gov, b9-ambulatory@james.healthit.gov, b9-inpatient@james.healthit.gov, negativetestingccds@james.healthit.gov, negativetestingcareplan@james.healthit.gov. The password is smtptesting123 for all accounts. ',
      sutRole: 'receiver',
      sutHisp: false,
      criteria: "['b1-5','su1-5']",
      sutEdge: true,
      fields: [
        {
          label: 'Attachment type',
          name: 'attachmentType',
          datatype: 'DropdownString',
          allowedValues: [
            '170.315(b)(1)-Transitions of Care-Ambulatory Setting',
            '170.315(b)(1)-Transitions of Care-Inpatient Setting',
            '170.315(b)(2)-Clinical Information Reconciliation and Incorporation-Ambulatory Setting',
            '170.315(b)(2)-Clinical Information Reconciliation and Incorporation-Inpatient Setting',
            '170.315(b)(5)-Common Clinical Data Set Summary Record-Ambulatory Setting',
            '170.315(b)(5)-Common Clinical Data Set Summary Record-Inpatient Setting',
            '170.315(b)(9)-Care Plan-Ambulatory Setting',
            '170.315(b)(9)-Care Plan-Inpatient Setting',
            'NegativeTesting_CCDS',
            'NegativeTesting_CarePlan',
          ],
          value: 'attachmentType',
          readOnly: false,
          display: true,
        },
      ],
    },
    {
      name: 'IMAP 32 (Receive + Validate)',
      id: 232,
      protocol: 'imap',
      moreInfo: {
        subHeader: 'Description',
        headers: ['Vendor Role', 'Vendor Edge', 'Vendor HISP'],
        tableData: [
          {
            cells: [
              { content: 'Sender', type: 'text' },
              { content: '', type: 'icon', isChecked: false },
              { content: '', type: 'icon', isChecked: true },
            ],
          },
        ],
        optionalTextField: {
          label: 'ccdaReferenceFilename',
          helperText: 'C-CDA Document Type',
          defaultValue: '',
        },
        actionLabel: 'RUN',
      },
      desc: 'Verifies the ability of the SUT to host attachments and make it available for fetching through IMAP. The CCDA is validated using the MDHT validator.',
      sutRole: 'sender',
      sutHisp: true,
      criteria: "['h2-5']",
      sutEdge: false,
      ccdaFileRequired: true,
      fields: [
        {
          label: 'C-CDA Document Type',
          name: 'ccdaReferenceFilename',
          datatype: 'CCDAWidget',
          value: 'ccdaReferenceFilename',
          readOnly: false,
          display: true,
        },
      ],
    },
    {
      name: 'POP Test 19, 20, 24',
      id: 319,
      protocol: 'pop',
      moreInfo: {
        subHeader: 'Description',
        headers: ['Vendor Role', 'Vendor Edge', 'Vendor HISP'],
        tableData: [
          {
            cells: [
              { content: 'Reciever', type: 'text' },
              { content: '', type: 'icon', isChecked: true },
              { content: '', type: 'icon', isChecked: false },
            ],
          },
        ],
        actionLabel: 'RUN',
      },
      desc: "Verifies the ability of the SUT to support various POP3 commands. The proctor need to send commands to the ETT and retrieve an email from 'poptesting@james.healthit.gov'.",
      longDesc:
        'Run this series collectively from one action: Test 19 validates the TLS session. Test 20 validates the SASL authentication. Test 24 invokes the retrieve validation. It is necessary to configure an email account on the SUT in order to retrieve messages using these credentials: poptesting@james.healthit.gov / smtptesting123.',
      sutRole: 'receiver',
      sutHisp: false,
      criteria: "['b1-6']",
      sutEdge: true,
    },
    {
      name: 'POP Test 27',
      id: 327,
      protocol: 'pop',
      moreInfo: {
        subHeader: 'Description',
        headers: ['Vendor Role', 'Vendor Edge', 'Vendor HISP'],
        tableData: [
          {
            cells: [
              { content: 'Reciever', type: 'text' },
              { content: '', type: 'icon', isChecked: true },
              { content: '', type: 'icon', isChecked: false },
            ],
          },
        ],
        actionLabel: 'RUN',
      },
      desc: "Verifies the ability of the SUT to accept XDM packages sent using different MIME Types. The Vendor should fetch emails from 'xdmmimetypes@james.healthit.gov'.",
      longDesc:
        'The user is to establish or configure an email account on the SUT in order to retrieve messages using the credentials. The credentials for authentication is xdmmimetypes@james.healthit.gov / smtptesting123 ',
      sutRole: 'receiver',
      sutHisp: false,
      criteria: "['b1-6']",
      sutEdge: true,
    },
    {
      name: 'POP Test 28',
      id: 328,
      protocol: 'pop',
      moreInfo: {
        subHeader: 'Description',
        headers: ['Vendor Role', 'Vendor Edge', 'Vendor HISP'],
        tableData: [
          {
            cells: [
              { content: 'Reciever', type: 'text' },
              { content: '', type: 'icon', isChecked: true },
              { content: '', type: 'icon', isChecked: false },
            ],
          },
        ],
        actionLabel: 'RUN',
      },
      desc: "Verifies the ability of the SUT to accept multiple attachments (in varying order). The Vendor should fetch emails from 'multipleattachments@james.healthit.gov'.",
      longDesc:
        'The user is to establish or configure an email account on the SUT in order to retrieve messages using the credentials. The credentials for authentication is multipleattachments@james.healthit.gov / smtptesting123 ',
      sutRole: 'receiver',
      sutHisp: false,
      criteria: "['b1-6']",
      sutEdge: true,
    },
    {
      name: 'POP Test 29(a)',
      id: 3291,
      protocol: 'pop',
      moreInfo: {
        subHeader: 'Description',
        headers: ['Vendor Role', 'Vendor Edge', 'Vendor HISP'],
        tableData: [
          {
            cells: [
              { content: 'Reciever', type: 'text' },
              { content: '', type: 'icon', isChecked: true },
              { content: '', type: 'icon', isChecked: false },
            ],
          },
        ],
        actionLabel: 'RUN',
      },
      desc: "Test for the ability of the Vendor to accept C-CDA even when the CCDA document includes a broken reference to a style-sheet. The Vendor should fetch an email from 'brokenrefstylesheet@james.healthit.gov'.",
      longDesc:
        'The user is to establish or configure an email account on the SUT in order to retrieve messages using the credentials. The credentials for authentication is brokenrefstylesheet@james.healthit.gov / smtptesting123 ',
      sutRole: 'receiver',
      sutHisp: false,
      criteria: "['b1-6']",
      sutEdge: true,
    },
    {
      name: 'POP Test 29(b)',
      id: 3292,
      protocol: 'pop',
      moreInfo: {
        subHeader: 'Description',
        headers: ['Vendor Role', 'Vendor Edge', 'Vendor HISP'],
        tableData: [
          {
            cells: [
              { content: 'Reciever', type: 'text' },
              { content: '', type: 'icon', isChecked: true },
              { content: '', type: 'icon', isChecked: false },
            ],
          },
        ],
        actionLabel: 'RUN',
      },
      desc: "Test for the ability of the Vendor to accept C-CDA even when the CCDA document includes a good reference to an invalid style-sheet.. The Vendor should fetch an email from 'invalidstylesheet@james.healthit.gov'.",
      longDesc:
        'The user is to establish or configure an email account on the SUT in order to retrieve messages using the credentials. The credentials for authentication is invalidstylesheet@james.healthit.gov / smtptesting123 ',
      sutRole: 'receiver',
      sutHisp: false,
      criteria: "['b1-6']",
      sutEdge: true,
    },
    {
      name: 'POP Test 30',
      id: 330,
      protocol: 'pop',
      moreInfo: {
        subHeader: 'Description',
        headers: ['Vendor Role', 'Vendor Edge', 'Vendor HISP'],
        tableData: [
          {
            cells: [
              { content: 'Reciever', type: 'text' },
              { content: '', type: 'icon', isChecked: true },
              { content: '', type: 'icon', isChecked: false },
            ],
          },
        ],
        actionLabel: 'RUN',
      },
      desc: "Verifies the ability of the SUT to accept XDM package even in the case where the required XHTML is bad. The Vendor should fetch emails from 'xdmbadxhtml@james.healthit.gov'.",
      longDesc:
        'The user is to establish or configure an email account on the SUT in order to retrieve messages using the credentials. The credentials for authentication is xdmbadxhtml@james.healthit.gov / smtptesting123 ',
      sutRole: 'receiver',
      sutHisp: false,
      criteria: "['b1-6']",
      sutEdge: true,
    },
    {
      name: 'POP Test 31 (Receive)',
      id: 331,
      protocol: 'pop',
      moreInfo: {
        subHeader: 'Description',
        headers: ['Vendor Role', 'Vendor Edge', 'Vendor HISP'],
        tableData: [
          {
            cells: [
              { content: 'Reciever', type: 'text' },
              { content: '', type: 'icon', isChecked: true },
              { content: '', type: 'icon', isChecked: false },
            ],
          },
        ],
        optionalTextField: {
          label: 'attachmentType',
          helperText: 'Attachment Type',
          defaultValue: '',
        },
        actionLabel: 'RUN',
      },
      desc: 'Verifies the ability of the SUT to accept different attachment types.',
      longDesc:
        'The user is to establish or configure an email account on the SUT in order to retrieve messages using the credentials. The credentials for authentication is b1-ambulatory@james.healthit.gov, b1-inpatient@james.healthit.gov, b2-ambulatory@james.healthit.gov, b2-inpatient@james.healthit.gov, b5-ambulatory@james.healthit.gov, b5-inpatient@james.healthit.gov, b9-ambulatory@james.healthit.gov, b9-inpatient@james.healthit.gov, negativetestingccds@james.healthit.gov, negativetestingcareplan@james.healthit.gov. The password is smtptesting123 for all accounts. ',
      sutRole: 'receiver',
      sutHisp: false,
      criteria: "['b1-6','su1-6']",
      sutEdge: true,
      fields: [
        {
          label: 'Attachment type',
          name: 'attachmentType',
          datatype: 'DropdownString',
          allowedValues: [
            '170.315(b)(1)-Transitions of Care-Ambulatory Setting',
            '170.315(b)(1)-Transitions of Care-Inpatient Setting',
            '170.315(b)(2)-Clinical Information Reconciliation and Incorporation-Ambulatory Setting',
            '170.315(b)(2)-Clinical Information Reconciliation and Incorporation-Inpatient Setting',
            '170.315(b)(5)-Common Clinical Data Set Summary Record-Ambulatory Setting',
            '170.315(b)(5)-Common Clinical Data Set Summary Record-Inpatient Setting',
            '170.315(b)(9)-Care Plan-Ambulatory Setting',
            '170.315(b)(9)-Care Plan-Inpatient Setting',
            'NegativeTesting_CCDS',
            'NegativeTesting_CarePlan',
          ],
          value: 'attachmentType',
          readOnly: false,
          display: true,
        },
      ],
    },
    {
      name: 'POP 32 (Receive + Validate)',
      id: 332,
      protocol: 'pop',
      moreInfo: {
        subHeader: 'Description',
        headers: ['Vendor Role', 'Vendor Edge', 'Vendor HISP'],
        tableData: [
          {
            cells: [
              { content: 'Sender', type: 'text' },
              { content: '', type: 'icon', isChecked: false },
              { content: '', type: 'icon', isChecked: true },
            ],
          },
        ],
        optionalTextField: {
          label: 'ccdaReferenceFilename',
          helperText: 'C-CDA Document Type',
          defaultValue: '',
        },
        actionLabel: 'RUN',
      },
      desc: 'Verifies the ability of the SUT to host attachments and make it available for fetching through POP. The CCDA is validated using the MDHT validator.',
      sutRole: 'sender',
      sutHisp: true,
      criteria: "['h2-6']",
      sutEdge: false,
      ccdaFileRequired: true,
      fields: [
        {
          label: 'C-CDA Document Type',
          name: 'ccdaReferenceFilename',
          datatype: 'CCDAWidget',
          value: 'ccdaReferenceFilename',
          readOnly: false,
          display: true,
        },
      ],
    },
  ],
}

export default testCases
