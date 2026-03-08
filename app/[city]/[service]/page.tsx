import { Metadata } from "next";
import GHLForm } fm "@/components/GHLForm";
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
      <header className="mb-12 text-center">
        <h1 className="text-4xl font-bold capitalize mb-4">
          {decodedService} in {decodedCity}
        </h1>
        <p className="text-xl text-muted-foreground">
          Top-rated local experts serving the {decodedCity} area with professional {decodedService} solutions.
        </p>
      </header>

      <div className="grid md:grid-cols-2 gap-12 mb-16">
        <div>
          <h2 className="text-2xl font-semibold mb-4">Why Choose Us in {decodedCity}?</h2>
          <p className="mb-4">
            We understand the local needs of {decodedCity} residents. Our team is dedicated to providing 
            high-quality {decodedService} services that deliver results.
          </p>
          <ul className="list-disc pl-6 space-y-2 mb-6 text-muted-foreground">
            <li>Local Expertise in {decodedCity}</li>
            <li>Custom {decodedService} Solutions</li>
            <li>24/7 Customer Support</li>
            <li>Free Consultation & Estimates</li>
          </ul>
        </div>
        <div>
          <h2 className="text-2xl font-semibold mb-4">Get a Free Quote</h2>
          <GHLForm formId="example-id" city={decodedCity} service={decodedService} />
        </div>
      </div>

      <footer className="border-t pt-12 mt-12">
        <h3 className="text-xl font-semibold mb-6">Explore More Areas & Services</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {internalLinks.map((link) => (
            <Link 
              key={link.href} 
              href={link.href}
              className="text-primary hover:underline"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </footer>
    </div>
  );
}

