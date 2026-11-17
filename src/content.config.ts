import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

/**
 * Blog posts: one Markdown file per post in src/content/writing/.
 * The file name becomes the URL: rescue-plan.md -> /writing/rescue-plan/
 */
const writing = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/writing' }),
  schema: z.object({
    title: z.string(),
    /** One sentence, shown in the post list and in link previews. */
    description: z.string(),
    date: z.coerce.date(),
    updated: z.coerce.date().optional(),
    tags: z.array(z.string()).default([]),
    /** Drafts show up in `npm run dev` but are left out of the built site. */
    draft: z.boolean().default(false),
    /** Optional links shown under the title. */
    paper: z.url().optional(),
    repo: z.url().optional(),
  }),
});

export const collections = { writing };
