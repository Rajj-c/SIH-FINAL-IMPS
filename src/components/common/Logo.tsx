import type { SVGProps } from 'react';

export function Logo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 256 256"
      width="1em"
      height="1em"
      {...props}
    >
      <path
        fill="currentColor"
        d="M224,88V208a8,8,0,0,1-8,8H40a8,8,0,0,1-8-8V88a8,8,0,0,1,16,0v48.6l71.45-39.7a8,8,0,0,1,8.92,0L208,136.6V88a8,8,0,0,1,16,0Zm-89.82,23.1L51.32,156.4l70.78,39.32a8,8,0,0,0,8,0l71.55-39.7Z"
      />
      <path
        fill="currentColor"
        d="M211,76.43,136,33.11a15.95,15.95,0,0,0-16.14,0L45,76.43a8,8,0,0,0,8.07,14.63L128,45.33l74.9,41.6a8,8,0,0,0,8.07-14.63Z"
      />
    </svg>
  );
}
