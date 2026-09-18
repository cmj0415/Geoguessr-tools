export type GuideInline =
  | { readonly type: 'text'; readonly text: string }
  | {
      readonly type: 'strong' | 'emphasis'
      readonly children: readonly GuideInline[]
    }

export type GuideText = string | readonly GuideInline[]

export type GuideImage = {
  readonly fileName: string
  readonly alt: string
  readonly caption?: GuideText
}

export type GuideParagraph = {
  readonly type: 'paragraph'
  readonly content: GuideText
}

export type GuideList = {
  readonly type: 'list'
  readonly items: readonly GuideText[]
}

export type GuideBlock =
  | GuideParagraph
  | GuideList
  | { readonly type: 'divider' }
  | {
      readonly type: 'comparison'
      readonly headings: readonly [GuideText, GuideText]
      readonly rows: readonly (readonly [GuideText, GuideText])[]
    }
  | {
      readonly type: 'callout'
      readonly tone: 'note' | 'warning'
      readonly blocks: readonly (GuideParagraph | GuideList)[]
    }
  | {
      readonly type: 'gallery'
      readonly layout: 'equal' | 'featured'
      readonly images: readonly [GuideImage, ...GuideImage[]]
    }

export type GuideExample = {
  readonly type: 'example'
  readonly title: GuideText
  readonly blocks: readonly GuideBlock[]
}

export type GuideGroup = {
  readonly type: 'group'
  readonly title: GuideText
  readonly blocks: readonly (GuideBlock | GuideExample)[]
}

export type GuideSection = {
  readonly title: GuideText
  readonly blocks: readonly (GuideBlock | GuideGroup)[]
}

export type GuideDocument = {
  readonly imageBaseDirectory: string
  readonly introduction: readonly GuideBlock[]
  readonly sections: readonly GuideSection[]
}

export function getGuidePlainText(content: GuideText): string {
  if (typeof content === 'string') return content
  return content
    .map((node) =>
      node.type === 'text' ? node.text : getGuidePlainText(node.children)
    )
    .join('')
}

export function getGuideImages(document: GuideDocument): GuideImage[] {
  function collectImages(
    blocks: readonly (GuideBlock | GuideGroup | GuideExample)[]
  ): GuideImage[] {
    return blocks.flatMap((block) => {
      if (block.type === 'gallery') return [...block.images]
      if (
        block.type === 'group' ||
        block.type === 'example' ||
        block.type === 'callout'
      )
        return collectImages(block.blocks)
      return []
    })
  }

  return collectImages([
    ...document.introduction,
    ...document.sections.flatMap((section) => section.blocks),
  ])
}

export function getGuideSectionAnchors(sections: readonly GuideSection[]) {
  const usedAnchors = new Set<string>()
  return sections.map((section) => {
    const base =
      getGuidePlainText(section.title)
        .normalize('NFKC')
        .toLowerCase()
        .replace(/[^\p{L}\p{N}]+/gu, '-')
        .replace(/^-+|-+$/g, '') || 'section'
    let anchor = base
    let suffix = 2
    while (usedAnchors.has(anchor)) anchor = `${base}-${suffix++}`
    usedAnchors.add(anchor)
    return anchor
  })
}
