// Script para testar extração de imagens do conteúdo
// Execute com: node scripts/test-image-extraction.js

const WP_API_URL = 'https://cms.anacli.com.br/wp-json/wp/v2';

// Function to extract first image from HTML content
function extractFirstImage(html) {
  const imgRegex = /<img[^>]+src="([^">]+)"/i;
  const match = html.match(imgRegex);
  
  if (match && match[1]) {
    return match[1];
  }
  
  return null;
}

async function testImageExtraction() {
  console.log('🖼️  Testando extração de imagens do conteúdo...\n');

  try {
    // Fetch posts
    const response = await fetch(`${WP_API_URL}/posts?per_page=5&_embed=true`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const posts = await response.json();
    console.log(`✅ ${posts.length} posts encontrados\n`);

    posts.forEach((post, index) => {
      console.log(`\n📄 Post ${index + 1}: ${post.title.rendered}`);
      console.log('─'.repeat(60));
      
      // Check featured image
      const featuredImage = post._embedded?.['wp:featuredmedia']?.[0]?.source_url;
      console.log(`Imagem de destaque: ${featuredImage ? '✅ Sim' : '❌ Não'}`);
      if (featuredImage) {
        console.log(`   URL: ${featuredImage.substring(0, 60)}...`);
      }
      
      // Try to extract from content
      const contentImage = extractFirstImage(post.content.rendered);
      console.log(`Imagem no conteúdo: ${contentImage ? '✅ Sim' : '❌ Não'}`);
      if (contentImage) {
        console.log(`   URL: ${contentImage.substring(0, 60)}...`);
      }
      
      // Final decision
      const finalImage = featuredImage || contentImage || 'placeholder';
      console.log(`\n🎯 Imagem final: ${finalImage === 'placeholder' ? '⚠️  Placeholder' : '✅ ' + finalImage.substring(0, 50) + '...'}`);
    });

    console.log('\n\n📊 Resumo:');
    const withFeatured = posts.filter(p => p._embedded?.['wp:featuredmedia']?.[0]?.source_url).length;
    const withContent = posts.filter(p => !p._embedded?.['wp:featuredmedia']?.[0]?.source_url && extractFirstImage(p.content.rendered)).length;
    const withPlaceholder = posts.filter(p => !p._embedded?.['wp:featuredmedia']?.[0]?.source_url && !extractFirstImage(p.content.rendered)).length;
    
    console.log(`   Posts com imagem de destaque: ${withFeatured}`);
    console.log(`   Posts com imagem no conteúdo: ${withContent}`);
    console.log(`   Posts que usarão placeholder: ${withPlaceholder}`);
    
    console.log('\n✅ Teste concluído!');

  } catch (error) {
    console.error('\n❌ Erro ao testar:', error.message);
    process.exit(1);
  }
}

// Run test
testImageExtraction();
