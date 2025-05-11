"use client";

import React from 'react';
import { Box, Typography, Paper } from '@mui/material';
import { ScrollProvider } from '@/contexts/ScrollContext';
import NarrativeNavigation from './NarrativeNavigation';
import MobileNavigation from './MobileNavigation';
import NarrativeSection from '../common/NarrativeSection';
import { FertilityBarChart, FertilityLineChart, FertilityMapChart, FertilityMilestonesChart, FertilityPandemicChart } from '@/components/charts';

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
    id: 'conclusion',
    title: 'Conclusion',
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
          visualization={<FertilityMilestonesChart showTitle={false} embedded={true} />}
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
          visualization={<FertilityPandemicChart showTitle={false} embedded={true} />}
        >
          <Box>
            <p>The COVID-19 pandemic created an unprecedented global crisis that affected fertility decisions across all demographic groups. How did education level influence resilience during this period?</p>
            
            <p>Women with higher education levels showed more stable fertility rates during the pandemic, suggesting that education may provide some buffer against crisis-induced uncertainty.</p>
            
            <p>Interestingly, some education groups saw increased fertility rates during the pandemic, contrary to the expected decline during economic uncertainty.</p>
            
            <p>Recovery patterns after the initial pandemic shock differ by education level, revealing varied approaches to family planning in response to crisis.</p>
          </Box>
        </NarrativeSection>
        
        {/* Section 6: Conclusion */}
        <NarrativeSection
          id="conclusion"
          title="Answering Our Essential Question"
          backgroundColor="rgb(250, 250, 253)"
          visualization={
            <Paper elevation={0} sx={{ 
              height: '100%', 
              display: 'flex', 
              flexDirection: 'column', 
              justifyContent: 'center',
              padding: 3,
              backgroundColor: 'inherit' 
            }}>
              <Typography variant="h5" gutterBottom sx={{ fontFamily: "'Source Serif Pro', serif" }}>
                How does a mother's education level influence her recent fertility?
              </Typography>
              <Box sx={{ 
                display: 'flex', 
                flexDirection: 'column', 
                gap: 2, 
                mt: 3,
                fontFamily: "'Inter', sans-serif" 
              }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Box sx={{ 
                    width: 16, 
                    height: 16, 
                    borderRadius: '50%', 
                    backgroundColor: '#311B92' 
                  }} />
                  <Typography>
                    Professional/Doctorate degrees show highest fertility (64.76 births per 1,000 women)
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Box sx={{ 
                    width: 16, 
                    height: 16, 
                    borderRadius: '50%', 
                    backgroundColor: '#B0BEC5' 
                  }} />
                  <Typography>
                    Less than High School shows lowest fertility (31.91 births per 1,000 women)
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Box sx={{ 
                    width: 16, 
                    height: 16, 
                    borderRadius: '50%', 
                    backgroundColor: '#42A5F5' 
                  }} />
                  <Typography>
                    16 years of data show consistent non-linear patterns
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Box sx={{ 
                    width: 16, 
                    height: 16, 
                    borderRadius: '50%', 
                    backgroundColor: '#00695C' 
                  }} />
                  <Typography>
                    Geographic variations show up to 63.68 point difference within education groups
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Box sx={{ 
                    width: 16, 
                    height: 16, 
                    borderRadius: '50%', 
                    backgroundColor: '#5E35B1' 
                  }} />
                  <Typography>
                    Higher education provided resilience during economic crises
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Box sx={{ 
                    width: 16, 
                    height: 16, 
                    borderRadius: '50%', 
                    backgroundColor: '#78909C' 
                  }} />
                  <Typography>
                    "Less than High School" group saw 42% decline from 2008 (55.08) to 2023 (31.91)
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Box sx={{ 
                    width: 16, 
                    height: 16, 
                    borderRadius: '50%', 
                    backgroundColor: '#2962FF' 
                  }} />
                  <Typography>
                    Utah has highest state fertility for Bachelor's degree holders (82.5 vs. DC's 18.82)
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Box sx={{ 
                    width: 16, 
                    height: 16, 
                    borderRadius: '50%', 
                    backgroundColor: '#64B5F6' 
                  }} />
                  <Typography>
                    Bachelor's-to-Master's transition shows largest positive fertility change (+8.4%)
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Box sx={{ 
                    width: 16, 
                    height: 16, 
                    borderRadius: '50%', 
                    backgroundColor: '#311B92' 
                  }} />
                  <Typography>
                    Pandemic impact: Professional/Doctorate group showed 5.2% increase in 2021 vs. 2019
                  </Typography>
                </Box>
              </Box>
            </Paper>
          }
          reversed={true}
        >
          <Box>
            <p>Our exploration of ACS PUMS data from 2008-2023 has revealed clear answers to our essential question: <strong>How does a mother's education level influence her recent fertility?</strong></p>
            
            <p>The relationship is strikingly non-linear. Our data conclusively shows that in 2023, women with Professional/Doctorate degrees had the highest fertility rates (64.76 births per 1,000 women), while those with less than a high school education had the lowest (31.91 births per 1,000 women).</p>
            
            <p>This challenges conventional assumptions that higher education necessarily leads to lower fertility. Instead, we've uncovered a more nuanced relationship where educational attainment provides economic stability and career flexibility that can actually support family formation at the highest levels.</p>
            
            <p>The historical data reveals resilience among the highly educated. From 2008 to 2023, women with less education experienced dramatic fertility declines (a 42% drop for those with less than high school), while women with advanced degrees maintained relatively stable rates even through economic downturns and the pandemic.</p>
            
            <p>Geographic analysis shows that while this pattern holds nationwide, significant regional variations exist, with Utah consistently showing higher fertility rates across all education levels compared to places like DC and Vermont. These regional differences suggest that cultural and policy environments interact with educational attainment to shape fertility decisions.</p>
            
            <p>The milestone analysis confirms that the bachelor's-to-master's transition represents a critical inflection point in the education-fertility relationship, where we see the largest positive change in fertility rates.</p>
            
            <p>Our conclusion: education's influence on fertility is complex and evolving. Rather than a simple inverse relationship, we find that the highest levels of education are associated with both career advancement and higher fertility, suggesting that educational policies that support work-family balance may help address demographic challenges in the modern economy.</p>
          </Box>
        </NarrativeSection>
      </Box>
    </ScrollProvider>
  );
};

export default NarrativeFlow; 