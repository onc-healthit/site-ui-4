// Add 'use client' at the top if using Next.js 13
'use client'

import React, { useState, useEffect } from 'react'
import MarkdownPage from '@/components/local-install'

const LocalInstallMarkdown: React.FC = () => {
  const [markdownContent, setMarkdownContent] = useState<string>('')

  useEffect(() => {
    fetch('/markdown/local-installation-dev.md')
      .then((response) => response.text())
      .then((data) => setMarkdownContent(data))
      .catch((error) => console.error('Error fetching Markdown:', error))
  }, [])

  return <MarkdownPage content={markdownContent} />
}

const LocalInstallHome: React.FC = () => {
  return <LocalInstallMarkdown />
}

export default LocalInstallHome
