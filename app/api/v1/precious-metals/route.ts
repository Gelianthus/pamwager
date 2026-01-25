import { NextResponse } from "next/server";
import mongoConnection from '@/lib/mongoose/mongoConnection';
import "@/lib/mongoose/models/Country";
import Metal from "@/lib/mongoose/models/Metal";

export async function GET() {
    await mongoConnection();

    const metals = await Metal.find().populate("prices.country", "code").lean();

    const res = metals.map((metal) => ({
        metal: metal.name,
        unit: metal.unit,
        supportedCountries: Array.from(new Set(metal.prices.map((p: any) => {return p.country.code })))
    }))

    return NextResponse.json({
        metals: res,
        lastUpdated: new Date().toISOString()
    }, {
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET",
            "Cache-Control": "public, s-maxage=86400, stale-while-revalidate=3600"
        }
    })
}