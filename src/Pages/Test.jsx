import React from "react";
import {
  Stepper,
  Step,
  Button,
  Card,
  CardBody,
  Input,
  Textarea,
} from "@material-tailwind/react";

export default function DefaultStepper() {
  const [activeStep, setActiveStep] = React.useState(0);
  const [isLastStep, setIsLastStep] = React.useState(false);
  const [isFirstStep, setIsFirstStep] = React.useState(false);

  // Combined form state
  const [formData, setFormData] = React.useState({
    name: "",
    email: "",
    address: "",
    city: "",
    zip: "",
    comments: "",
  });

  const handleNext = () => !isLastStep && setActiveStep((cur) => cur + 1);
  const handlePrev = () => !isFirstStep && setActiveStep((cur) => cur - 1);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((f) => ({ ...f, [name]: value }));
  };

  const renderStepContent = () => {
    switch (activeStep) {
      case 0:
        return (
          <Card className="mt-8 shadow-lg rounded-2xl " >
            <CardBody>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input
                  label="Firstname"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
                   <Input
                  label="Surname"
                  name="Surname"
                  value={formData.Surname}
                  onChange={handleChange}
                  required
                />
                <Input
                  type="email"
                  label="Email Address"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
            </CardBody>
          </Card>
        );
      case 1:
        return (
          <Card className="mt-8 shadow-lg rounded-2xl">
            <CardBody>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input
                  label="Street Address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  required
                />
                <Input
                  label="City"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  required
                />
                <Input
                  label="ZIP / Postal Code"
                  name="zip"
                  value={formData.zip}
                  onChange={handleChange}
                  required
                />
              </div>
            </CardBody>
          </Card>
        );
      case 2:
        return (
          <Card className="mt-8 shadow-lg rounded-2xl">
            <CardBody>
              <Textarea
                label="Additional Comments"
                name="comments"
                value={formData.comments}
                onChange={handleChange}
                rows={4}
              />
            </CardBody>
          </Card>
        );
      default:
        return null;
    }
  };

  return (
    <div className="max-w-full mx-auto py-48 px-4 bg-texture bg-gray-900/[0.9] ">
      <Stepper
        activeStep={activeStep}
        isLastStep={(val) => setIsLastStep(val)}
        isFirstStep={(val) => setIsFirstStep(val)}
      >
        <Step onClick={() => setActiveStep(0)}>1</Step>
        <Step onClick={() => setActiveStep(1)}>2</Step>
        <Step onClick={() => setActiveStep(2)}>3</Step>
      </Stepper>

      {renderStepContent()}

      <div className="mt-8 flex justify-between">
        <Button
          variant="outlined"
          onClick={handlePrev}
          disabled={isFirstStep}
        >
          Prev
        </Button>
        <Button onClick={handleNext} disabled={isLastStep}>
          {isLastStep ? "Submit" : "Next"}
        </Button>
      </div>
    </div>
  );
}
