<?php
$post_data = json_decode(file_get_contents('php://input'), true);
// the directory "data" must be writable by the server
$name = "data/ALL_DEMOGRAPHICS.csv";
$data = $post_data['filedata'];
// write the file to disk
$handle = fopen($name, "a");
fputcsv($handle, $data);
fclose($handle);
?>