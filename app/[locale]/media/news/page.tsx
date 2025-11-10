import { HeroNews } from "@/components/features/Media/Hero";
import { News } from "@/components/features/Media/News";
import {
  mediaService,
  pressReleaseService,
} from "@/services/Media/MediaService";
import { NewsPageProps } from "@/types/Media/Media";

export default async function Page({params: {locale}}: NewsPageProps) {
  const [mediaData, pressReleaseData, latestNewsData] = await Promise.all([
    mediaService.getMediaPageData(locale),
    pressReleaseService.getPressReleasePageData(locale),
    pressReleaseService.getLatestNewsData(locale),
  ]);
  return (
    <>
      <div>
        <HeroNews latestNewsData={latestNewsData} />
        <News mediaData={mediaData} pressReleaseData={pressReleaseData} />
      </div>
    </>
  );
}
