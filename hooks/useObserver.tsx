"use client";
import { useEffect, useRef, RefObject } from "react";

type IntersectionObserverCallback = (
  entries: IntersectionObserverEntry[],
  observer: IntersectionObserver
) => void;

function useObserver(
  elementRef: RefObject<Element>,
  functionCallback: IntersectionObserverCallback
): () => void {
  const observer = useRef<IntersectionObserver>();

  useEffect(() => {
    const handleIntersection: IntersectionObserverCallback = (
      entries,
      observer
    ) => {
      if (entries[0].isIntersecting) {
        functionCallback(entries, observer);
      }
    };

    observer.current = new IntersectionObserver(handleIntersection);
    if (elementRef.current) {
      observer.current.observe(elementRef.current);
    }

    return () => {
      if (observer.current) {
        observer.current.disconnect();
      }
    };
  }, []);

  return () => {
    if (observer.current && elementRef.current) {
      observer.current.unobserve(elementRef.current);
    }
  };
}

export default useObserver;
