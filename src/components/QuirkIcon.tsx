export default function QuirkIcon({ className = "w-8 h-8" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 100 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Outer Droplet - Distillation */}
      <path
        d="M50 8 C28 8, 12 24, 12 46 C12 68, 28 84, 50 112 C72 84, 88 68, 88 46 C88 24, 72 8, 50 8 Z"
        fill="currentColor"
        className="text-amber-600"
      />
      
      {/* Inner Star - Spark/Insight (barely recognizable, very quirky shape) */}
      <path
        d="M50 20 L68 54 L80 28 L54 68 L75 82 L50 70 L25 82 L46 68 L20 28 L32 54 Z"
        fill="currentColor"
        className="text-amber-50"
      />
    </svg>
  );
}

