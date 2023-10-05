"use client";

import { useTheme } from "next-themes";
import { AnimatePresence, motion } from "framer-motion";
import { FiSun } from "react-icons/fi";
import { RiMoonCloudyLine } from "react-icons/ri";
import { useEffect, useState } from "react";
import { Button } from "@radix-ui/themes";

export const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState<Boolean>(false);
  const isDark = theme === "dark";

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return null;
  }

  return (
    <Button
      size="3"
      variant="surface"
      color="gray"
      highContrast
      onClick={() => setTheme(isDark ? "light" : "dark")}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span {...framerTheme} className="flex" key={theme}>
          {isDark ? <RiMoonCloudyLine /> : <FiSun />}
        </motion.span>
      </AnimatePresence>
    </Button>
  );
};

const framerTheme = {
  initial: { scale: 0 },
  animate: { scale: 1 },
  exit: { scale: 0 },
};
