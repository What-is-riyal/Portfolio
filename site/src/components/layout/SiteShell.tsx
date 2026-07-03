import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { ProgressBar } from "@/components/layout/ProgressBar";

type SiteShellProps = {
  children: React.ReactNode;
  progressColor?: string;
  footerFlush?: boolean;
};

export function SiteShell({
  children,
  progressColor,
  footerFlush = false,
}: SiteShellProps) {
  return (
    <>
      <ProgressBar color={progressColor} />
      <SiteHeader />
      <main className="flex-1">{children}</main>
      <SiteFooter flush={footerFlush} />
    </>
  );
}
