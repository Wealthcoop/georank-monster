'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';

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
    primaryColor: '#3b82f6',
  });

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

  const nextStep = () => setStep((s) => Math.min(s + 1, STEPS.length));
  const prevStep = () => setStep((s) => Math.max(s - 1, 1));

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
                <Label htmlFor="businessName">Business Name</Label>v0.3: Fix syntax error in onboarding page (removed escaped quotes)
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
          {step > 1 && <p className="text-center py-10 text-muted-foreground italic">Step {step} content goes here...</p>}
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={prevStep} disabled={step === 1}>
            Previous
          </Button>
          <Button onClick={nextStep}>
            {step === STEPS.length ? 'Generate' : 'Next'}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
