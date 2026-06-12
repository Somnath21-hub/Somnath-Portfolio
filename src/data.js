// Centralized Portfolio Data for Somnath Mukherjee
// Modify this file to update any credentials, texts, or links on your portfolio.

export const portfolioData = {
  personalInfo: {
    firstName: "Somnath",
    lastName: "Mukherjee",
    fullName: "Somnath Mukherjee",
    title: "Somnath Mukherjee | Full Stack Developer & AI/ML Specialist",
    roles: ["Full Stack Developer", "AI/ML Specialist", "MERN Developer"],
    workExpYears: "1.5+",
    hackathonsCount: "15+",
    leetcodeCount: "150+",
    baseLocation: "Kolkata, India",
    email: "somnath10235@gmail.com",
    github: "https://github.com/Somnath21-hub",
    linkedin: "https://www.linkedin.com/in/somnath-mukherjee-8b629b288/",
    leetcode: "https://leetcode.com/u/Somnath21/",
    resumeLink: "#", // Add google drive link to your resume
    bioLine1: "A Full Stack Developer and AI/ML Engineer skilled in MERN, LLMs, and scalable SaaS systems; experienced in building and deploying production-ready applications.",
    bioLine2: "Passionate about competitive programming, hackathons, and developing assistive technology and smart SaaS solutions. Undergrad at Techno International New Town. 🚀",
  },
  
  experiences: [
    {
      company: "Kannovac Technology",
      role: "Gen AI Trainer Intern",
      type: "Past",
      duration: "February 2026",
      location: "Remote",
      logo: "/kannovac.png",
      iconType: "sparkles",
      iconColor: "#7C3AED",
      points: [
        "Delivered hands-on training sessions on LLMs, Transformers architectures, and Retrieval-Augmented Generation (RAG).",
        "Developed and demonstrated real-world integration demos to showcase practical applications of Gen AI tools."
      ],
      skills: ["LLMs", "Transformers", "RAG", "GenAI", "Python"]
    },
    {
      company: "Apex Circle",
      role: "Co-Lead, Web Dev Intern",
      type: "Current",
      duration: "January 2025 – Present",
      location: "Kolkata, India",
      logo: "/apex.png",
      iconType: "chip",
      iconColor: "#A78BFA",
      points: [
        "Built responsive, high-performance MERN stack applications and robust, secure REST APIs.",
        "Led a cross-functional development team and organized CalcuttaHacks, a major hackathon with 500+ participants."
      ],
      skills: ["MongoDB", "Express.js", "React.js", "Node.js", "REST APIs", "Team Leadership"]
    },
    {
      company: "GDG DevFest Durgapur",
      role: "Web Team Member",
      type: "Past",
      duration: "2025",
      location: "Durgapur, India",
      logo: "/gdg.png",
      iconType: "server",
      iconColor: "#C4B5FD",
      points: [
        "Optimized web application deployment pipelines and page-load performance for large-scale community tech events.",
        "Coordinated with web operations and assisted with technical event logistics."
      ],
      skills: ["Web Performance", "Deployment", "Vite", "HTML/CSS", "Team Collaboration"]
    }
  ],
  
  projects: [
    {
      title: "InterviewIQ Buddy",
      description: "AI-powered mock interview SaaS platform utilizing LLMs for resume-based interview Q&A and instant feedback. Deployed with Firebase Authentication, credit-based user quota systems, and Razorpay payment gateway integration.",
      github: "https://github.com/Somnath21-hub/interview-iq-buddy",
      demo: "#",
      tags: ["React.js", "Node.js", "Express.js", "MongoDB", "LLMs", "Firebase", "Razorpay"]
    },
    {
      title: "AAHAR",
      description: "Online MERN-stack food platform featuring JWT authentication. Designed optimized database aggregation pipelines to reduce API response latency by 35% for over 200+ users.",
      github: "https://github.com/Somnath21-hub/aahar",
      demo: "#",
      tags: ["React.js", "Node.js", "Express.js", "MongoDB", "JWT Auth"]
    },
    {
      title: "GazeBoard",
      description: "Eye-controlled hands-free assistive system leveraging computer vision. Implemented real-time iris tracking with MediaPipe and OpenCV for cursor control, blink-based input virtual keyboard, and speech recognition. Listed on YUKTI Portal.",
      github: "https://github.com/Somnath21-hub/gazeboard",
      demo: "#",
      tags: ["Python", "OpenCV", "MediaPipe", "PyAutoGUI", "Speech Recognition"]
    }
  ],
  
  skills: [
    {
      category: "Languages",
      items: ["Python", "JavaScript", "Java", "C", "HTML/CSS"]
    },
    {
      category: "Web Technologies",
      items: ["React.js", "Node.js", "Express.js", "Tailwind CSS", "Bootstrap", "REST APIs"]
    },
    {
      category: "AI/ML & Core",
      items: ["LLMs", "NLP", "Transformers", "TensorFlow", "RAG", "Computer Vision", "DSA", "OOP"]
    },
    {
      category: "Databases & Tools",
      items: ["MongoDB", "MySQL", "Git", "Docker", "Firebase", "Razorpay", "VS Code"]
    }
  ],
  
  achievements: [
    {
      title: "Smart Bengal Hackathon 2024",
      description: "Placed as a Finalist in this state-level challenge, pitching innovative software solutions.",
      tier: "silver"
    },
    {
      title: "Hack-TINT 2025",
      description: "Won 1st Runner-Up for developing an advanced full-stack MERN application under 36 hours.",
      tier: "gold"
    },
    {
      title: "Smart Make-a-Thon 2025",
      description: "Secured 1st Runner-Up for demonstrating a functional IoT/software assistive prototype.",
      tier: "gold"
    },
    {
      title: "B.P Poddar Hackathon 2025",
      description: "Selected as a Finalist in a highly competitive bracket of university engineering teams.",
      tier: "silver"
    },
    {
      title: "ACM IEM Diversion 2026",
      description: "Placed as a Finalist in the regional ACM-sponsored programming and hacking competition.",
      tier: "silver"
    }
  ],
  
  // Custom field to showcase publication
  publication: {
    title: "Tea Leaf Disease Detection using YOLOv8-CBAM",
    publisher: "IEEE, 2025",
    description: "Co-authored and published research paper detailing computer vision-based disease classification in agricultural crops using YOLOv8 with attention modules.",
    link: "https://ieeexplore.ieee.org/document/11364642"
  },
  
  communities: [
    {
      organization: "CalcuttaHacks (Apex Circle)",
      role: "Co-Lead & Organizer",
      points: [
        "Co-led the organization and tech support for CalcuttaHacks, managing registration and hackathon operations for 500+ participants.",
        "Built promotional and event portals using MERN stack."
      ]
    },
    {
      organization: "TINT Student ACM Chapter",
      role: "Vice Chair",
      points: [
        "Organized high-impact technical campus events including Ideathons, AI/ML workshops, and competitive coding contests.",
        "Coordinated placement preparation programs and bootcamps, supporting coding training and campus hiring mock sessions."
      ]
    },
    {
      organization: "GDG DevFest Durgapur",
      role: "Web Team Lead / Member",
      points: [
        "Optimized delivery assets and compiled bundles to ensure high availability for registration pages.",
        "Supported outreach and logistical communication."
      ]
    }
  ],
  
  leetcodeStats: {
    easySolved: 72,
    easyTotal: 150,
    mediumSolved: 63,
    mediumTotal: 150,
    hardSolved: 15,
    hardTotal: 100,
  },
  
  stats: [
    { value: "15+", label: "Hackathons Participated" },
    { value: "500+", label: "Event Attendees" },
    { value: "Kolkata", label: "Base Location" }
  ]
};
