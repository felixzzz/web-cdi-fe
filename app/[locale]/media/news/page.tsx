import { HeroNews } from "@/components/features/Media/Hero";
import { News } from "@/components/features/Media/News";
import {
  mediaService,
  pressReleaseService,
} from "@/services/Media/MediaService";

export default async function Page() {
  const [mediaData, pressReleaseData, latestNewsData] = await Promise.all([
    mediaService.getMediaPageData(),
    pressReleaseService.getPressReleasePageData(),
    pressReleaseService.getLatestNewsData(),
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
