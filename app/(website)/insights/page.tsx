"use client";
import { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Clock, ChevronLeft, ChevronRight } from 'lucide-react';
import { Container, Reveal } from '@/components/primitives';
import { FinalCTA } from '@/components/home/FinalCTA';
import { SafeImage } from '@/components/common/SafeImage';
import TextType from '@/components/TextType';

const featuredPost = {
  category: 'Strategy & Trends',
  title: 'Enhancing Team Collaboration with SaaS Products: A Game-Changer for Modern Workflows',
  date: 'Aug 10',
  readTime: '10 min read',
  image: 'https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=1200'
};

const latestPosts = [
  {
    title: 'Creating an Intuitive User Interface (UI) for Your SaaS Product',
    date: 'Aug 10',
    readTime: '10 min read',
    image: 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=600'
  },
  {
    title: 'Tips for designing clear and user-friendly navigation menus.',
    date: 'Aug 10',
    readTime: '10 min read',
    image: 'https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg?auto=compress&cs=tinysrgb&w=600'
  },
  {
    title: 'Exploring how to establish a visual hierarchy that guides users.',
    date: 'Aug 10',
    readTime: '10 min read',
    image: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=600'
  },
  {
    title: 'How to use color to influence user emotions and actions.',
    date: 'Aug 10',
    readTime: '10 min read',
    image: 'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=600'
  }
];

const foundersCornerItems = [
  {
    image: 'https://images.pexels.com/photos/3182812/pexels-photo-3182812.jpeg?auto=compress&cs=tinysrgb&w=1200',
    category: 'Culture',
    title: 'Our people make the difference',
    desc: 'Building strong teams starts with empowering individuals.',
    date: 'Aug 10',
    readTime: '10 min read'
  },
  {
    image: 'https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg?auto=compress&cs=tinysrgb&w=1200',
    category: 'Design',
    title: 'Designing products people love',
    desc: 'Creating seamless experiences through thoughtful design.',
    date: 'Aug 10',
    readTime: '10 min read'
  },
  {
    image: 'https://images.pexels.com/photos/3184325/pexels-photo-3184325.jpeg?auto=compress&cs=tinysrgb&w=1200',
    category: 'Leadership',
    title: 'Leading with clarity',
    desc: 'The role of transparency in building exceptional teams.',
    date: 'Aug 10',
    readTime: '10 min read'
  },
  {
    image: 'https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=1200',
    category: 'Collaboration',
    title: 'Fostering collaboration',
    desc: 'Creating an environment where ideas move faster.',
    date: 'Aug 11',
    readTime: '8 min read'
  },
  {
    image: 'https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=1200',
    category: 'Growth',
    title: 'Sustainable growth loops',
    desc: 'Scaling through product-led growth strategies.',
    date: 'Aug 11',
    readTime: '9 min read'
  },
  {
    image: 'https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=1200',
    category: 'Strategy',
    title: 'The transparency advantage',
    desc: 'Building trust through open communication.',
    date: 'Aug 12',
    readTime: '7 min read'
  }
];
export default function Insights() {
  const [foundersPage, setFoundersPage] = useState(1);
  const [direction, setDirection] = useState(1); // 1 = right/forward, -1 = left/backward

  const foundersItems = useMemo(() => {
    return foundersCornerItems.slice((foundersPage - 1) * 3, foundersPage * 3);
  }, [foundersPage]);

  const handleFoundersPrev = () => {
    if (foundersPage > 1) {
      setDirection(-1);
      setFoundersPage((prev) => prev - 1);
    }
  };

  const handleFoundersNext = () => {
    if (foundersPage < 5) {
      setDirection(1);
      setFoundersPage((prev) => prev + 1);
    }
  };

  return (
    <>
      {/* Intro Header */}
      <Container className="p-10 lg:pt-16 pb-8">
        {/* <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[var(--line)] bg-[var(--bg-soft)] px-3.5 py-1.5 text-xs font-semibold tracking-wider uppercase text-[var(--ink-soft)]"
          style={{
            backgroundImage: 'radial-gradient(#E4E4E7 1.2px, transparent 1.2px)',
            backgroundSize: '24px 24px',
          }}>
          
        </div> */}
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight text-zinc-950 mb-4 leading-none h-min-48">
          Ideas, frameworks, and findings<br/>
          <span className=" font-black inline-flex items-center">
            <TextType 
              text={["worth reading.", "based on evidence.", "to build strategy.", "to decide with confidence."]}
              typingSpeed={75}
              pauseDuration={1500}
              showCursor
              cursorCharacter="_"
              deletingSpeed={50}
              variableSpeedEnabled
              variableSpeedMin={30}
              variableSpeedMax={250}
              cursorBlinkDuration={0.5}
              className="inline font-fenwick"
            />
          </span>
        </h1>
        <p className="text-zinc-500 max-w-2xl text-sm sm:text-base mb-2">
          Tactical pieces from our methodology team and a regular pulse on what we’re seeing across global panels.
        </p>
      </Container>

      {/* Featured Grid (Featured Left, Latest Right) */}
      <Container className="pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Featured Post Card (2/3 width) */}
          <div className="lg:col-span-2">
            <Reveal delay={0.05}>
              <motion.div
                whileHover={{ y: -6 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                className="group relative overflow-hidden rounded-3xl border border-[var(--line)] bg-white cursor-pointer shadow-sm hover:shadow-xl transition-all duration-300"
              >
                {/* Image */}
                <div className="relative h-[300px] sm:h-[500px] w-full overflow-hidden">
                  <SafeImage
                    src={featuredPost.image}
                    alt={featuredPost.title}
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  {/* Gradient bottom overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/45 to-transparent" />
                </div>

                {/* Overlaid Card Info */}
                <div className="absolute bottom-0 inset-x-0 p-6 sm:p-8 flex flex-col justify-end text-white">
                  {/* Category dot badge */}
                  <div className="mb-4 flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-1.5 text-xs font-semibold text-zinc-900 w-fit select-none shadow-sm">
                    <span className="h-1.5 w-1.5 rounded-full bg-orange-600 animate-pulse" />
                    {featuredPost.category}
                  </div>

                  {/* Title */}
                  <h2 className="text-xl sm:text-3xl font-black leading-snug tracking-wide text-white mb-3 group-hover:text-[var(--brand)] transition-colors duration-300 ">
                    {featuredPost.title}
                  </h2>

                  {/* Footer details */}
                  <div className="flex items-center gap-2 text-xs sm:text-sm text-white/70 font-semibold">
                    <span>{featuredPost.date}</span>
                    <span>•</span>
                    <span className="inline-flex items-center gap-1.5"><Clock size={12} /> {featuredPost.readTime}</span>
                  </div>
                </div>
              </motion.div>
            </Reveal>
          </div>

          {/* Latest Posts List (1/3 width) */}
          <div className="flex flex-col">
            <h3 className="text-xl font-extrabold text-zinc-950 uppercase tracking-tight mb-6">
              Latest post
            </h3>

            <div className="flex flex-col gap-4">
              {latestPosts.map((post, idx) => (
                <Reveal key={idx} delay={idx * 0.05 + 0.1}>
                  <motion.div
                    whileHover={{ x: 4 }}
                    className="group flex gap-4 items-center p-2 rounded-2xl cursor-pointer hover:bg-zinc-50 border border-transparent hover:border-zinc-100 transition-all duration-300"
                  >
                    {/* Thumbnail */}
                    <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden shrink-0 border border-zinc-100/60 bg-zinc-50">
                      <SafeImage
                        src={post.image}
                        alt={post.title}
                        className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <h4 className="font-extrabold text-xs sm:text-sm leading-snug text-zinc-900 group-hover:text-[var(--brand)] transition-colors duration-300 line-clamp-2">
                        {post.title}
                      </h4>
                      <div className="flex items-center gap-1.5 text-[10px] sm:text-xs text-zinc-400 mt-2 font-semibold">
                        <span>{post.date}</span>
                        <span>•</span>
                        <span className="inline-flex items-center gap-1"><Clock size={10} /> {post.readTime}</span>
                      </div>
                    </div>
                  </motion.div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </Container>

      {/* Founders Corner Carousel Section */}
      <section className="pt-10 pb-4 bg-[#FAF9F6]/30 relative overflow-hidden">
        {/* Soft decorative radial gradient */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_25%,rgba(92,142,255,0.02),transparent_50%)] pointer-events-none" />

        <Container>
          {/* Header & Arrow Navigation */}
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-zinc-950 uppercase tracking-tight">
              Founders corner
            </h2>
            <div className="flex gap-2">
              <button
                onClick={handleFoundersPrev}
                disabled={foundersPage === 1}
                className={`w-10 h-10 rounded-full border border-zinc-200 flex items-center justify-center text-zinc-600 transition-all duration-300 shadow-sm cursor-pointer ${foundersPage === 1 ? 'opacity-30 cursor-not-allowed bg-zinc-50/50' : 'bg-white hover:bg-zinc-50 hover:border-zinc-400 hover:text-zinc-950'
                  }`}
              >
                <ChevronLeft size={18} strokeWidth={2.5} />
              </button>
              <button
                onClick={handleFoundersNext}
                disabled={foundersPage === 5}
                className={`w-10 h-10 rounded-full border border-zinc-200 flex items-center justify-center text-zinc-600 transition-all duration-300 shadow-sm cursor-pointer ${foundersPage === 5 ? 'opacity-30 cursor-not-allowed bg-zinc-50/50' : 'bg-white hover:bg-zinc-50 hover:border-zinc-400 hover:text-zinc-950'
                  }`}
              >
                <ChevronRight size={18} strokeWidth={2.5} />
              </button>
            </div>
          </div>

          {/* Cards slider container */}
          <div className="relative overflow-hidden min-h-[460px]">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={foundersPage}
                initial={{ opacity: 0, x: direction * 80 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -direction * 80 }}
                transition={{ duration: 0.4, ease: [0.2, 0.65, 0.3, 0.95] }}
                className="grid grid-cols-1 md:grid-cols-3 gap-6"
              >
                {foundersItems.map((item, idx) => (
                  <motion.div
                    key={idx}
                    whileHover={{ y: -6 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                    className="group flex flex-col bg-white rounded-3xl border border-zinc-200/50 overflow-hidden shadow-[0_4px_24px_rgba(0,0,0,0.01)] hover:shadow-lg transition-all duration-300"
                  >
                    {/* Card Image */}
                    <div className="relative aspect-[16/10] w-full overflow-hidden rounded-t-3xl">
                      <SafeImage
                        src={item.image}
                        alt={item.title}
                        className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      />
                    </div>

                    {/* Card Text Content */}
                    <div className="p-6 flex flex-col flex-1">
                      {/* Category Badge */}
                      <div className="flex items-center gap-1.5 text-[10px] font-black text-zinc-500 uppercase tracking-widest mb-3.5 select-none">
                        <span className="w-1.5 h-1.5 rounded-full bg-orange-600 animate-pulse" />
                        {item.category}
                      </div>

                      {/* Title */}
                      <h3 className="text-lg font-black text-zinc-950 tracking-tight leading-snug mb-3 group-hover:text-[var(--brand)] transition-colors duration-300">
                        {item.title}
                      </h3>

                      {/* Description */}
                      <p className="text-zinc-500 text-xs sm:text-sm leading-relaxed mb-6 flex-1">
                        {item.desc}
                      </p>

                      {/* Footer Details */}
                      <div className="flex items-center gap-1.5 text-[10px] sm:text-xs text-zinc-400 font-semibold pt-4 border-t border-zinc-100">
                        <span>{item.date}</span>
                        <span>•</span>
                        <span className="inline-flex items-center gap-1"><Clock size={10} /> {item.readTime}</span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Bottom Pagination controls */}
          <div className="flex justify-between items-center mt-12 pt-6 border-t border-zinc-200/50">
            {/* Prev arrow text */}
            <button
              onClick={handleFoundersPrev}
              disabled={foundersPage === 1}
              className={`flex items-center gap-2 text-xs font-black uppercase tracking-wider text-zinc-400 hover:text-zinc-950 transition-colors cursor-pointer ${foundersPage === 1 ? 'opacity-30 cursor-not-allowed' : ''
                }`}
            >
              <ChevronLeft size={16} strokeWidth={2.5} />
            </button>

            {/* Page number indicators */}
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((pageNum) => (
                <button
                  key={pageNum}
                  onClick={() => {
                    setDirection(pageNum > foundersPage ? 1 : -1);
                    setFoundersPage(pageNum);
                  }}
                  className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold transition-all cursor-pointer ${foundersPage === pageNum
                      ? 'bg-zinc-950 text-white shadow-sm'
                      : 'text-zinc-400 hover:text-zinc-950 hover:bg-zinc-100'
                    }`}
                >
                  {pageNum}
                </button>
              ))}
            </div>

            {/* Next arrow text */}
            <button
              onClick={handleFoundersNext}
              disabled={foundersPage === 5}
              className={`flex items-center gap-2 text-xs font-black uppercase tracking-wider text-zinc-400 hover:text-zinc-950 transition-colors cursor-pointer ${foundersPage === 5 ? 'opacity-30 cursor-not-allowed' : ''
                }`}
            >
              <ChevronRight size={16} strokeWidth={2.5} />
            </button>
          </div>
        </Container>
      </section>

      <FinalCTA />
    </>
  );
}
