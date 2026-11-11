"use client";

import { Menu, ChevronDown } from "lucide-react";
import Link from "next/link";
import { FaGithub } from "react-icons/fa";

import { Logo } from "@/components/logo";
import { Button, buttonVariants } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import { ThemeToggler } from "@/features/preferences/theme/theme-toggler";

import { env } from "@/lib/env";
import { cn } from "@/lib/utils";

const navLinks = [
    { label: "Home", href: "/" },
    { label: "Browse", href: "/tools" },
    { label: "Contact", href: "/contact" },
];

const IconButtonLink = ({
    href,
    label,
    children,
    className,
}: {
    href: string;
    label: string;
    children: React.ReactNode;
    className?: string;
}) => (
    <Link
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={label}
        className={cn(buttonVariants({ variant: "outline" }), "h-9 w-9", className)}
    >
        {children}
    </Link>
);

export function Navbar() {
    return (
        <header className="sticky top-0 z-50 w-full border-b border-border bg-background backdrop-blur supports-backdrop-filter:bg-background/60">
            <div className="max-w-7xl mx-auto flex h-16 items-center justify-between px-4 md:px-8">
                {/* Logo */}
                <Logo />

                {/* Desktop Navigation */}
                <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-muted-foreground">
                    {navLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className="transition-colors hover:text-primary"
                        >
                            {link.label}
                        </Link>
                    ))}

                    {/* Resources Popover (Base UI) */}
                    <Popover>
                        <PopoverTrigger className="flex gap-x-1 items-center justify-center">
                            Resources
                            <ChevronDown className="w-4 h-4" />
                        </PopoverTrigger>
                        <PopoverContent className="w-30 p-1" align="start">
                            <div className="flex flex-col gap-1">
                                <Link
                                    href="/blog"
                                    className="flex items-center gap-2 rounded-sm px-2 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
                                >
                                    Blog
                                </Link>
                                <Link
                                    href="/alternatives"
                                    className="flex items-center gap-2 rounded-sm px-2 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
                                >
                                    Alternatives
                                </Link>
                            </div>
                        </PopoverContent>
                    </Popover>
                </nav>

                {/* Desktop Actions (GitHub + Theme) */}
                <div className="hidden md:flex items-center gap-2">
                    <IconButtonLink href={env.NEXT_PUBLIC_GITHUB_URL} label="GitHub repository">
                        <FaGithub className="h-5 w-5" />
                    </IconButtonLink>
                    <ThemeToggler />
                </div>

                {/* Mobile Actions (GitHub + Theme + Menu) */}
                <div className="flex md:hidden items-center gap-1">
                    <IconButtonLink href={env.NEXT_PUBLIC_GITHUB_URL} label="GitHub repository">
                        <FaGithub className="h-5 w-5" />
                    </IconButtonLink>

                    <ThemeToggler />

                    {/* Mobile Sheet Menu */}
                    <Sheet>
                        <SheetTrigger
                            render={
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-9 w-9"
                                    aria-label="Open menu"
                                >
                                    <Menu className="h-5 w-5" />
                                </Button>
                            }
                        >
                            Open Menu
                        </SheetTrigger>

                        <SheetContent side="right" className="w-75 sm:w-100">
                            <SheetHeader className="border-b border-border pb-4">
                                <SheetTitle className="text-left">Navigation</SheetTitle>
                            </SheetHeader>

                            <nav className="flex flex-col px-4 gap-2 mt-4">
                                {navLinks.map((link) => (
                                    <SheetClose
                                        key={link.href}
                                        nativeButton={false}
                                        render={
                                            <Link
                                                href={link.href}
                                                className="text-lg font-medium text-foreground hover:text-primary transition-colors block w-full text-left py-2 px-2 rounded-md hover:bg-muted"
                                            >
                                                {link.label}
                                            </Link>
                                        }
                                    >
                                        {link.label}
                                    </SheetClose>
                                ))}

                                {/* Mobile Resources Section */}
                                <div className="pt-4 pb-2 px-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                                    Resources
                                </div>
                                <SheetClose
                                    nativeButton={false}
                                    render={
                                        <Link
                                            href="/blog"
                                            className="text-base font-medium text-foreground hover:text-primary transition-colors block w-full text-left py-2 px-2 rounded-md hover:bg-muted"
                                        >
                                            Blog
                                        </Link>
                                    }
                                >
                                    Blog
                                </SheetClose>
                                <SheetClose
                                    nativeButton={false}
                                    render={
                                        <Link
                                            href="/alternatives"
                                            className="text-base font-medium text-foreground hover:text-primary transition-colors block w-full text-left py-2 px-2 rounded-md hover:bg-muted"
                                        >
                                            Alternatives
                                        </Link>
                                    }
                                >
                                    Alternatives
                                </SheetClose>
                            </nav>
                        </SheetContent>
                    </Sheet>
                </div>
            </div>
        </header>
    );
}
