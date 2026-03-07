import { defineCollection, z } from 'astro:content';

const projects = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    subtitle: z.string().optional(),
    tech: z.array(z.string()).optional(),
    link: z.string().optional(),
    github: z.string().optional(),
    order: z.number().optional(),
    featured: z.boolean().optional().default(false),
    image: z.string().optional(),
    type: z.string().optional(),
    starsBadge: z.string().optional(),
    forksBadge: z.string().optional(),
  }),
});

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    tags: z.array(z.string()).optional(),
    draft: z.boolean().optional().default(false),
  }),
});

const work = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    company: z.string(),
    position: z.string(),
    startDate: z.coerce.date(),
    endDate: z.coerce.date().optional(),
    current: z.boolean().optional().default(false),
    order: z.number().optional(),
    companyLogo: z.string().optional(),
    companyWeb: z.string().optional(),
    playstoreUrl: z.string().optional(),
  }),
});

export const collections = { projects, blog, work };
