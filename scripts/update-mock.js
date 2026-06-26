/* eslint-disable */
const fs = require('fs');

const path = 'c:/Users/surya/Downloads/ZeroWaste/src/lib/mock-data.ts';
let content = fs.readFileSync(path, 'utf8');

const replacements = [
  { search: 'imageColor: "from-blue-50 to-cyan-100",', replace: 'imageColor: "from-blue-50 to-cyan-100",\n    imageUrl: "/images/milk_carton_1782121464928.png",' },
  { search: 'imageColor: "from-amber-50 to-orange-100",', replace: 'imageColor: "from-amber-50 to-orange-100",\n    imageUrl: "/images/sandwich_bread_1782121476372.png",' },
  { search: 'imageColor: "from-green-50 to-emerald-100",', replace: 'imageColor: "from-green-50 to-emerald-100",\n    imageUrl: "/images/mixed_veg_1782121488433.png",' },
  { search: 'imageColor: "from-yellow-50 to-amber-100",', replace: 'imageColor: "from-yellow-50 to-amber-100",\n    imageUrl: "/images/bhujia_1782121524049.png",' },
  { search: 'imageColor: "from-slate-50 to-blue-100",', replace: 'imageColor: "from-slate-50 to-blue-100",\n    imageUrl: "/images/curd_1782121533919.png",' },
  { search: 'imageColor: "from-pink-50 to-rose-100",', replace: 'imageColor: "from-pink-50 to-rose-100",\n    imageUrl: "/images/pastry_1782121545096.png",' },
  { search: 'imageColor: "from-yellow-50 to-amber-200",', replace: 'imageColor: "from-yellow-50 to-amber-200",\n    imageUrl: "/images/bananas_1782121555288.png",' },
  { search: 'imageColor: "from-orange-50 to-yellow-100",', replace: 'imageColor: "from-orange-50 to-yellow-100",\n    imageUrl: "/images/atta_1782121567122.png",' },
  { search: 'imageColor: "from-purple-50 to-fuchsia-100",', replace: 'imageColor: "from-purple-50 to-fuchsia-100",\n    imageUrl: "/images/juice_1782121588231.png",' },
  { search: 'imageColor: "from-orange-100 to-red-100",', replace: 'imageColor: "from-orange-100 to-red-100",\n    imageUrl: "/images/biryani_1782121600961.png",' },

  { search: 'imageColor: "from-emerald-100 to-teal-100",', replace: 'imageColor: "from-emerald-100 to-teal-100",\n    imageUrl: "/images/wedding_surplus_1782121612579.png",' },
  { search: 'imageColor: "from-amber-100 to-orange-100",', replace: 'imageColor: "from-amber-100 to-orange-100",\n    imageUrl: "/images/hostel_dinner_1782121622753.png",' },
  { search: 'imageColor: "from-rose-100 to-pink-100",', replace: 'imageColor: "from-rose-100 to-pink-100",\n    imageUrl: "/images/idli_buffet_1782121634472.png",' },
  { search: 'imageColor: "from-yellow-100 to-lime-100",', replace: 'imageColor: "from-yellow-100 to-lime-100",\n    imageUrl: "/images/lemon_rice_1782121655909.png",' },
  { search: 'imageColor: "from-sky-100 to-cyan-100",', replace: 'imageColor: "from-sky-100 to-cyan-100",\n    imageUrl: "/images/conference_lunch_1782121668770.png",' },
];

for (const {search, replace} of replacements) {
  content = content.replaceAll(search, replace);
}

fs.writeFileSync(path, content, 'utf8');
console.log('Updated mock-data.ts');
