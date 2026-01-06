const ffmpeg = require('fluent-ffmpeg');
const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path;
const fs = require('fs');
const path = require('path');

ffmpeg.setFfmpegPath(ffmpegPath);

const videosDir = path.join(__dirname, '../public/assets/reels');
const thumbnailsDir = path.join(__dirname, '../public/assets/reels/thumbnails');

// Mapeamento de nomes de vídeos para nomes simplificados de thumbnails
const videoThumbnailMap = {
  'O diagnóstico é o primeiro passo…Mas é no tratamento que a esperança se transforma em ação. 💗Co.mp4': 'video-1.webp',
  'É cada figura que passa por aqui 😂🍭🍬.mp4': 'video-2.webp',
  '🩸👶 Tornar o exame de sangue menos assustador para as crianças é possível com algumas atitudes .mp4': 'video-3.webp',
  'Aqui nosso objetivo é não criar traumas, mas trazer uma relação transformada entre coleta de san.mp4': 'video-4.webp',
  'Quando o chefe começa a me seguir nas redes sociais 💚😂.mp4': 'video-5.webp',
  'A nossa velhice é cultivada de acordo com as nossas escolhas quando ainda jovens 👴🏼💚✨.mp4': 'video-6.webp',
  'Segue pra não perder vídeo como esse 🤣#pcgamer #tecnologia #reelsbr #techbr #memes.mp4': 'video-7.webp'
};

// Criar diretório de thumbnails se não existir
if (!fs.existsSync(thumbnailsDir)) {
  fs.mkdirSync(thumbnailsDir, { recursive: true });
}

async function generateThumbnail(videoPath, outputPath) {
  return new Promise((resolve, reject) => {
    ffmpeg(videoPath)
      .screenshots({
        timestamps: ['00:00:01'], // Captura no segundo 1
        filename: path.basename(outputPath),
        folder: path.dirname(outputPath),
        size: '400x600' // Tamanho otimizado para os cards
      })
      .on('end', () => {
        console.log(`✅ Thumbnail gerado: ${path.basename(outputPath)}`);
        resolve();
      })
      .on('error', (err) => {
        console.error(`❌ Erro ao gerar thumbnail para ${path.basename(videoPath)}:`, err.message);
        reject(err);
      });
  });
}

async function generateAllThumbnails() {
  try {
    console.log('🎬 Iniciando geração de thumbnails...\n');
    
    const videoFiles = fs.readdirSync(videosDir)
      .filter(file => file.endsWith('.mp4'));

    if (videoFiles.length === 0) {
      console.log('❌ Nenhum arquivo de vídeo encontrado em:', videosDir);
      return;
    }

    console.log(`📹 Encontrados ${videoFiles.length} vídeos para processar:\n`);

    for (const videoFile of videoFiles) {
      const videoPath = path.join(videosDir, videoFile);
      const thumbnailName = videoThumbnailMap[videoFile] || videoFile.replace('.mp4', '.webp');
      const thumbnailPath = path.join(thumbnailsDir, thumbnailName);

      // Pular se thumbnail já existe
      if (fs.existsSync(thumbnailPath)) {
        console.log(`⏭️  Thumbnail já existe: ${thumbnailName}`);
        continue;
      }

      try {
        await generateThumbnail(videoPath, thumbnailPath);
      } catch (error) {
        console.error(`❌ Falha ao processar ${videoFile}`);
      }
    }

    console.log('\n🎉 Geração de thumbnails concluída!');
    
    // Gerar arquivo de mapeamento para o frontend
    const mappingPath = path.join(__dirname, '../src/data/video-thumbnail-map.json');
    fs.writeFileSync(mappingPath, JSON.stringify(videoThumbnailMap, null, 2));
    console.log('📝 Arquivo de mapeamento gerado:', mappingPath);
    
  } catch (error) {
    console.error('❌ Erro geral:', error);
    process.exit(1);
  }
}

// Executar se chamado diretamente
if (require.main === module) {
  generateAllThumbnails();
}

module.exports = { generateAllThumbnails, videoThumbnailMap };