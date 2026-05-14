<?php
require_once 'C:\\xampp\\htdocs\\socapas_back\\config\\database.php';

try {
    $db = getDB();
    
    echo "Iniciando atualização do banco...<br>";

    // 1. Criar tabela tips_videos se não existir
    $sqlVideos = "CREATE TABLE IF NOT EXISTS tips_videos (
        id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(150) NOT NULL,
        description TEXT,
        video_path VARCHAR(255) NOT NULL,
        sort_order INT UNSIGNED NOT NULL DEFAULT 0,
        is_active TINYINT(1) NOT NULL DEFAULT 1,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;";
    
    $db->query($sqlVideos);
    echo "Tabela 'tips_videos' verificada/criada.<br>";

    // 2. Inserir dados iniciais se a tabela estiver vazia
    $count = $db->count('tips_videos');
    if ($count == 0) {
        $db->insert('tips_videos', [
            ['title' => 'Como utilizar sua capa', 'description' => 'Dicas práticas para vestir seu veículo com perfeição.', 'video_path' => 'Anuncio _1.mp4', 'sort_order' => 1],
            ['title' => 'Onde guardar seu veículo', 'description' => 'Proteção ideal para garagens abertas ou fechadas.', 'video_path' => 'Anuncio_2.mp4', 'sort_order' => 2],
            ['title' => 'Por que escolher a Pelé?', 'description' => 'A tecnologia por trás da melhor proteção do Brasil.', 'video_path' => 'Anuncio_3.mp4', 'sort_order' => 3]
        ]);
        echo "Dados iniciais de vídeos inseridos.<br>";
    }

    // 3. Verificar coluna general_features em products
    try {
        $db->query('ALTER TABLE products ADD COLUMN general_features TEXT AFTER description');
        echo "Coluna 'general_features' adicionada.<br>";
    } catch (Exception $e) {
        echo "Coluna 'general_features' já existe.<br>";
    }
    
    // 4. Atualizar textos padrão
    $defaultFeatures = "• Tecido Importado feito de lycra com elastano;\n• Tecido com 150gr (gramatura);\n• Capa de tecido macio e gostoso, com encaixe perfeito no seu veículo;\n• Protege de riscos e das mãos de curiosos;\n• Lavável na máquina;\n• Preserva a lataria e pintura do seu veículo evitando lavagens excessivas;\n• Acompanha logo da montadora estampado;\n• Acompanha bolsa/sacola para guardar;\n• Possui encaixe de retrovisor;\n• Elástico e costura reforçado\n• Acompanha logomarca da montadora até 20cm";

    $db->update('products', [
        'general_features' => $defaultFeatures
    ], [
        'slug' => ['linha-tradicional', 'linha-premium-peluciada']
    ]);
    echo "Textos das capas atualizados.<br>";

    echo "<strong>Atualização concluída com sucesso!</strong>";
} catch (Exception $e) {
    echo '<strong style="color:red">Erro: ' . $e->getMessage() . '</strong>';
}
?>
