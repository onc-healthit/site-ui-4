'use client'
import React, { useState, useEffect } from 'react'
import { GetStaticProps } from 'next'
import { Container, Box, Fab } from '@mui/material'
// MUI Imports
import BannerBox from '@/components/shared/BannerBox'
// Global Imports
import Link from 'next/link'
import ReactMarkdown from 'react-markdown'
import rehypeRaw from 'rehype-raw'
import remarkGfm from 'remark-gfm'
import palette from '@/styles/palette'

interface Props {
  content: string
}

const MarkdownPage: React.FC<Props> = ({ content }) => {
  const [showScrollButton, setShowScrollButton] = useState(false)

  const markdownStyles = {
    lineHeight: 1.6,
    pre: {
      fontSize: '1.2em',
      backgroundColor: palette.greyLight,
      border: `1px solid ${palette.greyDark}`,
      borderRadius: '8px',
      padding: '16px 16px',
      fontFamily: 'monospace',
    },
    '& h1': {
      color: palette.primary,
      fontSize: '2em',
    },
    '& h2': {
      color: palette.primary,
      fontSize: '1.5em',
    },
    '& h3': {
      color: palette.primary,
      fontSize: '1.3em',
    },
    '& h4': {
      color: palette.primary,
      fontSize: '1.1em',
    },
    '& p': {
      margin: '1em 0',
    },
    '& a': {
      color: 'blue',
      textDecoration: 'underline',
    },
    // Add more styles as needed
  }
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY
      const windowHeight = window.innerHeight
      const documentHeight = document.body.scrollHeight

      if (scrollTop > windowHeight / 2) {
        setShowScrollButton(true)
      } else {
        setShowScrollButton(false)
      }
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }
  return (
    <Box>
      {/* Global Header */}
      <BannerBox
        breadcrumbs={
          <Link color={palette.secondary} href={'/local-install'}>
            Local Installation Guide
          </Link>
        }
        heading={'Local Installation Guide'}
        description={
          <>
            This guide provides step-by-step instructions for creating a local installation of the Edge Testing Tool. To
            implement this, you&apos;ll need to set up a minimum of three servers to accommodate the various components
            of the tool&apos;s architecture. Each server will host specific components to ensure efficient performance
            and scalability. Follow the detailed steps below to configure your servers and successfully deploy the Edge
            Testing Tool in your local environment.
          </>
        }
      />
      <Container>
        <Box mt={4} mb={8}>
          <Box sx={markdownStyles}>
            <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
              {content}
            </ReactMarkdown>
          </Box>
        </Box>
        {/* Back to Top Button */}
        {showScrollButton && (
          <Fab
            variant="extended"
            aria-label="scroll-to-top"
            sx={{
              position: 'fixed',
              bottom: '220px',
              right: '5%',
              opacity: 0.8,
              color: palette.primary,
              border: `1px solid ${palette.primary}`,
              transition: 'opacity 0.3s ease',
              '&:hover': {
                opacity: 1,
              },
            }}
            onClick={scrollToTop}
          >
            Back to top {'  '}↑
          </Fab>
        )}
      </Container>
    </Box>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const filePath = path.join(process.cwd(), '/markdown/local-installation-dev.md')
  const markdown = fs.readFileSync(filePath, 'utf-8')

  return {
    props: {
      content: markdown,
    },
  }
}

export default MarkdownPage
