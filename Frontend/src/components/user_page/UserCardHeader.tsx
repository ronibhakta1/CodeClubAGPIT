
export default function UserCardHeader({ name, codeClubRole }: { name: string; codeClubRole: string }) {
  return (
    <div className="mt-4 flex flex-col items-center justify-center w-full">
      <span className="text-2xl font-semibold text-white">{name}</span>
      <span className="text-sm mt-1 tracking-wide uppercase text-blue-500 font-semibold">{codeClubRole}</span>
    </div>
  );
} 