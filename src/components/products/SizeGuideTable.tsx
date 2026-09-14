const innerDressMeasurements = [
  {
    label: "Front Shoulder",
    s: "50 Cm",
    m: "51 Cm",
    l: "52 Cm",
  },
  {
    label: "Shoulder To Shoulder",
    s: "43 Cm",
    m: "45 Cm",
    l: "47 Cm",
  },
  {
    label: "Bust (Armhole To Armhole)",
    s: "54 Cm",
    m: "56 Cm",
    l: "58 Cm",
  },
  {
    label: "Front Hem",
    s: "68 Cm",
    m: "70 Cm",
    l: "72 Cm",
  },
  {
    label: "Collar Height",
    s: "1 Cm",
    m: "1 Cm",
    l: "1 Cm",
  },
  {
    label: "High Point Shoulder To Hem",
    s: "132 Cm",
    m: "137 Cm",
    l: "142 Cm",
  },
  {
    label: "Side Seam",
    s: "97 Cm",
    m: "99.6 Cm",
    l: "102.2 Cm",
  },
  {
    label: "Front Armhole",
    s: "48 Cm",
    m: "49.3 Cm",
    l: "50.6 Cm",
  },
  {
    label: "Sleeve Height",
    s: "30 Cm",
    m: "32 Cm",
    l: "34 Cm",
  },
  {
    label: "Center Back ( Collar edge to hem)",
    s: "130 Cm",
    m: "132.6 Cm",
    l: "135.2 Cm",
  },
  {
    label: "Back Armhole",
    s: "48 Cm",
    m: "49.3 Cm",
    l: "50.6 Cm",
  },
  {
    label: "Back Neck",
    s: "21.5 Cm",
    m: "23.5 Cm",
    l: "25.5 Cm",
  },
];
const outerRobeMeasurements = [
  {
    label: "Front Shoulder",
    s: "14.3 Cm",
    m: "14.6 Cm",
    l: "14.9 Cm",
  },
  {
    label: "Shoulder To Shoulder",
    s: "43 Cm",
    m: "45 Cm",
    l: "47 Cm",
  },
  {
    label: "Bust (Armhole To Armhole)",
    s: "58.4 Cm",
    m: "60.4 Cm",
    l: "62.4 Cm",
  },
  {
    label: "Front Hem",
    s: "68.4 Cm",
    m: "70.4 Cm",
    l: "72.4 Cm",
  },
  {
    label: "Collar Height",
    s: "7 Cm",
    m: "7 Cm",
    l: "7 Cm",
  },
  {
    label: "High Point Shoulder To Hem",
    s: "137 Cm",
    m: "142 Cm",
    l: "147 Cm",
  },
  {
    label: "Side Seam",
    s: "97 Cm",
    m: "99.6 Cm",
    l: "102.2 Cm",
  },
  {
    label: "Front Armhole",
    s: "24.2 Cm",
    m: "25.5 Cm",
    l: "26.8 Cm",
  },
  {
    label: "Sleeve Height",
    s: "61 Cm",
    m: "62 Cm",
    l: "63 Cm",
  },
  {
    label: "Center Back ( Collar edge to hem)",
    s: "135 Cm",
    m: "137.6 Cm",
    l: "140.2 Cm",
  },
  {
    label: "Back Armhole",
    s: "25.2 Cm",
    m: "26.5 Cm",
    l: "27.8 Cm",
  },
  {
    label: "Back Neck",
    s: "14.3 Cm",
    m: "14.6 Cm",
    l: "14.9 Cm",
  },
  {
    label: "Sleeve Hem Total",
    s: "42 Cm",
    m: "43.3 Cm",
    l: "44.6 Cm",
  },
];

export default function SizeGuideTable({ activeTab }: { activeTab?: string }) {
  const data = activeTab === "Outer Robe" ? outerRobeMeasurements : innerDressMeasurements;

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse text-[12px]">
        <thead>
          <tr className="border border-black/20">
            <th className="border border-black/20 px-3 py-3 text-left font-medium">
              Measurement Description
            </th>

            <th className="border border-black/20 px-3 py-3 font-medium">
              Size S
            </th>

            <th className="border border-black/20 px-3 py-3 font-medium">
              Size M
            </th>

            <th className="border border-black/20 px-3 py-3 font-medium">
              Size L
            </th>
          </tr>
        </thead>

        <tbody>
          {data.map((item) => (
            <tr key={item.label}>
              <td className="border border-black/20 px-3 py-3">
                {item.label}
              </td>

              <td className="text-[#998169] border border-black/20 px-3 py-3 text-center">
                {item.s}
              </td>

              <td className="text-[#998169] border border-black/20 px-3 py-3 text-center">
                {item.m}
              </td>

              <td className="text-[#998169] border border-black/20 px-3 py-3 text-center">
                {item.l}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}