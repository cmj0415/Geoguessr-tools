import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { findSeoPage, SEO_CONFIG } from '../utils/seo'

type ManagedElement = HTMLMetaElement | HTMLLinkElement | HTMLTitleElement

const MANAGED_METADATA_KEYS = [
  'description',
  'canonical',
  'og:type',
  'og:site_name',
  'og:title',
  'og:description',
  'og:url',
  'og:image',
  'twitter:card',
  'twitter:title',
  'twitter:description',
  'twitter:image',
  'robots',
]

function getManagedElement(key: string) {
  return document.head.querySelector<ManagedElement>(
    `[data-seo="${key}"]`
  )
}

function removeManagedElement(key: string) {
  getManagedElement(key)?.remove()
}

function updateTitle(title: string) {
  let titleElement = getManagedElement('title')

  if (!(titleElement instanceof HTMLTitleElement)) {
    titleElement = document.createElement('title')
    titleElement.dataset.seo = 'title'
    document.head.append(titleElement)
  }

  titleElement.textContent = title
}

function updateMeta(
  key: string,
  attribute: 'name' | 'property',
  attributeValue: string,
  content: string
) {
  let metaElement = getManagedElement(key)

  if (!(metaElement instanceof HTMLMetaElement)) {
    metaElement = document.createElement('meta')
    metaElement.dataset.seo = key
    document.head.append(metaElement)
  }

  metaElement.removeAttribute(attribute === 'name' ? 'property' : 'name')
  metaElement.setAttribute(attribute, attributeValue)
  metaElement.content = content
}

function updateCanonical(href: string) {
  let canonicalElement = getManagedElement('canonical')

  if (!(canonicalElement instanceof HTMLLinkElement)) {
    canonicalElement = document.createElement('link')
    canonicalElement.dataset.seo = 'canonical'
    document.head.append(canonicalElement)
  }

  canonicalElement.rel = 'canonical'
  canonicalElement.href = href
}

export default function PageMetadata() {
  const { pathname } = useLocation()

  useEffect(() => {
    const page = findSeoPage(pathname)

    if (!page) {
      updateTitle(`Page Not Found | ${SEO_CONFIG.siteName}`)
      MANAGED_METADATA_KEYS.forEach(removeManagedElement)
      updateMeta('robots', 'name', 'robots', 'noindex')
      return
    }

    const canonicalUrl = `${SEO_CONFIG.siteUrl}${page.path}`
    const socialImageUrl = `${SEO_CONFIG.siteUrl}${SEO_CONFIG.socialImage}`

    removeManagedElement('robots')
    updateTitle(page.title)
    updateMeta('description', 'name', 'description', page.description)
    updateCanonical(canonicalUrl)
    updateMeta('og:type', 'property', 'og:type', 'website')
    updateMeta('og:site_name', 'property', 'og:site_name', SEO_CONFIG.siteName)
    updateMeta('og:title', 'property', 'og:title', page.title)
    updateMeta(
      'og:description',
      'property',
      'og:description',
      page.description
    )
    updateMeta('og:url', 'property', 'og:url', canonicalUrl)
    updateMeta('og:image', 'property', 'og:image', socialImageUrl)
    updateMeta('twitter:card', 'name', 'twitter:card', 'summary_large_image')
    updateMeta('twitter:title', 'name', 'twitter:title', page.title)
    updateMeta(
      'twitter:description',
      'name',
      'twitter:description',
      page.description
    )
    updateMeta('twitter:image', 'name', 'twitter:image', socialImageUrl)
  }, [pathname])

  return null
}
