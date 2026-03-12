import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiGithub, FiInstagram, FiLinkedin, FiDownload, FiChevronDown } from 'react-icons/fi';
import TiltCard from './TiltCard';
import { HeroBackground } from './Backgrounds';

const roles = [
    "Computer Science Undergraduate",
    "Full-Stack Developer",
    "React & React Native Developer",
    "Cricket Captain & Badminton Umpire ⚡",
    "Stage Performer 🎭"
];

export default function Hero() {
    const [currentRole, setCurrentRole] = useState(0);

    // Role switcher animation restored
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentRole((prev) => (prev + 1) % roles.length);
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    return (
        <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
            <HeroBackground />

            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-16 w-full relative z-10 flex flex-col lg:flex-row-reverse items-center justify-between gap-12 text-center lg:text-left">

                {/* Profile Photo */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.5, rotate: -10 }}
                    animate={{ opacity: 1, scale: 1, rotate: 0 }}
                    transition={{ type: "spring", stiffness: 100, damping: 15, duration: 0.8 }}
                    className="relative group w-40 h-40 sm:w-48 sm:h-48 lg:w-64 lg:h-64 shrink-0"
                >
                    <div className="w-full h-full rounded-full relative overflow-visible bg-transparent border-none p-0">
                        {/* Gradient Border (Animation stopped) */}
                        <div
                            className="absolute -inset-4 rounded-full bg-gradient-to-tr from-accentTeal via-accentViolet to-accentAmber opacity-60 blur-sm"
                        ></div>

                        {/* Inner Image Container (Not Spinning) */}
                        <div
                            className="absolute inset-0 rounded-full overflow-hidden border-4 border-bgPrimary bg-bgPrimary z-10 flex items-center justify-center shadow-[0_0_30px_rgba(0,0,0,0.5)]"
                        >
                            <img
                                src="./profile_photo.jpg"
                                alt="Jagannithy Cheshanth"
                                className="w-full h-full object-cover object-top scale-[1.1] translate-y-2 transition-transform duration-700 group-hover:scale-[1.2]"
                            />
                        </div>

                        {/* Hover Glow */}
                        <div
                            className="absolute inset-0 rounded-full bg-accentTeal/20 blur-3xl -z-10 transition-colors duration-500 group-hover:bg-accentViolet/40"
                        ></div>
                    </div>
                </motion.div>

                {/* Text Content */}
                <div className="flex-1 z-20 bg-transparent border-none p-0 cursor-default">
                    <div className="space-y-6 max-w-full">
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.1 }}
                        >
                            <motion.h2
                                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5, duration: 1 }}
                                className="text-accentTeal font-mono text-lg mb-2 tracking-wider flex items-center justify-center lg:justify-start gap-2"
                            >
                                <span className="w-8 h-[1px] bg-accentTeal hidden sm:block"></span> Hello, I'm
                            </motion.h2>
                            
                            {/* Floating Badge */}
                            <motion.div 
                                initial={{ opacity: 0, scale: 0 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 1, type: "spring" }}
                                className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accentTeal/10 border border-accentTeal/30 text-accentTeal text-[10px] sm:text-xs font-bold mb-4 lg:self-start w-fit mx-auto lg:mx-0"
                            >
                                <span className="relative flex h-2 w-2">
                                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accentTeal opacity-75"></span>
                                  <span className="relative inline-flex rounded-full h-2 w-2 bg-accentTeal"></span>
                                </span>
                                AVAILABLE FOR WORK
                            </motion.div>

                            <h1 className="text-3xl sm:text-5xl md:text-[3.5rem] lg:text-7xl font-heading font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-accentTeal to-accentViolet mb-4 leading-tight text-center lg:text-left">
                                JAGANNITHY <br className="lg:block" /> CHESHANTH
                            </h1>

                            <div className="h-12 flex items-center justify-center lg:justify-start">
                                <motion.p
                                    key={currentRole}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    className="text-xl sm:text-2xl text-textMuted font-medium text-center lg:text-left"
                                >
                                    {roles[currentRole]}
                                </motion.p>
                            </div>
                        </motion.div>

                        {/* Social Links */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.4 }}
                            className="flex items-center justify-center lg:justify-start space-x-6 py-4"
                        >
                            <SocialIcon href="https://github.com/cheshanth-14" icon={<FiGithub size={24} />} />
                            <SocialIcon href="https://www.instagram.com/cheshanth_14" icon={<FiInstagram size={24} />} />
                            <SocialIcon href="https://www.linkedin.com/in/jagannithy-cheshanth-975128304" icon={<FiLinkedin size={24} />} />
                        </motion.div>

                        {/* CTAs */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.6 }}
                            className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4"
                        >
                            <a
                                href="#projects"
                                className="w-full sm:w-auto px-8 py-3 bg-accentTeal text-bgPrimary font-bold rounded-lg hover:shadow-[0_0_20px_rgba(0,245,212,0.5)] hover:-translate-y-1 transition-all duration-300"
                            >
                                View My Work
                            </a>
                            <a
                                href="/Jagannithy_Cheshanth_CV.pdf"
                                download="Jagannithy_Cheshanth_CV.pdf"
                                className="w-full sm:w-auto px-8 py-3 border-2 border-accentViolet text-textPrimary font-bold rounded-lg hover:bg-accentViolet/10 hover:shadow-[0_0_20px_rgba(124,58,237,0.3)] hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-2"
                            >
                                <FiDownload /> Download CV
                            </a>
                        </motion.div>
                    </div>
                </div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5, duration: 1 }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2"
            >
                <a href="#about" className="text-textMuted hover:text-accentTeal transition-colors">
                    <div>
                        <FiChevronDown size={32} />
                    </div>
                </a>
            </motion.div>
        </section>
    );
}

const SocialIcon = ({ href, icon }) => (
    <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-textMuted hover:text-accentTeal transition-all duration-300 hover:scale-110 hover:drop-shadow-[0_0_8px_rgba(0,245,212,0.8)]"
    >
        {icon}
    </a>
);
