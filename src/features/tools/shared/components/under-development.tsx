"use client";

import { Construction, Mail, ArrowLeft } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

import { env } from "@/lib/env";
import { BaseTool } from "../types";

export default function UnderDevelopment({ tool }: { tool: BaseTool }) {
    const contactEmail = env.NEXT_PUBLIC_CONTACT_EMAIL;

    return (
        // ✅ Full width container, no ToolShell
        <div className="flex flex-col items-center justify-center px-4 pt-12 sm:px-6 lg:px-8">
            <Card className="w-full max-w-lg text-center border-dashed border-2 shadow-lg">
                <CardHeader className="space-y-4">
                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                        <Construction className="h-8 w-8 text-primary" />
                    </div>
                    <div className="space-y-2">
                        <CardTitle className="text-2xl font-bold">{tool.name}</CardTitle>
                        <CardDescription className="text-base">
                            This tool is currently under active development.
                        </CardDescription>
                    </div>
                </CardHeader>

                <CardContent className="space-y-4">
                    <p className="text-sm text-muted-foreground leading-relaxed">
                        We are working hard to bring this feature to life. If you would like to
                        receive updates or need this tool to work urgently for your workflow, please
                        don{"'"}t hesitate to reach out to us!
                    </p>
                </CardContent>

                <CardFooter className="flex flex-col gap-3 pb-8">
                    <a
                        href={`mailto:${contactEmail}?subject=Inquiry: ${tool.name} Tool`}
                        className="w-full"
                    >
                        <Button size="lg" className="gap-2 w-full" variant="default">
                            <Mail className="h-4 w-4" />
                            Contact Us for Updates
                        </Button>
                    </a>

                    <Link href="/tools" className="w-full">
                        <Button size="lg" variant="outline" className="gap-2 w-full">
                            <ArrowLeft className="h-4 w-4" />
                            Browse All Tools
                        </Button>
                    </Link>
                </CardFooter>
            </Card>
        </div>
    );
}
