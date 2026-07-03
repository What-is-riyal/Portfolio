type WorkThumbProps = {
  slug: string;
};

export function WorkThumb({ slug }: WorkThumbProps) {
  switch (slug) {
    case "microsoft-copilot-trust":
      return (
        <svg viewBox="0 0 170 124" fill="none" className="h-auto w-full" aria-hidden="true">
          <rect width="170" height="124" fill="#EEEDFB" />
          <path
            d="M30 104 H66 V82 H102 V58 H138 V30"
            stroke="#4F46E5"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <text x="38" y="98" fontFamily="Georgia, serif" fontStyle="italic" fontSize="13" fill="#4F46E5">
            ask
          </text>
          <text x="72" y="76" fontFamily="Georgia, serif" fontStyle="italic" fontSize="13" fill="#4F46E5">
            suggest
          </text>
          <text x="108" y="52" fontFamily="Georgia, serif" fontStyle="italic" fontSize="13" fill="#4F46E5">
            act
          </text>
        </svg>
      );
    case "microsoft-retention":
      return (
        <svg viewBox="0 0 170 124" fill="none" className="h-auto w-full" aria-hidden="true">
          <rect width="170" height="124" fill="#E3F1FA" />
          <rect x="64" y="22" width="42" height="80" rx="8" fill="#FFFFFF" stroke="#0369A1" strokeWidth="2" />
          <ellipse cx="85" cy="62" rx="64" ry="44" stroke="#0369A1" strokeWidth="1.8" strokeDasharray="4 5" />
        </svg>
      );
    case "razorpay-d2c":
      return (
        <svg viewBox="0 0 170 124" fill="none" className="h-auto w-full" aria-hidden="true">
          <rect width="170" height="124" fill="#F1EAFB" />
          <rect x="18" y="46" width="52" height="32" rx="6" fill="#7C3AED" />
          <text x="29" y="68" fontFamily="Arial, sans-serif" fontWeight="bold" fontSize="15" fill="#FFFFFF">
            B2B
          </text>
          <rect x="112" y="46" width="52" height="32" rx="6" fill="#FCE88A" stroke="#7C3AED" strokeWidth="2" />
          <text x="120" y="68" fontFamily="Arial, sans-serif" fontWeight="bold" fontSize="15" fill="#5B21B6">
            D2C
          </text>
        </svg>
      );
    case "razorpay-website-evaluation":
      return (
        <svg viewBox="0 0 170 124" fill="none" className="h-auto w-full" aria-hidden="true">
          <rect width="170" height="124" fill="#E7EDFB" />
          <rect x="22" y="20" width="126" height="84" rx="6" fill="#FFFFFF" stroke="#1D4ED8" strokeWidth="2" />
          <rect x="32" y="46" width="48" height="48" rx="4" fill="#E7EDFB" stroke="#1D4ED8" strokeWidth="1.6" />
          <rect x="90" y="46" width="48" height="48" rx="4" fill="#FCE88A" stroke="#1D4ED8" strokeWidth="1.6" />
        </svg>
      );
    case "razorpay-onboarding":
      return (
        <svg viewBox="0 0 170 124" fill="none" className="h-auto w-full" aria-hidden="true">
          <rect width="170" height="124" fill="#E6F4EA" />
          <rect x="40" y="14" width="90" height="96" rx="6" fill="#FFFFFF" stroke="#15803D" strokeWidth="2" />
          <rect x="52" y="28" width="44" height="7" rx="3.5" fill="#BBDFC5" />
          <rect x="52" y="46" width="66" height="7" rx="3.5" fill="#BBDFC5" />
        </svg>
      );
    case "meesho-vernacular":
      return (
        <svg viewBox="0 0 170 124" fill="none" className="h-auto w-full" aria-hidden="true">
          <rect width="170" height="124" fill="#FBE7F0" />
          <path
            d="M24 28 h70 a8 8 0 0 1 8 8 v24 a8 8 0 0 1 -8 8 h-50 l-12 12 v-12 h-8 a8 8 0 0 1 -8 -8 v-24 a8 8 0 0 1 8 -8z"
            fill="#FFFFFF"
            stroke="#BE185D"
            strokeWidth="2"
          />
          <text x="50" y="58" fontFamily="Georgia, serif" fontSize="26" fill="#BE185D">
            अ
          </text>
        </svg>
      );
    default:
      return null;
  }
}
