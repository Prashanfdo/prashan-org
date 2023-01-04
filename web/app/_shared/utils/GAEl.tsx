'use client';
import { useGAPageTrack } from './ga';

function GAEl() {
  useGAPageTrack();
  return null;
}

export default GAEl;
