import { Link } from "wouter";
import type { ThemeDef } from "../data/themes";
import { cn } from "../lib/utils";
import { MoveRight } from "lucide-react";

// Mock Badge if ui-core doesn't have it ready or exporting issues
function MockBadge({ children, className }: { children: React.ReactNode, className?: string }) {
    return <span className={cn("inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2", className)}>{children}</span>
}

export function ThemeCard({ theme }: { theme: ThemeDef }) {
    const isReady = theme.status === "ready";

    return (
        <div className="group relative overflow-hidden rounded-lg border bg-card text-card-foreground shadow-sm transition-all hover:shadow-md">
            {/* Visual Preview */}
            <div
                className="h-32 w-full"
                style={{
                    background: `linear-gradient(135deg, ${theme.colors.primary} 0%, ${theme.colors.secondary} 100%)`
                }}
            />

            <div className="p-6">
                <div className="mb-2 flex items-center justify-between">
                    <h3 className="text-xl font-bold tracking-tight">{theme.label}</h3>
                    {!isReady && <MockBadge className="bg-muted text-muted-foreground">Soon</MockBadge>}
                </div>

                <p className="mb-4 text-xs font-medium uppercase text-muted-foreground tracking-wider">
                    {theme.context}
                </p>

                <p className="mb-4 text-sm text-muted-foreground line-clamp-2">
                    {theme.description}
                </p>

                <div className="mb-6 flex flex-wrap gap-2">
                    {theme.features.map(f => (
                        <MockBadge key={f} className="bg-secondary text-secondary-foreground hover:bg-secondary/80">
                            {f}
                        </MockBadge>
                    ))}
                </div>

                {isReady ? (
                    <Link href={`/demo/${theme.name}`} className="inline-flex h-9 w-full items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none disabled:opacity-50">
                        View Demo <MoveRight className="ml-2 h-4 w-4" />
                    </Link>
                ) : (
                    <button disabled className="inline-flex h-9 w-full items-center justify-center rounded-md bg-muted px-4 py-2 text-sm font-medium text-muted-foreground opacity-50 cursor-not-allowed">
                        Not Available
                    </button>
                )}
            </div>
        </div>
    );
}
