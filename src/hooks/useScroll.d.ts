// Type definitions for useScroll custom hook

export interface ScrollDirection {
  x: 'left' | 'right' | null;
  y: 'up' | 'down' | null;
}

export interface UseScrollOptions {
  threshold?: number;
  throttleMs?: number;
}

export interface UseScrollResult {
  x: number;
  y: number;
  lastX: number;
  lastY: number;
  direction: ScrollDirection;
  isAtTop: boolean;
  isAtBottom: boolean;
  isScrolling: boolean;
  scrollTo: (options?: { top?: number; left?: number; behavior?: ScrollBehavior }) => void;
  scrollToTop: (behavior?: ScrollBehavior) => void;
  scrollToBottom: (behavior?: ScrollBehavior) => void;
  scrollToElement: (
    element: string | Element,
    options?: { behavior?: ScrollBehavior; offset?: number }
  ) => void;
}

export default function useScroll(options?: UseScrollOptions): UseScrollResult;
