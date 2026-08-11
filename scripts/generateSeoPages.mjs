import { mkdir, readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const SCRIPT_DIRECTORY = path.dirname(fileURLToPath(import.meta.url))
const PROJECT_DIRECTORY = path.resolve(SCRIPT_DIRECTORY, '..')
const DIST_DIRECTORY = path.join(PROJECT_DIRECTORY, 'dist')
const SEO_CONFIG_PATH = path.join(
  PROJECT_DIRECTORY,
  'src/utils/seoPages.json'
)
const INDEX_PATH = path.join(DIST_DIRECTORY, 'index.html')
const SEO_START_MARKER = '<!-- seo:start -->'
const SEO_END_MARKER = '<!-- seo:end -->'

function escapeHtml(value) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;')
}

function validateConfig(config) {
  if (
    !config ||
    typeof config.siteName !== 'string' ||
    typeof config.siteUrl !== 'string' ||
    typeof config.socialImage !== 'string' ||
    !Array.isArray(config.pages)
  ) {
    throw new Error('The SEO configuration has an invalid top-level shape.')
  }

  const paths = new Set()

  for (const page of config.pages) {
    if (
      !page ||
      typeof page.path !== 'string' ||
      typeof page.title !== 'string' ||
      typeof page.description !== 'string'
    ) {
      throw new Error('Every SEO page needs a path, title, and description.')
    }

    if (
      !page.path.startsWith('/') ||
      page.path.includes('..') ||
      page.path.includes('?') ||
      page.path.includes('#') ||
      (page.path !== '/' && page.path.endsWith('/'))
    ) {
      throw new Error(`Unsafe or non-canonical SEO path: ${page.path}`)
    }

    if (paths.has(page.path)) {
      throw new Error(`Duplicate SEO path: ${page.path}`)
    }

    paths.add(page.path)
  }

  if (!paths.has('/')) {
    throw new Error('The SEO configuration must include the root page.')
  }
}

function createMetadataBlock(config, page) {
  if (!page) {
    return `${SEO_START_MARKER}
    <title data-seo="title">Page Not Found | ${escapeHtml(config.siteName)}</title>
    <meta data-seo="robots" name="robots" content="noindex" />
    ${SEO_END_MARKER}`
  }

  const canonicalUrl = `${config.siteUrl}${page.path}`
  const socialImageUrl = `${config.siteUrl}${config.socialImage}`
  const title = escapeHtml(page.title)
  const description = escapeHtml(page.description)

  return `${SEO_START_MARKER}
    <title data-seo="title">${title}</title>
    <meta data-seo="description" name="description" content="${description}" />
    <link data-seo="canonical" rel="canonical" href="${escapeHtml(canonicalUrl)}" />
    <meta data-seo="og:type" property="og:type" content="website" />
    <meta data-seo="og:site_name" property="og:site_name" content="${escapeHtml(config.siteName)}" />
    <meta data-seo="og:title" property="og:title" content="${title}" />
    <meta data-seo="og:description" property="og:description" content="${description}" />
    <meta data-seo="og:url" property="og:url" content="${escapeHtml(canonicalUrl)}" />
    <meta data-seo="og:image" property="og:image" content="${escapeHtml(socialImageUrl)}" />
    <meta data-seo="twitter:card" name="twitter:card" content="summary_large_image" />
    <meta data-seo="twitter:title" name="twitter:title" content="${title}" />
    <meta data-seo="twitter:description" name="twitter:description" content="${description}" />
    <meta data-seo="twitter:image" name="twitter:image" content="${escapeHtml(socialImageUrl)}" />
    ${SEO_END_MARKER}`
}

function replaceMetadataBlock(html, metadataBlock) {
  const startIndex = html.indexOf(SEO_START_MARKER)
  const endIndex = html.indexOf(SEO_END_MARKER)

  if (startIndex === -1 || endIndex === -1 || endIndex < startIndex) {
    throw new Error('The built index is missing its SEO metadata markers.')
  }

  if (
    html.indexOf(SEO_START_MARKER, startIndex + SEO_START_MARKER.length) !== -1 ||
    html.indexOf(SEO_END_MARKER, endIndex + SEO_END_MARKER.length) !== -1
  ) {
    throw new Error('The built index contains duplicate SEO metadata markers.')
  }

  return `${html.slice(0, startIndex)}${metadataBlock}${html.slice(
    endIndex + SEO_END_MARKER.length
  )}`
}

function getOutputPath(routePath) {
  if (routePath === '/') return INDEX_PATH

  const relativePath = routePath.slice(1)
  return path.join(DIST_DIRECTORY, `${relativePath}.html`)
}

function createSitemap(config) {
  const urls = config.pages
    .map(
      (page) => `  <url>
    <loc>${escapeHtml(`${config.siteUrl}${page.path}`)}</loc>
  </url>`
    )
    .join('\n')

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`
}

const config = JSON.parse(await readFile(SEO_CONFIG_PATH, 'utf8'))
validateConfig(config)

const indexTemplate = await readFile(INDEX_PATH, 'utf8')

for (const page of config.pages) {
  const outputPath = getOutputPath(page.path)
  const outputHtml = replaceMetadataBlock(
    indexTemplate,
    createMetadataBlock(config, page)
  )

  await mkdir(path.dirname(outputPath), { recursive: true })
  await writeFile(outputPath, outputHtml)
}

const notFoundHtml = replaceMetadataBlock(
  indexTemplate,
  createMetadataBlock(config)
)
await writeFile(path.join(DIST_DIRECTORY, '404.html'), notFoundHtml)
await writeFile(
  path.join(DIST_DIRECTORY, 'sitemap.xml'),
  createSitemap(config)
)
