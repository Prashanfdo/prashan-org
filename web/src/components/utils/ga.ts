import { useRouter } from 'next/router';
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
  window?.gtag?.('event', action, params);
  // eslint-disable-next-line no-console
  console.info(
    `GA Event: ${action} => ${Object.entries(params)
      .map(([key, value]) => `${key}: ${value}`)
      .join(', ')}`,
  );
};
export const gaEventOnClick = (props: EventProps) => () => {
  gaEvent(props);
};
export function useGAPageTrack() {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState<string | undefined>();
  // const [scrollDepth, setScrollDepth] = useState(0);
  const [scrollDepth] = useState(0);
  useEffect(() => {
    const handleRouteChange = (url: string) => {
      gaPageview(url);
      setCurrentPage(url);
    };
    router.events.on('routeChangeComplete', handleRouteChange);
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);

  // track page scrolls rounded to 25% of page height
  useEffect(() => {
    const onScroll = () => {
      // setScrollDepth(Math.round(((window.pageYOffset + window.innerHeight) * 100) / (document.body.scrollHeight * 25)) * 25);
    };
    window.removeEventListener('scroll', onScroll);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [currentPage]);
  useEffect(() => {
    if (currentPage && scrollDepth > 0) {
      gaEvent({
        action: 'page_scroll',
        params: {
          page_path: currentPage,
          scroll_depth: scrollDepth,
        },
      });
    }
  }, [currentPage, scrollDepth]);
}

declare const window: Window &
  typeof globalThis & {
    gtag: any;
  };
