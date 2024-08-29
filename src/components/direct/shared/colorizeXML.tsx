import React from 'react'
import Typography from '@mui/material/Typography'

const colorizeXML = (xmlString: string) => {
  const tagColor = 'purple'
  const attributeNameColor = 'lightgreen'
  const attributeValueColor = 'blue'
  const tagBracketColor = 'grey'
  const namespacePrefixColor = 'pink'
  const namespaceColor = 'darkgreen'

  const escapeHtml = (unsafe: string) => {
    return unsafe
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;')
  }

  const regex = /(<\/?)([\w:]+)|(\w+:\w+)=["']([^"']*)["']|(\w+)=["']([^"']*)["']/g

  return xmlString
    .split('\n')
    .map((line) => {
      const leadingSpaces = line.match(/^(\s+)/)
      const leadingSpaceHtml = leadingSpaces ? leadingSpaces[0].replace(/ /g, '&nbsp;') : ''
      return leadingSpaceHtml + line.trimStart()
    })
    .join('\n')
    .replace(regex, (match, bracket, tag, attrName, attrValue, plainAttrName, plainAttrValue) => {
      if (tag) {
        const parts = tag.split(':')
        const bracketHtml = `<span style="color: ${tagBracketColor};">${escapeHtml(bracket)}</span>`
        if (parts.length > 1) {
          const prefixHtml = `<span style="color: ${namespacePrefixColor};">${escapeHtml(parts[0])}:</span>`
          const tagHtml = `<span style="color: ${tagColor};">${escapeHtml(parts[1])}</span>`
          return `${bracketHtml}${prefixHtml}${tagHtml}`
        }
        return `${bracketHtml}<span style="color: ${tagColor};">${escapeHtml(tag)}</span>`
      } else if (attrName && attrValue !== undefined) {
        const attrParts = attrName.split(':')
        if (attrParts.length > 1) {
          return `<span style="color: ${attributeNameColor};">${escapeHtml(attrParts[0])}:</span><span style="color: ${namespaceColor};">${escapeHtml(attrParts[1])}</span>=<span style="color: ${tagBracketColor};">"</span><span style="color: ${attributeValueColor};">${escapeHtml(attrValue)}</span><span style="color: ${tagBracketColor};">"</span>`
        }
      } else if (plainAttrName && plainAttrValue !== undefined) {
        return `<span style="color: ${attributeNameColor};">${escapeHtml(plainAttrName)}</span>=<span style="color: ${tagBracketColor};">"</span><span style="color: ${attributeValueColor};">${escapeHtml(plainAttrValue)}</span><span style="color: ${tagBracketColor};">"</span>`
      }
      return escapeHtml(match)
    })
    .replace(/&lt;/g, `<span style="color: ${tagBracketColor};">&lt;</span>`)
    .replace(/&gt;/g, `<span style="color: ${tagBracketColor};">&gt;</span>`)
}

interface XMLDisplayProps {
  xmlContent: string
}

const XMLDisplay: React.FC<XMLDisplayProps> = ({ xmlContent }) => {
  return (
    <Typography
      component="pre"
      variant="body1"
      style={{ whiteSpace: 'pre-wrap', fontFamily: 'monospace', fontSize: '1em' }}
      dangerouslySetInnerHTML={{ __html: colorizeXML(xmlContent) }}
    />
  )
}

export default XMLDisplay
