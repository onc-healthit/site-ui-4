import Link from "next/link"
import styles from '../page.module.css'
import './WelcomeText.css'
import CardList from './CardList';
import React from 'react';
import Card from "./Card";

export default function ArchivedHome() {

  const cards = [
    { header: 'Cures Update', subtext: 'HL7® CDA R2 Implementation Guide: C-CDA Templates for Clinical Notes R2.1 Companion Guide, Release 2-US Realm, Oct 2021 (with errata)', link: 'https://www.figma.com/exit?url=https%3A%2F%2Fwww.hl7.org%2Fdocumentcenter%2Fpublic%2Fstandards%2Fdstu%2FCDAR2_IG_CCDA2.1_COMPANION_R2_STU1_2019OCT_2021OCTwithErrata.zip'},
    { header: 'Cures Update', subtext: 'HL7® CDA R2 Implementation Guide: C-CDA Templates for Clinical Notes R2.1 Companion Guide, Release 2-US Realm, Oct 2021 (with errata)', link: 'https://www.figma.com/exit?url=https%3A%2F%2Fwww.hl7.org%2Fdocumentcenter%2Fpublic%2Fstandards%2Fdstu%2FCDAR2_IG_CCDA2.1_COMPANION_R2_STU1_2019OCT_2021OCTwithErrata.zip'},
    { header: 'USCDI V2', subtext: 'HL7® CDA R2 Implementation Guide: C-CDA Templates for Clinical Notes R2.1 Companion Guide, Release 2-US Realm, Oct 2021 (with errata)', link: 'https://www.figma.com/file/PIVBcpFNsNOcWdmuRw66IQ/SITE-Design-System?type=design&node-id=1184-48972&mode=design&t=o7uUAj33T7yFhdmH-4'},
  ];
  return (
    <main className={styles.main}>
        <div className="frame-44">
          <div className="group-44">
            <div className="sub-frame-44">
              <div className="welcome-header-text">
                Archived tools, files and other additional content
              </div>
              <div className="rectangle-44">

              </div>
            </div>
            <div className="welcome-header-subtext">
            Welcome to the Frequently Asked Questions (FAQ) section of the SITE website. Here, we've compiled a comprehensive list of common queries and inquiries to provide you with quick and informative answers to your most pressing questions about SITE. Whether you're a new visitor exploring our platform or a long-time user seeking clarification, this FAQ section aims to simplify your experience and provide valuable insights into SITE's features and functionalities.
            </div>
          </div>
        </div>
        
        <div className="card-list-wrapper">
        <CardList cards={cards} />
        </div>
        
    </main>
    
    
    )
}


