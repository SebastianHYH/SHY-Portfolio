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
  /** Display label for the matched topic (e.g. "Assignment"); '' if none. */
  category: string;
}

export interface Language {
  name: string;
  color: string;
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

/** Brand colors for the languages likely to appear (GitHub's linguist palette). */
const LANG_COLORS: Record<string, string> = {
  TypeScript: '#3178c6',
  JavaScript: '#f1e05a',
  Python: '#3572A5',
  Java: '#b07219',
  'C++': '#f34b7d',
  C: '#888888',
  'C#': '#178600',
  Go: '#00ADD8',
  Rust: '#dea584',
  Prolog: '#74283c',
  'Jupyter Notebook': '#DA5B0B',
  HTML: '#e34c26',
  CSS: '#563d7c',
  Shell: '#89e051',
  Dart: '#00B4AB',
  Kotlin: '#A97BFF',
  Ruby: '#701516',
  PHP: '#4F5D95',
};

const prettify = (name: string): string =>
  name
    .replace(/[-_]+/g, ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase())
    .trim();

/**
 * Finds the first configured topic a repo matches, returning its label and the
 * config index (used for grouping). Index is large when nothing matches so such
 * repos sort last.
 */
function categoryFor(topics: string[]): { label: string; index: number } {
  const match = site.projectTopics.findIndex((t) => topics.includes(t.topic));
  return match === -1
    ? { label: '', index: site.projectTopics.length }
    : { label: site.projectTopics[match].label, index: match };
}

/** Resolves a single topic name to its configured label (or a prettified one). */
function labelForTopic(topic: string): string {
  return site.projectTopics.find((t) => t.topic === topic)?.label ?? prettify(topic);
}

/**
 * Fetches the user's public repos once and memoizes the result, so multiple
 * consumers (projects, languages) don't each hit the API during a build.
 */
let repoCache: Promise<GitHubRepo[]> | null = null;

function fetchRepos(): Promise<GitHubRepo[]> {
  if (repoCache) return repoCache;

  const token = process.env.GITHUB_TOKEN;
  const headers: Record<string, string> = {
    Accept: 'application/vnd.github+json',
    'User-Agent': 'shy-portfolio-build',
    'X-GitHub-Api-Version': '2022-11-28',
  };
  if (token) headers.Authorization = `Bearer ${token}`;

  repoCache = (async () => {
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
        return [];
      }
      return (await res.json()) as GitHubRepo[];
    } catch (err) {
      console.warn('[github] Fetch failed, rendering with overrides only:', err);
      return [];
    }
  })();

  return repoCache;
}

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
    // An override `topic` wins (handy for local previews); otherwise derive the
    // badge from the repo's real GitHub topics.
    category: o.topic ? labelForTopic(o.topic) : categoryFor(r.topics ?? []).label,
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
  const repos = await fetchRepos();
  const featuredTopics = site.projectTopics.map((t) => t.topic);

  const tagged = repos.filter(
    (r) => !r.fork && (r.topics ?? []).some((t) => featuredTopics.includes(t)),
  );

  // Fallback so the first deploy (before any repo is tagged) is not empty.
  let chosen = tagged;
  if (chosen.length === 0) {
    chosen = repos.filter((r) => overrides[r.name]);
    if (chosen.length) {
      console.warn(
        `[github] No repos tagged with [${featuredTopics.join(', ')}] yet — showing ` +
          `${chosen.length} curated fallback project(s). Tag repos with a topic to ` +
          'control this list.',
      );
    }
  }

  const catRank = (p: Project) => {
    const i = site.projectTopics.findIndex((t) => t.label === p.category);
    return i === -1 ? site.projectTopics.length : i;
  };

  return chosen
    .map(toProject)
    .sort((a, b) => {
      // Group by category (config order), then curated order, stars, recency.
      if (catRank(a) !== catRank(b)) return catRank(a) - catRank(b);
      const oa = overrides[a.name]?.order ?? 999;
      const ob = overrides[b.name]?.order ?? 999;
      if (oa !== ob) return oa - ob;
      if (b.stars !== a.stars) return b.stars - a.stars;
      return b.updatedAt.localeCompare(a.updatedAt);
    });
}

/**
 * Aggregates the most-used languages across all non-fork repos, at build time.
 * Powers the "Tech I use" list in the sidebar — stays accurate automatically.
 */
export async function getLanguages(limit = 6): Promise<Language[]> {
  const repos = await fetchRepos();

  const counts = new Map<string, number>();
  for (const r of repos) {
    if (r.fork || !r.language) continue;
    counts.set(r.language, (counts.get(r.language) ?? 0) + 1);
  }

  return [...counts.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, limit)
    .map(([name]) => ({ name, color: LANG_COLORS[name] ?? 'var(--teal-deep)' }));
}
