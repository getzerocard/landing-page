import { client } from '@/sanity/lib/client'
import Image from 'next/image'
import { urlFor } from '@/sanity/lib/image'
import { PortableText } from '@portabletext/react'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'

async function getPost(slug: string) {
  const query = `*[_type == "post" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    publishedAt,
    body,
    mainImage,
    excerpt,
    author->{
      name,
      image,
      bio
    },
    categories[]->{
      title,
      slug
    }
  }`
  
  return await client.fetch(query, { slug })
}

async function getAllPostSlugs() {
  const query = `*[_type == "post"] {
    "slug": slug.current
  }`
  
  return await client.fetch(query)
}

export async function generateStaticParams() {
  const posts = await getAllPostSlugs()
  return posts.map((post: { slug: string }) => ({
    slug: post.slug,
  }))
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = await getPost(params.slug)

  if (!post) {
    return {
      title: 'Post Not Found',
    }
  }

  const imageUrl = post.mainImage 
    ? urlFor(post.mainImage).width(1200).height(630).url()
    : '/ogimage.png'

  return {
    title: `${post.title} | Zerocard Blog`,
    description: post.excerpt || `Read about ${post.title} on the Zerocard blog.`,
    openGraph: {
      title: post.title,
      description: post.excerpt || `Read about ${post.title} on the Zerocard blog.`,
      type: 'article',
      publishedTime: post.publishedAt,
      authors: post.author ? [post.author.name] : undefined,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt || `Read about ${post.title} on the Zerocard blog.`,
      images: [imageUrl],
    },
    alternates: {
      canonical: `/blog/${post.slug.current}`,
    },
  }
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = await getPost(params.slug)

  if (!post) {
    notFound()
  }

  const portableTextComponents = {
    types: {
      image: ({ value }: any) => {
        if (!value?.asset?._ref) {
          return null
        }
        return (
          <img
            src={urlFor(value).width(800).url()}
            alt={value.alt || ''}
            className="my-8 rounded-lg w-full max-w-2xl mx-auto object-cover"
            style={{ display: 'block' }}
          />
        )
      },
    },
    block: {
      h1: ({ children }: any) => <h1 className="b-heading-1">{children}</h1>,
      h2: ({ children }: any) => <h2 className="b-heading-2">{children}</h2>,
      h3: ({ children }: any) => <h3 className="b-heading-3">{children}</h3>,
      h4: ({ children }: any) => <h4 className="b-heading-4">{children}</h4>,
      blockquote: ({ children }: any) => (
        <blockquote className="b-blockquote">{children}</blockquote>
      ),
      normal: ({ children }: any) => {
        if (Array.isArray(children) && children.length === 1 && children[0] === '') {
          return <p className="b-body"><br /></p>
        }
        return <p className="b-body">{children}</p>
      },
    },
    marks: {
      link: ({ children, value }: any) => {
        const rel = !value.href.startsWith('/') ? 'noreferrer noopener' : undefined
        return (
          <a href={value.href} rel={rel} className="b-link">
            {children}
          </a>
        )
      },
      strong: ({ children }: any) => <strong className="font-bold">{children}</strong>,
      em: ({ children }: any) => <em className="italic">{children}</em>,
      code: ({ children }: any) => (
        <code className="b-code">{children}</code>
      ),
    },
    list: {
      bullet: ({ children }: any) => <ul className="b-u-list">{children}</ul>,
      number: ({ children }: any) => <ol className="b-o-list">{children}</ol>,
    },
    listItem: {
      bullet: ({ children }: any) => <li className="b-li">{children}</li>,
      number: ({ children }: any) => <li className="b-li">{children}</li>,
    },
  }

  // Structured data for SEO
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt || post.title,
    image: post.mainImage ? urlFor(post.mainImage).width(1200).height(630).url() : undefined,
    datePublished: post.publishedAt,
    dateModified: post.publishedAt,
    author: post.author ? {
      '@type': 'Person',
      name: post.author.name,
      image: post.author.image ? urlFor(post.author.image).width(200).height(200).url() : undefined,
    } : undefined,
    publisher: {
      '@type': 'Organization',
      name: 'Zerocard',
      logo: {
        '@type': 'ImageObject',
        url: 'https://getzerocard.xyz/assets/images/logo.svg',
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://getzerocard.xyz/blog/${post.slug.current}`,
    },
  }

  return (
    <>
      {/* Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      
      <div className="min-h-screen bg-[var(--background)]">
        {/* Progress Bar Section */}
      <div className="fixed top-0 left-0 right-0 bg-[var(--background)] z-50 flex-col justify-center flex">
        <div className="w-full">
          <div className="my-2">
            <Link 
              href="/blog"
              className="px-2 flex items-center text-[var(--text-button-disabled)] gap-1 text-sm leading-6 font-medium h-9 hover:text-[var(--text-body)] group w-fit"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path 
                  className="opacity-50 group-hover:opacity-100" 
                  d="M10.25 6.75L4.75 12L10.25 17.25M19.25 12H5" 
                  stroke="var(--foreground)" 
                  strokeWidth="1.5" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                />
              </svg>
              Back to blog
            </Link>
          </div>
          <div className="w-full h-[2px] bg-[#272727]">
            <div className="h-full bg-[var(--neon-green)]" style={{ width: '0%' }}></div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="c-main" id="post-page">
        {/* Hero Section */}
        <div className="c-hero !pt-48 max-sm:!pt-28" style={{ maxWidth: 'var(--section-max-width)', margin: '0 auto' }} id="post-hero-el">
          <div className="max-w-screen-lg mx-auto text-center relative">
            {/* Date and Category */}
            <div className="mb-3">
              <p className="inline-code flex items-center justify-center gap-4 uppercase max-sm:!font-normal">
                {post.publishedAt && (
                  <span>
                    {new Date(post.publishedAt).toLocaleDateString('en-US', {
                      month: 'long',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                  </span>
                )}
                {post.categories && post.categories.length > 0 && (
                  <>
                    <span className="divider block w-2 h-2 aspect-square rounded-full bg-[var(--border-strong)]"></span>
                    <span className="text-[var(--text-block-water-2)]">{post.categories[0].title}</span>
                  </>
                )}
              </p>
            </div>

            {/* Title */}
            <h1 className="heading-1 max-sm:leading-7 max-sm:text-2xl">
              {post.title}
            </h1>

            {/* Author - Centered */}
            {post.author && (
              <ul className="flex gap-4 mt-7 max-sm:mt-6 justify-center">
                <li className="flex items-center gap-2 max-sm:gap-4">
                  {post.author.image && (
                    <Image
                      src={urlFor(post.author.image).width(32).height(32).url()}
                      alt={post.author.name}
                      width={32}
                      height={32}
                      className="h-8 w-8 max-sm:w-6 max-sm:h-6 aspect-square rounded-full object-cover select-none"
                    />
                  )}
                  <p className="text-base max-sm:text-xs leading-6 text-[var(--text-secondary)] neon-highlight whitespace-nowrap">
                    {post.author.name}
                  </p>
                </li>
              </ul>
            )}
          </div>

          {/* Hero Image */}
          {post.mainImage && (
            <div className="mt-20 max-sm:mt-6 max-w-4xl mx-auto">
              <Image
                src={urlFor(post.mainImage).width(1200).height(675).url()}
                alt={post.mainImage.alt || post.title}
                width={1200}
                height={675}
                className="post-image w-full object-cover rounded-[var(--radius-lg)] select-none"
                priority
              />
            </div>
          )}
        </div>

        {/* Content Section */}
        <section className="page-section z-10 sticky top-0 !py-16" id="post-content">
          <div className="page-section-content">
            <div className="post-content w-full max-w-4xl mx-auto px-4">
              <PortableText value={post.body} components={portableTextComponents} />
            </div>
          </div>
        </section>
      </main>
    </div>
    </>
  )
}
