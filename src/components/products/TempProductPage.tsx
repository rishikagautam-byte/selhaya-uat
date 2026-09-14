import { useState } from "react";
import SizeGuide from "./SizeGuide";
import ReturnShipping from "./ReturnShipping";
import GetHelp from "./GetHelp";

export default function TempProductPage() {
  const [sizeGuideOpen, setSizeGuideOpen] = useState(false);
  const [returnShippingOpen, setReturnShippingOpen] = useState(false);
  const [getHelpOpen, setGetHelpOpen] = useState(false);
    
  return (
    <div className="h-screen flex flex-col gap-2 items-center justify-center">
      <button
        onClick={() => {
          setSizeGuideOpen(true)
        }}
        className="underline text-sm"
      >
        Size Guide
      </button>

      <button
        onClick={() => setReturnShippingOpen(true)}
        className="underline text-sm"
      >
        Return & Shipping
      </button>

      <button
        onClick={() => setGetHelpOpen(true)}
        className="underline text-sm"
      >
        Get Help
      </button>

      <GetHelp
        isOpen={getHelpOpen}
        onClose={() => setGetHelpOpen(false)}
      />

      <SizeGuide
        isOpen={sizeGuideOpen}
        onClose={() => setSizeGuideOpen(false)}
      />

      <ReturnShipping
        isOpen={returnShippingOpen}
        onClose={() => setReturnShippingOpen(false)}
      />
    </div>
  );
}