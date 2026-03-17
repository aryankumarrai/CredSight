import { useState } from "react";
import { Link } from "wouter";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, ArrowRight, CheckCircle2 } from "lucide-react";

export default function Onboarding() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    companyName: "",
    cin: "",
    pan: "",
    sector: "",
    turnover: "",
    loanType: "",
    loanAmount: "",
    loanTenure: "",
    expectedInterest: "",
  });

  const sectors = [
    "Manufacturing",
    "Retail",
    "Healthcare",
    "Technology",
    "Finance",
    "Real Estate",
    "Agriculture",
    "Hospitality",
    "Other"
  ];

  const loanTypes = [
    "Working Capital",
    "Term Loan",
    "Trade Credit",
    "Overdraft",
    "Letter of Credit",
  ];

  const tenures = [
    "6 months",
    "1 year",
    "2 years",
    "3 years",
    "5 years",
    "7 years",
    "10 years",
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleNext = () => {
    if (step < 3) setStep(step + 1);
  };

  const handlePrev = () => {
    if (step > 1) setStep(step - 1);
  };

  const [isCompleted, setIsCompleted] = useState(false);

  const handleComplete = () => {
    localStorage.setItem("entityData", JSON.stringify(formData));
    setIsCompleted(true);
  };

  if (isCompleted) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="text-center space-y-4">
          <CheckCircle2 className="w-16 h-16 text-green-600 mx-auto" />
          <h1 className="text-3xl font-bold">Onboarding Complete!</h1>
          <p className="text-muted-foreground">Your entity information has been saved.</p>
          <Link href="/ingestion" className="inline-block">
            <button className="bg-primary text-primary-foreground px-6 py-2 rounded font-medium hover:bg-primary/90 transition-colors">
              Continue to Ingestion
            </button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-lg">
        {/* Progress Indicator */}
        <div className="mb-8">
          <div className="flex justify-between mb-4">
            {[1, 2, 3].map((num) => (
              <div key={num} className="flex flex-col items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all ${
                    step >= num
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  {step > num ? <CheckCircle2 className="w-5 h-5" /> : num}
                </div>
                <span className="text-xs mt-2 text-muted-foreground">
                  {num === 1 ? "Entity Info" : num === 2 ? "Business Details" : "Loan Details"}
                </span>
              </div>
            ))}
          </div>
          <div className="h-1 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full bg-primary transition-all"
              style={{ width: `${(step / 3) * 100}%` }}
            />
          </div>
        </div>

        {/* Form Card */}
        <Card className="card-simple">
          <CardHeader>
            <CardTitle>
              {step === 1 ? "Entity Information" : step === 2 ? "Business Details" : "Loan Details"}
            </CardTitle>
            <CardDescription>
              {step === 1
                ? "Enter your company's basic details"
                : step === 2
                ? "Tell us about your business"
                : "Specify your loan requirements"}
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Step 1: Entity Information */}
            {step === 1 && (
              <div className="space-y-4">
                <div>
                  <Label htmlFor="companyName" className="text-sm font-medium">
                    Company Name
                  </Label>
                  <Input
                    id="companyName"
                    name="companyName"
                    placeholder="e.g., Vivriti Capital Limited"
                    value={formData.companyName}
                    onChange={handleInputChange}
                    className="mt-2"
                    data-testid="input-company-name"
                  />
                </div>

                <div>
                  <Label htmlFor="cin" className="text-sm font-medium">
                    CIN (Corporate Identity Number)
                  </Label>
                  <Input
                    id="cin"
                    name="cin"
                    placeholder="e.g., U65929TN2017PLC117196"
                    value={formData.cin}
                    onChange={handleInputChange}
                    className="mt-2"
                    data-testid="input-cin"
                  />
                </div>

                <div>
                  <Label htmlFor="pan" className="text-sm font-medium">
                    PAN (Permanent Account Number)
                  </Label>
                  <Input
                    id="pan"
                    name="pan"
                    placeholder="e.g., AABCV1234F"
                    value={formData.pan}
                    onChange={handleInputChange}
                    className="mt-2"
                    data-testid="input-pan"
                  />
                </div>
              </div>
            )}

            {/* Step 2: Business Details */}
            {step === 2 && (
              <div className="space-y-4">
                <div>
                  <Label htmlFor="sector" className="text-sm font-medium">
                    Business Sector
                  </Label>
                  <Select value={formData.sector} onValueChange={(val) => handleSelectChange("sector", val)}>
                    <SelectTrigger className="mt-2" data-testid="select-sector">
                      <SelectValue placeholder="Select a sector" />
                    </SelectTrigger>
                    <SelectContent>
                      {sectors.map((s) => (
                        <SelectItem key={s} value={s}>
                          {s}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="turnover" className="text-sm font-medium">
                    Annual Turnover
                  </Label>
                  <Select value={formData.turnover} onValueChange={(val) => handleSelectChange("turnover", val)}>
                    <SelectTrigger className="mt-2" data-testid="select-turnover">
                      <SelectValue placeholder="Select turnover range" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="0-10cr">₹0 - ₹10 Cr</SelectItem>
                      <SelectItem value="10-50cr">₹10 - ₹50 Cr</SelectItem>
                      <SelectItem value="50-100cr">₹50 - ₹100 Cr</SelectItem>
                      <SelectItem value="100-250cr">₹100 - ₹250 Cr</SelectItem>
                      <SelectItem value="250cr-plus">₹250 Cr+</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}

            {/* Step 3: Loan Details */}
            {step === 3 && (
              <div className="space-y-4">
                <div>
                  <Label htmlFor="loanType" className="text-sm font-medium">
                    Loan Type
                  </Label>
                  <Select value={formData.loanType} onValueChange={(val) => handleSelectChange("loanType", val)}>
                    <SelectTrigger className="mt-2" data-testid="select-loan-type">
                      <SelectValue placeholder="Select loan type" />
                    </SelectTrigger>
                    <SelectContent>
                      {loanTypes.map((lt) => (
                        <SelectItem key={lt} value={lt}>
                          {lt}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="loanAmount" className="text-sm font-medium">
                    Loan Amount (in Crores)
                  </Label>
                  <Input
                    id="loanAmount"
                    name="loanAmount"
                    type="number"
                    placeholder="e.g., 50"
                    value={formData.loanAmount}
                    onChange={handleInputChange}
                    className="mt-2"
                    data-testid="input-loan-amount"
                  />
                </div>

                <div>
                  <Label htmlFor="loanTenure" className="text-sm font-medium">
                    Loan Tenure
                  </Label>
                  <Select value={formData.loanTenure} onValueChange={(val) => handleSelectChange("loanTenure", val)}>
                    <SelectTrigger className="mt-2" data-testid="select-loan-tenure">
                      <SelectValue placeholder="Select tenure" />
                    </SelectTrigger>
                    <SelectContent>
                      {tenures.map((t) => (
                        <SelectItem key={t} value={t}>
                          {t}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="expectedInterest" className="text-sm font-medium">
                    Expected Interest Rate (%)
                  </Label>
                  <Input
                    id="expectedInterest"
                    name="expectedInterest"
                    type="number"
                    placeholder="e.g., 9.5"
                    step="0.1"
                    value={formData.expectedInterest}
                    onChange={handleInputChange}
                    className="mt-2"
                    data-testid="input-expected-interest"
                  />
                </div>
              </div>
            )}
          </CardContent>

          {/* Navigation Buttons */}
          <div className="px-6 pb-6 flex gap-3">
            <Button
              variant="outline"
              onClick={handlePrev}
              disabled={step === 1}
              className="flex-1"
              data-testid="button-prev"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous
            </Button>

            {step < 3 ? (
              <Button
                onClick={handleNext}
                className="flex-1"
                data-testid="button-next"
              >
                Next
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            ) : (
              <Button
                onClick={handleComplete}
                className="flex-1 bg-green-600 hover:bg-green-700"
                data-testid="button-complete"
              >
                <CheckCircle2 className="w-4 h-4 mr-2" />
                Complete Onboarding
              </Button>
            )}
          </div>
        </Card>

        <p className="text-center text-xs text-muted-foreground mt-4">
          All fields are required to proceed
        </p>
      </div>
    </div>
  );
}
