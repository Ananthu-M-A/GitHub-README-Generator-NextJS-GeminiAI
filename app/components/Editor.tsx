"use client";
import Input from "@/components/ui/Input";
import Textarea from "@/components/ui/Textarea";
import type { GenerateInput } from "@/lib/validation";
import { useState } from "react";

export default function Editor({ value, onChange }: { value: GenerateInput; onChange: (v: GenerateInput) => void; }) {
  const v = value;
  const [featureDraft, setFeatureDraft] = useState("");
  const [techDraft, setTechDraft] = useState("");

  return (
    <div className="space-y-5">
      <h2 className="text-lg font-semibold">Profile</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input label="Developer Name" value={v.profile.name} onChange={e => onChange({ ...v, profile: { ...v.profile, name: e.target.value } })} />
        <Input label="Location" value={v.profile.location} onChange={e => onChange({ ...v, profile: { ...v.profile, location: e.target.value } })} />
        <Input label="Repository Web URL" value={v.profile.website} onChange={e => onChange({ ...v, profile: { ...v.profile, website: e.target.value } })} />
        <Input label="Email" value={v.profile.email} onChange={e => onChange({ ...v, profile: { ...v.profile, email: e.target.value } })} />
      </div>

      <h2 className="text-lg font-semibold">Project</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input label="Project Name" value={v.project.name} onChange={e => onChange({ ...v, project: { ...v.project, name: e.target.value } })} />
        <Input label="Tagline" value={v.project.tagline} onChange={e => onChange({ ...v, project: { ...v.project, tagline: e.target.value } })} />
      </div>
      <Textarea label="Short Description" rows={4} value={v.project.description} onChange={e => onChange({ ...v, project: { ...v.project, description: e.target.value } })} />

      <div className="grid gap-4">
        <div>
          <label className="text-sm text-neutral-300">Features</label>
          <div className="flex gap-2 mt-1">
            <input className="flex-1 rounded-xl bg-white/5 border border-white/10 px-3 py-2 outline-none" value={featureDraft} onChange={e => setFeatureDraft(e.target.value)} placeholder="Add a feature and press +" />
            <button type="button" className="rounded-xl px-3 border border-white/10" onClick={() => {
              if (!featureDraft.trim()) return;
              onChange({ ...v, project: { ...v.project, features: [...v.project.features, featureDraft.trim()] } });
              setFeatureDraft("");
            }}>+
            </button>
          </div>
          {v.project.features.length > 0 && (
            <ul className="mt-2 text-sm list-disc list-inside space-y-1">
              {v.project.features.map((it, i) => (
                <li key={i}>
                  {it}
                  <button className="ml-2 text-xs text-neutral-400 hover:underline" onClick={() => onChange({ ...v, project: { ...v.project, features: v.project.features.filter((_, idx) => idx !== i) } })}>remove</button>
                </li>
              ))}
            </ul>
          )}
        </div>
        <div>
          <label className="text-sm text-neutral-300">Tech Stack</label>
          <div className="flex gap-2 mt-1">
            <input className="flex-1 rounded-xl bg-white/5 border border-white/10 px-3 py-2 outline-none" value={techDraft} onChange={e => setTechDraft(e.target.value)} placeholder="Add a technology and press +" />
            <button type="button" className="rounded-xl px-3 border border-white/10" onClick={() => {
              if (!techDraft.trim()) return;
              onChange({ ...v, project: { ...v.project, tech: [...v.project.tech, techDraft.trim()] } });
              setTechDraft("");
            }}>+
            </button>
          </div>
          {v.project.tech.length > 0 && (
            <ul className="mt-2 text-sm list-disc list-inside space-y-1">
              {v.project.tech.map((it, i) => (
                <li key={i}>
                  {it}
                  <button className="ml-2 text-xs text-neutral-400 hover:underline" onClick={() => onChange({ ...v, project: { ...v.project, tech: v.project.tech.filter((_, idx) => idx !== i) } })}>remove</button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Textarea label="Install Steps (one per line)" rows={4} value={v.project.install.join("\n")} onChange={e => onChange({ ...v, project: { ...v.project, install: e.target.value.split("\n").filter(Boolean) } })} />
        <Textarea label="Usage Steps (one per line)" rows={4} value={v.project.usage.join("\n")} onChange={e => onChange({ ...v, project: { ...v.project, usage: e.target.value.split("\n").filter(Boolean) } })} />
      </div>

      <Textarea label="Existing README (optional)" rows={6} value={v.existing} onChange={e => onChange({ ...v, existing: e.target.value })} />
    </div>
  );
}