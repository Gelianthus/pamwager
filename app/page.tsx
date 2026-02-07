import JsonDisplay from "@/components/JsonDisp";
import metadata from "@/data/metadata.json";
import metal from "@/data/metal.json";
import metalC from "@/data/metalByCountry.json";
import metalCs from "@/data/metalByCountries.json";

const supportedCountries = [
  { country_code: "US", country: "United States" },
  { country_code: "CN", country: "China" },
  { country_code: "IN", country: "India" },
  { country_code: "DE", country: "Germany" },
  { country_code: "FR", country: "France" },
  { country_code: "GB", country: "United Kingdom" },
  { country_code: "CH", country: "Switzerland" },
  { country_code: "AE", country: "United Arab Emirates" },
  { country_code: "HK", country: "Hong Kong" },
  { country_code: "JP", country: "Japan" },
  { country_code: "AU", country: "Australia" },
  { country_code: "KR", country: "South Korea" }
];

export default function Home() {
  return (
    <div className="bg-stone-100 min-h-screen px-4 sm:px-8 lg:px-20 py-16 sm:py-24">
      
      <div className="max-w-6xl mx-auto border-x border-solid px-4 sm:px-8">
        
        <h1 className="text-3xl sm:text-5xl lg:text-6xl mb-4 font-medium">
          PAMWAGER
        </h1>

        <p className="text-base sm:text-lg lg:text-xl mb-10 sm:mb-12 max-w-3xl">
          Get updated prices of Gold and Silver in troy ounce unit in countries
          where these precious metals are heavily in-demand or highly consumed.
        </p>

        <span className="font-bold text-sm sm:text-base">
          SUPPORTED COUNTRIES
        </span>

        <ul className="flex flex-wrap gap-3 sm:gap-4 my-4">
          {supportedCountries.map((c, index) => (
            <li
              className="px-3 py-1.5 text-sm sm:text-base border rounded-full bg-stone-50"
              key={index}
            >
              <span>{c.country}</span> |{" "}
              <span className="font-mono">{c.country_code}</span>
            </li>
          ))}
        </ul>

        <span className="font-bold text-sm sm:text-base">ENDPOINTS</span>

        <div className="my-4 space-y-6">
          <div>
            <span className="block mb-2">
              <b>Metadata endpoint:</b> /api/v1/precious-metals
            </span>
            <JsonDisplay data={metadata} />
          </div>

          <div>
            <span className="block mb-2">
              <b>Get a metal's price in all supported countries:</b>{" "}
              /api/v1/precious-metals/{`[metal]`}
            </span>
            <JsonDisplay data={metal} />
          </div>

          <div>
            <span className="block mb-2">
              <b>Get a metal's price in a specific country:</b>{" "}
              /api/v1/precious-metals/{`[metal]?country=[country-code]`}
            </span>
            <JsonDisplay data={metalC} />
          </div>

          <div>
            <span className="block mb-2">
              <b>Get a metal's price in multiple countries:</b>{" "}
              /api/v1/precious-metals/{`[metal]?country=[country-code]&country=[country-code]`}
            </span>
            <JsonDisplay data={metalCs} />
          </div>
        </div>

      </div>
    </div>
  );
}
