"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect } from "react";
import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"
import { Icons } from "@/components/ui/icons"

export function MainNavLogin() {
  const pathname = usePathname()

  let link = "";
  const paths = location
            .pathname
            .split("/")
            .filter(path => path !== "")[1];



        link = "/dashboard/" + paths + "/markattendance";
        console.log(paths);


  return (
    <div className="mr-4 hidden md:flex">
        <div style={{visibility:"hidden"}}>########################</div>
      <Link href="" className="mr-6 flex items-center space-x-2">
        <span className="hidden font-bold sm:inline-block">
          {siteConfig.name}
        </span>
      </Link>
      <div style={{visibility:"hidden"}}>##########</div>
    </div>
  )
}