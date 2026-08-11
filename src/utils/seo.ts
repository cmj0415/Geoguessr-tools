import seoPages from './seoPages.json'

export type SeoPage = {
  path: string
  title: string
  description: string
}

export type SeoConfig = {
  siteName: string
  siteUrl: string
  socialImage: string
  pages: SeoPage[]
}

export const SEO_CONFIG: SeoConfig = seoPages

export function normalizeSeoPath(pathname: string) {
  if (pathname === '/') return pathname
  return pathname.replace(/\/+$/, '')
}

export function findSeoPage(pathname: string) {
  const normalizedPath = normalizeSeoPath(pathname)
  return SEO_CONFIG.pages.find((page) => page.path === normalizedPath)
}
