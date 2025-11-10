import { BocBiography } from "@/components/features/AboutUs/management/Details/Biography";
import { DocumentDownload } from "@/components/features/AboutUs/management/Details/Document";
import { DetailHero } from "@/components/features/AboutUs/management/Details/Hero";
import { managementService } from "@/services/AboutUs/ManagementService";
import { DownloadItem } from "@/types/AboutUs/Management";
import { notFound } from "next/navigation";

export type PageProps = {
  params: {
    ulid: string;
    locale: string;
  };
};

const FILE_PREVIEW_BASE_URL = "https://chandradaya-investasi.com/file/preview/";
const FILE_DOWNLOAD_BASE_URL =
  "https://chandradaya-investasi.com/file/download/";

export default async function page({ params }: PageProps) {
  const [BodData, BocData] = await Promise.all([
    managementService.getManagementBodData(params.locale),
    managementService.getManagementBocData(params.locale),
  ]);

  const member = [...BodData, ...BocData].find(
    (item) => item.ulid === params.ulid
  );

  if (!member) {
    notFound();
  }

  const description =
    params.locale === "id" ? member.description_id : member.description_en;

  const documentItems: DownloadItem[] = [];
  if (member.cv_file && member.cv_file.path) {
    documentItems.push({
      title: `CV - ${member.name}`,
      size: member.cv_file.size,
      format: member.cv_file.format,
      viewUrl: `${FILE_PREVIEW_BASE_URL}${member.cv_file.path}`,
      downloadUrl: `${FILE_DOWNLOAD_BASE_URL}${member.cv_file.path}`,
    });
  }

  return (
    <main>
      <DetailHero
        name={member.name}
        title={member.position}
        imageUrl={`https://chandradaya-investasi.com/file-storage/${member.image_hero}`}
        backLinkHref={`/${params.locale}/about-us/management`}
      />
      <BocBiography biographyHtml={description} />
      <div className="border border-neutral-200 w-full"></div>
      <DocumentDownload items={documentItems} />
    </main>
  );
}
