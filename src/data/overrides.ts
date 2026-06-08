/**
 * Optional per-repository overrides, keyed by the exact GitHub repo name.
 *
 * Everything here is optional — repos render fine with just their GitHub
 * metadata. Use this only to polish a specific project: a nicer title, a
 * hand-written description, a custom thumbnail, or a fixed display order.
 *
 * Images are paths relative to /public (use the optimized WebP files in
 * files/img/). When no `image` is given, the repo's GitHub social-preview
 * image is used automatically.
 */
export interface Override {
  title?: string;
  description?: string;
  /** Path under /public, e.g. "files/img/foo.webp", or an absolute URL. */
  image?: string;
  /** Override the card's primary link (defaults to homepage, else repo URL). */
  url?: string;
  /** Lower numbers sort first. Untagged repos sort after by stars/recency. */
  order?: number;
}

export const overrides: Record<string, Override> = {
  RescuePlanSearcher: {
    title: 'Rescue Plan Searcher',
    description: "A solver for the 'Rescue Plan' board game.",
    image: 'files/img/rescueplan.webp',
    order: 1,
  },
  'Spark-Tools': {
    title: 'Spark Tools',
    description: 'Scripts that fetch and modify MIDI data and album artwork.',
    image: 'files/img/sparktools.webp',
    order: 2,
  },
  'IoT-Dashboard': {
    title: 'IoT Dashboard',
    description: 'A simple IoT-based dashboard to monitor sleeping patients.',
    image: 'files/img/iotdashboard.webp',
    order: 3,
  },
  QuadtreeImageCompression: {
    title: 'Quadtree Image Compression',
    description: 'A tool that uses quadtrees to compress images.',
    image: 'files/img/imagecompression.webp',
    order: 4,
  },
};
