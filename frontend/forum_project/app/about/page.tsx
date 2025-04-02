'use client'
import { AppSidebar } from "@/components/app-sidebar"
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"
import Header from "@/components/Header"

export default function About() {
  const packages = [
    {
      name: "Backend Technologies",
      items: [
        { name: "Node.js", description: "JavaScript runtime environment" },
        { name: "Express.js", description: "Web application framework for Node.js" },
        { name: "MongoDB", description: "NoSQL database" },
        { name: "Mongoose", description: "MongoDB object modeling for Node.js" },
        { name: "bcrypt", description: "Library for hashing passwords" },
        { name: "validator", description: "Library for string validation and sanitization" },
        { name: "jsonwebtoken", description: "Implementation of JSON Web Tokens" },
        { name: "cors", description: "Middleware for enabling CORS" },
        { name: "dotenv", description: "Module to load environment variables" }
      ]
    },
    {
      name: "Frontend Technologies",
      items: [
        { name: "Next.js", description: "React framework for production" },
        { name: "React", description: "JavaScript library for building user interfaces" },
        { name: "shadcn/ui", description: "UI component library" },
        { name: "Tailwind CSS", description: "Utility-first CSS framework" },
        { name: "Axios", description: "Promise-based HTTP client" },
        { name: "Lucide React", description: "Icon library" }
      ]
    }
  ]

  return (
    <div>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <div className="p-6 pb-0">
            <Header />
          </div>
          <div className="flex flex-1 flex-col gap-4 px-4 pb-10">
            <div className="mx-auto h-full w-full max-w-3xl rounded-xl p-6">
              <h1 className="text-3xl font-bold mb-6">About This Project</h1>
              
              <div className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">Project Overview</h2>
                <p className="text-gray-700 dark:text-gray-300">
                  This forum application was developed as part of the CCAPDEV course. 
                  It features user authentication, post creation, commenting, and content discovery.
                </p>
              </div>

              <div className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">Technologies Used</h2>
                
                {packages.map((category) => (
                  <div key={category.name} className="mb-6">
                    <h3 className="text-xl font-medium mb-3">{category.name}</h3>
                    <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                      <ul className="space-y-2">
                        {category.items.map((pkg) => (
                          <li key={pkg.name} className="flex flex-col sm:flex-row sm:justify-between py-2 border-b border-gray-200 dark:border-gray-700 last:border-0">
                            <span className="font-medium">{pkg.name}</span>
                            <span className="text-gray-600 dark:text-gray-400">{pkg.description}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </SidebarInset>
      </SidebarProvider>
    </div>
  )
}