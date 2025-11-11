import { type NextRequest, NextResponse } from "next/server";
import { databaseRequest } from "../../../../lib/databaseConnection";

export async function POST(req: NextRequest) {
  try {
    const isAuthorized = true;

    if (isAuthorized) {
      const { query, variables } = await req.json();
      // biome-ignore lint/suspicious/noConsole: <explanation>
      console.log(
        "Received GraphQL request with query:",
        `${query.substring(0, 100)}...`
      );

      const result = await databaseRequest({ query, variables });

      // Validate that result is a proper object before returning
      if (!result || typeof result !== "object") {
        // biome-ignore lint/suspicious/noConsole: <explanation>
        console.error("Invalid result from databaseRequest:", result);
        return NextResponse.json(
          { error: "Invalid database response" },
          { status: 500 }
        );
      }

      return NextResponse.json(result);
      // biome-ignore lint/style/noUselessElse: <explanation>
    } else {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
  } catch (error) {
    // biome-ignore lint/suspicious/noConsole: <explanation>
    console.error("Error in GraphQL API:", error);
    return NextResponse.json(
      { error: "Internal Server Error", details: error.message },
      { status: 500 }
    );
  }
}
