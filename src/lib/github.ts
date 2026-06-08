import { site } from '../data/site';
import { overrides } from '../data/overrides';
import { withBase } from './util';

export interface Project {
  name: string;
  title: string;
  description: string;
  /** Primary link for the card (homepage if set, else repo). */
  url: string;
  repoUrl: string;
  homepage: string;
  language: string;
  stars: number;
  topics: string[];
  image: string;
  updatedAt: string;
}

interface GitHubRepo {
  name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  language: string | null;
  stargazers_count: number;
  topics?: string[];
  fork: boolean;
  pushed_at: string;
  updated_at: string;
}

const prettify = (name: string): string =>
  name
    .replace(/[-_]+/g, ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase())
    .trim();

function toProject(r: GitHubRepo): Project {
  const o = overrides[r.name] ?? {};
  return {
    name: r.name,
    title: o.title ?? prettify(r.name),
    description: o.description ?? r.description ?? 'No description provided.',
    url: o.url ?? r.homepage ?? r.html_url,
    repoUrl: r.html_url,
    homepage: r.homepage ?? '',
    language: r.language ?? '',
    stars: r.stargazers_count ?? 0,
    topics: r.topics ?? [],
    image: o.image
      ? withBase(o.image)
      : `https://opengraph.githubassets.com/1/${site.github}/${r.name}`,
    updatedAt: r.pushed_at ?? r.updated_at ?? '',
  };
}

/**
 * Fetches the projects to feature, at build time.
 *
 * Source of truth: repositories tagged with the `projectsTopic` GitHub topic.
 * If none are tagged yet (initial setup), it falls back to any repo that has a
 * curated entry in overrides.ts so the site is never empty.
 */
export async function getProjects(): Promise<Project[]> {
  const token = process.env.GITHUB_TOKEN;
  const headers: Record<string, string> = {
    Accept: 'application/vnd.github+json',
    'User-Agent': 'shy-portfolio-build',
    'X-GitHub-Api-Version': '2022-11-28',
  };
  if (token) headers.Authorization = `Bearer ${token}`;

  let repos: GitHubRepo[] = [];
  try {
    const res = await fetch(
      `https://api.github.com/users/${site.github}/repos?per_page=100&sort=pushed`,
      { headers },
    );
    if (!res.ok) {
      console.warn(
        `[github] Could not list repos (${res.status} ${res.statusText}). ` +
          'Rendering with overrides only.',
      );
    } else {
      repos = (await res.json()) as GitHubRepo[];
    }
  } catch (err) {
    console.warn('[github] Fetch failed, rendering with overrides only:', err);
  }

  const tagged = repos.filter(
    (r) => !r.fork && (r.topics ?? []).includes(site.projectsTopic),
  );

  // Fallback so the first deploy (before any repo is tagged) is not empty.
  let chosen = tagged;
  if (chosen.length === 0) {
    chosen = repos.filter((r) => overrides[r.name]);
    if (chosen.length) {
      console.warn(
        `[github] No repos tagged "${site.projectsTopic}" yet — showing ${chosen.length} ` +
          'curated fallback project(s). Tag repos with the topic to control this list.',
      );
    }
  }

  return chosen
    .map(toProject)
    .sort((a, b) => {
      const oa = overrides[a.name]?.order ?? 999;
      const ob = overrides[b.name]?.order ?? 999;
      if (oa !== ob) return oa - ob;
      if (b.stars !== a.stars) return b.stars - a.stars;
      return b.updatedAt.localeCompare(a.updatedAt);
    });
}
