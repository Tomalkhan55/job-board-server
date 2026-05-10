import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "./models/User.js";
import Job from "./models/Job.js";

dotenv.config();

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected ✅");

    // Clear existing data
    await Job.deleteMany({});
    await User.deleteMany({});
    console.log("Cleared existing data ✅");

    // Create demo employer
    const employer = await User.create({
      name: "Demo Employer",
      email: "employer@demo.com",
      password: "demo1234",
      role: "employer",
    });
    console.log("Demo employer created ✅");

    // Create demo jobseeker
    await User.create({
      name: "Demo Jobseeker",
      email: "jobseeker@demo.com",
      password: "demo1234",
      role: "jobseeker",
    });
    console.log("Demo jobseeker created ✅");

    // Seed jobs
    const jobs = [
      { title: "Senior React Developer", company: "TechCorp", location: "Remote", type: "Full-time", category: "Engineering", salary: "$80k - $120k", description: "We are looking for a Senior React Developer to join our growing team. You will be responsible for building and maintaining high-quality web applications used by millions.", requirements: ["5+ years React experience", "TypeScript proficiency", "Node.js knowledge", "REST API experience"], featured: true },
      { title: "UI/UX Designer", company: "DesignStudio", location: "New York, USA", type: "Full-time", category: "Design", salary: "$60k - $90k", description: "Join our creative team as a UI/UX Designer. You will craft beautiful and intuitive user interfaces for our clients worldwide.", requirements: ["3+ years design experience", "Figma expertise", "User research skills", "Prototyping experience"], featured: true },
      { title: "Backend Node.js Engineer", company: "CloudBase", location: "London, UK", type: "Remote", category: "Engineering", salary: "$70k - $100k", description: "Build scalable backend systems using Node.js and MongoDB. Work with a talented team on challenging problems at scale.", requirements: ["4+ years Node.js", "MongoDB/PostgreSQL", "REST & GraphQL APIs", "Docker knowledge"], featured: false },
      { title: "Digital Marketing Manager", company: "GrowthHQ", location: "Austin, TX", type: "Full-time", category: "Marketing", salary: "$55k - $75k", description: "Lead our digital marketing efforts across SEO, SEM, social media, and email campaigns to drive growth.", requirements: ["5+ years marketing", "Google Ads certified", "Analytics expertise", "Team leadership"], featured: false },
      { title: "Mobile Developer (React Native)", company: "AppWorks", location: "Remote", type: "Contract", category: "Engineering", salary: "$60/hr", description: "Build cross-platform mobile applications using React Native. Work on exciting products used by millions of users globally.", requirements: ["React Native experience", "iOS & Android knowledge", "REST API integration", "App Store deployment"], featured: true },
      { title: "Product Designer", company: "Startly", location: "Berlin, Germany", type: "Full-time", category: "Design", salary: "€55k - €75k", description: "Shape the product experience at one of Europe's fastest-growing startups. Work closely with engineering and product teams.", requirements: ["Product design portfolio", "Systems thinking", "Figma & Framer", "Design systems experience"], featured: false },
      { title: "Sales Development Rep", company: "SalesForce Pro", location: "Chicago, IL", type: "Full-time", category: "Sales", salary: "$45k + commission", description: "Drive new business opportunities by prospecting and qualifying leads. Excellent earning potential with commission structure.", requirements: ["1+ year sales experience", "CRM knowledge", "Strong communication", "Goal-oriented mindset"], featured: false },
      { title: "DevOps Engineer", company: "InfraNet", location: "Remote", type: "Full-time", category: "Engineering", salary: "$90k - $130k", description: "Build and maintain our cloud infrastructure. Work with cutting-edge tools to ensure 99.9% uptime for our platform.", requirements: ["AWS/GCP/Azure", "Kubernetes & Docker", "CI/CD pipelines", "Infrastructure as code"], featured: true },
      { title: "Financial Analyst", company: "FinanceGroup", location: "New York, USA", type: "Full-time", category: "Finance", salary: "$65k - $85k", description: "Analyze financial data, build models, and provide strategic insights to support business decisions at the executive level.", requirements: ["Finance degree", "Excel & Python", "Financial modeling", "CFA preferred"], featured: false },
      { title: "HR Business Partner", company: "PeopleFirst", location: "Remote", type: "Part-time", category: "HR", salary: "$40k - $55k", description: "Partner with business leaders to develop and execute HR strategies that support organizational goals and culture.", requirements: ["5+ years HR experience", "Employment law knowledge", "HRIS systems", "Conflict resolution"], featured: false },
      { title: "Full Stack Developer", company: "WebAgency", location: "Toronto, Canada", type: "Full-time", category: "Engineering", salary: "CAD $75k - $95k", description: "Work on diverse client projects using React, Node.js, and MongoDB in a fast-paced agency environment.", requirements: ["React & Node.js", "MongoDB & SQL", "Git workflow", "Client communication"], featured: false },
      { title: "Brand Designer", company: "CreativeHouse", location: "Los Angeles, CA", type: "Internship", category: "Design", salary: "$20/hr", description: "Great opportunity for a junior designer to work on real brand projects with an award-winning creative team.", requirements: ["Design portfolio", "Adobe Creative Suite", "Typography skills", "Team player"], featured: false },
      { title: "Content Marketing Lead", company: "ContentCo", location: "Remote", type: "Full-time", category: "Marketing", salary: "$60k - $80k", description: "Lead content strategy and creation across blog, social, and email. Build and grow a high-performing content team.", requirements: ["Content strategy experience", "SEO knowledge", "Writing excellence", "Analytics skills"], featured: true },
      { title: "Data Scientist", company: "DataLabs", location: "San Francisco, CA", type: "Full-time", category: "Engineering", salary: "$110k - $150k", description: "Use machine learning and statistical analysis to extract insights from large datasets and drive business decisions.", requirements: ["Python & R", "ML/AI frameworks", "SQL expertise", "PhD preferred"], featured: true },
      { title: "Account Executive", company: "SaaSGrow", location: "Remote", type: "Full-time", category: "Sales", salary: "$70k + OTE $140k", description: "Close deals with mid-market companies. Own the full sales cycle from discovery to close with uncapped commission.", requirements: ["3+ years B2B sales", "SaaS experience", "Salesforce CRM", "Proven track record"], featured: false },
      { title: "Recruitment Specialist", company: "TalentFirst", location: "Dublin, Ireland", type: "Full-time", category: "HR", salary: "€40k - €55k", description: "Source and recruit top talent across tech and business roles. Build strong candidate pipelines for our clients.", requirements: ["Recruiting experience", "LinkedIn Recruiter", "Applicant tracking systems", "Interviewing skills"], featured: false },
      { title: "React Native Developer", company: "MobileFirst", location: "Remote", type: "Remote", category: "Engineering", salary: "$75k - $100k", description: "Build beautiful mobile experiences for iOS and Android using React Native. Join a fully remote international team.", requirements: ["React Native", "Redux/Zustand", "Native modules", "Performance optimization"], featured: false },
      { title: "Growth Hacker", company: "StartupLab", location: "Singapore", type: "Full-time", category: "Marketing", salary: "SGD $60k - $80k", description: "Run rapid experiments across the funnel to drive user acquisition and retention at a fast-growing startup.", requirements: ["Growth marketing", "A/B testing", "Data analysis", "Product sense"], featured: false },
      { title: "CFO (Part-time)", company: "ScaleUp", location: "Remote", type: "Part-time", category: "Finance", salary: "$120k pro-rata", description: "Fractional CFO role for a Series A startup. Oversee financial planning, reporting, and investor relations.", requirements: ["CFO experience", "Startup finance", "Fundraising", "Financial modeling"], featured: true },
      { title: "Cybersecurity Analyst", company: "SecureNet", location: "Washington DC", type: "Full-time", category: "Engineering", salary: "$85k - $115k", description: "Protect our infrastructure from threats. Monitor, detect, and respond to security incidents in real time.", requirements: ["Security certifications", "SIEM tools", "Penetration testing", "Incident response"], featured: false },
    ];

    const jobsWithEmployer = jobs.map((job) => ({ ...job, postedBy: employer._id }));
    await Job.insertMany(jobsWithEmployer);
    console.log(`${jobs.length} jobs seeded ✅`);

    console.log("\n=== Seed Complete! ===");
    console.log("Demo Employer → email: employer@demo.com | password: demo1234");
    console.log("Demo Jobseeker → email: jobseeker@demo.com | password: demo1234");

    process.exit(0);
  } catch (err) {
    console.error("Seed error:", err);
    process.exit(1);
  }
};

seedData();