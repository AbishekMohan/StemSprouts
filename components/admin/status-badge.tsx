const LABELS: Record<string, string> = {
  draft: "Draft",
  pending: "Pending Review",
  published: "Published",
}

const STYLES: Record<string, string> = {
  draft: "text-gray-500 border-gray-400",
  pending: "text-amber-600 dark:text-amber-400 border-amber-500",
  published: "text-[#15803d] dark:text-[#22C55E] border-[#22C55E]",
}

export function StatusBadge({ status }: { status: string }) {
  return (
    <span
      className={`ml-2 text-[10px] uppercase font-bold border rounded-full px-2 py-0.5 align-middle ${STYLES[status] ?? STYLES.draft}`}
    >
      {LABELS[status] ?? status}
    </span>
  )
}
