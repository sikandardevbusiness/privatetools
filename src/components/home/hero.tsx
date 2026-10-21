"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight, CloudOff, Lock, ShieldCheck, Zap } from "lucide-react";
import Image from "next/image";

const referenceHero =
    "https://images.unsplash.com/photo-1584433144859-1fc3ab64a957?q=80&w=1330&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D";

export function Hero() {
    return (
        <section className="max-w-7xl mx-auto px-4 md:px-8 py-12 md:py-20 grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left Side: Content */}
            <div className="space-y-6">
                <div className="space-y-4">
                    <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-primary">
                        <ShieldCheck size={14} />
                        100% Private. No uploads. Ever.
                    </span>

                    <h1 className="font-heading text-5xl md:text-6xl lg:text-7xl font-semibold tracking-tight leading-[1.1]">
                        All Private Tools. <br />
                        <span className="text-primary">Zero Uploads.</span>
                    </h1>

                    <p className="text-lg text-muted-foreground max-w-lg leading-relaxed">
                        Find the right PDF, image, file, or utility tool. Everything runs locally in
                        your browser. Your files never leave your device.
                    </p>
                </div>

                <div className="flex flex-wrap items-center gap-4">
                    <Button size="lg" className="gap-2">
                        Browse Our Tools <ArrowRight size={16} />
                    </Button>
                    <Button variant="outline" size="lg" className="gap-2">
                        <Lock size={16} /> Our Privacy Promise
                    </Button>
                </div>

                <div className="flex flex-wrap gap-6 pt-4 border-t border-border">
                    <span className="flex items-center gap-2 text-sm text-muted-foreground">
                        <ShieldCheck size={16} className="text-primary" /> 100% Private
                    </span>
                    <span className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Zap size={16} className="text-primary" /> Instant Processing
                    </span>
                    <span className="flex items-center gap-2 text-sm text-muted-foreground">
                        <CloudOff size={16} className="text-primary" /> Zero Server Uploads
                    </span>
                </div>
            </div>

            {/* Right Side: Hero Visual */}
            <div className="relative hidden lg:block">
                <div className="relative aspect-[1.36] overflow-hidden rounded-lg border border-border bg-muted">
                    <Image
                        src={referenceHero}
                        alt="Secure private browser processing"
                        fill
                        className="object-cover"
                        priority
                    />
                </div>

                {/* Bottom Left Badge */}
                <div className="absolute -bottom-6 -left-6 flex items-center gap-3 rounded-lg border border-border bg-surface p-4 shadow-lg">
                    <div className="flex h-10 w-10 items-center justify-center rounded-md bg-primary/10 text-primary">
                        <Lock size={18} />
                    </div>
                    <div className="flex flex-col">
                        <span className="font-semibold text-sm">100% Local</span>
                        <span className="text-xs text-muted-foreground">
                            Files never leave device
                        </span>
                    </div>
                </div>

                {/* Top Right Badge */}
                <div className="absolute -top-4 -right-4 flex h-24 w-24 items-center justify-center rounded-full bg-primary text-center shadow-lg p-2">
                    <div className="flex flex-col items-center justify-center leading-tight">
                        <span className="text-[9px] font-bold uppercase tracking-wide text-primary-foreground">
                            Zero
                        </span>
                        <span className="text-sm font-bold text-primary-foreground">Tracking</span>
                    </div>
                </div>
            </div>
        </section>
    );
}
