insert into public.stickers (code, team, number, label, section, source_url)
values
  ('CAN-01','Canada',1,'Canada official checklist slot 1','Official qualified team','https://www.fifa.com/en/tournaments/mens/worldcup/canadamexicousa2026/teams'),
  ('MEX-01','Mexico',1,'Mexico official checklist slot 1','Official qualified team','https://www.fifa.com/en/tournaments/mens/worldcup/canadamexicousa2026/teams'),
  ('USA-01','USA',1,'USA official checklist slot 1','Official qualified team','https://www.fifa.com/en/tournaments/mens/worldcup/canadamexicousa2026/teams'),
  ('ARG-01','Argentina',1,'Argentina official checklist slot 1','Official qualified team','https://www.fifa.com/en/tournaments/mens/worldcup/canadamexicousa2026/teams'),
  ('BRA-01','Brazil',1,'Brazil official checklist slot 1','Official qualified team','https://www.fifa.com/en/tournaments/mens/worldcup/canadamexicousa2026/teams'),
  ('FRA-01','France',1,'France official checklist slot 1','Official qualified team','https://www.fifa.com/en/tournaments/mens/worldcup/canadamexicousa2026/teams'),
  ('ESP-01','Spain',1,'Spain official checklist slot 1','Official qualified team','https://www.fifa.com/en/tournaments/mens/worldcup/canadamexicousa2026/teams'),
  ('ENG-01','England',1,'England official checklist slot 1','Official qualified team','https://www.fifa.com/en/tournaments/mens/worldcup/canadamexicousa2026/teams')
on conflict (code) do nothing;
