import { Fragment, useId } from 'react'
import type {
  GuideBlock,
  GuideDocument,
  GuideExample,
  GuideGroup,
  GuideText,
} from '../utils/quizGuide'
import { getGuidePlainText, getGuideSectionAnchors } from '../utils/quizGuide'

type QuizGuideProps = { document: GuideDocument }
type InlineTextProps = { content: GuideText }
type GuideContentProps = {
  blocks: readonly (GuideBlock | GuideGroup | GuideExample)[]
  imageBaseDirectory: string
}
type GuideGalleryProps = {
  gallery: Extract<GuideBlock, { type: 'gallery' }>
  imageBaseDirectory: string
}

function InlineText({ content }: InlineTextProps) {
  if (typeof content === 'string') return content
  return content.map((node, index) => {
    if (node.type === 'text')
      return <Fragment key={index}>{node.text}</Fragment>
    const Tag = node.type === 'strong' ? 'strong' : 'em'
    return (
      <Tag key={index}>
        <InlineText content={node.children} />
      </Tag>
    )
  })
}

function GuideGallery({ gallery, imageBaseDirectory }: GuideGalleryProps) {
  const isFeatured = gallery.layout === 'featured' && gallery.images.length > 1
  const gridImages = isFeatured ? gallery.images.slice(1) : gallery.images

  function renderImage(image: (typeof gallery.images)[number], index: number) {
    return (
      <figure key={index} className="min-w-0">
        <div className="flex h-36 items-center justify-center overflow-hidden rounded-xl border border-white/10 bg-slate-900/80 p-2 sm:h-44">
          <img
            src={`${imageBaseDirectory.replace(/\/$/, '')}/${image.fileName}`}
            alt={image.alt}
            loading="lazy"
            className="h-full w-full object-contain"
          />
        </div>
        {image.caption !== undefined && (
          <figcaption className="mt-1.5 text-center text-xs font-medium text-slate-500">
            <InlineText content={image.caption} />
          </figcaption>
        )}
      </figure>
    )
  }

  return (
    <div className="space-y-3">
      {isFeatured && renderImage(gallery.images[0], 0)}
      <div
        className={`grid grid-cols-1 gap-3 ${gridImages.length > 1 ? 'sm:grid-cols-2' : ''}`}
      >
        {gridImages.map(renderImage)}
      </div>
    </div>
  )
}

function GuideContent({ blocks, imageBaseDirectory }: GuideContentProps) {
  return blocks.map((block, index) => {
    switch (block.type) {
      case 'paragraph':
        return (
          <p key={index} className="text-sm leading-6 text-slate-300">
            <InlineText content={block.content} />
          </p>
        )
      case 'list':
        return (
          <ul key={index} className="space-y-3">
            {block.items.map((item, itemIndex) => (
              <li
                key={itemIndex}
                className="flex gap-3 text-sm leading-6 text-slate-300"
              >
                <span
                  aria-hidden="true"
                  className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-300"
                />
                <span>
                  <InlineText content={item} />
                </span>
              </li>
            ))}
          </ul>
        )
      case 'divider':
        return <hr key={index} className="border-white/10" />
      case 'comparison':
        return (
          <div
            key={index}
            className="overflow-x-auto rounded-xl border border-white/10 bg-white/[0.03]"
          >
            <table className="w-full text-left text-sm">
              <thead>
                <tr>
                  {block.headings.map((heading, column) => (
                    <th
                      key={column}
                      scope="col"
                      className="border-b border-white/10 px-4 py-3 font-bold text-white"
                    >
                      <InlineText content={heading} />
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {block.rows.map(([label, value], row) => (
                  <tr
                    key={row}
                    className="border-b border-white/10 last:border-b-0"
                  >
                    <th
                      scope="row"
                      className="w-28 px-4 py-3 align-top font-bold text-emerald-300"
                    >
                      <InlineText content={label} />
                    </th>
                    <td className="px-4 py-3 align-top text-slate-300">
                      <InlineText content={value} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )
      case 'callout':
        return (
          <aside
            key={index}
            className={`space-y-3 rounded-xl border px-4 py-3 ${block.tone === 'note' ? 'border-amber-300/20 bg-amber-300/[0.07] [&_p]:text-amber-100/90 [&_li]:text-amber-100/90 [&_strong]:text-amber-200' : 'border-rose-300/20 bg-rose-300/[0.06] [&_p]:text-rose-100 [&_li]:text-rose-100'}`}
          >
            <GuideContent
              blocks={block.blocks}
              imageBaseDirectory={imageBaseDirectory}
            />
          </aside>
        )
      case 'gallery':
        return (
          <GuideGallery
            key={index}
            gallery={block}
            imageBaseDirectory={imageBaseDirectory}
          />
        )
      case 'group':
      case 'example': {
        const Tag = block.type === 'group' ? 'h3' : 'h4'
        return (
          <section
            key={index}
            className={
              block.type === 'group'
                ? 'space-y-4 rounded-2xl border border-white/10 bg-white/[0.025] p-4 sm:p-5'
                : 'space-y-3 border-t border-white/10 pt-5 first:border-t-0 first:pt-0'
            }
          >
            <Tag
              className={
                block.type === 'group'
                  ? 'text-lg font-bold text-white'
                  : 'font-bold text-white'
              }
            >
              <InlineText content={block.title} />
            </Tag>
            <GuideContent
              blocks={block.blocks}
              imageBaseDirectory={imageBaseDirectory}
            />
          </section>
        )
      }
    }
  })
}

export default function QuizGuide({ document }: QuizGuideProps) {
  const instanceId = useId()
  const anchors = getGuideSectionAnchors(document.sections).map(
    (anchor) => `guide-${instanceId}-${anchor}`
  )
  return (
    <div className="pb-8">
      <div className="space-y-4">
        <GuideContent
          blocks={document.introduction}
          imageBaseDirectory={document.imageBaseDirectory}
        />
      </div>
      {document.sections.length > 0 && (
        <nav
          aria-label="Guide sections"
          className="mt-5 grid grid-cols-[repeat(auto-fit,minmax(min(100%,9rem),1fr))] gap-2"
        >
          {document.sections.map((section, index) => (
            <a
              key={anchors[index]}
              href={`#${anchors[index]}`}
              aria-label={getGuidePlainText(section.title)}
              className="rounded-lg border border-white/10 bg-white/[0.04] px-2 py-2 text-center text-xs font-bold text-slate-300 transition hover:border-emerald-300/30 hover:bg-emerald-400/10 hover:text-emerald-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300"
            >
              <InlineText content={section.title} />
            </a>
          ))}
        </nav>
      )}
      <div className="mt-8 space-y-10">
        {document.sections.map((section, index) => (
          <section
            key={anchors[index]}
            id={anchors[index]}
            className="scroll-mt-5 space-y-5"
          >
            <h2 className="text-xl font-black text-white">
              <InlineText content={section.title} />
            </h2>
            <GuideContent
              blocks={section.blocks}
              imageBaseDirectory={document.imageBaseDirectory}
            />
          </section>
        ))}
      </div>
    </div>
  )
}
