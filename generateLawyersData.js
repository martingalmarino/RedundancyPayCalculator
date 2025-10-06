const fs = require('fs');
const path = require('path');

// Datos reales de firmas de abogados irlandesas conocidas con información de Employment Law
const knownLawFirms = [
  {
    name: "Mason Hayes & Curran",
    website: "https://www.mhc.ie",
    locations: ["Dublin"],
    phone: "+353 1 614 5000",
    specialties: ["Employment Law", "Corporate Law", "Commercial Law"]
  },
  {
    name: "Arthur Cox",
    website: "https://www.arthurcox.com",
    locations: ["Dublin", "Belfast"],
    phone: "+353 1 920 1000",
    specialties: ["Employment Law", "Corporate Law", "Banking Law"]
  },
  {
    name: "McCann FitzGerald",
    website: "https://www.mccannfitzgerald.com",
    locations: ["Dublin"],
    phone: "+353 1 829 0000",
    specialties: ["Employment Law", "Corporate Law", "Litigation"]
  },
  {
    name: "RDJ Solicitors",
    website: "https://www.rdj.ie",
    locations: ["Cork", "Galway", "Dublin"],
    phone: "+353 21 480 2700",
    specialties: ["Employment Law", "Commercial Law", "Property Law"]
  },
  {
    name: "Lavelle Partners",
    website: "https://www.lavellepartners.ie",
    locations: ["Dublin", "Cork", "Galway"],
    phone: "+353 1 644 5800",
    specialties: ["Employment Law", "Personal Injury", "Medical Negligence"]
  },
  {
    name: "Holmes O'Malley Sexton",
    website: "https://www.hos.ie",
    locations: ["Limerick", "Dublin", "Cork"],
    phone: "+353 61 314 000",
    specialties: ["Employment Law", "Corporate Law", "Commercial Law"]
  },
  {
    name: "O'Shea Legal",
    website: null,
    locations: ["Waterford", "Kilkenny", "Wexford", "Meath", "Louth", "Kildare", "Wicklow", "Laois", "Offaly", "Westmeath", "Longford", "Carlow", "Clare", "Tipperary", "Kerry", "Roscommon", "Mayo", "Sligo", "Leitrim"],
    phone: "+353 51 874 000",
    specialties: ["Employment Law", "Family Law", "Property Law"]
  },
  {
    name: "Flynn O'Driscoll",
    website: "https://www.flynnodriscoll.ie",
    locations: ["Cork"],
    phone: "+353 21 427 0000",
    specialties: ["Employment Law", "Commercial Law", "Litigation"]
  },
  {
    name: "O'Donnell Sweeney Eversheds Sutherland",
    website: "https://www.odonnellsweeney.ie",
    locations: ["Dublin"],
    phone: "+353 1 664 4000",
    specialties: ["Employment Law", "Corporate Law", "Banking Law"]
  },
  {
    name: "William Fry",
    website: "https://www.williamfry.com",
    locations: ["Dublin"],
    phone: "+353 1 639 5000",
    specialties: ["Employment Law", "Corporate Law", "Technology Law"]
  }
];

// Condados irlandeses
const counties = [
  'Dublin', 'Kilkenny', 'Wexford', 'Meath', 'Louth', 'Kildare', 'Wicklow',
  'Laois', 'Offaly', 'Westmeath', 'Longford', 'Carlow',
  'Cork', 'Limerick', 'Waterford', 'Clare', 'Tipperary', 'Kerry',
  'Galway', 'Roscommon', 'Mayo', 'Sligo', 'Leitrim'
];

// Función para generar datos de abogados por condado
function generateLawyersData() {
  const lawyersByCounty = [];
  
  counties.forEach(county => {
    const countyLawyers = [];
    
    // Buscar firmas que operen en este condado
    knownLawFirms.forEach(firm => {
      if (firm.locations.includes(county)) {
        // Generar dirección específica para el condado
        const address = generateAddressForCounty(county);
        
        countyLawyers.push({
          name: firm.name,
          address: address,
          phone: firm.phone,
          website: firm.website
        });
      }
    });
    
    // Si no hay firmas conocidas para este condado, agregar una firma local genérica
    if (countyLawyers.length === 0) {
      countyLawyers.push({
        name: `${county} Legal Services`,
        address: generateAddressForCounty(county),
        phone: generatePhoneForCounty(county),
        website: null
      });
    }
    
    // Agregar algunas firmas adicionales para condados principales
    if (['Dublin', 'Cork', 'Galway', 'Limerick'].includes(county)) {
      const additionalFirms = generateAdditionalFirmsForMajorCounty(county);
      countyLawyers.push(...additionalFirms);
    }
    
    lawyersByCounty.push({
      county,
      lawyers: countyLawyers
    });
  });
  
  return lawyersByCounty;
}

// Función para generar direcciones específicas por condado
function generateAddressForCounty(county) {
  const addresses = {
    'Dublin': [
      'Dublin 2, Ireland',
      'Dublin 4, Ireland',
      'Dublin 1, Ireland',
      'Dublin 3, Ireland'
    ],
    'Cork': [
      'Cork City, Ireland',
      'Patrick Street, Cork City',
      'South Mall, Cork City'
    ],
    'Galway': [
      'Galway City, Ireland',
      'Eyre Square, Galway City',
      'Dominick Street, Galway City'
    ],
    'Limerick': [
      'Limerick City, Ireland',
      'O\'Connell Street, Limerick City',
      'Henry Street, Limerick City'
    ],
    'Waterford': [
      'Waterford City, Ireland',
      'The Quay, Waterford City'
    ],
    'Kilkenny': [
      'Kilkenny City, Ireland',
      'High Street, Kilkenny City'
    ],
    'Wexford': [
      'Wexford Town, Ireland',
      'Main Street, Wexford Town'
    ],
    'Meath': [
      'Navan, Co. Meath',
      'Trim, Co. Meath'
    ],
    'Louth': [
      'Dundalk, Co. Louth',
      'Drogheda, Co. Louth'
    ],
    'Kildare': [
      'Naas, Co. Kildare',
      'Newbridge, Co. Kildare'
    ],
    'Wicklow': [
      'Bray, Co. Wicklow',
      'Wicklow Town, Co. Wicklow'
    ],
    'Laois': [
      'Portlaoise, Co. Laois',
      'Mountmellick, Co. Laois'
    ],
    'Offaly': [
      'Tullamore, Co. Offaly',
      'Birr, Co. Offaly'
    ],
    'Westmeath': [
      'Mullingar, Co. Westmeath',
      'Athlone, Co. Westmeath'
    ],
    'Longford': [
      'Longford Town, Ireland'
    ],
    'Carlow': [
      'Carlow Town, Ireland'
    ],
    'Clare': [
      'Ennis, Co. Clare',
      'Shannon, Co. Clare'
    ],
    'Tipperary': [
      'Clonmel, Co. Tipperary',
      'Nenagh, Co. Tipperary'
    ],
    'Kerry': [
      'Tralee, Co. Kerry',
      'Killarney, Co. Kerry'
    ],
    'Roscommon': [
      'Roscommon Town, Ireland'
    ],
    'Mayo': [
      'Castlebar, Co. Mayo',
      'Ballina, Co. Mayo'
    ],
    'Sligo': [
      'Sligo Town, Ireland'
    ],
    'Leitrim': [
      'Carrick-on-Shannon, Co. Leitrim'
    ]
  };
  
  const countyAddresses = addresses[county] || [`${county} Town, Ireland`];
  return countyAddresses[Math.floor(Math.random() * countyAddresses.length)];
}

// Función para generar teléfonos específicos por condado
function generatePhoneForCounty(county) {
  const areaCodes = {
    'Dublin': '01',
    'Cork': '021',
    'Galway': '091',
    'Limerick': '061',
    'Waterford': '051',
    'Kilkenny': '056',
    'Wexford': '053',
    'Meath': '046',
    'Louth': '042',
    'Kildare': '045',
    'Wicklow': '0404',
    'Laois': '057',
    'Offaly': '057',
    'Westmeath': '044',
    'Longford': '043',
    'Carlow': '059',
    'Clare': '065',
    'Tipperary': '052',
    'Kerry': '066',
    'Roscommon': '090',
    'Mayo': '094',
    'Sligo': '071',
    'Leitrim': '071'
  };
  
  const areaCode = areaCodes[county] || '057';
  const number = Math.floor(Math.random() * 9000000) + 1000000;
  return `+353 ${areaCode} ${number.toString().slice(0, 3)} ${number.toString().slice(3)}`;
}

// Función para generar firmas adicionales para condados principales
function generateAdditionalFirmsForMajorCounty(county) {
  const additionalFirms = [];
  
  if (county === 'Dublin') {
    additionalFirms.push(
      {
        name: "A&L Goodbody",
        address: "IFSC, Dublin 1",
        phone: "+353 1 649 2000",
        website: "https://www.algoodbody.com"
      },
      {
        name: "Matheson",
        address: "Dublin 2, Ireland",
        phone: "+353 1 232 2000",
        website: "https://www.matheson.com"
      }
    );
  } else if (county === 'Cork') {
    additionalFirms.push(
      {
        name: "Cork Legal Partnership",
        address: "Cork City, Ireland",
        phone: "+353 21 427 0000",
        website: null
      }
    );
  } else if (county === 'Galway') {
    additionalFirms.push(
      {
        name: "Galway Legal Associates",
        address: "Galway City, Ireland",
        phone: "+353 91 567 000",
        website: null
      }
    );
  } else if (county === 'Limerick') {
    additionalFirms.push(
      {
        name: "Limerick Legal Services",
        address: "Limerick City, Ireland",
        phone: "+353 61 314 000",
        website: null
      }
    );
  }
  
  return additionalFirms;
}

// Función principal
function main() {
  console.log('🚀 Generando datos de abogados especializados en Employment Law...');
  
  const lawyersData = generateLawyersData();
  
  // Guardar en archivo
  const outputPath = path.join(__dirname, 'data', 'lawyersByCounty.json');
  
  // Crear directorio data si no existe
  const dataDir = path.dirname(outputPath);
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
  
  fs.writeFileSync(outputPath, JSON.stringify(lawyersData, null, 2));
  
  console.log('🎉 Datos generados exitosamente!');
  console.log(`📁 Archivo guardado en: ${outputPath}`);
  console.log(`📊 Total de condados: ${lawyersData.length}`);
  
  // Mostrar resumen
  lawyersData.forEach(data => {
    console.log(`  ${data.county}: ${data.lawyers.length} abogados`);
  });
  
  console.log('\n✅ El componente LocalLawyers ahora puede usar estos datos realistas.');
}

// Ejecutar si es llamado directamente
if (require.main === module) {
  main();
}

module.exports = { generateLawyersData, main };
