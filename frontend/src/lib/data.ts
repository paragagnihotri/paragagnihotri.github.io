import type { Profile, Project, CertificationsData } from "@/types";

export const profileData: Profile = {
  name: "Parag Agnihotri",
  title: "Data Scientist",
  quote: "To be Added...",
  introduction:
    "Results-driven Data Scientist with 2+ years of progressive experience in architecting and deploying enterprise-grade AI solutions. Demonstrated expertise in conceptualizing and implementing Generative AI ecosystems, including Agentic AI frameworks and production-ready RAG pipelines, while fostering cross-functional collaboration with engineering and architecture teams. Adept at leveraging cutting-edge technologies such as LangChain, LangGraph, and CrewAI to orchestrate complex LLM workflows that drive measurable business outcomes. AWS-certified professional with a strategic focus on building resilient, scalable AI applications that bridge the gap between innovative research and practical deployment.",
  avatar:
    "https://github.com/paragagnihotri/resume/blob/main/pfp.jpg?raw=true",
  experiences: [
    {
      company: "YASH Technologies Pvt. Ltd.",
      role: "Associate Data Scientist",
      start_date: "Aug 2024",
      end_date: "Present",
      description:
        "Designed and implemented enterprise-scale Generative AI and Agentic AI systems using LangChain, LangGraph, and CrewAI to address complex business challenges, while building and deploying production-grade RAG pipelines integrated with Milvus vector databases for high-performance semantic search and real-time retrieval. Developed custom tool integrations and context-aware execution frameworks for LLM orchestration, ensuring robust error handling, scalability, and observability. Collaborated closely with cross-functional teams to translate business requirements into scalable AI solutions and actively contributed to architectural reviews to ensure alignment with enterprise standards and long-term system reliability.",
      logo: "https://e7.pngegg.com/pngimages/91/303/png-clipart-yash-technologies-pvt-ltd-gitex-business-technology-business-text-trademark.png",
    },
    {
      company: "Smartknower Edtech Pvt. Ltd.",
      role: "Data Science Intern",
      start_date: "Jan 2024",
      end_date: "Jun 2024",
      description:
        "Built and validated machine learning models on large educational datasets using scikit-learn, pandas, and NumPy, executing end-to-end machine learning workflows that included data preprocessing, feature engineering, model selection, and hyperparameter tuning to ensure accurate, efficient, and scalable predictive performance.",
      logo: "https://media.licdn.com/dms/image/v2/C560BAQEurnSUo3oWFw/company-logo_200_200/company-logo_200_200/0/1630603999936/smartknower_logo?e=2147483647&v=beta&t=fY0x5hraCuengeRA4Wq2_Qoynsz04qreKHFo17TYoRs",
    },
  ],
  education: [
    {
      institution: "Acropolis Institute of Technology and Research, Indore",
      degree: "B.Tech",
      specialization:
        "Computer Science and Engineering - Data Science",
      start_date: "Nov 2020",
      end_date: "Jun 2024",
    },
    {
      institution: "Brilliant Academy, Indore",
      degree: "Higher Secondary Education",
      specialization: "PCM",
      start_date: "Apr 2019",
      end_date: "May 2020",
    },
  ],
  skills: [
    {
      category: "Programming Languages",
      skills: [
        { name: "Python", level: "Expert" },
        { name: "SQL", level: "Advanced" },
        { name: "R", level: "Beginner" },
      ],
    },
    {
      category: "Frameworks & Libraries",
      skills: [
        { name: "FastAPI", level: "Expert" },
        { name: "LangChain", level: "Expert" },
        { name: "LangGraph", level: "Expert" },
        { name: "CrewAI", level: "Expert" },
        { name: "Streamlit", level: "Intermediate" },
        { name: " scikit-learn", level: "Advanced" },
        { name: "Matplotlib", level: "Advanced" },
        { name: "Pandas / NumPy", level: "Advanced" },
      ],
    },
    {
      category: "Databases & Tools",
      skills: [
        { name: "MySQL", level: "Advanced" },
        { name: "PostgreSQL", level: "Intermediate" },
        { name: "MongoDB", level: "Advanced" },
        { name: "Milvus Vector DB", level: "Advanced" },
        { name: "QdrantDB", level: "Advanced" },
        { name: "Git & GitHub", level: "Advanced" },
        { name: "Postman", level: "Advanced" },
      ],
    },
    {
      category: "Cloud & DevOps",
      skills: [
        {
          name: "AWS AI (Bedrock, SageMaker, Lex, Polly, Comprehend)",
          level: "Advanced",
        },
        {
          name: "AWS Compute(EC2, ECS, EKS, Lambda, etc.)",
          level: "Advanced",
        },
        {
          name: "AWS Storage (S3, RDS, DynamoDB, EBS, etc.)",
          level: "Advanced",
        },
      ],
    },
    {
      category: "Core Concepts",
      skills: [
        { name: "Generative AI", level: "Advanced" },
        { name: "Agentic AI", level: "Advanced" },
        { name: "RAG Pipelines", level: "Advanced" },
        { name: "Data Pipeline Orchestration", level: "Intermediate" },
        { name: "Data Analytics", level: "Advanced" },
        { name: "System Design", level: "Intermediate" },
        { name: "Microservices Architecture", level: "Advanced" },
        { name: "REST APIs", level: "Advanced" },
        { name: "Agile / Scrum", level: "Advanced" },
      ],
    },
  ],
};

export const projectsData: Project[] = [
  {
    id: "proj-001",
    title: "Medextract — Clinical Assistant",
    thumbnail:
      "https://github.com/paragagnihotri/Medextract_Clinical_Assistant/blob/main/Medextract_Clinical_Assistant.png?raw=true",
    description:
      "A medical document intelligence application that extracts structured clinical data from healthcare documents using LangExtract and Google Gemini. Upload a clinical PDF, DOCX, or plain-text file and get back a structured PDF report, an interactive web dashboard, and a searchable SQLite database — all in seconds.",
    github_url:
      "https://github.com/paragagnihotri/Medextract_Clinical_Assistant",
    contribution:
      "Led the complete development of MedExtract Clinical Assistant, building both the user-friendly dashboard and the powerful backend from scratch. Integrated Google's LangExtract and Gemini AI to accurately pull structured medical data from various clinical documents. Designed key features like source verification, automated PDF reports, and local data storage—ensuring the tool is both practical and privacy-conscious. Owned the project end-to-end: from initial concept and architecture to coding, testing, and documentation.",
    tags: [
      "Python-FastAPI",
      "Google-gemini",
      "Langextract",
      "SQLite",
      "Streamlit",
    ],
  },
  {
    id: "proj-002",
    title: "RapidRead — PDF to Podcast Converter",
    thumbnail:
      "https://github.com/paragagnihotri/RapidRead-PDF2Podcast/blob/main/RapidRead-PDF2Podcast.png?raw=true",
    description:
      "The PDF to Podcast Converter is an AI-driven platform that transforms static documents into engaging, conversational podcast scripts and high-quality audio. By orchestrating a multi-agent CrewAI workflow, the system intelligently extracts key insights and restructures them into natural dialogue between two distinct speakers. The application combines a FastAPI backend with Edge TTS for realistic voice synthesis, all wrapped in an intuitive Streamlit dashboard. Users can seamlessly choose between rapid script generation or a complete audio podcast, making dense written content accessible and engaging.",
    github_url: "https://github.com/paragagnihotri/RapidRead-PDF2Podcast",
    contribution:
      "I independently architected and developed the full-stack application from initial concept to deployment, designing the multi-agent coordination pipeline and integrating CrewAI with Google Gemini. I engineered the complete backend services, built the interactive Streamlit interface, and implemented the Edge TTS workflow to generate synchronized dual-voice audio. I also established the RESTful API endpoints, optimized prompt structures for accurate dialogue generation, and ensured a reliable, production-ready user experience. This end-to-end ownership covered system design, agent orchestration, audio processing, and full-stack implementation.",
    tags: [
      "Python-FastAPI",
      "Google-gemini",
      "CrewAI",
      "Streamlit",
      "Microsoft Edge TTS",
    ],
  },
];

export const certificationsData: CertificationsData = {
  badges: [
    {
      id: "badge-001",
      title: "AWS Certified Generative AI Deveoper - Professional",
      issuer: "Amazon Web Services",
      badge_url:
        "https://images.credly.com/size/680x680/images/52c6e5ac-9516-4944-a4df-e31b23c9bbf2/blob",
      public_link:
        "https://www.credly.com/badges/67c6b541-6bd6-4090-8f80-af7da86608e2/public_url",
      exam_link:
        "https://aws.amazon.com/certification/certified-generative-ai-developer-professional/",
    },
    {
      id: "badge-002",
      title:
        "AWS Certified Generative AI Deveoper - Professional (Early Adopter)",
      issuer: "Amazon Web Services",
      badge_url:
        "https://images.credly.com/size/680x680/images/9de9a2f7-3259-4720-bb74-095563bb1e49/blob",
      public_link:
        "https://www.credly.com/badges/37a49892-6946-4205-9353-9983c9ab1958/public_url",
      exam_link:
        "https://aws.amazon.com/certification/certified-generative-ai-developer-professional/",
    },
    {
      id: "badge-003",
      title: "AWS Certified Developer Associate",
      issuer: "Amazon Web Services",
      badge_url:
        "https://images.credly.com/size/680x680/images/b9feab85-1a43-4f6c-99a5-631b88d5461b/image.png",
      public_link:
        "https://www.credly.com/badges/7103338c-ca31-4ac0-8b3d-60b3e48a078e/public_url",
      exam_link:
        "https://aws.amazon.com/certification/certified-developer-associate/",
    },
    {
      id: "badge-004",
      title: "AWS Certified AI Practitioner - Foundational",
      issuer: "Amazon Web Services",
      badge_url:
        "https://images.credly.com/size/680x680/images/4d4693bb-530e-4bca-9327-de07f3aa2348/image.png",
      public_link:
        "https://www.credly.com/badges/f1ddf7a9-24e3-450a-ae3f-b24e2a3032d8/public_url",
      exam_link:
        "https://aws.amazon.com/certification/certified-ai-practitioner/",
    },
    {
      id: "badge-005",
      title: "Cloud Essentials",
      issuer: "IBM",
      badge_url:
        "https://images.credly.com/size/680x680/images/5ee26427-f944-4182-b802-459462184c9a/image.png",
      public_link:
        "https://www.credly.com/badges/e0e555c7-2e46-46fa-aee0-02287fa5b577/public_url",
      exam_link: "https://cognitiveclass.ai/badges/",
    },
    {
      id: "badge-006",
      title: "Artificial Intelligence Fundamentals",
      issuer: "IBM SkillBuild",
      badge_url:
        "https://images.credly.com/size/680x680/images/82b908e1-fdcd-4785-9d32-97f11ccbcf08/image.png",
      public_link:
        "https://www.credly.com/badges/40b814ae-444b-458a-96f0-7c698707c2df/public_url",
      exam_link: "https://skillsbuild.org/adult-learners/digital-credentials",
    },
  ],
  certificates: [
    {
      id: "cert-001",
      title: "AWS Certified Generative AI Deveoper - Professional",
      issuer: "Amazon Web Services",
      credential_id: "5b96fb9125b84ba28f7a17efb5538edd",
      credential_url:
        "https://cp.certmetrics.com/amazon/en/public/verify/credential/5b96fb9125b84ba28f7a17efb5538edd",
      issue_date: "March 2026",
      exam_link:
        "https://aws.amazon.com/certification/certified-generative-ai-developer-professional/",
      thumbnail:
        "https://d2908q01vomqb2.cloudfront.net/22d200f8670dbdb3e253a90eee5098477c95c23d/2023/02/16/aws_bp_primarylogo_01.png",
    },
    {
      id: "cert-002",
      title: "AWS Certified Developer Associate",
      issuer: "Amazon Web Services",
      credential_id: "fc180bb606d243aa8b600dda0cc26e0d",
      credential_url:
        "https://cp.certmetrics.com/amazon/en/public/verify/credential/fc180bb606d243aa8b600dda0cc26e0d",
      issue_date: "March 2025",
      exam_link:
        "https://aws.amazon.com/certification/certified-developer-associate/",
      thumbnail:
        "https://d2908q01vomqb2.cloudfront.net/22d200f8670dbdb3e253a90eee5098477c95c23d/2023/02/16/aws_bp_primarylogo_01.png",
    },
    {
      id: "cert-003",
      title: "AWS Certified AI Practitioner - Foundational",
      issuer: "Amazon Web Services",
      credential_id: "3426d27bca9c4f3c9f93d049ac6ac57a",
      credential_url:
        "https://cp.certmetrics.com/amazon/en/public/verify/credential/3426d27bca9c4f3c9f93d049ac6ac57a",
      issue_date: "May 2025",
      exam_link:
        "https://aws.amazon.com/certification/certified-ai-practitioner/",
      thumbnail:
        "https://d2908q01vomqb2.cloudfront.net/22d200f8670dbdb3e253a90eee5098477c95c23d/2023/02/16/aws_bp_primarylogo_01.png",
    },
  ],
};
