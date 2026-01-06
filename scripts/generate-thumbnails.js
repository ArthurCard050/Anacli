const ffmpeg = require('fluent-ffmpeg');
const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path;
const fs = require('fs');
const path = require('path');

ffmpeg.setFfmpegPath(ffmpegPath);

const videosDir = path.join(__dirname, '../public/assets/reels');
const thumbnailsDir = path.join(__dirname, '../public/assets/reels/thumbnails');

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
      const thumbnailName = videoFile.replace('.mp4', '.webp');
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
    
  } catch (error) {
    console.error('❌ Erro geral:', error);
    process.exit(1);
  }
}

// Executar se chamado diretamente
if (require.main === module) {
  generateAllThumbnails();
}

module.exports = { generateAllThumbnails };