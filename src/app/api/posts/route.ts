import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    console.log("request :>> ", request);
    return NextResponse.json({
      message: "Posts found",
      data: [],
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}

export async function POST(request: NextRequest) {
  try {
    console.log("request :>> ", request);
    return NextResponse.json({
      message: "Posts Created",
      data: {},
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
