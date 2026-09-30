import { SampleResume } from '../types';

export const SAMPLE_RESUMES: SampleResume[] = [
  {
    id: 'sample-fullstack',
    name: 'Alex Morgan',
    email: 'alex.morgan.dev@example.com',
    role: 'Senior Full-Stack Engineer',
    level: 'senior',
    fileName: 'Alex_Morgan_Senior_Software_Engineer_Resume.txt',
    keywords: 'React, TypeScript, Node.js, Next.js, PostgreSQL, Docker, AWS, Microservices, CI/CD',
    content: `ALEX MORGAN
San Francisco, CA | alex.morgan.dev@example.com | github.com/alexmorgan | linkedin.com/in/alexmorgan

SUMMARY
Lead Full-Stack Software Engineer with 7+ years of experience designing high-throughput distributed systems, scalable microservices, and reactive web applications. Spearheaded cloud migrations cutting latency by 42% and infrastructure costs by $180,000 annually.

TECHNICAL SKILLS
Languages: TypeScript, JavaScript, Python, Go, SQL, HTML5, CSS3
Frameworks & Libraries: React, Next.js, Node.js, Express, Tailwind CSS, GraphQL, Redux Toolkit
Cloud & DevOps: AWS (ECS, Lambda, S3, RDS), Docker, Kubernetes, Terraform, GitHub Actions
Databases: PostgreSQL, Redis, MongoDB, DynamoDB
Architecture: Microservices, Event-Driven Architecture, REST APIs, System Design, CI/CD

PROFESSIONAL EXPERIENCE

Senior Full-Stack Engineer | NexusCloud Technologies
January 2022 - Present | San Francisco, CA
- Architected enterprise multi-tenant analytics dashboard serving 120,000+ daily active users, maintaining 99.98% uptime.
- Engineered high-concurrency Node.js microservices processing 15,000 webhooks per minute with Redis caching layer.
- Reduced API payload sizes by 58% and frontend bundle size by 35% through dynamic code-splitting and asset optimization.
- Mentored a cohort of 6 junior and mid-level software engineers, conducting rigorous bi-weekly code reviews.

Full-Stack Developer | Apex Software Labs
June 2018 - December 2021 | Austin, TX
- Developed custom React and TypeScript client portals, increasing user checkout conversion by 23%.
- Spearheaded PostgreSQL query indexing and data normalization, cutting query execution times from 4.2s to 180ms.
- Implemented robust automated test suites with Jest and Playwright, achieving 91% code coverage across core repositories.

EDUCATION
B.S. in Computer Science | University of California, Berkeley (2018)
Dean's Honor List | Capstone: Distributed Consensus Engine`
  },
  {
    id: 'sample-pm',
    name: 'Sarah Chen',
    email: 'sarah.chen.product@example.com',
    role: 'Lead Product Manager',
    level: 'lead',
    fileName: 'Sarah_Chen_Lead_Product_Manager_Resume.txt',
    keywords: 'Product Strategy, Roadmap, PLG, SaaS Metrics, Agile, User Research, SQL, A/B Testing',
    content: `SARAH CHEN
New York, NY | sarah.chen.product@example.com | linkedin.com/in/sarahchen-pm

EXECUTIVE PROFILE
Data-driven Lead Product Manager with 8+ years guiding cross-functional teams from discovery to launch in B2B SaaS. Proven track record driving $14M in ARR growth, optimizing onboarding activation rates (+34%), and establishing product-led growth (PLG) frameworks.

CORE COMPETENCIES
- Product Strategy, Discovery & Multi-Quarter Roadmaps
- Metrics: ARR, MRR, CAC, LTV, Retention, Churn Analysis, Net Promoter Score (NPS)
- Quantitative & Qualitative User Research, Persona Modeling, Usability Testing
- Technical Fluency: SQL, Python data analysis, Mixpanel, Amplitude, Segment, Jira, Figma

EXPERIENCE

Lead Product Manager | Omniverse SaaS
March 2021 - Present | New York, NY
- Directed 3 cross-functional squads (18 engineers, 3 designers) building next-generation workflow automation suite.
- Unlocked $6.2M in Net New ARR in Year 1 by launching an AI-powered data connector marketplace.
- Executed 24+ structured A/B experimentation cycles, increasing trial-to-paid conversion from 4.1% to 7.8%.
- Partnered directly with Chief Revenue Officer to structure enterprise pricing tiers, boosting average deal size by 28%.

Senior Product Manager | Veloce Systems
August 2017 - February 2021 | Boston, MA
- Spearheaded mobile enterprise application revamp resulting in a 4.8-star App Store rating with 450k+ downloads.
- Conducted 80+ customer discovery interviews with Fortune 500 IT directors to prioritize roadmap backlog.

EDUCATION
B.A. in Economics & Cognitive Science | Columbia University (2017)`
  },
  {
    id: 'sample-datascience',
    name: 'Dr. David Kim',
    email: 'david.kim.ai@example.com',
    role: 'Senior AI & ML Research Engineer',
    level: 'senior',
    fileName: 'David_Kim_Senior_AI_ML_Engineer_Resume.txt',
    keywords: 'Python, PyTorch, LLMs, NLP, RAG, Transformers, LangChain, Vector Databases, AWS SageMaker',
    content: `DAVID KIM, Ph.D.
Seattle, WA | david.kim.ai@example.com | github.com/davidkim-ai | google-scholar.org/davidkim

SUMMARY
Machine Learning and Artificial Intelligence Research Engineer with Ph.D. in Computer Science and 6+ years deploying deep learning, Large Language Models (LLMs), and semantic retrieval (RAG) pipelines into mission-critical production environments.

CORE EXPERTISE
- Generative AI & LLMs: Transformer architectures, Fine-Tuning (LoRA/QLoRA), RAG pipelines, Prompt Engineering
- ML Frameworks: PyTorch, TensorFlow, Hugging Face, vLLM, DeepSpeed, Ray
- Vector Search & Storage: Milvus, Pinecone, Qdrant, ChromaDB, FAISS
- Cloud & Infrastructure: AWS SageMaker, GCP Vertex AI, Triton Inference Server, Kubernetes, Docker

PROFESSIONAL EXPERIENCE

Senior ML Research Engineer | Cortex Labs AI
September 2021 - Present | Seattle, WA
- Engineered enterprise RAG solution with hybrid sparse-dense embedding retrieval, achieving 94.2% factual precision on legal contract queries.
- Optimized 70B open-weights LLM inference using TensorRT-LLM and speculative decoding, lowering token latency by 3.8x.
- Managed multi-GPU training clusters (64x H100s) with zero loss spikes, automating dataset tokenization and cleaning pipelines.

Applied Machine Learning Scientist | Synapse Intelligence
June 2018 - August 2021 | Seattle, WA
- Deployed real-time computer vision and NLP classification systems processing 40M daily inferences with <25ms p99 latency.
- Authored 3 peer-reviewed publications at NeurIPS and ACL in parameter-efficient representation learning.

EDUCATION
Ph.D. in Computer Science (Machine Learning Focus) | University of Washington (2018)
B.S. in Applied Mathematics | University of Michigan (2014)`
  }
];
