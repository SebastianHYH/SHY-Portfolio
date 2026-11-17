export interface Paper {
  date: string;
  title: string;
  summary: string;
  url: string;
  /** Course the paper was written for. */
  course: string;
}

const base = 'https://informatika.stei.itb.ac.id/~rinaldi.munir';

export const papers: Paper[] = [
  {
    date: 'Jun 2025',
    title: 'Use of BFS and DFS Algorithms for Solving the Rescue Plan Puzzle Toy',
    summary:
      'Models a physical puzzle as a state-space graph and compares BFS and DFS ' +
      'on path optimality versus execution speed.',
    url: `${base}/Stmik/2024-2025/Makalah2025/Makalah-IF2211-Strategi-Algoritma-2025%20(178).pdf`,
    course: 'Algorithm Strategies',
  },
  {
    date: 'Jan 2025',
    title: "Use of Dijkstra's Algorithm for NextBot Navigation in Source Engine Games",
    summary:
      "Implements Dijkstra's algorithm over navigation meshes in Garry's Mod so AI " +
      'entities can find shortest paths through dynamic 3D environments.',
    url: `${base}/Matdis/2024-2025/Makalah/Makalah-IF1220-Matdis-2024%20(164).pdf`,
    course: 'Discrete Mathematics',
  },
  {
    date: 'Jan 2025',
    title: 'Use of Singular Value Decomposition for Signature Verification in WarioWare Gold',
    summary:
      'A Python signature verifier that decomposes signatures into principal ' +
      'components with SVD, tuned for numerical stability on limited hardware.',
    url: `${base}/AljabarGeometri/2024-2025/Makalah/Makalah-IF2123-Algeo-2024%20(161).pdf`,
    course: 'Linear Algebra and Geometry',
  },
];
