import { NextResponse } from "next/server";

export async function POST() {
  return NextResponse.json(
    {
      ok: false,
      message: "Demo mode: contact delivery backend is not configured yet.",
    },
    { status: 501 },
  );
}
