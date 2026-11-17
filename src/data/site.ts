/**
 * Central site configuration. Edit these values to update personal details
 * across the whole site.
 *
 * Anything starting with "[Placeholder]" still needs real copy.
 */
export const site = {
  name: 'Sebastian Hung Yansen',

  /** One line under the name: who you are, plainly. */
  headline: 'Computer Science student at Institut Teknologi Bandung.',

  /** Two sentences max: what you build and what you care about. */
  intro:
    'I build solvers, visualisers and small tools, and I help keep the ' +
    "faculty's systems running as a sysadmin assistant.",

  /** Short status shown with a dot under the intro. Set to '' to hide it. */
  availability: 'Open to internships for 2027',

  /** About section, one string per paragraph. */
  about: [
    "I've been studying Computer Science at Institut Teknologi Bandung since 2023. " +
      'The work I enjoy most turns a messy problem into a clean model: a puzzle ' +
      'toy into a state-space graph, a game AI into a shortest-path problem, a ' +
      'signature into its singular values.',
    "Outside coursework I'm a sysadmin assistant at STEI ITB, where I manage the " +
      "school's Google Workspace accounts and mailing lists and set up machines, " +
      'servers and networks for lab sessions.',
    "I'm also a musician where I mainly play the clarinet for orchestras or shows including ISO, Parchestra, UPI Symphonic Band, and more.",
    // '[Placeholder] One or two sentences on what you want to work on next.',
  ],

  email: 'contact@sebastianhy.dev',

  /** Path (relative to /public) of the downloadable CV. */
  cv: 'files/CV_SebastianHY.pdf',

  /** Canonical URL of the deployed site. */
  url: 'https://sebastianhy.dev/',

  github: 'SebastianHYH',
  githubUrl: 'https://github.com/SebastianHYH',
  linkedinUrl: 'https://www.linkedin.com/in/sebastianhy/',

  /**
   * Pages in the top bar. `enabled`: true = always shown, 'dev' = only in
   * `npm run dev` (handy while a section has nothing published yet),
   * false = hidden. The links only appear when at least two pages are shown.
   */
  pages: [
    { href: '/', label: 'Home', enabled: true },
    { href: '/writing/', label: 'Writing', enabled: 'dev' },
    { href: '/play/', label: 'Playground', enabled: false },
  ],
} as const;

export const isPlaceholder = (text: string) => text.startsWith('[Placeholder]');
