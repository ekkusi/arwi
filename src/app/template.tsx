// import { AnimatePresence, motion } from "framer-motion";
// import { usePathname } from "next/navigation";

// Right now in Next.js v13, the exit animations for page transitions don't work correctly if we use an
//  instance of this component in the layout file, even if we use AnimatePresence in this file.  If we
//  do use AnimatePresence in this file and use an instance of this component in the layout file, then
//  the new route's content is first cut to and then the exit animation is run on that new route's content
//  and then the entry animation also runs on the new route's content (clearly not what we want).
//
// That said, the Next.js v13 docs state that the new template.tsx is actually the shared-layout-like
//  construct that is meant for abstracting this functionality to a single file (rather than layout.tsx).
//  They state that the template.tsx file is a more-suitable option when you need enter/exit animations.
//  So that's another approach that I need to try-out.
//  See: https://beta.nextjs.org/docs/routing/pages-and-layouts#templates

// NOTE: When exit animation is fixed, uncomment the following:

// export default function Template({ children }: React.ComponentProps<"div">) {
//   const pathname = usePathname();

//   return (
//     <AnimatePresence mode="wait" initial={false}>
//       <motion.div
//         key={pathname}
//         initial={{ x: 300, opacity: 0 }}
//         animate={{ x: 0, opacity: 1 }}
//         exit={{ x: 300, opacity: 0 }}
//         transition={{
//           duration: 0.5,
//         }}
//       >
//         {children}
//       </motion.div>
//     </AnimatePresence>
//   );
// }

export default function Template({ children }: { children: React.ReactNode }) {
  return children;
}
