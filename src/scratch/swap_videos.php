<?php
require_once 'C:\\xampp\\htdocs\\socapas_back\\config\\database.php';
$db = getDB();

// Backup data
$v1 = $db->get('tips_videos', '*', ['video_path' => 'Anuncio_1.mp4']);
$v2 = $db->get('tips_videos', '*', ['video_path' => 'Anuncio_2.mp4']);

// Swap titles and descriptions
$db->update('tips_videos', [
    'title' => $v2['title'],
    'description' => $v2['description']
], ['video_path' => 'Anuncio_1.mp4']);

$db->update('tips_videos', [
    'title' => $v1['title'],
    'description' => $v1['description']
], ['video_path' => 'Anuncio_2.mp4']);

echo "Videos swapped";
?>
