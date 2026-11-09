import { NextResponse } from "next/server";
import { 
  verifyAdminPin, 
  updateAdminPin, 
  createSession, 
  isValidSession, 
  invalidateSession, 
  extractSessionToken,
  extractClientIp,
  checkLoginRateLimit,
  recordFailedLogin,
  resetFailedLogin
} from "@/lib/auth";

export async function GET(req: Request) {
  try {
    const token = extractSessionToken(req);
    const authenticated = isValidSession(token);
    return NextResponse.json({ authenticated });
  } catch (err: any) {
    return NextResponse.json({ authenticated: false, error: err.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const action = body?.action || "login";

    // 1. LOGIN ACTION
    if (action === "login") {
      const clientIp = extractClientIp(req);
      const rateCheck = checkLoginRateLimit(clientIp);
      if (!rateCheck.allowed) {
        return NextResponse.json({ 
          success: false, 
          error: `Terlalu banyak percobaan gagal. Akses dibatasi sementara selama ${rateCheck.waitMinutes} menit demi keamanan.` 
        }, { status: 429 });
      }

      const pin = String(body?.pin || "").trim();
      if (!pin) {
        return NextResponse.json({ success: false, error: "Kode PIN wajib diisi" }, { status: 400 });
      }

      const isValid = verifyAdminPin(pin);
      if (!isValid) {
        recordFailedLogin(clientIp);
        return NextResponse.json({ success: false, error: "Kode PIN salah. Akses ditolak." }, { status: 401 });
      }

      // Reset failed counter upon successful login
      resetFailedLogin(clientIp);

      const token = createSession();
      const response = NextResponse.json({
        success: true,
        message: "Login berhasil",
        token,
      });

      // Set secure HTTP-only cookie
      response.cookies.set({
        name: "mpm_admin_token",
        value: token,
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        path: "/",
        maxAge: 12 * 60 * 60, // 12 hours
      });

      return response;
    }

    // 2. LOGOUT ACTION
    if (action === "logout") {
      const token = extractSessionToken(req);
      invalidateSession(token);

      const response = NextResponse.json({
        success: true,
        message: "Logout berhasil",
      });

      response.cookies.delete("mpm_admin_token");
      return response;
    }

    // 3. CHANGE PIN ACTION
    if (action === "change-pin") {
      const token = extractSessionToken(req);
      const isAuth = isValidSession(token);

      const oldPin = String(body?.oldPin || "").trim();
      const newPin = String(body?.newPin || "").trim();

      if (!isAuth && !verifyAdminPin(oldPin)) {
        return NextResponse.json({ 
          success: false, 
          error: "Sesi tidak sah atau PIN lama salah." 
        }, { status: 401 });
      }

      if (!newPin || newPin.length < 4 || newPin.length > 10) {
        return NextResponse.json({ 
          success: false, 
          error: "PIN baru harus terdiri dari 4 hingga 10 karakter." 
        }, { status: 400 });
      }

      const updated = updateAdminPin(newPin);
      if (!updated) {
        return NextResponse.json({ 
          success: false, 
          error: "Gagal memperbarui PIN di data store." 
        }, { status: 500 });
      }

      return NextResponse.json({
        success: true,
        message: "Kode PIN administrator berhasil diperbarui secara aman.",
      });
    }

    return NextResponse.json({ success: false, error: "Aksi tidak dikenal" }, { status: 400 });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
