// VEats — Lucide-style SVG Icons (thin, modern, professional)
// All icons use stroke, not fill — for that clean minimal look

interface IconProps {
    size?: number;
    stroke?: string;
    strokeWidth?: number;
    className?: string;
}

const base = (size: number, sw: number, className?: string) => ({
    width: size,
    height: size,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: sw,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    className,
});

export const IconHome = ({ size = 22, strokeWidth = 1.8, className }: IconProps) => (
    <svg {...base(size, strokeWidth, className)}>
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
);

export const IconCart = ({ size = 22, strokeWidth = 1.8, className }: IconProps) => (
    <svg {...base(size, strokeWidth, className)}>
        <circle cx="9" cy="21" r="1" />
        <circle cx="20" cy="21" r="1" />
        <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
    </svg>
);

export const IconOrders = ({ size = 22, strokeWidth = 1.8, className }: IconProps) => (
    <svg {...base(size, strokeWidth, className)}>
        <path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2" />
        <rect x="9" y="3" width="6" height="4" rx="2" />
        <line x1="9" y1="12" x2="15" y2="12" />
        <line x1="9" y1="16" x2="13" y2="16" />
    </svg>
);

export const IconNutrition = ({ size = 22, strokeWidth = 1.8, className }: IconProps) => (
    <svg {...base(size, strokeWidth, className)}>
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <path d="M12 8v4M10 10h4" />
    </svg>
);

export const IconSearch = ({ size = 18, strokeWidth = 2, className }: IconProps) => (
    <svg {...base(size, strokeWidth, className)}>
        <circle cx="11" cy="11" r="8" />
        <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
);

export const IconBack = ({ size = 18, strokeWidth = 2.5, className }: IconProps) => (
    <svg {...base(size, strokeWidth, className)}>
        <line x1="19" y1="12" x2="5" y2="12" />
        <polyline points="12 19 5 12 12 5" />
    </svg>
);

export const IconChevronRight = ({ size = 16, strokeWidth = 2, className }: IconProps) => (
    <svg {...base(size, strokeWidth, className)}>
        <polyline points="9 18 15 12 9 6" />
    </svg>
);

export const IconUser = ({ size = 20, strokeWidth = 1.8, className }: IconProps) => (
    <svg {...base(size, strokeWidth, className)}>
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
    </svg>
);

export const IconWallet = ({ size = 20, strokeWidth = 1.8, className }: IconProps) => (
    <svg {...base(size, strokeWidth, className)}>
        <rect x="2" y="5" width="20" height="14" rx="2" />
        <line x1="2" y1="10" x2="22" y2="10" />
        <circle cx="16" cy="15" r="1" fill="currentColor" />
    </svg>
);

export const IconMapPin = ({ size = 14, strokeWidth = 2, className }: IconProps) => (
    <svg {...base(size, strokeWidth, className)}>
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
        <circle cx="12" cy="10" r="3" />
    </svg>
);

export const IconHeart = ({ size = 14, strokeWidth = 2, className }: IconProps) => (
    <svg {...base(size, strokeWidth, className)}>
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
);

export const IconPhone = ({ size = 18, strokeWidth = 1.8, className }: IconProps) => (
    <svg {...base(size, strokeWidth, className)}>
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.07 11 19.79 19.79 0 0 1 1 2.38 2 2 0 0 1 2.96 .18h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.09 7.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7a2 2 0 0 1 1.72 2.02z" />
    </svg>
);

export const IconMail = ({ size = 18, strokeWidth = 1.8, className }: IconProps) => (
    <svg {...base(size, strokeWidth, className)}>
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
        <polyline points="22,6 12,13 2,6" />
    </svg>
);

export const IconGift = ({ size = 18, strokeWidth = 1.8, className }: IconProps) => (
    <svg {...base(size, strokeWidth, className)}>
        <polyline points="20 12 20 22 4 22 4 12" />
        <rect x="2" y="7" width="20" height="5" />
        <line x1="12" y1="22" x2="12" y2="7" />
        <path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z" />
        <path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z" />
    </svg>
);

export const IconHelpCircle = ({ size = 18, strokeWidth = 1.8, className }: IconProps) => (
    <svg {...base(size, strokeWidth, className)}>
        <circle cx="12" cy="12" r="10" />
        <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
        <line x1="12" y1="17" x2="12.01" y2="17" />
    </svg>
);

export const IconShield = ({ size = 18, strokeWidth = 1.8, className }: IconProps) => (
    <svg {...base(size, strokeWidth, className)}>
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
);

export const IconLogOut = ({ size = 18, strokeWidth = 1.8, className }: IconProps) => (
    <svg {...base(size, strokeWidth, className)}>
        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
        <polyline points="16 17 21 12 16 7" />
        <line x1="21" y1="12" x2="9" y2="12" />
    </svg>
);

export const IconSun = ({ size = 16, strokeWidth = 2, className }: IconProps) => (
    <svg {...base(size, strokeWidth, className)}>
        <circle cx="12" cy="12" r="5" />
        <line x1="12" y1="1" x2="12" y2="3" />
        <line x1="12" y1="21" x2="12" y2="23" />
        <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
        <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
        <line x1="1" y1="12" x2="3" y2="12" />
        <line x1="21" y1="12" x2="23" y2="12" />
        <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
        <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
    </svg>
);

export const IconMoon = ({ size = 16, strokeWidth = 2, className }: IconProps) => (
    <svg {...base(size, strokeWidth, className)}>
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
);

export const IconAddress = ({ size = 18, strokeWidth = 1.8, className }: IconProps) => (
    <svg {...base(size, strokeWidth, className)}>
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
);

export const IconStar = ({ size = 10, strokeWidth = 2, className }: IconProps) => (
    <svg {...base(size, strokeWidth, className)} fill="currentColor" stroke="none">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
);

export const IconTrophy = ({ size = 18, strokeWidth = 1.8, className }: IconProps) => (
    <svg {...base(size, strokeWidth, className)}>
        <polyline points="8 15 3 15 3 3 21 3 21 15 16 15" />
        <path d="M12 21a5 5 0 0 0 0-10H8v4a5 5 0 0 0 4 5z" />
        <path d="M12 21a5 5 0 0 1 0-10h4v4a5 5 0 0 1-4 5z" />
        <line x1="12" y1="21" x2="12" y2="11" />
    </svg>
);
