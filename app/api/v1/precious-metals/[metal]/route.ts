import { NextResponse } from "next/server";
import "@/lib/mongoose/models/Country";
import Metal from "@/lib/mongoose/models/Metal";
import mongoConnection from '@/lib/mongoose/mongoConnection';
import { z } from "zod";

const querySchema = z.object({
    country: z.array(z.string().length(2)).optional().transform(arr => arr?.map(c => c.toUpperCase()))
});

export async function GET(req: Request, { params }: { params: { metal: string } }) {
    const { metal } = await params;
    const { searchParams } = new URL(req.url);

    const countryParams = searchParams.getAll("country");

    const parseResult = querySchema.safeParse({ country: countryParams });
    if (!parseResult.success) {
        return NextResponse.json(
            { error: "Invalid query parameters" },
            {
                status: 400,
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Methods": "GET",
                    "Cache-Control": "public, s-maxage=86400, stale-while-revalidate=3600"
                }
            }
        );
    }

    const countriesFilter = parseResult.data.country;

    await mongoConnection();

    const metalDocument = await Metal.findOne({ name: metal.toLowerCase() }).populate("prices.country").lean();

    if (!metalDocument) {
        return NextResponse.json(
            { error: "Metal not found" },
            {
                status: 404,
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Methods": "GET",
                    "Cache-Control": "public, s-maxage=86400, stale-while-revalidate=3600"
                }
            }
        );
    }

    let prices = metalDocument.prices.filter((p: any) => p.country && p.country.code)
    .map((p: any) => ({
        country: p.country.code,
        currency: p.country.currency,
        value: p.value
    }));

    if (countriesFilter && countriesFilter.length > 0) {
        prices = prices.filter((p: any) => countriesFilter.includes(p.country));
    }

    return NextResponse.json(
        {
            metal: metalDocument.name,
            unit: metalDocument.unit, 
            prices:prices,
            lastUpdated: metalDocument.updatedAt
        },
        {
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "GET",
                "Cache-Control": "public, s-maxage=86400, stale-while-revalidate=3600"
            }
        }
    );
}
