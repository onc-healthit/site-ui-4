import { TestCaseFields } from './TestCasePanel'

const hostingTestCases: TestCaseFields[] = [
  { code: '', name: '--No testcase selected--' },
  {
    code: 'H1_DNS_AB_Normal',
    name: 'H1 - Normal address-bound certificate search in DNS',
    Binding_Type: 'ADDRESS',
    Location_Type: 'DNS',
    Negative: 'false',
    Optional: 'false',
    Description:
      "This test case verifies that your system's DNS can host and return the expected address-bound X.509 certificate.",
    RTM_Sections: '1, 3',
    RFC_4398: 'Section 2.1',
    Direct_SHT: 'Section 5.3',
    Instructions:
      "Enter a Direct address corresponding to an address-bound X.509 certificate that is hosted by your system's DNS and then click Submit. DCDT will attempt to discover the certificate and display the result on the screen.",
  },
  {
    code: 'H2_DNS_DB_Normal',
    name: 'H2 - Normal domain-bound certificate search in DNS',
    Binding_Type: 'DOMAIN',
    Location_Type: 'DNS',
    Negative: 'false',
    Optional: 'false',
    Description:
      "This test case verifies that your system's DNS can host and return the expected domain-bound X.509 certificate.",
    RTM_Sections: '1, 3',
    RFC_4398: 'Section 2.1',
    Direct_SHT: 'Section 5.3',
    Instructions:
      "Enter a Direct address corresponding to a domain-bound X.509 certificate that is hosted by your system's DNS and then click Submit. DCDT will attempt to discover the certificate and display the result on the screen.",
  },
  {
    code: 'H3_LDAP_AB_Normal',
    name: 'H3 - Normal address-bound certificate search in LDAP',
    Binding_Type: 'ADDRESS',
    Location_Type: 'LDAP',
    Negative: 'false',
    Optional: 'false',
    Description:
      "This test case verifies that your system's LDAP server can host and return the expected address-bound X.509 certificate.",
    RTM_Sections: '2, 3, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 19, 20, 21, 22',
    RFC_2798: 'Section 9.1.2',
    Instructions:
      "Enter a Direct address corresponding to an address-bound X.509 certificate that is hosted by your system's LDAP server and then click Submit. DCDT will attempt to discover the certificate and display the result on the screen.",
  },
  {
    code: 'H4_LDAP_DB_Normal',
    name: 'H4 - Normal domain-bound certificate search in LDAP',
    Binding_Type: 'DOMAIN',
    Location_Type: 'LDAP',
    Negative: 'false',
    Optional: 'false',
    Description:
      "This test case verifies that your system's LDAP server can host and return the expected domain-bound X.509 certificate.",
    RTM_Sections: '2, 3, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 19, 20, 21, 22',
    RFC_2798: 'Section 9.1.2',
    Instructions:
      "Enter a Direct address corresponding to a domain-bound X.509 certificate that is hosted by your system's LDAP server and then click Submit. DCDT will attempt to discover the certificate and display the result on the screen.",
  },
]

export default hostingTestCases
