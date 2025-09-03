import React, { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Github, Linkedin, Mail, Smartphone, Download, Sun, Moon, Filter, Search, ExternalLink, Code2, Cpu, Network, Server, Database, Flame, Shield, Cloud, Globe, Wrench } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

// --------------------
// 🎯 Editable Data (Updated with Zeyad's real info)
// --------------------
const PROFILE = {
  name: "Zeyad Bilal",
  role: "Telecom & Networks Engineer | DevOps & Cloud Enthusiast",
  summary:
    "Engineer specializing in telecommunications, electronics and computing. Trained across networking, virtualization, cloud (AWS & Huawei), DevOps toolchain and observability. I build practical, production-minded solutions — from low-level assembly projects to containerized services and monitoring stacks — and I bring both technical depth and soft-skills gained from intensive industry trainings.",
  location: "Cairo, Egypt",
  email: "zeyad4bilal@gmail.com",
  phone: "+20 100 000 0000",
  socials: {
    github: "https://github.com/zeyadbilal",
    linkedin: "https://www.linkedin.com/in/zeyadbilal/",
  },
  resumeUrl: "https://drive.google.com/file/d/1gSPd_wDVLIiRcsxL-UHQCHQZiqYrijwN/view?usp=drive_link",
  avatar:
    "https://drive.google.com/uc?export=view&id=1ATVmvEI_81CE5jGFRosZSUiy7GPMsc0A",
  languages: [
    { name: "Arabic", level: "Native" },
    { name: "English", level: "Professional" },
  ],
};

const SKILLS = [
  { name: "Linux Administration & Bash", level: 88, icon: <Server className="h-4 w-4" />, tags: ["Linux", "Bash", "Admin"] },
  { name: "Docker & Containers", level: 85, icon: <Database className="h-4 w-4" />, tags: ["Docker", "Containerization"] },
  { name: "Kubernetes (K8s)", level: 70, icon: <Cloud className="h-4 w-4" />, tags: ["Orchestration", "K8s"] },
  { name: "Ansible & Configuration Mgmt", level: 75, icon: <Wrench className="h-4 w-4" />, tags: ["Ansible", "Automation"] },
  { name: "Terraform (IaC)", level: 72, icon: <Network className="h-4 w-4" />, tags: ["Terraform", "IaC"] },
  { name: "Prometheus & Grafana", level: 78, icon: <Flame className="h-4 w-4" />, tags: ["Monitoring", "PromQL"] },
  { name: "Jenkins CI/CD", level: 70, icon: <Code2 className="h-4 w-4" />, tags: ["CI/CD", "Pipelines"] },
  { name: "AWS & Huawei Cloud", level: 80, icon: <Cloud className="h-4 w-4" />, tags: ["AWS", "Huawei"] },
  { name: "Virtualization (VMware/Hyper-V/KVM)", level: 78, icon: <Cpu className="h-4 w-4" />, tags: ["Virtualization"] },
  { name: "Networking (CCNA-level)", level: 82, icon: <Network className="h-4 w-4" />, tags: ["Routing", "Switching", "VLAN"] },
  { name: "Python (Scripting & Tools)", level: 80, icon: <Code2 className="h-4 w-4" />, tags: ["Python", "Automation"] },
  { name: "MIPS Assembly (Academic)", level: 60, icon: <Cpu className="h-4 w-4" />, tags: ["Low-level"] },
];

const CERTS = [
  { title: "Red Hat System Admin 1", org: "MaharaTech / ITI Learning Platform", year: "2025" },
  { title: "CCNA 200-301", org: "Udemy", year: "2025" },
  { title: "HCIA-Security V4.0", org: "Huawei / NTI", year: "2025" },
  { title: "AWS Cloud Practitioner (CLF-C01)", org: "AWS Academy / AWS Skill Builder / NTI", year: "2025" },
];

const EXPERIENCE = [
  {
    role: "Student Engineer — Labs & Projects",
    company: "Faculty of Engineering",
    period: "2023 – Present",
    bullets: [
      "Designed and configured LAN/WAN topologies in Packet Tracer with VLANs, trunking, and inter-VLAN routing.",
      "Built containerized web apps with Docker; automated local development workflows.",
      "Implemented monitoring dashboards using Grafana connected to Prometheus metrics.",
    ],
  },
];

const PROJECTS = [
  {
    title: "Smart Garage Monitor",
    date: "March 2025",
    description:
      "Simulated parking analytics with Python, exposing custom Prometheus metrics and visualizing trends in Grafana with alerting rules for capacity thresholds.",
    stack: ["Python", "Prometheus", "Grafana"],
    impact: "Real-time dashboard with email alerts and 30-day trend analysis.",
    links: { repo: "https://github.com/zeyadbilal/garage-monitor", demo: "#" },
    image: "https://images.unsplash.com/photo-1506521781263-d8422e82f27a?q=80&w=1200&auto=format&fit=crop",
    tags: ["Observability", "Prometheus", "Grafana"]
  },
  {
    title: "Dockerized Flask API for Item Management",
    date: "March 2025",
    description:
      "Flask API with POST/DELETE endpoints, containerized for reproducible deployment and pushed to cloud environment.",
    stack: ["Flask", "Docker"],
    impact: "One-command container setup for easy deployment and testing.",
    links: { repo: "https://github.com/zeyadbilal/flask-item-api", demo: "#" },
    image: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?q=80&w=1200&auto=format&fit=crop",
    tags: ["Backend", "Docker"]
  },
  {
    title: "S3 Screen Recorder & Uploader",
    date: "February 2025",
    description:
      "Python-based screen recorder that merges audio/video, uploads to AWS S3 and returns shareable links; includes GUI tooling for uploads.",
    stack: ["Python", "AWS S3", "Tkinter"],
    impact: "Automated multimedia pipeline with cloud storage integration.",
    links: { repo: "https://github.com/zeyadbilal/s3-recorder", demo: "#" },
    image: "https://images.unsplash.com/photo-1504639725590-34d0984388bd?q=80&w=1200&auto=format&fit=crop",
    tags: ["Python", "AWS"]
  },
  {
    title: "S3 Static Website Hosting GUI",
    date: "February 2025",
    description:
      "GUI app to upload files and auto-configure AWS S3 for static hosting, built with Python and boto3.",
    stack: ["Python", "boto3", "AWS"],
    impact: "Simplified static hosting workflow for non-technical users.",
    links: { repo: "https://github.com/zeyadbilal/s3-gui", demo: "#" },
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1200&auto=format&fit=crop",
    tags: ["AWS", "GUI"]
  },
  {
    title: "Bash Server Network Configuration",
    date: "July 2025",
    description: "Bash script using nmcli to set static IPs, DNS and routes for server provisioning.",
    stack: ["Bash", "Linux"],
    impact: "Automates network setup for VMs and servers.",
    links: { repo: "https://github.com/zeyadbilal/bash-network-config", demo: "#" },
    image: "https://images.unsplash.com/photo-1518779578993-ec3579fee39f?q=80&w=1200&auto=format&fit=crop",
    tags: ["Bash", "Networking"]
  },
  {
    title: "Bash System Resource Monitor",
    date: "July 2025",
    description: "Real-time resource monitor with threshold alerts parsed via awk/sed for quick diagnostics.",
    stack: ["Bash"],
    impact: "Lightweight tool for on-the-spot system checks.",
    links: { repo: "https://github.com/zeyadbilal/bash-monitor", demo: "#" },
    image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?q=80&w=1200&auto=format&fit=crop",
    tags: ["Bash", "Monitoring"]
  },
  {
    title: "Bash Log Rotation & Cleanup",
    date: "July 2025",
    description: "Automated rotation, compression and cleanup of logs with cron scheduling.",
    stack: ["Bash", "Linux"],
    impact: "Keeps log directories manageable and auditable.",
    links: { repo: "https://github.com/zeyadbilal/log-rotate", demo: "#" },
    image: "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?q=80&w=1200&auto=format&fit=crop",
    tags: ["Bash", "Maintenance"]
  },
  {
    title: "Bash System Backup (rsync over SSH)",
    date: "July 2025",
    description: "Backup script using rsync over SSH with logging and scheduled weekly runs via crontab.",
    stack: ["Bash", "rsync", "SSH"],
    impact: "Reliable, logged backups suitable for password-based SSH environments.",
    links: { repo: "https://github.com/zeyadbilal/backup-script", demo: "#" },
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=1200&auto=format&fit=crop",
    tags: ["Backup", "Bash"]
  }
];

const TRAINING = [
  {
    title: "DEPI — Digital Egypt Pioneers Initiative (DevOps Track, 6 months, Ongoing)",
    org: "DEPI",
    period: "2025 (6 months)",
    details: `Enhanced soft skills in communication, teamwork, presentation, freelancing, and personal branding.

Built a solid foundation in Linux system administration (user management, permissions, services) and Bash scripting for automation.

Mastered version control with Git & GitHub, including branching strategies, collaboration, and repository management.

Gained hands-on experience in containerization with Docker and developed microservices using Flask inside containers.

Learned configuration management with Ansible (playbooks, roles, automation) and structured deployments using YAML.

Practiced Infrastructure as Code (IaC) with Terraform for provisioning scalable cloud infrastructure.

Designed and implemented CI/CD pipelines using Jenkins to automate build, test, and deployment workflows.

Acquired skills in container orchestration with Kubernetes (deployments, services, and scaling).

Implemented monitoring and observability using Prometheus (metrics collection, alerting rules) and Grafana (dashboards, visualizations).

Completed a comprehensive DevOps training covering toolchain and soft skills for production environments.
`,
  },
  {
    title: "MCIT Training — Infrastructure, Networking, VoIP, Datacenter & Security",
    org: "MCIT",
    period: "2025",
    details: `Enhanced teamwork and communication.

Hands-on infrastructure networking (routing, switching, administration) and datacenter fundamentals (architecture, virtualization).

VoIP and wireless deployment, plus network security topics (firewalls, ACLs, best practices).

Training length: 120 hours.
`,
  },
  {
    title: "NTI — Cloud Essentials: Virtualization, AWS & Huawei",
    org: "NTI",
    period: "2025",
    details: `Practical training in datacenter virtualization (compute, storage, networking) and cloud fundamentals.

AWS Academy and Huawei HCCDA-Tech Essentials coverage with hands-on labs on both clouds.

Enhanced communication, persuasion and personal branding modules.

Training length: 120 hours (30 hours soft-skills included).
`,
  },
];

// --------------------
// 🧩 Utilities
// --------------------
const fadeIn = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4 },
};

const sectionClass = "max-w-6xl mx-auto px-4 sm:px-6 lg:px-8";

const Tag = ({ t }) => <Badge variant="secondary" className="rounded-full">{t}</Badge>;

function SkillBar({ name, level, icon, tags }) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {icon}
          <span className="font-medium">{name}</span>
        </div>
        <span className="text-sm text-muted-foreground">{level}%</span>
      </div>
      <div className="h-2 w-full rounded-full bg-muted overflow-hidden">
        <div
          className="h-2 bg-primary"
          style={{ width: `${level}%` }}
        />
      </div>
      <div className="flex flex-wrap gap-2">{tags?.map((t) => <Tag key={t} t={t} />)}</div>
    </div>
  );
}

function ProjectCard({ p }) {
  return (
    <Card className="overflow-hidden hover:shadow-xl transition-shadow duration-300">
      <img src={p.image} alt={p.title} className="h-40 w-full object-cover" />
      <CardHeader>
        <CardTitle className="flex items-center justify-between text-lg">
          {p.title} <span className="text-xs text-muted-foreground">{p.date}</span>
          <div className="flex gap-2">
            {p.links?.repo && (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <a href={p.links.repo} target="_blank" rel="noreferrer">
                      <Button variant="outline" size="icon"><Github className="h-4 w-4" /></Button>
                    </a>
                  </TooltipTrigger>
                  <TooltipContent>Repository</TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}
            {p.links?.demo && (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <a href={p.links.demo} target="_blank" rel="noreferrer">
                      <Button size="icon"><ExternalLink className="h-4 w-4" /></Button>
                    </a>
                  </TooltipTrigger>
                  <TooltipContent>Live Demo</TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground">{p.description}</p>
        <div>
          <div className="flex flex-wrap gap-2 mb-2">
            {p.tags?.map((t) => <Tag key={t} t={t} />)}
          </div>
          <div className="text-xs text-muted-foreground">Impact: {p.impact}</div>
        </div>
      </CardContent>
      <CardFooter className="flex flex-wrap gap-2 border-t pt-3">
        {p.stack.map((s) => (
          <Badge key={s} variant="outline" className="rounded-full">{s}</Badge>
        ))}
      </CardFooter>
    </Card>
  );
}

function Timeline({ items }) {
  return (
    <div className="relative border-s pl-6 space-y-8">
      {items.map((item, idx) => (
        <div key={idx} className="relative">
          <span className="absolute -left-[9px] top-1.5 h-4 w-4 rounded-full bg-primary" />
          <h4 className="font-semibold">{item.title || item.role}</h4>
          <div className="text-sm text-muted-foreground mb-1">
            {(item.org || item.company) + " • " + item.period}
          </div>
          {item.details && <p className="text-sm text-muted-foreground whitespace-pre-line">{item.details}</p>}
          {item.bullets && (
            <ul className="list-disc ms-4 text-sm text-muted-foreground space-y-1">
              {item.bullets.map((b, i) => <li key={i}>{b}</li>)}
            </ul>
          )}
        </div>
      ))}
    </div>
  );
}

function Header({ onToggleTheme, theme }) {
  return (
    <header className="sticky top-0 z-30 backdrop-blur bg-background/70 border-b">
      <div className={`${sectionClass} py-3 flex items-center justify-between`}>
        <div className="flex items-center gap-3">
          <img src={PROFILE.avatar} alt="avatar" className="h-10 w-10 rounded-full object-cover" />
          <div>
            <div className="font-bold leading-tight">{PROFILE.name}</div>
            <div className="text-xs text-muted-foreground">{PROFILE.role}</div>
          </div>
        </div>
        <nav className="hidden md:flex items-center gap-4 text-sm">
          <a href="#about" className="hover:underline">About</a>
          <a href="#skills" className="hover:underline">Skills</a>
          <a href="#projects" className="hover:underline">Projects</a>
          <a href="#experience" className="hover:underline">Experience</a>
          <a href="#education" className="hover:underline">Education</a>
          <a href="#certs" className="hover:underline">Certificates</a>
          <a href="#contact" className="hover:underline">Contact</a>
        </nav>
        <div className="flex items-center gap-2">
          <a href={PROFILE.socials.github} target="_blank" rel="noreferrer">
            <Button variant="outline" size="icon"><Github className="h-4 w-4" /></Button>
          </a>
          <a href={PROFILE.socials.linkedin} target="_blank" rel="noreferrer">
            <Button variant="outline" size="icon"><Linkedin className="h-4 w-4" /></Button>
          </a>
          <Button variant="outline" size="icon" onClick={onToggleTheme} aria-label="Toggle theme">
            {theme === "light" ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
          </Button>
        </div>
      </div>
    </header>
  );
}

export default function Portfolio() {
  const [theme, setTheme] = useState("dark");
  const [query, setQuery] = useState("");
  const [activeTag, setActiveTag] = useState("all");

  const tags = useMemo(() => {
    const t = new Set(["all"]);
    PROJECTS.forEach((p) => p.tags?.forEach((x) => t.add(x)));
    return Array.from(t);
  }, []);

  const filtered = useMemo(() => {
    return PROJECTS.filter((p) => {
      const hitTag = activeTag === "all" || p.tags?.includes(activeTag);
      const hitQuery = query
        ? [p.title, p.description, ...(p.stack || []), ...(p.tags || [])]
            .join(" ")
            .toLowerCase()
            .includes(query.toLowerCase())
        : true;
      return hitTag && hitQuery;
    });
  }, [query, activeTag]);

  return (
    <div className={theme === "dark" ? "dark" : ""}>
      <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
        <Header
          onToggleTheme={() => setTheme((t) => (t === "light" ? "dark" : "light"))}
          theme={theme}
        />

        {/* Hero */}
        <section id="about" className={`${sectionClass} pt-10 pb-16`}>
          <div className="grid md:grid-cols-[1.2fr,0.8fr] gap-8 items-center">
            <motion.div {...fadeIn} className="space-y-6">
              <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                Hi, I'm {PROFILE.name.split(" ")[0]} — <span className="text-primary">{PROFILE.role}</span>
              </h1>
              <p className="text-muted-foreground leading-relaxed">{PROFILE.summary}</p>
              <div className="flex flex-wrap gap-3">
                <a href={`mailto:${PROFILE.email}`}>
                  <Button><Mail className="h-4 w-4 mr-2" /> Email Me</Button>
                </a>
                <a href={PROFILE.resumeUrl} target="_blank" rel="noreferrer">
                  <Button variant="outline"><Download className="h-4 w-4 mr-2" /> Download CV</Button>
                </a>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="ghost"><Smartphone className="h-4 w-4 mr-2" /> Contact</Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Contact Details</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-2 text-sm">
                      <div>Email: <a className="underline" href={`mailto:${PROFILE.email}`}>{PROFILE.email}</a></div>
                      <div>Phone: {PROFILE.phone}</div>
                      <div>Location: {PROFILE.location}</div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </motion.div>

            <motion.div {...fadeIn} className="md:justify-self-end">
              <Card className="overflow-hidden shadow-xl">
                <img src={PROFILE.avatar} alt="avatar" className="h-64 w-full object-cover" />
                <CardContent className="p-4 grid grid-cols-2 gap-3">
                  <div className="text-sm text-muted-foreground">Languages</div>
                  <div className="flex flex-wrap gap-2">
                    {PROFILE.languages.map((l) => (
                      <Badge key={l.name} variant="outline" className="rounded-full">{l.name} — {l.level}</Badge>
                    ))}
                  </div>
                  <div className="text-sm text-muted-foreground">Focus</div>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary" className="rounded-full">Networking</Badge>
                    <Badge variant="secondary" className="rounded-full">DevOps</Badge>
                    <Badge variant="secondary" className="rounded-full">Cloud</Badge>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </section>

        {/* Skills */}
        <section id="skills" className="bg-muted/30 py-14">
          <div className={sectionClass}>
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold">Skills</h2>
              <div className="text-sm text-muted-foreground">Updated 2025</div>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {SKILLS.map((s) => (
                <motion.div key={s.name} {...fadeIn}>
                  <Card>
                    <CardContent className="p-5 space-y-3">
                      <SkillBar {...s} />
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Projects */}
        <section id="projects" className="py-14">
          <div className={sectionClass}>
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-6">
              <h2 className="text-2xl font-bold">Projects</h2>
              <div className="flex items-center gap-2 w-full md:w-auto">
                <div className="relative w-full md:w-72">
                  <Search className="h-4 w-4 absolute left-2 top-2.5 text-muted-foreground" />
                  <Input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search projects…" className="pl-8" />
                </div>
                <Tabs value={activeTag} onValueChange={setActiveTag} className="w-full md:w-auto">
                  <TabsList>
                    {tags.map((t) => (
                      <TabsTrigger key={t} value={t} className="capitalize">
                        <Filter className="h-3.5 w-3.5 mr-1" /> {t}
                      </TabsTrigger>
                    ))}
                  </TabsList>
                </Tabs>
              </div>
            </div>
            <AnimatePresence>
              <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filtered.map((p) => (
                  <motion.div key={p.title} {...fadeIn}>
                    <ProjectCard p={p} />
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
        </section>

        {/* Experience & Education */}
        <section id="experience" className="bg-muted/30 py-14">
          <div className={sectionClass}>
            <div className="grid lg:grid-cols-2 gap-10">
              <div>
                <h2 className="text-2xl font-bold mb-6">Experience</h2>
                <Timeline items={EXPERIENCE} />
              </div>
              <div id="education">
                <h2 className="text-2xl font-bold mb-6">Education & Trainings</h2>
                <div className="space-y-6">
                  <Timeline items={TRAINING} />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Certificates */}
        <section id="certs" className="py-14">
          <div className={`${sectionClass} max-w-4xl`}>
            <h2 className="text-2xl font-bold mb-6">Certificates</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {CERTS.map((c) => (
                <Card key={c.title}>
                  <CardHeader>
                    <CardTitle className="text-base">{c.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="text-sm text-muted-foreground">
                    {c.org} • {c.year}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Contact */}
        <section id="contact" className="py-14">
          <div className={`${sectionClass} max-w-3xl`}>
            <h2 className="text-2xl font-bold mb-6">Get in Touch</h2>
            <Card>
              <CardContent className="p-6 space-y-4">
                <p className="text-sm text-muted-foreground">
                  Prefer email? I usually respond within 24–48 hours.
                </p>
                <form action={`mailto:${PROFILE.email}`} method="post" encType="text/plain" className="space-y-3">
                  <div className="grid sm:grid-cols-2 gap-3">
                    <Input placeholder="Your name" required />
                    <Input type="email" placeholder="Your email" required />
                  </div>
                  <Input placeholder="Subject" required />
                  <Textarea placeholder="Message" rows={5} required />
                  <div className="flex items-center gap-3">
                    <Button type="submit">Send</Button>
                    <a href={PROFILE.socials.github} target="_blank" rel="noreferrer" className="inline-flex">
                      <Button variant="outline"><Github className="h-4 w-4 mr-2" />GitHub</Button>
                    </a>
                    <a href={PROFILE.socials.linkedin} target="_blank" rel="noreferrer" className="inline-flex">
                      <Button variant="outline"><Linkedin className="h-4 w-4 mr-2" />LinkedIn</Button>
                    </a>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t">
          <div className={`${sectionClass} py-6 text-sm text-muted-foreground flex flex-col sm:flex-row items-center justify-between gap-2`}>
            <div>© {new Date().getFullYear()} {PROFILE.name}. All rights reserved.</div>
            <div className="flex items-center gap-4">
              <span className="inline-flex items-center gap-1"><Globe className="h-4 w-4" /> {PROFILE.location}</span>
              <a href={`mailto:${PROFILE.email}`} className="underline">{PROFILE.email}</a>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
