import { User, Briefcase, DollarSign, Book, Box } from 'lucide-react'
import { DottedCube, DottedOctahedron, DottedIcosahedron, DottedDodecahedron, DottedTetrahedron } from '@/components/three/dotted-shapes'
import type { Section, TimelineItem } from "@/types/types";

export const sections: Section[] = [
    { title: "About", icon: User, model: DottedCube },
    { title: "Projects", icon: Briefcase, model: DottedOctahedron },
    { title: "Pricing", icon: DollarSign, model: DottedIcosahedron },
    { title: "Sandbox", icon: Box, model: DottedDodecahedron },
    { title: "Blog", icon: Book, model: DottedTetrahedron },
]

export const timelineData: TimelineItem[] = [
    {
        year: "2024-present",
        title: "Freelance Developer",
        company: "",
        description: "Specialized in creating custom components, views, and web applications tailored to client needs.",
        details: [
            "Development Focus:",
            "- Explored and implemented various component libraries including Chakra UI, Ant Design, Material-UI and Mantine",
            "- Crafted reusable and scalable React components for various client projects",
            "- Designed and implemented custom views and layouts to meet specific client requirements",
            "- Developed full-scale web applications from concept to deployment",
            "Technical Expertise:",
            "- Primarily using ReactJS and Next.js for frontend development",
            "- Implementing responsive designs with Tailwind CSS",
            "- Utilizing TypeScript for enhanced code quality and developer experience",
            "- Integrating Supabase for backend services and real-time features",
            "- Employing Drizzle ORM for efficient database operations and type-safe queries",
            "Client Collaboration:",
            "- Worked closely with clients to understand their vision and technical requirements",
            "- Provided regular updates and incorporated feedback throughout the development process",
            "- Delivered projects on time and within scope, ensuring client satisfaction"
        ],
        type: "work",
        skills: ["ReactJS", "Next.js", "TypeScript", "Tailwind CSS", "Vercel", "Supabase", "Drizzle ORM", "shadcn/ui", "Framer Motion", "Chakra UI", "Ant Design", "Mantine"]
    },
    {
        year: "2022-present",
        title: "Software Developer",
        company: "WALDEN.AI",
        description: "Full-stack development evolving to frontend specialization, with a focus on innovative technologies and frameworks.",
        details: [
            "Started as a full-stack developer in 2022, transitioning to frontend specialization in 2023",
            "Backend Development:",
            "- Developed data collection pipelines using Python and Zyte",
            "- Contributed to backend API creation using Go, AWS Lambda, API Gateway, and RDS",
            "Frontend Development:",
            "- Initially used React with Material-UI (MUI)",
            "- Ultimately favored customizable libraries like shadcn/ui and Radix UI",
            "Cloud & DevOps:",
            "- Utilized AWS services including S3, EC2, Lambda, and Bedrock",
            "- Implemented CI/CD using GitLab pipelines",
            "AI Integration:",
            "- Integrated OpenAI API and AWS Bedrock through Langchain to enhance services with AI capabilities"
        ],
        type: "work",
        skills: ["React", "Next.js", "JavaScript", "TypeScript", "Tailwind CSS", "AWS S3", "AWS EC2", "AWS Lambda", "AWS Bedrock", "Python", "Go", "shadcn/ui", "Radix UI", "Vercel", "GitLab CI/CD", "OpenAI API", "Langchain", "Material-UI"]
    },
    {
        year: "2024",
        title: "Quirk - Thesis Project Website",
        company: "Freelance",
        description: "Developed a website for a group of designers' thesis project.",
        details: [
            "Project Overview:",
            "- Created a custom website to showcase the thesis project of a group of designers",
            "- Implemented a clean and modern design to highlight the designers' work",
            "Technical Implementation:",
            "- Utilized Tailwind CSS for responsive and customized styling",
            "- Deployed on Vercel for seamless hosting and continuous deployment",
        ],
        type: "project",
        link:"https://quirk-one.vercel.app/",
        skills: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Vercel", "Aceternity UI", "Framer Motion"]
    },
    {
        year: "2024",
        title: "Personal Portfolio",
        company: "Self",
        description: "Designed and developed a personal portfolio website to showcase projects and skills.",
        details: [
            "Project Goals:",
            "- Create an interactive and visually appealing portfolio",
            "- Showcase professional experience, projects, and skills",
            "- Implement modern web technologies for optimal performance",
            "Technical Details:",
            "- Built with Next.js for server-side rendering and optimal performance",
            "- Styled using Tailwind CSS for a responsive and customized design",
            "- Implemented interactive 3D elements using Three.js",
            "- Utilized Framer Motion for smooth animations and transitions",
            "Key Features:",
            "- Dynamic project showcase with detailed information",
            "- Interactive 3D elements for engaging user experience",
            "- Responsive design for all device sizes",
            "- Dark mode support for improved accessibility"
        ],
        type: "project",
        link:"/",
        skills: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Three.js", "Framer Motion", "shadcn/ui", "swapy", "Vercel"]
    },
    {
        year: "2023",
        title: "Nuvadi - Coaching Consultancy Website",
        company: "Freelance",
        description: "Developed a website for a coaching consultancy firm.",
        details: [
            "Project Overview:",
            "- Created a professional website for Nuvadi, a coaching consultancy firm",
            "- Focused on presenting the company's services and expertise effectively",
            "Technical Implementation:",
            "- Developed using Next.js for a fast, SEO-friendly site",
            "- Implemented responsive design with Tailwind CSS",
            "- Utilized Vercel for hosting and easy updates",
            "Key Features:",
            "- Service showcase with detailed information",
            "- Contact form for potential clients",
            "- Optimized for search engines to improve online visibility"
        ],
        type: "project",
        link:"https://www.nuvadi.com/",
        skills: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Vercel", "SEO optimization"]
    },
    {
        year: "2022-present",
        title: "Walden.ai Real Estate Investment Tool",
        company: "WALDEN.AI",
        description: "Developed an application to empower both retail and institutional investors in the Spanish real estate market.",
        details: [
            "Project Scope:",
            "- Created a comprehensive tool for real estate investment analysis in Spain",
            "- Catered to both individual and institutional investors",
            "Technical Implementation:",
            "- Developed the frontend using React and Next.js",
            "- Implemented responsive UI with Material-UI and custom components",
            "- Integrated complex data visualization tools for market analysis",
            "- Utilized AWS services for backend infrastructure and data processing",
            "Key Features:",
            "- Real-time market data integration",
            "- User-friendly interface for investment portfolio management",
            "- Customized reports and insights for different investor types"
        ],
        type: "project",
        link:"https://app.walden.ai/",
        skills: ["React", "Next.js", "JavaScript", "Material-UI", "AWS S3", "AWS EC2", "AWS Lambda", "AWS RDS", "Data Visualization", "Python", "Go"]
    },
    {
        year: "2023",
        title: "Mystery Box",
        company: "WALDEN.AI",
        description: "Developed a marketing and revenue-generating event website for WALDEN.AI.",
        details: [
            "Project aimed at promoting the company through an event that offered benefits to participating users while generating revenue",
            "Technologies used:",
            "- Next.js for the frontend framework",
            "- Vercel for deployment",
            "- Spline for 3D graphics",
            "- Tailwind CSS for styling",
            "- shadcn/ui for UI components"
        ],
        type: "project",
        link:"https://mysterybox.walden.ai/",
        skills: ["Next.js", "React", "TypeScript", "Vercel", "Spline", "Tailwind CSS", "shadcn/ui"]
    }
]