export const OFFICIAL_SOURCES = {
  paniniCollection:
    "https://www.paniniamerica.net/fifa-world-cup-2026-official-sticker-collection-album.html",
  fifaTeams:
    "https://www.fifa.com/en/tournaments/mens/worldcup/canadamexicousa2026/articles/world-cup-2026-who-has-qualified",
  fifaTeamProfiles: "https://www.fifa.com/en/tournaments/mens/worldcup/canadamexicousa2026/teams",
} as const;

export type OfficialTeam = {
  name: string;
  confederation: string;
  code: string;
};

// Team list sourced from FIFA's official qualified teams/team profiles pages.
export const OFFICIAL_2026_TEAMS: OfficialTeam[] = [
  { code: "CAN", name: "Canada", confederation: "Concacaf" },
  { code: "MEX", name: "Mexico", confederation: "Concacaf" },
  { code: "USA", name: "USA", confederation: "Concacaf" },
  { code: "ALG", name: "Algeria", confederation: "CAF" },
  { code: "ARG", name: "Argentina", confederation: "CONMEBOL" },
  { code: "AUS", name: "Australia", confederation: "AFC" },
  { code: "AUT", name: "Austria", confederation: "UEFA" },
  { code: "BEL", name: "Belgium", confederation: "UEFA" },
  { code: "BIH", name: "Bosnia and Herzegovina", confederation: "UEFA" },
  { code: "BRA", name: "Brazil", confederation: "CONMEBOL" },
  { code: "CPV", name: "Cabo Verde", confederation: "CAF" },
  { code: "COL", name: "Colombia", confederation: "CONMEBOL" },
  { code: "COD", name: "Congo DR", confederation: "CAF" },
  { code: "CIV", name: "Cote d'Ivoire", confederation: "CAF" },
  { code: "CRO", name: "Croatia", confederation: "UEFA" },
  { code: "CUW", name: "Curacao", confederation: "Concacaf" },
  { code: "CZE", name: "Czechia", confederation: "UEFA" },
  { code: "ECU", name: "Ecuador", confederation: "CONMEBOL" },
  { code: "EGY", name: "Egypt", confederation: "CAF" },
  { code: "ENG", name: "England", confederation: "UEFA" },
  { code: "FRA", name: "France", confederation: "UEFA" },
  { code: "GER", name: "Germany", confederation: "UEFA" },
  { code: "GHA", name: "Ghana", confederation: "CAF" },
  { code: "HAI", name: "Haiti", confederation: "Concacaf" },
  { code: "IRN", name: "IR Iran", confederation: "AFC" },
  { code: "IRQ", name: "Iraq", confederation: "AFC" },
  { code: "JPN", name: "Japan", confederation: "AFC" },
  { code: "JOR", name: "Jordan", confederation: "AFC" },
  { code: "KOR", name: "Korea Republic", confederation: "AFC" },
  { code: "MAR", name: "Morocco", confederation: "CAF" },
  { code: "NED", name: "Netherlands", confederation: "UEFA" },
  { code: "NZL", name: "New Zealand", confederation: "OFC" },
  { code: "NOR", name: "Norway", confederation: "UEFA" },
  { code: "PAN", name: "Panama", confederation: "Concacaf" },
  { code: "PAR", name: "Paraguay", confederation: "CONMEBOL" },
  { code: "POR", name: "Portugal", confederation: "UEFA" },
  { code: "QAT", name: "Qatar", confederation: "AFC" },
  { code: "KSA", name: "Saudi Arabia", confederation: "AFC" },
  { code: "SCO", name: "Scotland", confederation: "UEFA" },
  { code: "SEN", name: "Senegal", confederation: "CAF" },
  { code: "RSA", name: "South Africa", confederation: "CAF" },
  { code: "ESP", name: "Spain", confederation: "UEFA" },
  { code: "SWE", name: "Sweden", confederation: "UEFA" },
  { code: "SUI", name: "Switzerland", confederation: "UEFA" },
  { code: "TUN", name: "Tunisia", confederation: "CAF" },
  { code: "TUR", name: "Turkiye", confederation: "UEFA" },
  { code: "URU", name: "Uruguay", confederation: "CONMEBOL" },
  { code: "UZB", name: "Uzbekistan", confederation: "AFC" },
];
