import DOMPurify from 'dompurify'
import { marked } from 'marked'

const parseAndSanitizeMarkdown = async (markdownContent: string) => {
  const parsedContent = await marked(markdownContent)
  const config = {
    ALLOWED_TAGS: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'br', 'strong', 'em', 'a', 'ul', 'ol', 'li', 'code'],
    ALLOWED_ATTRS: {
      a: ['href', 'target'],
    },
  }
  return DOMPurify.sanitize(parsedContent, config)
}

export const fetchSanitizedMarkdownData = async (markdownURL: string): Promise<string | undefined> => {
  const githubMarkdownResult: Response = await fetch(markdownURL)
  const githubMarkdownData: string = await githubMarkdownResult.text()
  const finalModalContent: string = await parseAndSanitizeMarkdown(githubMarkdownData)
  return finalModalContent
}
