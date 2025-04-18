import React from "react";
import { Card, CardContent } from "@/components/ui/card";

export function SchemaVisualization({ type }: { type: "star" | "snowflake" }) {
  if (type === "star") {
    return (
      <Card className="p-4 bg-slate-900 border-slate-800">
        <CardContent className="p-0">
          <div className="flex flex-col items-center">
            <div className="mb-4 text-center">
              <div className="bg-blue-900 text-white p-3 rounded-md w-64 mb-2">
                <h3 className="font-bold">Fact_Transactions</h3>
                <p className="text-xs text-blue-200">transaction_id (PK)</p>
                <p className="text-xs text-blue-200">book_id (FK)</p>
                <p className="text-xs text-blue-200">member_id (FK)</p>
                <p className="text-xs text-blue-200">date_id (FK)</p>
                <p className="text-xs text-blue-200">status_id (FK)</p>
                <p className="text-xs text-blue-200">borrow_date</p>
                <p className="text-xs text-blue-200">due_date</p>
                <p className="text-xs text-blue-200">return_date</p>
              </div>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-green-900 text-white p-2 rounded-md">
                <h4 className="font-semibold text-sm">Dim_Books</h4>
                <p className="text-xs text-green-200">book_id (PK)</p>
                <p className="text-xs text-green-200">title</p>
                <p className="text-xs text-green-200">author</p>
                <p className="text-xs text-green-200">genre</p>
              </div>
              
              <div className="bg-green-900 text-white p-2 rounded-md">
                <h4 className="font-semibold text-sm">Dim_Members</h4>
                <p className="text-xs text-green-200">member_id (PK)</p>
                <p className="text-xs text-green-200">name</p>
                <p className="text-xs text-green-200">email</p>
                <p className="text-xs text-green-200">status</p>
              </div>
              
              <div className="bg-green-900 text-white p-2 rounded-md">
                <h4 className="font-semibold text-sm">Dim_Dates</h4>
                <p className="text-xs text-green-200">date_id (PK)</p>
                <p className="text-xs text-green-200">date</p>
                <p className="text-xs text-green-200">day</p>
                <p className="text-xs text-green-200">month</p>
                <p className="text-xs text-green-200">year</p>
              </div>
              
              <div className="bg-green-900 text-white p-2 rounded-md">
                <h4 className="font-semibold text-sm">Dim_Status</h4>
                <p className="text-xs text-green-200">status_id (PK)</p>
                <p className="text-xs text-green-200">status_name</p>
                <p className="text-xs text-green-200">description</p>
              </div>
            </div>
            
            <div className="mt-4 text-center text-sm text-slate-400">
              <p>Star Schema: Central fact table connected directly to dimension tables</p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  } else {
    return (
      <Card className="p-4 bg-slate-900 border-slate-800">
        <CardContent className="p-0">
          <div className="flex flex-col items-center">
            <div className="mb-4 text-center">
              <div className="bg-purple-900 text-white p-3 rounded-md w-64 mb-2">
                <h3 className="font-bold">Dim_Books</h3>
                <p className="text-xs text-purple-200">book_id (PK)</p>
                <p className="text-xs text-purple-200">title</p>
                <p className="text-xs text-purple-200">isbn</p>
                <p className="text-xs text-purple-200">author_id (FK)</p>
                <p className="text-xs text-purple-200">publisher_id (FK)</p>
                <p className="text-xs text-purple-200">genre_id (FK)</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div className="bg-indigo-900 text-white p-2 rounded-md">
                <h4 className="font-semibold text-sm">Dim_Authors</h4>
                <p className="text-xs text-indigo-200">author_id (PK)</p>
                <p className="text-xs text-indigo-200">author_name</p>
                <p className="text-xs text-indigo-200">nationality</p>
              </div>
              
              <div className="bg-indigo-900 text-white p-2 rounded-md">
                <h4 className="font-semibold text-sm">Dim_Publishers</h4>
                <p className="text-xs text-indigo-200">publisher_id (PK)</p>
                <p className="text-xs text-indigo-200">publisher_name</p>
                <p className="text-xs text-indigo-200">location</p>
              </div>
              
              <div className="bg-indigo-900 text-white p-2 rounded-md">
                <h4 className="font-semibold text-sm">Dim_Genres</h4>
                <p className="text-xs text-indigo-200">genre_id (PK)</p>
                <p className="text-xs text-indigo-200">genre_name</p>
                <p className="text-xs text-indigo-200">category_id (FK)</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
              <div className="bg-violet-900 text-white p-2 rounded-md">
                <h4 className="font-semibold text-sm">Dim_Categories</h4>
                <p className="text-xs text-violet-200">category_id (PK)</p>
                <p className="text-xs text-violet-200">category_name</p>
                <p className="text-xs text-violet-200">description</p>
              </div>
            </div>
            
            <div className="mt-4 text-center text-sm text-slate-400">
              <p>Snowflake Schema: Normalized dimension tables with hierarchical relationships</p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }
}