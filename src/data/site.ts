/**
 * Central site configuration. Edit these values to update personal details
 * across the whole site — nothing else needs to change.
 */
export const site = {
  name: "Sebastian Hung Yansen",
  /** Short eyebrow label shown above the hero heading and under the sidebar name. */
  role: "Problem-solver · Computer Science · Informatics Engineering",
  /** Availability status shown as a pill in the sidebar. Set to '' to hide it. */
  availability: "Working",
  tagline:
    "A highly motivated individual with a strong passion for problem-solving and " +
    "computational thinking. Seeking to contribute to innovative projects and further " +
    "develop skills in the field of computer science.",

  email: "sebastianhung25@gmail.com",
  phone: "+62 821-1654-8958",
  phoneHref: "tel:+6282116548958",

  /** Path (relative to /public) of the downloadable CV. */
  cv: "files/CV_SebastianHY.pdf",

  /** Canonical URL of the deployed site. */
  url: "https://sebastianhyh.github.io/SHY-Portfolio/",

  github: "SebastianHYH",
  githubUrl: "https://github.com/SebastianHYH",
  linkedinUrl: "https://www.linkedin.com/in/sebastianhy/",

  /**
   * Repositories tagged with any of these GitHub *topics* are featured in the
   * Projects section. Each topic maps to a `label` shown as a badge on the card.
   * Add a topic to a repo on GitHub and it appears on the next build — no code
   * changes needed. A repo matching several topics uses the first one listed
   * here (so order them by priority). GitHub topics must be lowercase/hyphenated.
   */
  projectTopics: [
    { topic: "portfolio", label: "Project" },
    { topic: "assignment", label: "Assignment" },
  ],
} as const;
