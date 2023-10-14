// This file defines the HistorySidebar component which is a sidebar that displays chat history.
// It uses framer-motion for animations, react-use for handling click away events, and react-icons for icons.
// The sidebar can be toggled open and closed with a hamburger menu button.

"use client";

import { useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useClickAway } from "react-use";
import { HistoryRenderer } from "./history-renderer";
import { Button } from "@radix-ui/themes";
import { RxHamburgerMenu } from "react-icons/rx";
import { Session } from "@supabase/auth-helpers-nextjs";

// HistorySidebar component definition
export const HistorySidebar = ({
  session,
  chats,
}: {
  session: Session; // User session data
  chats: TChat[] | null; // Chat history data
}) => {
  const [open, setOpen] = useState(false); // State for sidebar open/close
  const ref = useRef(null); // Ref for click away listener
  const closeSidebar = () => setOpen(false); // Function to close sidebar
  useClickAway(ref, closeSidebar); // Click away listener

  // Component render
  return (
    <>
      <div className="sticky top-0 z-50 w-full py-2 bg-white border-b border-gray-200 dark:bg-zinc-900 dark:border-b-zinc-700 lg:hidden">
        <div className="container">
          <Button
            variant="soft"
            color="gray"
            size="3"
            onClick={() => {
              setOpen(true);
            }}
          >
            <RxHamburgerMenu className="text-2xl" />
          </Button>
        </div>
      </div>
      <AnimatePresence mode="wait" initial={false}>
        {open && (
          <>
            <motion.div
              {...framer_sidebar_background}
              className="fixed top-0 bottom-0 left-0 right-0 z-40 lg:hidden backdrop-blur-sm"
            ></motion.div>
            <motion.div
              {...framer_sidebar_panel}
              className="fixed bottom-0 lg:hidden shadow-xl w-full left-0 top-0 z-50 h-screen max-w-[80%] md:max-w-[20rem] dark:border-r-zinc-700 bg-white border-r dark:bg-zinc-900"
            >
              <div className="w-full h-full" ref={ref}>
                <HistoryRenderer chats={chats} session={session} />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

// Animation properties for the background overlay
const framer_sidebar_background = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0, transition: { delay: 0.2 } },
  transition: { duration: 0.3 },
};

// Animation properties for the sidebar panel
const framer_sidebar_panel = {
  initial: { x: "-100%" },
  animate: { x: 0 },
  exit: { x: "-100%" },
  transition: { duration: 0.3 },
};