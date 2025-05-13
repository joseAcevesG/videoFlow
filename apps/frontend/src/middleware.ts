import { type NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
	// Don't protect these paths
	if (
		request.nextUrl.pathname.startsWith("/authenticate") ||
		request.nextUrl.pathname.startsWith("/_next") ||
		request.nextUrl.pathname.startsWith("/api")
	) {
		return NextResponse.next();
	}

	try {
		console.log(
			`[Auth] Checking authentication for ${request.nextUrl.pathname}`,
		);
		const apiUrl = process.env.NEXT_PUBLIC_API_URL || request.nextUrl.origin;
		const apiRes = await fetch(`${apiUrl}/api/auth/status`, {
			method: "GET",
			headers: {
				Cookie: request.headers.get("cookie") || "",
			},
		});

		const data = await apiRes.json();
		console.log("[Auth] Status response:", data);
		let response: NextResponse;

		if (request.nextUrl.pathname.startsWith("/auth")) {
			if (data.authenticated) {
				console.log("[Auth] Authenticated, redirecting to /");
				response = NextResponse.redirect(new URL("/", request.url));
			}
			console.log("[Auth] Allowing access to /auth");
			response = NextResponse.next();
		}

		if (!data.authenticated) {
			console.log("[Auth] Not authenticated, redirecting to /auth");
			response = NextResponse.redirect(new URL("/auth", request.url));
		}

		console.log(
			"[Auth] Authenticated, allowing access to",
			request.nextUrl.pathname,
		);
		response = NextResponse.next();
		const setCookie = apiRes.headers.get("set-cookie");
		if (setCookie) {
			console.log("[Auth] Setting cookie");
			response.headers.append("set-cookie", setCookie);
		}
		return response;
	} catch (error) {
		console.error("[Auth] Error checking authentication:", error);
		// If there's an error checking authentication, redirect to login
		return NextResponse.redirect(new URL("/auth", request.url));
	}
}
