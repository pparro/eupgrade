/* eUpgrade rules engine + data. Ported from eupgrade-rules.v1.json.
   One unverified value remains: whether the Super Elite add-on waiver
   extends to international Premium Economy. Confirm before trusting PY pricing. */

export const RULES={
  bands:{NA_SUN:[[0,510,"b1"],[511,1500,"b2"],[1501,1e9,"b3"]],INTERNATIONAL:[[0,5000,"b1"],[5001,1e9,"b2"]]},
  latitude:{PY_LATITUDE:1,Y_LATITUDE:1},
  windows:{SUPER_ELITE:{lat:"ANY",non:{NA_SUN:14,INTERNATIONAL:7}},K75:{lat:"ANY",non:{NA_SUN:12,INTERNATIONAL:6}},
    K50:{lat:"ANY",non:{NA_SUN:10,INTERNATIONAL:5}},K35:{lat:"ANY",non:{NA_SUN:8,INTERNATIONAL:4}},
    K25:{lat:"ANY",non:{NA_SUN:4,INTERNATIONAL:3}},MEMBER:{lat:{NA_SUN:7,INTERNATIONAL:7},non:null}},
  charts:{
    "NA_SUN|J|CASH":[["PY_LATITUDE",["O"],{b1:[1],b2:[1],b3:[2]}],["PY_STANDARD",["E","A"],{b1:[2],b2:[2],b3:[4]}],
      ["Y_LATITUDE","ALL",{b1:[1],b2:[1],b3:[2]}],["Y_COMFORT",["B","M"],{b1:[1],b2:[1],b3:[2]}],
      ["Y_COMFORT",["U","H"],{b1:[1],b2:[3],b3:[6]}],["Y_COMFORT",["Q","V","W","S","T","L","K","G","F"],{b1:[3],b2:[5],b3:[8]}],
      ["Y_FLEX",["B","M"],{b1:[1],b2:[1],b3:[2]}],["Y_FLEX",["U","H"],{b1:[3],b2:[5],b3:[8]}],
      ["Y_FLEX",["Q","V","W","S","T","L","K","G","F"],{b1:[4],b2:[6],b3:[10]}],
      ["Y_STANDARD",["B","M","U","H"],{b1:[4,125],b2:[6,175],b3:[9,200,true]}],
      ["Y_STANDARD",["Q","V","W","S","T","L","K","G","F"],{b1:[5,175],b2:[7,225],b3:[11,250,true]}]],
    "NA_SUN|J|REWARD":[["PY_LATITUDE","ALL",{b1:[1],b2:[1],b3:[2]}],["PY_STANDARD","ALL",{b1:[2],b2:[2],b3:[4]}],
      ["Y_LATITUDE","ALL",{b1:[2],b2:[2],b3:[4]}],["Y_FLEX","ALL",{b1:[4],b2:[6],b3:[10]}],
      ["Y_STANDARD","ALL",{b1:[5,175],b2:[7,225],b3:[11,250,true]}]],
    "NA_SUN|PY|CASH":[["Y_LATITUDE","ALL",{b1:[1],b2:[1],b3:[1]}],["Y_COMFORT",["B","M"],{b1:[1],b2:[1],b3:[1]}],
      ["Y_COMFORT",["U","H"],{b1:[1],b2:[1],b3:[2]}],["Y_COMFORT",["Q","V","W","S","T","L","K","G","F"],{b1:[3],b2:[4],b3:[6]}],
      ["Y_FLEX",["B","M"],{b1:[1],b2:[1],b3:[1]}],["Y_FLEX",["U","H"],{b1:[1],b2:[1],b3:[2]}],
      ["Y_FLEX",["Q","V","W","S","T","L","K","G","F"],{b1:[3],b2:[4],b3:[6]}],
      ["Y_STANDARD",["B","M","U","H"],{b1:[2],b2:[2],b3:[3]}],
      ["Y_STANDARD",["Q","V","W","S","T","L","K","G","F"],{b1:[4,150],b2:[5,150],b3:[7,175,true]}]],
    "NA_SUN|PY|REWARD":[["Y_LATITUDE","ALL",{b1:[1],b2:[1],b3:[2]}],["Y_FLEX","ALL",{b1:[3],b2:[4],b3:[6]}],
      ["Y_STANDARD","ALL",{b1:[4,150],b2:[5,150],b3:[7,175,true]}]],
    "INTERNATIONAL|J|CASH":[["PY_LATITUDE",["O"],{b1:[11],b2:[13]}],["PY_STANDARD",["E","A"],{b1:[12,200,false,true],b2:[17,200,false,true]}],
      ["Y_LATITUDE","ALL",{b1:[11],b2:[13]}],["Y_COMFORT",["B","M"],{b1:[11],b2:[13]}],
      ["Y_COMFORT",["U","H","Q","V","W"],{b1:[12,200,false,true],b2:[17,200,false,true]}],
      ["Y_COMFORT",["S","T","L","K","G","F"],{b1:[15,200,false,true],b2:[20,200,false,true]}],
      ["Y_FLEX",["B","M"],{b1:[11],b2:[13]}],["Y_FLEX",["U","H","Q","V","W"],{b1:[15,500,false,true],b2:[20,500,false,true]}],
      ["Y_FLEX",["S","T","L","K","G","F"],{b1:[18,500,false,true],b2:[23,500,false,true]}],
      ["Y_STANDARD",["B","M","U","H","Q","V","W"],{b1:[18,900,false,true],b2:[23,900,false,true]}],
      ["Y_STANDARD",["S","T","L","K","G","F"],{b1:[21,900,false,true],b2:[26,900,false,true]}]],
    "INTERNATIONAL|J|REWARD":[["PY_LATITUDE","ALL",{b1:[11],b2:[13]}],["PY_STANDARD","ALL",{b1:[12,200,false,true],b2:[17,200,false,true]}],
      ["Y_LATITUDE","ALL",{b1:[11],b2:[13]}],["Y_FLEX","ALL",{b1:[18,500,false,true],b2:[23,500,false,true]}],
      ["Y_STANDARD","ALL",{b1:[21,900,false,true],b2:[26,900,false,true]}]],
    "INTERNATIONAL|PY|CASH":[["Y_LATITUDE","ALL",{b1:[6],b2:[7]}],["Y_COMFORT",["B","M"],{b1:[6],b2:[7]}],
      ["Y_COMFORT",["U","H","Q","V","W"],{b1:[7],b2:[9]}],["Y_COMFORT",["S","T","L","K","G","F"],{b1:[9],b2:[11]}],
      ["Y_FLEX",["B","M"],{b1:[6],b2:[7]}],["Y_FLEX",["U","H","Q","V","W"],{b1:[8],b2:[10]}],
      ["Y_FLEX",["S","T","L","K","G","F"],{b1:[11],b2:[13]}],
      ["Y_STANDARD",["B","M","U","H","Q","V","W"],{b1:[11,400],b2:[13,400,true]}],
      ["Y_STANDARD",["S","T","L","K","G","F"],{b1:[14,450],b2:[16,450,true]}]],
    "INTERNATIONAL|PY|REWARD":[["Y_LATITUDE","ALL",{b1:[6],b2:[7]}],["Y_FLEX","ALL",{b1:[11],b2:[13]}],
      ["Y_STANDARD","ALL",{b1:[14,450],b2:[16,450,true]}]],
  }
};
export const TIERS=[["SUPER_ELITE","Super Elite (100K)"],["K75","75K"],["K50","50K"],["K35","35K"],["K25","25K"],["MEMBER","No status"]];
export const FARES=[["PY_LATITUDE","Prem Econ — Latitude"],["PY_STANDARD","Prem Econ — Standard"],
  ["Y_LATITUDE","Economy — Latitude"],["Y_COMFORT","Economy — Comfort"],["Y_FLEX","Economy — Flex"],
  ["Y_STANDARD","Economy — Standard"],["Y_BASIC","Economy — Basic"]];
export const CLASSES="O E A B M U H Q V W S T L K G F".split(" ");
export function band(z,mi){for(const[lo,hi,id]of RULES.bands[z])if(mi>=lo&&mi<=hi)return id;return null}
export function isLat(f){return !!RULES.latitude[f]}
export function quote(q){
  if(q.fare==="Y_BASIC")return{ok:false,why:"Economy Basic fares can't be upgraded with eUpgrades."};
  if(q.tier==="MEMBER"&&!isLat(q.fare))return{ok:false,why:"Without status, eUpgrades are limited to Latitude fares."};
  const b=band(q.zone,q.miles);if(!b)return{ok:false,why:"Distance is outside the published bands."};
  const chart=RULES.charts[`${q.zone}|${q.cabin}|${q.purchase}`];if(!chart)return{ok:false,why:"No published chart for this combination."};
  const cands=(q.purchase==="REWARD"&&q.fare==="Y_COMFORT")?["Y_COMFORT","Y_FLEX"]:[q.fare];
  for(const fare of cands){const row=chart.find(r=>r[0]===fare&&(r[1]==="ALL"||r[1].includes(q.cls)));if(!row)continue;
    const cell=row[2][b];if(!cell)continue;const[credits,addon=0,isMin=false,seWaive=false]=cell;
    const waived=seWaive&&q.tier==="SUPER_ELITE";return{ok:true,credits,addon:waived?0:addon,isMin:waived?false:isMin,waived};}
  return{ok:false,why:"This fare and booking class isn't eligible on this route."};
}
export function windowInfo(t,z,f){const c=RULES.windows[t],lat=isLat(f);
  if(lat){if(c.lat==="ANY")return{days:0,any:true,txt:"Latitude fare — clears the moment you request."};
    const d=c.lat[z];return{days:d,any:false,txt:`Non-status Latitude — window opens ${d} days out.`};}
  if(!c.non)return{days:null,any:false,txt:"No status: this fare brand can't be upgraded."};
  const d=c.non[z];return{days:d,any:false,txt:`Window opens ${d} days before departure.`};}
