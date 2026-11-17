/**
 * Projects.
 *
 * `featured` is curated by hand and fully static: it never depends on GitHub
 * topics, so a missing tag can't hide your best work.
 *
 * The "Other projects" list is built from GitHub at build time: any public,
 * non-fork repo tagged with one of `otherTopics`, plus anything in `include`,
 * minus featured repos and anything in `exclude`. Use `describe` to fix titles
 * or descriptions without touching GitHub.
 */

export interface Featured {
  /** Exact GitHub repo name. */
  repo: string;
  title: string;
  /** What it is, in one sentence. */
  summary: string;
  /** What you did / what was interesting / the result. */
  detail: string;
  stack: string[];
  /** Path under /public. Leave empty to show a "screenshot needed" tile. */
  image?: string;
  demo?: string;
  paper?: string;
}

export const featured: Featured[] = [
  {
    repo: 'RescuePlanSearcher',
    title: 'Rescue Plan Searcher',
    summary: "A solver for the 'Rescue Plan' puzzle toy.",
    detail:
      'Models every board position as a node in a state-space graph and searches ' +
      'it with BFS and DFS, then compares the two on path optimality versus speed. ' +
      'Written up as a paper for Algorithm Strategies.',
    stack: ['Java', 'Graph search'],
    image: 'files/img/rescueplan.webp',
    paper:
      'https://informatika.stei.itb.ac.id/~rinaldi.munir/Stmik/2024-2025/Makalah2025/Makalah-IF2211-Strategi-Algoritma-2025%20(178).pdf',
  },
  {
    repo: 'drift',
    title: 'Drift',
    summary: 'An anonymous, ephemeral letter platform for reaching out to strangers.',
    detail:
      '[Placeholder] How it works, what you built (stack, hardest part), and ' +
      'whether people use it.',
    stack: ['TypeScript'],
    image: 'files/img/drift.svg',
  },
  {
    repo: 'Quaternion-Visualizer',
    title: 'Quaternion Visualizer',
    summary: 'An app that shows what quaternion rotations actually do to a 3D object.',
    detail:
      '[Placeholder] What you can do in it, and what made it tricky (e.g. ' +
      'interpolation, gimbal lock comparison, rendering).',
    stack: ['Python'],
    image: 'files/img/quaternion.webp',
  },
  {
    repo: 'Spark-Tools',
    title: 'Spark Tools',
    summary: 'A command-line viewer for Fortnite Festival songs.',
    detail:
      'Fetches and modifies MIDI data and album artwork for each track. ' +
      '[Placeholder] Who uses it, or what you learned building it.',
    stack: ['Go', 'CLI', 'MIDI'],
    image: 'files/img/sparktools.webp',
  },
];

/** GitHub topics that put a repo in "Other projects", with the label shown. */
export const otherTopics = [
  { topic: 'portfolio', label: 'Personal' },
  { topic: 'assignment', label: 'Coursework' },
] as const;

/** Untagged repos to list anyway. */
export const include: string[] = ['QuadtreeImageCompression'];

/** Tagged repos to hide. */
export const exclude: string[] = [];

export const describe: Record<string, { title?: string; description?: string; label?: string }> = {
  QuadtreeImageCompression: {
    title: 'Quadtree Image Compression',
    description: 'Compresses images by recursively splitting them into a quadtree.',
    label: 'Coursework',
  },
  'IoT-Dashboard': {
    title: 'IoT Dashboard',
    description: 'A dashboard for monitoring sleeping patients with IoT sensors.',
  },
  IQPuzzlerSolver: { title: 'IQ Puzzler Solver' },
  'toptext-bottomtext-meme-gen': { title: 'Top Text Bottom Text', description: 'A meme generator.' },
  PlanPal: { description: 'An event planner.' },
  'linear-algebra-calculator': { description: 'A linear algebra calculator.' },
  'pocket-owca-monsters': { description: 'A monster-collecting game.' },
  'camel-pop': { title: 'Camel Pop', description: 'The board game Camel Up!, implemented in GNU Prolog.' },
};
