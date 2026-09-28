import { informationService } from "@/services/Global/informationService";

export const dynamic = "force-dynamic";

export async function GET(): Promise<Response> {
  const { llms_txt } = await informationService.getLlmsData();

  return new Response(llms_txt, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=0, must-revalidate",
    },
  });
}
