import { useState } from "react";

interface LICENSE {
  [key: string]: string;
}

interface LicenseSelectorProps {
  value: string;
  onChange: (license: string) => void;
}

const licenses: LICENSE = {
  MIT: `MIT License

Copyright (c) 2025 Ananthu M A

Permission is hereby granted...`,
  Apache: `Apache License 2.0

Copyright (c) 2025 Ananthu M A

Licensed under the Apache License, Version 2.0...`,
  GPL: `GNU GENERAL PUBLIC LICENSE Version 3, 29 June 2007

Copyright (c) 2025 Ananthu M A

This program is free software...`,
  Proprietary: `Proprietary License

Copyright © 2025 Ananthu M A. All rights reserved.

This software is proprietary and may not be copied, modified, or distributed...`,
};

export default function LicenseSelector({
  value,
  onChange,
}: LicenseSelectorProps) {
  const [selected, setSelected] = useState(value || "MIT");

  return (
    <>
      <h2 className="text-lg font-semibold">Select a License</h2>
      <select
        value={selected}
        onChange={(e) => {
          setSelected(e.target.value);
          onChange(e.target.value);
        }}
        className="p-2 bg-white/5 border border-white/10 rounded-xl w-full px-3 py-2 outline-none"
      >
        {Object.keys(licenses).map((key) => (
          <option className="bg-black" key={key} value={key}>
            {key}
          </option>
        ))}
      </select>

      <div className="p-2 bg-white/5 border border-white/10 rounded-xl w-full px-3 py-2 outline-none">
        <h3 className="font-semibold mb-2">{selected} License Preview</h3>
        <pre className="whitespace-pre-wrap text-sm">{licenses[selected]}</pre>
      </div>
    </>
  );
}
