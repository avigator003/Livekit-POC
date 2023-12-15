"use client";

import { Inter } from "next/font/google";
import { useEffect, useState } from "react";

import Features from "@/components/home/Features";
import Footer from "@/components/home/Footer";
import Header from "@/components/home/Header";
import Navbar from "@/components/home/Navbar";
import { cn } from "@/lib/utils";

const font = Inter({ subsets: ["latin-ext"] });

export default function Home() {
  const [isMounted, setIsMounted] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    setIsMounted(true);

    return () => {
      setIsMounted(false);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  if (!isMounted) return null;

  return (
    <div className={cn(font.className, "bg-white dark:bg-black")}>
      <Navbar isScrolled={isScrolled} />
      <Header />
      <Features />
      <Footer />
    </div>
  );
}
