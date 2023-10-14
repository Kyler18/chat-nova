// This file defines a ThemeToggle component that allows users to switch between light and dark themes.
// It uses the `next-themes` package to manage theme state, `framer-motion` for animations, and `react-icons` for displaying the sun/moon icons.
// The component initially renders nothing until it's mounted to prevent flash of unstyled content.

"use client";

// Importing necessary hooks and components
import { useTheme } from "next-themes"; // Hook to get and set the current theme
import { AnimatePresence, motion } from "framer-motion"; // For animations
import { FiSun } from "react-icons/fi"; // Sun icon for light theme
import { RiMoonCloudyLine } from "react-icons/ri"; // Moon icon for dark theme
import { useEffect, useState } from "react"; // React hooks
import { Button } from "@radix-ui/themes"; // Button component from Radix UI

// ThemeToggle component definition
export const ThemeToggle = () => {
  const { theme, setTheme } = useTheme(); // Get current theme and theme setter
  const [mounted, setMounted] = useState<Boolean>(false); // State to track if component is mounted
  const isDark = theme === "dark"; // Boolean to check if current theme is dark

  // On component mount, set mounted to true
  useEffect(() => setMounted(true), []);

  // Prevent flash of unstyled content by returning null until component is mounted
  if (!mounted) {
    return null;
  }

  // Render a button that toggles the theme on click
  return (
    <Button
      size="3"
      variant="surface"
      color="gray"
      highContrast
      onClick={() => setTheme(isDark ? "light" : "dark")} // Toggle theme on click
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span {...framerTheme} className="flex" key={theme}>
          {isDark ? <RiMoonCloudyLine /> : <FiSun />} // Display appropriate icon based on theme
        </motion.span>
      </AnimatePresence>
    </Button>
  );
};

// Animation properties for the theme icon
const framerTheme = {
  initial: { scale: 0 }, // Start with scale 0
  animate: { scale: 1 }, // Animate to scale 1
  exit: { scale: 0 }, // Exit with scale 0
};