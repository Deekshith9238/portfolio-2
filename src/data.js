export const profile = {
  name: 'Deekshith H U',
  role: 'Software Development Engineer at Pratishthan Ventures, Bengaluru',
  email: 'deekshith9238@gmail.com',
  github: 'https://github.com/Deekshith9238',
  linkedin: 'https://www.linkedin.com/in/deekshith-h-u',
  resume: '/Deekshith.pdf',
};

export const projects = [
  {
    title: 'Local MCP Router',
    summary:
      'Keeps simple coding prompts on a local Ollama model and sends hard reasoning to the cloud. Adds local RAG and compresses oversized IDE prompts, cutting cloud token use.',
    tech: ['Python', 'FastMCP', 'ChromaDB', 'Ollama'],
    link: 'https://github.com/Deekshith9238/local-ide-mcp',
    image: '/projects/mcp_router.webp',
  },
  {
    title: 'FindMyHelper',
    summary:
      'Connects people with local providers for home repairs, cleaning and maintenance, with real-time booking.',
    tech: ['React', 'Express', 'PostgreSQL'],
    link: 'https://github.com/Deekshith9238/fmh-2',
    image: '/projects/find_my_helper.webp',
  },
  {
    title: 'Vehicle Damage Detection',
    summary:
      'A CNN model that classifies vehicle damage from photos at 95% accuracy, built to automate the first pass of insurance assessments.',
    tech: ['Python', 'TensorFlow', 'OpenCV'],
    image: '/projects/vehicle_damage.webp',
  },
  {
    title: 'Anomaly User Detection',
    summary:
      'Compared ANN, DNN, KNN and Random Forest for real-time anomaly detection on IoT networks. The ANN led and is small enough for microcontrollers.',
    tech: ['Python', 'TensorFlow', 'Pandas'],
    note: 'Published May 2025',
    image: '/projects/anomaly_user.webp',
  },
];

export const experience = [
  {
    role: 'Software Development Engineer',
    company: 'Pratishthan Ventures',
    period: 'Aug 2025 – now',
    points: [
      'Leading the migration of the Data-Katalyst platform from a Django monolith to a React front end on Django REST Framework.',
      'Building an AI-driven learning platform for data engineering with automated evaluation and real-time feedback.',
    ],
  },
  {
    role: 'Software Development Intern',
    company: 'Pratishthan Ventures',
    period: 'Feb – Aug 2025',
    points: [
      'Built a RAG pipeline for querying financial documents in natural language.',
      'Turned raw financial metrics into interactive D3.js dashboards, and built the user management front end.',
    ],
  },
  {
    role: 'MCF Intern',
    company: 'Master Control Facility, ISRO',
    period: 'Sep 2024',
    points: [
      'Ran numerical analysis on spacecraft telemetry to find anomalies, and built a standalone tool to process and visualize it.',
    ],
  },
  {
    role: 'Experiential Learner',
    company: 'Employability.Life',
    period: 'May – Oct 2024',
    points: ['Set up Azure DevOps pipelines and worked with Docker for containerized deployments.'],
  },
];

export const skills = [
  { group: 'AI and LLMs', items: ['LangChain', 'LangGraph', 'Hugging Face', 'Ollama', 'ChromaDB', 'FastMCP', 'TensorFlow'] },
  { group: 'Web', items: ['React', 'Django REST Framework', 'Express', 'D3.js', 'Tailwind CSS', 'Figma'] },
  { group: 'Cloud', items: ['Google Cloud', 'AWS', 'Azure', 'Docker', 'Azure DevOps'] },
  { group: 'Languages', items: ['Python', 'JavaScript', 'Java', 'C++', 'C', 'SQL'] },
];

export const recognition = [
  { title: 'Most Promising Rookie Award', by: 'Pratishthan Ventures, for energy and dedication to the team' },
  { title: 'Best Outgoing Student, Gold Medal', by: 'Malnad College of Engineering', when: '2025' },
  { title: 'IndiaAI Fellowship', by: 'Awarded to 10 BTech students nationwide', when: '2024' },
  { title: 'Winner, Pratishthan Hackathon 2.0', by: 'Multi-agent system that maps SQL failures to the source code behind them' },
  { title: 'Runner-up, National Hackathon', by: 'Second place against teams from across India' },
  { title: 'Special Award, GroundRun 1.0', by: 'For a proposal on new applications of AI agents' },
];

export const certifications = [
  { title: 'Google Cloud Certified: Generative AI Leader' },
  { title: 'Google Cloud Technical Series: AI agents', when: '2026' },
  { title: 'Google UX Design Specialization', when: '2024' },
  { title: 'Meta Introduction to Front-End Development', when: '2023' },
];
