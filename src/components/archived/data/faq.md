# Frequently Asked Questions

## Direct

- Q: We are trying to use the "Send a Direct Message" from the Edge Testing Tool to our implementation and are showing a "time-out" status in the Message Status portal.

  - A: Please unsure that you have installed the Trust Anchor for the ETT into your system.

- Q: We are testing the "Send a Direct Message" functionality as part of our H1 testing:
  https://ttpedge.sitenv.org/ttp/#/direct/send
  But are having an issue with the SHA-256 option. Can you confirm the SHA-256 option is sending the correct hash? It appears to be sending the SHA-1 hash in the message.

      * A: The first is the hash used to sign the Direct message.  The second is the hash that is used in the XD* metadata and refers only to the hash of the attachment itself.  These are two separate hashes, calculated independently.

The first hash is defined in the Direct Applicability Statement.
Version 1.0 mentions both SHA-1 and SHA-256 which is why the Direct portion of the ETT tooling allows both to be used for testing.

The second hash (which is the one from the SOAP body below) is part of the XD\* metadata. The definition of the hash slot is in IHE ITI TF Vol 3 Table 4.2.3.2-1 (page 64)
<http://www.ihe.net/uploadedFiles/Documents/ITI/IHE_ITI_TF_Vol3.pdf>.
The data type for this hash is "SHA1" only.

The document metadata is separate from the signing of the Direct message.

- Q: Why am I not receiving a validation report?

  - A: Please verify that you have registered your direct address with a corresponding contact address which is where the validation report will be delivered, see https://ttpedge.sitenv.org/ttp/#/direct/register. If you have registered, please check the spam folder to see if the validation report has been held there. Also, the local mailbox (the part before the '@' symbol) portion is case-sensitive;verify that the case in what was registered matches what is being sent.

- Q: Why can't the ETT find my certificate via LDAP?

  - A: Please make sure that the LDAP server and port are accessible and not blocked by a firewall. We have been told of issues with older library packages (such as ApacheDS) that were resolved when the library packages were upgraded.

- Q: The proctor sheet states: “using the health module functionality, the user sends an encrypted and signed direct “wrapped” message payload to the ETT Direct to email address.” Where is the ETT Direct to email address?

  - A: Use: https://ttpedge.sitenv.org/ttp/#/direct
    - If you are using CCDA R1.1, the scope and direct addresses are in the lower section of the page. Clicking the widget on the right side, for the corresponding address, will copy it to your clipboard.
    - If you are using CCDA R2.1, the direct address will be generated when you select the document you
      are conforming to. Use the button to select the document and the direct to address will appear underneath it.

- Q: What is the difference between these two validator sides?:

  1.  This one is for certification:
      https://ttpedge.sitenv.org/ttp/#/validators

  2.  Another that some people have used:
      https://sitenv.org/sandbox-ccda/ccda-validator

  - A: The backend is the same; it’s simply a different interface.

- Q: In the Direct section of the ETT, sending a direct message to the system under test results in a validation result for the MDNs the SUT produces. I don't believe this case should be sending validation results at all since the testing is around the certificates rather than the MDNs. It looks like the MDNs are being validated as direct messages whether or not the MDN is wrapped. The ETT also seems to be fine with the MDNs in test cases 39, 40 and 41. Should we be receiving validation results for our MDNs in this case?

  - A: The Direct section of the tool always returns validation reports because it has no programmatic way of knowing what the endpoint is being used for. If the test you are running doesn't need a validation report, the validation
    report can be ignored. The tool accepts wrapped or unwrapped because of backward compatibility with
    the previous round of certification where wrapped was optional. Information on whether the message was wrapped or unwrapped is contained in the validation report. Edge test cases won't produce separate validation reports.

- Q: I'm not getting validation emails from the Direct Testing part of the ETT.

  - A: The address registered, needs to have a contact email address associated with it.

- Q: SMTP MT Test 39, 40 and 41 are not working. All have been working for us previously. After clicking "Run", I see no attempt at an inbound SMTP connection to my server. I have tried using both a hostname and an IP address.

  - A: Please upload your trust anchor/public cert using the "Upload Certificate" on the left bottom corner of the "More Info" section for the these tests.

- Q: I have imported the invalid trust anchor in DIRECT Server & removed the valid Trust anchor of the ETT. I'm sending an email from the ETT, selecting "GOOD_CERT" what is the expected functionality. My DIRECT Server is not rejecting this message, though I have an invalid trust anchor in my DIRECT Server.

  - A: The certificate that you are selecting is the “Signing Certificate”. So a GOOD CERT will send a message with a signing certificate that is valid. The trust anchor, that you have, should dictate whether messages from a particular address is accepted or rejected. If you don’t have the right trust anchor, then the message should be rejected. That is the expected behavior.

- Q: Not sure what I'm missing. I've uploaded the trust cert and the log shows a message sent to the proper address

1: SENDING EMAIL WITH MESSAGE DISPOSITION NOTIFICATION HEADER TO sand...@direct....
2: Email sent Successfully
3: Message-ID of the email sent

However nothing is hitting our SMTP server. I was able to get messages from the DCDT tests as well as
Send Direct Message tests. Am I missing a setup somewhere?

    * A: Ensure you have uploaded your cert/trust anchor in the left sidebar under profile, here.
      (https://ttpedge.sitenv.org/ttp/#/hisp/mu2)

We see this in the logs:
WARN  11:03:15,208 | org.nhindirect.stagent.trust.TrustModel | enforce(OutgoingMessage message) -
could not trust any certificates for recipient H.......@....com

- Q: What are the SMTP MT addresses?

  - A: The addresses are listed below. Also consult with your ALT for any changes or updates.
    - SMTP MT Test 21: processeddispatched6@ttpedge.sitenv.org
    - SMTP MT Test 23: badaddresst@ttpds2.siten.org
    - SMTPMT Test 24: provider1@direct2.sitenv.org
    - SMTP MT Test 25: failure15@ttpds.sitenv.org
    - SMTP MT Test 26: nomdn8@ttpedge.sitenv.org
    - SMTP MT Test 27: processedonly5@ttpedge.sitenv.org
    - SMTP MT Test 29: processeddispatched6@ttpedge.sitenv.org

## Direct Edge -- SMTP/POP/IMAP

- Q: We are having issues running SMTP Test 8, 14, 18 (Send) and SMTP MT Test 46, the credentials don't work.

  - A: Please look at the information in the 'More Info' pages for the credentials required to run these tests.

* SMTP Test 8, 14, 18 (Send): wellformed1@ttpedge.sitenv.org, vendoraccount@ttpds.sitenv.org / vendortesting123
* SMTP MT Test 46: wellformed14@ttpds.sitenv.org, vendoraccount@ttpds.sitenv.org / vendortesting123

- Q: We are testing SMTP Test 8, 14 (Send), per the test in the ETT and following the user guide and it keeps failing. Do we need to install a certificate for this test? We also checked our Direct server and it works with the other Direct protocol tests.

  - A: This is a SMTP protocol test, not a DIRECT test. If you send using Direct to an SMTP endpoint, it will always fail. A Direct message employs an encryption standard using the certificates published in DNS/LDAP built on the top of SMTP to allow the secure exchange of messages; whereas, plain SMTP does not.

- Q: The Edge test case SMTP 18 states, the SUT needs to connect to the ETT SMTP server using the credentials vendor...@ttpds.sitenv.org / vendortesting123 and send an email to wellf...@ttpedge.sitenv.org".

Is the ETT SMTP server ttpds.siteenv.org?

    * A: Yes, ttpds.sitenv.org is the SMTP ETT server.

- Q: SMTP MT Test 1 (Message to Bad Address); I am responding with a DSN rather than an MDN. I am using SMTP for both sending and receiving. I am not using IMAP or POP at this time. Is that acceptable? If not, why not?

  - A: For these cases, ETT acts as the EDGE SMTP sender (and also the notification SMTP receiver) - and so, the ETT is set up to check for the MDNs in the failure15@ttpds.sitenv.org inbox. The SMTP/SMTP cases are designed such that ETT as an Edge SMTP server sends through the HISP, and expects the HISP to deliver the mail to its inbox failure15@hisp-testing2.nist.gov.

- Q: I entered my profile information, went to message tracking and followed the instructions for each of the testcases. These test cases are failing: EDGE SMTP MT Test 18(a), EDGE SMTP MT Test 47(a), EDGE SMTP MT Test 45 and EDGE SMTP MT Test 46. Can anyone outline the procedure of testing these?

      * A: For EDGE SMTP MT Test 45 and EDGE SMTP MT Test 46 you need to have Disposition-Notification-Options header for the test case to pass. Try the test cases again with the required header.

  EDGE SMTP MT Test 18(a) and EDGE SMTP MT Test 47(a) is a SMTP-SMTP scenario. The system under test (SUT) needs to authenticate with ETT using the credentials vendor1smtpsmtp@ttpds.sitenv.org / vendortesting123. After authentication, a mail needs to be sent to the specified addresses(goodaddress-plain@ttpedge.sitenv.org and noaddressfailure9-plain@dnsops.ttpedge.sitenv.org) to generate the MDN. The MAIL FROM should be vendor1smtpsmtp@ttpds.sitenv.org.
  After the above step enter the SUT information (hostname, vendor email address, username, and address) in the profile window.

Executing the testcase will fetch the MDNs from vendor1smtpsmtp@ttpds.sitenv.org inbox and deliver to the SUT using the information provided in the profile window.

For EDGE SMTP MT Test 18(a) and EDGE SMTP MT Test 47(a), you need to:

1. Enter your account information in the 'Profile Panel' on the test page.
2. Review the account in the 'More Info' page.
3. Connect to the vendor1smtpsmtp@ttpds.sitenv.org account, authenticating with using the credentials shown in more info.
4. Send an email to dispatchedonly-plain@ttpedge.sitenv.org and noaddressfailure9-plain@dnsops.ttpedge.sitenv.org from the vendor1smtpsmtp@ttpds.sitenv.org account.
5. Wait for a few minutes to allow the MDNs to return.
6. Execute the test (RUN), then 'Awaiting Validation', there should be a success notification and the forwarding message.
7. Look for negative MDNs in your inbox.

- Q: We have not been able to successfully send SMTP Messages to wellformed14@ttpds.sitenv.org because we do not have a Trust Anchor and Public Certificate for this domain.

We are having the same issue with noaddressfailure9-plain@dnsops.ttpedge.sitenv.org from Test 18.
We have already loaded the certificates/trust anchor available here: https://ttpedge.sitenv.org/ttp/#/direct

    * A: This is the self-signed server certificate that is used by the James server

at ttpds.sitenv.org:25. Please add it to your trust store and let us know if this helps. Please
note these test cases are Edge protocol plain SMTP-STARTTLS (not Direct)

- Q: Where is the certificate for the Apache James server?

      * A: The certificate for Apache James can be found here:

  https://github.com/siteadmin/ett/blob/resources/certificates/common/james/ttpds.sitenv.org.james-tls.cert

  - Follow-up: We configured the direct account in Thunderbird and the account which was shown in
    “More info.” In the direct account settings, choose “default out-going” mail server to direct as
    ttpds.sitenv.org; which is the SMTP server to the email vendoraccount@ttpds.sitenv.org.  
    Using these settings, the SUT can email to wellformed14@ttpds.sitenv.org via a direct email server,
    emails are relayed and processing through ttps.sitenv.org. I am able to pass with this approach.  
    The James Certificate is used to encrypt the communication with SMTP/POP/IMAP protocols.

- Q: SMTP MT Test 46 Certificate Issue: We have installed the Trust Anchor from the TTP site. However, when I attempt to send I got an error as unable to find domain bound certificate for this (wellformed14@ttpds.siten.org) address. Is another way to discover their certificate?

  - A: This is NOT a direct endpoint. You need to send an SMTP message. If you have you passed SMTP MT 17 and 45, this test should be similar.

## Direct Edge -- XDR

- Q: XDR Test 16 says "Verify that Mutual TLS session is established between the Sender and the Receiver before transmitting data". I don't fully understand what has to be in place for this test. Do we need to submit a public certificate somewhere in our account that maps to a private key to tell the ETT to trust our system?

  - A: You have downloaded the direct certificates. These are NOT the certs for mutual TLS. You need to download the certs from the embedded URL above the XDR Test 13 test.

- Q: The end point I've been testing with is the following: https://vs-... I also just tried running the XDR Validator, and seem to be running into errors there as well.

  - A: Please ensure you have installed the certificates needed for testing. The Direct certificates can be found on the Direct Home page (https://ttpedge.sitenv.org/ttp/#/direct) and the XDR certificates can be found on the Edge XDR Page, just above the 'Your system as "Sender"' button (https://ttpedge.sitenv.org/ttp/#/edge/xdr).

- Q: I ran XDR 5 with his endpoint and I see this error in the logs.
  Caused by: { code:"500" extendedCode:"0" reason:"XdsInternal error
  SOAP Fault: com.ctc.wstx.exc.WstxParsingException: Undeclared namespace
  prefix "soapenv" at [row,col {unknown-source}]: [1,158]" reasonPhrase:"Internal Server Error" }

      * A: expand on the error message, the requirement that the format (Simple SOAP vs MTOM) be the same is specified in IHE ITI Technical Framework, Volume 2, Appendix V: V.8.1 Simple SOAP vs MTOM, "Both the request and the response messages shall use the same encoding."

More readable descriptions and the background behind this requirement can be found:

https://wiki.ihe.net/index.php/XDS.b_Implementation#More_on_MTOM_vs_MTOM.2FXOP
https://wiki.ihe.net/index.php/XDS.b_Implementation#Interpreting_Web_Services_Specifications_for_XDS.b_and_XCA

Most web service packages/libraries (such as Apache Axis2, etc) will make this switch automatically.

- The timeout for the registry / XDS Toolkit is 60 seconds.

* Q: What are the XDR, Direct From Address, email endpoints?

  - A: The endpoints can be found at: https://github.com/siteadmin/ett/wiki/XDR-Endpoints

The XDR MT Tests use these endpoints for destination:
MT 13: badaddress@gfail.com
MT 14: Provider1@direct2.sitenv.org
MT 15: failure15@ttpds.sitenv.org
MT 16: nomdn8@ttpedge.sitenv.org
MT 32: badaddress@gfail.com
MT 33: Provider1@direct2.sitenv.org
MT 34: failure15@ttpds.sitenv.org
MT 35: nomdn8@ttpedge.sitenv.org
MT 36: processedonly@ttpedge.sitenv.org
MT 37: processedonly@ttpedge.sitenv.org
MT 38: processeddispatched6@ttpedge.sitenv.org
MT 43: processedtimeoutfailure@ttpedge.sitenv.org
MT 44: processedfailure@ttpedge.sitenv.org

- Q: Edge XDR Test 6 (Send): I need to check the integrity, but can't because ETT tool generated HASH is in SHA-1 and is giving a mismatch error. How do I check D\* integrity test case along with b1? Is there any link to check this?

  - A: For this test, all the SUT needs to do is establish an HTTPS connection using the provided certificates. Please download the certificates found at the top of the page.

- Q: Edge XDR Test 5 (Receive): I am getting Request from ETT tool I validate it and genererate the below response with return type "String"

Content-Type: multipart/related; boundary=MIMEBoundaryurn_uuid_45f3cde8-1e8f-4f81-bfdb-c40365cc698a; type="application/xop+xml"; start="0.urn:uuid:45f3cde8-1e8f-4f81-bfdb-c40365cc698a@apache.org"; start-info="application/soap+xml"; action="urn:ihe:iti:2007:ProvideAndRegisterDocumentSet-bResponse"...

Want to know how to validate XDR soap header & body ?
And also what should be response format ?

    * A: Please refer to the IHE specifications and wiki for how to create/validate the XDR messages.

There are a few threads in the google group that you can use for reference.

- Q: Can you confirm that XDR MT Test 50a and XDR MT Test 50b require us to send 1 message with multiple intended recipients? We assume this is the approach vs. 1 message with 1 intended recipient to differentiate it from test XDR MT Test 20a and XDR MT Test 20b (positive and negative MDNs). These tests, XDR MT Test 20a and XDR MT Test 20b, appear to be redundant with regard to tests XDR MT Test 50a and XDR MT Test 50b.

  - A: The tests, XDR MT 50a and XDR MT Test 50b weren’t designed for multiple recipients, each test requires an individual endpoint for testing. The intention of the XDR MT Test 50 a and XDR MT Test 50 b are to demonstrate the rigor of the SUT by sending to several recipients. The Test Procedure directs the SUT to send to one recipient using tests XDR MT Test 20 a and XDR MT Test 20 b, then to multiple recipients using XDR MT Test 50 a and XDR MT Test 50b.

Note: The test script does not direct the SUT to test sending to several recipients at the same time; understanding the confusion, it is asking the SUT to send to multiple valid recipients.

1. Delivery Notification: The user sends XDR messages to multiple valid recipients (XDR MT Test 50a).
2. Delivery Notification: The user sends XDR messages to multiple invalid recipients (XDR MT Test 50b).

- Q: To deliver disposition statuses asynchronously for XDR transmissions, is it expected that first a ResponseStatusType:Success is included by default in the synchronous reply or should it be omitted entirely?

  - A: Based on the underlying XDR work-flow, ResponseStatusType of Success would be expected to be sent back.

- Q: To which endpoint should XDR MDN’s be sent?

  - A: The endpoint for each test case should be listed in the UI for each individual test case.

- Q: What is a sample xml for an XDR MDN that includes both envelope and body?

      * A: An example of the overall XDR package is available here:

  http://wiki.ihe.net/index.php/XDS.b_Implementation#Example_Provide_and_Register_Document_Set-b_transaction
  Instead of sending a document as they have in the example, the message disposition would be sent as defined in section 1.5.2.1.1 of this document (which includes an example):
  https://www.healthit.gov/sites/default/files/implementationguidefordirectedgeprotocolsv1_1.pdf

- Q: When testing XDR sending, the user must click “RUN” on the tool (to generate the endpoint) and then send a message. When testing SMTP sending, it’s the opposite. The user must send the message and then click “RUN.” This inconsistency makes use of the tool more challenging.

      * A: This difference in the workflows is an artifact of the underlying technologies and unfortunately not something that would be easy to change on our UI.   For XDR, the endpoints must be established ahead of time or else the systems wouldn't know where to send messages.  The Direct From address must be known so that the message can be properly routed within the ETT to the correct test instance while the test case is running.  The ETT and Toolkit are an active part of this communication.  The ETT must be primed BEFORE the communication takes place.

  For SMTP, the ETT only becomes involved after the mail has been sent and is sitting in a mailbox. The SMTP communication/commands must be completed before ETT can check, or else there is nothing for ETT to find. The ETT can only step in AFTER the SMTP communication akes place.
  The underlying protocols themselves have different workflows.

- Q: I have sent my XDR message to the endpoint and receive a Registry Response. However, the ETT never moves past the Pending Refresh button no matter how many times I press it. How do I move forward?

  - A: Verify that your XDR message contains the Direct Address Block and that Block is completely filled out and matches what was entered into the Test Case UI. The ETT uses the Direct Address block to route the messages; so if the values do not match, they will not be forwarded to the correct module within ETT.

- Q: I used WCF to implement the XDR recipient web service. When testing XDR Test Case 4a and 4b, the process pipeline created CommunicationException and returned 400 server error to ETT before my codes get control. Here is the message from the ETT log:
  HTTP/1.1 400 Bad Request
  Cache-Control: private
  Server: Microsoft-IIS/7.5
  MIME-Version: 1.0
  X-AspNet-Version: 4.0.30319
  X-Powered-By: ASP.NET
  Date: Tue, 11 Oct 2016 16:01:14 GMT
  Content-Length: 0
  My question is, do we need to return a RegistryResponse with status urn:oasis:names:tc:ebxml-regrep:ResponseStatusType:Failure, or the 400 server error should be enough for this situation?

      * A: Test case 4a and 4b are negative test cases in the sense that the incoming messages are malformed and must be treated appropriately.  The SUT needs to demonstrate that it has detected the abnormality and reacted appropriately (i.e. not accepting the message).

- Q: I haven't figured out how to get ETT to show logs from asynchronous replies for the HISP XDR message tracking tests.
  The fields are: _ Endpoint, _ Direct From Address, and \* Outgoing (ETT --> SUT) Direct From Address

      * A: Test Case: XDR MT Test 13

  Notes: The specifications detail how an error should be reported back asynchronously, but do not specify when this method should be used; therefore, it is acceptable for a system to send back a registry response failure synchronously or a message delivery failure asynchronously.

ETT Action: The ETT will send a message to the SUT where the final address is non-existent.

SUT Action: The SUT will respond either synchronously or asynchronously.
If it is synchronous, a registry response failure will be sent. If it is asynchronously, a delivery failure message will be delivered.

Proctor Action: The individuals operating the SUT will inform the Proctor how their system responds when a message is asked to be delivered to an address that is non-existent. In the UI, the same logs screen will be used in either the sync or the async case. Depending on whether the communication is sync or async, the Proctor will expect to see a registry response failure in the response tab of the logs (for
sync) or a message delivery failure on the request tab of the logs (for async).

Steps:

1. Populate the fields. Endpoint parameter refers to the SUT’s listening
   endpoint. Direct From Address refers to the Direct From that the SUT
   will use if it is sending a response asynchronously. Outgoing Direct
   From refers to the Direct From address that the ETT will use for its
   initial outgoing XDR communication.

2. Press Run button

3. The XDR message is sent to the SUT.

4. If you want to see the synchronous response, press logs or Pending
   Refresh. If you are following the asynchronous option, do not press
   anything on the UI yet. (Synchronous option is finished here.)

5. The SUT now sends the asynchronous response.

6. When the asynchronous response is complete, then press Pending
   Refresh. If the message has been found, this button will turn to
   Awaiting Validation. Pressing this will bring you to the asynchronous logs.

- Q: For XDR Test Case 7 why do we not enter a full endpoint?

  - A: The ETT tracks the incoming messages via the Direct Address block; however, in this case, the SUT is supposed to stop the communication before a message is sent because the certificate is bad. Since, the message should not come through, we will not have access to the Direct Address; therefore, the ETT asks for the IP address and tracks the request through that. Since, this is happening at the socket level, the full path for an endpoint is not applicable.

- Q: Does anyone know whether it's required to use HTTPS for the sending tests other than 6 &7?

  - A: HTTPS is required for XDR 6 and 7; however, other XDR tests can be demonstrated using HTTP or HTTPS.

- Q: Where is the functionality in the ETT for testing the two requirements listed below referenced in the test procedure (https://www.healthit.gov/sites/default/files/170_315h2_Direct_Project_Edge_Protocol_and_XDRXDM_v1_2.pdf)?

  - "170.315(h)(2)(i)(B) Send Using SOAP + XDR"
  - "170.315(h)(2)(i)(B) Receive Using SOAP + XDR"

    - A: That functionality is under "Edge Testing" from the ETT main menu, then the "XDR Test Cases" navbar link at the top of the page.

- Q: In order to pass XDR Test Case 1, is it necessary to create XDR requests which include the selected document? Where can these samples be found?

  - A: If you navigate to:
    https://ttpedge.sitenv.org/ttp/#/validators, select CCDA R2.1 Validator, then download all files. The samples can be found in the download under: \CDAs\2015-Certification-C-CDA-Test-Data-master\Receiver SUT Test Data. Alternatively, the file is also at: https://github.com/siteadmin/2015-Certification-C-CDA-Test-Data/tree/master

- Q: Specific tests require the SUT to receive an XDR message, translate it, then send back to the ETT via Direct. The sender address of the outgoing Direct message is supposed to match up with the address that we pre-registered, but the direct:to and direct:from fields in the received XDR message both contain the address testc...@edge.nist.gov. So, my understanding is that we must implement a workaround to change the sender address on the outgoing side. Is that correct?

  - A: Functionality is being added to make the direct from information configurable from the UI in the HISP XDR test cases. The tests were updated to include a "From" address entry box.

- Q: Unlike the other edge reliable messaging tests there is no place to configure the callback URL for the message dispositions. Is the test expecting to find a HISP with the associated endpoint or is the intent to verify that the direct:addressBlock contains the X-DIRECT-FINAL-DESTINATION-DELIVERY element?

  - A: XDR MT test 48 is testing only the SUT's ability to generate three messages with unique IDs. The message dispositions are out-of-scope for this test. Once the three unique message IDs are found (or found not to be unique) the test is complete.

- Q: What are the differences between tests XDR MT Test 19 and XDR MT Test 48?

  - A: You run MT 19 if you're implementing Message Tracking Using Processed MDN. You run MT 48 if you're implementing Message Tracking Using "Implementation Guide for Delivery Notification".

- Q: We have downloaded the keystore from the above site and configured our tomcat server to use it for secure connection; however, no secure connection can be established. We performed the tests this afternoon, around 1:30pm Central. Our endpoints are as follows:

Non-secure: http://ych-qa-mu3.test.yourcareuniverse.net:9280/connex-ett/xdsb/pushDocumentSet

Secure: https://ych-qa-mu3.test.yourcareuniverse.net:9283/connex-ett/xdsb/pushDocumentSet

Please advise us of how to resolve this issue.

    * A: We found the logs for this test case :

INFO 3888 --- [io-12080-exec-1] g.n.h.ttt.xdr.api.TLSClientImpl : Sending a request to the server using socket:
Socket class: class sun.security.ssl.SSLSocketImpl
Remote address = ych-qa-mu3.test.yourcareuniverse.net/52.73.115.17
Remote port = 9283
Local socket address = /172.31.38.171:36196
Local address = /172.31.38.171
Local port = 36196
Need client authentication = false
Cipher suite = SSL_NULL_WITH_NULL_NULL
Protocol = NONE
javax.net.ssl.SSLException: Connection has been shutdown: javax.net.ssl.SSLHands
hakeException: Received fatal alert: bad_certificate

It looks like you are using a bad certificate. Please re-download the certificate and re-install it.

- Q: XDR Test 3 (Revieve): We believe we having an issue Receiving the Documents and saving to the EHR. We have code to check for a document ID which has been sent in the past. Is there a way we could set the unique document ID in the test so that we can import the files more easily?

  - A: The ETT uses a symbolic ID ("Document01") in the metadata to identify the attached document:

<rim:ExtrinsicObject id="Document01" mimeType="text/xml"
objectType="urn:uuid:7edca82f-054d-47f2-a032-9b2a5b5186c1">

It is incumbent upon the receiving registry in a provide and register transaction to turn the symbolic ID into a UUID of their choosing. In IHE ITI, Volume 2b, see Section 3.42.4.1.3.7 UUIDs and Symbolic Ids:

"If a field is formatted as a symbolic Id in the Submission Request, the Document Registry shall replace it with newly generated, properly formatted UUIDs upon acceptance of the submission. If the same symbolic Id appears more than once in the Submission Request, it shall be replaced with the same generated UUID."

The receiving system must be able to handle symbolic IDs in accordance with the base IHE specifications.

- Q: What are the differences between tests XDR MT Test 19 and XDR MT Test 48.

  - A: XDR MT Test 19 is for Message Tracking Using Processed MDN. XDR MT Test 48 is for Message Tracking Using "Implementation Guide for Delivery Notification".

- Q: ETT is not succeeding for us on XDR Test 8, though we seem to be able to perform mutual SSL with the provided client certificate using OpenSSL. XDR Test 8 is not giving us much information about why it is failing. I suspect ETT is not trusting our server certificate. We have had issues before with certain systems not including GoDaddy's intermediate certificate authority, resulting in an incomplete certificate chain.

  - A: The certificate provided for the XDR transactions needs to be used in both sides of the mutual TLS connection (it's loaded into our keystore and your keystore or equivalent). We don't look for your server certificate, the toolkit is already loaded with the provided, self-signed cert.

- Q: In the XDR test 8 for mutual TLS, the following test step is used:
  “Verifies the ability of the receiving system to complete a mutual TLS handshake before data is sent across. Certificates for this test can be downloaded from the link at the top of this page. As this is a socket-level test, the full endpoint is not necessary and only hostname and port are to be entered below”.  
  Where can the referenced certs be downloaded from?

      * A: There is a download link above the “Your System as: Sender” with light blue text, “Click to download TLS Certificates”.

- Q: XDR MT Test 30 includes a Direct To Address field, which is only used for async responses in other tests. However, my understanding is that this test is only checking that the SUT can handle the X-DIRECT-FINAL-DESTINATION-DELIVERY header, not that the resulting delivery notification is valid. Am I correct? If so, what is the purpose of the Direct To Address field?

  - A: The X-DIRECT-FINAL-DESTINATION-DELIVERY header is what is checked for this test case.

  The “DIRECT To:” is the direct address that is responded to and is registered/mapped in the Direct portion of the ETT.

  The "Outgoing (ETT --> SUT) Direct From Address" refers to the value that we place in the <direct:from> element in all outgoing messages from ETT to the SUT. This may be optional for your system.

- Q: Is there a sample you can provided for XDR MT TEST 30 so show what the header should look like?

  - A: The soap body could itself be inspected from the "Log" section of the test by clicking the "Waiting for Validation" or "Logs" button after running the test.. Please let us know if this is not what you are looking for.

  Of particular interest is this part

  <direct:X-DIRECT-FINAL-DESTINATION-DELIVERY>true</direct:X-DIRECT-FINAL-DESTINATION-DELIVERY>

  - Follow-up: In the 30 and 31, the proctor needs to verify that the headers are being processed and "accept" / "reject" based on the demonstration.

  For 32 and above, the "Logs" button can be used to see the synchronous/asynchronous delivery notification produced by the System Under Test (SUT), however, the process of accept/reject still remains the same - a verification by the proctor as per IG for Delivery Notification 1.5.2.1.1.

  "The proctor will read the logs for the synchronous communication or the asynchronous communication for an appropriate response. This test is part of the Implementation Guide for Delivery Notification test suite"

- Q: Please confirm my understanding. The ETT for XDR MT TEST 30 sends a a VALID delivery notifications request to the system under test in the following format. The system under test then sends a Direct message based on the VALID delivery notifications request. If I am correct then is the format above that you sent me the complete VALID delivery notifications request? We are trying to give vendors a sample of what the VALID delivery notifications request looks like.

  - A: Yes, that is correct; the format is same - however the multi-part identifier and other ids and direct:from/to elements will differ based on the session.

- Q: The vendor does not understand XDR MT TEST 30, and I am not 100% sure of what role the Test Proctor has in the verification process. This is the message flow chart from page 11 of the IG for Delivery Notification. So...

1. The ETT acts as the Receiving STA because the ETT sends a VALID delivery notifications request?

2. The SUT is expected to receive this valid delivery notification, and send a success notification back to the ETT (with the ETT acting as the original sending Edge client?

If this is correct then what format of the success notification is the ETT looking for? And, what verification does the proctor do since it seems that some verification is done automatically by the ETT, and other verification seems like it is visual inspection by the proctor.

    * A: The complete positive delivery notification flow described is being tested in XDR MT TEST 38 (and in these cases, ETT only shows the logs and no automatic verification is being done, the proctor has to accept/reject based on visual inspection as per examples in the IG for Direct-Edge 1.5.2.1.1.)

However, XDR MT TEST 30 tests only a part of it, namely that the XDR well formed header is being processed by SUT - this can be demonstrated by showing the SUT logs. Similarly XDR MT TEST 31 can be demonstrated by the SUT log message of an error in the malformed field. Technically speaking XDR MT TEST 38 subsumes XDR MT TEST 30.

For XDR MT TEST 38, you are right - ETT acts as a sending Edge by requesting the Delivery Notification through the header. And SUT is expected to receive this valid notification and send it back to the ETT (acting as the Edge XDR) - which can be viewed from the tool's log button - in this case, the example of the notifications are given in the document example from IG for Direct-Edge 1.5.2.1.1.

<direct:messageDisposition>
<direct:recipient>mailto:entity1@direct.example.org</direct:recipient>
<direct:disposition>success</direct:disposition>
</direct:messageDisposition>

(for negative cases, XDR MT TESTs 33-37, this would correspond to failure with an optional reason for failure as per the example)

- Follow-up: The SUT is never creating a notification in MT 38 since it just forwards a copy of the notification from the ETT back to the ETT?

"For XDR MT TEST 38, you are right - ETT acts as a sending Edge by requesting the Delivery Notification through the header. And SUT is expected to receive this valid notification and send it back to the ETT (acting as the Edge XDR)"

    * A: SUT is copying the notification from ETT received through Direct SMTP back to ETT - but now using XDR (Edge).

- Q: Where is the XDR SAML validation in the ETT?

  - A: It is available in the XDR Validator in the Message Validators section:

  https://ttpedge.sitenv.org/ttp/#/validators/xdr

  The receive part validates the incoming SAML and the send part has the ability to include the headers in the outgoing message.

- Q: The HTTPS XDR test endpoints aren't working properly, specifically XDR Tests 3 & 5.

  - A: Please ensure you have downloaded the certificates and installed them. The certificates can be found at the top of each test section, beneath the ribbon bar and above the button "Your System as: Sender". Look for, "Click to download XDR TLS certificates".

* Here are some examples for XDR:
  http://wiki.ihe.net/index.php/XDS.b_Implementation#Example_Provide_and_Register_Document_Set-b_transaction_.28with_full_metadata.29

ftp://ftp.ihe.net/TF_Implementation_Material/ITI/examples/XDS.b/
(Provide and register examples)

## XDM

- Q: My XDM is not being validated because the tooling says it cannot find the metadata, or cannot open the zip, or is not moving forward in the validation steps.

  - A: Check that the IHE_XDM and SUBSET01 directories have been explicitly created. When the ZIP file is viewed, there should be a specific entry for each directory listing.

* Some examples for XDM:
  ftp://ftp.ihe.net/Connectathon/samples/XDM_samples/

A table showing the difference in optionality between the different XD\* metadata is available in Vol 3 of IHE ITI:
<http://www.ihe.net/uploadedFiles/Documents/ITI/IHE_ITI_TF_Vol3.pdf> See table " 4.3.1-3: Sending Actor Metadata Attribute Optionality" starting on page 109.

- Q: I have tried to validate some XDM zip's, but it seems that the validator stops at point 'Decoding ZIP'.
  It works with the sample found on ftp://ftp.ihe.net/Connectathon/samples/ITI-profiles/XDM_samples/ but if you try to decompress and compress it again, it does not work anymore.

I've tried with different compressing algorithm like 'Deflate', 'Deflate64', 'LZMA', 'PPMd', 'BZIP2', but none of them works. If you try with those kind of algorithm, you will see java exceptions of the validator saying 'not supported algorithm...'
So my question now is how to compress files to create a valid XDM-Zip?

    * A: Tested working solutions are:

- Using of 7-Zip (17.00 beta) -> But you have to set the 'relative path' again in the GUI.
- Using of MacOS X line command, navigate to the folder that contains all XDM-files and use 'zip -r <archiveName> \*'
- Using WinRAR 5.40 (64bit) -> make shure that value 'Store relativ path' under tab 'Files' is selected
  The IHE specification states to use the ZIP format, not the RAR format for compression.

## C-CDA

- Q: How do you use the C-CDA 2.1 Validator?

      * A: 1. Using the C-CDA Validator 2.1, Step 1 is to select whether you are performing a Sender specific test or Receiver Specific test (Select Sender / Receiver).

  a. The above choice will make what appears when you click the “Select Document “ to change based on the SUT role.
  b. In your case you would select “Sender”

2. Then you would select the criteria first and for each criteria that you select you may have one or more PDF files.
3. You would download the PDF file,
4. Enter the test data provided into your SUT instance.
5. Generate a C-CDA document. (This is C-CDA Validator Step 2)
6. Then in the C-CDA Validator Step 3, you have to select the Criteria and the PDF file which you used to generate the C-CDA.
7. Then upload the C-CDA file that you generated in C-CDA Validator Step 4 and then validate.

The above sequence is what you would use to validate the C-CDA files you generated using the test data.

If you want to validate files generated by your system without using the test data provided then you can proceed to Step 3 and select “CCDA_IG_Only” or “CCDA_IG_Plus_Vocab” options and then upload and validate. This is to help vendors prepare their systems however certification procedures require the use of the provided test data unless you work with the ATLs to file for deviations to the test data.

- Q: Can multiple organizations be included as information recipients within the <information Recipient> element?

  - A: CDA allows for 0..\* information Recipients. You should include more than one informationRecipient if you’d like to send information to multiple organizations.

- Q: How can CCDA xml files for interoperability modules be created to include multiple races and ethnicities?

      * A: There is an extension package that may be used.

  sdtc:raceCode
  sdtc:ethnicGroupCode
  See the C-CDA companion guide for additional details:
  http://www.hl7.org/implement/standards/product_brief.cfm?product_id=447

- Q: I'm now trying to increase the debugging output from the validator, hopefully to see where my issues exist with the vocabulary. I've tried using a global DEBUG level in the logging.properties file and setting to ALL, but it appears that the validator doesn't look at the properties file to set it's level of logging.

Does anyone know where I can change that info level for the validator classes?

The logging that I do get appears to show the vocab/valuesystems loading just too quickly.

08:27:14,748 INFO [VocabularyLoadRunner:92] Loading vocabularies at: /var/tomcat2/ValidatorConfig/CodeSystems...
08:27:14,748 INFO [VocabularyLoadRunner:94] Vocabularies loaded...
08:27:14,748 INFO [VocabularyLoadRunner:99] Loading value sets at: /var/tomcat2/ValidatorConfig/ValueSets...
08:27:14,749 INFO [VocabularyLoadRunner:101] Value Sets loaded...
08:27:14,749 INFO [VocabularyLoadRunner:105] !!!!****\*\*\***** VOCABULARY DATABASE HAS FINISHED LOADING - SERVER WILL CONTINUE AND SHOULD BE DONE SHORTLY. ****\*\*\*****!!!!

    * A: 15:02:46,635 INFO  [VocabularyLoadRunner:92] Loading vocabularies at: C:\CCDA\Validator\code_repository...

15:02:46,636 INFO [VocabularyLoadRunner:44] Loading files in : CDT...
15:02:47,758 INFO [VocabularyLoadRunner:44] Loading files in : ICD10CM...
15:02:51,412 INFO [VocabularyLoadRunner:44] Loading files in : ICD10PCS...
15:02:53,378 INFO [VocabularyLoadRunner:44] Loading files in : ICD9CM_DX...
....
C:\CCDA\Validator\valueset_repository...
15:04:37,554 INFO [VocabularyLoadRunner:44] Loading files in : VSAC...
15:04:37,555 INFO [VsacLoader:30] Loading Value Set File: Ability.xlsx
15:04:37,662 INFO [VsacLoader:30] Loading Value Set File: ActPriority.xlsx
15:04:37,708 INFO [VsacLoader:30] Loading Value Set File: ActStatus.xlsx
...

Here are my config settings for the the codes set and value set files:

<Parameter name="vocabulary.localCodeRepositoryDir" value="C:\CCDA\Validator\code_repository" override="true"/>
	<Parameter name="vocabulary.localValueSetRepositoryDir" value="C:\CCDA\Validator\valueset_repository" override="true"/>

The localCodeRepositoryDir is the path to the folders (e.g. ICD9CM_DX, ICD9CM_SG, ICD10CM, etc...) that contain the code set files.
The localValueSetRepositoryDir is the path to the VSAC folder that contains all of the value set files.
I believe the application is hard-coded to look for those particular folders in order to process the files within. That may be case-sensitive...

- Q: Hello, were there any updates made to the tool? I'm getting this same error with problem codes for "no known problems".

      * A: No specific updates were made to the tool to remove the validation for the “No Known Problems”.

  Are you following the HL7 example at http://hl7-c-cda-examples.herokuapp.com/examples/view/7353a215efda8dfe3fbacb19abbb90756ce14bab

- Q: Hoping to obtain some clarity around representing NDC codes for administered immunizations in the C-CDA.

NDC is published as a standard for immunizations as a CCDS element and the ONC's CCDS companion guide cites that it's supported as a translational element accompanying the CVX code in CDA R2.1. Looking at the 2.1 IG, NDC is referenced within the Immunization Medication Information entry-level template with the Vaccine Clinical Drug value set stating: "Value set intensionally defined from RXNORM (OID: 2.16.840.1.113883.6.88), comprised of those codes whose ingredients map to NDC codes that the CDC associates with CVX codes." Reading this and viewing the provided examples it appears as though the IG expects only RxNorm codes (not NDC) to be used as translational element entries mapping between an NDC and a CVX.

NDC's are not actually included anywhere in the certification test data/validation for immunizations (only CVX), and I'm struggling to find any examples of their use for immunizations in C-CDA. Is there a specific expectation of how NDC codes are to be represented in C-CDA docs (if at all) to satisfy the ONC's CCDS standard?

    * A: The test data contains CVX because that is accompanied with a SHALL requirement in the C-CDA IG.

Since the translation elements are having a conformance statement of “MAY” and not a “SHALL”, you could choose to use the NDC codes mapped to the CVX codes in the translation element as specified by the CCG.

## Other

- Q: Question: In our implementation and definition of our Edge system and our HISP, we are not able to use the ETT as our HISP to connect to our Edge system. (This reference from the Federal Register’s published Final Rule supports our implementation: https://www.federalregister.gov/d/2015-25597/p-1114. Relevant text in the screenshot below).

For XDR Test 5, the ETT "More Info" link says:

Description:
Verify that an Edge system can receive a properly formatted XDR message. The SUT will receive the XDR message with a 'direct:from' and 'direct:to' address of testcase5@ttpedge.sitenv.org. This was designed to require the SUT's endpoint as the only input parameter.

Expected Result:
Edge system is capable of receiving and processing a valid message with Full Metadata, test procedure may include other details for verification. Test Tool is satisfied with a good response.

Because that is not a domain that we manage, our system is rejecting the XDR messages. To resolve this issue, we have mapped inbound XDR messages with a To address domain of @ttpedge.sitenv.org to a domain that we manage in order to successfully receive these messages. We have been able to successfully complete these tests.

    * A: The demonstration of a successful receipt of the message is the benchmark. The domain mapping approach you describe is acceptable.

- Q: Is it safe to send Protected Health Information (PHI) to NIST tooling?

  - A: No! Never send Protected Health Information (PHI) to the ETT server. If necessary, local copies of our tooling can be downloaded and installed. DO NOT send live data to the tool on our website, there is no protection for PHI/PII.

- Q: How do we differentiate between a PRN medication and a Daily once frequency medication?

  - A: Right now, the presence of a ‘precondition’ with appropriate nullFlavor is an indicator for PRN without a precondition. If you have a precondition, that that is your precondition PRN – if this is a problem in your current live implementation, please come to HL7 SDWG (Thursday 10-12 PM ET - Agenda) – happy to discuss alternative approaches. " QD = daily" & "PRN = As needed"; You can have ‘Daily with a specific precondition (e.g. Back pan) or ‘Daily as-needed’
    (aka QD PRN). If you want to present an example with precondition, we are happy to have
    you on the HL7 examples task force.

- Q: The previous test data (v9) had medications that seemed to fall either within the admission (6/22/15-6/24/15) or to be discharge medications (beginning 6/24/15 with various end dates). The v10 test data changed the dates. Was there a rationale for this change? Are the medications that start during the admission but continue after it (for example, 6/22/15-6/30/15) intended to be prescriptions or inpatient orders?

      * A: Systems were encountered that were treating medications that had start dates and end dates within the inpatient stay as historical medications. Because of this, they were not sending all the medications as part of the C-CDA document generated. One of the resolutions was to make sure all the medications had an end date after the inpatient stay so that the entire list can be included as part of the C-CDA document. Some of them start during the encounter and continue beyond the encounter. The list of medications can be part of the Medications section or the

  Discharge medications sections.

- Q: Where can ATLs download the latest release of the ETT for local installation?

      * A: The current release packages are available here:

  https://github.com/siteadmin/ett/releases

- Q: Now that the ETT has transitioned to hosting by SITE what inbound IPs and Ports are utilized?

  - A: The port configurations remain the same, and the information regarding the URLs/certificates/endpoints are in this ONC announcement below - https://groups.google.com/d/msg/edge-test-tool/MZBY5UPsOPE/1RJkv-n8AwAJ

- Q: Are there online tutorials to use for the Edge Testing Tool?

  - A: Online tutorials: https://ttpedge.sitenv.org/ttp/#/validators/documents

- Q: We’re having an issue Receiving the Documents and saving to the EHR. We have code to check for a document ID which has been sent in the past. Is there a way we could set the unique document ID in the test so that we can import the files more easily?

      * A: The ETT uses a symbolic ID ("Document01") in the metadata to identify the attached document:   <rim:ExtrinsicObject id="Document01" mimeType="text/xml" objectType="urn:uuid:7edca82f-054d-47f2-a032-9b2a5b5186c1">

  It is incumbent upon the receiving registry in a provide and register transaction to turn the symbolic ID into a UUID of their choosing. In IHE ITI, Volume 2b, see Section 3.42.4.1.3.7 UUIDs and Symbolic Ids: "If a field is formatted as a symbolic Id in the Submission Request, the Document Registry shall replace it with newly generated, properly formatted UUIDs upon acceptance of the submission. If the same symbolic ID appears more than once in the Submission Request, it shall be replaced with the same generated UUID." The receiving system must be able to handle symbolic IDs in accordance with the base IHE specifications.

- Q: We’re getting an error message while trying to validate a C-CDA file- any suggestions?

  - A: All prescribable medication formulations are represented using either a "generic" or "brand-specific" concept. This includes RxNorm codes whose Term Type is SCD (semantic clinical drug), SBD (semantic brand drug), GPCK (generic pack), BPCK (brand pack), SCDG (semantic clinical drug group), SBDG (semantic brand drug group), SCDF (semantic clinical drug form), or SBDF (semantic brand drug form). It does not include the PSN term type, hence the error. If PSN needs to be included, it should be an ERRATA through HL7.

- Q: For Negative Testing CCDS samples 2 and 3, there is a SNOMED code "27171005" which is being validated in the ETT Message Validator as a LOINC code and throwing an error. It appears that this is a valid SNOMED code in the results section of a procedure. Will the ETT Message Validator be updated to address this issue?

  - A: Negative Testing which is being performed as part of the b1 capability is to ensure that the System Under Test (SUT) is more robust and is able to receive and parse C-CDA’s more effectively including the CCDS data elements. All of the CCDS vocabulary requirements that are enforced for normal b1 sample XML files are valid for negative testing also.

- Q: I tried to understand the certification criteria but got stuck with understanding 170.315(h)(1) & (h)(2). I don't understand why h1, looks like h2 is covering h1. I have couple of questions: 1. What is a edge system how to implement it? DO I HAVE TO for this MU3 Certification? 2. As of my knowledge, a HISP can be implemented by using Direct project JAVA RI, but I don't understand what an edge protocol is and how to implement? 3. All documents in the "Implementation Guide for Delivery Notification in Direct V 1.1" and the "Applicability Statement for Secure Health Transport V 1.2" are talking about HISP-SMTP, Edge-SMTP, and SOAP protocol what is the deference?

      * A: The definition of an Edge system and Edge protocols are defined in Implementation Guide for Direct Edge Protocols Version 1.1 which is available here:

  https://www.healthit.gov/sites/default/files/implementationguidefordirectedgeprotocolsv1_1.pdf.

  - Questions regarding the Certification Program should be addressed via email to: ONC.Certification@hhs.gov. You will also discover information at this link: https://www.healthit.gov/policy-researchers-implementers/2015-edition-test-method

- Q: Attached is an Edge sample file with UNKNOWN for patient race and ethnicity. I have tried but could not find UNKNOWN any where in OMB/CDC race and ethnicity value set codes. I have tried several ways, but it is giving data validation error. Please guide us from where i can find code for UNKNOWN race and ethnicity. Is there issue in sample file data ??

  - A: Please refer to the C-CDA IG for the appropriate value sets and the codes for Unknown.

- Q: What is the process for configuring a SUT for Mutual TLS Authentication? I understand that the SUT can download the cert from the ETT for it to trust the tool. How does the ETT trust the SUT?

  - A: That same cert will need to be loaded into the SUT as well. The same cert is used for both sides of the mutual TLS connection.

- Q: Do HTTPS end points work, it isn’t working for us.

  - A: Vendors need to be aware of the following when using HTTPS endpoints.

1. SUT has to import the ETT published certificates to use for Mutual TLS.
2. They need to provide these certs in the Mutual TLS handshake when using HTTPS.
3. Sometimes when using the ETT certs, vendors encounter exceptions.
   a. Here is an example:
   i. When attempting to run tests in the Edge Test Tool, we added the Certificates into our system. We noticed a critical failure and were unable to send a message due to an issue we found with the cert.pem file. There is a Core Java feature that requires the contents of the subject (CN) to match the host. What we expected was CN=ttedge.sitenv.org but what we saw was CN=test.

To fix the above problem identified in bullet #3, the vendor can use the approaches outlined below.
a. If there are issues with the CN name, it is possible to map the host file (1).
b. Alternatively make a change programmatically per the IHE recommendation (2).

It is acceptable to use the hostname implementation approach or the approach identified by the IHE. Using the approach identified in the IHE wiki will allow you to interoperate with other Endpoints who follow the IHE spec and provide certificates which don’t have the right CN value.
If you did it programmatically, you set the address as the requirement; however, the host name approach is also fine as long as you know that in the real world might encounter the same issue and you will have add more host names.

(1) Please see the post below for the host file mapping solution.

“What we expected was CN=ttedge.sitenv.org but what we saw was CN=test.

To resolve this issue, we added a entry into our host file to map "test" to "ttpedge.sitenv.org." Please confirm this approach is acceptable.”

https://groups.google.com/d/msgid/edge-test-tool/1f1c6fdd-834e-44d9-856d-57d4a07ed391%40googlegroups.com.

(2) Please see the posts below for the IHE programming solution.
How do I eliminate exceptions caused by Certificate mismatches with the server host name?
The ATNA profile says nothing about whether the DNS name of the host must match the name specified in the certificate. It assumes that posession of the certificate with the private key is sufficient to protect the connection.
By default, the Java HttpsURLConnection verifies the DNS name of the host against that of the certificate. If you want to disable this, the easiest way is to add the following lines of code somewhere in the initialization of your application.
HttpsURLConnection.setDefaultHostnameVerifier(
new HostnameVerifier() {
public boolean verify(String hostname, SSLSession session)
{
return true;
}  
 }
);
Alternatively you can call setHostnameVerifier on your URLConnection.
connection.setHostnameVerifier(
new HostnameVerifier() {
public boolean verify(String hostname, SSLSession session)
{
return true;
}  
 }
);

http://wiki.ihe.net/index.php/ATNA_FAQ#How_do_I_eliminate_exceptions_caused_by_Certificate_mismatches_with_the_server_host_name.3F

https://groups.google.com/d/msgid/edge-test-tool/068f7a3c-365b-4a30-bc86-d1a6eb794590%40googlegroups.com.

- Q: Does ETT has added the following accredited trust bundle into the testing system?

  - A: The public certificate and trust anchors used by TTP/ETT are available here: <https://ttpedge.sitenv.org/ttp/#/direct>

- Q: From what I understood from the documentation, for successful execution of the test procedures for 170.315(h)(1), the direct mail server does not require STARTTLS. Can your ensure that my understanding is correct?

  - A: Yes, the Direct transport does not make use of STARTTLS; while, the mail-based Edge protocols do use STARTTLS.

- Q: Where can ATLs download the latest release of the ETT for local installation? Today (September 28th) the NIST hosted tool (https://ttpedge.sitenv.org/ttp/#/home) and the release notes (https://ttpedge.sitenv.org/ttp/#/edge/releaseNotes) report the current version is 1.1.0.

The latest version of the JAR file found at the Bit Bucket downloads link is ett.1.0.19.jar (https://bitbucket.org/jperugini/ett/downloads?tab=downloads), which has a release date of June 24th, 3 months prior to the date of the current release.

    * A: The current release packages are available here:

https://github.com/siteadmin/ett/releases

- Q: Does the ETT require the same unique message ID when the message is sent to multiple recipients, or is it acceptable to have different message IDs for each recipient?

  - A: Message IDs must be unique.

## Helpful Items

- A good "cheat-sheet" resource for XD\* metadata is available at:
  <http://ihewiki.wustl.edu/wiki/index.php/Notes_on_XDS_Profile>.
- A helpful guide for navigating the XDR metadata. There are also example files in this directory:
  ftp://ftp.ihe.net/%20TF_Implementation_Material/ITI/examples/XDS.b/ (see ProvideAndRegisterDocument\*)

- Here are some examples for XDR:
  http://wiki.ihe.net/index.php/XDS.b_Implementation#Example_Provide_and_Register_Document_Set-b_transaction_.28with_full_metadata.29

ftp://ftp.ihe.net/TF_Implementation_Material/ITI/examples/XDS.b/
(Provide and register examples)

- Some examples for XDM:
  ftp://ftp.ihe.net/Connectathon/samples/XDM_samples/

A table showing the difference in optionality between the different XD\* metadata is available in Vol 3 of IHE ITI:
<http://www.ihe.net/uploadedFiles/Documents/ITI/IHE_ITI_TF_Vol3.pdf> See table " 4.3.1-3: Sending Actor Metadata Attribute Optionality" starting on page 109.

- Q: How do I check the SHA value of a message digest.

      * A: You can use the Linux command 'sha1sum': ...IHE_XDM/SUBSET01$ sha1sum DOCUMEN.XML

  986f71360224a1bec649d9e49e91e51bce29de07 DOCUMEN.XML
  An alternative, using a MS-Windows OS, right-click on the Document file and select 'Calculate Digest'. Selecting 'Properties' will also display the file size.

- Q: My system supports direct messaging and SMTP. Is there any information out there on how to add XDR and XDM support?

      * A: XDR is defined as ITI-41: Provide and Register Document Set-b.  This can be found in Section 3.41 in Vol 2 of the IHE ITI Technical Framework: <http://ihe.net/uploadedFiles/Documents/ITI/IHE_ITI_TF_Vol2b.pdf>

           XDM is defined as ITI-32: Distribute Document Set on Media.  This can be found in section 3.32 of the same document.

           A Google Group for implementators of these specifications can be found

  here: <https://groups.google.com/forum/#!forum/ihe-xds-implementors>.
