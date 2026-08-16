// ============================================================
// UNIQUE ENGINEERING — Complete Business Data
// Extracted from legacy website (unique-engineering-.git)
// ============================================================

export const siteConfig = {
  name: "Unique Engineering",
  tagline: "Crane & Engineering Solutions",
  phone: "+91 80764 41377",
  phoneHref: "tel:+918076441377",
  email: "pankaj@uniqueengineering.cc",
  emailHref: "mailto:pankaj@uniqueengineering.cc",
  whatsapp: "918076441377",
  whatsappLink: "https://wa.me/918076441377",
  location: "Bisrakh Jalalpur, Uttar Pradesh, India",
  hours: "Mon – Sat: 9:00 AM – 7:00 PM",
  since: 2024,
  copyright: "© 2026 Unique Engineering. All rights reserved.",
  description:
    "Unique Engineering delivers expert crane erection, gearboxes, VFDs, AMC and more across Delhi NCR & Pan-India.",
};

export const stats = [
  { icon: "Calendar", value: 10, suffix: "+", label: "Years Experience" },
  { icon: "ProjectDiagram", value: 150, suffix: "+", label: "Projects Completed" },
  { icon: "Users", value: 75, suffix: "+", label: "Trusted Clients" },
  { icon: "Globe", value: 12, suffix: "+", label: "States Served" },
];

export const navItems = [
  { label: "Home", section: "home" },
  { label: "About", section: "about" },
  { label: "Products", section: "products" },
  { label: "Services", section: "services" },
  { label: "Gallery", section: "gallery" },
  { label: "Blog", section: "blog" },
  { label: "Contact Us", section: "contact", cta: true },
];

// ==================== SERVICES ====================
export interface Service {
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  icon: string;
  features: string[];
}

export const services: Service[] = [
  {
    slug: "crane-erection-dismantling",
    title: "Crane Erection & Dismantling",
    subtitle: "Professional setup and dismantling of overhead, EOT, and tower cranes at industrial sites.",
    description:
      "Professional erection and dismantling of EOT, overhead, gantry, and tower cranes at industrial and construction sites across India.",
    icon: "Factory",
    features: [
      "EOT & overhead crane erection",
      "Tower crane dismantling",
      "Rail alignment & leveling",
      "Load testing & commissioning",
      "Crane relocation services",
    ],
  },
  {
    slug: "gearbox-solutions",
    title: "Gearbox Solutions",
    subtitle: "Supply, installation, and repair of heavy-duty gearboxes for crane and industrial drives.",
    description:
      "Supply, installation, and reconditioning of heavy-duty industrial gearboxes for crane cross-travel, long-travel, and hoist drives.",
    icon: "Cog",
    features: [
      "Helical & worm gearboxes",
      "Motor coupling alignment",
      "Oil seal & bearing replacement",
      "Gearbox reconditioning",
      "Emergency replacement supply",
    ],
  },
  {
    slug: "vfds-electrical",
    title: "VFDs & Electrical",
    subtitle: "Variable frequency drive installation, electrical panel wiring, and commissioning services.",
    description:
      "Supply, installation, and commissioning of Variable Frequency Drives and electrical systems for improved energy efficiency and control.",
    icon: "Zap",
    features: [
      "VFD selection & sizing",
      "Panel wiring & integration",
      "Motor drives commissioning",
      "PLC panel installation",
      "Energy audit for cranes",
    ],
  },
  {
    slug: "amc-breakdown",
    title: "AMC & Breakdown",
    subtitle: "Annual maintenance contracts and rapid response breakdown services to minimize downtime.",
    description:
      "Comprehensive Annual Maintenance Contracts and rapid-response breakdown services to minimize downtime and extend equipment life.",
    icon: "Wrench",
    features: [
      "Scheduled preventive maintenance",
      "24/7 breakdown response",
      "Lubrication & inspection reports",
      "Spare parts management",
      "Customised AMC packages",
    ],
  },
  {
    slug: "safety-devices",
    title: "Safety Devices",
    subtitle: "Supply and fitment of limit switches, overload relays, and crane safety protection systems.",
    description:
      "Supply and installation of all crane safety and protection devices. We ensure your crane systems comply with IS standards.",
    icon: "Shield",
    features: [
      "Limit switches (hoist & travel)",
      "Overload protection relays",
      "Anti-collision systems",
      "Pendant & remote controls",
      "Safety audit & compliance",
    ],
  },
  {
    slug: "hoist-assembly",
    title: "Hoist Assembly",
    subtitle: "Complete hoist unit assembly, wire rope replacement, and hook block maintenance.",
    description:
      "Complete hoist unit assembly, wire rope reeving, hook block servicing, and drum replacement with certified load testing.",
    icon: "HardHat",
    features: [
      "Wire rope supply & replacement",
      "Drum assembly & machining",
      "Hook block overhaul",
      "Brake shoe replacement",
      "Load testing certification",
    ],
  },
];

// ==================== PRODUCTS ====================
export interface ProductCategory {
  slug: string;
  title: string;
  icon: string;
  description: string;
  items: string[];
}

export const productCategories: ProductCategory[] = [
  {
    slug: "crane-erection",
    title: "Crane Erection",
    icon: "Factory",
    description: "Professional setup & dismantling for all crane types",
    items: [
      "EOT Crane Erection",
      "Overhead Crane Setup",
      "Tower Crane Dismantling",
      "Gantry Crane Assembly",
      "Rail Alignment & Leveling",
      "Crane Relocation Services",
      "Load Testing & Commissioning",
    ],
  },
  {
    slug: "wire-ropes",
    title: "Wire Ropes",
    icon: "Link",
    description: "High-tensile steel ropes for all load ratings",
    items: [
      "6x19 Construction Wire Rope",
      "6x36 Wire Rope (Seale)",
      "Fibre Core Wire Rope",
      "IWRC Wire Rope",
      "Galvanised Wire Rope",
      "Drum Rope Assembly",
      "Wire Rope Slings",
    ],
  },
  {
    slug: "gearboxes",
    title: "Gearboxes",
    icon: "Cog",
    description: "Heavy-duty gearboxes for industrial crane drives",
    items: [
      "Helical Gearbox",
      "Worm Gear Reducer",
      "Bevel Helical Gearbox",
      "Planetary Gearbox",
      "Parallel Shaft Gearbox",
      "Gearbox Reconditioning",
      "Oil Seal & Bearing Kits",
    ],
  },
  {
    slug: "vfds-electrical",
    title: "VFDs & Electrical",
    icon: "Zap",
    description: "Variable frequency drives & electrical panels",
    items: [
      "AC Variable Frequency Drives",
      "Crane Control Panels",
      "PLC Panels",
      "Contactors & Relays",
      "Pendant Push Button Stations",
      "Radio Remote Controls",
      "Motor Starters (DOL / Star-Delta)",
    ],
  },
  {
    slug: "safety-devices",
    title: "Safety Devices",
    icon: "Shield",
    description: "Limit switches & overload protection systems",
    items: [
      "Hoist Travel Limit Switch",
      "Long Travel Limit Switch",
      "Cross Travel Limit Switch",
      "Overload Relay",
      "Load Indicator / SLI",
      "Anti-Collision System",
      "Warning Lights & Sirens",
    ],
  },
  {
    slug: "hoist-spares",
    title: "Hoist & Spares",
    icon: "Wrench",
    description: "Electric hoists, brakes, and spare parts",
    items: [
      "Electric Chain Hoist",
      "Wire Rope Hoist",
      "Hoist Brake Shoes",
      "Hook Block Assembly",
      "Hoist Drums",
      "Hoist Motors",
      "Brake Rectifiers",
      "Hoist Trolley Assembly",
    ],
  },
  {
    slug: "motors-drives",
    title: "Motors & Drives",
    icon: "CircuitBoard",
    description: "Crane duty motors, gear motors, and couplings",
    items: [
      "Crane Duty Induction Motors",
      "Slip Ring Motors",
      "Brake Motors (FCBR)",
      "Squirrel Cage Motors",
      "Gear Motors",
      "Motor Couplings & Flanges",
    ],
  },
  {
    slug: "amc-services",
    title: "AMC Services",
    icon: "ClipboardCheck",
    description: "Annual maintenance & breakdown contracts",
    items: [
      "Comprehensive AMC Packages",
      "Breakdown Emergency Service",
      "Preventive Maintenance Plans",
      "Safety Inspection & Audit",
      "Load Test Certification",
    ],
  },
];

// ==================== GALLERY ====================
export interface GalleryItem {
  id: number;
  category: string;
  title: string;
  subtitle: string;
  description: string;
  icon: string;
  gradient: string;
}

export const galleryItems: GalleryItem[] = [
  {
    id: 1,
    category: "crane",
    title: "EOT Crane Erection — Noida",
    subtitle: "30T Double Girder EOT Crane",
    description:
      "30-ton double girder EOT crane erected and commissioned at a steel fabrication facility in Noida, UP.",
    icon: "Factory",
    gradient: "from-orange-900/40 to-stone-950/80",
  },
  {
    id: 2,
    category: "gearbox",
    title: "Gearbox Overhaul — Delhi",
    subtitle: "Helical Gearbox Reconditioning",
    description:
      "Complete reconditioning of helical gearbox on a 15-ton crane at a Delhi manufacturing unit.",
    icon: "Cog",
    gradient: "from-slate-800/60 to-slate-950/80",
  },
  {
    id: 3,
    category: "electrical",
    title: "VFD Panel — Gurgaon Warehouse",
    subtitle: "Twin 20T Crane VFD Upgrade",
    description:
      "Variable frequency drive panel installed on twin 20T overhead cranes at a logistics warehouse in Gurgaon.",
    icon: "Zap",
    gradient: "from-amber-900/30 to-stone-950/80",
  },
  {
    id: 4,
    category: "crane",
    title: "Gantry Crane — Faridabad",
    subtitle: "10T Outdoor Gantry Setup",
    description:
      "10-ton gantry crane erected at an outdoor fabrication yard in Faridabad, Haryana.",
    icon: "Warehouse",
    gradient: "from-emerald-900/30 to-stone-950/80",
  },
  {
    id: 5,
    category: "amc",
    title: "AMC Service — Noida Client",
    subtitle: "4 × EOT Crane Preventive Maintenance",
    description:
      "Scheduled preventive maintenance of 4 EOT cranes under AMC agreement at a large manufacturing plant.",
    icon: "Wrench",
    gradient: "from-green-900/40 to-stone-950/80",
  },
  {
    id: 6,
    category: "safety",
    title: "Safety Devices — Mumbai",
    subtitle: "6-Crane Safety Compliance Fitment",
    description:
      "Limit switches, overload relays and anti-collision systems fitted on 6 cranes at a Mumbai infrastructure project.",
    icon: "Shield",
    gradient: "from-yellow-900/30 to-stone-950/80",
  },
  {
    id: 7,
    category: "crane",
    title: "Tower Crane Dismantling — Pune",
    subtitle: "Post-Construction Tower Crane Removal",
    description:
      "Safe dismantling of a tower crane after completion of a high-rise construction project in Pune.",
    icon: "Building2",
    gradient: "from-purple-900/30 to-stone-950/80",
  },
  {
    id: 8,
    category: "gearbox",
    title: "Wire Rope Replacement — Haryana",
    subtitle: "25T Hoist Wire Rope & Drum Rebuild",
    description:
      "Complete wire rope reeving and drum assembly replacement on a 25-ton hoist unit at an industrial plant.",
    icon: "Link",
    gradient: "from-amber-800/30 to-stone-950/80",
  },
  {
    id: 9,
    category: "electrical",
    title: "PLC Panel — UP Factory",
    subtitle: "Multi-Crane PLC Integration",
    description:
      "Full PLC panel installation and motor integration for a multi-crane system at a factory in Uttar Pradesh.",
    icon: "CircuitBoard",
    gradient: "from-cyan-900/30 to-stone-950/80",
  },
  {
    id: 10,
    category: "crane",
    title: "Crane Relocation — Gujarat",
    subtitle: "2 × 15T Overhead Crane Move",
    description:
      "Relocation of two 15T overhead cranes from an old plant to a new facility in Gujarat.",
    icon: "ArrowLeftRight",
    gradient: "from-rose-900/30 to-stone-950/80",
  },
  {
    id: 11,
    category: "amc",
    title: "Load Testing — Rajasthan",
    subtitle: "Crane Load Test & Certification",
    description:
      "Load testing and certification of newly erected cranes at a steel plant in Rajasthan.",
    icon: "Weight",
    gradient: "from-stone-800/40 to-stone-950/80",
  },
  {
    id: 12,
    category: "safety",
    title: "Safety Audit — Delhi NCR",
    subtitle: "8-Crane Fleet Compliance Audit",
    description:
      "Comprehensive safety audit and compliance report for a fleet of 8 cranes at a Delhi NCR industrial complex.",
    icon: "ClipboardCheck",
    gradient: "from-teal-900/30 to-stone-950/80",
  },
];

// ==================== TEAM ====================
export interface TeamMember {
  name: string;
  role: string;
  description: string;
  initials: string;
  gradient: string;
}

export const team: TeamMember[] = [
  {
    name: "Pankaj Kumar",
    role: "Founder & Director",
    description:
      "10+ years in crane engineering. Leads all major projects and client relationships across India.",
    initials: "PK",
    gradient: "from-orange-500 to-orange-700",
  },
  {
    name: "Rajiv Kumar",
    role: "Lead Crane Technician",
    description:
      "8+ years specialising in EOT and overhead crane erection and commissioning.",
    initials: "RK",
    gradient: "from-yellow-400 to-yellow-600",
  },
  {
    name: "Arjun Singh",
    role: "Electrical & VFD Engineer",
    description:
      "Expert in VFD installation, PLC integration and electrical commissioning for industrial cranes.",
    initials: "AS",
    gradient: "from-emerald-400 to-emerald-600",
  },
  {
    name: "Manoj Verma",
    role: "AMC & Service Manager",
    description:
      "Manages all annual maintenance contracts and coordinates rapid breakdown response teams.",
    initials: "MV",
    gradient: "from-sky-400 to-sky-600",
  },
];

// ==================== TESTIMONIALS ====================
export interface Testimonial {
  name: string;
  title: string;
  text: string;
  initials: string;
  rating: number;
}

export const testimonials: Testimonial[] = [
  {
    name: "Rajesh Kumar",
    title: "Plant Manager, Steel Fabricators, Noida",
    text: "Unique Engineering erected two EOT cranes at our plant within the agreed timeline. Their team was professional, safety-conscious, and the commissioning was flawless. Highly recommend them for any crane project.",
    initials: "RK",
    rating: 5,
  },
  {
    name: "Anil Sharma",
    title: "Factory Head, Warehouse Operations, Delhi",
    text: "We had an emergency gearbox failure on a critical crane. Unique Engineering responded within hours and had us back up and running the next morning. Their AMC service has saved us countless hours of downtime.",
    initials: "AS",
    rating: 5,
  },
  {
    name: "Praveen Mehta",
    title: "Operations Director, Logistics Park, Gurgaon",
    text: "Their VFD installation work transformed our overhead crane operations. Energy costs dropped significantly and the crane runs smoother than ever. Technical team is knowledgeable and well-trained.",
    initials: "PM",
    rating: 4.5,
  },
  {
    name: "Suresh Gupta",
    title: "CEO, Infrastructure Contractors, Pune",
    text: "Mr. Pankaj and his team carried out the crane relocation at our new facility with zero incidents. The safety protocols followed were exemplary. We've since signed a full AMC with them.",
    initials: "SG",
    rating: 5,
  },
  {
    name: "Vikram Joshi",
    title: "Procurement Head, EPC Contractor, Mumbai",
    text: "We've worked with Unique Engineering on 3 major projects across different states. Their pan-India capability and consistent quality make them our go-to partner for all crane-related work.",
    initials: "VJ",
    rating: 5,
  },
];

// ==================== BLOG ====================
export interface BlogPost {
  tag: string;
  title: string;
  excerpt: string;
  date: string;
  icon: string;
  image: string;
}

export const blogPosts: BlogPost[] = [
  {
    tag: "Crane Safety",
    title: "5 Critical Crane Inspection Checklist Items",
    excerpt:
      "Routine crane inspections are vital to prevent on-site accidents and extend equipment life...",
    date: "March 2025",
    icon: "Factory",
    image: "/blog/crane-safety.png",
  },
  {
    tag: "Maintenance",
    title: "When Should You Replace Your Crane Gearbox?",
    excerpt:
      "Gearbox failure is one of the top causes of crane downtime. Learn the warning signs...",
    date: "February 2025",
    icon: "Cog",
    image: "/blog/gearbox-repair.png",
  },
  {
    tag: "Technology",
    title: "How VFDs Improve Crane Efficiency & Safety",
    excerpt:
      "Variable frequency drives reduce mechanical stress and improve speed control for cranes...",
    date: "January 2025",
    icon: "Zap",
    image: "/blog/vfd-efficiency.png",
  },
];

// ==================== TIMELINE ====================
export interface TimelineEntry {
  year: string;
  title: string;
  description: string;
}

export const timeline: TimelineEntry[] = [
  {
    year: "2010",
    title: "Founded in Delhi NCR",
    description:
      "Unique Engineering was established by Mr. Pankaj Kumar, starting with crane erection services for local industrial clients in the Delhi NCR region.",
  },
  {
    year: "2013",
    title: "Expanded to Gearbox & Mechanical Services",
    description:
      "Added gearbox supply, repair, and mechanical maintenance services to meet growing client demand across UP and Haryana.",
  },
  {
    year: "2016",
    title: "VFD & Electrical Division Launched",
    description:
      "Established a dedicated team for variable frequency drive installations, significantly expanding the technical capabilities of the company.",
  },
  {
    year: "2019",
    title: "Pan-India Projects Begin",
    description:
      "Completed first out-of-state projects in Maharashtra and Gujarat, marking the beginning of a pan-India presence with 50+ active clients.",
  },
  {
    year: "2022",
    title: "150+ Projects Milestone",
    description:
      "Crossed the 150-project milestone across 12 states, with a growing AMC client base and repeat business from major industrial clients.",
  },
  {
    year: "2025",
    title: "Continuing to Grow",
    description:
      "Today, with 75+ trusted clients and counting, Unique Engineering continues to expand its reach, capabilities, and service quality across India.",
  },
];

// ==================== FAQ ====================
export interface FAQ {
  question: string;
  answer: string;
  category: string;
}

export const faqs: FAQ[] = [
  {
    question: "What types of cranes does Unique Engineering erect?",
    answer:
      "We erect EOT (Electric Overhead Travelling) cranes, gantry cranes, tower cranes, overhead cranes, and jib cranes of all tonnages. Our team is experienced with single-girder and double-girder configurations.",
    category: "Crane Services",
  },
  {
    question: "Do you operate outside Delhi NCR?",
    answer:
      "Yes. We operate Pan-India and have completed projects in over 12 states including Maharashtra, Gujarat, Haryana, UP, Rajasthan, Punjab, and more. We mobilise our teams to your site regardless of location.",
    category: "General",
  },
  {
    question: "What does an AMC with Unique Engineering include?",
    answer:
      "Our Annual Maintenance Contracts include scheduled preventive maintenance visits, lubrication and inspection reports, minor part replacements, 24/7 breakdown response, and a dedicated service manager assigned to your account.",
    category: "Maintenance",
  },
  {
    question: "How quickly can you respond to a breakdown?",
    answer:
      "For clients on our AMC plan in Delhi NCR, we typically respond within 2–4 hours. For Pan-India clients, we aim for a response within 24 hours. Emergency mobilisation can be arranged for critical situations.",
    category: "Maintenance",
  },
  {
    question: "Do you provide load testing and certification?",
    answer:
      "Yes. All newly erected or overhauled cranes undergo certified load testing as per IS standards. We provide full documentation for regulatory compliance and insurance purposes.",
    category: "Safety",
  },
  {
    question: "Can you handle both small and large-scale projects?",
    answer:
      "Absolutely. We work on single small-tonnage crane installations as well as large multi-crane industrial projects. Every project — big or small — receives the same level of professionalism and safety standards.",
    category: "General",
  },
];

// ==================== PROCESS STEPS ====================
export const processSteps = [
  {
    num: "01",
    title: "Site Assessment",
    description:
      "Our engineers visit to evaluate requirements, load specs, and safety conditions.",
  },
  {
    num: "02",
    title: "Custom Quotation",
    description:
      "A detailed scope and cost proposal within 24–48 hours of site assessment.",
  },
  {
    num: "03",
    title: "Execution",
    description:
      "Our trained technicians carry out the project with strict safety and quality protocols.",
  },
  {
    num: "04",
    title: "Testing & Handover",
    description:
      "Load testing, final inspection, and complete documentation handover to the client.",
  },
  {
    num: "05",
    title: "After-Service Support",
    description:
      "Ongoing support, AMC options, and rapid breakdown response whenever needed.",
  },
];

// ==================== INDUSTRIES ====================
export const industries = [
  {
    icon: "Building",
    title: "Construction Firms",
    description:
      "High-rise and infrastructure construction requiring tower and overhead crane services.",
  },
  {
    icon: "Warehouse",
    title: "Industrial Warehouses",
    description:
      "Gantry and EOT crane erection for manufacturing plants and storage facilities.",
  },
  {
    icon: "Route",
    title: "Infrastructure Projects",
    description:
      "Bridges, flyovers, and metro rail projects requiring heavy lift solutions.",
  },
  {
    icon: "HardHat",
    title: "Engineering Contractors",
    description:
      "Subcontracting and turnkey crane erection for EPC and general contractors.",
  },
  {
    icon: "Factory",
    title: "Steel & Metal",
    description:
      "Heavy-duty crane solutions for steel plants, rolling mills, and metal processing units.",
  },
  {
    icon: "Zap",
    title: "Power & Energy",
    description:
      "Crane installation and maintenance for power plants, substations, and energy infrastructure.",
  },
];

// ==================== WHY US ====================
export const whyUs = [
  {
    icon: "Timer",
    title: "Timely Execution",
    description:
      "We respect deadlines. Our team ensures projects are completed on time, every time.",
  },
  {
    icon: "Settings",
    title: "Customized Engineering",
    description:
      "Every solution is tailored to your specific project requirements and budget.",
  },
  {
    icon: "MapPin",
    title: "Pan-India Reach",
    description:
      "Active across Delhi NCR and across India with a growing pan-India footprint.",
  },
  {
    icon: "Award",
    title: "Decade of Experience",
    description:
      "10+ years of hands-on expertise in crane and mechanical engineering systems.",
  },
];

// ==================== CORE VALUES ====================
export const coreValues = [
  {
    icon: "Shield",
    title: "Safety First",
    description:
      "Every project begins and ends with safety. We follow IS standards and factory safety regulations on every site.",
  },
  {
    icon: "Star",
    title: "Quality Work",
    description:
      "Meticulous precision in every installation. We don't cut corners — our certifications prove it.",
  },
  {
    icon: "Handshake",
    title: "Client Partnership",
    description:
      "We build long-term relationships. Many of our clients have been with us for over 5 years.",
  },
  {
    icon: "Lightbulb",
    title: "Innovation",
    description:
      "Continuously adopting newer technologies — from VFDs to remote monitoring — to serve clients better.",
  },
];
