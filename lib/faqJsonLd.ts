export function generateCountyFaqJsonLd(countyName: string) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": `Who qualifies for redundancy payment in ${countyName}?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Employees with at least 2 years of continuous service are entitled to statutory redundancy payment under the Redundancy Payments Acts 1967–2014. This applies to all employees in Ireland, including those working in " + countyName + "."
        }
      },
      {
        "@type": "Question",
        "name": "How is statutory redundancy calculated in Ireland?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Eligible employees receive 2 weeks' pay for each year of service plus 1 extra week's pay, based on a maximum weekly wage of €600. The calculation is the same across all Irish counties including " + countyName + "."
        }
      },
      {
        "@type": "Question",
        "name": `Is redundancy payment taxable in ${countyName}?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Statutory redundancy payments are generally exempt from income tax up to certain limits. The first €10,160 of redundancy payment is tax-free, regardless of which county you work in, including " + countyName + "."
        }
      },
      {
        "@type": "Question",
        "name": "What is the maximum weekly wage used for the calculation?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "The maximum weekly wage recognised for statutory redundancy in Ireland is €600 per week. This cap applies uniformly across all counties, including " + countyName + "."
        }
      },
      {
        "@type": "Question",
        "name": `When is redundancy payment due in ${countyName}?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Redundancy payment is usually due on the termination date or as soon as possible afterwards. This timeline applies to all employees in Ireland, including those in " + countyName + "."
        }
      },
      {
        "@type": "Question",
        "name": `What if my employer in ${countyName} doesn't pay redundancy?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "If your employer refuses to pay statutory redundancy, you can make a claim to the Workplace Relations Commission (WRC). You have 6 months from the date of dismissal to make a claim, regardless of which county you work in."
        }
      },
      {
        "@type": "Question",
        "name": `Can I negotiate a higher redundancy package in ${countyName}?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, you can negotiate with your employer for a higher redundancy package than the statutory minimum. Many employers offer enhanced redundancy packages, especially for long-serving employees, regardless of location."
        }
      }
    ]
  };
}
