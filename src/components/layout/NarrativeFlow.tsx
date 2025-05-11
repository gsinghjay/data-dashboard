"use client";

import React from 'react';
import { Box } from '@mui/material';
import { ScrollProvider } from '@/contexts/ScrollContext';
import NarrativeNavigation from './NarrativeNavigation';
import MobileNavigation from './MobileNavigation';
import NarrativeSection from '../common/NarrativeSection';
import FertilityBarChart from '@/components/charts/FertilityBarChart';
import FertilityLineChart from '@/components/charts/FertilityLineChart';
import FertilityMapChart from '@/components/charts/FertilityMapChart';

// Define the sections for our narrative
const SECTIONS = [
  {
    id: 'introduction',
    title: 'Introduction',
  },
  {
    id: 'historical-trends',
    title: 'Historical Trends',
  },
  {
    id: 'geographic-patterns',
    title: 'Geographic Patterns',
  },
  {
    id: 'educational-milestones',
    title: 'Educational Milestones',
  },
  {
    id: 'pandemic-effects',
    title: 'Pandemic Effects',
  },
  {
    id: 'interactive-exploration',
    title: 'Interactive Exploration',
  },
];

const NarrativeFlow: React.FC = () => {
  return (
    <ScrollProvider>
      <Box sx={{ position: 'relative' }}>
        <NarrativeNavigation sections={SECTIONS} />
        <MobileNavigation sections={SECTIONS} />
        
        {/* Section 1: Introduction */}
        <NarrativeSection
          id="introduction"
          title="The Education-Fertility Relationship"
          visualization={<FertilityBarChart showTitle={false} embedded={true} />}
        >
          <Box>
            <p>The relationship between education and fertility is complex and has evolved over time. Our dashboard explores how a mother's education level influences her recent fertility.</p>
            
            <p>The data reveals that professional and doctorate degree holders have surprisingly high fertility rates (64.76 births per 1,000 women), while those with less than a high school education have the lowest rates (31.91 per 1,000).</p>
            
            <p>This non-linear pattern challenges conventional expectations and reveals nuances in how education shapes family formation decisions.</p>
          </Box>
        </NarrativeSection>
        
        {/* Section 2: Historical Trends */}
        <NarrativeSection
          id="historical-trends"
          title="Evolution Over Time"
          visualization={<FertilityLineChart showTitle={false} embedded={true} />}
          backgroundColor="rgb(250, 250, 253)"
          reversed={true}
        >
          <Box>
            <p>How has the relationship between education and fertility evolved over the years? The data from 2008-2023 tells a fascinating story of change and resilience.</p>
            
            <p>Women with less than a high school education have seen the most dramatic decline in fertility rates, dropping from 55.08 in 2008 to 31.91 in 2023.</p>
            
            <p>Meanwhile, higher education levels have maintained more stable fertility rates, with notable inflection points around major events like the 2008 recession and the 2020 pandemic.</p>
            
            <p>These trends reveal how education may provide a buffer against economic uncertainty when it comes to family planning decisions.</p>
          </Box>
        </NarrativeSection>
        
        {/* Section 3: Geographic Patterns */}
        <NarrativeSection
          id="geographic-patterns"
          title="State-by-State Variations"
          visualization={<FertilityMapChart showTitle={false} embedded={true} />}
        >
          <Box>
            <p>Fertility patterns vary significantly across states, revealing how geography, culture, and policy interact with education levels.</p>
            
            <p>For women with bachelor's degrees, fertility rates range from highs in Utah (82.5 births per 1,000 women) to lows in DC (18.82 per 1,000).</p>
            
            <p>These regional differences aren't uniform across education levels—states ranking high for one education group may rank differently for others.</p>
            
            <p>The map reveals regional clusters that suggest geographic influences on fertility decisions beyond individual educational attainment.</p>
          </Box>
        </NarrativeSection>
        
        {/* Section 4: Educational Milestones */}
        <NarrativeSection
          id="educational-milestones"
          title="The Impact of Degree Completion"
          backgroundColor="rgb(250, 250, 253)"
          visualization={<Box sx={{ height: '400px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <p>Educational milestone comparison visualization to be implemented</p>
          </Box>}
          reversed={true}
        >
          <Box>
            <p>What happens to fertility rates as women complete different educational milestones? The transitions between education levels reveal important insights about life choices.</p>
            
            <p>The largest differences in fertility rates appear between bachelor's and master's degrees, suggesting this particular transition has a significant impact on family planning.</p>
            
            <p>Some transitions show minimal changes in fertility rates, indicating that certain educational steps may have less influence on childbearing decisions.</p>
            
            <p>This "educational premium" on fertility varies by region and time period, revealing the complex interplay between education and family formation.</p>
          </Box>
        </NarrativeSection>
        
        {/* Section 5: Pandemic Effects */}
        <NarrativeSection
          id="pandemic-effects"
          title="Education's Role During Crisis"
          visualization={<Box sx={{ height: '400px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <p>Pandemic effects visualization to be implemented</p>
          </Box>}
        >
          <Box>
            <p>The COVID-19 pandemic created an unprecedented global crisis that affected fertility decisions across all demographic groups. How did education level influence resilience during this period?</p>
            
            <p>Women with higher education levels showed more stable fertility rates during the pandemic, suggesting that education may provide some buffer against crisis-induced uncertainty.</p>
            
            <p>Interestingly, some education groups saw increased fertility rates during the pandemic, contrary to the expected decline during economic uncertainty.</p>
            
            <p>Recovery patterns after the initial pandemic shock differ by education level, revealing varied approaches to family planning in response to crisis.</p>
          </Box>
        </NarrativeSection>
        
        {/* Section 6: Interactive Exploration */}
        <NarrativeSection
          id="interactive-exploration"
          title="Your Own Discoveries"
          backgroundColor="rgb(250, 250, 253)"
          visualization={<Box sx={{ height: '400px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <p>Interactive exploration features to be implemented</p>
          </Box>}
          reversed={true}
        >
          <Box>
            <p>Now it's your turn to explore the data and discover your own insights about the relationship between education and fertility.</p>
            
            <p>Use the interactive tools to select multiple states for comparison, choose specific education levels to display, and focus on particular time periods that interest you.</p>
            
            <p>You can toggle between different visualization types to gain new perspectives on the data, and save or share your view configurations with others.</p>
            
            <p>We've also included some preset "interesting findings" that you can quickly load to discover patterns you might have missed.</p>
          </Box>
        </NarrativeSection>
      </Box>
    </ScrollProvider>
  );
};

export default NarrativeFlow; 