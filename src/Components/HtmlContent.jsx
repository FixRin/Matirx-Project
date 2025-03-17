import DOMPurify from "dompurify"

function HtmlContent({ html }) {
  const sanitizedHtml = DOMPurify.sanitize(html)

  return <div dangerouslySetInnerHTML={{ __html: sanitizedHtml }} />
}

export default HtmlContent
