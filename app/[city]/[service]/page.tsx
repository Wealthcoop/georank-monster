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
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">
        {decodedService} in {decodedCity}
      </h1>
      <p className="text-lg mb-6">
        Looking for professional {decodedService} services in {decodedCity}? You've come to the right place.
        Our expert team provides top-quality {decodedService} solutions tailored to your needs.
      </p>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Get a Free Quote</h2>
        <GHLForm />
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-3">Nearby Cities</h2>
        <ul className="flex flex-wrap gap-2">
          {internalLinks.cityLinks.map((link) => (
            <li key={link.href}>
              {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
              <Link href={link.href as any} className="text-primary hover:underline">
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-3">Other Services</h2>
        <ul className="flex flex-wrap gap-2">
          {internalLinks.serviceLinks.map((link) => (
            <li key={link.href}>
              {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
              <Link href={link.href as any} className="text-primary hover:underline">
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
