'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';

export const ProgressBar = () => {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  
  // Ref to track progress value without triggering re-renders of the effect
  const progressRef = useRef(0);
  // Ref to store the current tween so we can kill it if needed
  const tweenRef = useRef<gsap.core.Tween | null>(null);

  useEffect(() => {
    const handleStart = () => {
      setIsVisible(true);
      setProgress(0);
      progressRef.current = 0;

      const target = { val: 0 };
      
      // Kill any active tween to prevent conflicts
      if (tweenRef.current) tweenRef.current.kill();

      tweenRef.current = gsap.to(target, {
        val: 90,
        duration: 2,
        ease: "power2.out", // Smooth easing
        onUpdate: () => {
          progressRef.current = target.val;
          setProgress(target.val);
        },
      });
    };

    const handleFinish = () => {
      // Start from the current progress value stored in the ref
      const startValue = progressRef.current;
      const target = { val: startValue };

      // Kill the 'start' animation
      if (tweenRef.current) tweenRef.current.kill();

      tweenRef.current = gsap.to(target, {
        val: 100,
        duration: 0.5,
        ease: "power2.inOut",
        onUpdate: () => {
          progressRef.current = target.val;
          setProgress(target.val);
        },
        onComplete: () => {
          setTimeout(() => {
            setIsVisible(false);
            setProgress(0);
            progressRef.current = 0;
          }, 300);
        },
      });
    };

    window.addEventListener('startProgressBar', handleStart);
    window.addEventListener('finishProgressBar', handleFinish);

    return () => {
      window.removeEventListener('startProgressBar', handleStart);
      window.removeEventListener('finishProgressBar', handleFinish);
      if (tweenRef.current) tweenRef.current.kill();
    };
  }, []); // Empty dependency array ensures listeners are only bound once

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed top-0 left-0 w-full h-1 z-[9999]" 
        >
          <div
            className="h-full shadow-[0_0_10px_#2474A5]"
            style={{ 
              width: `${progress}%`, 
              backgroundColor: '#2474A5',
              // Use a very short transition for smoothness, or rely purely on state updates
              transition: 'width 0.1s linear' 
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};