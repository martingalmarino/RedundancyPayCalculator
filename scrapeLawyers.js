const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

// Lista de condados irlandeses
const counties = [
  'Dublin', 'Kilkenny', 'Wexford', 'Meath', 'Louth', 'Kildare', 'Wicklow',
  'Laois', 'Offaly', 'Westmeath', 'Longford', 'Carlow',
  'Cork', 'Limerick', 'Waterford', 'Clare', 'Tipperary', 'Kerry',
  'Galway', 'Roscommon', 'Mayo', 'Sligo', 'Leitrim'
];

// Función para esperar un tiempo aleatorio entre 1-2 segundos
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Función para extraer datos de abogados de una página de resultados
async function extractLawyersFromPage(page) {
  try {
    // Esperar a que aparezcan los resultados
    await page.waitForSelector('.solicitor-result, .result-item, .lawyer-card, [data-testid="solicitor-result"]', { timeout: 10000 });
    
    // Intentar diferentes selectores para encontrar los resultados
    const lawyerElements = await page.$$('.solicitor-result, .result-item, .lawyer-card, [data-testid="solicitor-result"], .search-result, .listing-item');
    
    if (lawyerElements.length === 0) {
      console.log('No se encontraron elementos de abogados con los selectores esperados');
      return [];
    }

    const lawyers = [];
    
    for (const element of lawyerElements) {
      try {
        // Extraer nombre
        const nameElement = await element.$('.name, .solicitor-name, .firm-name, h3, h4, .title');
        const name = nameElement ? await nameElement.textContent() : null;
        
        // Extraer dirección
        const addressElement = await element.$('.address, .location, .office-address, .contact-address');
        const address = addressElement ? await addressElement.textContent() : null;
        
        // Extraer teléfono
        const phoneElement = await element.$('.phone, .telephone, .contact-phone, a[href^="tel:"]');
        const phone = phoneElement ? await phoneElement.textContent() : null;
        
        // Extraer sitio web
        const websiteElement = await element.$('.website, .web, a[href^="http"]:not([href*="lawsociety.ie"])');
        const website = websiteElement ? await websiteElement.getAttribute('href') : null;
        
        if (name && name.trim()) {
          lawyers.push({
            name: name.trim(),
            address: address ? address.trim() : null,
            phone: phone ? phone.trim() : null,
            website: website ? website.trim() : null
          });
        }
      } catch (error) {
        console.log('Error extrayendo datos de un elemento:', error.message);
      }
    }
    
    return lawyers;
  } catch (error) {
    console.log('Error extrayendo abogados de la página:', error.message);
    return [];
  }
}

// Función principal para hacer scraping de un condado
async function scrapeCounty(browser, county) {
  console.log(`\n🔍 Scraping abogados para ${county}...`);
  
  const page = await browser.newPage();
  
  try {
    // Ir a la página de búsqueda
    await page.goto('https://www.lawsociety.ie/public/Find-a-Solicitor', { 
      waitUntil: 'networkidle',
      timeout: 30000 
    });
    
    console.log(`✅ Página cargada para ${county}`);
    
    // Esperar a que se cargue el formulario
    await page.waitForSelector('select, .dropdown, [name="county"], [name="area"]', { timeout: 10000 });
    
    // Intentar seleccionar el condado
    try {
      // Buscar dropdown de condado
      const countySelect = await page.$('select[name="county"], select[name="location"], .county-select select');
      if (countySelect) {
        await countySelect.selectOption({ label: county });
        console.log(`✅ Condado ${county} seleccionado`);
      } else {
        // Intentar con input de texto
        const countyInput = await page.$('input[name="county"], input[name="location"]');
        if (countyInput) {
          await countyInput.fill(county);
          console.log(`✅ Condado ${county} ingresado`);
        }
      }
    } catch (error) {
      console.log(`⚠️ No se pudo seleccionar condado ${county}:`, error.message);
    }
    
    // Intentar seleccionar "Employment Law"
    try {
      const practiceSelect = await page.$('select[name="practice"], select[name="area"], .practice-select select');
      if (practiceSelect) {
        await practiceSelect.selectOption({ label: 'Employment Law' });
        console.log(`✅ Employment Law seleccionado`);
      } else {
        // Intentar con checkbox o radio button
        const employmentCheckbox = await page.$('input[value*="employment" i], input[value*="labour" i]');
        if (employmentCheckbox) {
          await employmentCheckbox.check();
          console.log(`✅ Employment Law seleccionado (checkbox)`);
        }
      }
    } catch (error) {
      console.log(`⚠️ No se pudo seleccionar Employment Law:`, error.message);
    }
    
    // Enviar formulario
    try {
      const submitButton = await page.$('button[type="submit"], input[type="submit"], .search-button, .submit-btn');
      if (submitButton) {
        await submitButton.click();
        console.log(`✅ Formulario enviado para ${county}`);
        
        // Esperar a que se carguen los resultados
        await page.waitForLoadState('networkidle');
        await delay(2000); // Esperar adicional para que se carguen los resultados
        
        // Extraer datos de abogados
        const lawyers = await extractLawyersFromPage(page);
        console.log(`📊 Encontrados ${lawyers.length} abogados para ${county}`);
        
        return {
          county,
          lawyers
        };
      }
    } catch (error) {
      console.log(`⚠️ Error enviando formulario para ${county}:`, error.message);
    }
    
    return {
      county,
      lawyers: []
    };
    
  } catch (error) {
    console.log(`❌ Error scraping ${county}:`, error.message);
    return {
      county,
      lawyers: []
    };
  } finally {
    await page.close();
  }
}

// Función principal
async function main() {
  console.log('🚀 Iniciando scraper de abogados especializados en Employment Law...');
  console.log(`📋 Condados a procesar: ${counties.length}`);
  
  const browser = await chromium.launch({ 
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  
  const results = [];
  
  try {
    for (let i = 0; i < counties.length; i++) {
      const county = counties[i];
      console.log(`\n📍 Procesando ${i + 1}/${counties.length}: ${county}`);
      
      const countyData = await scrapeCounty(browser, county);
      results.push(countyData);
      
      // Delay entre requests (excepto el último)
      if (i < counties.length - 1) {
        const delayTime = 1000 + Math.random() * 1000; // 1-2 segundos
        console.log(`⏳ Esperando ${Math.round(delayTime)}ms antes del siguiente condado...`);
        await delay(delayTime);
      }
    }
    
    // Guardar resultados
    const outputPath = path.join(__dirname, 'data', 'lawyersByCounty.json');
    
    // Crear directorio data si no existe
    const dataDir = path.dirname(outputPath);
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }
    
    fs.writeFileSync(outputPath, JSON.stringify(results, null, 2));
    
    console.log('\n🎉 Scraping completado!');
    console.log(`📁 Datos guardados en: ${outputPath}`);
    console.log(`📊 Total de condados procesados: ${results.length}`);
    
    // Mostrar resumen
    results.forEach(result => {
      console.log(`  ${result.county}: ${result.lawyers.length} abogados`);
    });
    
  } catch (error) {
    console.error('❌ Error durante el scraping:', error);
  } finally {
    await browser.close();
  }
}

// Ejecutar si es llamado directamente
if (require.main === module) {
  main().catch(console.error);
}

module.exports = { main, scrapeCounty, extractLawyersFromPage };
