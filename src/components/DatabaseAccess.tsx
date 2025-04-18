import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function DatabaseAccess() {
  return (
    <div className="w-full max-w-6xl mx-auto mb-8">
      <Card className="shadow-lg border-amber-500/20 bg-gradient-to-br from-zinc-900 to-black">
        <CardHeader className="bg-gradient-to-r from-amber-500/10 to-orange-500/10 rounded-t-lg border-b border-amber-500/20">
          <CardTitle className="text-2xl bg-gradient-to-r from-amber-400 via-yellow-500 to-orange-500 text-transparent bg-clip-text">
            Database Access
          </CardTitle>
          <CardDescription className="text-zinc-400">
            Connect to library databases and data warehouse
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* UWindsor Library Database */}
            <Card className="shadow-md border-amber-500/20 bg-gradient-to-br from-zinc-900 to-black hover:from-zinc-800 hover:to-black transition-colors">
              <CardHeader className="bg-gradient-to-r from-amber-500/10 to-orange-500/10 rounded-t-lg border-b border-amber-500/20">
                <CardTitle className="flex items-center text-amber-400 text-lg">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                    <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"></path>
                  </svg>
                  UWindsor Library
                </CardTitle>
                <CardDescription className="text-zinc-400">
                  University of Windsor Library Database
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-4">
                <p className="text-zinc-400 text-sm mb-4">
                  Access the University of Windsor Library catalog, member information, and transaction records.
                </p>
                <div className="flex justify-between items-center">
                  <div>
                    <span className="text-xs text-amber-400/80">Source Database</span>
                  </div>
                  <Button 
                    variant="default" 
                    className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-black"
                    asChild
                  >
                    <Link href="/data-entry?source=uwindsor">
                      Connect
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Windsor Public Library Database */}
            <Card className="shadow-md border-amber-500/20 bg-gradient-to-br from-zinc-900 to-black hover:from-zinc-800 hover:to-black transition-colors">
              <CardHeader className="bg-gradient-to-r from-amber-500/10 to-orange-500/10 rounded-t-lg border-b border-amber-500/20">
                <CardTitle className="flex items-center text-amber-400 text-lg">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                    <path d="M16 6h3a1 1 0 0 1 1 1v11a2 2 0 0 1-4 0V5a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1v12a3 3 0 0 0 3 3h11"></path>
                    <path d="M7 13h6"></path>
                    <path d="M7 9h6"></path>
                    <path d="M7 17h4"></path>
                  </svg>
                  Windsor Public Library
                </CardTitle>
                <CardDescription className="text-zinc-400">
                  Windsor Public Library Database
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-4">
                <p className="text-zinc-400 text-sm mb-4">
                  Access the Windsor Public Library catalog, member information, and transaction records.
                </p>
                <div className="flex justify-between items-center">
                  <div>
                    <span className="text-xs text-amber-400/80">Source Database</span>
                  </div>
                  <Button 
                    variant="default" 
                    className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-black"
                    asChild
                  >
                    <Link href="/data-entry?source=public">
                      Connect
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Data Warehouse */}
            <Card className="shadow-md border-amber-500/20 bg-gradient-to-br from-zinc-900 to-black hover:from-zinc-800 hover:to-black transition-colors">
              <CardHeader className="bg-gradient-to-r from-amber-500/10 to-orange-500/10 rounded-t-lg border-b border-amber-500/20">
                <CardTitle className="flex items-center text-amber-400 text-lg">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                    <path d="M2 20h20"></path>
                    <path d="M5 20v-4a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v4"></path>
                    <path d="M12 2v4"></path>
                    <path d="M2 8h20"></path>
                    <path d="M2 14h20"></path>
                  </svg>
                  Data Warehouse
                </CardTitle>
                <CardDescription className="text-zinc-400">
                  Integrated Library Data Warehouse
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-4">
                <p className="text-zinc-400 text-sm mb-4">
                  Access the integrated data warehouse containing consolidated data from all library sources.
                </p>
                <div className="flex justify-between items-center">
                  <div>
                    <span className="text-xs text-amber-400/80">Consolidated Data</span>
                  </div>
                  <Button 
                    variant="default" 
                    className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-black"
                    asChild
                  >
                    <Link href="/data-warehouse">
                      Connect
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}