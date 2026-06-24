import {
  RiLayout3Line,
  RiTeamLine,
  RiDownloadCloud2Line,
  RiMagicLine,
  RiInformationLine,
  RiPhoneLine
} from "@remixicon/react";
import { BrMd } from "~/components/ui/line-break";
import { Text } from "~/components/ui/text";

export default function OpeningPage() {
  const perks = [
    {
      title: "Digital Event Programs",
      description: "Build interactive digital schedules for your attendees.",
      icon: <RiLayout3Line className="text-indigo-600 size-5" />,
      bg: "bg-indigo-50"
    },
    {
      title: "Team Collaboration",
      description: "Invite teammates and assign roles to manage your event.",
      icon: <RiTeamLine className="text-blue-600 size-5" />,
      bg: "bg-blue-50"
    },
    {
      title: "Seamless Data Exports",
      description: "Export your purchase lists instantly as PDF, DOC, or CSV.",
      icon: <RiDownloadCloud2Line className="text-emerald-600 size-5" />,
      bg: "bg-emerald-50"
    },
    {
      title: "In-House Media Package",
      description: "Get custom flyer designs and tailored campaign strategies.",
      icon: <RiMagicLine className="text-purple-600 size-5" />,
      bg: "bg-purple-50"
    }
  ];

  return (
    <div className="w-full flex flex-col gap-8 animate-in fade-in slide-in-from-bottom-2 duration-500 mx-auto">

      {/* Minimalist Header */}
      <div className="text-center md:text-left">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-50 text-orange-500 text-[10px] font-bold uppercase mb-6">
          <RiMagicLine size={14} /> AriaPass For Creators
        </div>
        <Text.h2 className="text-3xl! tracking-tight text-gray-900 mb-3">
          Manage your events <BrMd />
          <span className="text-transparent bg-clip-text bg-linear-to-r from-theme to-purple-600">
            like a professional.
          </span>
        </Text.h2>
      </div>

      {/* Clean Vertical List */}
      <div className="flex flex-col gap-6">
        {perks.map((perk, index) => (
          <div
            key={index}
            className="flex items-start gap-4 group"
          >
            <div className={`shrink-0 flex items-center justify-center w-12 h-12 rounded-full transition-transform duration-300 group-hover:scale-110 ${perk.bg}`}>
              {perk.icon}
            </div>
            <div className="pt-1">
              <h4 className="text-lg font-medium text-gray-900 mb-1">
                {perk.title}
              </h4>
              <p className="text-sm text-gray-500 leading-relaxed">
                {perk.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Minimalist Verification Notice */}
      <div className="bg-amber-50/50 border border-amber-100/60 rounded p-4 flex items-start gap-3 mt-4">
        <RiInformationLine className="text-amber-500 size-5 shrink-0 mt-0.5" />
        <div className="flex flex-col gap-2">
          <p className="text-xs text-amber-900/80 leading-relaxed">
            Your application will be reviewed as soon as you submit. This typically takes up to <strong>1 hour</strong>.
          </p>
          <a
            href="tel:+2348026685956"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-700 hover:text-amber-900 transition-colors w-max"
          >
            <RiPhoneLine size={14} />
            Call +234 802 668 5956 to fast-track
          </a>
        </div>
      </div>

    </div>
  );
}