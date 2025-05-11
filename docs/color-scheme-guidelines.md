# Color Scheme Guidelines

## Education Groups

We have 7 distinct education groups that need unique, consistent colors across all visualizations:

1. Less than High School
2. High School Diploma
3. Some College
4. Associate's Degree
5. Bachelor's Degree
6. Master's Degree
7. Professional/Doctorate Degree

## Data Characteristics

- Average fertility rates by education group:
  - Less than High School: ~41 births per 1,000 women
  - High School Diploma: ~59 births per 1,000 women
  - Some College: ~51 births per 1,000 women
  - Associate's Degree: ~54 births per 1,000 women
  - Bachelor's Degree: ~58 births per 1,000 women
  - Master's Degree: ~63 births per 1,000 women
  - Professional/Doctorate Degree: ~68 births per 1,000 women

## Color Scheme Requirements

1. **Education Group Colors**
   - Create a coherent palette for the 7 education levels
   - Consider a sequential or diverging color scheme that visually represents educational progression
   - Ensure colors are distinguishable from each other in all visualization contexts
   - Consider color-blindness accessibility

2. **Geographic Visualization Colors**
   - Separate gradient color scheme for choropleth maps showing state-level data
   - Range should accommodate outliers (e.g., Utah's 82.5 vs. DC's 18.82 for Bachelor's degrees)
   - Use color intensity to effectively show data variation

3. **Chart Element Colors**
   - Complementary colors for UI elements, backgrounds, and accents
   - Consistent highlight color for interactive elements
   - Muted background colors that don't compete with data visualizations

4. **Accessibility Considerations**
   - All color combinations must meet WCAG 2.1 AA contrast standards
   - Colors should remain distinguishable when printed in grayscale
   - Include alternative visual cues (patterns, shapes) for accessibility

5. **Temporal Highlighting**
   - Consider special color treatments for highlighting specific time periods:
     - 2008 recession
     - 2020-2021 pandemic
   - Ensure these highlights don't disrupt the primary color scheme

## Technical Specifications

- Fertility rates typically range from ~2 to ~150 births per 1,000 women
- 51 distinct geographic entities for choropleth maps (50 states + DC)
- Colors should work consistently across multiple visualization types:
  - Bar charts
  - Line charts
  - Choropleth maps
  - Comparison charts 