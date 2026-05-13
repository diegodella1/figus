import { OFFICIAL_2026_TEAMS, OFFICIAL_SOURCES } from "@/lib/official-catalog";

export function officialTeamStarterRows() {
  return OFFICIAL_2026_TEAMS.flatMap((team) =>
    Array.from({ length: 3 }, (_, index) => {
      const number = index + 1;
      return {
        code: `${team.code}-${String(number).padStart(2, "0")}`,
        team: team.name,
        number,
        label: `${team.name} official checklist slot ${number}`,
        section: "Official qualified team",
        rarity: null,
        source_url: OFFICIAL_SOURCES.fifaTeamProfiles,
      };
    }),
  );
}
