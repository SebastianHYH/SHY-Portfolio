/**
 * Experience, education and awards, taken from the CV. Newest first within
 * each group; edit freely.
 */

export interface Role {
  title: string;
  period: string;
}

export interface Entry {
  /** Shown in the date column, e.g. "Aug 2025 – Present". */
  period: string;
  org: string;
  /** Single role. Use `roles` instead when you've held several in one place. */
  role?: string;
  roles?: Role[];
  /** Plain-language description; one or two sentences. */
  summary: string;
  tags?: string[];
  /** Volunteering only: shown without expanding "Show more". */
  highlight?: boolean;
}

export const work: Entry[] = [
  {
    period: 'Aug 2025 – Present',
    role: 'SysAdmin Assistant',
    org: 'STEI ITB',
    summary:
      "Manage the school's Google Workspace and mailing lists, including account " +
      'creation, removal and password security for students, lecturers and staff. ' +
      'Set up computers, servers and networks for lab sessions and maintenance.',
    tags: ['Google Workspace', 'Linux', 'Networking'],
  },
];

export const organizations: Entry[] = [
  {
    period: 'Sep 2024 – Present',
    org: 'ITB Student Orchestra',
    roles: [
      { title: 'Music Director', period: 'Dec 2025 – Present' },
      { title: 'Head of Kinship', period: 'Sep 2025 – Present' },
      { title: 'Managerial Staff', period: 'Sep 2024 – Sep 2025' },
      { title: 'Head of Winds and Brass', period: 'Nov 2024 – Feb 2025' },
    ],
    summary:
      "Help direct the orchestra's performances and run the weekly practice and " +
      'bonding activities that keep members together. Previously led the woodwind ' +
      'and brass section, and handled client communication, the portfolio and the ' +
      'rate card.',
    tags: ['Leadership', 'Clarinet', 'Cello'],
  },
  {
    period: 'Jul 2025 – Present',
    org: 'HMIF ITB (Informatics Student Association)',
    roles: [{ title: 'Household Staff', period: 'Sep 2025 – Present' }],
    summary: "Keep the association's secretariat room clean, comfortable and usable for members.",
  },
  {
    period: 'Jun 2024 – Present',
    org: 'KMK ITB (Catholic Student Association)',
    roles: [
      { title: 'Staff of Appreciation', period: 'Jun 2025 – Present' },
      { title: 'Staff of Prayer and Liturgy', period: 'Jun 2024 – Jun 2025' },
    ],
    summary:
      'Organise events and gifts that thank members and staff of other divisions. ' +
      'Previously supported prayer and liturgy activities.',
  },
];

export const volunteering: Entry[] = [
  {
    period: 'Jun – Aug 2025',
    role: 'Human Resources',
    org: 'Sekolah Mentor KAT ITB 2025',
    summary:
      'Ran recruitment and selection for mentor candidates, then monitored and ' +
      'evaluated them through training.',
    tags: ['Recruitment'],
    highlight: true,
  },
  {
    period: 'May – Sep 2025',
    role: 'Field committee, medical',
    org: 'SPARTA HMIF ITB 2024',
    summary: "Kept a multi-day orientation event running safely and treated participants' injuries.",
  },
  {
    period: 'Apr 2025 – Present',
    role: 'Treasurer',
    org: 'ISO Annual Concert 2025: Realm of the Enchanted Sea',
    summary: "Manage the concert's budget and cash flow across every division.",
    tags: ['Budgeting'],
    highlight: true,
  },
  {
    period: 'Sep 2024 – May 2025',
    role: 'Treasurer',
    org: 'Penerimaan Anggota Baru ISO 2024',
    summary: "Managed the budget and cash flow for the orchestra's new-member intake.",
  },
  {
    period: 'Sep 2024 – Jan 2025',
    role: 'Field committee',
    org: 'Wisuda Oktober HMIF 2024',
    summary: "Coordinated HMIF's 'Arak-Arakan' graduation parade.",
  },
  {
    period: 'Sep 2024',
    role: 'Mentor',
    org: 'OSKM ITB 2024',
    summary: 'Mentored new ITB students through orientation and student life.',
  },
  {
    period: 'Aug – Sep 2024',
    role: 'Mentor',
    org: 'Syukuran Keluarga Bersama KMK 2024',
    summary: 'Mentored new Catholic students and introduced them to KMK.',
  },
  {
    period: 'Jun 2024 – Feb 2025',
    role: 'Fundraising Staff',
    org: 'ISO Annual Concert 2024: Mono no Aware de Symphonia',
    summary:
      'Raised funds through merchandise, food and drink sales and booth rentals, ' +
      'working with marketing, design and vendors on the merchandise.',
  },
  {
    period: 'May – Jul 2024',
    role: 'Event Staff',
    org: 'IMPACT 5.0',
    summary:
      'Planned and ran a maths, physics and computing competition, from the opening ' +
      'through to the closing ceremony.',
  },
  {
    period: 'Jan – Mar 2024',
    role: 'Field committee and participant',
    org: 'GST Festival 23',
    summary:
      "Wrote the code and story flow for our group's visual novel, and helped run " +
      'the event floor.',
    tags: ['Game dev'],
    highlight: true,
  },
  {
    period: 'Jan – Feb 2024',
    role: 'Field committee and player',
    org: 'GIG! 14: Jazzmosphere',
    summary: 'Medical field committee, and played jazz clarinet.',
  },
  {
    period: 'Nov 2023 – Feb 2024',
    role: 'Leader, manager and performer',
    org: 'The Twilight Serenade: Tomorrow Be Ours',
    summary:
      'Led the team organising a mini concert, and performed classical and ' +
      'non-classical pieces on clarinet and cello.',
  },
  {
    period: 'Oct 2023 – Apr 2024',
    role: 'E-Sport Division Staff',
    org: 'TPB CUP 2023',
    summary:
      'Ran match operations for a multi-day Valorant tournament: pre-match checks, ' +
      'in-game refereeing and live commentary.',
    tags: ['Esports'],
    highlight: true,
  },
  {
    period: 'Sep – Dec 2023',
    role: 'Publication and Documentation Staff',
    org: 'STEIKOOL 2023',
    summary:
      'Documented a student teaching visit to a local school and publicised it on ' +
      'Instagram, TikTok and X.',
  },
  {
    period: 'Sep 2023',
    role: 'Streaming Division Staff',
    org: 'STEIK CUP 2023',
    summary:
      'Ran the technical side of the esports tournament broadcast and coordinated ' +
      'live commentators.',
  },
];

export const education = {
  school: 'Institut Teknologi Bandung',
  degree: 'BS in Computer Science',
  period: '2023 – Present',
  gpa: '3.45 / 4.0',
  courses: [
    'Data Structures and Algorithms',
    'Algorithm Strategies',
    'Operating Systems',
    'Computer Networks',
    'Database Systems',
    'Parallel and Distributed Systems',
    'Software Engineering',
    'Artificial Intelligence',
    'Machine Learning',
    'Web-based Development',
  ],
};

export interface Award {
  date: string;
  title: string;
  detail: string;
}

export const awards: Award[] = [
  {
    date: 'Sep 2025',
    title: 'National finalist, Informatics Festival 2025 hackathon',
    detail: 'Organised by IFEST UNPAD, on using AI across disciplines.',
  },
  {
    date: 'Apr 2025',
    title: 'National finalist, ProtoTech Contest',
    detail: 'Prototype innovation competition for healthcare, organised by IEEE ITB Student Branch.',
  },
];
