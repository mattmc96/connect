UPDATE feed
SET content = $2,
    image_url = $3,
    created_at = $4
WHERE id = $1 returning *;