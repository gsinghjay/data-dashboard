'use client';

import { useEffect, useState } from 'react';
import { Button, Container, Typography, Box, Paper, CircularProgress } from '@mui/material';
import { fetchEducationGroups, fetchStates, fetchSummaryStats } from '@/utils/api';

export default function ApiTestPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [educationGroups, setEducationGroups] = useState([]);
  const [states, setStates] = useState([]);
  const [summaryStats, setSummaryStats] = useState<any>(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const [educationData, statesData, summaryData] = await Promise.all([
        fetchEducationGroups(),
        fetchStates(),
        fetchSummaryStats()
      ]);
      
      setEducationGroups(educationData);
      setStates(statesData);
      setSummaryStats(summaryData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          API Test Page
        </Typography>
        
        <Button 
          variant="contained" 
          color="primary" 
          onClick={fetchData}
          disabled={loading}
          sx={{ mb: 4 }}
        >
          {loading ? 'Loading...' : 'Test API Endpoints'}
        </Button>
        
        {loading && (
          <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
            <CircularProgress />
          </Box>
        )}
        
        {error && (
          <Paper sx={{ p: 3, mb: 3, bgcolor: '#ffebee' }}>
            <Typography color="error">Error: {error}</Typography>
          </Paper>
        )}
        
        {summaryStats && (
          <Paper sx={{ p: 3, mb: 3 }}>
            <Typography variant="h6" gutterBottom>Summary Statistics</Typography>
            <Typography>
              Year Range: {summaryStats.yearRange?.minYear} - {summaryStats.yearRange?.maxYear}
            </Typography>
            <Typography>
              Total Records: {summaryStats.totalRecords?.count}
            </Typography>
            <Typography>
              Education Groups: {summaryStats.educationGroupCount?.count}
            </Typography>
            <Typography>
              States: {summaryStats.stateCount?.count}
            </Typography>
          </Paper>
        )}
        
        {educationGroups.length > 0 && (
          <Paper sx={{ p: 3, mb: 3 }}>
            <Typography variant="h6" gutterBottom>Education Groups ({educationGroups.length})</Typography>
            <Box component="ul">
              {educationGroups.map((group: any) => (
                <li key={group.id}>
                  {group.name} (SCHL codes: {group.schl_codes})
                </li>
              ))}
            </Box>
          </Paper>
        )}
        
        {states.length > 0 && (
          <Paper sx={{ p: 3, mb: 3 }}>
            <Typography variant="h6" gutterBottom>States ({states.length})</Typography>
            <Box component="ul" sx={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))',
              gap: 1
            }}>
              {states.map((state: any) => (
                <li key={state.code}>
                  {state.name} ({state.code})
                </li>
              ))}
            </Box>
          </Paper>
        )}
      </Box>
    </Container>
  );
} 