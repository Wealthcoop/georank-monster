'use client';

interface GHLFormProps {
  formId: string;
  city?: string;
  service?: string;
}

export default function GHLForm({ formId, city, service }: GHLFormProps) {
  // Construct GHL URL with dynamic custom fields
  const baseUrl = `https://link.msgsndr.com/widget/form/${formId}`;
  const params = new URLSearchParams();
  if (city) params.append('city', city);
  if (service) params.append('service', service);

  const finalUrl = `${baseUrl}?${params.toString()}`;

  return (
    <div className="w-full overflow-hidden rounded-xl border bg-white shadow-sm" style={{ minHeight: '600px' }}>
      <iframe
        src={finalUrl}
        style={{ width: '100%', height: '600px', border: 'none' }}
        id={`inline-${formId}`}
        data-form-name="GeoRank Lead Form"
        title="GHL Form"
      />
      <script src="https://link.msgsndr.com/js/form_embed.js" async></script>
    </div>
  );
}
