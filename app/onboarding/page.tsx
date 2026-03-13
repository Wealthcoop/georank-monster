'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';

const STEPS = [
  'Business Info',
  'Target Areas',
  'Services',
  'Lead Forms',
  'Style & Branding',
  'Review & Generate'
];

export default function OnboardingWizard() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    businessName: '',
    niche: '',
    cities: '',
    pillarServices: '',
    addLeadForms: false,
    formType: 'ghl',
    ghlLocationId: '',
    primaryColor: '#3b82f6',
  });
  const [generating, setGenerating] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('georank_wizard');
    if (saved) {
      try {
        setFormData(JSON.parse(saved));
      } catch (e) {
        console.error('Error parsing saved data', e);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('georank_wizard', JSON.stringify(formData));
  }, [formData]);

  const nextStep = () => setStep((s) => Math.min(s + 1, STEPS.length));
  const prevStep = () => setStep((s) => Math.max(s - 1, 1));

  const handleGenerate = async () => {
    setGenerating(true);
    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const result = await response.json();
      if (result.success) {
        alert('Pages generated successfully!');
        localStorage.removeItem('georank_wizard');
      } else {
        alert('Error: ' + result.error);
      }
    } catch (error) {
      alert('Error generating pages');
    }
    setGenerating(false);
  };

  const progress = (step / STEPS.length) * 100;

  return (
    <div className="container mx-auto px-4 py-12 max-w-2xl">
      <div className="mb-8">
        <div className="flex justify-between text-sm mb-2">
          <span>Step {step} of {STEPS.length}</span>
          <span className="font-semibold">{STEPS[step - 1]}</span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{STEPS[step - 1]}</CardTitle>
          <CardDescription>Fill out the details below to generate your SEO silo.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {step === 1 && (
            <>
              <div className="space-y-2">
                <Label htmlFor="businessName">Business Name</Label>
                <Input
                  id="businessName"
                  value={formData.businessName}
                  onChange={(e) => setFormData({...formData, businessName: e.target.value})}
                  placeholder="e.g. Acme Plumbing"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="niche">Niche</Label>
                <Input
                  id="niche"
                  value={formData.niche}
                  onChange={(e) => setFormData({...formData, niche: e.target.value})}
                  placeholder="e.g. Plumbing Services"
                />
              </div>
            </>
          )}

          {step === 2 && (
            <div className="space-y-2">
              <Label htmlFor="cities">Target Cities</Label>
              <Textarea
                id="cities"
                value={formData.cities}
                onChange={(e) => setFormData({...formData, cities: e.target.value})}
                placeholder="Enter cities separated by commas&#10;e.g. San Francisco, Oakland, Berkeley"
                rows={6}
              />
              <p className="text-sm text-gray-500">Enter one city per line or separate with commas. We'll generate landing pages for each city.</p>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-2">
              <Label htmlFor="pillarServices">Pillar Services</Label>
              <Textarea
                id="pillarServices"
                value={formData.pillarServices}
                onChange={(e) => setFormData({...formData, pillarServices: e.target.value})}
                placeholder="Enter your main services separated by commas&#10;e.g. Emergency Plumbing, Drain Cleaning, Water Heater Repair"
                rows={6}
              />
              <p className="text-sm text-gray-500">We'll create pages for each service × each city combination.</p>
            </div>
          )}

          {step === 4 && (
            <>
              <div className="flex items-center space-x-2">
                <Switch
                  id="addLeadForms"
                  checked={formData.addLeadForms}
                  onCheckedChange={(checked) => setFormData({...formData, addLeadForms: checked})}
                />
                <Label htmlFor="addLeadForms">Add Lead Capture Forms</Label>
              </div>
              {formData.addLeadForms && (
                <div className="space-y-2">
                  <Label htmlFor="ghlLocationId">GoHighLevel Location ID (optional)</Label>
                  <Input
                    id="ghlLocationId"
                    value={formData.ghlLocationId}
                    onChange={(e) => setFormData({...formData, ghlLocationId: e.target.value})}
                    placeholder="Enter your GHL Location ID"
                  />
                  <p className="text-sm text-gray-500">Leave blank to use a default contact form.</p>
                </div>
              )}
            </>
          )}

          {step === 5 && (
            <div className="space-y-2">
              <Label htmlFor="primaryColor">Primary Brand Color</Label>
              <div className="flex gap-2 items-center">
                <Input
                  id="primaryColor"
                  type="color"
                  value={formData.primaryColor}
                  onChange={(e) => setFormData({...formData, primaryColor: e.target.value})}
                  className="w-20 h-12"
                />
                <Input
                  value={formData.primaryColor}
                  onChange={(e) => setFormData({...formData, primaryColor: e.target.value})}
                  placeholder="#3b82f6"
                />
              </div>
              <p className="text-sm text-gray-500">This color will be used for buttons, links, and accents across your landing pages.</p>
            </div>
          )}

          {step === 6 && (
            <div className="space-y-4">
              <div className="rounded-lg border p-4 space-y-2">
                <h3 className="font-semibold">Summary</h3>
                <div className="text-sm space-y-1">
                  <p><strong>Business:</strong> {formData.businessName || 'Not set'}</p>
                  <p><strong>Niche:</strong> {formData.niche || 'Not set'}</p>
                  <p><strong>Cities:</strong> {formData.cities.split(/[,\n]/).filter(c => c.trim()).length || 0} cities</p>
                  <p><strong>Services:</strong> {formData.pillarServices.split(/[,\n]/).filter(s => s.trim()).length || 0} services</p>
                  <p><strong>Total Pages:</strong> {(formData.cities.split(/[,\n]/).filter(c => c.trim()).length || 0) * (formData.pillarServices.split(/[,\n]/).filter(s => s.trim()).length || 0)} pages</p>
                  <p><strong>Lead Forms:</strong> {formData.addLeadForms ? 'Enabled' : 'Disabled'}</p>
                </div>
              </div>
              <p className="text-sm text-gray-500">Click Generate to create your geo-targeted landing pages.</p>
            </div>
          )}
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={prevStep} disabled={step === 1}>
            Previous
          </Button>
          {step < STEPS.length ? (
            <Button onClick={nextStep}>Next</Button>
          ) : (
            <Button onClick={handleGenerate} disabled={generating}>
              {generating ? 'Generating...' : 'Generate'}
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  );
}
