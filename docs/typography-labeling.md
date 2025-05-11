# Typography and Labeling Guidelines

## Typographic Hierarchy

1. **Section Titles**
   - Largest font size
   - Bold weight
   - High contrast with background
   - Consistent positioning at the beginning of each section

2. **Subtitles / Key Insights**
   - Secondary font size
   - Medium weight
   - Highlight important concepts or findings
   - Used for introducing subsections or key points

3. **Body Text**
   - Comfortable reading size (16px minimum)
   - Regular weight
   - High readability for narrative content
   - Sufficient line height (1.5x) for readability

4. **Data Labels**
   - Compact but legible size
   - Medium weight for emphasis
   - Consistent positioning relative to data points
   - Abbreviated where necessary for space constraints

5. **Annotations**
   - Smaller size than body text
   - Italic or distinct style to differentiate from main content
   - Used for supplementary information or explanations
   - Positioned to minimize interference with data visualization

## Font Selection

1. **Recommended Characteristics**
   - Sans-serif font for clean presentation and screen readability
   - Font family with multiple weights (light, regular, medium, bold)
   - Good legibility at small sizes for data labels
   - Support for tabular numbers for data alignment

2. **Font Pairing**
   - Consider using distinct fonts for:
     - Headings/titles (more distinctive)
     - Body text (optimized for readability)
     - Data labels (compact but clear)
   - Limit to 2-3 font families maximum

## Labeling Conventions

1. **Chart Titles and Axes**
   - Clear, descriptive chart titles
   - Concise axis labels with units
   - Consistent capitalization style
   - Proper scaling notation (e.g., "Births per 1,000 women")

2. **Education Group Labels**
   - Consistent terminology across all visualizations:
     1. Less than High School
     2. High School Diploma
     3. Some College
     4. Associate's Degree
     5. Bachelor's Degree
     6. Master's Degree
     7. Professional/Doctorate Degree
   - Abbreviated versions for space constraints:
     1. < High School
     2. HS Diploma
     3. Some College
     4. Associate's
     5. Bachelor's
     6. Master's
     7. Prof/Doctorate

3. **Geographic Labels**
   - State names: Full names in tooltips, standard postal abbreviations on map
   - Region groupings: Clear labels for any regional aggregations
   - Consistent handling of special cases (e.g., "District of Columbia" vs "DC")

4. **Time Period Labeling**
   - Consistent year format (YYYY)
   - Clear indication of special periods (recession, pandemic)
   - Appropriate tick mark density on time series (avoid overcrowding)

5. **Data Value Formats**
   - Fertility rates: One decimal place (e.g., 42.3)
   - Population counts: Comma-separated thousands, abbreviate large numbers (e.g., 14.2M)
   - Percentages: One decimal place for precision (e.g., 5.2%)
   - Consistent use of units across all visualizations

## Interactive Text Elements

1. **Tooltips**
   - Concise and informative content
   - Consistent structure across all visualizations
   - Clear hierarchy of information
   - Include exact values and relevant context

2. **Filter Controls**
   - Clear labels for all interactive controls
   - Indication of current selection state
   - Consistent terminology with visualization labels
   - Helpful instructions for complex interactions

3. **Legend Design**
   - Clear association between legend items and visual elements
   - Compact design that doesn't dominate visualization space
   - Interactive legends that allow toggling data series
   - Consistent positioning across visualizations

## Accessibility Considerations

1. **Text Contrast**
   - Minimum 4.5:1 contrast ratio for all text (WCAG AA)
   - Higher contrast (7:1) for smaller text
   - Avoid placing text on visually busy backgrounds

2. **Screen Reader Support**
   - Appropriate heading structure for screen readers
   - Alt text for all visualization images
   - ARIA labels for interactive elements
   - Meaningful reading order for narrative flow

3. **Text Sizing**
   - Support for browser text resizing
   - Responsive text that scales appropriately on different devices
   - Minimum touch targets of 44×44px for interactive elements
   - Adequate spacing between clickable elements

## Technical Data Terminology

- "Fertility rate" consistently defined as "births per 1,000 women aged 15-50"
- Clear distinction between absolute counts and rates
- Consistent handling of null or zero values
- Appropriate indication of data uncertainty where applicable 