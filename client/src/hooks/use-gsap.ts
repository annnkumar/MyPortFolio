import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface UseGsapParams {
  trigger?: string;
  start?: string;
  end?: string;
  scrub?: boolean | number;
  markers?: boolean;
  toggleActions?: string;
  pin?: boolean;
  anticipatePin?: boolean;
  onEnter?: () => void;
  onLeave?: () => void;
  onEnterBack?: () => void;
  onLeaveBack?: () => void;
}

export const useGsapAnimation = (
  target: string | React.RefObject<HTMLElement>,
  animation: gsap.TweenVars,
  params?: UseGsapParams
) => {
  useEffect(() => {
    const element = typeof target === 'string' 
      ? document.querySelector(target) 
      : target.current;
      
    if (!element) return;

    let ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: params ? {
          trigger: typeof params.trigger === 'string' ? params.trigger : element,
          start: params.start || "top 80%",
          end: params.end || "bottom 20%",
          scrub: params.scrub === undefined ? false : params.scrub,
          markers: params.markers || false,
          toggleActions: params.toggleActions || "play none none none",
          pin: params.pin || false,
          anticipatePin: params.anticipatePin || false,
          onEnter: params.onEnter,
          onLeave: params.onLeave,
          onEnterBack: params.onEnterBack,
          onLeaveBack: params.onLeaveBack
        } : undefined
      });

      tl.to(element, animation);
    });

    return () => ctx.revert();
  }, [target, animation, params]);
};

export const useGsapFromTo = (
  target: string | React.RefObject<HTMLElement>,
  fromVars: gsap.TweenVars,
  toVars: gsap.TweenVars,
  params?: UseGsapParams
) => {
  const animation = useRef<gsap.core.Tween | null>(null);

  useEffect(() => {
    const element = typeof target === 'string' 
      ? document.querySelector(target) 
      : target.current;
      
    if (!element) return;

    let ctx = gsap.context(() => {
      if (params && (params.trigger || params.start || params.end)) {
        animation.current = gsap.fromTo(element, fromVars, {
          ...toVars,
          scrollTrigger: {
            trigger: typeof params.trigger === 'string' ? params.trigger : element,
            start: params.start || "top 80%",
            end: params.end || "bottom 20%",
            scrub: params.scrub === undefined ? false : params.scrub,
            markers: params.markers || false,
            toggleActions: params.toggleActions || "play none none none",
            pin: params.pin || false,
            onEnter: params.onEnter,
            onLeave: params.onLeave,
            onEnterBack: params.onEnterBack,
            onLeaveBack: params.onLeaveBack
          }
        });
      } else {
        animation.current = gsap.fromTo(element, fromVars, toVars);
      }
    });

    return () => {
      ctx.revert();
      if (animation.current) animation.current.kill();
    };
  }, [target, fromVars, toVars, params]);

  return animation;
};

export const useGsapTimeline = () => {
  const timeline = useRef(gsap.timeline());

  useEffect(() => {
    return () => {
      timeline.current.kill();
    };
  }, []);

  return timeline;
};
