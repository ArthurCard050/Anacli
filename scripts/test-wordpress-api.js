// Script para testar a API do WordPress
// Execute com: node scripts/test-wordpress-api.js

const WP_API_URL = 'https://cms.anacli.com.br/wp-json/wp/v2';

async function testAPI() {
  console.log('🔍 Testando API do WordPress...\n');

  try {
    // Test 1: Fetch posts
    console.log('1️⃣ Buscando posts...');
    const postsResponse = await fetch(`${WP_API_URL}/posts?per_page=5&_embed=true`);
    
    if (!postsResponse.ok) {
      throw new Error(`HTTP error! status: ${postsResponse.status}`);
    }
    
    const posts = await postsResponse.json();
    console.log(`✅ ${posts.length} posts encontrados`);
    
    if (posts.length > 0) {
      const firstPost = posts[0];
      console.log('\n📄 Primeiro post:');
      console.log(`   Título: ${firstPost.title.rendered}`);
      console.log(`   Slug: ${firstPost.slug}`);
      console.log(`   Data: ${firstPost.date}`);
      console.log(`   Autor: ${firstPost._embedded?.author?.[0]?.name || 'N/A'}`);
      console.log(`   Imagem: ${firstPost._embedded?.['wp:featuredmedia']?.[0]?.source_url || 'N/A'}`);
    }

    // Test 2: Fetch categories
    console.log('\n2️⃣ Buscando categorias...');
    const categoriesResponse = await fetch(`${WP_API_URL}/categories?per_page=10`);
    
    if (!categoriesResponse.ok) {
      throw new Error(`HTTP error! status: ${categoriesResponse.status}`);
    }
    
    const categories = await categoriesResponse.json();
    console.log(`✅ ${categories.length} categorias encontradas`);
    
    if (categories.length > 0) {
      console.log('\n📁 Categorias:');
      categories.forEach(cat => {
        if (cat.slug !== 'uncategorized') {
          console.log(`   - ${cat.name} (${cat.count} posts)`);
        }
      });
    }

    // Test 3: Fetch a specific post by slug
    if (posts.length > 0) {
      const testSlug = posts[0].slug;
      console.log(`\n3️⃣ Buscando post específico: ${testSlug}...`);
      const postResponse = await fetch(`${WP_API_URL}/posts?slug=${testSlug}&_embed=true`);
      
      if (!postResponse.ok) {
        throw new Error(`HTTP error! status: ${postResponse.status}`);
      }
      
      const specificPost = await postResponse.json();
      console.log(`✅ Post encontrado: ${specificPost[0]?.title.rendered || 'N/A'}`);
    }

    console.log('\n✅ Todos os testes passaram!');
    console.log('\n📊 Resumo:');
    console.log(`   - API URL: ${WP_API_URL}`);
    console.log(`   - Posts disponíveis: ${posts.length}`);
    console.log(`   - Categorias: ${categories.length}`);
    console.log('\n🚀 A integração está funcionando corretamente!');

  } catch (error) {
    console.error('\n❌ Erro ao testar API:');
    console.error(error.message);
    console.error('\n💡 Verifique:');
    console.error('   1. Se a URL da API está correta');
    console.error('   2. Se o WordPress está acessível');
    console.error('   3. Se a API REST está habilitada no WordPress');
    process.exit(1);
  }
}

// Run tests
testAPI();
