interface MonthlyPushupRecord {
    year: number;
    month: number;
    pushup_count: number;
    contestant_name: string;
  }
  
  interface AggregatedData {
    name: string; // Name of the month
    total: number;
    dani: number;
    donat: number;
    kristof: number;
  }
  
  interface IntermediateAggregation {
    [key: string]: {
      name: string;
      total: number;
      scores: {
        [contestant: string]: number; // Only numbers for contestant scores
      };
    };
  }
  
 export function aggregateMonthlyData(
    dataDani: MonthlyPushupRecord[],
    dataDonat: MonthlyPushupRecord[],
    dataKristof: MonthlyPushupRecord[]
  ): AggregatedData[] {
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "Maj", "Jun", "Jul", "Aug", "Szept", "Okt", "Nov", "Dec"];
  
    const groupedByMonth: IntermediateAggregation = {};
  
    const allData = [...dataDani, ...dataDonat, ...dataKristof];
  
    allData.forEach(item => {
      const monthKey = `${item.year}-${item.month}`;
      const contestantKey = item.contestant_name.toLowerCase();
  
      if (!groupedByMonth[monthKey]) {
        groupedByMonth[monthKey] = { name: monthNames[item.month - 1], total: 0, scores: {} };
      }
  
      // Initialize contestant score if it doesn't exist
      if (groupedByMonth[monthKey].scores[contestantKey] === undefined) {
        groupedByMonth[monthKey].scores[contestantKey] = 0;
      }
  
      groupedByMonth[monthKey].scores[contestantKey] += item.pushup_count;
      groupedByMonth[monthKey].total += item.pushup_count;
    });
  
    // Convert to array of AggregatedData
    const aggregatedData: AggregatedData[] = Object.values(groupedByMonth).map(monthData => ({
      name: monthData.name,
      total: monthData.total,
      dani: monthData.scores.dani || 0, // Default to 0 if not present
      donat: monthData.scores.donat || 0,
      kristof: monthData.scores.kristof || 0,
    }));
  
    return aggregatedData;
  }
  