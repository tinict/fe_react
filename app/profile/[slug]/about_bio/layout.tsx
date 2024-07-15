import { Metadata } from "next";
import Link from "next/link";

// export const metadata: Metadata = {
//   title: {
//     default: siteConfig.name,
//     template: `%s - ${siteConfig.name}`,
//   },
//   description: siteConfig.description,
//   icons: {
//     icon: "/favicon.ico",
//   },
// };

export default function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <section className="flex flex-col">
        <div className="flex space-x-4 p-4">
          <div className="w-1/3 p-4 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-2">Introduce</h3>
            <ul className="space-y-2">
              <li className="bg-gray-100 rounded-lg">
                <Link
                  href="./about_overview" 
                  className="block p-4 text-gray-700 hover:bg-gray-200 rounded-lg transition-all duration-200">
                  Overview
                </Link>
              </li>
              <li className="bg-gray-100 rounded-lg">
                <Link
                  href="./about_basic_info"
                  className="block p-4 text-gray-700 hover:bg-gray-200 rounded-lg transition-all duration-200">
                  Personal Information
                </Link>
              </li>
              <li className="bg-gray-100 rounded-lg">
                <Link href="./about_bio" className="block p-4 text-gray-700 hover:bg-gray-200 rounded-lg transition-all duration-200">
                  Bio
                </Link>
              </li>
            </ul>
          </div>
          <div className="w-2/3 bg-white p-4 rounded-lg shadow-md">
            {children}
          </div>
        </div>
      </section>
    </>
  )
};
