<?php
require_once 'C:\\xampp\\htdocs\\socapas_back\\config\\database.php';
$db = getDB();
$db->update('tips_videos', ['video_path' => 'Anuncio_1.mp4'], ['video_path' => 'Anuncio _1.mp4']);
echo "Path fixed";
?>
