import { redundancyRulesIE } from "./redundancyRules";

export function calcRedundancyIreland({ yearsOfService, weeklyWage }: {
  yearsOfService: number;
  weeklyWage: number;
}) {
  const { minYears, weeklyWageCap, weeksPerYear, extraWeek } = redundancyRulesIE;

  if (yearsOfService < minYears) {
    return { 
      eligible: false, 
      total: 0, 
      message: "Employee not eligible for statutory redundancy payment." 
    };
  }

  const cappedWage = Math.min(weeklyWage, weeklyWageCap);
  const total = (yearsOfService * weeksPerYear * cappedWage) + (extraWeek * cappedWage);

  return {
    eligible: true,
    total,
    cappedWage,
    message: `Based on ${yearsOfService} years of service and a weekly wage of €${cappedWage}, the statutory redundancy payment is approximately €${total.toLocaleString()}.`
  };
}
