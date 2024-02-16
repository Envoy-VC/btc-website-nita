import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { env } from '~/env';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getSocialImage = (link: string) => {
  if (link.includes('facebook')) {
    return 'https://cdn1.iconfinder.com/data/icons/logotypes/32/square-facebook-1024.png';
  } else if (link.includes('instagram')) {
    return 'https://cdn1.iconfinder.com/data/icons/social-icons-33/128/Instagram-1024.png';
  } else if (link.includes('twitter') || link.includes('x.com')) {
    return 'https://cdn1.iconfinder.com/data/icons/social-media-2285/512/1_Twitter_colored_svg-1024.png';
  } else if (link.includes('linkedin')) {
    return 'https://cdn1.iconfinder.com/data/icons/logotypes/32/square-linkedin-1024.png';
  } else if (link.includes('youtube')) {
    return 'https://cdn1.iconfinder.com/data/icons/social-icons-33/128/Youtube-1024.png';
  } else if (link.includes('github')) {
    return 'https://cdn1.iconfinder.com/data/icons/iconsimple-logotypes/512/github-1024.png';
  } else if (link.includes('whatsapp')) {
    return 'https://cdn1.iconfinder.com/data/icons/social-media-2285/512/1_Whatsapp2_colored_svg-1024.png';
  } else if (link.includes('medium.com')) {
    return 'https://cdn1.iconfinder.com/data/icons/social-media-2285/1151/Medium_logo_-_black-1024.png';
  } else {
    return 'https://cdn1.iconfinder.com/data/icons/social-media-outline-6/128/SocialMedia_Website-Outline-1024.png';
  }
};

export const getImageLink = (path: string) => {
  if (path === '') {
    return null;
  } else {
    return `${env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/${path}`;
  }
};

export const formatDate = (iso_string: string): string => {
  const date = new Date(iso_string);
  // prettier-ignore
  const months: string[] = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ];

  const month = months[date.getMonth()];
  const day = date.getDate();
  const hours = date.getHours() % 12 || 12;
  const minutes = date.getMinutes();
  const amOrPm = date.getHours() >= 12 ? 'PM' : 'AM';

  return `${month} ${day}, ${hours}:${minutes < 10 ? '0' : ''}${minutes} ${amOrPm}`;
};
