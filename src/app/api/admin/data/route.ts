import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { extractSessionToken, isValidSession } from "@/lib/auth";

const dataFilePath = path.join(process.cwd(), "src", "data", "siteData.json");

// Max allowed payload size: 5 MB
const MAX_PAYLOAD_BYTES = 5 * 1024 * 1024;

export async function GET() {
  try {
    if (!fs.existsSync(dataFilePath)) {
      return NextResponse.json({ error: "Data store not found" }, { status: 404 });
    }
    const raw = fs.readFileSync(dataFilePath, "utf8");
    const data = JSON.parse(raw);

    // SECURITY SANITIZATION:
    // Strip out all internal security / credentials so public visitors never receive them
    if (data.security) {
      delete data.security;
    }

    return NextResponse.json({ success: true, data });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    // 1. MANDATORY ACCESS CONTROL CHECK:
    // Only requests with an active, valid administrator session can save data
    const token = extractSessionToken(req);
    if (!isValidSession(token)) {
      return NextResponse.json(
        { 
          error: "Akses ditolak: Sesi administrator tidak sah atau telah berakhir. Silakan login kembali." 
        }, 
        { status: 401 }
      );
    }

    // 2. PAYLOAD SIZE VALIDATION
    const rawBody = await req.text();
    if (Buffer.byteLength(rawBody, "utf8") > MAX_PAYLOAD_BYTES) {
      return NextResponse.json(
        { error: "Payload terlalu besar. Batas maksimum adalah 5MB." },
        { status: 413 }
      );
    }

    let body: any;
    try {
      body = JSON.parse(rawBody);
    } catch {
      return NextResponse.json({ error: "Format JSON tidak valid" }, { status: 400 });
    }

    if (!body || typeof body !== "object" || Array.isArray(body)) {
      return NextResponse.json({ error: "Payload harus berupa objek data yang valid" }, { status: 400 });
    }

    // Read current data store
    let currentData: any = {};
    if (fs.existsSync(dataFilePath)) {
      currentData = JSON.parse(fs.readFileSync(dataFilePath, "utf8"));
    }

    // Preserve existing security credentials from being overwritten by public client
    const existingSecurity = currentData.security;

    const updatedData = {
      ...currentData,
      ...body,
      // Ensure security credentials remain intact on disk
      security: existingSecurity,
      lastUpdated: new Date().toISOString(),
    };

    fs.writeFileSync(dataFilePath, JSON.stringify(updatedData, null, 2), "utf8");

    // Return sanitized data (omit security field)
    const sanitizedReturn = { ...updatedData };
    delete sanitizedReturn.security;

    return NextResponse.json({ 
      success: true, 
      message: "Data berhasil diperbarui secara aman", 
      data: sanitizedReturn 
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
