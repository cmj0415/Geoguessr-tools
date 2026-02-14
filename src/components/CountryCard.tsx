import React from "react";

type CountryCardProps = {
  countryName: string;
  flag?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
};

export function CountryCard({
  countryName,
  flag,
  children,
  className = "",
}: CountryCardProps) {
  return (
    <section
      className={[
        "group relative border-2 border-white/70 bg-inherit rounded-xl",
        "transition-colors duration-200 hover:border-blue-800",
        "p-6 pt-10",
        className,
      ].join(" ")}
    >
      <div className="
        absolute left-4 top-0 -translate-y-1/2 rounded-lg
        bg-(--bg) group-hover:bg-blue-800
        px-3 py-2 text-xl  
        transition-colors duration-200
      ">
        <div className="flex items-center gap-2">
          <div className="h-7 w-7 bg-inherit flex items-center justify-center">
            {flag ?? null}
          </div>
          <div className="text-white/95 font-semibold tracking-wide">
            {countryName}
          </div>
        </div>
      </div>

      <div className="space-y-3">{children}</div>
    </section>
  );
}