import { topic2Vocab } from "./topic2";
import { topic3Vocab } from "./topic3";
import { topic4Vocab } from "./topic4";
import { topic5Vocab } from "./topic5";
import { topic6Vocab } from "./topic6";
import { topic7Vocab } from "./topic7";
import { topic8Vocab } from "./topic8";
import { topic9Vocab } from "./topic9";
import { topic10Vocab } from "./topic10";
import { topic11Vocab } from "./topic11";
import { topic12Vocab } from "./topic12";
import { topicAVocab } from "./topicA";
import { topicWVocab } from "./topicW";
import { topicVVocab } from "./topicV";

export interface Topic {
  id: string;
  name: string;
  totalWords: number;
}

export const topics: Topic[] = [
  { id: "1", name: "Umwelt (Environment)", totalWords: 394 },
  { id: "2", name: "Bildung (Education)", totalWords: 293 },
  { id: "3", name: "Arbeitswelt (Work)", totalWords: 417 },
  { id: "4", name: "Musik (Music)", totalWords: 241 },
  { id: "5", name: "Medien (Media)", totalWords: 377 },
  { id: "6", name: "Feste & Traditionen", totalWords: 400 },
  { id: "7", name: "Einwanderung - Beiträge", totalWords: 142 },
  { id: "8", name: "Integration & Ausgrenzung", totalWords: 320 },
  { id: "9", name: "Rassismus & Einwanderung", totalWords: 268 },
  { id: "10", name: "Die DDR (The GDR)", totalWords: 259 },
  { id: "11", name: "Wiedervereinigung", totalWords: 220 },
  { id: "12", name: "Nach der Wende", totalWords: 221 },
  { id: "A", name: "Strukturwörter (Structural)", totalWords: 499 },
  { id: "W", name: "Film - Die Welle", totalWords: 245 },
  { id: "V", name: "Buch - Der Vorleser", totalWords: 193 },
];

export interface Word {
  id: string;
  topicId: string;
  day: number;
  german: string;
  english: string;
  category?: string;
}

export const topic1Vocab = `
1	auf die Umweltverschmutzung aufmerksam machen	to raise awareness of environmental pollution
1	die Umwelt	environment
1	die Umweltbelastung(en), der Umweltschaden	damage to the environment
1	die Umwelterziehung	environmental education
1	die Umweltkatastrophe	environmental disaster
1	die Umweltpolitik	environmental policy
2	die Umweltsteuer (n), die Ökosteuer (n)	environmental tax
2	der Klimawandel	climate change
2	die Klimaänderung (en), der Klimawandel	climate change
2	der Umweltschutz	environmental protection
2	die Energie	energy
2	die Energieeffizienz	energy efficiency
3	die Energiegewinnung	energy generation
3	die Energiequelle (n), der Energieträger	energy source
3	die Energiesparlampe (n)	energy saving lightbulb
3	die Energiewende	energy transition
3	erneuerbar	renewable
3	erneuerbare Energie	renewable energy
4	Nachhaltig leben	Living sustainably
4	die Nachhaltigkeit	sustainability
4	nachhaltig	sustainable
4	recyceln (pf hat ... recycelt)	to recycle
4	recyceln, wiederverwerten	to recycle
4	die Erderwärmung	global warming
5	der Müll, der Abfall (¨e)	rubbish, waste
5	der Mülleimer (-)	dustbin
5	die Abfallentsorgung	waste disposal
5	die Abfalltrennung	separation of rubbish into plastics, paper etc.
5	die Abfallvermeidung	ways of reducing waste
5	verpesten, verschmutzen, verseuchen, belasten	to pollute
6	verschmutzen, belasten	to pollute
6	schützen vor (DAT)	to protect from
6	gefährlich	dangerous
6	das ökologische Gleichgewicht gefährden	to threaten the ecological balance
6	gefährden	to endanger
6	gesundheitsgefährdend	damaging to health
7	verursachen	to cause
7	Die Folgen	The consequences
7	die Folge (n)	consequence
7	die Folgen sind kaum absehbar	it's hard to say what the consequences will be
7	die Folgen voraussagen	to predict theconsequences
7	bedrohen	to threaten
8	bedrohen, drohen	to threaten
8	die Katastrophe (n)	catastrophe
8	der Treibhauseffekt	greenhouse effect
8	umweltfreundlich	environmentally friendly
8	die Luft	air
8	die Luftverschmutzung	air pollution
9	die Naturkatastrophe (n)	natural disaster
9	Energie sparen	to save energy
9	dadurch könnte man bis zu 20% Energie sparen	by this method energy savings of up to 20% could be made
9	der CO₂-Ausstoß	CO₂ emissions
9	die Senkung der CO2 Emissionen um 40%	the reduction of CO2 emissions by 40%
9	die Verschmutzung	pollution
10	das Recycling	recycling
10	schaden (DAT)	to damage
10	schädlich	damaging
10	verbieten (ie-o-o)	to ban
10	den CO2 Fußabdruck reduzieren kurzfristig	to reduce one's carbon footprint short-term
10	mindern, reduzieren	to reduce
11	die Abhängigkeit von fossilen Brennstoffen verringern	to reduce reliance on fossil fuels
11	Fossile Brennstoffe	Fossil fuels
11	die fossilen Brennstoffe	fossil fueIs
11	der Brennstoff	fuel
11	das E-Auto (s)	electric car
11	klimaneutral	climate-neutral, carbon-neutral
12	die Klimakrise	climate crisis
12	nutzen	to use, make use of
12	verbrauchen	to use
12	verwirklichen	to put into effect, action
12	das Heizungsgesetz	heating law (Gebaeudeenergiegesetz)
12	regenerativ	renewable
13	bleifrei tanken	to use unleaded petrol
13	einschränken	to limit, restrict
13	freisetzen	to release
13	heizen	to heat
13	konsumieren	to consume
13	lüften	to ventilate
14	retten	to save, rescue
14	rücksichtslos, gedankenlos	thoughtless
14	schonen	to conserve
14	speichern	to store
14	spenden	to donate
14	trennen	to sort, divide
15	vergiften	to poison
15	vergiften	to poison
15	wiederverwenden	to reuse
15	überleben	to survive
15	bezahlbar	affordable
15	das Umweltbundesamt	government department for the environment
16	der Hausmüll	household waste
16	die Konsumgesellschaft	consumer society
16	die Rücksichtslosigkeit	thoughtlessness
16	giftig	poisonous
16	langfristig	long-term
16	umweltfeindlich	damaging to the environment
17	umweltverträglich	not harmfull to the environment
17	unumkehrbar	irreversible
17	vorsorglich	as a precaution
17	ökologisch	ecological
17	Autofahrer am Rasen hindern	to make drivers slow down
17	das Deutschlandticket	49-euro public transport ticket
18	das Gesetz verschärfen	to tighten up the law
18	emissionsfrei	emission free
18	energiesparend	energy-saving
18	entstehen durch (AKK)	to result from
18	giftige Abgase abgeben (i-a-e)	to give off poisonous waste gases
18	katastrophal	catastrophic
19	krebserregend	carcinogenic (adj)
19	mit etwas sparsam umgehen	to use sth. economically
19	radioaktiv	radioactive
19	sauber	clean
19	sicher	safe, certainly
19	umweltbewusst	environmentally aware
20	zu neuen Produkten verarbeiten	to turn into new products
20	Gartenabfälle kompostieren	to compost garden waste
20	Gegenmaßnahmen einleiten	to introduce counter-measures
20	Gemüse anbauen	to grow, plant vegetables
20	Strom erzeugen	to produce electricity
20	aussterben (i-a-o)	to die out,  become extinct
21	fertigen, herstellen	to manufacture
21	isolieren, dämmen	to insulate
21	schmelzen (i-a-o)	to melt
21	sich anstrengen	to increase one's efforts
21	sich entwickeln	to develop
21	vergeuden, verschwenden	to waste
22	wegwerfen (i-a-o)	to throw away
22	zerstören, vernichten	to destroy
22	biologisch abbaubar	biodegradable
22	das Problem (e)	problem
22	die Auswirkung (en)	effect, impact
22	die Auswirkung (en)	effect, consequence
23	die Gefahr (en)	danger
23	die Gefährdung (GEN)	danger (to)
23	die Sondermüllsammelstelle (n)	collection point for old paint, oil etc.
23	dreckig, schmutzig	dirty
23	ein besserer Ausnutzungsgrad	more efficient use
23	recycelbar, wiederverwertbar	recyclable
24	"Müllabladen verboten"	"No tipping"
24	Die Gegenmaßnahmen	Counter-measures
24	Die Wasserverschmutzung	Water pollution
24	Energie speichern	producing zero emissions (e.g. vehicle) to store energy
24	aus Altpapier	made from recycled paper
24	das Abwasser	sewage
25	das Benzin	petrol, gas
25	das Erdgas	natural gas
25	das Erdöl	oil
25	das Grundwasser	ground water
25	das Hochwasser	flood, flooding (in town)
25	das Hybridauto	hybrid car
26	das Kohlendioxid	carbon dioxide, CO2
26	das Naturschutzgebiet(e)	nature reserve
26	das Ozonloch	hole in the ozone layer
26	das Passivhaus(¨er)	passive (=ultra-low energy) house
26	das Rohöl	crude oil
26	das Schiefergas	shale gas
27	das Schwefeldioxid	sulphur dioxide, SO2
27	das Trinkwasser	drinking water
27	das Umweltbewusstsein	environmental consciousness
27	das Umweltbewusstsein	environmental awareness
27	das Waldsterben	destruction of forests (by acid rain)
27	das Ökosystem	eco-system
28	das Überleben	survival
28	der Artenschutz	protection of species
28	der Atomausstieg	abandoning of nuclear energy
28	der Atommüll	nuclear waste
28	der Autoschrott	scrap vehicles
28	der Energiebedarf	energy requirements
29	der Energieverbrauch	energy consumption
29	der Industriemüll	industrial waste
29	der Katastrophenschutz	emergency services
29	der Klimaprotest (e)	climate protest
29	der Kohlenstoff	carbon
29	der Meeresmüll	marine waste
30	der Rohstoffabbau	mining of raw materials
30	der Ruß	soot
30	der Sauerstoff	oxygen
30	der Schadstoff	pollutant
30	der Schrott	scrap metal
30	der Smog	smog
31	der Sperrmüll	bulky items of refuse
31	der Stickstoff	nitrogen
31	der Stromausfall	power failure, blackout
31	der Stromverbrauch	energy consumption
31	der Umweltschützer	environmentalist
31	der Verbrennungsmotor(en)	internal combustion engine
32	der Wasserstoff	hydrogen
32	die  Mikroplastik	microplastics
32	die Aludose(n)	aluminium can
32	die Ausbeutung	exploitation
32	die Autoabgase	car exhaust fumes, gases
32	die Bergungsarbeiten	rescue work
33	die Biomasse	biomass
33	die Bodenerosion	soiI erosion
33	die Brennstäbe	fuel rods
33	die Dachkollektoren	solar panels on roof
33	die Doppelverglasung	double glazing
33	die Dreifachverglasung	triple glazing
34	die Dürre	drought
34	die Entwaldung	deforestation
34	die Entwässerung	drainage
34	die Erdölförderländer	oil-producing countries
34	die Erdölförderung	oil production
34	die Erdölraffinerie(n)	oil refinery
35	die Erdölvorräte	oil reserves
35	die Gentechnik	genetic engineering
35	die Gewässer	lakes and rivers
35	die Gezeitenenergie	tidal energy
35	die Hochwasserwarnung	flood warning
35	die Isolierung	insulator
36	die Kernschmelze	meltdown
36	die Kohle	coal
36	die Landwirtschaft	agriculture
36	die Müllabfuhr	refuse collection
36	die Oberfischung	over-fishing
36	die Ozonschicht	ozone layer
37	die Radioaktivität	radioactivity (nuclear)
37	die Reichweite	range (e.g. of electric vehicle)
37	die Rettungsmannschaft	emergency rescue team
37	die Rückstände	residues
37	die Sonnenenergie	solar energy
37	die Sonnenkollektoren	solar panels
38	die Steuervorteile	tax incentives
38	die Stickstoffoxide	nitrogen oxides
38	die Strahlung	radiation
38	die Treibhausgase	greenhouse gases
38	die Verkehrsberuhigung	traffic-calming
38	die Verwüstung	devastation
39	die Wasserkraft	hydroelectric power
39	die Wasserversorgung	water supply
39	die Wasservorräte	water reserves
39	die Wellenenergie	wave power
39	die Windenergie	Wind power
39	die Wärmedämmung	insulation (against  heat loss)
40	die Wärmepumpe (n)	heat pump
40	die letzte Generation	Last Generation (climate activist group)
40	die Ökobilanz	the ecological balance
40	die Ölpest	oil pollution, oil leak
40	die Überbevölkerung	overpopulation
40	die Überdüngung	over-fertilization
41	extreme Wetterereignisse	extreme weather events
41	grenzüberschreitende Regelungen	cross-border agreements
41	hohe Nitratgehalte	high concentrations of nitrates
41	industrielle Abwasser	industrial effluent
41	künstliche Düngemittel	artificial fertilisers
41	null Emissionen	zero emissions
42	Rohstoffe wiedergewinnen (i-a-o)	to reclaim raw materials
42	auf etwas verzichten	to do without sth.
42	außer Kontrolle geraten (a-ie-a)	to get out of control
42	beängstigende Ausmaße annehmen	to reach a worrying level
42	das Verständnis erhöhen	to increase one's understanding
42	den Energiebedarf abdecken	to cover energy needs
43	den Müll getrennt sammeln	to collect rubbish according to type
43	den Plastikverbrauch senken	to reduce plastic consumption
43	den Regenwald vernichten	to destroy the rain forest
43	die Regenanlage einstellen	to adjust the time I temperature unit
43	die Schadstoffbelastung mindern	to reduce damage by pollutants
43	die Schäden eindämmen	to contain the damage
44	die langfristigen Auswirkungen bewerten	to assess the long-term effects
44	einen Lebensstil führen	to lead a lifestyle
44	einen Ölteppich beseitigen	to clean up an oil slick
44	erschöpft werden (i-u-o)	to runout
44	in das Grundwasser sickern	to seep into the ground water
44	quellen (i-o-o) aus	to pour from
45	sich zu etwas verpflichten	to commit oneself to sth
45	warnen vor etwas (DAT)	to warn of sth.
45	(große / geringe) Energiegewinne	(large / small) energy savings
45	Was bleibt dann übrig?	What will be left?
45	abhängig von (DAT)	dependent on
46	das Abschmelzen der Polkappen	melting of the ice-caps
46	das Elektroauto, der Stromer	electric car
46	das Erdbeben (-)	earthquake
46	das Gewitter (-)	storm
46	das Gift (e)	poison
47	das Katastrophengebiet (e)	disaster area
47	das Nachbeben (-)	aftershock
47	das Pfand (¨er)	deposit (e.g. on returnable container)
47	das Risiko (pl Risiken)	risk
47	das Rote Kreuz	Red Cross
48	das Stickstoffoxid (e)	nitrogen oxide
48	das Technische Hilfswerk, THW	emergency relief service, technical aid
48	das illegale Müllabladen	fly-tipping
48	das Ökodorf (¨er)	eco-village
48	der Anstieg des Meeresspiegels	rise in sea-level
49	der Diesel (-kraftstoff)	diesel (fuel)
49	der Katalysator (en)	catalytic converter
49	der Kernreaktor, der Atomreaktor	nuclear reactor
49	der Komposthaufen (-)	compost heap
49	der Kraftstoff  (e)	fuel (for engine)
50	der Krebsauslöser (-)	cancer-causing agent
50	der Kunststoffcontainer (-)	plastic container
50	der Mangel an Rohstoffen	the shortage of raw materials
50	der Reaktor (en)	reactor
50	der Regenwald (¨er)	rainforest
51	der Schadstoff (e)	contaminant, pollutant
51	der Selbstversorger (-)	person who is self-sufficient
51	der Stausee (n)	reservoir
51	der Taifun (e)	typhoon
51	der Umwelt zuliebe	for the sake of the environment
52	der Umweltsünder (-)	polluter
52	der Umweltverstoß (¨e)	action damaging to the environment
52	der Verbraucher (-)	consumer
52	der Vulkan (e)	volcano
52	der Wirbelsturm (¨e)	cyclone
53	der geringe Benzinverbrauch	low fuel con sumpiton
53	der saure Regen	acidrain
53	der sintflutartige Regen	torrential rain
53	der Ökostromanbieter (-)	green energy supplier
53	die Anrainerstaaten der Nordsee	countries bordering the North Sea
54	die Atomenergie, die Kernkraft	atomic energy
54	die Bedrohung (en)	threat
54	die Biolebensmittel (pl)	organic food
54	die Biotonne (n)	organic waste collection bin
54	die Einwegflasche (n)	non-returnable bottle
55	die Einwegverpackung (en)	one-way I disposable packaging
55	die Emission (en)	emission (of gas etc.)
55	die Gemeinde (n)	community, local authority
55	die Geschwindigkeitsbegrenzung (en)	speed limit
55	die Industrie (n)	industry
56	die Kartonage (n)	cardboard packaging
56	die Kläranlage (n)	sewage treatment plant
56	die Lawine (n)	avalanche
56	die Mülldeponie (n)	rubbish dump. land fill
56	die Müllverbrennungsanlage (n)	refuse incinerator plant
57	die Oberflutung der Küstenstreifen	flooding of coastal regions
57	die Offshore-Windanlage (n)	offshore wind farm
57	die Plastiktüte (n)	plastic bag
57	die Solaranlage (n)	solar energy system
57	die Verpackung (en)	packaging
58	die Wiederaufbereitungsanlage (WAA)	nuclear reprocessing plant
58	die Windfarm (en)	wind farm
58	die geothermische Energie	geothermal energy
58	die grünen Zukunftstechnologien	the green technologies of the future
58	die intensive Landwirtschaft	intensive farming
59	die steigende Agrarproduktion	rising agricultural production
59	die wilde Müllkippe (n)	illegal rubbish dump
59	die Überschwemmung (en)	flood
59	die ökologische Landwirtschaft	organic agriculture
59	ehemals dicht bewaldete Flächen	what were once thickly forested areas
60	ein empfindliches Ökosystem	a delicate ecosystem
60	gefährdete Tier- und Pflanzenarten	threatened animal and plant species
60	sparsam (im Verbrauch)	economical (in consumption)
60	ultraviolette (UV-) Strahlen	ultraviolet (UV) rays
60	um kommender Generationen willen	for thesake of future generations
61	vom Aussterben bedrohte Tierarten	species threatened with extinction
61	vom Menschen ausgelöst, verursacht	man-made
61	alternative Energiequellen entwickeln	to develop alternative energy sources
61	den CO2-Fußabdruck ausgleichen (ei-i-i)	to offset one's carbon footprint
61	saubere  Energietechnologien fördern	to support clean energy technologies
62	Abfälle auf die Straße werfen	to drop litter in the street
62	Gebiete mit intensiver Landwirtschaft	areas with intensive agriculture
62	das Land / den Wald roden	to clear  land /forest
62	die Endlagerung radioaktiver Abfälle	the storage of radioactive waste
62	in die Atmosphäre blasen (a-ie-a)	to pump into the atmosphere
63	leere Flaschen zum Altglascontainer bringen	to take empty bottles to the glass recycling skip
63	wegschmeißen (ei-i-i), wegwerfen (i-a-o)	to throw away
63	50 Cent Pfand auf der Flasche	50 cent deposit on the bottle
63	das / die Rußpartikel (n)	soot particle
63	das wird uns teuer zu stehen kommen	that will cost us dear
64	der Ausstieg aus der Atomenergie	the move away from atomic energy
64	die Bedrohung für die Menschheit	the threat to humanity
64	es kommt  alles in den Mülleimer	it all goes into the dust bin
64	man sagt voraus, dass ...	it is forecast that...
64	voll / frei von Schadstoffen	full / free of harmful substances
65	Chemikalien in Gewässer ablassen (ä-ie-a)	to release chemicals into rivers and lakes
65	den Umweltschutz in die Praxis umsetzen	to put environmental conservation into practice
65	die See (n), das Meer (e)	sea
65	ein Atomkraftwerk in Betrieb nehmen	to commission a nuclear power station
65	in den Naturhaushalt eingreifen (ei-i-i)	to interfere withthebalance of nature
66	temporäre Unterbrechungen in der Versorgung ausgleichen (ei-i-i)	to even out temporary breaks in production
66	zum  Antrieb von Turbinen einsetzen ein Atomkraftwerk stilllegen	to close down a nuclear powerstation
66	Ökonomische und Ökologische Interessen abwägen	to balance economic and ecological interests
66	Autos müssen reduzierten Abgasnormen genügen	cars have to meet stricter exhaust controls
66	Schadstoffe gelangen über die Nahrungskette in den Körper	pollutants reach the body by way of the food chain
67	bis zum Beginn des nächsten Jahrhunderts	by  the beginning of  the next  century
67	das Feuer, der Brand, der Flächenbrand	fire, extensive blaze
67	das Fracking, das Hydraulic Fracturing	tracking, hydrauilc fracturing
67	der Gau (größter anzunehmender Unfall)	MCA (maximum credible accident)
67	die Aufnahmekapazität des Meeres für Schadstoffe	ability of the sea to absorb pollutants
68	ein vermehrtes Auftreten von Hautkrebs	an increased incidence of skincancer
68	eine Wende in der öffentlichen Einstellung zum Umweltschutz	a change in the public's attitude to environmental conservation
68	es wird Millionen ins Elend stürzen	it will plunge millions into poverty
68	genmanipulierte Pflanzen, gentechnisch veränderte Pflanzen die Gentechnik	genetically modified plants
68	ihr Einsatz wird durch ... beschränkt (AKK)	their  use  is limited by…
69	sie können nicht kontinuierlich Energie liefern	they cannot supply energy constantly
69	um das Überleben der Menschheit zu sichern	in order to ensure the survival  of humanity
69	wenn zu ihrer Rettung nichts unternommen wird	if nothing is done to save them
69	wir müssen uns mit dem Thema des Klimawandels befassen	we must address the issue of climate change
69	das Kernkraftwerk (KKW), das Atomkraftwerk (AKW)	nuclear power station
70	das Windrad (¨er), die Windturbine (n)	wind turbine
70	der Elektroantrieb (e), -motor (en)	electric motor
70	der Hybridantrieb (e), der Hybridmotor (en)	hybrid motor
70	die Pfandflasche (n), die Mehrwegflasche(n)	returnable bottle
70	die Pipeline (s), die Rohrleitung (en)	pipeline
`;

export const vocabulary: Word[] = [
  ...topic1Vocab
    .trim()
    .split("\n")
    .map((line, index) => {
      const [day, german, english] = line.split("\t");
      return {
        id: `word_1_${index}`,
        topicId: "1",
        day: parseInt(day, 10),
        german: german?.trim() || "",
        english: english?.trim() || "",
      };
    })
    .filter((w) => w.german && w.english && !isNaN(w.day)),
  ...topic2Vocab
    .trim()
    .split("\n")
    .map((line, index) => {
      const [day, german, english] = line.split("\t");
      return {
        id: `word_2_${index}`,
        topicId: "2",
        day: parseInt(day, 10),
        german: german?.trim() || "",
        english: english?.trim() || "",
      };
    })
    .filter((w) => w.german && w.english && !isNaN(w.day)),
  ...topic3Vocab,
  ...topic4Vocab,
  ...topic5Vocab,
  ...topic6Vocab,
  ...topic7Vocab,
  ...topic8Vocab,
  ...topic9Vocab,
  ...topic10Vocab,
  ...topic11Vocab,
  ...topic12Vocab,
  ...(Array.isArray(topicAVocab)
    ? topicAVocab
    : (topicAVocab as unknown as string)
        .trim()
        .split("\n")
        .map((line, index) => {
          const [day, german, english] = line.split("\t");
          return {
            id: `word_A_${index}`,
            topicId: "A",
            day: parseInt(day, 10),
            german: german?.trim() || "",
            english: english?.trim() || "",
          };
        })
        .filter((w) => w.german && w.english && !isNaN(w.day))),
  ...(Array.isArray(topicWVocab)
    ? topicWVocab
    : (topicWVocab as unknown as string)
        .trim()
        .split("\n")
        .map((line, index) => {
          const [day, german, english] = line.split("\t");
          return {
            id: `word_W_${index}`,
            topicId: "W",
            day: parseInt(day, 10),
            german: german?.trim() || "",
            english: english?.trim() || "",
          };
        })
        .filter((w) => w.german && w.english && !isNaN(w.day))),
  ...(Array.isArray(topicVVocab)
    ? topicVVocab
    : (topicVVocab as unknown as string)
        .trim()
        .split("\n")
        .map((line, index) => {
          const [day, german, english] = line.split("\t");
          return {
            id: `word_V_${index}`,
            topicId: "V",
            day: parseInt(day, 10),
            german: german?.trim() || "",
            english: english?.trim() || "",
          };
        })
        .filter((w) => w.german && w.english && !isNaN(w.day))),
];
