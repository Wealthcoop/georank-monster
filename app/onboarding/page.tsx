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

  // Persist state to LocalStorage
  useEffect(() => {
    const saved = localStorage.getItem('georank_wizard');
    if (saved) setFormData(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem('georank_wizard', JSON.stringify(formData));
  }, [formData]);

  const nextStep = () => setStep((s) => Math.min(s + 1, STEPS.length));
  const prevStep = () => setStep((s) => Math.max(s - 1, 1));

  return (
    <div className=\"min-h-screen bg-slate-50 p-4 flex items-center justify-center\">
      <Card className=\"w-full max-w-2xl shadow-xl\">
        <CardHeader>
          <div className=\"flex justify-between items-center mb-4\">
            <span className=\"text-xs font-bold uppercase tracking-wider text-slate-500\">
              Step {step} of {STEPS.length}: {STEPS[step - 1]}
            </span>
            <span className=\"text-xl\">🦖</span>
          </div>
          <Progress value={(step / STEPS.length) * 100} className=\"h-2\" />
          <CardTitle className=\"mt-6\">{STEPS[step - 1]}</CardTitle>
          <CardDescription>
            Configure your geo-targeted page structure.
          </CardDescription>
        </CardHeader>
        
        <CardContent className=\"space-y-6\">
          {step === 1 && (
            <div className=\"space-y-4\">
              <div className=\"space-y-2\">
                <Label htmlFor=\"businessName\">Business Name</Label>
                <Input 
                  id=\"businessName\" 
                  placeholder=\"e.g. Gold Standard Roofing\" 
                  value={formData.businessName}
                  onChange={(e) => setFormData({...formData, businessName: e.target.value})}
                />
              </div>
              <div className=\"space-y-2\">
                <Label htmlFor=\"niche\">Industry/Niche</Label>
                <Input 
                  id=\"niche\" 
                  placeholder=\"e.g. Roofing, HVAC, Legal\" 
                  value={formData.niche}
                  onChange={(e) => setFormData({...formData, niche: e.target.value})}
                />
              </div>
            </div>
          )}

          {step === 2 && (
            <div className=\"space-y-4\">
              <Label htmlFor=\"cities\">Target Cities/ZIPs (Comma separated)</Label>
              <textarea 
                id=\"cities\" 
                className=\"w-full min-h-[100px] p-3 rounded-md border border-input bg-background\"
                placeholder=\"Roseville, Sacramento, Folsom...\"
                value={formData.cities}
                onChange={(e) => setFormData({...formData, cities: e.target.value})}
              />
              <p className=\"text-sm text-muted-foreground\">
                These will form your main silo structures (e.g. /service-roseville).
              </p>
            </div>
          )}

          {step === 3 && (
            <div className=\"space-y-4\">
              <Label htmlFor=\"pillars\">Pillar Services (e.g. Roof Repair)</Label>
              <Input 
                id=\"pillars\" 
                placeholder=\"Roofing, Solar, Windows...\" 
                value={formData.pillarServices}
                onChange={(e) => setFormData({...formData, pillarServices: e.target.value})}
              />
              <p className=\"text-sm text-muted-foreground italic\">
                * Silo logic: We will automatically generate cluster URLs for these pillars across your target cities.
              </p>
            </div>
          )}

          {step === 4 && (
            <div className=\"space-y-6\">
              <div className=\"flex items-center justify-between\">
                <div className=\"space-y-0.5\">
                  <Label>Enable Lead Forms?</Label>
                  <p className=\"text-sm text-muted-foreground\">Inject dynamic forms into every page.</p>
                </div>
                <Switch 
                  checked={formData.addLeadForms}
                  onCheckedChange={(val) => setFormData({...formData, addLeadForms: val})}
                />
              </div>
              
              {formData.addLeadForms && (
                <div className=\"p-4 bg-slate-100 rounded-lg space-y-4\">
                  <Label>Form Type</Label>
                  <select 
                    className=\"w-full p-2 rounded-md border\"
                    value={formData.formType}
                    onChange={(e) => setFormData({...formData, formType: e.target.value})}
                  >
                    <option value=\"ghl\">GoHighLevel Embed</option>
                    <option value=\"basic\">Simple Email Form</option>
                  </select>
                </div>
              )}
            </div>
          )}
        </CardContent>

        <CardFooter className=\"flex justify-between border-t pt-6\">
          <Button variant=\"outline\" onClick={prevStep} disabled={step === 1}>
            Back
          </Button>
          <Button onClick={nextStep}>
            {step === STEPS.length ? 'Generate My Pages' : 'Continue'}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
