import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { dbConnection } from "../../../../lib/databaseConnection";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const relativePath = searchParams.get("relativePath");

    if (!relativePath) {
      return NextResponse.json(
        { error: "relativePath parameter is required" },
        { status: 400 }
      );
    }

    const result = await dbConnection.queries.apiSchema({
      relativePath,
    });

    return NextResponse.json(result);
  } catch (error) {
    // biome-ignore lint/suspicious/noConsole: <explanation>
    console.error("Error fetching schema:", error);
    return NextResponse.json(
      { error: "Failed to fetch schema" },
      { status: 500 }
    );
  }
}
