"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect } from "react";
import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"
import { Icons } from "@/components/ui/icons"


export function MainNav() {
  const pathname = usePathname()

    return (
    <div className="mr-4 hidden md:flex">

        <div style={{visibility:"hidden"}}>########################</div>
      <Link href="" className="mr-6 flex items-center space-x-2">
        <span className="hidden font-bold sm:inline-block">
          {siteConfig.name}
        </span>
      </Link>
      <div style={{visibility:"hidden"}}>##########</div>
      <nav className="flex items-center gap-4 text-sm lg:gap-6">
        <Link
          href={"/dashboard/"+pathname.toString().split("/")[2]}
          className={cn(
            "transition-colors hover:text-foreground/80",
            pathname?.startsWith("/dashboard") && !pathname?.endsWith("/markattendance") ? "text-foreground" : "text-foreground/60"
          )}
        >
          Dashboard
        </Link>
        <Link
          href={"/dashboard/" + pathname.toString().split("/")[2] + "/markattendance"}
          className={cn(
            "transition-colors hover:text-foreground/80",
            pathname?.endsWith("/markattendance")
              ? "text-foreground"
              : "text-foreground/60"
          )}
        >
          Mark Attendance
        </Link>
      </nav>
    </div>
  )
}