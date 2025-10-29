import { HeroNews } from "@/components/features/Media/Hero";
import { News } from "@/components/features/Media/News";
import { mediaService, pressReleaseService } from "@/services/Media/MediaService";

export default async function Page() {
    const mediaData = await mediaService.getMediaPageData();
    const pressReleaseData = await pressReleaseService.getPressReleasePageData();

  return (
    <>
      <div>
        <HeroNews />
        <News mediaData={mediaData} pressReleaseData={pressReleaseData} />
      </div>
    </>
  );
}
