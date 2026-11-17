import { site } from '../data/site';
import { featured, otherTopics, include, exclude, describe } from '../data/projects';

export interface OtherProject {
  name: string;
  title: string;
  description: string;
  url: string;
  language: string;
  label: string;
  year: string;
}

interface GitHubRepo {
  name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  language: string | null;
  topics?: string[];
  fork: boolean;
  created_at: string;
}

const prettify = (name: string): string =>
  name
    .replace(/[-_]+/g, ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase())
    .trim();

async function fetchRepos(): Promise<GitHubRepo[]> {
  const headers: Record<string, string> = {
    Accept: 'application/vnd.github+json',
    'User-Agent': 'shy-portfolio-build',
    'X-GitHub-Api-Version': '2022-11-28',
  };
  const token = process.env.GITHUB_TOKEN;
  if (token) headers.Authorization = `Bearer ${token}`;

  try {
    const res = await fetch(
      `https://api.github.com/users/${site.github}/repos?per_page=100&sort=pushed`,
      { headers },
    );
    if (!res.ok) {
      console.warn(`[github] Could not list repos (${res.status} ${res.statusText}).`);
      return [];
    }
    return (await res.json()) as GitHubRepo[];
  } catch (err) {
    console.warn('[github] Fetch failed; "Other projects" will be empty:', err);
    return [];
  }
}

/** Repos for the compact "Other projects" list, newest first. */
export async function getOtherProjects(): Promise<OtherProject[]> {
  const repos = await fetchRepos();
  const featuredNames = new Set(featured.map((f) => f.repo));

  return repos
    .filter((r) => !r.fork && !featuredNames.has(r.name) && !exclude.includes(r.name))
    .map((r) => {
      const topic = otherTopics.find((t) => (r.topics ?? []).includes(t.topic));
      return { r, topic };
    })
    .filter(({ r, topic }) => topic || include.includes(r.name))
    .map(({ r, topic }) => {
      const o = describe[r.name] ?? {};
      return {
        name: r.name,
        title: o.title ?? prettify(r.name),
        description: o.description ?? r.description ?? '',
        url: r.homepage || r.html_url,
        language: r.language ?? '',
        label: o.label ?? topic?.label ?? '',
        year: r.created_at.slice(0, 4),
      };
    })
    .sort((a, b) => b.year.localeCompare(a.year) || a.title.localeCompare(b.title));
}
