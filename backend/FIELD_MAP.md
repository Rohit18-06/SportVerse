# Highlightly API Match Response - Field Mapping

## Test Data Source
- Match ID: 53911272
- Teams: Sweden vs Portugal
- Format: T20
- Status: Finished
- Real API response: 30,515 bytes, fully populated with match statistics

---

## ROOT LEVEL FIELDS

| Field | Type | UI Element | Confidence | Notes |
|-------|------|-----------|------------|-------|
| `id` | string | Match ID | ✅ Always | Unique match identifier |
| `startDate` | ISO string | Match date display | ✅ Always | e.g., "2026-07-01T00:00:00.000Z" |
| `startTime` | ISO string | Match time | ✅ Always | Full datetime with timezone |
| `format` | string | Format badge | ✅ Always | "T20", "ODI", "Test" etc. |
| `state.description` | string | Match status | ✅ Always | "Finished", "Live", "Scheduled", etc. |
| `state.report` | string | Match result summary | ⚠️ Sometimes | e.g., "Portugal won by 7 wickets (with 14 balls remaining)" |
| `homeTeam.{id, name, abbreviation, logo}` | object | Home team info | ✅ Always | Complete team data available |
| `awayTeam.{id, name, abbreviation, logo}` | object | Away team info | ✅ Always | Complete team data available |
| `league.{id, name, season}` | object | Tournament info | ✅ Always | League/series information |
| `country` | object | Country info | ✅ Always | name, code, logo |
| `dayType` | string | - | ⚠️ Sometimes | "SINGLE", "MULTI" - not needed for UI |
| `venue` | object | Venue details | ❌ NEVER | All null in response |
| `forecast` | object | Weather | ❌ NEVER | All null in response |
| `predictions` | object | Win probability | ❌ NEVER | All null in response |

---

## MATCH STATE - CURRENT SCORES

```
state: {
  teams: {
    home: { score: "143/9", info: null },
    away: { score: "144/3", info: "17.4/20 ov, T:144" }
  },
  description: "Finished",
  report: "Portugal won by 7 wickets (with 14 balls remaining)"
}
```

| Field | UI Element | Confidence | Notes |
|-------|-----------|------------|-------|
| `state.teams.home.score` | Home team live score | ✅ Always | Format: "RUNS/WICKETS" |
| `state.teams.home.info` | Home batting status | ⚠️ Sometimes | null when not batting, e.g., "20 ov, T:206" when finished |
| `state.teams.away.score` | Away team live score | ✅ Always | Format: "RUNS/WICKETS" |
| `state.teams.away.info` | Away batting status | ✅ Always | e.g., "17.4/20 ov, T:144" - overs and target |

---

## INNINGS STATISTICS ARRAY

The `statistics` array contains **detailed innings data**. Each inning is a separate object with full scoring breakdown.

### Example Innings Structure:
```
statistics[0] = {
  inningNumber: 1,
  team: { id, name, abbreviation, logo },
  inningBatsmen: [...],        // Full batting lineup
  inningBowlers: [...],         // Full bowling lineup
  fallOfWickets: [...],         // Wickets breakdown
  inningPartnerships: [...],    // Partnership data
  fieldingSummary: {...}        // Fielding stats
}
```

### BATTING SCORECARD
**Located in:** `statistics[0].inningBatsmen[n]`

| Field | Example | UI Element | Confidence |
|-------|---------|-----------|------------|
| `player.name` | "Ajay Mundra" | Batsman name | ✅ Always |
| `runs` | 9 | Runs scored | ✅ Always |
| `balls` | 5 | Balls faced | ✅ Always |
| `fours` | 1 | Fours hit | ✅ Always |
| `sixes` | 0 | Sixes hit | ✅ Always |
| `battingStrikeRate` | 180 | Strike rate % | ✅ Always |
| `dismissalStatus` | "caught" | Dismissal method | ✅ Always |
| `dismissalFielders[].name` | "Upen Shantu" | Fielder/catcher | ✅ Always |

**Dismissal Status Values:**
- "caught", "lbw", "bowled", "run out", "not out", "stumped", etc.

### BOWLING SCORECARD
**Located in:** `statistics[0].inningBowlers[n]`

| Field | Example | UI Element | Confidence |
|-------|---------|-----------|------------|
| `player.name` | "Upen Shantu" | Bowler name | ✅ Always |
| `overs` | 4 | Overs bowled | ✅ Always |
| `wickets` | 1 | Wickets taken | ✅ Always |
| `concededRuns` | 39 | Runs conceded | ✅ Always |
| `economy` | 9.75 | Economy rate | ✅ Always |
| `maidens` | 0 | Maiden overs | ✅ Always |

### FALL OF WICKETS
**Located in:** `statistics[0].fallOfWickets[n]`

| Field | Example | UI Element | Confidence |
|-------|---------|-----------|------------|
| `order` | 0 | Wicket number | ✅ Always |
| `runs` | 15 | Score when out | ✅ Always |
| `overs` | 1.3 | Over when dismissed | ✅ Always |
| `dismissalBatsman.name` | "Ajay Mundra" | Player name | ✅ Always |

**UI Display:** "1st wkt: 15 runs (1.3 overs) - Ajay Mundra"

### PARTNERSHIPS
**Located in:** `statistics[0].inningPartnerships[n]`

| Field | Example | UI Element | Confidence |
|-------|---------|-----------|------------|
| `runs` | 15 | Partnership runs | ✅ Always |
| `balls` | 9 | Balls faced | ✅ Always |
| `overs` | 1.3 | Duration | ✅ Always |
| `firstPlayer.name` | "Ajay Mundra" | First player | ✅ Always |
| `secondPlayer.name` | "Darshan Lakhani" | Second player | ✅ Always |

### EXTRAS
**Located in:** `statistics[0].team`

| Field | Example | UI Element | Confidence |
|-------|---------|-----------|------------|
| `team.byes` | 5 | Byes | ✅ Always |
| `team.legByes` | 4 | Leg byes | ✅ Always |
| `team.wides` | 4 | Wides | ✅ Always |
| `team.noBalls` | 1 | No balls | ✅ Always |
| `team.extras` | 14 | Total extras | ✅ Always |

---

## SQUADS

**Located in:** `squad[n]`

Each team has a squad object with:

| Field | Example | Confidence |
|-------|---------|------------|
| `squad[n].team.{id, name, abbreviation, logo}` | Team info | ✅ Always |
| `squad[n].players[].name` | "Ajay Mundra" | ✅ Always |
| `squad[n].players[].battingStyles[]` | ["right-hand bat"] | ✅ Always |
| `squad[n].players[].bowlingStyles[]` | ["right-arm medium"] | ✅ Always |

---

## BEST BATSMEN & BOWLERS

**Located in:** `bestBatsmen[n]` and `bestBowlers[n]`

These arrays show series performance stats (not just this match):

### Best Batsman Stats
```
statistics: {
  runs: 261,
  average: 52.2,
  innings: 8,
  matches: 10,
  battingStrikeRate: 126.69
}
```

### Best Bowler Stats
```
statistics: {
  balls: 232,
  average: 13.25,
  economy: 6.85,
  innings: 10,
  matches: 10,
  wickets: 20,
  concededRuns: 265
}
```

---

## MISSING / NOT AVAILABLE

| Expected Field | Status | Alternative | Notes |
|----------------|--------|-------------|-------|
| **Toss Information** | ❌ NOT AVAILABLE | Show: "Toss info not available" | API doesn't provide toss details |
| **Commentary Timeline** | ❌ NOT AVAILABLE | Show: "Ball-by-ball commentary not available" | No commentary endpoint in Highlightly API |
| **Current Run Rate** | ⚠️ DERIVABLE | Calculate from score/overs | Must be calculated from available data |
| **Required Run Rate** | ⚠️ DERIVABLE | Calculate from target/remaining overs | Must be calculated |
| **Win Probability** | ❌ NOT AVAILABLE | Show: "Prediction not available" | Predictions field is null |
| **Venue Details** | ❌ NOT AVAILABLE | Show: "Venue not available" | All venue fields are null |
| **Last Wicket** | ✅ AVAILABLE | Use `fallOfWickets[-1]` | Can extract from fall of wickets |
| **Current Partnership** | ✅ AVAILABLE | Use `inningPartnerships[-1]` | Last partnership in array |

---

## KEY INSIGHTS FOR UI BUILDING

1. **Response is an Array:** The match detail endpoint returns a **list** `[{...}]`, not an object
   - First element is the full match data

2. **Two Innings Per Match:** `statistics[]` array has 2 items (home, away innings)
   - Access by `statistics[0]` (first innings) and `statistics[1]` (second innings)

3. **Complete Scorecard Data:** All batting/bowling/partnerships data is provided
   - No need for secondary API calls
   - All field-by-field scoring available

4. **Match Result:** Available in `state.report`
   - Example: "Portugal won by 7 wickets (with 14 balls remaining)"

5. **Current Status:** Check `state.teams[home/away].info` for live match overs
   - Format: "17.4/20 ov, T:144" (current overs / total overs, Target score)

6. **No Real-Time Updates:** This is a historical/completed match
   - Live matches would have different state.description value
   - But structure would be identical

---

## COMPONENT MAPPING

| Component | Data Source | Status |
|-----------|-------------|--------|
| **Match Header** | Root level (format, teams, league, state) | ✅ Build now |
| **Live Score Board** | `state.teams[home/away].{score, info}` | ✅ Build now |
| **Batting Scorecard** | `statistics[inning].inningBatsmen` | ✅ Build now |
| **Bowling Scorecard** | `statistics[inning].inningBowlers` | ✅ Build now |
| **Fall of Wickets** | `statistics[inning].fallOfWickets` | ✅ Build now |
| **Partnerships** | `statistics[inning].inningPartnerships` | ✅ Build now |
| **Extras** | `statistics[inning].team.[byes/legByes/wides/noBalls]` | ✅ Build now |
| **Match Squads** | `squad[]` | ✅ Build now |
| **Best Performers** | `bestBatsmen[]`, `bestBowlers[]` | ✅ Build now |
| **Toss Section** | ❌ NOT AVAILABLE | ❌ Skip, show empty state |
| **Commentary** | ❌ NOT AVAILABLE | ❌ Skip, show empty state |
| **Win Probability** | ❌ NOT AVAILABLE | ❌ Skip, show empty state |

---

## SUMMARY FOR DEVELOPMENT

✅ **WE HAVE:** Full scorecard, all player statistics, partnerships, wickets, bowling analysis
❌ **WE DON'T HAVE:** Toss, commentary, predictions, real venue details
⚠️ **WE CAN DERIVE:** Current run rate, required run rate (from existing data)

**Recommendation:** Build UI components for what exists. For missing data, show explicit "Not available" states rather than placeholders.
