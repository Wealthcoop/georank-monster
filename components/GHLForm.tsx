'use client';

interface GHLFormProps {
  formId?: string;
  city?: string;
  service?: string;
}

export default function GHLForm({
  formId = '1yRUcjwKC4I6IftFkJNZ',
  city,
  service,
}: GHLFormProps) {
  const params = new URLSearchParams();
  if (city) params.append('city', city);
  if (service) params.append('service', service);
  const queryString = params.toString();
  const src = `https://api.leadconnectorhq.com/widget/form/${formId}${queryString ? `?${queryString}` : ''}`;

  return (
    <div className="w-full" style={{ height: '833px' }}>
      <iframe
        src={src}
        style={{ width: '100%', height: '100%', border: 'none', borderRadius: '3px' }}
        id={`inline-${formId}`}
        data-layout="{'id':'INLINE'}"
        data-trigger-type="alwaysShow"
        data-trigger-value=""
        data-activation-type="alwaysActivated"
        data-activation-value=""
        data-deactivation-type="neverDeactivate"
        data-deactivation-value=""
        data-form-name="GeoRank Lead Form"
        data-height="833"
        data-layout-iframe-id={`inline-${formId}`}
        data-form-id={formId}
        title="GeoRank Lead Form"
      />
      <script src="https://link.msgsndr.com/js/form_embed.js" async></script>
    </div>
  );
}
