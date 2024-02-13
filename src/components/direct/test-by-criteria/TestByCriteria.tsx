'use client'
import * as React from 'react'
import BannerBox from '@shared/BannerBox'
import B1Component from './B1Tab'
import H1Component from './H1Tab'
import H2Component from './H2Tab'
import Link from 'next/link'
import styles from '@shared/styles.module.css'
import TabsComponent, { TabInputs } from '../shared/TabsComponent'
export interface criteriaProps {
  selectedTab: string
}

const TestByCriteria = ({ selectedTab }: criteriaProps) => {
  const criteriaTabs: TabInputs[] = [
    { tabName: 'B1', tabIndex: 0, tabPanel: <B1Component /> },
    { tabName: 'H1', tabIndex: 1, tabPanel: <H1Component /> },
    { tabName: 'H2', tabIndex: 2, tabPanel: <H2Component /> },
  ]

  return (
    <>
      {/* Global Header */}
      <BannerBox
        breadcrumbs={[
          <Link color="inherit" href="/direct" key="1" className={styles.link}>
            Direct
          </Link>,
          <Link color="inherit" href="/direct/testbycriteria" key="2" className={styles.link}>
            Test By Criteria
          </Link>,
        ]}
        heading={'Test By Criteria'}
        description={<>New Helper Text</>}
      />
      <TabsComponent selectedTab={selectedTab} tabs={criteriaTabs} />
    </>
  )
}

export default TestByCriteria
