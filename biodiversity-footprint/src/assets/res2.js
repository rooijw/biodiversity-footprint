module.exports = {
  "Land use": [
    {
      "msa": 1,
      "type": "Primary forests",
      "description": "Forests with minimal disturbance where flora and fauna species abundance is near pristine.\n" +
      " Not present in the Netherlands."
    },
    {
      "msa": 0.2,
      "type": "Forest plantations, single species",
      "description": "Planted forest, often with exotic species. Plantations with only exotic species have the lowest value (0.2). Plantations with several local species have a higher biodiversity. Plantations with short rotations have a lower value than those with long rotations. "
    },
    {
      "msa": 0.3,
      "type": "Forest plantations, mixed species",
      "description": "Forest plantations, mixed species"
    },

   {
     "msa": 0.5,
     "type": "Secondary forests",
     "description": "Areas originally covered with forest or woodlands, where vegetation has been removed, forest is re-growing or has a different cover and is no longer in use"
   },
   {"msa": 0.7,
     "type": "Light used primary forest (limited selective logging of semi-natural forest)",
     "description": "Forests with extractive use and associated disturbance like hunting and selective logging, where timber extraction is followed by a long period of re-growth with naturally occurring tree species. Reduced Impact Logging."
   },
   {"msa": 0.8,
     "type": "Light used forest (limited selective logging of semi-natural forest with Reduced Impact Logging management)",
     "description": ""
    },
   {"msa": 0.5,
     "type": "Agro-forestry",
     "description": "Agricultural production intercropped with (native) trees. \n" +
     "Trees are kept for shade or as wind shelter"

   },
   {"msa": 0.3,
     "type": "Extensive agriculture / low input farming",
     "description": "Subsistence and traditional farming, farming, and low external input agriculture"
   },
   {"msa": 0.05,
     "type": "Irrigated intensive agriculture",
     "description": "High external input irrigation-based agriculture, conventional agriculture, mostly with a degree of regional specialization,  , drainage-based agriculture"
    },
   {"msa": 0.1,
     "type": "Intensive agriculture",
     "description": "High external input agriculture, conventional agriculture, mostly with a degree of regional specialization, drainage-based agriculture"

   },
   {"msa": 0.2,
     "type": "Perennial crops & woody bio fules",
     "description": "Cultivated perennial crops, including bio fuel crops"
   },
   {"msa": 0.1,
     "type": "Intensive managed man made pastures",
     "description": "Forests, woodlands and natural grasslands that have been converted\n" +
     "to grasslands for livestock grazing. "
   },
   {"msa": 1,
     "type": "Natural grass & shrub lands",
     "description": "Grassland or scbuildrubland-dominated vegetation (incl natural wetlands) with minimal disturbance where flora and fauna species abundance is near pristine. (E.g. undisturbed steppe, tundra, or savannah)"
   },
   {"msa": 0.05,
     "type": "Urban area, industrial area",
     "description": "Areas with more than 80% build up and other artificial surfaces"
   },
   {"msa": 0.05,
     "type": "Mining area",
     "description": "Areas predominantly excavated land for mining" +
     "MSA value estimated; no cause-effect relation yet"
   },
   {"msa": 1,
     "type": "Natural bare, rock and snow",
     "description": "Areas permanently covered with snow or ice considered as undisturbed areas"
    },
   {"msa": 1,
     "type": "Natural rangelands",
     "description": "Rangeland ecosystems determined by climatic and geographical circumstances and grazed by wildlife or domestic animals at rates similar to those of free-roaming wildlife"
    },
   {"msa": 0.7,
     "type": "Extensively used or recent abandoned rangelands",
     "description": "Rangelands with low stocking rates or original grasslands no longer in use, lacking wildlife grazing and no forests developed"
   },
   {"msa": 0.6,
     "type": "Moderately used rangelands",
     "description": "Rangelands with higher stocking rates: grazing has different seasonal patterns or vegetation structure is different compared with natural rangelands"
    },
   {"msa": 0.5,
     "type": "Intensively used rangelands",
     "description": "Rangelands with very high stocking rates: grazing has different seasonal patterns and vegetation structure is different compared with natural rangelands"

   },
   {"msa": 0.3,
     "type": "Extensive managed man-made grasslands",
     "description": "Man made rangeland with extensive/organic management, including converted forests"
    },
    {"msa": 0.3,
     "type": "Intensive managed man-made grasslands",
     "description": "Man made rangeland with intensive management"
    }
  ],
  "Green house gas": [
    {
      "CO2 eq" : 1,
      "type":"CO2 (m3)",
      "description":"Carbon dioxide. Colorless gas"
    },
    {
      "CO2 eq" : 25,
      "type":"CH4 (m3)",
      "description":"Methane. Colorless, flammable, nontoxic gas with a sweet, oil type odor"
    }
 ,
   {"CO2 eq": 298,
     "type": "N2O (m3)",
     "description": "Nitrous oxide / laughing gas"
    },
   {"CO2 eq": 0.65,
     "type": "Petrol (liter)",
     "description": "Gasoline"
    },
   {"CO2 eq": 0.01,
     "type": "Hard coal briquettes (kg)",
     "description": "Compressed block of coal dust or other combustible biomass material such as charcoal, sawdust, wood chips, peat, or paper used for fuel and kindling to start a fire."
    },
   {"CO2 eq": 0.53,
     "type": "Diesel (liter)",
     "description": "Liquid fuel used in diesel engines, whose fuel ignition takes place, without any spark, as a result of compression of the inlet air mixture and then injection of fuel."
    },
   {"CO2 eq": 0.53,
     "type": "Electricity - NL (kWh)",
     "description": "Electricity"
    },
   {"CO2 eq": 0.14,
     "type": "Natural gas (m3)",
     "description": "Naturally occurring hydrocarbon gas mixture consisting primarily of methane, but commonly including varying amounts of other higher alkanes, and sometimes a small percentage of carbon dioxide, nitrogen, hydrogen sulfide, or helium"
    },
   {"CO2 eq": 0.,
     "type": "Electricity from wind, sun and water power (kWh)",
     "description": "Electricity from wind, sun and water power (kWh)"

   },
   {"CO2 eq": 0.19,
     "type": "Electricity from biomass (kWh)",
     "description": "Biomass is an industry term for getting energy by burning wood, and other organic matter"

   },
   {"CO2 eq": 0.,
     "type": "Other",
     "description": "Any other type"
    }
  ],
  "Transport": [
    {
      "CO2 eq per ton/km": 1.95,
      "type": "light commercial vehicle (Van)",
      "description": ""
    },
    {
      "CO2 eq per ton/km": 0.085,
      "type": "Lorry (>32 metric ton)",
      "description": ""
    },
    {
      "CO2 eq per ton/km": 0.170,
      "type": "Lorry (16-32 metric ton)",
      "description": ""
    },
    {
      "CO2 eq per ton/km": 0.22,
      "type": "Lorry (7.5-16 metric ton)",
      "description": ""
    },
    {
      "CO2 eq per ton/km": 0.525,
      "type": "Lorry (3.5-7.5 metric ton)",
      "description": ""
    },
    {
      "CO2 eq per ton/km": 0.05,
      "type": "Freight train (electric)",
      "description": ""
    },
    {
      "CO2 eq per ton/km": 0.03,
      "type": "Freight train (diesel)",
      "description": ""
    },
    {
      "CO2 eq per ton/km": 0.05,
      "type": "Barge tanker",
      "description": ""
    },
    {
      "CO2 eq per ton/km": 0.05,
      "type": "Barge",
      "description": ""
    },
    {
      "CO2 eq per ton/km": 0.01,
      "type": "transoceanic tanker",
      "description": ""
    },
    {
      "CO2 eq per ton/km": 0.01,
      "type": "transoceanic ship",
      "description": ""
    },
    {
      "CO2 eq per ton/km": 1.7,
      "type": "Aircraft (intracontinental)",
      "description": ""
    },
    {
      "CO2 eq per ton/km": 1.1,
      "type": "Aircraft (intercontinental)",
      "description": ""
    }
  ]
}
