import { NextRequest, NextResponse } from "next/server";
import { revalidatePath, revalidateTag } from "next/cache";

export const dynamic = "force-dynamic";

interface RevalidateRequestBody {
  tag?: string;
  path?: string;
  type?: "page" | "layout";
}

function validateSecret(request: NextRequest): boolean {
  const secretFromQuery = request.nextUrl.searchParams.get("secret");
  const secretFromHeader = request.headers.get("x-revalidate-secret");
  const authHeader = request.headers.get("authorization");
  const secretFromBearer = authHeader ? authHeader.replace(/^Bearer\s+/i, "") : null;

  const providedSecret = secretFromQuery || secretFromHeader || secretFromBearer;
  const expectedSecret = process.env.REVALIDATION_SECRET_TOKEN || "cdi-revalidate-secret-token-2026";

  return !!providedSecret && providedSecret === expectedSecret;
}

export async function POST(request: NextRequest): Promise<NextResponse> {
  if (!validateSecret(request)) {
    return NextResponse.json({ message: "Invalid revalidation secret token" }, { status: 401 });
  }

  try {
    let body: RevalidateRequestBody = {};
    try {
      body = (await request.json()) as RevalidateRequestBody;
    } catch {
      // Body is optional
    }

    const tag = body?.tag || request.nextUrl.searchParams.get("tag");
    const path = body?.path || request.nextUrl.searchParams.get("path");
    const type = (body?.type || request.nextUrl.searchParams.get("type") || "layout") as "page" | "layout";

    const revalidatedItems: string[] = [];

    // 1. Tag revalidation if provided
    if (tag) {
      revalidateTag(tag);
      revalidatedItems.push(`tag:${tag}`);
    }

    // 2. Path revalidation if provided
    if (path && path !== "all") {
      revalidatePath(path, type);
      revalidatedItems.push(`path:${path}(${type})`);
    }

    // 3. If no specific target or "all" is requested, revalidate all layouts and global tags
    if (!tag && (!path || path === "all" || path === "/")) {
      revalidatePath("/", "layout");
      revalidateTag("cms-data");
      revalidateTag("seo-metadata");
      revalidatedItems.push("path:/(layout)", "tag:cms-data", "tag:seo-metadata");
    }

    return NextResponse.json({
      revalidated: true,
      timestamp: Date.now(),
      details: revalidatedItems,
    });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    return NextResponse.json(
      {
        revalidated: false,
        message: "Failed to revalidate cache",
        error: errorMessage,
      },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest): Promise<NextResponse> {
  if (!validateSecret(request)) {
    return NextResponse.json({ message: "Invalid revalidation secret token" }, { status: 401 });
  }

  try {
    const tag = request.nextUrl.searchParams.get("tag");
    const path = request.nextUrl.searchParams.get("path");
    const type = (request.nextUrl.searchParams.get("type") || "layout") as "page" | "layout";

    const revalidatedItems: string[] = [];

    if (tag) {
      revalidateTag(tag);
      revalidatedItems.push(`tag:${tag}`);
    }

    if (path && path !== "all") {
      revalidatePath(path, type);
      revalidatedItems.push(`path:${path}(${type})`);
    }

    if (!tag && (!path || path === "all" || path === "/")) {
      revalidatePath("/", "layout");
      revalidateTag("cms-data");
      revalidateTag("seo-metadata");
      revalidatedItems.push("path:/(layout)", "tag:cms-data", "tag:seo-metadata");
    }

    return NextResponse.json({
      revalidated: true,
      timestamp: Date.now(),
      details: revalidatedItems,
    });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    return NextResponse.json(
      {
        revalidated: false,
        message: "Failed to revalidate cache",
        error: errorMessage,
      },
      { status: 500 }
    );
  }
}
