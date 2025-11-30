// import { MetadataRoute } from "next";

// const baseUrl = "https://cdi-be.cmlabs.dev";

// export default function robots(): MetadataRoute.Robots {
//   return {
//     rules: {
//       userAgent: "*",
//       allow: "/",
//     },
//     sitemap: `${baseUrl}/sitemap.xml`,
//   };
// }

import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_URL ?? "https://cdi-fe.cmlabs.dev"; 

  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}