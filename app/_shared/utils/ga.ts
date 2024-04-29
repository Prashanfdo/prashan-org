'use client';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

type EventProps =
  | {
      action: 'blog_post_click';
      params: {
        blog_post_slug: string;
      };
    }
  | {
      action: 'nav_menu_click';
      params: {
        menu_name: string;
      };
    }
  | {
      action: 'page_scroll';
      params: {
        page_path: string;
        scroll_depth: number;
      };
    }
  | {
      action: 'contact_link_click';
      params: {
        link_type: string;
        clicked_from_location: string;
      };
    };

// log the pageview with their URL
export const gaPageview = (url: string) => {
  window?.gtag?.('config', process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS, {
    page_path: url,
  });
  // eslint-disable-next-line no-console
  console.info(`GA Pageview: ${url}`);
};

export const gaEvent = ({ action, params }: EventProps) => {
  if (process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS) {
    window?.gtag?.('event', action, params);
  } else {
    // eslint-disable-next-line no-console
    console.info(
      `GA Event: ${action} => ${Object.entries(params)
        .map(([key, value]) => `${key}: ${value}`)
        .join(', ')}`,
    );
  }
};
export const gaEventOnClick = (props: EventProps) => () => {
  gaEvent(props);
};
export function useGAPageTrack() {
  const router = useRouter();
  const pathname = usePathname();
  const [scrollDepth, setScrollDepth] = useState(0);
  useEffect(() => {
    gaPageview(pathname);
  }, [pathname]);

  // track page scrolls rounded to 25% of page height
  useEffect(() => {
    const onScroll = () => {
      setScrollDepth(Math.round(((window.pageYOffset + window.innerHeight) * 100) / (document.body.scrollHeight * 25)) * 25);
    };
    onScroll();
    window.removeEventListener('scroll', onScroll);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [pathname]);

  useEffect(() => {
    if (pathname && scrollDepth > 0) {
      gaEvent({
        action: 'page_scroll',
        params: {
          page_path: pathname,
          scroll_depth: scrollDepth,
        },
      });
    }
  }, [pathname, scrollDepth]);
}

declare const window: Window &
  typeof globalThis & {
    gtag: any;
  };
