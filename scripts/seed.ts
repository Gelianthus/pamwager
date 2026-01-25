import dotenv from "dotenv";
dotenv.config({ path: "./.env" });
import mongoose from "mongoose";
import Country from "@/lib/mongoose/models/Country";
import Metal from "@/lib/mongoose/models/Metal";
import mongoConnection from "@/lib/mongoose/mongoConnection";

async function seedMetals() {
  try {
    await mongoConnection();

    console.log("Clearing existing metals...");
    await Metal.deleteMany({});

    const getCountryId = async (code: string) => {
      const country = await Country.findOne({ code });
      if (!country) {
        throw new Error(`Country with code ${code} not found`);
      }
      return country._id;
    };

    console.log("Fetching country IDs...");

    const countryIds: Record<string, mongoose.Types.ObjectId> = {
      US: await getCountryId("US"),
      CN: await getCountryId("CN"),
      IN: await getCountryId("IN"),
      DE: await getCountryId("DE"),
      FR: await getCountryId("FR"),
      GB: await getCountryId("GB"),
      CH: await getCountryId("CH"),
      AE: await getCountryId("AE"),
      HK: await getCountryId("HK"),
      JP: await getCountryId("JP"),
      AU: await getCountryId("AU"),
      KR: await getCountryId("KR"),
    };

    console.log("Inserting gold...");

    await Metal.create({
      name: "gold",
      unit: {
        code: "troy_ounce",
        label: "Troy ounce",
        symbol: "ozt",
      },
      prices: [
        { country: countryIds.US, value: 4828.35 },
        { country: countryIds.CN, value: 33656.40 },
        { country: countryIds.IN, value: 441941.00 },
        { country: countryIds.DE, value: 4129.55 },
        { country: countryIds.FR, value: 4129.55 },
        { country: countryIds.GB, value: 3591.20 },
        { country: countryIds.CH, value: 3831.65 },
        { country: countryIds.AE, value: 17734.50 },
        { country: countryIds.HK, value: 37559.80 },
        { country: countryIds.JP, value: 766180.00 },
        { country: countryIds.AU, value: 7098.30 },
        { country: countryIds.KR, value: 7088470 },
      ],
    });

    console.log("Inserting silver...");

    await Metal.create({
      name: "silver",
      unit: {
        code: "troy_ounce",
        label: "Troy ounce",
        symbol: "ozt",
      },
      prices: [
        { country: countryIds.US, value: 93.72 },
        { country: countryIds.CN, value: 653.25 },
        { country: countryIds.IN, value: 8578.40 },
        { country: countryIds.DE, value: 80.15 },
        { country: countryIds.FR, value: 80.15 },
        { country: countryIds.GB, value: 69.70 },
        { country: countryIds.CH, value: 74.35 },
        { country: countryIds.AE, value: 344.20 },
        { country: countryIds.HK, value: 728.95 },
        { country: countryIds.JP, value: 14872.00 },
        { country: countryIds.AU, value: 137.80 },
        { country: countryIds.KR, value: 137530 },
      ],
    });

    console.log("seeding success");
    process.exit(0);
  } catch (error) {
    console.error("seeding failed:", error);
    process.exit(1);
  }
}

seedMetals();
