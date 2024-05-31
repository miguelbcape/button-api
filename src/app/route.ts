import { NextRequest, NextResponse } from "next/server";

export function GET(req: NextRequest) {
  const host = req.url;
  const method = req.method;
  const headers = req.headers.get("accept-language");
  const url_mp3 = host + 'LANG/mp3/IDYT';
  const url_mp4 = host + 'LANG/mp4/IDYT';

  const result = {
    host,
    method,
    url_mp3,
    url_mp4
  };
  return NextResponse.json(result);
}
