"use client"

import { motion, useAnimation } from 'framer-motion';
import { Mail, MessagesSquare, Code, ChevronLeft, ChevronRight } from 'lucide-react';
import BlogCard from './BlogCard';

import { blogList, BlogItem } from './blogList';
import {
    useEffect,
    useRef,
    useState
} from 'react';

const containerVariants = {
    hidden: {
        opacity: 0

    },
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
    exit: {
        opacity: 1,
        y: 0,
    }
};

const variants = {
    hidden: {
        opacity: 0,
        y: 20,
    },

    visible: {
        opacity: 1,
        y: 0,

        transition: {
            duration: 0.6,
        },
    },
};


function page() {
    const scrollRef = useRef<HTMLDivElement>(null);
    const [canScrollLeft, setCanScrollLeft] =
        useState(false);

    const [canScrollRight, setCanScrollRight] =
        useState(false);
    const checkScroll = () => {
        if (!scrollRef.current) return;

        const el = scrollRef.current;

        setCanScrollLeft(el.scrollLeft > 0);

        setCanScrollRight(
            el.scrollLeft + el.clientWidth <
            el.scrollWidth - 1
        );
    };
    useEffect(() => {
        checkScroll();

        const el = scrollRef.current;

        if (!el) return;

        el.addEventListener("scroll", checkScroll);

        window.addEventListener(
            "resize",
            checkScroll
        );

        return () => {
            el.removeEventListener(
                "scroll",
                checkScroll
            );

            window.removeEventListener(
                "resize",
                checkScroll
            );
        };
    }, []);


    const scroll = (direction: "left" | "right") => {
        if (!scrollRef.current) return;

        const amount = 350;

        scrollRef.current.scrollBy({
            left:
                direction === "right"
                    ? amount
                    : -amount,
            behavior: "smooth",
        });
    };

    return (
        <>
            <section className="pt-10 pb-20 px-4 sm:px-6 lg:px-8">
                <motion.div
                    variants={containerVariants}
                    // initial="hidden"
                    // animate="visible"
                    className="max-w-200 mx-auto text-center"
                >
                    <motion.div variants={itemVariants}
                        className="text-blue-500/70 text-lg mb-4">
                    //<span className='text-foreground/50'> Blog posts </span>//
                    </motion.div>

                    <motion.h1
                        variants={itemVariants}
                        className="text-4xl sm:text-5xl lg:text-[64px] font-medium leading-tight lg:leading-[80.28px] text-white mb-6"
                    >
                        Browse our<p className="text-blue-500">News<span className='text-white'> & </span>Articles</p>
                    </motion.h1>

                    <motion.p
                        variants={itemVariants}
                        className="text-gray-400/90 text-lg max-w-170 mx-auto leading-relaxed"
                    >
                        Product updates, launch posts and technical deep dives
                    </motion.p>
                </motion.div>
            </section>
            <motion.div
                variants={containerVariants}
                // initial="hidden"
                // animate="visible"
                className='flex flex-col gap-7 mb-15'>
                <motion.div variants={fadeUp}
                    className='text-blue-500/70'>
                    //<span className='text-foreground/90'> All articles </span>//
                </motion.div>
                <motion.div variants={fadeUp}
                >
                    <div className="relative">
                        {canScrollLeft && (
                            <button
                                onClick={() => scroll("left")}
                                className="hidden md:flex absolute left-0 top-1/2 z-10 -translate-y-1/2 rounded-full bg-gray-700/60 hover:bg-gray-400/40 transition-all duration-300 ease-in-out p-2 backdrop-blur">
                                <ChevronLeft />
                            </button>
                        )}
                        {canScrollRight && (
                            <button
                                onClick={() => scroll("right")}
                                className="hidden md:flex absolute right-0 top-1/2 z-10 -translate-y-1/2 rounded-full bg-gray-700/60 hover:bg-gray-400/40 transition-all duration-300 ease-in-out p-2 backdrop-blur">
                                <ChevronRight />
                            </button>
                        )}

                        <div
                            ref={scrollRef}
                            className="flex gap-7 overflow-x-auto scroll-smooth no-scrollbar"
                        >
                            {blogList.map((blog: BlogItem) => (
                                <div
                                    key={blog.id}
                                    className="flex items-stretch shrink-0 w-[320px]"
                                >
                                    <BlogCard
                                        image={blog.image}
                                        slug={blog.slug}
                                        id={blog.id}
                                        title={blog.title}
                                        description={blog.description}
                                        date={blog.date}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </motion.div>
            </motion.div>
            {/* upcoming Feature */}
            {/* <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className='bg-[#0C0C0C]'>
                <motion.div variants={fadeUp}
                    className='text-blue-500/70'>
                    //<span className='text-foreground/90'> Newsletter </span>//
                </motion.div>
            </motion.div> */}
        </>
    )
}

export default page