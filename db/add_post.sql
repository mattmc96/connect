INSERT INTO FEED(content, image_url, created_at)
VALUES ( $1, $2, NOW() ) returning *;