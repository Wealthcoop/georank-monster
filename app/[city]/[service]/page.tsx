import { Metadata } from "next";
import GHLForm from "@/components/GHLForm";
import { generateSiloUrl, getInternalLinks } from "@/lib/silo-utils";
import Link from "next/link";

interface PageProps {
  params: Promise<{
    city: string;
    service: string;
  }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { city, service } = await params;
  const decodedCity = decodeURIComponent(city).replace(/-/g, " ");
  const decodedService = decodeURIComponent(service).replace(/-/g, " ");

  return {
    title: `${decodedService} in ${decodedCity} | GeoRank Monster`,
    description: `Expert ${decodedService} services for residents in ${decodedCity}. Get a free quote today!`,
  };
}

export default async function SiloPage({ params }: PageProps) {
  const { city, service } = await params;
  const decodedCity = decodeURIComponent(city).replace(/-/g, " ");
  const decodedService = decodeURIComponent(service).replace(/-/g, " ");

  // Mock data for links (in a real app, these would come from the project config)
  const nearbyCities = ["San Francisco", "Oakland", "San Jose", "Berkeley"];
  const otherServices = ["Web Design", "SEO", "Lead Generation"];

  const internalLinks = getInternalLinks(decodedCity, decodedService, nearbyCities, otherServices);

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <h1 className="text-4xl font-bold mb-4">
        {decodedService} in {decodedCity}
      </h1>
      <p className="text-lg text-muted-foreground mb-8">
        Expert {decodedService} services for residents in {decodedCity}. Get a free quote today!
      </p>

      <div className="mb-12">
        <GHLForm formId="your-form-id" city={decodedCity} service={decodedService} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
        <div>
          <h2 className="text-2xl font-semibold mb-4">Nearby Cities</h2>
          <ul className="space-y-2">
            {internalLinks.cityLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="text-primary hover:underline">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="text-2xl font-semibold mb-4">Other Services</h2>
          <ul className="space-y-2">
            {internalLinks.serviceLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="text-primary hover:underline">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
