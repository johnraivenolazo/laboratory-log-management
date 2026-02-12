export const runtime = 'edge';
import { handleUpload, HandleUploadBody } from '@vercel/blob/client';
import { NextResponse } from 'next/server';

export async function POST(request: Request): Promise<NextResponse> {
    const body = (await request.json()) as HandleUploadBody;

    try {
        const jsonResponse = await handleUpload({
            body,
            request,
            onBeforeGenerateToken: async (_pathname) => {
                // Authenticated? We check this client-side via Firebase user.
                // For strict security, you would pass a token here.
                // For now, we allow uploads if they match our content type.
                return {
                    allowedContentTypes: ['application/pdf'],
                    tokenPayload: JSON.stringify({
                        // optional payload
                    }),
                };
            },
            onUploadCompleted: async ({ blob: _blob, tokenPayload: _tokenPayload }) => {
                // Log upload?
                // console.log('blob uploaded', _blob.url);
            },
        });

        return NextResponse.json(jsonResponse);
    } catch (error) {
        return NextResponse.json(
            { error: (error as Error).message },
            { status: 400 },
        );
    }
}
