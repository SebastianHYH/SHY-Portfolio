/**
 * Central site configuration. Edit these values to update personal details
 * across the whole site — nothing else needs to change.
 */
export const site = {
  name: "Sebastian Hung Yansen",
  /** Short eyebrow label shown above the hero heading and under the sidebar name. */
  role: "Problem-solver · Computer Science",
  /** Availability status shown as a pill in the sidebar. Set to '' to hide it. */
  availability: "Open to opportunities",
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
  linkedinUrl: "https://www.linkedin.com/in/sebastian-hung-yansen-228157300/",

  /**
   * Only repositories tagged with this GitHub *topic* appear in the Projects
   * section. Add the topic to a repo and it shows up automatically on the next
   * build — no code changes needed.
   */
  projectsTopic: "portfolio",
} as const;
