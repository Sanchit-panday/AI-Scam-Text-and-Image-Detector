"use client"
import { motion } from 'framer-motion';
import { Mail, MessagesSquare, Code } from 'lucide-react';
const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.2,
        },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease: 'easeOut' as const },
    },
};
const fadeUp = {
    hidden: {
        opacity: 0,
        y: 40,
    },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.8,
            ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
        },
    },
};

function page() {
    return (
        <>
            <section className="pt-10 pb-20 px-4 sm:px-6 lg:px-8">
                <motion.div
                    // variants={containerVariants}
                    // initial="hidden"
                    // animate="visible"
                    className="max-w-200 mx-auto text-center"
                >
                    <motion.div variants={itemVariants}>
                        <motion.div
                            // initial={{ opacity: 0, y: 10 }}
                            // whileInView={{ opacity: 1, y: 0 }}
                            // viewport={{ once: true }}
                            // transition={{ duration: 0.6, ease: 'easeOut' as const }}
                            className="text-blue-500/70 text-lg mb-4"
                        >
                    //<span className='text-foreground/50'> Get in touch </span>//
                        </motion.div>
                    </motion.div>

                    <motion.h1
                        // variants={itemVariants}
                        className="text-5xl sm:text-6xl lg:text-[72px] font-medium leading-tight lg:leading-[80.28px] text-white mb-6"
                    >
                        Contact {" "}<span className="text-blue-500">Sanchit</span>
                    </motion.h1>

                    <motion.p
                        variants={itemVariants}
                        className="text-cyber-text-primary text-lg max-w-170 mx-auto leading-relaxed"
                    >
                        Hi, I'm Sanchit, founder of Mildy AI.<br />You can talk to me: how do you use Mildy AI;<br />Contact me for: more about the commercial version;<br />Anyway,Look forward to getting in touch with me through the following ways.
                    </motion.p>
                </motion.div>
            </section>
            <motion.div
            // variants={containerVariants}
            // initial="hidden"
            // animate="visible"
            >
                <motion.section
                    variants={fadeUp}
                    className='flex flex-col gap-10 space-y-4'>
                    <div className='flex flex-col items-center'>
                        <div className='flex justify-center mb-4 gap-2 font-semi-bold'>
                            <Mail className='' />
                            EMAIL
                        </div>
                        <div>
                            <a href="mailto:mildyai.help@outlook.com" className='bg-gray-600/70 py-1 rounded px-4' target='_blank'>mildyai.help@outlook.com</a>
                        </div>
                    </div>
                    <div className='flex flex-col items-center'>
                        <div className='flex justify-center mb-4 gap-2 font-semi-bold'>
                            <MessagesSquare className='' />
                            Discord
                        </div>
                        <div>
                            <a href="https://discord.gg/nxpMtBrdb7" className='bg-gray-600/70 py-1 rounded px-4' target='_blank'>https://discord.gg/nxpMtBrdb7</a>
                        </div>
                    </div>
                    <div className='flex flex-col items-center'>
                        <div className='flex justify-center mb-4 gap-2 font-semi-bold'>
                            <Code className='' />
                            Github
                        </div>
                        <div>
                            <a href="https://github.com/Sanchit-panday" className='bg-gray-600/70 py-1 rounded px-4' target='_blank'>@Sanchit</a>
                        </div>
                    </div>
                </motion.section>
            </motion.div>

        </>
    )
}

export default page