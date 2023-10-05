"use client";

import { useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useClickAway } from "react-use";
import { HistoryRenderer } from "./history-renderer";
import { Button } from "@radix-ui/themes";
import { RxHamburgerMenu } from "react-icons/rx";
import { Session } from "@supabase/auth-helpers-nextjs";

export const HistorySidebar = ({
  session,
  chats,
}: {
  session: Session;
  chats: TChat[] | null;
}) => {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const closeSidebar = () => setOpen(false);
  useClickAway(ref, closeSidebar);

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

const framer_sidebar_background = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0, transition: { delay: 0.2 } },
  transition: { duration: 0.3 },
};

const framer_sidebar_panel = {
  initial: { x: "-100%" },
  animate: { x: 0 },
  exit: { x: "-100%" },
  transition: { duration: 0.3 },
};
