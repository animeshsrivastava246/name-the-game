import { MetadataRoute } from 'next';
import { db } from "@/shared/config/firebase";
import { query, collection, getDocs } from "firebase/firestore";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://name-the-game.vercel.app";

  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1.0,
    },
    {
      url: `${baseUrl}/discover`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/forums`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/garden`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.8,
    },
  ];

  let postPages: MetadataRoute.Sitemap = [];
  try {
    const q = query(collection(db, "posts"));
    const snapshots = await getDocs(q);
    postPages = snapshots.docs.map((doc) => {
      const data = doc.data();
      const seconds = data.created_at?.seconds || Math.floor(Date.now() / 1000);
      return {
        url: `${baseUrl}/${doc.id}`,
        lastModified: new Date(seconds * 1000),
        changeFrequency: 'weekly' as const,
        priority: 0.6,
      };
    });
  } catch (error) {
    console.error("Failed to fetch posts for sitemap:", error);
  }

  return [...staticPages, ...postPages];
}
