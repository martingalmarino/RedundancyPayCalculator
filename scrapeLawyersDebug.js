const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

// Función para inspeccionar la página y encontrar selectores
async function inspectPage(page) {
  console.log('🔍 Inspeccionando la página para encontrar selectores...');
  
  try {
    // Tomar screenshot para debug
    await page.screenshot({ path: 'debug-screenshot.png' });
    console.log('📸 Screenshot guardado como debug-screenshot.png');
    
    // Buscar todos los elementos de formulario
    const forms = await page.$$('form');
    console.log(`📋 Encontrados ${forms.length} formularios`);
    
    // Buscar todos los selects
    const selects = await page.$$('select');
    console.log(`📝 Encontrados ${selectes.length} elementos select`);
    
    for (let i = 0; i < selects.length; i++) {
      const select = selects[i];
      const name = await select.getAttribute('name');
      const id = await select.getAttribute('id');
      const className = await select.getAttribute('class');
      const options = await select.$$('option');
      
      console.log(`  Select ${i + 1}: name="${name}", id="${id}", class="${className}"`);
      console.log(`    Opciones: ${options.length}`);
      
      // Mostrar algunas opciones
      for (let j = 0; j < Math.min(5, options.length); j++) {
        const optionText = await options[j].textContent();
        console.log(`      - ${optionText}`);
      }
    }
    
    // Buscar inputs
    const inputs = await page.$$('input');
    console.log(`🔤 Encontrados ${inputs.length} elementos input`);
    
    for (let i = 0; i < Math.min(10, inputs.length); i++) {
      const input = inputs[i];
      const type = await input.getAttribute('type');
      const name = await input.getAttribute('name');
      const id = await input.getAttribute('id');
      const placeholder = await input.getAttribute('placeholder');
      
      console.log(`  Input ${i + 1}: type="${type}", name="${name}", id="${id}", placeholder="${placeholder}"`);
    }
    
    // Buscar botones
    const buttons = await page.$$('button, input[type="submit"]');
    console.log(`🔘 Encontrados ${buttons.length} botones`);
    
    for (let i = 0; i < Math.min(5, buttons.length); i++) {
      const button = buttons[i];
      const text = await button.textContent();
      const type = await button.getAttribute('type');
      const className = await button.getAttribute('class');
      
      console.log(`  Botón ${i + 1}: "${text}", type="${type}", class="${className}"`);
    }
    
    // Buscar elementos con texto relacionado
    const countyElements = await page.$$('*:has-text("county"), *:has-text("County"), *:has-text("location"), *:has-text("Location")');
    console.log(`🏛️ Encontrados ${countyElements.length} elementos relacionados con condado`);
    
    const employmentElements = await page.$$('*:has-text("employment"), *:has-text("Employment"), *:has-text("labour"), *:has-text("Labour")');
    console.log(`💼 Encontrados ${employmentElements.length} elementos relacionados con empleo`);
    
  } catch (error) {
    console.log('❌ Error durante la inspección:', error.message);
  }
}

// Función principal de debug
async function debugScraper() {
  console.log('🚀 Iniciando debug del scraper...');
  
  const browser = await chromium.launch({ 
    headless: false, // Modo visible para debug
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  
  const page = await browser.newPage();
  
  try {
    console.log('🌐 Navegando a la página de Law Society...');
    await page.goto('https://www.lawsociety.ie/public/Find-a-Solicitor', { 
      waitUntil: 'networkidle',
      timeout: 30000 
    });
    
    console.log('✅ Página cargada, esperando 3 segundos...');
    await page.waitForTimeout(3000);
    
    // Inspeccionar la página
    await inspectPage(page);
    
    console.log('\n📋 Información adicional:');
    console.log('URL actual:', page.url());
    console.log('Título:', await page.title());
    
    // Buscar elementos específicos que podrían ser útiles
    const possibleSelectors = [
      'select[name*="county"]',
      'select[name*="location"]',
      'select[name*="area"]',
      'select[name*="practice"]',
      'select[name*="specialty"]',
      'input[name*="county"]',
      'input[name*="location"]',
      '.county-select',
      '.location-select',
      '.practice-select',
      '.area-select',
      '[data-testid*="county"]',
      '[data-testid*="location"]',
      '[data-testid*="practice"]'
    ];
    
    console.log('\n🎯 Probando selectores específicos:');
    for (const selector of possibleSelectors) {
      try {
        const element = await page.$(selector);
        if (element) {
          console.log(`✅ Encontrado: ${selector}`);
          const tagName = await element.evaluate(el => el.tagName);
          const name = await element.getAttribute('name');
          const id = await element.getAttribute('id');
          console.log(`   Tag: ${tagName}, name: ${name}, id: ${id}`);
        } else {
          console.log(`❌ No encontrado: ${selector}`);
        }
      } catch (error) {
        console.log(`⚠️ Error con selector ${selector}: ${error.message}`);
      }
    }
    
    console.log('\n⏳ Manteniendo el navegador abierto por 10 segundos para inspección manual...');
    await page.waitForTimeout(10000);
    
  } catch (error) {
    console.error('❌ Error durante el debug:', error);
  } finally {
    await browser.close();
  }
}

// Ejecutar si es llamado directamente
if (require.main === module) {
  debugScraper().catch(console.error);
}

module.exports = { debugScraper, inspectPage };
