import { ReactNode } from 'react';

export interface BlogHeroImage {
  src: string;
  srcSet?: string;
  sizes?: string;
  alt: string;
  width: number;
  height: number;
  credit?: string;
}

export interface BlogHeroVideo {
  src: string;
  poster?: string;
  type?: string;
}

export interface BlogFaq {
  q: string;
  a: string;
}

export interface BlogTrustStat {
  value: string;
  label: string;
}

export interface BlogRegistryEntry {
  slug: string;
  title: string;
  pageTitle: string;
  metaDesc: string;
  excerpt: string;
  category: string;
  readingTime: string;
  publishDate: string;
  publishDateFormatted: string;
  heroImage: BlogHeroImage;
  path: string;
}

export interface BlogTemplateProps {
  slug: string;
  pageTitle: string;
  metaDesc: string;
  ogDesc: string;
  ogImage: string;
  publishDate: string;
  modifiedDate: string;
  publishDateFormatted: string;
  modifiedDateFormatted?: string;
  keywords: string;

  category: string;
  readingTime: string;
  articleTitle: ReactNode;
  intro: ReactNode;

  heroImage: BlogHeroImage;
  heroVideo?: BlogHeroVideo;

  aboveFoldSecondaryText?: string;
  aboveFoldSecondaryHref?: string;

  featuredSnippet?: {
    primary: string;
    secondary: string;
  };

  toc: string[];
  children: (onOpenContact: () => void) => ReactNode;
  conclusion?: ReactNode;

  faqs: BlogFaq[];

  authorBio?: string;
  authorTags?: string[];

  trustStats?: BlogTrustStat[];
}
