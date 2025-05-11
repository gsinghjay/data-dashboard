# Layout Principles

## Narrative Structure

Our dashboard follows a sequential storytelling approach with six main sections:

1. Introduction: The Education-Fertility Relationship
2. Historical Trends: Evolution Over Time
3. Geographic Patterns: State-by-State Variations
4. Educational Milestones: The Impact of Degree Completion
5. Pandemic Effects: Education's Role During Crisis
6. Interactive Exploration: Your Own Discoveries

## Layout Requirements

1. **Scrollytelling Framework**
   - Progressive revelation of content as user scrolls
   - Fixed position for some visualizations while narrative text scrolls alongside
   - Smooth transitions between sections
   - Clear visual cues for section boundaries

2. **Section Components**
   - Each section should include:
     - Heading and introductory text
     - Primary visualization
     - Key insights highlighted
     - Interactive controls specific to that section
   - Consistent positioning of these elements across sections

3. **Responsive Design**
   - Adapt gracefully from desktop to tablet to mobile
   - Stack elements vertically on narrow screens
   - Simplify complex visualizations on mobile
   - Touch-friendly interactive elements (minimum 44×44px tap targets)

4. **Information Hierarchy**
   - Clear visual hierarchy within each section
   - Prioritize the essential question and key insights
   - Balance between narrative text and data visualization
   - Progressive disclosure of detail (overview → details on demand)

5. **Navigation Elements**
   - Persistent navigation showing all sections
   - Progress indicator showing current position
   - "Skip to section" shortcuts
   - Smooth scrolling to sections when navigation is used

## Spatial Arrangement

1. **Desktop Layout**
   - Split screen with text on one side, visualization on the other
   - Approximately 40% text / 60% visualization
   - Fixed-position navigation elements
   - Full-width for map visualizations

2. **Tablet Layout**
   - Text above visualization for most sections
   - Reduced visualization size while maintaining readability
   - Collapsible navigation elements
   - Simplified interactive controls

3. **Mobile Layout**
   - Stacked vertical arrangement
   - Simplified visualizations
   - Swipe-friendly interactions
   - Expandable/collapsible text sections

## Interactive Element Placement

1. **Controls Positioning**
   - Place interactive controls directly below or beside the affected visualization
   - Group related controls together
   - Provide clear visual feedback for selected states
   - Maintain consistent positioning of similar controls across sections

2. **Tooltips and Information Overlays**
   - Tooltips should appear near the data point without obscuring other data
   - Information panels should slide in from the edge rather than overlay content
   - Ensure touch targets are sufficiently large for mobile users
   - Provide clear ways to dismiss overlays

## White Space and Density

1. **Content Density**
   - Maintain adequate white space between elements
   - Group related information
   - Avoid overcrowding visualizations
   - Balance information density with readability

2. **Section Transitions**
   - Clear visual breaks between sections
   - Consider subtle background color shifts or dividers
   - Maintain consistent spacing between sections
   - Provide visual cues for navigation

## Technical Considerations

- Must accommodate 7 distinct education groups in legends
- Need to show 51 geographic entities in map visualizations
- Time series span 18 years (2006-2023)
- Data ranges from approximately 2 to 150 births per 1,000 women 