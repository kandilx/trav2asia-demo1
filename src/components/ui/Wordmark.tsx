export function Wordmark({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-baseline text-xl font-extrabold tracking-tight ${className}`}>
      Trav2Asia
      <span aria-hidden="true" className="ml-0.5 inline-block h-2 w-2 translate-y-[-0.1em] rounded-full bg-orange" />
    </span>
  );
}
