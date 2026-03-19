import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiExternalLink, FiGithub, FiX } from 'react-icons/fi';
import TiltCard from './TiltCard';
import { ProjectsBackground } from './Backgrounds';

const projects = [
    {
        id: "01",
        title: "🏋️ Fitness Sports Center",
        date: "2026",
        tags: ["React 19", "Framer Motion", "Vanilla CSS", "Responsive"],
        desc: "A premium, responsive single-page gym website featuring a dark luxury athletic aesthetic, smooth Framer Motion animations, dynamic filtering, and advanced form handling.",
        demoLink: "https://fitness-sportsweb.vercel.app/",
        githubLink: "https://github.com/cheshanth-14/fitness_web"
    },
    {
        id: "02",
        title: "🐾 Pet Buddy Website",
        date: "2025",
        tags: ["React", "Tailwind CSS", "SVG", "Animation", "Responsive"],
        desc: "Built a pet services landing page with React and Tailwind CSS. Features custom SVG logo/illustrations, fully responsive layout, and smooth animated micro-interactions.",
        demoLink: "http://pettbuddy.lk/",
        githubLink: "https://github.com/cheshanth-14"
    },
    {
        id: "03",
        title: "🏠 Estate Agent App",
        date: "2024–2025",
        tags: ["React", "CSS", "Real Estate", "Responsive"],
        desc: "A real estate web application built with React. Browse property listings, filter by location and price, and view detailed property pages with image galleries and agent contact info.",
        demoLink: "https://cheshanth-14.github.io/estate-agent-app/",
        githubLink: "https://github.com/cheshanth-14/estate-agent-app"
    },
    {
        id: "04",
        title: "📊 Nextage Admin Panel",
        date: "2026",
        tags: ["React", "Tailwind CSS", "Firebase", "Recharts", "PWA"],
        desc: "A modern admin panel featuring robust data visualization with Recharts, client-side routing, and PWA support. Built with React, Vite, Tailwind CSS, and Firebase.",
        demoLink: "https://nextage-admin.vercel.app/",
        githubLink: "https://github.com/cheshanth-14/nextage_git"
    },
    {
        id: "05",
        title: "🚗 Traffic Flow Analysis",
        date: "2024–2025",
        tags: ["Python", "Tkinter", "CSV", "Data Visualization"],
        desc: "Python-based app analyzing traffic data from CSV files. Generates vehicle count stats and peak hour reports with Tkinter visualizations and automated batch processing.",
    },
    {
        id: "06",
        title: "🔬 Percolation Simulation",
        date: "2023–2024",
        tags: ["Python", "Algorithms", "Grid Systems"],
        desc: "Generates random value grids, detects column-wise percolation (top-to-bottom connectivity), and saves results to text files.",
    }
];

export default function Projects() {
    const [selectedProject, setSelectedProject] = useState(null);

    return (
        <section id="projects" className="py-24 relative z-10 overflow-hidden">
            <ProjectsBackground />
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-16">

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="mb-16 text-center lg:text-left"
                >
                    <h2 className="text-4xl lg:text-5xl font-heading font-bold text-transparent bg-clip-text bg-gradient-to-r from-accentTeal to-accentViolet inline-block">
                        Featured Projects
                    </h2>
                    <div className="w-48 h-1 bg-accentAmber mt-4 mx-auto lg:mx-0 rounded-full drop-shadow-[0_0_8px_rgba(245,158,11,0.8)]" />
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {projects.map((project, index) => (
                        <motion.div
                            key={project.id}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            className="h-full"
                        >
                            <div 
                                onClick={() => setSelectedProject(project)}
                                className="glass-card cursor-pointer relative flex flex-col h-full min-h-[400px] rounded-3xl overflow-hidden group border border-white/5 hover:border-accentTeal/30 hover:shadow-[0_20px_50px_-20px_rgba(0,245,212,0.2)] transition-all duration-500 bg-white/[0.02]"
                            >
                                {/* Animated Gradient Overlay on Hover */}
                                <div className="absolute inset-0 bg-gradient-to-br from-accentTeal/5 via-transparent to-accentViolet/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                                
                                <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-accentTeal via-accentViolet to-accentAmber transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />

                                <div className="p-8 flex flex-col flex-1 z-10 relative pointer-events-none">
                                    <div className="flex justify-between items-center mb-8">
                                        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-accentTeal/10 to-accentViolet/10 flex items-center justify-center border border-white/10 group-hover:border-accentTeal/40 transition-colors duration-500">
                                            <span className="text-xl font-mono font-bold text-accentTeal">
                                                {project.id}
                                            </span>
                                        </div>
                                        <span className="text-xs font-mono text-textMuted uppercase tracking-widest bg-white/5 py-1 px-3 rounded-full border border-white/5">
                                            {project.date}
                                        </span>
                                    </div>

                                    <h3 className="text-2xl font-heading font-black text-textPrimary mb-3 leading-tight group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-accentTeal group-hover:to-accentViolet transition-all duration-300">
                                        {project.title}
                                    </h3>

                                    <p className="text-textMuted text-base leading-relaxed mb-8 line-clamp-4 group-hover:text-textPrimary transition-colors duration-300">
                                        {project.desc}
                                    </p>

                                    <div className="flex flex-wrap gap-2 mt-auto mb-10">
                                        {project.tags.map((tag) => (
                                            <span key={tag} className="px-3 py-1.5 bg-bgPrimary/40 border border-white/5 rounded-xl text-[11px] font-mono text-textMuted group-hover:text-accentTeal group-hover:border-accentTeal/20 transition-all duration-300 shadow-sm">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>

                                    <div className="grid grid-cols-2 gap-4 pointer-events-auto">
                                        {project.demoLink && (
                                            <a
                                                href={project.demoLink}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                onClick={(e) => e.stopPropagation()}
                                                className="py-3 px-4 bg-accentTeal text-bgPrimary font-bold rounded-xl flex items-center justify-center gap-2 hover:shadow-[0_8px_20px_rgba(0,245,212,0.4)] hover:-translate-y-1 transition-all duration-300 text-sm overflow-hidden whitespace-nowrap"
                                            >
                                                <span>Live Demo</span> <FiExternalLink className="shrink-0" />
                                            </a>
                                        )}
                                        {project.githubLink && (
                                            <a
                                                href={project.githubLink}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                onClick={(e) => e.stopPropagation()}
                                                className="py-3 px-4 bg-white/5 border border-white/10 hover:border-accentViolet/50 text-textPrimary hover:text-white font-bold rounded-xl flex items-center justify-center gap-2 hover:-translate-y-1 transition-all duration-300 text-sm overflow-hidden whitespace-nowrap"
                                            >
                                                <span>Source</span> <FiGithub className="shrink-0" />
                                            </a>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mt-20 text-center"
                >
                    <motion.a
                        href="https://github.com/cheshanth-14"
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(0,245,212,0.3)" }}
                        whileTap={{ scale: 0.95 }}
                        className="inline-flex items-center gap-2 px-8 py-4 bg-bgPrimary border border-accentTeal/30 text-accentTeal font-bold rounded-full hover:bg-accentTeal/5 hover:border-accentTeal transition-all"
                    >
                        See More on GitHub <FiGithub />
                    </motion.a>
                </motion.div>
            </div>

            {/* Expanded Project Modal using Framer Motion */}
            <AnimatePresence>
                {selectedProject && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setSelectedProject(null)}
                        className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-bgPrimary/80 backdrop-blur-md"
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.9, opacity: 0, y: 20 }}
                            onClick={(e) => e.stopPropagation()}
                            className="bg-[#0f0f0f] border border-white/10 p-8 rounded-3xl max-w-2xl w-full relative shadow-[0_0_50px_rgba(0,245,212,0.1)]"
                        >
                            <button
                                onClick={() => setSelectedProject(null)}
                                className="absolute top-4 right-4 p-2 text-textMuted hover:text-white bg-white/5 rounded-full hover:bg-white/10 transition-colors"
                            >
                                <FiX className="text-xl" />
                            </button>

                            <div className="flex justify-between items-center mb-6 pr-10">
                                <span className="text-accentTeal font-mono font-bold text-xl">
                                    Project {selectedProject.id}
                                </span>
                                <span className="text-sm font-mono text-textMuted bg-white/5 py-1 px-3 rounded-full border border-white/5">
                                    {selectedProject.date}
                                </span>
                            </div>

                            <h2 className="text-3xl font-heading font-black text-transparent bg-clip-text bg-gradient-to-r from-accentTeal to-accentViolet mb-4">
                                {selectedProject.title}
                            </h2>

                            <div className="flex flex-wrap gap-2 mb-6">
                                {selectedProject.tags.map((tag) => (
                                    <span key={tag} className="px-3 py-1 font-mono text-xs text-textMuted bg-white/5 rounded-xl border border-white/5">
                                        {tag}
                                    </span>
                                ))}
                            </div>

                            <p className="text-textPrimary text-lg leading-relaxed mb-8">
                                {selectedProject.desc}
                            </p>

                            <div className="flex gap-4">
                                {selectedProject.demoLink && (
                                    <a
                                        href={selectedProject.demoLink}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="py-3 px-6 bg-accentTeal text-bgPrimary font-bold rounded-xl flex items-center gap-2 hover:shadow-[0_8px_20px_rgba(0,245,212,0.4)] transition-all"
                                    >
                                        Live Demo <FiExternalLink />
                                    </a>
                                )}
                                {selectedProject.githubLink && (
                                    <a
                                        href={selectedProject.githubLink}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="py-3 px-6 bg-white/5 border border-white/10 text-white font-bold rounded-xl flex items-center gap-2 hover:bg-white/10 transition-all"
                                    >
                                        Source Code <FiGithub />
                                    </a>
                                )}
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
}
