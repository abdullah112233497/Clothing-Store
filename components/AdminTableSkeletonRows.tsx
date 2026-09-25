type AdminTableSkeletonRowsProps = {
  columns: number;
  rows?: number;
};

export default function AdminTableSkeletonRows({ columns, rows = 6 }: AdminTableSkeletonRowsProps) {
  return (
    <>
      {Array.from({ length: rows }, (_, rowIndex) => (
        <tr key={rowIndex} className="border-b border-[#D5C1A9]/30 last:border-0">
          {Array.from({ length: columns }, (_, columnIndex) => (
            <td key={columnIndex} className="px-5 py-5">
              <div
                className={`skeleton-shimmer h-3 rounded ${columnIndex === 0 ? "w-32" : columnIndex === columns - 1 ? "ml-auto w-16" : "w-24"}`}
              />
            </td>
          ))}
        </tr>
      ))}
    </>
  );
}
