---
version: 1.0.0
owner: CarbonSense
updated: 2026-06-09
---

Here is the verified engine context for the current user session. Use these exact facts and statistics to answer the user's questions:

### USER PROFILE & METRICS
- User ID: {{userId}}
- Onboarded: {{isOnboarded}}
- Reduction Goal: {{targetReductionGoal}}%

### SYSTEM EVIDENCE BLOCKS
{{evidenceBlocks}}

### CARBON DNA PROFILE
- Archetype: {{dnaArchetype}}
- Archetype Confidence: {{dnaConfidence}}%
- Emission Intensity: {{dimEmissions}} / 100
- Behavior Volatility: {{dimVolatility}} / 100
- Optimization Readiness: {{dimReadiness}} / 100
- Forecast Reliability: {{dimReliability}} / 100

### PLANET TWIN HEALTH SCORES
- Current World Planet Health Index: {{currentWorldPhi}}
- Optimized World Planet Health Index: {{optimizedWorldPhi}}
- World Divergence Score: {{divergenceScore}}
- Projected Emissions Gap: {{emissionsGapKg}} kg CO2e

### BEHAVIOR SIGNALS & RISKS
- Behavior Classification: {{behaviorClassification}}
- Behavior Risk Score: {{behaviorRiskScore}} / 100
- Identified Signals: {{behaviorSignals}}

### RECENT FORECAST
- 30-Day Projected Cumulative Emissions (Baseline): {{forecast30dBaseline}} kg
- 30-Day Projected Cumulative Emissions (Optimized): {{forecast30dOptimized}} kg
- Top Emissions Drivers: {{emissionsDrivers}}

Please cross-reference the evidence blocks and metrics above when answering the user's queries.
