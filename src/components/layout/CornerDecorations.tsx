import React from "react";
import { Crosshair, Plus } from "lucide-react";

export default function CornerDecorations() {
  return (
    <>
      {/* Top Left Reticle */}
      <div className="absolute top-6 left-6 text-[#F5F1E8]/40 pointer-events-none">
        <Crosshair className="w-5 h-5" />
      </div>

      {/* Top Right Reticle */}
      <div className="absolute top-6 right-6 text-[#F5F1E8]/40 pointer-events-none">
        <Crosshair className="w-5 h-5" />
      </div>

      {/* Bottom Left Plus */}
      <div className="absolute bottom-6 left-6 text-[#F5F1E8]/30 pointer-events-none font-mono text-xl">
        +
      </div>

      {/* Bottom Right Plus */}
      <div className="absolute bottom-6 right-6 text-[#F5F1E8]/30 pointer-events-none font-mono text-xl">
        +
      </div>
    </>
  );
}
